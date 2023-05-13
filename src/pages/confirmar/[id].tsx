import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Dancing_Script } from 'next/font/google';
import Switch from 'react-switch';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';

import styles from './styles.module.css';
import noivos from '@/assets/noivos-bg.jpg';
import flores from '@/assets/flores.png';
import HeadComponent from '@/components/Head';

const font = Dancing_Script({
  weight: '400',
  subsets: ['latin'],
});

interface PeopleSelect {
  name: string;
  checked: boolean;
}

const people = [
  { name: 'Carlos Campossano Ajala' },
  { name: 'Joana Escobar Ajala' },
  { name: 'Ana Carla Escobar Ajala' },
  { name: 'Ana Flávia Escobar Ajala' },
];

export default function Invite() {
  // const router = useRouter();
  // const { id } = router.query;
  const [selected, setSelected] = useState<PeopleSelect[]>([]);

  useEffect(() => {
    void getDocs(collection(db, 'test')).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({ ...doc.data() }));
      console.log(newData);
    });
    setSelected(
      people.map((item) => ({
        name: item.name,
        checked: false,
      }))
    );
  }, []);

  function handleSelect(checked: boolean, index: number) {
    setSelected((prev) => {
      const copy = [...prev];
      copy[index].checked = checked;
      return copy;
    });
  }

  return (
    <>
      <HeadComponent />

      <div className={styles.container}>
        <div className={styles.leftContent}>
          <Image
            src={noivos}
            alt='noivos'
            loading='lazy'
            className={styles.backgroundImage}
          />
        </div>
        <div className={styles.rightContent}>
          <div className={styles.names}>
            <h1 className={font.className}>Fernada & Newmar</h1>
          </div>
          <Image
            src={flores}
            alt='flores'
            loading='lazy'
            className={styles.flowers}
          />
          <p className={styles.inviteText}>
            Marque o nome das pessoas que vão no casamento
          </p>
          <div className={styles.peopleForm}>
            {selected.map((item, i) => (
              <label key={item.name} className={styles.checkboxContainer}>
                <Switch
                  height={20}
                  width={45}
                  onChange={(e) => {
                    handleSelect(e, i);
                  }}
                  checked={item.checked}
                />
                <span>{item.name}</span>
              </label>
            ))}
          </div>
          <div className={styles.buttonContainer}>
            <button>Confirmar</button>
          </div>
        </div>
      </div>
    </>
  );
}
