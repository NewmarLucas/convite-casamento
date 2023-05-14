import type { NextApiRequest, NextApiResponse } from 'next';
import * as z from 'zod';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../../../firebase';

type Data = {
  [x: string]: any;
};

const schema = z.object({
  name: z.string().nonempty('Campo obrigatório'),
  phone: z.string().nonempty('Campo obrigatório'),
  companions: z.array(
    z.object({
      name: z.string().nonempty('Campo obrigatório'),
    })
  ),
});

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
      res.status(500).json({ success: false, msg: 'Something went wrong' });
    }
  }

  async function getAllUsers() {
    try {
      const snap = await getDocs(collection(db, 'users'));
      res
        .status(200)
        .json(snap.docs.map((item) => ({ ...item.data(), id: item.id })));
    } catch (error) {
      res.status(500).json({ success: false, msg: 'Something went wrong' });
    }
  }

  switch (req.method) {
    case 'GET':
      getAllUsers();
      break;
    case 'POST':
      saveUser();
      break;
    default:
      res.setHeader('Allow', ['POST', 'GET']);
      res
        .status(405)
        .json({ success: false, msg: `Method ${req.method} Not Allowed` });
      break;
  }
}
