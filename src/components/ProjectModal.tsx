import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { X, Calendar, Zap, Github, Globe, BookOpen, Terminal, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Helper function to render text with clickable markdown links [text](url)
const renderTextWithMarkdownLinks = (text: string) => {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const elements = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const matchIndex = match.index;
    const linkText = match[1];
    const linkUrl = match[2];

    if (matchIndex > lastIndex) {
      elements.push(text.substring(lastIndex, matchIndex));
    }

    elements.push(
      <a
        key={matchIndex}
        href={linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#0066CC] hover:text-[#0077ED] dark:text-[#2997FF] dark:hover:text-blue-300 font-semibold underline decoration-[#0066CC]/30 hover:decoration-[#0077ED] transition-colors"
      >
        {linkText}
      </a>
    );

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    elements.push(text.substring(lastIndex));
  }

  return elements.length > 0 ? elements : text;
};

// Helper function to parse details text, split lists vertically and format links
const parseDetailsAndLists = (text: string) => {
  if (!text) return null;

  // Split text by numbered list markers (e.g. 1., 2., 3.) while keeping the marker
  const parts = text.split(/(?=\b\d+\.\s+)/);

  return (
    <div className="space-y-4">
      {parts.map((part, index) => {
        const content = part.trim();
        if (!content) return null;

        const isListItem = /^\d+\.\s+/.test(content);
        const textContent = renderTextWithMarkdownLinks(content);

        if (isListItem) {
          return (
            <div key={index} className="pl-4 border-l-2 border-[#0066CC]/20 dark:border-blue-500/20 py-1.5 my-2">
              <p className="text-sm leading-relaxed text-[#1D1D1F] dark:text-[#E8E8ED]">
                {textContent}
              </p>
            </div>
          );
        }

        return (
          <p key={index} className="text-sm leading-relaxed text-[#1D1D1F] dark:text-[#E8E8ED]">
            {textContent}
          </p>
        );
      })}
    </div>
  );
};

export const ProjectModal: React.FC = () => {
  const { selectedProjectForModal, setSelectedProjectForModal, t } = usePortfolio();

  return (
    <AnimatePresence>
      {selectedProjectForModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 overflow-hidden">
          {/* Page Sheet Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            onClick={() => setSelectedProjectForModal(null)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xl"
          />

          {/* Apple Page Sheet Modal */}
          <motion.div
            initial={{ y: '100%', opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: '100%', opacity: 0, scale: 0.96 }}
            transition={{ type: 'spring', damping: 30, stiffness: 320, mass: 0.8 }}
            className="relative w-full max-w-3xl max-h-[90vh] sm:max-h-[85vh] bg-white dark:bg-[#1D1D1F] border-t sm:border border-[#D2D2D7] dark:border-[#333336] rounded-t-[32px] sm:rounded-[36px] shadow-2xl overflow-hidden z-10 flex flex-col"
          >
            {/* Apple Drag Indicator Bar */}
            <div className="w-full flex justify-center pt-3 pb-1 sm:hidden">
              <div className="w-12 h-1.5 rounded-full bg-[#D2D2D7] dark:bg-[#333336]" />
            </div>

            {/* Header Image */}
            <div className="relative h-60 sm:h-80 w-full overflow-hidden flex-shrink-0 bg-[#F5F5F7] dark:bg-[#151518] border-b border-[#D2D2D7]/40 dark:border-[#333336]">
              <img
                src={selectedProjectForModal.imageUrl}
                alt={selectedProjectForModal.title}
                className="w-full h-full object-contain p-6 sm:p-8"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent z-10" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedProjectForModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 backdrop-blur-md transition-colors cursor-pointer z-20"
                title={t('Kapat', 'Close')}
              >
                <X className="w-5 h-5" />
              </button>

              {/* Badges on Image */}
              <div className="absolute bottom-4 left-6 right-6 space-y-2 z-20">
                <div className="flex items-center gap-2">
                  <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-[#0066CC] text-white shadow-md">
                    {selectedProjectForModal.category}
                  </span>
                  {selectedProjectForModal.metrics && (
                    <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-[#34C759] text-white shadow-md flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5" />
                      <span>{selectedProjectForModal.metrics}</span>
                    </span>
                  )}
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {selectedProjectForModal.title}
                </h2>
                <p className="text-xs sm:text-sm font-medium text-white/80">
                  {selectedProjectForModal.subtitle}
                </p>
              </div>
            </div>

            {/* Scrollable Details Content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-[#1D1D1F] dark:text-[#F5F5F7] custom-scrollbar">
              <div className="flex items-center justify-between text-xs text-[#86868B] pb-3 border-b border-[#D2D2D7]/50 dark:border-[#333336]">
                <span className="flex items-center gap-1.5 font-medium">
                  <Calendar className="w-4 h-4 text-[#0066CC]" />
                  <span>{t('Geliştirme Dönemi:', 'Development Period:')} {selectedProjectForModal.date}</span>
                </span>
                <span className="font-mono">ID: {selectedProjectForModal.id}</span>
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-bold text-[#86868B] uppercase tracking-widest">
                  {t('Proje Detayları & Mühendislik Yaklaşımı', 'Project Details & Engineering Approach')}
                </h3>
                <div className="font-normal">
                  {parseDetailsAndLists(selectedProjectForModal.fullDetails || selectedProjectForModal.description)}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="space-y-2 pt-2">
                <h3 className="text-xs font-bold text-[#86868B] uppercase tracking-widest">
                  {t('Kullanılan Teknolojiler', 'Technologies Used')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProjectForModal.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full text-xs font-semibold bg-[#F5F5F7] dark:bg-[#2C2C2E] text-[#1D1D1F] dark:text-white border border-[#D2D2D7]/60 dark:border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Links */}
              <div className="pt-4 border-t border-[#D2D2D7]/50 dark:border-[#333336] flex flex-wrap items-center justify-end gap-2">
                {selectedProjectForModal.githubUrl && (
                  <a
                    href={selectedProjectForModal.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-xs font-semibold text-zinc-900 dark:text-white transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                )}

                {selectedProjectForModal.liveUrl && (
                  <a
                    href={selectedProjectForModal.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-xs font-semibold text-white transition-colors"
                  >
                    <Globe className="w-4 h-4" />
                    <span>{t('Web Sitesi', 'Web Site')}</span>
                  </a>
                )}

                {selectedProjectForModal.wikiUrl && (
                  <a
                    href={selectedProjectForModal.wikiUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#AF52DE]/15 hover:bg-[#AF52DE]/25 dark:bg-[#AF52DE]/10 dark:hover:bg-[#AF52DE]/20 text-xs font-semibold text-[#8E2EB2] dark:text-[#BF5AF2] transition-colors"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Wiki</span>
                  </a>
                )}

                {selectedProjectForModal.manageUrl && (
                  <a
                    href={selectedProjectForModal.manageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 dark:bg-emerald-500/10 dark:hover:bg-emerald-500/20 text-xs font-semibold text-emerald-600 dark:text-[#30D158] transition-colors"
                  >
                    <Terminal className="w-4 h-4" />
                    <span>Manage</span>
                  </a>
                )}

                {selectedProjectForModal.discordUrl && (
                  <a
                    href={selectedProjectForModal.discordUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#5865F2]/15 hover:bg-[#5865F2]/25 dark:bg-[#5865F2]/10 dark:hover:bg-[#5865F2]/20 text-xs font-semibold text-[#404EED] dark:text-[#5865F2] transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Discord</span>
                  </a>
                )}

                {selectedProjectForModal.discordSubUrl && (
                  <a
                    href={selectedProjectForModal.discordSubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#5865F2]/15 hover:bg-[#5865F2]/25 dark:bg-[#5865F2]/10 dark:hover:bg-[#5865F2]/20 text-xs font-semibold text-[#404EED] dark:text-[#5865F2] transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{selectedProjectForModal.id === 'adalances-community' ? t('Yedek Sunucu', 'Alt Discord') : t('Hytale Sunucusu', 'Hytale Discord')}</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
