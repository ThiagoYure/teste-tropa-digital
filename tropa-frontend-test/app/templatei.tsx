'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: #fff;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  width: 120px;
  margin-bottom: 24px;
`;

const Spinner = styled.div`
  border: 4px solid #eee;
  border-top: 4px solid #000;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const fade = {
  initial: { opacity: 1 },
  animate: { opacity: 0 },
  exit: { opacity: 1 },
};

export default function Templatei({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    setIsTransitioning(true);

    const timeout = setTimeout(() => {
      setIsTransitioning(false);
    }, 800); // tempo mínimo de exibição

    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      {isTransitioning && (
        <motion.div
          key="page-transition"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={fade}
          transition={{ duration: 0.6 }}
        >
          <Overlay>
            <Logo src="/logo-tropa.svg" alt="Logo" />
            <Spinner />
          </Overlay>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
