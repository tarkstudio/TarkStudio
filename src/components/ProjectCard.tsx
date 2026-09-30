import React from 'react';
import { Project } from '../types';
import {
  Download,
  ExternalLink,
  Lock,
  Radio,
  ShieldCheck,
  KeyRound,
  FileSpreadsheet,
  Compass,
  Share2,
  Activity,
  Zap,
  Network,
  Laptop,
  Cpu,
  AudioLines,
  Smartphone,
  Globe,
  HardDrive
} from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onAction: (project: Project, actionType: 'download' | 'web') => void;
}

// Icon mapper for dynamic icons
const iconMap: Record<string, React.ElementType> = {
  ShieldCheck,
  Radio,
  KeyRound,
  FileSpreadsheet,
  Compass,
  Share2,
  Activity,
  Zap,
  Network,
  Laptop,
  Cpu,
  AudioLines,
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onAction }) => {
  const IconComponent = iconMap[project.icon] || HardDrive;
  const isLocked = project.status === 'locked';
  const isApk = project.type === 'apk';
  const isWebsite = project.type === 'website';

  // Mode badge specifics
  let modeBadgeClass = 'bg-slate-800 text-slate-300 border-slate-700';
  let modeBadgeLabel = project.badgeLabel || 'Operational';

  if (project.mode === 'offline') {
    modeBadgeClass = 'bg-amber-950/40 text-amber-300 border-amber-800/50';
    if (!project.badgeLabel) modeBadgeLabel = '⚡ Offline / Local';
  } else if (project.mode === 'online') {
    modeBadgeClass = 'bg-emerald-950/40 text-emerald-300 border-emerald-800/50';
    if (!project.badgeLabel) modeBadgeLabel = '🟢 Online Cloud';
  } else if (project.mode === 'hybrid') {
    modeBadgeClass = 'bg-indigo-950/40 text-indigo-300 border-indigo-800/50';
    if (!project.badgeLabel) modeBadgeLabel = '🔄 Hybrid Sync';
  }

  return (
    <article
      id={`project-card-${project.id}`}
      className={`group relative flex flex-col justify-between h-full rounded-xl border p-3 md:p-5 transition-all duration-200 ${
        isLocked
          ? 'bg-slate-900/60 border-slate-800/60 opacity-90'
          : 'bg-slate-900/90 border-slate-800 hover:border-teal-500/40 hover:bg-slate-900 hover:shadow-lg hover:shadow-black/40'
      }`}
    >
      {/* Clickable Card Body leading to detail.html */}
      <a
        href={`detail.html?id=${project.id}`}
        className="block cursor-pointer flex-1 text-inherit no-underline"
        aria-label={`View specifications for ${project.title}`}
      >
        {/* 1. Mobile Launcher Tile View (< 768px) */}
        <div className="flex md:hidden flex-col">
          {/* Top: Icon + Status Pill */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
              project.mode === 'offline' ? 'bg-amber-950/50 text-amber-400' :
              project.mode === 'online' ? 'bg-emerald-950/50 text-emerald-400' :
              'bg-indigo-950/50 text-indigo-400'
            }`}>
              <IconComponent className="w-4 h-4" />
            </div>

            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${modeBadgeClass}`}>
              {project.mode === 'offline' ? '⚡ Offline' : project.mode === 'online' ? '🟢 Online' : '🔄 Hybrid'}
            </span>
          </div>

          {/* Middle: Tool Title (2 lines clamp) */}
          <div className="mb-2 min-w-0">
            <h3 className="text-sm font-semibold text-slate-100 line-clamp-2 group-hover:text-teal-300 transition-colors" title={project.title}>
              {project.title}
            </h3>
            <span className="text-[11px] font-mono text-slate-400 block truncate mt-0.5">
              {isApk ? 'Android APK' : 'Web Tool'} • {project.version}
            </span>
          </div>
        </div>

        {/* 2. Desktop View (>= 768px) */}
        <div className="hidden md:flex flex-col flex-1">
          {/* Top bar: Icon + Category on left, Version on right */}
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className={`p-2 rounded-xl shrink-0 ${
                project.mode === 'offline' ? 'bg-amber-950/50 text-amber-400' :
                project.mode === 'online' ? 'bg-emerald-950/50 text-emerald-400' :
                'bg-indigo-950/50 text-indigo-400'
              }`}>
                <IconComponent className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-teal-400 block truncate">
                {project.category || (isApk ? 'Android APK' : 'Web Service')}
              </span>
            </div>

            <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-800/90 text-slate-400 border border-slate-700/60 shrink-0">
              {project.version}
            </span>
          </div>

          {/* Full-width Title (max 2 lines) */}
          <h3 className="text-lg font-bold text-slate-100 group-hover:text-teal-300 transition-colors leading-snug line-clamp-2 mb-3">
            {project.title}
          </h3>

          {/* Badges Row */}
          <div className="flex flex-wrap items-center gap-1.5 mb-3.5">
            {/* Mode Badge */}
            <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full border ${modeBadgeClass}`}>
              {modeBadgeLabel}
            </span>

            {/* Type Badge */}
            <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700/60">
              {isApk ? <Smartphone className="w-3 h-3 text-sky-400" /> : <Globe className="w-3 h-3 text-violet-400" />}
              <span>{isApk ? 'Android APK' : 'Web Application'}</span>
            </span>

            {/* Status Badge if Locked */}
            {isLocked && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-red-950/40 text-red-300 border border-red-800/50">
                <Lock className="w-3 h-3" />
                <span>Coming Soon</span>
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
            {project.description}
          </p>
        </div>
      </a>

      {/* Footer & Prominent Action Button */}
      <div className="pt-2 md:pt-3 border-t border-slate-800/80 mt-auto">
        {isApk ? (
          isLocked ? (
            /* Disabled APK button */
            <button
              id={`download-apk-${project.id}`}
              type="button"
              disabled
              aria-disabled="true"
              className="w-full flex items-center justify-center gap-1.5 py-1.5 md:py-2.5 px-2 md:px-4 rounded-lg text-xs md:text-sm font-semibold bg-slate-800/40 text-slate-500 border border-slate-800 cursor-not-allowed"
            >
              <Lock className="w-3.5 h-3.5 md:w-4 md:h-4 text-slate-500" />
              <span className="inline md:hidden">🔒 Locked</span>
              <span className="hidden md:inline">🔒 Coming Soon</span>
            </button>
          ) : (
            /* Active APK button */
            <button
              id={`download-apk-${project.id}`}
              type="button"
              onClick={() => onAction(project, 'download')}
              className="w-full flex items-center justify-between py-1.5 md:py-2.5 px-2.5 md:px-4 rounded-lg text-xs md:text-sm font-semibold bg-sky-600 hover:bg-sky-500 text-white shadow-md shadow-sky-950/40 transition-all duration-150 cursor-pointer active:scale-[0.99]"
            >
              <span className="flex items-center gap-1.5 md:gap-2">
                <Download className="w-3.5 h-3.5 md:w-4 md:h-4" />
                <span className="inline md:hidden">⬇ APK</span>
                <span className="hidden md:inline">⬇ Download APK</span>
              </span>
              <span className="text-[10px] md:text-xs font-mono px-1 md:px-1.5 py-0.5 rounded bg-sky-700/80 text-sky-100">
                {project.size ? project.size.replace(' MB', 'M') : 'APK'}
              </span>
            </button>
          )
        ) : (
          isLocked ? (
            /* Disabled Website button */
            <button
              id={`open-website-${project.id}`}
              type="button"
              disabled
              aria-disabled="true"
              className="w-full flex items-center justify-center gap-1.5 py-1.5 md:py-2.5 px-2 md:px-4 rounded-lg text-xs md:text-sm font-semibold bg-slate-800/40 text-slate-500 border border-slate-800 cursor-not-allowed"
            >
              <Lock className="w-3.5 h-3.5 md:w-4 md:h-4 text-slate-500" />
              <span className="inline md:hidden">🔒 Locked</span>
              <span className="hidden md:inline">🔒 Coming Soon</span>
            </button>
          ) : (
            /* Active Website button */
            <a
              id={`open-website-${project.id}`}
              href={project.webUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                if (project.webUrl.includes('.internal') || project.webUrl.includes('.dev')) {
                  e.preventDefault();
                  onAction(project, 'web');
                }
              }}
              className="w-full flex items-center justify-between py-1.5 md:py-2.5 px-2.5 md:px-4 rounded-lg text-xs md:text-sm font-semibold bg-violet-600 hover:bg-violet-500 text-white shadow-md shadow-violet-950/40 transition-all duration-150 cursor-pointer active:scale-[0.99]"
            >
              <span className="flex items-center gap-1.5 md:gap-2">
                <Globe className="w-3.5 h-3.5 md:w-4 md:h-4" />
                <span className="inline md:hidden">Open ↗</span>
                <span className="hidden md:inline">🌐 Open Website</span>
              </span>
              <ExternalLink className="w-3.5 h-3.5 md:w-4 md:h-4 opacity-80" />
            </a>
          )
        )}
      </div>
    </article>
  );
};
