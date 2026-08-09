import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { X, ExternalLink, Github, Zap, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-[#1D1D1F] dark:text-[#F5F5F7]">
              <div className="flex items-center justify-between text-xs text-[#86868B] pb-3 border-b border-[#D2D2D7]/50 dark:border-[#333336]">
                <span className="flex items-center gap-1.5 font-medium">
                  <Calendar className="w-4 h-4 text-[#0066CC]" />
                  <span>{t('Geliştirme Dönemi:', 'Development Period:')} {selectedProjectForModal.date}</span>
                </span>
                <span className="font-mono">ID: {selectedProjectForModal.id}</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-xs font-bold text-[#86868B] uppercase tracking-widest">
                  {t('Proje Detayları & Mühendislik Yaklaşımı', 'Project Details & Engineering Approach')}
                </h3>
                <p className="text-sm leading-relaxed text-[#1D1D1F] dark:text-[#E8E8ED] font-normal">
                  {selectedProjectForModal.fullDetails || selectedProjectForModal.description}
                </p>
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
              <div className="pt-4 border-t border-[#D2D2D7]/50 dark:border-[#333336] flex flex-wrap items-center justify-end gap-3">
                {selectedProjectForModal.githubUrl && (
                  <a
                    href={selectedProjectForModal.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F5F5F7] dark:bg-[#2C2C2E] hover:bg-[#E8E8ED] dark:hover:bg-[#3A3A3C] text-xs font-semibold text-[#1D1D1F] dark:text-white transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>{t('GitHub Deposu', 'GitHub Repository')}</span>
                  </a>
                )}

                {selectedProjectForModal.liveUrl && (
                  <a
                    href={selectedProjectForModal.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0066CC] hover:bg-[#0077ED] text-white text-xs font-semibold transition-colors shadow-sm"
                  >
                    <span>{t('Canlı Önizleme / Demo', 'Live Preview / Demo')}</span>
                    <ExternalLink className="w-4 h-4" />
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
