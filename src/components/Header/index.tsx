import React from 'react';
import Image from 'next/image';

import logo from '@/assets/logo.svg';
import styles from './styles.module.css';

export function Header() {
  return (
    <nav className={styles.header}>
      <div className={styles.content}>
        <Image src={logo} alt='logo' />
        <div className={styles.buttonsContainer}>
          <button className='ghost-button'>Presentes</button>
          <button className='ghost-button'>Vestimenta</button>
          <button className='ghost-button'>Contato</button>
          <button className='filled-button'>CONFIRMAR PRESENÇA</button>
        </div>
      </div>
    </nav>
  );
}
