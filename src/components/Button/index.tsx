import React from 'react';

import styles from './styles.module.css';

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  loading?: boolean;
}

export function Button(props: Props) {
  const { loading = false, children, ...rest } = props;
  return (
    <button className={styles.button} {...rest}>
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}
      >
        {!!loading && (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='25'
            height='25'
            viewBox='0 0 100 100'
          >
            <circle
              cx='50'
              cy='50'
              fill='none'
              stroke='currentColor'
              stroke-width='6'
              r='30'
              stroke-dasharray='56.548667764616276 20.84955592153876'
            >
              <animateTransform
                attributeName='transform'
                type='rotate'
                repeatCount='indefinite'
                dur='1s'
                values='0 50 50;360 50 50'
                keyTimes='0;1'
              />
            </circle>
          </svg>
        )}
        {children}
      </span>
    </button>
  );
}
