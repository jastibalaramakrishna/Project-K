import React from 'react';
import { useSimulationStore } from '../../stores/simulationStore';
import { useUiStore } from '../../stores/uiStore';

export default function TelemetryBar() {
  const { output, cssPhase, params } = useSimulationStore();
  const sidebarCollapsed = useUiStore((s) => s.sidebarCollapsed);

  return (
    <div 
      className="fixed bottom-0 right-0 z-30 h-[34px] bg-[var(--bg-panel)] border-t border-[var(--border-color)] text-[var(--text-secondary)] flex items-center justify-between px-4 text-[11px] font-mono select-none transition-all duration-300"
      style={{ left: sidebarCollapsed ? '64px' : '220px' }}
    >
      <div className="flex items-center gap-4 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-[var(--text-muted)]">WELL:</span>
          <span className="text-amber-500 font-bold">BGW-DEMO-01</span>
        </div>
        
        <div className="h-3 w-px bg-[var(--border-color)] shrink-0"></div>

        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-[var(--text-muted)]">CSS:</span>
          <span className="text-amber-500 font-bold uppercase">{cssPhase}</span>
        </div>

        <div className="h-3 w-px bg-[var(--border-color)] shrink-0"></div>

        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-[var(--text-muted)]">SRP:</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">{params.srpSpeed} SPM</span>
        </div>

        <div className="h-3 w-px bg-[var(--border-color)] shrink-0"></div>

        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-[var(--text-muted)]">PROD:</span>
          <span className="text-cyan-600 dark:text-cyan-400 font-bold">{output.production.toFixed(1)} bbl/d</span>
        </div>

        <div className="h-3 w-px bg-[var(--border-color)] shrink-0"></div>

        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-[var(--text-muted)]">TEMP:</span>
          <span className="text-orange-500 font-bold">{output.reservoirTemperature.toFixed(1)} °C</span>
        </div>

        <div className="h-3 w-px bg-[var(--border-color)] shrink-0"></div>

        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-[var(--text-muted)]">RISK:</span>
          <span className={output.equipmentRisk === 'high' ? 'text-red-500 font-bold' : output.equipmentRisk === 'medium' ? 'text-amber-500 font-bold' : 'text-emerald-600 dark:text-emerald-400 font-bold'}>
            {output.equipmentRisk.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-3 shrink-0 text-[var(--text-muted)] text-[10px]">
        <span>PROTOTYPE ENGINE</span>
        <span>•</span>
        <span className="text-cyan-600 dark:text-cyan-400">OIL INDIA LIMITED</span>
      </div>
    </div>
  );
}
