import Head from 'next/head';

interface Props {
  title: string;
}

export default function HeadComponent(props: Props) {
  const { title } = props;

  return (
    <>
      <Head>
        <title>Convite Casamento - {title}</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta
          name='description'
          content='Convite para o casamento de Fernanda e Newmar'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
    </>
  );
}
