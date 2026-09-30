import React from 'react';
import { OperationalMode, ProductType } from '../types';
import { FilterControls } from './FilterControls';
import { Terminal, Shield, Cpu } from 'lucide-react';

interface HeaderProps {
  currentMode: OperationalMode;
  currentType: ProductType;
  onModeChange: (mode: OperationalMode) => void;
  onTypeChange: (type: ProductType) => void;
  onlineCount: number;
  offlineCount: number;
  allModeCount: number;
  apkCount: number;
  websiteCount: number;
  allTypeCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentMode,
  currentType,
  onModeChange,
  onTypeChange,
  onlineCount,
  offlineCount,
  allModeCount,
  apkCount,
  websiteCount,
  allTypeCount,
}) => {
  return (
    <header className="relative pt-8 pb-6 px-4 text-center border-b border-slate-800/60 bg-gradient-to-b from-slate-900/60 via-slate-950 to-slate-950">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Brand Header */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-xs font-mono text-slate-300">
          <Terminal className="w-3.5 h-3.5 text-blue-400" />
          <span>TARKSTUDIO REPOSITORY // CATALOGUE</span>
        </div>

        <div>
          <h1 id="brand-title" className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white font-sans">
            TarkStudio
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
            Direct distribution hub for local-first zero-telemetry Android APKs, air-gapped utilities, and cloud telemetry portals.
          </p>
        </div>

        {/* Dual-Level Filtering System directly below the brand title */}
        <div className="pt-2">
          <FilterControls
            currentMode={currentMode}
            currentType={currentType}
            onModeChange={onModeChange}
            onTypeChange={onTypeChange}
            onlineCount={onlineCount}
            offlineCount={offlineCount}
            allModeCount={allModeCount}
            apkCount={apkCount}
            websiteCount={websiteCount}
            allTypeCount={allTypeCount}
          />
        </div>
      </div>
    </header>
  );
};
