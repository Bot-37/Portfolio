
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BootSequence from '../components/BootSequence';
import TerminalLogin from '../components/TerminalLogin';
import LandingPage from '../components/LandingPage';

const Index = () => {
  const [isBooting, setIsBooting] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [callSign, setCallSign] = useState('');

  useEffect(() => {
    const bootTimer = setTimeout(() => {
      setIsBooting(false);
    }, 5000);

    return () => clearTimeout(bootTimer);
  }, []);

  const handleLogin = (userCallSign: string) => {
    setCallSign(userCallSign);
    setIsLoggedIn(true);
  };

  return (
    <div className="min-h-screen bg-black overflow-hidden">
    <AnimatePresence mode="wait">
    {isBooting ? (
      <BootSequence key="boot" onComplete={() => setIsBooting(false)} />
    ) : !isLoggedIn ? (
      <TerminalLogin key="login" onLogin={handleLogin} />
    ) : (
      <LandingPage key="main" callSign={callSign} />
    )}
    </AnimatePresence>
    </div>
  );
};

export default Index;
