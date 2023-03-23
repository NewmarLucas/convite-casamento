import styles from '@/styles/Home.module.css';
import HeadComponent from '@/components/Head';

export default function Home() {
  return (
    <>
      <HeadComponent title='Home' />
      <main className={styles.main}></main>
    </>
  );
}
