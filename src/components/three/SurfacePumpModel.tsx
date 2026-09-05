import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Props {
  srpSpeed: number;
  strokeLength: number;
  isActive?: boolean;
}

export default function SurfacePumpModel({ srpSpeed, strokeLength, isActive = true }: Props) {
  const walkingBeamGroup = useRef<THREE.Group>(null);
  const horseHeadRef = useRef<THREE.Group>(null);
  const crankGroup = useRef<THREE.Group>(null);
  const pitmanArmRef = useRef<THREE.Mesh>(null);
  const polishedRodTopRef = useRef<THREE.Mesh>(null);

  const currentAngle = useRef(0);

  // Dynamic kinematic simulation of standard beam pumping unit (API standard geometry)
  useFrame((_, delta) => {
    if (!isActive) return;

    const spm = Math.max(0.5, srpSpeed);
    const angularVelocity = spm * ((Math.PI * 2) / 60);
    currentAngle.current += delta * angularVelocity;
    const theta = currentAngle.current;

    // Crank rotation
    if (crankGroup.current) {
      crankGroup.current.rotation.z = -theta;
    }

    // Normalized stroke multiplier (API beam stroke geometry)
    const normalizedStroke = (strokeLength / 2.0); // baseline at 2.0m stroke
    const maxRockAngle = 0.14 * normalizedStroke; // ~8 degrees
    const beamAngle = Math.sin(theta) * maxRockAngle;

    if (walkingBeamGroup.current) {
      walkingBeamGroup.current.rotation.z = beamAngle;
    }

    // Polished rod vertical position synchronized with horsehead arc
    const rodLift = Math.sin(theta) * (0.35 * normalizedStroke);
    if (polishedRodTopRef.current) {
      polishedRodTopRef.current.position.y = 2.8 + rodLift;
    }

    // Pitman arm connection rotation compensation
    if (pitmanArmRef.current) {
      pitmanArmRef.current.rotation.z = Math.sin(theta) * 0.18;
    }
  });

  const steelDark = { color: '#334155', metalness: 0.85, roughness: 0.35 };
  const steelMid = { color: '#475569', metalness: 0.8, roughness: 0.4 };
  const amberAccent = { color: '#d97706', metalness: 0.7, roughness: 0.3 };
  const concreteColor = { color: '#64748b', metalness: 0.1, roughness: 0.9 };
  const brightSteel = { color: '#e2e8f0', metalness: 0.95, roughness: 0.2 };

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Concrete Foundation Pad */}
      <mesh position={[2.5, 0.1, 0]} receiveShadow>
        <boxGeometry args={[8.5, 0.2, 3.2]} />
        <meshStandardMaterial {...concreteColor} />
      </mesh>
      {/* Foundation Base Channels */}
      <mesh position={[2.5, 0.25, 0.8]} castShadow>
        <boxGeometry args={[8.0, 0.15, 0.25]} />
        <meshStandardMaterial {...steelDark} />
      </mesh>
      <mesh position={[2.5, 0.25, -0.8]} castShadow>
        <boxGeometry args={[8.0, 0.15, 0.25]} />
        <meshStandardMaterial {...steelDark} />
      </mesh>

      {/* 2. Samson Post (Structural A-Frame Structure) */}
      <group position={[1.8, 0.3, 0]}>
        {/* Front Left Leg */}
        <mesh position={[-0.4, 2.0, 0.6]} rotation={[0.08, 0, 0.12]} castShadow>
          <boxGeometry args={[0.2, 4.2, 0.2]} />
          <meshStandardMaterial {...steelDark} />
        </mesh>
        {/* Front Right Leg */}
        <mesh position={[-0.4, 2.0, -0.6]} rotation={[-0.08, 0, 0.12]} castShadow>
          <boxGeometry args={[0.2, 4.2, 0.2]} />
          <meshStandardMaterial {...steelDark} />
        </mesh>
        {/* Rear Left Leg */}
        <mesh position={[0.4, 2.0, 0.6]} rotation={[0.08, 0, -0.12]} castShadow>
          <boxGeometry args={[0.2, 4.2, 0.2]} />
          <meshStandardMaterial {...steelDark} />
        </mesh>
        {/* Rear Right Leg */}
        <mesh position={[0.4, 2.0, -0.6]} rotation={[-0.08, 0, -0.12]} castShadow>
          <boxGeometry args={[0.2, 4.2, 0.2]} />
          <meshStandardMaterial {...steelDark} />
        </mesh>
        {/* Cross Braces */}
        <mesh position={[0, 1.8, 0.58]} rotation={[0, 0, 0.7]} castShadow>
          <boxGeometry args={[0.12, 1.6, 0.08]} />
          <meshStandardMaterial {...steelMid} />
        </mesh>
        <mesh position={[0, 1.8, -0.58]} rotation={[0, 0, -0.7]} castShadow>
          <boxGeometry args={[0.12, 1.6, 0.08]} />
          <meshStandardMaterial {...steelMid} />
        </mesh>
        <mesh position={[0, 2.8, 0]} castShadow>
          <boxGeometry args={[0.7, 0.12, 1.1]} />
          <meshStandardMaterial {...steelDark} />
        </mesh>
        {/* Center Saddle Bearing Housing */}
        <mesh position={[0, 4.1, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.25, 0.25, 1.2, 16]} />
          <meshStandardMaterial {...amberAccent} />
        </mesh>
      </group>

      {/* 3. Walking Beam Assembly (Pivots at x=1.8, y=4.4) */}
      <group position={[1.8, 4.4, 0]} ref={walkingBeamGroup}>
        {/* Heavy Steel I-Beam */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[6.2, 0.55, 0.35]} />
          <meshStandardMaterial {...steelDark} />
        </mesh>
        {/* Beam Top and Bottom Flange Reinforcements */}
        <mesh position={[0, 0.3, 0]} castShadow>
          <boxGeometry args={[6.3, 0.08, 0.45]} />
          <meshStandardMaterial {...steelMid} />
        </mesh>
        <mesh position={[0, -0.3, 0]} castShadow>
          <boxGeometry args={[6.3, 0.08, 0.45]} />
          <meshStandardMaterial {...steelMid} />
        </mesh>

        {/* 4. Horsehead Arc Structure (Front end at x=-3.1) */}
        <group position={[-3.1, 0, 0]} ref={horseHeadRef}>
          {/* Curved Horsehead Web */}
          <mesh position={[0.2, 0.2, 0]} castShadow>
            <boxGeometry args={[0.6, 1.4, 0.25]} />
            <meshStandardMaterial {...amberAccent} />
          </mesh>
          {/* Curved Front Flange Arc */}
          <mesh position={[-0.15, -0.2, 0]} rotation={[0, 0, -0.3]} castShadow>
            <boxGeometry args={[0.12, 1.9, 0.4]} />
            <meshStandardMaterial {...steelDark} />
          </mesh>
          {/* Wireline Hanger Bridle */}
          <mesh position={[-0.2, -1.2, 0.12]}>
            <cylinderGeometry args={[0.015, 0.015, 1.8, 8]} />
            <meshStandardMaterial {...brightSteel} />
          </mesh>
          <mesh position={[-0.2, -1.2, -0.12]}>
            <cylinderGeometry args={[0.015, 0.015, 1.8, 8]} />
            <meshStandardMaterial {...brightSteel} />
          </mesh>
          {/* Polished Rod Carrier Bar */}
          <mesh position={[-0.2, -2.1, 0]} castShadow>
            <boxGeometry args={[0.2, 0.12, 0.45]} />
            <meshStandardMaterial {...amberAccent} />
          </mesh>
        </group>

        {/* 5. Rear Equalizer Bearing & Pitman Connection (Rear end at x=+3.0) */}
        <group position={[3.0, -0.1, 0]}>
          <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.15, 0.15, 1.2, 12]} />
            <meshStandardMaterial {...steelDark} />
          </mesh>
        </group>
      </group>

      {/* 6. Gearbox, Motor & Counterweight Crank Assembly */}
      <group position={[4.6, 0.3, 0]}>
        {/* Double Reduction Gearbox Housing */}
        <mesh position={[0, 0.7, 0]} castShadow>
          <boxGeometry args={[1.5, 1.2, 1.1]} />
          <meshStandardMaterial {...steelDark} />
        </mesh>
        {/* Electric Drive Motor */}
        <mesh position={[1.4, 0.45, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.35, 0.35, 0.9, 16]} />
          <meshStandardMaterial {...steelMid} />
        </mesh>
        {/* V-Belt Guard */}
        <mesh position={[1.0, 0.45, 0.6]} castShadow>
          <boxGeometry args={[1.1, 0.8, 0.15]} />
          <meshStandardMaterial {...amberAccent} />
        </mesh>

        {/* Low-Speed Crank Shaft & Rotating Counterweights */}
        <group position={[0, 0.7, 0]} ref={crankGroup}>
          {/* Main Low Speed Shaft */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.12, 0.12, 1.8, 16]} />
            <meshStandardMaterial {...brightSteel} />
          </mesh>
          {/* Left Crank Arm */}
          <mesh position={[0, 0.7, 0.75]} castShadow>
            <boxGeometry args={[0.35, 1.8, 0.12]} />
            <meshStandardMaterial {...steelDark} />
          </mesh>
          {/* Left Counterweight Segment */}
          <mesh position={[0, 1.1, 0.75]} castShadow>
            <boxGeometry args={[0.75, 0.9, 0.28]} />
            <meshStandardMaterial {...steelMid} />
          </mesh>
          {/* Right Crank Arm */}
          <mesh position={[0, 0.7, -0.75]} castShadow>
            <boxGeometry args={[0.35, 1.8, 0.12]} />
            <meshStandardMaterial {...steelDark} />
          </mesh>
          {/* Right Counterweight Segment */}
          <mesh position={[0, 1.1, -0.75]} castShadow>
            <boxGeometry args={[0.75, 0.9, 0.28]} />
            <meshStandardMaterial {...steelMid} />
          </mesh>
        </group>
      </group>

      {/* 7. Twin Pitman Arms (Connecting Crank to Walking Beam Equalizer) */}
      <group position={[4.6, 2.3, 0]}>
        <mesh position={[0, 0, 0.65]} ref={pitmanArmRef} castShadow>
          <cylinderGeometry args={[0.06, 0.06, 2.6, 12]} />
          <meshStandardMaterial {...steelMid} />
        </mesh>
        <mesh position={[0, 0, -0.65]} castShadow>
          <cylinderGeometry args={[0.06, 0.06, 2.6, 12]} />
          <meshStandardMaterial {...steelMid} />
        </mesh>
      </group>

      {/* 8. Top Polished Rod Section (Aligned vertically with Wellhead at x=-1.5, z=0) */}
      <mesh position={[-1.5, 2.8, 0]} ref={polishedRodTopRef}>
        <cylinderGeometry args={[0.035, 0.035, 3.2, 16]} />
        <meshStandardMaterial {...brightSteel} />
      </mesh>
    </group>
  );
}
