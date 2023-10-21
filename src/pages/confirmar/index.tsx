import { useState } from 'react';
import Image from 'next/image';
import { GetServerSidePropsContext } from 'next';
import { Dancing_Script } from 'next/font/google';
import Switch from 'react-switch';
import nookies from 'nookies';
import Swal from 'sweetalert2';

import { Button } from '@/components/Button';
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
  id: string;
}

export default function Invite({ data, id }: Props) {
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
  const [loading, setLoading] = useState(false);

  function handleSelect(checked: boolean, index: number) {
    setSelected((prev) => {
      const copy = [...prev];
      copy[index].checked = checked;
      return copy;
    });
  }

  async function submit() {
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
    setLoading(true);
    const res = await updateUser(id, payload);
    if (res) {
      Swal.fire({
        title: 'Sucesso',
        text: 'Dados atualizados com sucesso!',
        icon: 'success',
      });
    } else {
      Swal.fire({
        title: 'Oops...',
        text: 'Algo deu errado ao confirmar. Por favor, tente novamente!',
        icon: 'error',
      });
    }
    setLoading(false);
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
            Por favor, selecione os convidados que estarão presentes e confirme:
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
            <Button
              loading={loading}
              disabled={loading}
              data-testid='confirmationButton'
              onClick={submit}
            >
              Confirmar
            </Button>
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
      props: { data: res, id },
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
