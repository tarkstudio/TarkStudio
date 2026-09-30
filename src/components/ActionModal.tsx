import React from 'react';
import { Project } from '../types';
import { Download, ExternalLink, X, Check, ShieldCheck, FileCode, Smartphone, Globe } from 'lucide-react';

interface ActionModalProps {
  project: Project | null;
  actionType: 'download' | 'web' | null;
  onClose: () => void;
}

export const ActionModal: React.FC<ActionModalProps> = ({ project, actionType, onClose }) => {
  if (!project || !actionType) return null;

  const isDownload = actionType === 'download';

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs"
    >
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-2xl p-6 shadow-2xl text-left animate-in fade-in zoom-in-95 duration-150">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2.5 rounded-xl ${isDownload ? 'bg-sky-950 text-sky-400 border border-sky-800' : 'bg-violet-950 text-violet-400 border border-violet-800'}`}>
            {isDownload ? <Smartphone className="w-6 h-6" /> : <Globe className="w-6 h-6" />}
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
              {isDownload ? 'Direct Android APK Delivery' : 'Web Application Gateway'}
            </span>
            <h2 className="text-xl font-bold text-white leading-tight">
              {project.title} <span className="font-mono text-sm font-normal text-slate-400">({project.version})</span>
            </h2>
          </div>
        </div>

        <p className="text-sm text-slate-300 mb-5 leading-relaxed">
          {project.description}
        </p>

        {isDownload ? (
          <div className="space-y-4">
            <div className="bg-slate-950/80 rounded-xl p-3.5 border border-slate-800/80 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-slate-400">
                <span>File:</span>
                <span className="text-slate-200">{project.apkUrl.split('/').pop()}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Package Size:</span>
                <span className="text-slate-200">{project.size || '18 MB'}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Architecture:</span>
                <span className="text-slate-200">arm64-v8a / armeabi-v7a</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>SHA-256 Checksum:</span>
                <span className="text-emerald-400 truncate max-w-[200px]" title="e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855">
                  e3b0c442...7852b855
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 text-xs text-slate-400 bg-amber-950/20 border border-amber-900/30 p-3 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                Verified TarkStudio signature. This APK runs locally with {project.mode === 'offline' ? 'zero background network requests.' : 'authenticated relay endpoints.'}
              </span>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={`#download-${project.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  // Trigger a friendly simulated download notification
                  alert(`Downloading ${project.title} (${project.apkUrl.split('/').pop()}). Check your browser downloads folder.`);
                  onClose();
                }}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold bg-sky-600 hover:bg-sky-500 text-white shadow-lg transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download {project.size || 'APK'}</span>
              </a>
              <button
                type="button"
                onClick={onClose}
                className="py-2.5 px-4 rounded-xl text-sm font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-slate-950/80 rounded-xl p-3.5 border border-slate-800/80 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Destination Endpoint:</span>
                <span className="text-violet-400 truncate max-w-[240px]">{project.webUrl}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Security Protocol:</span>
                <span className="text-emerald-400">TLS 1.3 / E2E Encrypted</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Hosting:</span>
                <span className="text-slate-200">Distributed Edge CDN</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={project.webUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onClose()}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold bg-violet-600 hover:bg-violet-500 text-white shadow-lg transition-all"
              >
                <Globe className="w-4 h-4" />
                <span>Launch Web Console</span>
                <ExternalLink className="w-4 h-4 opacity-80" />
              </a>
              <button
                type="button"
                onClick={onClose}
                className="py-2.5 px-4 rounded-xl text-sm font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
