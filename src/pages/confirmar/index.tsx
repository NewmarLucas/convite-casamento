import { useState } from 'react';
import Image from 'next/image';
import { GetServerSidePropsContext } from 'next';
import { Dancing_Script } from 'next/font/google';
import Switch from 'react-switch';
import nookies from 'nookies';

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

interface Props {
  data: User;
}

export default function Invite({ data }: Props) {
  const defaultSelectedData = data
    ? [
        {
          name: data?.name,
          checked: data?.confirmation,
        },
        ...data?.companions?.map((item) => ({
          name: item.name,
          checked: item.confirmation,
        })),
      ]
    : [];
  const [selected, setSelected] = useState<PeopleSelect[]>(defaultSelectedData);

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
      ...data,
      confirmation: mainUser?.checked ?? data?.confirmation,
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
            alt='noivos se beijando, os padrinhos ao redor dos noivos e fogos de artifício no céu'
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
            alt='ramo de flores'
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
                  onColor='#053c5e'
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const cookies = nookies.get(context);
  const id = cookies?.id;
  if (!id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  const res = await getUser(id);
  if (res) {
    return {
      props: { data: res },
    };
  } else {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
}
