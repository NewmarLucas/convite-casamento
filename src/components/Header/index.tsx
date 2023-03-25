import React, { useState } from 'react';
import Image from 'next/image';

import logo from '@/assets/logo.svg';
import styles from './styles.module.css';

export function Header() {
  const [active, setActive] = useState(true);

  const Buttons = () => (
    <div className={styles.buttonsContainer}>
      <button className='ghost-button'>Presentes</button>
      <button className='ghost-button'>Vestimenta</button>
      <button className='ghost-button'>Contato</button>
      <button className='filled-button'>CONFIRMAR PRESENÇA</button>
    </div>
  );

  return (
    <nav className={styles.header}>
      <div className={styles.content}>
        <Image src={logo} alt='logo' />
        {/* burger menu start */}
        <div className={styles.menuIcon}>
          <input
            className={styles.menuIconCheeckbox}
            type='checkbox'
            onChange={(e) => {
              setActive(e.target.checked);
            }}
          />
          <div className={styles.menuIconDiv}>
            <span></span>
            <span></span>
          </div>
        </div>
        {/* burger menu end */}
        {!active && <Buttons />}
      </div>
      {active && (
        <div className={styles.dropdownContent}>
          <Buttons />
        </div>
      )}
    </nav>
  );
}
