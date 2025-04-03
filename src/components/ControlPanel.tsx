
import React from 'react';
import { 
  Lightbulb, 
  ChevronDown, 
  Move, 
  Activity, 
  Layers, 
  Inbox, 
  Battery, 
  PackagePlus 
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { motion } from 'framer-motion';

interface ControlPanelProps {
  lightOn: boolean;
  setLightOn: (value: boolean) => void;
  reclineAngle: number;
  setReclineAngle: (value: number) => void;
  footrestExtended: boolean;
  setFootrestExtended: (value: boolean) => void;
  massageOn: boolean;
  setMassageOn: (value: boolean) => void;
  deskOpen: boolean;
  setDeskOpen: (value: boolean) => void;
  drawerOpen: boolean;
  setDrawerOpen: (value: boolean) => void;
  storageOpen: boolean;
  setStorageOpen: (value: boolean) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  lightOn,
  setLightOn,
  reclineAngle,
  setReclineAngle,
  footrestExtended,
  setFootrestExtended,
  massageOn,
  setMassageOn,
  deskOpen,
  setDeskOpen,
  drawerOpen,
  setDrawerOpen,
  storageOpen,
  setStorageOpen,
}) => {
  // Play sound effects for button clicks
  const playSound = (soundType: string) => {
    // In a real implementation, these would play actual sound files
    console.log(`Playing sound: ${soundType}`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-secondary p-6 rounded-xl shadow-xl"
    >
      <h2 className="text-2xl font-bold text-white mb-6">Chair Controls</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {/* Light Control */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex flex-col items-center"
        >
          <button
            onClick={() => {
              setLightOn(!lightOn);
              playSound('light');
            }}
            className={`chair-control-button ${lightOn ? 'active' : ''}`}
            aria-label="Toggle chair light"
          >
            <Lightbulb size={24} />
          </button>
          <span className="chair-control-label">Light</span>
        </motion.div>

        {/* Reclining Control */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex flex-col items-center col-span-2"
        >
          <div className="w-full mb-2">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-400">Recline</span>
              <span className="text-sm text-white">{reclineAngle}°</span>
            </div>
            <Slider
              value={[reclineAngle]}
              min={0}
              max={180}
              step={5}
              onValueChange={(value) => {
                setReclineAngle(value[0]);
                playSound('recline');
              }}
              className="w-full"
            />
          </div>
          <span className="chair-control-label">Recline</span>
        </motion.div>

        {/* Footrest Control */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex flex-col items-center"
        >
          <button
            onClick={() => {
              setFootrestExtended(!footrestExtended);
              playSound('footrest');
            }}
            className={`chair-control-button ${footrestExtended ? 'active' : ''}`}
            aria-label="Toggle footrest"
          >
            <Move size={24} />
          </button>
          <span className="chair-control-label">Footrest</span>
        </motion.div>

        {/* Massage Control */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex flex-col items-center"
        >
          <button
            onClick={() => {
              setMassageOn(!massageOn);
              playSound('massage');
            }}
            className={`chair-control-button ${massageOn ? 'active' : ''}`}
            aria-label="Toggle massage"
          >
            <Activity size={24} />
          </button>
          <span className="chair-control-label">Massage</span>
        </motion.div>

        {/* Desk Control */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex flex-col items-center"
        >
          <button
            onClick={() => {
              setDeskOpen(!deskOpen);
              playSound('desk');
            }}
            className={`chair-control-button ${deskOpen ? 'active' : ''}`}
            aria-label="Toggle desk"
          >
            <Layers size={24} />
          </button>
          <span className="chair-control-label">Desk</span>
        </motion.div>

        {/* Drawer Control */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex flex-col items-center"
        >
          <button
            onClick={() => {
              setDrawerOpen(!drawerOpen);
              playSound('drawer');
            }}
            className={`chair-control-button ${drawerOpen ? 'active' : ''}`}
            aria-label="Toggle drawer"
          >
            <Inbox size={24} />
          </button>
          <span className="chair-control-label">Drawer</span>
        </motion.div>

        {/* Charging Ports Indicator */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex flex-col items-center"
        >
          <div className="chair-control-button flex flex-col items-center justify-center cursor-default">
            <Battery size={24} />
            <div className="mt-1 flex space-x-2">
              <div className="w-2 h-2 rounded-full bg-chair-accent animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-chair-secondary animate-pulse"></div>
            </div>
          </div>
          <span className="chair-control-label">Charging</span>
        </motion.div>

        {/* Storage Control */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex flex-col items-center"
        >
          <button
            onClick={() => {
              setStorageOpen(!storageOpen);
              playSound('storage');
            }}
            className={`chair-control-button ${storageOpen ? 'active' : ''}`}
            aria-label="Toggle storage"
          >
            <PackagePlus size={24} />
          </button>
          <span className="chair-control-label">Storage</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ControlPanel;
