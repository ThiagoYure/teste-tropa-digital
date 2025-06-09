// components/PageTransition.tsx
'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: white;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  width: 120px;
  margin-bottom: 20px;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 5px solid #ccc;
  border-top: 5px solid var(--main-orange);
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const PageTransitionLoader = () => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Ativa a transição por 600ms sempre que a URL muda
    setIsVisible(true);
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 600); // tempo da transição

    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <AnimatePresence>
      {isVisible && (
        <Overlay
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Logo src="/logo-tropa.svg" alt="Logo" />
          <Spinner />
        </Overlay>
      )}
    </AnimatePresence>
  );
};
