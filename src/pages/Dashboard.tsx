
import React, { useState, useEffect } from 'react';
import ChairSimulation from '@/components/ChairSimulation';
import ControlPanel from '@/components/ControlPanel';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { LogOut, Menu, X, Bluetooth, Wifi, HelpCircle, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from "sonner";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [connectStatus, setConnectStatus] = useState('disconnected');
  const [lightOn, setLightOn] = useState(false);
  const [reclineAngle, setReclineAngle] = useState(0);
  const [footrestExtended, setFootrestExtended] = useState(false);
  const [massageOn, setMassageOn] = useState(false);
  const [deskOpen, setDeskOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [storageOpen, setStorageOpen] = useState(false);

  // Simulate connection to chair
  const toggleConnection = () => {
    if (connectStatus === 'disconnected') {
      setConnectStatus('connecting');
      
      // Simulate connection delay
      setTimeout(() => {
        setConnectStatus('connected');
        toast.success("Successfully connected to Chakrachaise");
      }, 2000);
    } else if (connectStatus === 'connected') {
      setConnectStatus('disconnected');
      toast.info("Disconnected from Chakrachaise");
    }
  };

  const handleLogout = () => {
    toast.info("Logging out...");
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-chair-dark text-white">
      {/* Header */}
      <header className="bg-secondary shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="mr-4 p-2 rounded-full hover:bg-gray-700 focus:outline-none"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="text-xl font-bold">Chakrachaise</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleConnection}
              className={`flex items-center gap-2 ${
                connectStatus === 'connected' ? 'bg-green-900 hover:bg-green-800' : 
                connectStatus === 'connecting' ? 'bg-yellow-900 hover:bg-yellow-800' : 
                'bg-transparent'
              }`}
            >
              {connectStatus === 'disconnected' && <Bluetooth size={16} />}
              {connectStatus === 'connecting' && (
                <span className="inline-block w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
              )}
              {connectStatus === 'connected' && <Wifi size={16} />}
              <span>
                {connectStatus === 'disconnected' && 'Connect'}
                {connectStatus === 'connecting' && 'Connecting...'}
                {connectStatus === 'connected' && 'Connected'}
              </span>
            </Button>
          </div>
        </div>
      </header>

      {/* Sidebar Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 h-full w-64 bg-secondary z-20 shadow-xl pt-16"
          >
            <div className="px-4 py-2">
              <div className="space-y-1">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start" 
                  onClick={() => {
                    setMenuOpen(false);
                    toast("Opening settings...");
                  }}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="w-full justify-start" 
                  onClick={() => {
                    setMenuOpen(false);
                    toast("Opening help...");
                  }}
                >
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Help & Support
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-900/20" 
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold mb-2">Welcome to your Chakrachaise</h2>
          <p className="text-gray-400">Control your smart chair with ease.</p>
        </motion.div>

        {/* Connection status banner */}
        {connectStatus !== 'connected' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-yellow-900/30 border border-yellow-800 rounded-lg p-4 mb-8 flex items-center justify-between"
          >
            <div className="flex items-center">
              <Bluetooth className="h-5 w-5 text-yellow-500 mr-2" />
              <p className="text-yellow-200">
                {connectStatus === 'connecting' 
                  ? 'Connecting to your Chakrachaise...' 
                  : 'Your chair is not connected. Connect to control it.'}
              </p>
            </div>
            {connectStatus === 'disconnected' && (
              <Button 
                size="sm" 
                className="bg-yellow-700 hover:bg-yellow-600"
                onClick={toggleConnection}
              >
                Connect Now
              </Button>
            )}
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chair Simulation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full bg-secondary rounded-xl overflow-hidden shadow-xl"
            style={{ minHeight: '400px' }}
          >
            <ChairSimulation
              lightOn={lightOn}
              reclineAngle={reclineAngle}
              footrestExtended={footrestExtended}
              massageOn={massageOn}
              deskOpen={deskOpen}
              drawerOpen={drawerOpen}
              storageOpen={storageOpen}
            />
          </motion.div>

          {/* Control Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <ControlPanel
              lightOn={lightOn}
              setLightOn={setLightOn}
              reclineAngle={reclineAngle}
              setReclineAngle={setReclineAngle}
              footrestExtended={footrestExtended}
              setFootrestExtended={setFootrestExtended}
              massageOn={massageOn}
              setMassageOn={setMassageOn}
              deskOpen={deskOpen}
              setDeskOpen={setDeskOpen}
              drawerOpen={drawerOpen}
              setDrawerOpen={setDrawerOpen}
              storageOpen={storageOpen}
              setStorageOpen={setStorageOpen}
            />
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
