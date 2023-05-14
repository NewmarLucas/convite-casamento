import type { NextApiRequest, NextApiResponse } from 'next';
import * as z from 'zod';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';

type Data = {
  [x: string]: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  async function getTotalConfirmations() {
    try {
      const snap = await getDocs(collection(db, 'users'));
      let confirmated = 0;
      let notConfirmated = 0;

      snap.docs.forEach((user) => {
        const guest = user.data();
        if (guest.confirmation) {
          confirmated++;
        } else {
          notConfirmated++;
        }

        if (guest.companions?.length) {
          guest.companions.forEach(
            (item: { name: string; confirmation: boolean }) => {
              if (item.confirmation) {
                confirmated++;
              } else {
                notConfirmated++;
              }
            }
          );
        }
      });

      res.status(200).json({ confirmated, notConfirmated });
    } catch (error) {
      res.status(500).json({ success: false, msg: 'Something went wrong' });
    }
  }

  switch (req.method) {
    case 'GET':
      getTotalConfirmations();
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res
        .status(405)
        .json({ success: false, msg: `Method ${req.method} Not Allowed` });
      break;
  }
}
