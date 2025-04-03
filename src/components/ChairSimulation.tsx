
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';

interface ChairSimulationProps {
  lightOn: boolean;
  reclineAngle: number;
  footrestExtended: boolean;
  massageOn: boolean;
  deskOpen: boolean;
  drawerOpen: boolean;
  storageOpen: boolean;
}

// Chair component for the 3D model
const Chair = ({ 
  lightOn, 
  reclineAngle, 
  footrestExtended, 
  massageOn, 
  deskOpen, 
  drawerOpen, 
  storageOpen 
}) => {
  const chairRef = useRef(null);
  const chairLightRef = useRef(null);
  const chairBackRef = useRef(null);
  const footrestRef = useRef(null);
  const deskRef = useRef(null);
  const drawerRef = useRef(null);
  const storageRef = useRef(null);
  
  // Update chair components based on props
  useEffect(() => {
    // Update chair light
    if (chairLightRef.current) {
      chairLightRef.current.intensity = lightOn ? 1 : 0;
    }

    // Update chair back recline
    if (chairBackRef.current) {
      chairBackRef.current.rotation.x = -Math.PI * reclineAngle / 180;
    }

    // Update footrest
    if (footrestRef.current) {
      footrestRef.current.visible = footrestExtended;
    }

    // Update desk
    if (deskRef.current) {
      deskRef.current.visible = deskOpen;
    }

    // Update drawer
    if (drawerRef.current) {
      drawerRef.current.visible = drawerOpen;
    }

    // Update storage
    if (storageRef.current) {
      storageRef.current.visible = storageOpen;
    }
  }, [lightOn, reclineAngle, footrestExtended, massageOn, deskOpen, drawerOpen, storageOpen]);

  // Animation for massage function
  useFrame(() => {
    if (massageOn && chairRef.current) {
      chairRef.current.position.y = Math.sin(Date.now() * 0.01) * 0.02;
    }
  });

  return (
    <group ref={chairRef}>
      {/* Chair base */}
      <mesh position={[0, -1.5, 0]} receiveShadow>
        <boxGeometry args={[2, 0.2, 2]} />
        <meshPhongMaterial color={0x333333} />
      </mesh>

      {/* Chair seat */}
      <mesh position={[0, -1, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 0.3, 1.5]} />
        <meshPhongMaterial color={0x8B5CF6} />
      </mesh>

      {/* Chair back */}
      <mesh ref={chairBackRef} position={[0, 0, -0.75]} castShadow receiveShadow>
        <boxGeometry args={[1.4, 1.8, 0.3]} />
        <meshPhongMaterial color={0x8B5CF6} />
      </mesh>

      {/* Footrest */}
      <mesh ref={footrestRef} position={[0, -1.15, 1.15]} castShadow receiveShadow visible={footrestExtended}>
        <boxGeometry args={[1.4, 0.3, 0.8]} />
        <meshPhongMaterial color={0x8B5CF6} />
      </mesh>

      {/* Desk */}
      <mesh ref={deskRef} position={[0, -0.7, 0.9]} castShadow receiveShadow visible={deskOpen}>
        <boxGeometry args={[1.2, 0.1, 0.8]} />
        <meshPhongMaterial color={0x33C3F0} />
      </mesh>

      {/* Drawer */}
      <mesh ref={drawerRef} position={[0.8, -0.7, 0.9]} castShadow receiveShadow visible={drawerOpen}>
        <boxGeometry args={[0.6, 0.15, 0.4]} />
        <meshPhongMaterial color={0xD946EF} />
      </mesh>

      {/* Storage compartment */}
      <mesh ref={storageRef} position={[-1, -0.7, 0]} castShadow receiveShadow visible={storageOpen}>
        <boxGeometry args={[0.5, 0.5, 1]} />
        <meshPhongMaterial color={0xD946EF} />
      </mesh>

      {/* Chair light */}
      <pointLight ref={chairLightRef} position={[0, 1, 0]} intensity={lightOn ? 1 : 0} distance={3} />

      {/* Charging indicators */}
      <mesh position={[0.8, -0.9, -0.5]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshPhongMaterial color={0x33C3F0} emissive={0x33C3F0} emissiveIntensity={0.5} />
      </mesh>

      <mesh position={[0.8, -0.7, -0.5]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshPhongMaterial color={0xD946EF} emissive={0xD946EF} emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
};

// Scene setup with lights and camera
const ChairScene = (props) => {
  const { scene } = useThree();
  
  useEffect(() => {
    // Set scene background
    scene.background = new THREE.Color(0x221F26);
  }, [scene]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
      <OrbitControls enableDamping dampingFactor={0.05} />
      <Chair {...props} />
    </>
  );
};

// Main component wrapping the Canvas
const ChairSimulation: React.FC<ChairSimulationProps> = (props) => {
  // Sound effects
  const playSound = (soundType: string) => {
    const sounds: Record<string, string> = {
      recline: 'chair_recline.mp3',
      footrest: 'footrest_move.mp3',
      light: 'light_switch.mp3',
      massage: 'massage_motor.mp3',
      desk: 'desk_open.mp3',
      drawer: 'drawer_open.mp3',
      storage: 'storage_open.mp3',
    };
    
    // In a real implementation, we would load and play actual sound files
    console.log(`Playing sound: ${sounds[soundType]}`);
  };

  return (
    <div className="w-full h-full rounded-lg overflow-hidden" style={{ minHeight: '400px' }}>
      <Canvas shadows camera={{ position: [0, 2, 5], fov: 75 }}>
        <ChairScene {...props} />
      </Canvas>
    </div>
  );
};

export default ChairSimulation;
