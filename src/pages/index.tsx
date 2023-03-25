import React from 'react';
import Image from 'next/image';

import { GiKnifeFork } from '@react-icons/all-files/gi/GiKnifeFork';
import { FaRegMap } from '@react-icons/all-files/fa/FaRegMap';
import { FaRegCalendarAlt } from '@react-icons/all-files/fa/FaRegCalendarAlt';
import { FaRegClock } from '@react-icons/all-files/fa/FaRegClock';

import styles from '@/styles/Home.module.css';
import HeadComponent from '@/components/Head';
import { Header } from '@/components/Header';
import { HomeCardInfo } from '@/components/HomeCardInfo';

import circle from '@/assets/circle.svg';
import heart from '@/assets/heart.svg';
import noivos from '@/assets/noivos.png';

const infos = [
  {
    text: '18/11/23',
    icon: <FaRegCalendarAlt size={35} color={'var(--main-color)'} />,
  },
  {
    text: '18:30h',
    icon: <FaRegClock size={35} color={'var(--main-color)'} />,
  },
  {
    text: 'Simted - Arcenio Cardoso, 1234',
    icon: <FaRegMap size={35} color={'var(--main-color)'} />,
  },
  {
    text: 'Traga prato e talher',
    icon: <GiKnifeFork size={35} color={'var(--main-color)'} />,
  },
];

export default function Home() {
  return (
    <>
      <HeadComponent />
      <Header />
      <main className={styles.main}>
        <div className={styles.rectangle} />
        <Image src={circle} alt='circulo' className={styles.circleImg} />
        <div className={styles.content}>
          <div className={styles.texts}>
            <h1 style={{ fontWeight: 400 }}>
              When your
              <Image
                src={heart}
                alt='coração'
                width={30}
                height={24}
                style={{ marginLeft: 10 }}
              />
            </h1>
            <h1>
              <strong>Dream Wedding come true</strong>
            </h1>
            <p className={styles.secondaryText}>
              &quot;Once in a while, right in the middle of an ordinary life,
              love gives us a fairy tale.&quot;
            </p>
            <div className={styles.cardInfoContainer}>
              {infos.map((item) => (
                <HomeCardInfo key={item.text} data={item} />
              ))}
            </div>
          </div>
          <Image src={noivos} alt='noivos' className={styles.mainImage} />
        </div>
      </main>
    </>
  );
}
