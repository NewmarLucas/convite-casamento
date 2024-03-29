import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Montserrat } from 'next/font/google';
import Cookies from 'js-cookie';

import { ImSpoonKnife } from 'react-icons/im';
import { RiPinDistanceLine } from 'react-icons/ri';
import { TbCalendarTime } from 'react-icons/tb';

import styles from '@/styles/Home.module.css';
import HeadComponent from '@/components/Head';
import { HomeCardInfo } from '@/components/HomeCardInfo';

import weddingRing from '@/assets/weddingRing.svg';
import footerPattern from '@/assets/footerPattern.png';
import frontCover from '../../public/front-cover.webp';
import { useRouter } from 'next/router';

const font = Montserrat({
  weight: '600',
  subsets: ['latin'],
});

const infos = [
  {
    text: '25 de novembro de 2023 sábado às 17:30h',
    icon: <TbCalendarTime size={35} color={'#BFDBF7'} />,
  },
  {
    text: 'Simted - rua Arcenio Cardoso, 1121, Centro',
    icon: <RiPinDistanceLine size={35} color={'#BFDBF7'} />,
  },
  {
    text: 'Não é necessário levar pratos e talheres',
    icon: <ImSpoonKnife size={35} color={'#BFDBF7'} />,
  },
];

export default function Home() {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    Cookies.remove('id');
    if (id) {
      Cookies.set('id', String(id));
    }
  }, [id]);

  return (
    <div className={styles.container} data-testid='container'>
      <HeadComponent />
      <div className={styles.mainImageContainer}>
        <div className={styles.mainImage}>
          <Image
            data-testid='frontCoverImage'
            src={frontCover}
            alt='foto de Newmar e Fernanda lendo a bíblia juntos enquanto estão sentados em um gramado'
            // loading='lazy'
            className={styles.frontCoverImage}
          />
        </div>
        <div className={styles.bannerTitle}>
          <h1 className={font.className}>
            <span>Casamento de</span>
            <br />
            <span>Fernanda e Newmar</span>
          </h1>
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.content}>
          <div className={styles.texts}>
            <h1 style={{ fontWeight: 400 }}>Duas almas, uma só jornada:</h1>
            <h1>
              o casamento.
              <Image
                src={weddingRing}
                alt='coração'
                width={50}
                height={45}
                style={{ marginLeft: 10 }}
              />
            </h1>
            <p className={styles.secondaryText}>
              &quot;Assim, eles já não são dois, mas sim uma só carne. Portanto,
              o que Deus uniu, ninguém o separe.&quot;
            </p>
          </div>
          <div className={styles.cardInfoContainer}>
            {infos.map((item) => (
              <HomeCardInfo key={item.text} data={item} />
            ))}
          </div>
        </div>
        {!!id && (
          <div className={styles.mainButtonContainer}>
            <Link href='/confirmar' className='filled-button'>
              CONFIRMAR PRESENÇA
            </Link>
          </div>
        )}
      </div>
      <Image
        priority
        src={footerPattern}
        alt='ondas'
        className={styles.footerImage}
      />
    </div>
  );
}
