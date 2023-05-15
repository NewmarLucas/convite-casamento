import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { Dancing_Script } from 'next/font/google';
import Switch from 'react-switch';

import styles from './styles.module.css';
import noivos from '@/assets/noivos-bg.jpg';
import flores from '@/assets/flores.png';
import HeadComponent from '@/components/Head';
import { User, getUser, updateUser } from '@/services/users';

const font = Dancing_Script({
  weight: '400',
  subsets: ['latin'],
});

interface PeopleSelect {
  name: string;
  checked: boolean;
}

export default function Invite() {
  const [userData, setUserData] = useState<User>({} as User);
  const [selected, setSelected] = useState<PeopleSelect[]>([]);

  const getUserData = useCallback(() => {
    const id = String(localStorage?.id);
    getUser(id).then((res) => {
      if (res) {
        setUserData(res);
        setSelected([
          {
            name: res.name,
            checked: res.confirmation,
          },
          ...res.companions.map((item) => ({
            name: item.name,
            checked: item.confirmation,
          })),
        ]);
      }
    });
  }, []);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  function handleSelect(checked: boolean, index: number) {
    setSelected((prev) => {
      const copy = [...prev];
      copy[index].checked = checked;
      return copy;
    });
  }

  async function submit() {
    const id = String(localStorage?.id);
    const confirmations = [...selected];
    const mainUser = confirmations.shift();
    const payload: User = {
      ...userData,
      confirmation: mainUser?.checked ?? userData.confirmation,
      companions: confirmations.map((item) => ({
        name: item.name,
        confirmation: item.checked,
      })),
    };
    const res = await updateUser(id, payload);
    if (res) {
      alert('Sucesso!');
    } else {
      alert('Erro');
    }
  }

  return (
    <>
      <HeadComponent />

      <div data-testid='container' className={styles.container}>
        <div data-testid='leftContent' className={styles.leftContent}>
          <Image
            data-testid='bannerImage'
            src={noivos}
            alt='noivos'
            loading='lazy'
            className={styles.backgroundImage}
          />
        </div>
        <div className={styles.rightContent} data-testid='rightContent'>
          <div className={styles.names}>
            <h1 data-testid='bannerTitle' className={font.className}>
              Fernada & Newmar
            </h1>
          </div>
          <Image
            data-testid='flowersImage'
            src={flores}
            alt='flores'
            loading='lazy'
            className={styles.flowers}
          />
          <p className={styles.inviteText} data-testid='inviteText'>
            Marque o nome das pessoas que vão no casamento
          </p>
          <div className={styles.peopleForm} data-testid='peopleForm'>
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
            <button data-testid='confirmationButton' onClick={submit}>
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
