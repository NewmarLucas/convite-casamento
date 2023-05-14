import type { NextApiRequest, NextApiResponse } from 'next';
import * as z from 'zod';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
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
  async function getUser() {
    try {
      const { id } = req.query;
      const snap = await getDoc(doc(db, 'users', String(id)));
      if (snap.exists()) {
        res.status(200).json(snap.data());
      } else {
        res.status(404).json({ success: false, msg: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ success: false, msg: 'Something went wrong' });
    }
  }

  async function updateUser() {
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
      const { id } = req.query;
      await updateDoc(doc(db, 'users', String(id)), payload);
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, msg: 'Something went wrong' });
    }
  }

  switch (req.method) {
    case 'GET':
      getUser();
      break;
    case 'PUT':
      updateUser();
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res
        .status(405)
        .json({ success: false, msg: `Method ${req.method} Not Allowed` });
      break;
  }
}
