import React from 'react';
import ThemeToggle from '../ui/ThemeToggle';
import { useUiStore } from '../../stores/uiStore';
import { useAuthStore } from '../../stores/authStore';
import { ShieldCheck, LogOut, User } from 'lucide-react';

export default function Header() {
  const sidebarCollapsed = useUiStore((s) => s.sidebarCollapsed);
  const { user, logout, isAuthenticated } = useAuthStore();
  
  return (
    <header 
      className="fixed top-0 right-0 z-30 h-[52px] bg-[var(--bg-panel)]/95 backdrop-blur-md border-b border-[var(--border-color)] flex items-center justify-between px-4 transition-all duration-300 shadow-sm"
      style={{ left: sidebarCollapsed ? '64px' : '230px' }}
    >
      {/* Left Title */}
      <div className="flex items-center gap-3">
        <h1 className="font-bold tracking-wider text-xs md:text-sm text-[var(--text-primary)] flex items-center gap-2">
          <span className="font-extrabold">BAGHEWALA DIGITAL TWIN</span>
          <span className="hidden lg:inline-block text-[10px] text-[var(--text-muted)] font-medium">| CSS & SRP Heavy Oil Asset</span>
        </h1>
      </div>

      {/* Center Well Telemetry Status */}
      <div className="hidden md:flex items-center gap-4 text-xs">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--bg-surface)] border border-[var(--border-color)]">
          <span className="text-[var(--text-muted)] font-medium">Well:</span>
          <span className="font-mono font-bold text-[var(--text-primary)]">BGW-DEMO-01</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 ml-1"></span>
        </div>
        
        <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
          <span>ONLINE</span>
        </div>

        <div className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 text-[10px] font-mono font-semibold tracking-wider">
          SIMULATED DATA
        </div>

        <div className="text-[11px] text-[var(--text-secondary)] hidden xl:flex items-center gap-1 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
          <span>HYBRID PHYSICS + AI</span>
        </div>
      </div>

      {/* Right Controls & Profile */}
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <div className="h-4 w-px bg-[var(--border-color)]"></div>

        {isAuthenticated && user ? (
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-[11px] font-bold text-[var(--text-primary)] truncate max-w-[130px]">
                {user.name}
              </span>
              <span className="text-[9px] text-[var(--text-muted)] truncate max-w-[130px]">
                {user.role}
              </span>
            </div>

            <button
              onClick={logout}
              className="p-1.5 rounded-lg bg-[var(--bg-surface)] hover:bg-red-500/10 hover:text-red-500 text-[var(--text-muted)] border border-[var(--border-color)] transition-colors"
              title="Logout from Workspace"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center shadow-sm shadow-amber-500/30">
              OIL
            </div>
            <span className="text-xs font-semibold text-[var(--text-secondary)] hidden sm:inline">Engineering Ops</span>
          </div>
        )}
      </div>
    </header>
  );
}
