// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import * as z from 'zod';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../../../firebase';

const schema = z.object({
  name: z.string().nonempty('Campo obrigatório'),
  phone: z.string().nonempty('Campo obrigatório'),
  companions: z.array(
    z.object({
      name: z.string().nonempty('Campo obrigatório'),
    })
  ),
});

type Data = {
  [x: string]: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  async function saveUser() {
    try {
      const fields = schema.parse(req.body);
      const payload = {
        ...fields,
        confirmation: false,
        companions: fields.companions.map((item) => ({
          ...item,
          confirmation: false,
        })),
      };
      await addDoc(collection(db, 'users'), payload);
      res.status(200).json({ success: true });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json(error.formErrors.fieldErrors);
        return;
      }
      res.status(500).end('Something went wrong');
    }
  }

  switch (req.method) {
    case 'GET':
      const { id } = req.query;
      res.status(200).json({ id });
      break;
    case 'POST':
      saveUser();
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
    // try {
    //   const querySnapshot = await getDocs(collection(db, 'test'));
    //   const newData = querySnapshot.docs.map((doc) => ({ ...doc.data() }));
    //   res.status(200).json(newData);
    // } catch (err) {
    //   res.status(500).json({ error: 'failed to load data' });
    // }
  }
}
