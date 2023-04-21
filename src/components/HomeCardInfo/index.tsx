import React from 'react';
import styles from './styles.module.css';

interface Props {
  data: {
    text: string;
    icon: JSX.Element;
  };
}

export function HomeCardInfo({ data }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.iconContainer}>{data.icon}</div>
      <div className={styles.textContainer}>
        <p>{data.text}</p>
      </div>
    </div>
  );
}
