
import React, { useState, useEffect } from 'react';
import SplashScreen from '@/components/SplashScreen';
import LoginForm from '@/components/LoginForm';
import Dashboard from '@/pages/Dashboard';
import { motion } from 'framer-motion';

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="min-h-screen bg-chair-dark">
      {showSplash ? (
        <SplashScreen onFinish={handleSplashFinish} />
      ) : (
        isLoggedIn ? (
          <Dashboard />
        ) : (
          <LoginForm onLogin={handleLogin} />
        )
      )}
    </div>
  );
};

export default Index;
