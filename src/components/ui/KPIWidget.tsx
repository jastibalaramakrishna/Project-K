import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import StatusBadge from './StatusBadge';
import SimulatedTag from './SimulatedTag';

interface KPIWidgetProps {
  label: string;
  value: string | number;
  unit: string;
  trend?: number;
  status?: string;
  simulated?: boolean;
}

export default function KPIWidget({ label, value, unit, trend, status, simulated }: KPIWidgetProps) {
  return (
    <div className="bg-[var(--bg-panel)] border border-[var(--border-color)] rounded-xl p-3.5 min-w-[120px] hover:border-amber-500/40 transition-all shadow-sm flex flex-col justify-between">
      <div className="flex justify-between items-start mb-1">
        <span className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-bold">{label}</span>
        {simulated && <SimulatedTag />}
      </div>
      <div className="flex items-baseline gap-1 my-1">
        <span className="text-xl font-bold font-mono text-[var(--text-primary)]">{value}</span>
        <span className="text-xs text-[var(--text-muted)]">{unit}</span>
      </div>
      <div className="flex items-center justify-between mt-1 pt-1 border-t border-[var(--border-subtle)]">
        {trend !== undefined && (
          <div className={`flex items-center text-[10px] font-mono font-semibold ${trend >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'}`}>
            {trend >= 0 ? <ArrowUp className="w-3 h-3 mr-0.5" /> : <ArrowDown className="w-3 h-3 mr-0.5" />}
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
        {status && <StatusBadge status={status} />}
      </div>
    </div>
  );
}
