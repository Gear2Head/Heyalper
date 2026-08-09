import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ShieldCheck, Settings, LogOut, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AdminToast: React.FC = () => {
  const { isAdminAuthenticated, setIsAdminOpen, logoutAdmin, t } = usePortfolio();
  const [dismissed, setDismissed] = useState(false);

  if (!isAdminAuthenticated || dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        className="fixed top-16 sm:top-20 right-4 sm:right-6 z-50 max-w-sm w-full sm:w-auto"
      >
        <div className="p-3.5 sm:p-4 rounded-2xl bg-white/90 dark:bg-[#1C1C1E]/90 backdrop-blur-xl border border-black/10 dark:border-white/15 shadow-xl text-[#1D1D1F] dark:text-white flex flex-col gap-2.5">
          {/* Header Row */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <div className="flex items-center gap-1.5 font-bold text-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0066CC]" />
                <span>{t('Yönetici Modundasınız', 'Admin Mode Active')}</span>
              </div>
            </div>

            <button
              onClick={() => setDismissed(true)}
              className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-white transition-colors cursor-pointer"
              title={t('Gizle', 'Dismiss')}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Email Info */}
          <p className="text-[11px] text-[#86868B] font-medium leading-tight pl-4">
            {t('Yetkili Oturum:', 'Authorized Account:')} <span className="text-[#0066CC] font-semibold">senerkadiralper@gmail.com</span>
          </p>

          {/* Action buttons */}
          <div className="flex items-center gap-2 pt-1 border-t border-black/5 dark:border-white/10">
            <button
              onClick={() => setIsAdminOpen(true)}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#0066CC] hover:bg-[#0077ED] text-white transition-colors shadow-xs cursor-pointer"
            >
              <Settings className="w-3 h-3" />
              <span>{t('Yönetim Paneli', 'Admin Panel')}</span>
            </button>

            <button
              onClick={() => {
                logoutAdmin();
                setDismissed(true);
              }}
              className="flex items-center justify-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-black/5 dark:bg-white/10 hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer"
              title={t('Çıkış Yap', 'Sign Out')}
            >
              <LogOut className="w-3 h-3" />
              <span>{t('Çıkış', 'Sign Out')}</span>
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
