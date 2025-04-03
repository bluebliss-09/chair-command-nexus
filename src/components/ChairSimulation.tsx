
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

interface ChairSimulationProps {
  lightOn: boolean;
  reclineAngle: number;
  footrestExtended: boolean;
  massageOn: boolean;
  deskOpen: boolean;
  drawerOpen: boolean;
  storageOpen: boolean;
}

const ChairSimulation: React.FC<ChairSimulationProps> = ({
  lightOn,
  reclineAngle,
  footrestExtended,
  massageOn,
  deskOpen,
  drawerOpen,
  storageOpen,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const chairRef = useRef<THREE.Group | null>(null);
  const chairLightRef = useRef<THREE.PointLight | null>(null);
  const chairBackRef = useRef<THREE.Mesh | null>(null);
  const footrestRef = useRef<THREE.Mesh | null>(null);
  const deskRef = useRef<THREE.Mesh | null>(null);
  const drawerRef = useRef<THREE.Mesh | null>(null);
  const storageRef = useRef<THREE.Mesh | null>(null);
  const frameRef = useRef<number>(0);

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

  // Initialize the 3D scene
  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x221F26);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    camera.position.y = 2;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controlsRef.current = controls;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Chair group
    const chairGroup = new THREE.Group();
    scene.add(chairGroup);
    chairRef.current = chairGroup;

    // Chair base
    const baseGeometry = new THREE.BoxGeometry(2, 0.2, 2);
    const baseMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
    const baseBox = new THREE.Mesh(baseGeometry, baseMaterial);
    baseBox.position.y = -1.5;
    baseBox.receiveShadow = true;
    chairGroup.add(baseBox);

    // Chair seat
    const seatGeometry = new THREE.BoxGeometry(1.5, 0.3, 1.5);
    const seatMaterial = new THREE.MeshPhongMaterial({ color: 0x8B5CF6 });
    const seatBox = new THREE.Mesh(seatGeometry, seatMaterial);
    seatBox.position.y = -1;
    seatBox.castShadow = true;
    seatBox.receiveShadow = true;
    chairGroup.add(seatBox);

    // Chair back
    const backGeometry = new THREE.BoxGeometry(1.4, 1.8, 0.3);
    const backMaterial = new THREE.MeshPhongMaterial({ color: 0x8B5CF6 });
    const backBox = new THREE.Mesh(backGeometry, backMaterial);
    backBox.position.set(0, 0, -0.75);
    backBox.castShadow = true;
    backBox.receiveShadow = true;
    chairGroup.add(backBox);
    chairBackRef.current = backBox;

    // Footrest
    const footrestGeometry = new THREE.BoxGeometry(1.4, 0.3, 0.8);
    const footrestMaterial = new THREE.MeshPhongMaterial({ color: 0x8B5CF6 });
    const footrestBox = new THREE.Mesh(footrestGeometry, footrestMaterial);
    footrestBox.position.set(0, -1.15, 1.15);
    footrestBox.visible = false;
    footrestBox.castShadow = true;
    footrestBox.receiveShadow = true;
    chairGroup.add(footrestBox);
    footrestRef.current = footrestBox;

    // Desk
    const deskGeometry = new THREE.BoxGeometry(1.2, 0.1, 0.8);
    const deskMaterial = new THREE.MeshPhongMaterial({ color: 0x33C3F0 });
    const deskBox = new THREE.Mesh(deskGeometry, deskMaterial);
    deskBox.position.set(0, -0.7, 0.9);
    deskBox.visible = false;
    deskBox.castShadow = true;
    deskBox.receiveShadow = true;
    chairGroup.add(deskBox);
    deskRef.current = deskBox;

    // Drawer
    const drawerGeometry = new THREE.BoxGeometry(0.6, 0.15, 0.4);
    const drawerMaterial = new THREE.MeshPhongMaterial({ color: 0xD946EF });
    const drawerBox = new THREE.Mesh(drawerGeometry, drawerMaterial);
    drawerBox.position.set(0.8, -0.7, 0.9);
    drawerBox.visible = false;
    drawerBox.castShadow = true;
    drawerBox.receiveShadow = true;
    chairGroup.add(drawerBox);
    drawerRef.current = drawerBox;

    // Storage compartment
    const storageGeometry = new THREE.BoxGeometry(0.5, 0.5, 1);
    const storageMaterial = new THREE.MeshPhongMaterial({ color: 0xD946EF });
    const storageBox = new THREE.Mesh(storageGeometry, storageMaterial);
    storageBox.position.set(-1, -0.7, 0);
    storageBox.visible = false;
    storageBox.castShadow = true;
    storageBox.receiveShadow = true;
    chairGroup.add(storageBox);
    storageRef.current = storageBox;

    // Chair light
    const chairLight = new THREE.PointLight(0xFFFFFF, 0, 3);
    chairLight.position.set(0, 1, 0);
    chairGroup.add(chairLight);
    chairLightRef.current = chairLight;

    // Charging indicators
    const chargerGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    
    // Laptop charger
    const laptopChargerMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x33C3F0,
      emissive: 0x33C3F0,
      emissiveIntensity: 0.5
    });
    const laptopCharger = new THREE.Mesh(chargerGeometry, laptopChargerMaterial);
    laptopCharger.position.set(0.8, -0.9, -0.5);
    chairGroup.add(laptopCharger);

    // Mobile charger
    const mobileChargerMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xD946EF,
      emissive: 0xD946EF,
      emissiveIntensity: 0.5
    });
    const mobileCharger = new THREE.Mesh(chargerGeometry, mobileChargerMaterial);
    mobileCharger.position.set(0.8, -0.7, -0.5);
    chairGroup.add(mobileCharger);

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      
      if (controlsRef.current) {
        controlsRef.current.update();
      }

      if (massageOn && chairRef.current) {
        chairRef.current.position.y = Math.sin(Date.now() * 0.01) * 0.02;
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current || !cameraRef.current || !rendererRef.current) return;
      
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      
      rendererRef.current.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameRef.current);
      
      if (rendererRef.current && mountRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, []);

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

  return (
    <div 
      ref={mountRef} 
      className="w-full h-full rounded-lg overflow-hidden"
      style={{ minHeight: '400px' }}
    />
  );
};

export default ChairSimulation;
