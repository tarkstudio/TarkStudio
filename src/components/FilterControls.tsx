import React from 'react';
import { OperationalMode, ProductType } from '../types';
import { Sparkles, Globe, Zap, Smartphone, LayoutGrid, CheckCircle2 } from 'lucide-react';

interface FilterControlsProps {
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

export const FilterControls: React.FC<FilterControlsProps> = ({
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
    <div id="dual-level-toggle-bar" className="w-full max-w-3xl mx-auto space-y-3.5 bg-slate-900/90 border border-slate-800/90 backdrop-blur-md rounded-2xl p-3.5 sm:p-4.5 shadow-xl shadow-black/40">
      {/* 1. Primary Pill Toggle (Operational Mode) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 pl-1">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>Operational Mode</span>
        </div>

        <div
          id="mode-toggle-bar"
          role="radiogroup"
          aria-label="Filter by operational mode"
          className="flex p-1 bg-slate-950/80 rounded-full border border-slate-800/80 gap-1"
        >
          {/* All Modes */}
          <button
            id="mode-filter-all"
            type="button"
            role="radio"
            aria-checked={currentMode === 'all'}
            onClick={() => onModeChange('all')}
            className={`relative flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
              currentMode === 'all'
                ? 'bg-slate-100 text-slate-950 font-semibold shadow-md shadow-black/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5 opacity-80" />
            <span>All Modes</span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                currentMode === 'all' ? 'bg-slate-300 text-slate-900' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {allModeCount}
            </span>
          </button>

          {/* 🟢 Online */}
          <button
            id="mode-filter-online"
            type="button"
            role="radio"
            aria-checked={currentMode === 'online'}
            onClick={() => onModeChange('online')}
            className={`relative flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
              currentMode === 'online'
                ? 'bg-emerald-500 text-slate-950 font-semibold shadow-md shadow-emerald-950/40'
                : 'text-slate-400 hover:text-emerald-400 hover:bg-slate-800/40'
            }`}
          >
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>🟢 Online</span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                currentMode === 'online' ? 'bg-emerald-600/50 text-slate-950' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {onlineCount}
            </span>
          </button>

          {/* ⚡ Offline / Local */}
          <button
            id="mode-filter-offline"
            type="button"
            role="radio"
            aria-checked={currentMode === 'offline'}
            onClick={() => onModeChange('offline')}
            className={`relative flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
              currentMode === 'offline'
                ? 'bg-amber-400 text-slate-950 font-semibold shadow-md shadow-amber-950/40'
                : 'text-slate-400 hover:text-amber-400 hover:bg-slate-800/40'
            }`}
          >
            <span>⚡ Offline / Local</span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                currentMode === 'offline' ? 'bg-amber-500/50 text-slate-950' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {offlineCount}
            </span>
          </button>
        </div>
      </div>

      {/* Subtle divider */}
      <div className="h-px bg-slate-800/80 w-full" />

      {/* 2. Secondary Category Segment (Product Type) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 pl-1">
          <Smartphone className="w-3.5 h-3.5 text-blue-400" />
          <span>Product Type</span>
        </div>

        <div
          id="type-toggle-bar"
          role="radiogroup"
          aria-label="Filter by product category type"
          className="flex p-1 bg-slate-950/80 rounded-full border border-slate-800/80 gap-1"
        >
          {/* All Types */}
          <button
            id="type-filter-all"
            type="button"
            role="radio"
            aria-checked={currentType === 'all'}
            onClick={() => onTypeChange('all')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
              currentType === 'all'
                ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-900/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <span>All Types</span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                currentType === 'all' ? 'bg-blue-700 text-blue-100' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {allTypeCount}
            </span>
          </button>

          {/* 📱 Android APKs */}
          <button
            id="type-filter-apk"
            type="button"
            role="radio"
            aria-checked={currentType === 'apk'}
            onClick={() => onTypeChange('apk')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
              currentType === 'apk'
                ? 'bg-sky-500 text-slate-950 font-semibold shadow-md shadow-sky-950/40'
                : 'text-slate-400 hover:text-sky-400 hover:bg-slate-800/40'
            }`}
          >
            <span>📱 Android APKs</span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                currentType === 'apk' ? 'bg-sky-600/50 text-slate-950' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {apkCount}
            </span>
          </button>

          {/* 🌐 Web Tools / Sites */}
          <button
            id="type-filter-website"
            type="button"
            role="radio"
            aria-checked={currentType === 'website'}
            onClick={() => onTypeChange('website')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
              currentType === 'website'
                ? 'bg-violet-500 text-white font-semibold shadow-md shadow-violet-950/40'
                : 'text-slate-400 hover:text-violet-400 hover:bg-slate-800/40'
            }`}
          >
            <span>🌐 Web Tools / Sites</span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                currentType === 'website' ? 'bg-violet-700 text-violet-100' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {websiteCount}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
