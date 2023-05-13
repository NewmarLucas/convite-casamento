// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../../firebase';

type Data = {
  [x: string]: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      const { id } = req.query;
      res.status(200).json({ id });
      break;
    case 'POST':
      res.status(200).json(req.body);
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
