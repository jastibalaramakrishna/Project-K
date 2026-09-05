import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Sparkles,
  LayoutDashboard, 
  Box, 
  Activity, 
  FlaskConical, 
  FileText, 
  Settings, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { useUiStore } from '../../stores/uiStore';

const navItems = [
  { path: '/', label: 'SIMULATION MODES', icon: Sparkles, exact: true },
  { path: '/app/digital-twin', label: '3D DIGITAL TWIN', icon: Box },
  { path: '/app/overview', label: 'SCADA OVERVIEW', icon: LayoutDashboard },
  { path: '/app/operations', label: 'CSS & SRP OPERATIONS', icon: Activity },
  { path: '/app/simulation', label: 'WHAT-IF & OPTIMIZATION', icon: FlaskConical },
  { path: '/app/reports', label: 'ENGINEERING REPORTS', icon: FileText },
  { path: '/app/settings', label: 'SETTINGS', icon: Settings },
];

export default function Sidebar() {
  const sidebarCollapsed = useUiStore((s) => s.sidebarCollapsed);
  const toggleSidebar = useUiStore((s) => s.toggleSidebar);

  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-40 flex flex-col bg-[var(--bg-panel)] border-r border-[var(--border-color)] transition-all duration-300 select-none shadow-sm ${
        sidebarCollapsed ? 'w-[64px]' : 'w-[230px]'
      }`}
    >
      {/* Brand Header */}
      <div className="flex flex-col items-center justify-center h-[52px] border-b border-[var(--border-color)] overflow-hidden shrink-0 px-3 bg-[var(--bg-surface)]/50">
        {!sidebarCollapsed ? (
          <div className="flex flex-col items-start w-full">
            <div className="flex items-center gap-1.5">
              <span className="text-amber-500 font-extrabold text-sm tracking-wider">OIL INDIA</span>
              <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold border border-amber-500/20">DT</span>
            </div>
            <span className="text-[9px] text-[var(--text-muted)] uppercase tracking-widest font-medium">Baghewala Field</span>
          </div>
        ) : (
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 font-black text-xs">
            OIL
          </div>
        )}
      </div>
      
      {/* Online Status */}
      <div className="flex items-center px-4 py-2 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]/30 shrink-0">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></div>
        {!sidebarCollapsed && (
          <span className="ml-2 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 tracking-wider uppercase truncate">
            Digital Twin Online
          </span>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto py-3 flex flex-col gap-1 px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.exact}
            className={({ isActive }) => `
              flex items-center px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wider transition-all
              ${isActive 
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm shadow-amber-500/20' 
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'}
            `}
            title={sidebarCollapsed ? item.label : undefined}
          >
            <item.icon className={`w-4 h-4 shrink-0 ${sidebarCollapsed ? 'mx-auto' : 'mr-3'}`} />
            {!sidebarCollapsed && <span className="whitespace-nowrap">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Collapse Toggle Footer */}
      <div className="p-2 border-t border-[var(--border-color)] shrink-0 bg-[var(--bg-surface)]/40">
        <button 
          onClick={toggleSidebar}
          className="w-full flex items-center justify-center py-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] rounded-lg transition-colors text-xs font-medium"
          title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <div className="flex items-center gap-2"><ChevronLeft className="w-4 h-4" /><span>Collapse</span></div>}
        </button>
      </div>
    </aside>
  );
}
