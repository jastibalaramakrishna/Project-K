import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSimulationStore } from '../stores/simulationStore';
import { useThemeStore } from '../stores/themeStore';
import KPIWidget from '../components/ui/KPIWidget';
import StatusBadge from '../components/ui/StatusBadge';
import SimulatedTag from '../components/ui/SimulatedTag';
import DigitalTwinScene from '../components/three/DigitalTwinScene';
import { DEMO_CSS_CYCLES } from '../data/mockCSS';
import { generateProductionHistory } from '../data/mockSensors';
import { 
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { Box, Activity, FlaskConical, ChevronRight } from 'lucide-react';

export default function Overview() {
  const { output, params, cssPhase } = useSimulationStore();
  const theme = useThemeStore((s) => s.theme);
  const isDark = theme === 'dark';
  const navigate = useNavigate();

  const prodHistory = useMemo(() => generateProductionHistory(7), []);
  
  const cycleData = useMemo(() => {
    return DEMO_CSS_CYCLES.slice(-8).map(c => ({
      cycle: `C${c.cycleNumber}`,
      oil: c.oilProduced,
      steam: c.steamVolume
    }));
  }, []);

  const chartColors = {
    primary: isDark ? '#f59e0b' : '#d97706',
    secondary: isDark ? '#06b6d4' : '#0891b2',
    grid: isDark ? '#243048' : '#DDD8CC',
    text: isDark ? '#94A3B8' : '#62625D',
    tooltipBg: isDark ? '#0F1626' : '#FFFDF7',
    tooltipBorder: isDark ? '#243048' : '#DDD8CC',
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Banner: Well Identity + Operating Status */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-[var(--bg-panel)] border border-[var(--border-color)] rounded-xl p-4 shadow-sm">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-lg md:text-xl font-extrabold tracking-tight text-[var(--text-primary)] flex items-center gap-2">
              <span>WELL BGW-DEMO-01</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </h1>
            <SimulatedTag label="DEMO PROTOTYPE" />
          </div>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Heavy Oil Asset · Cyclic Steam Stimulation & Sucker Rod Pump
          </p>
        </div>

        {/* Status badges */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <div className="px-2.5 py-1 rounded-md bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-color)]">
            CSS: <span className="text-amber-500 font-bold uppercase">{cssPhase}</span>
          </div>
          <div className="px-2.5 py-1 rounded-md bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-color)]">
            SRP: <span className="text-emerald-600 dark:text-emerald-400 font-bold">{params.srpSpeed} SPM</span>
          </div>
        </div>
      </div>

      {/* Row 1: Compact Engineering KPI Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <KPIWidget label="OIL PRODUCTION" value={output.production.toFixed(1)} unit="bbl/d" trend={2.3} simulated />
        <KPIWidget label="RESERVOIR TEMP" value={output.reservoirTemperature.toFixed(1)} unit="°C" trend={0.5} simulated />
        <KPIWidget label="STEAM INJECTION" value={params.steamRate.toFixed(0)} unit="t/cycle" trend={-1.2} simulated />
        <KPIWidget label="PUMP EFFICIENCY" value={output.pumpEfficiency.toFixed(1)} unit="%" trend={-0.8} simulated />
        <KPIWidget label="ENERGY CONSUMPTION" value={output.energyConsumption.toFixed(0)} unit="kWh" trend={1.1} simulated />
        
        {/* Risk Card */}
        <div className="bg-[var(--bg-panel)] rounded-xl border border-[var(--border-color)] p-3.5 flex flex-col justify-between shadow-sm">
          <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">EQUIPMENT RISK</span>
          <div className="my-1">
            <StatusBadge 
              status={output.equipmentRisk.toUpperCase()} 
              variant={output.equipmentRisk === 'high' ? 'error' : output.equipmentRisk === 'medium' ? 'warning' : 'success'} 
            />
          </div>
          <span className="text-[9px] font-mono text-[var(--text-muted)]">SCORE: {output.equipmentRiskScore.toFixed(0)}/100</span>
        </div>
      </div>

      {/* Row 2: Central 3D Digital Twin Cutaway Preview + Quick Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* 3D Cutaway Preview (2 Cols) */}
        <div className="lg:col-span-2 bg-[var(--bg-surface)] rounded-xl border border-[var(--border-color)] overflow-hidden relative shadow-sm h-[380px] flex flex-col">
          <div className="absolute top-3 left-3 z-10 flex items-center gap-2 pointer-events-none">
            <div className="bg-[var(--bg-panel)]/90 backdrop-blur-md px-3 py-1 rounded-lg border border-[var(--border-color)] shadow-sm flex items-center gap-2">
              <Box className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">
                Live Digital Twin Preview
              </span>
            </div>
          </div>

          <DigitalTwinScene 
            params={params} 
            output={output} 
            cssPhase={cssPhase} 
            cameraMode="full" 
            isDark={isDark} 
            showTelemetry={false} 
            compact={false} 
          />

          <div className="absolute bottom-3 right-3 z-10">
            <button
              onClick={() => navigate('/app/digital-twin')}
              className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-md flex items-center gap-1.5"
            >
              <span>Explore Full 3D Twin</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Operating Quick-Status Panel (1 Col) */}
        <div className="bg-[var(--bg-panel)] rounded-xl border border-[var(--border-color)] p-4 flex flex-col justify-between shadow-sm">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] border-b border-[var(--border-subtle)] pb-2 mb-3">
              Operating Well Status
            </h3>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between items-center py-1 border-b border-[var(--border-subtle)]">
                <span className="text-[var(--text-muted)] font-sans">CSS Cycle Phase:</span>
                <span className="font-bold text-amber-500 uppercase">{cssPhase}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[var(--border-subtle)]">
                <span className="text-[var(--text-muted)] font-sans">Active Cycle:</span>
                <span className="font-bold text-[var(--text-primary)]">Cycle #14</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[var(--border-subtle)]">
                <span className="text-[var(--text-muted)] font-sans">SRP Unit Speed:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{params.srpSpeed} SPM</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[var(--border-subtle)]">
                <span className="text-[var(--text-muted)] font-sans">Stroke Length:</span>
                <span className="font-bold text-[var(--text-primary)]">{params.strokeLength} m</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-[var(--text-muted)] font-sans">Dynamic Fluid Level:</span>
                <span className="font-bold text-[var(--text-primary)]">{params.fluidLevel} m</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] space-y-2">
            <button
              onClick={() => navigate('/app/operations')}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-[var(--bg-surface)] hover:bg-[var(--border-subtle)] text-[var(--text-primary)] text-xs font-semibold transition-colors"
            >
              <div className="flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-amber-500" />
                <span>Operations Diagnostics</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => navigate('/app/simulation')}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-[var(--bg-surface)] hover:bg-[var(--border-subtle)] text-[var(--text-primary)] text-xs font-semibold transition-colors"
            >
              <div className="flex items-center gap-2">
                <FlaskConical className="w-3.5 h-3.5 text-cyan-500" />
                <span>What-If Simulation</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Row 3: Engineering Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Production History Chart */}
        <div className="bg-[var(--bg-panel)] border border-[var(--border-color)] rounded-xl p-4 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                Oil Production Rate (7 Days SCADA)
              </h3>
              <p className="text-[10px] text-[var(--text-muted)]">Flow Telemetry Stream (bbl/day)</p>
            </div>
            <span className="text-[10px] font-mono text-[var(--text-muted)]">BGW-DEMO-01</span>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={prodHistory.slice(-42)} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorProd" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={chartColors.primary} stopOpacity={0.35}/>
                    <stop offset="95%" stopColor={chartColors.primary} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                <XAxis dataKey="timestamp" stroke={chartColors.text} fontSize={10} tickFormatter={(val) => val ? val.split('T')[0].slice(5) : ''} />
                <YAxis stroke={chartColors.text} fontSize={10} domain={['auto', 'auto']} />
                <Tooltip contentStyle={{ backgroundColor: chartColors.tooltipBg, borderColor: chartColors.tooltipBorder, color: chartColors.text, borderRadius: '8px', fontSize: '11px' }} />
                <Area type="monotone" dataKey="oilRate" name="Oil Rate (bbl/d)" stroke={chartColors.primary} strokeWidth={2} fillOpacity={1} fill="url(#colorProd)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CSS Cycle Performance */}
        <div className="bg-[var(--bg-panel)] border border-[var(--border-color)] rounded-xl p-4 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                CSS Thermal Cycle Oil vs Steam
              </h3>
              <p className="text-[10px] text-[var(--text-muted)]">Historical Cycles #7 to #14</p>
            </div>
            <span className="text-[10px] font-mono text-[var(--text-muted)]">bbl / t</span>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cycleData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                <XAxis dataKey="cycle" stroke={chartColors.text} fontSize={10} />
                <YAxis stroke={chartColors.text} fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: chartColors.tooltipBg, borderColor: chartColors.tooltipBorder, color: chartColors.text, borderRadius: '8px', fontSize: '11px' }} />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Bar dataKey="oil" name="Oil Recovered (bbl)" fill={chartColors.primary} radius={[3, 3, 0, 0]} />
                <Bar dataKey="steam" name="Steam Injected (t)" fill={chartColors.secondary} radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
