import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

const pageHeight = 0;

export function Header() {
  const [active, setActive] = useState(false);

  function handleScroll() {
    const header = document.getElementById('header-content');
    const scrollpos = window.scrollY;
    if (scrollpos > pageHeight) {
      header?.classList.add('is-active-header');
    }
    if (scrollpos == pageHeight) {
      header?.classList.remove('is-active-header');
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Buttons = () => (
    <div className={styles.buttonsContainer}>
      <button className='ghost-button'>Presentes</button>
      <button className='ghost-button'>Vestimenta</button>
      <button className='ghost-button'>Contato</button>
    </div>
  );

  return (
    <nav
      className={styles.header}
      style={active ? { background: 'hsl(0deg 0% 21% / 1)' } : {}}
      id='header-content'
    >
      <div className={styles.content}>
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
