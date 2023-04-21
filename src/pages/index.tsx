import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { ImSpoonKnife } from '@react-icons/all-files/im/ImSpoonKnife';
import { RiPinDistanceLine } from '@react-icons/all-files/ri/RiPinDistanceLine';
import { TbCalendarTime } from 'react-icons/tb';

import styles from '@/styles/Home.module.css';
import HeadComponent from '@/components/Head';
import { Header } from '@/components/Header';
import { HomeCardInfo } from '@/components/HomeCardInfo';

import weddingRing from '@/assets/weddingRing.svg';
import footerPattern from '@/assets/footerPattern.png';

const infos = [
  {
    text: '25 de novembro de 2023 sábado às 18:30h',
    icon: <TbCalendarTime size={35} color={'#BFDBF7'} />,
  },
  {
    text: 'Simted - rua Arcenio Cardoso, 1234, Centro',
    icon: <RiPinDistanceLine size={35} color={'#BFDBF7'} />,
  },
  {
    text: 'Não esqueça de levar pratos e talheres',
    icon: <ImSpoonKnife size={35} color={'#BFDBF7'} />,
  },
];

export default function Home() {
  return (
    <div className={styles.container}>
      <HeadComponent />
      <Header />
      <div className={styles.mainImage} />
      <div className={styles.main}>
        <div className={styles.content}>
          <div className={styles.texts}>
            <h1 style={{ fontWeight: 400 }}>
              When your
              <Image
                src={weddingRing}
                alt='coração'
                width={50}
                height={45}
                style={{ marginLeft: 10 }}
              />
            </h1>
            <h1>Dream Wedding come true</h1>
            <p className={styles.secondaryText}>
              &quot;Once in a while, right in the middle of an ordinary life,
              love gives us a fairy tale.&quot;
            </p>
          </div>
          <div className={styles.cardInfoContainer}>
            {infos.map((item) => (
              <HomeCardInfo key={item.text} data={item} />
            ))}
          </div>
        </div>
        <div className={styles.mainButtonContainer}>
          <Link href='/confirmar/123' className='filled-button'>
            CONFIRMAR PRESENÇA
          </Link>
        </div>
      </div>
      <Image src={footerPattern} alt='ondas' className={styles.footerImage} />
    </div>
  );
}
