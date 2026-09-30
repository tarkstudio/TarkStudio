/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { projects as initialProjects } from './projects-data';
import { Project, OperationalMode, ProductType } from './types';
import { Header } from './components/Header';
import { ProjectCard } from './components/ProjectCard';
import { ActionModal } from './components/ActionModal';
import {
  RotateCcw,
  Search,
  SlidersHorizontal,
  Package,
  Layers,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export default function App() {
  const [currentMode, setCurrentMode] = useState<OperationalMode>('all');
  const [currentType, setCurrentType] = useState<ProductType>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [modalActionType, setModalActionType] = useState<'download' | 'web' | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Compute stats for toggle badges
  const stats = useMemo(() => {
    let online = 0;
    let offline = 0;
    let apk = 0;
    let website = 0;

    initialProjects.forEach(p => {
      if (p.mode === 'online') online++;
      if (p.mode === 'offline') offline++;
      if (p.type === 'apk') apk++;
      if (p.type === 'website') website++;
    });

    return {
      online,
      offline,
      allMode: initialProjects.length,
      apk,
      website,
      allType: initialProjects.length
    };
  }, []);

  // Combined dual-level filter logic strictly according to requirements:
  // - If mode !== 'all', match item.mode === currentMode
  // - If type !== 'all', match item.type === currentType
  const filteredProjects = useMemo(() => {
    return initialProjects.filter(item => {
      const modeMatch = currentMode === 'all' || item.mode === currentMode;
      const typeMatch = currentType === 'all' || item.type === currentType;
      const queryMatch = searchQuery.trim() === '' || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase()));

      return modeMatch && typeMatch && queryMatch;
    });
  }, [currentMode, currentType, searchQuery]);

  const handleResetFilters = () => {
    setCurrentMode('all');
    setCurrentType('all');
    setSearchQuery('');
  };

  const handleCardAction = (project: Project, actionType: 'download' | 'web') => {
    if (actionType === 'download') {
      setActiveModalProject(project);
      setModalActionType('download');
    } else {
      setActiveModalProject(project);
      setModalActionType('web');
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Top Header with Dual-Level Toggle Bar directly below brand title */}
      <Header
        currentMode={currentMode}
        currentType={currentType}
        onModeChange={(mode) => setCurrentMode(mode)}
        onTypeChange={(type) => setCurrentType(type)}
        onlineCount={stats.online}
        offlineCount={stats.offline}
        allModeCount={stats.allMode}
        apkCount={stats.apk}
        websiteCount={stats.website}
        allTypeCount={stats.allType}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status bar & Search Filter strip */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <span id="project-count-badge" className="text-xs sm:text-sm font-medium text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg flex items-center gap-2">
              <Package className="w-3.5 h-3.5 text-blue-400" />
              Showing <strong className="text-white font-semibold">{filteredProjects.length}</strong> of {initialProjects.length} products
            </span>

            {(currentMode !== 'all' || currentType !== 'all' || searchQuery !== '') && (
              <button
                id="reset-filter-btn"
                type="button"
                onClick={handleResetFilters}
                className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900/60 hover:bg-slate-800 transition-colors border border-slate-800 cursor-pointer"
                title="Reset active filters"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          {/* Quick Filter Search */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="search-filter-input"
              type="text"
              placeholder="Search tools, security, offline..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-800 focus:border-blue-500 rounded-lg pl-9 pr-3 py-1.5 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Project Cards Grid */}
        {filteredProjects.length > 0 ? (
          <div
            id="projects-grid"
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4 md:gap-5"
          >
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onAction={handleCardAction}
              />
            ))}
          </div>
        ) : (
          /* Empty state */
          <div
            id="empty-results-container"
            className="text-center py-16 px-4 bg-slate-900/40 border border-dashed border-slate-800 rounded-2xl max-w-lg mx-auto"
          >
            <div className="w-12 h-12 rounded-full bg-slate-800/80 text-slate-400 flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6" />
            </div>
            <h2 className="text-base font-semibold text-slate-200 mb-1">
              No matching software artifacts found
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mb-5 leading-relaxed">
              No products match mode: <strong className="text-slate-300 font-medium">{currentMode}</strong> and type: <strong className="text-slate-300 font-medium">{currentType}</strong>.
            </p>
            <button
              id="empty-reset-button"
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold shadow-md transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear Filter Criteria</span>
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950 py-6 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">TarkStudio Portal</span>
            <span>•</span>
            <span>Dual-Level Operational Registry</span>
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              P2P & Cloud Active
            </span>
            <span>Zero-Tracker Compliant</span>
          </div>
        </div>
      </footer>

      {/* Action / Delivery Modal */}
      <ActionModal
        project={activeModalProject}
        actionType={modalActionType}
        onClose={() => {
          setActiveModalProject(null);
          setModalActionType(null);
        }}
      />
    </div>
  );
}
