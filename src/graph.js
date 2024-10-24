import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import data from './sample.json'; 

const GraphComponent = () => {
  const [cylinders, setCylinders] = useState([]);

  useEffect(() => {
    const tempCylinders = data.A.map(point => {
      const start = point["Start Node"];
      const end = point["End Node"];
      const height = Math.abs(end - start);
      
      const geometry = new THREE.CylinderGeometry(0.1, 0.1, height, 32);
      const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
      const cylinder = new THREE.Mesh(geometry, material);
      
  
      cylinder.position.set(0, (start + end) / 2, 0);
      cylinder.rotation.x = Math.PI / 2;
      
      return cylinder;
    });
    setCylinders(tempCylinders);
  }, []);

  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <gridHelper args={[100, 100]} /> 
      <OrbitControls />
      {cylinders.map((cylinder, index) => (
        <primitive object={cylinder} key={index} />
      ))}
    </Canvas>
  );
};

export default GraphComponent;
