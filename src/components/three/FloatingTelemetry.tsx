import React from 'react';
import { Html } from '@react-three/drei';

interface Props {
  production: number;
  temperature: number;
  srpSpeed: number;
  pumpEfficiency: number;
  steamRate: number;
}

export default function FloatingTelemetry({
  production,
  temperature,
  srpSpeed,
  pumpEfficiency,
  steamRate
}: Props) {

  const Label = ({ 
    title, 
    value, 
    unit, 
    position 
  }: { 
    title: string; 
    value: string | number; 
    unit: string; 
    position: [number, number, number]; 
  }) => (
    <Html position={position} center distanceFactor={22}>
      <div className="bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-md rounded-lg px-2.5 py-1.5 border border-slate-700/80 shadow-lg min-w-[110px] pointer-events-none select-none">
        <div className="text-[9px] uppercase text-slate-400 font-bold tracking-wider mb-0.5 flex justify-between items-center gap-1">
          <span>{title}</span>
          <span className="text-[7px] font-mono text-cyan-400">SIM</span>
        </div>
        <div className="flex items-baseline gap-1 font-mono">
          <span className="text-sm font-black text-amber-400">{value}</span>
          <span className="text-[10px] text-slate-400">{unit}</span>
        </div>
      </div>
    </Html>
  );

  return (
    <group>
      {/* 1. Surface Wellhead Telemetry */}
      <Label title="SURFACE FLOW" value={production.toFixed(1)} unit="bbl/d" position={[-3.6, 2.2, 0]} />
      
      {/* 2. Pumping Unit SPM */}
      <Label title="SRP STROKE" value={srpSpeed.toFixed(1)} unit="SPM" position={[4.2, 5.2, 0]} />
      
      {/* 3. Subsurface Reservoir Temperature */}
      <Label title="RES. TEMP" value={temperature.toFixed(1)} unit="°C" position={[5.2, -26.0, 0]} />
      
      {/* 4. Downhole Pump Efficiency */}
      <Label title="PUMP EFF." value={pumpEfficiency.toFixed(1)} unit="%" position={[-4.2, -31.5, 0]} />
      
      {/* 5. Steam Injection Rate */}
      <Label title="STEAM FLUX" value={steamRate.toFixed(0)} unit="units" position={[5.2, -30.5, 0]} />
    </group>
  );
}
