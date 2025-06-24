
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BootSequence from '../components/BootSequence';
import LandingPage from '../components/LandingPage';

const Index = () => {
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    const bootTimer = setTimeout(() => {
      setIsBooting(false);
    }, 5000);

    return () => clearTimeout(bootTimer);
  }, []);

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <AnimatePresence mode="wait">
        {isBooting ? (
          <BootSequence key="boot" onComplete={() => setIsBooting(false)} />
        ) : (
          <LandingPage key="main" />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
