import styles from '@/styles/Home.module.css';
import HeadComponent from '@/components/Head';
import circle from '@/assets/circle.svg';
import Image from 'next/image';
import { Header } from '@/components/Header';

export default function Home() {
  return (
    <>
      <HeadComponent title='Home' />
      <Header />
      <main className={styles.main}>
        <div className={styles.rectangle} />
        <Image src={circle} alt='circulo' className={styles.circleImg} />
        <p>oi</p>
      </main>
    </>
  );
}
