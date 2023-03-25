import Head from 'next/head';

export default function HeadComponent() {
  return (
    <Head>
      <title>Convite Casamento</title>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta
        name='description'
        content='Convite para o casamento de Fernanda e Newmar'
      />
      <link rel='icon' href='/favicon.ico' />
    </Head>
  );
}
