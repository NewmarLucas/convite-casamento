import type { NextApiRequest, NextApiResponse } from 'next';
import { auth, db } from '../../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

type Data = {
  [x: string]: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  try {
    const { userId } = req.body;
    const userDocument = await getDoc(doc(db, 'users', userId));
    if (userDocument.exists()) {
      const userData = userDocument.data();
      res.status(200).json({ success: true, userData });

      // TODO: usar os dados do usuario para fazer o login
      // const userCredential = await signInWithEmailAndPassword(
      //   auth,
      //   email,
      //   password
      // );
      // const user = userCredential.user;
      // Faça o que for necessário com o usuário logado, como redirecionar para uma página protegida
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
}
