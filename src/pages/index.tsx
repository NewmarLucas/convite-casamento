import styles from '@/styles/Home.module.css';
import HeadComponent from '@/components/Head';
import { Button, Typography, Box } from '@mui/material';

export default function Home() {
  return (
    <>
      <HeadComponent title='Home' />
      <main className={styles.main}>
        <Typography>Quer ir no meu casamento?</Typography>
        <Box display={'flex'} flexDirection={'row'} gap={4} marginTop={2}>
          <Button variant='contained'>negar</Button>
          <Button variant='contained'>Aceitar</Button>
        </Box>
      </main>
    </>
  );
}
