import React, { createContext, useState } from 'react';
import styles from '@/styles/Loading.module.css';

interface LoadingContext {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoadingContext = createContext<LoadingContext>(
  {} as LoadingContext
);

function LoadingProvider({ children }: React.PropsWithChildren) {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {loading && (
        <div className={styles.loadingBackground}>
          <div className={styles.loading}>
            <div className={styles.loadingSpinner}></div>
            <span className={styles.loadingText}>Carregando...</span>
          </div>
        </div>
      )}
      {children}
    </LoadingContext.Provider>
  );
}

export default LoadingProvider;
