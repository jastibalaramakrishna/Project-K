import React, { useState } from 'react';
import { useSimulationStore } from '../stores/simulationStore';
import { useUiStore } from '../stores/uiStore';
import { useThemeStore } from '../stores/themeStore';
import DigitalTwinScene from '../components/three/DigitalTwinScene';
import SliderControl from '../components/controls/SliderControl';
import SimulatedTag from '../components/ui/SimulatedTag';
import { 
  Camera, Maximize, Layers, Thermometer, Flame, ArrowUpDown, 
  X, Activity, Sparkles 
} from 'lucide-react';
import { CSSPhase } from '../data/types';

export default function DigitalTwin() {
  const { params, output, cssPhase, setParam, setCSSPhase } = useSimulationStore();
  const { cameraMode, setCameraMode } = useUiStore();
  const theme = useThemeStore((s) => s.theme);
  const isDark = theme === 'dark';

  const [inspectedComponent, setInspectedComponent] = useState<{
    name: string;
    data: Record<string, string>;
  } | null>(null);

  const handleObjectClick = (name: string, data: any) => {
    setInspectedComponent({ name, data });
  };

  const cameraPresets = [
    { id: 'full', label: 'FULL WELL', icon: Maximize },
    { id: 'surface', label: 'SURFACE', icon: Camera },
    { id: 'wellbore', label: 'WELLBORE', icon: Layers },
    { id: 'reservoir', label: 'RESERVOIR', icon: Thermometer },
  ];

  const cssPhases: { id: CSSPhase; label: string; color: string }[] = [
    { id: 'injection', label: 'INJECTION', color: 'bg-red-500 text-white' },
    { id: 'soaking', label: 'SOAK', color: 'bg-amber-500 text-slate-950' },
    { id: 'production', label: 'PRODUCTION', color: 'bg-emerald-500 text-white' },
  ];

  return (
    <div className="relative w-full h-[calc(100vh-86px)] flex overflow-hidden bg-[var(--bg-app)] select-none">
      {/* =========================================================================
          LEFT 75%: 3D DIGITAL TWIN VIRTUAL WELL VIEWPORT
          ========================================================================= */}
      <div className="flex-1 relative h-full">
        <DigitalTwinScene
          params={params}
          output={output}
          cssPhase={cssPhase}
          cameraMode={cameraMode}
          isDark={isDark}
          showTelemetry={true}
          compact={false}
          onObjectClick={handleObjectClick}
        />

        {/* Top-Left: Camera View Presets */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-[var(--bg-panel)]/95 backdrop-blur-md p-1.5 rounded-xl border border-[var(--border-color)] shadow-md">
          {cameraPresets.map((preset) => {
            const Icon = preset.icon;
            const isActive = cameraMode === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => setCameraMode(preset.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider transition-all ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{preset.label}</span>
              </button>
            );
          })}
        </div>

        {/* Top-Right: Mouse Controls Hint */}
        <div className="hidden lg:flex absolute top-4 right-4 z-20 items-center gap-3 bg-[var(--bg-panel)]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[var(--border-color)] shadow-sm text-[10px] text-[var(--text-muted)] font-mono">
          <span>🖱️ Left Drag: Orbit</span>
          <span>•</span>
          <span>Right Drag: Pan</span>
          <span>•</span>
          <span>Wheel: Zoom</span>
          <span>•</span>
          <span>Double-Click: Focus</span>
        </div>

        {/* Bottom-Left: Asset Identity */}
        <div className="absolute bottom-4 left-4 z-20 bg-[var(--bg-panel)]/90 backdrop-blur-md px-3 py-2 rounded-xl border border-[var(--border-color)] shadow-sm text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-bold text-[var(--text-primary)]">WELL BGW-DEMO-01</span>
            <SimulatedTag label="CUTAWAY VIEW" />
          </div>
        </div>

        {/* Interactive Component Inspection Card Modal */}
        {inspectedComponent && (
          <div className="absolute top-16 left-4 z-30 w-72 bg-[var(--bg-panel)]/95 backdrop-blur-md border border-amber-500/50 shadow-2xl rounded-xl p-4 transition-all">
            <div className="flex justify-between items-start mb-2.5 border-b border-[var(--border-subtle)] pb-2">
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-[var(--text-primary)]">
                  {inspectedComponent.name}
                </h4>
                <p className="text-[10px] text-amber-500 font-mono">Telemetry Inspection</p>
              </div>
              <button
                onClick={() => setInspectedComponent(null)}
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] p-1"
                aria-label="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-1.5 text-xs font-mono">
              {Object.entries(inspectedComponent.data).map(([key, val]) => (
                <div key={key} className="flex justify-between items-center py-1 border-b border-[var(--border-subtle)]">
                  <span className="text-[var(--text-muted)] capitalize text-[11px] font-sans">{key}:</span>
                  <span className="font-semibold text-[var(--text-primary)] text-right">{val}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* =========================================================================
          RIGHT 25%: COMPACT ENGINEERING TWIN CONTROLS & TELEMETRY
          ========================================================================= */}
      <div className="w-[290px] lg:w-[320px] bg-[var(--bg-panel)] border-l border-[var(--border-color)] p-4 flex flex-col justify-between overflow-y-auto shadow-sm shrink-0 z-20 space-y-4">
        <div className="space-y-4">
          {/* Header */}
          <div className="border-b border-[var(--border-color)] pb-2.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber-500" />
              <span>Twin Operating Controls</span>
            </h2>
            <p className="text-[10px] text-[var(--text-muted)]">Tune well parameters to simulate physics</p>
          </div>

          {/* CSS Phase Selector */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
              CSS Cycle Stage
            </span>
            <div className="grid grid-cols-3 gap-1">
              {cssPhases.map((phase) => (
                <button
                  key={phase.id}
                  onClick={() => setCSSPhase(phase.id)}
                  className={`py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                    cssPhase === phase.id
                      ? `${phase.color} shadow-sm`
                      : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {phase.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sliders: Steam & Soaking */}
          <div className="space-y-3 pt-2 border-t border-[var(--border-subtle)]">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--text-primary)]">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>Thermal Injection Parameters</span>
            </div>

            <SliderControl
              label="Steam Injection Rate"
              value={params.steamRate}
              min={60}
              max={120}
              step={5}
              unit="units"
              onChange={(v) => setParam('steamRate', v)}
            />
            <SliderControl
              label="Soaking Time"
              value={params.soakDuration}
              min={2}
              max={5}
              step={0.5}
              unit="days"
              onChange={(v) => setParam('soakDuration', v)}
            />
          </div>

          {/* Sliders: SRP Artificial Lift */}
          <div className="space-y-3 pt-2 border-t border-[var(--border-subtle)]">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--text-primary)]">
              <ArrowUpDown className="w-3.5 h-3.5 text-cyan-500" />
              <span>SRP Mechanical Lift Parameters</span>
            </div>

            <SliderControl
              label="Pumping Speed"
              value={params.srpSpeed}
              min={4}
              max={10}
              step={0.5}
              unit="SPM"
              onChange={(v) => setParam('srpSpeed', v)}
            />
            <SliderControl
              label="Stroke Length"
              value={params.strokeLength}
              min={1.5}
              max={3.0}
              step={0.1}
              unit="m"
              onChange={(v) => setParam('strokeLength', v)}
            />
          </div>
        </div>

        {/* Real-Time Computed Telemetry Box */}
        <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-3 space-y-2 text-xs font-mono">
          <div className="flex justify-between items-center text-[10px] text-[var(--text-muted)] font-sans border-b border-[var(--border-subtle)] pb-1 font-bold uppercase tracking-wider">
            <span>Computed Telemetry</span>
            <span className="text-cyan-500">SIMULATED</span>
          </div>

          <div className="flex justify-between">
            <span className="text-[var(--text-muted)] font-sans">Predicted Oil Flow:</span>
            <span className="font-bold text-amber-500">{output.production.toFixed(1)} bbl/d</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--text-muted)] font-sans">Res. Temperature:</span>
            <span className="font-bold text-orange-400">{output.reservoirTemperature.toFixed(1)} °C</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--text-muted)] font-sans">Pump Efficiency:</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">{output.pumpEfficiency.toFixed(1)}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--text-muted)] font-sans">Equipment Risk:</span>
            <span className={output.equipmentRisk === 'high' ? 'text-red-500 font-bold' : output.equipmentRisk === 'medium' ? 'text-amber-500 font-bold' : 'text-emerald-600 dark:text-emerald-400 font-bold'}>
              {output.equipmentRisk.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
