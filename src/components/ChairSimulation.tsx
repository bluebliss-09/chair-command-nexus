import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';

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
  const chairBackPivotRef = useRef(null);
  const footrestRef = useRef(null);
  const deskRef = useRef(null);
  const drawerRef = useRef(null);
  const storageRef = useRef(null);
  
  // Target recline angle for smooth animation
  const targetReclineRef = useRef(0);
  
  useEffect(() => {
    // Set target recline angle
    targetReclineRef.current = -Math.PI * reclineAngle / 180;
  }, [reclineAngle]);

  // Update chair components based on props
  useEffect(() => {
    // Update chair light
    if (chairLightRef.current) {
      chairLightRef.current.intensity = lightOn ? 1 : 0;
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
  }, [lightOn, footrestExtended, massageOn, deskOpen, drawerOpen, storageOpen]);

  // Animation for massage function and smooth recline
  useFrame(() => {
    // Massage animation
    if (massageOn && chairRef.current) {
      chairRef.current.position.y = Math.sin(Date.now() * 0.01) * 0.02;
    }
    
    // Smooth recline animation
    if (chairBackPivotRef.current) {
      const currentAngle = chairBackPivotRef.current.rotation.x;
      const targetAngle = targetReclineRef.current;
      
      // Smoothly interpolate between current and target angle
      chairBackPivotRef.current.rotation.x = THREE.MathUtils.lerp(
        currentAngle, 
        targetAngle, 
        0.1
      );
    }
  });

  return (
    <group ref={chairRef}>
      {/* Chair base - slightly rounded */}
      <mesh position={[0, -1.6, 0]} receiveShadow>
        <cylinderGeometry args={[1.2, 1.3, 0.3, 16]} />
        <meshPhongMaterial color={0x333333} />
      </mesh>
      
      {/* Chair post */}
      <mesh position={[0, -1.2, 0]} receiveShadow>
        <cylinderGeometry args={[0.2, 0.25, 0.8, 16]} />
        <meshPhongMaterial color={0x555555} />
      </mesh>

      {/* Chair seat - slightly rounded */}
      <mesh position={[0, -0.9, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.8, 0.2, 1.8]} />
        <meshPhongMaterial color={0x8B5CF6} />
      </mesh>
      <mesh position={[0, -0.7, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.7, 0.1, 1.7]} />
        <meshPhongMaterial color={0x7E69AB} />
      </mesh>
      
      {/* Armrests */}
      <mesh position={[0.95, -0.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.2, 0.1, 1.5]} />
        <meshPhongMaterial color={0x333333} />
      </mesh>
      <mesh position={[-0.95, -0.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.2, 0.1, 1.5]} />
        <meshPhongMaterial color={0x333333} />
      </mesh>

      {/* Chair back pivot point - this is what rotates for reclining */}
      <group ref={chairBackPivotRef} position={[0, -0.8, -0.85]}>
        {/* Chair back with cushions */}
        <group ref={chairBackRef} position={[0, 1, 0]}>
          {/* Main back panel */}
          <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.6, 1.8, 0.15]} />
            <meshPhongMaterial color={0x333333} />
          </mesh>
          
          {/* Back cushion */}
          <mesh position={[0, 0.9, 0.1]} castShadow receiveShadow>
            <boxGeometry args={[1.4, 1.6, 0.2]} />
            <meshPhongMaterial color={0x8B5CF6} />
          </mesh>
          
          {/* Headrest */}
          <mesh position={[0, 1.8, 0.2]} castShadow receiveShadow>
            <boxGeometry args={[1.2, 0.4, 0.3]} />
            <meshPhongMaterial color={0x8B5CF6} />
          </mesh>
          
          {/* Lumbar support */}
          <mesh position={[0, 0.3, 0.2]} castShadow receiveShadow>
            <boxGeometry args={[1.3, 0.4, 0.3]} />
            <meshPhongMaterial color={0x7E69AB} />
          </mesh>
        </group>
      </group>

      {/* Footrest - with improved shape */}
      <mesh 
        ref={footrestRef} 
        position={[0, -0.85, 1.3]} 
        castShadow 
        receiveShadow 
        visible={footrestExtended}
      >
        <boxGeometry args={[1.6, 0.2, 0.8]} />
        <meshPhongMaterial color={0x8B5CF6} />
      </mesh>
      <mesh 
        position={[0, -0.75, 1.65]} 
        castShadow 
        receiveShadow 
        visible={footrestExtended}
      >
        <boxGeometry args={[1.5, 0.15, 0.2]} />
        <meshPhongMaterial color={0x7E69AB} />
      </mesh>

      {/* Desk - improved with border */}
      <group visible={deskOpen}>
        <mesh 
          ref={deskRef} 
          position={[0, -0.65, 0.9]} 
          castShadow 
          receiveShadow
        >
          <boxGeometry args={[1.4, 0.05, 1]} />
          <meshPhongMaterial color={0x33C3F0} />
        </mesh>
        <mesh 
          position={[0, -0.69, 0.9]} 
          castShadow 
          receiveShadow
        >
          <boxGeometry args={[1.45, 0.03, 1.05]} />
          <meshPhongMaterial color={0x222222} />
        </mesh>
      </group>

      {/* Drawer - improved */}
      <group visible={drawerOpen}>
        <mesh 
          ref={drawerRef} 
          position={[0.85, -0.65, 0.9]} 
          castShadow 
          receiveShadow
        >
          <boxGeometry args={[0.6, 0.15, 0.4]} />
          <meshPhongMaterial color={0xD946EF} />
        </mesh>
        <mesh 
          position={[0.85, -0.65, 0.7]} 
          castShadow 
          receiveShadow
        >
          <boxGeometry args={[0.5, 0.1, 0.05]} />
          <meshPhongMaterial color={0x222222} />
        </mesh>
      </group>

      {/* Storage compartment - improved */}
      <group visible={storageOpen}>
        <mesh 
          ref={storageRef} 
          position={[-1, -0.65, 0]} 
          castShadow 
          receiveShadow
        >
          <boxGeometry args={[0.5, 0.5, 1]} />
          <meshPhongMaterial color={0xD946EF} />
        </mesh>
        <mesh 
          position={[-1.25, -0.65, 0]} 
          castShadow 
          receiveShadow
        >
          <boxGeometry args={[0.05, 0.4, 0.9]} />
          <meshPhongMaterial color={0x222222} />
        </mesh>
      </group>

      {/* Chair light */}
      <pointLight 
        ref={chairLightRef} 
        position={[0, 1.5, 0]} 
        intensity={lightOn ? 1 : 0} 
        distance={5}
        color={0xf0f0ff} 
      />

      {/* Charging indicators */}
      <mesh position={[0.8, -0.9, -0.5]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshPhongMaterial 
          color={0x33C3F0} 
          emissive={0x33C3F0} 
          emissiveIntensity={0.5} 
        />
      </mesh>

      <mesh position={[0.8, -0.7, -0.5]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshPhongMaterial 
          color={0xD946EF} 
          emissive={0xD946EF} 
          emissiveIntensity={0.5} 
        />
      </mesh>
      
      {/* USB ports */}
      <mesh position={[0.8, -0.8, -0.6]} rotation={[0, Math.PI/2, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.05, 8]} />
        <meshStandardMaterial color={0x888888} />
      </mesh>
      <mesh position={[0.8, -0.6, -0.6]} rotation={[0, Math.PI/2, 0]}>
        <boxGeometry args={[0.05, 0.02, 0.04]} />
        <meshStandardMaterial color={0x888888} />
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
    
    // Enable shadows
    scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
  }, [scene]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[5, 10, 5]} 
        intensity={0.8} 
        castShadow 
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight 
        position={[-5, 5, -5]} 
        intensity={0.4} 
      />
      <OrbitControls 
        enableDamping 
        dampingFactor={0.05} 
        minPolarAngle={Math.PI * 0.1}
        maxPolarAngle={Math.PI * 0.9}
      />
      <Chair {...props} />
      
      {/* Floor for shadow casting */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <shadowMaterial opacity={0.3} />
      </mesh>
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
      <Canvas 
        shadows 
        camera={{ position: [0, 1, 6], fov: 50 }}
        gl={{ antialias: true }}
      >
        <ChairScene {...props} />
      </Canvas>
    </div>
  );
};

export default ChairSimulation;
