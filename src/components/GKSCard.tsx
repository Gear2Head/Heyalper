import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { GraduationCap, Award, Cpu, Users, Download, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const GKSCard: React.FC = () => {
  const { data, t } = usePortfolio();

  const getRadiusClass = () => {
    switch (data.theme.borderRadius) {
      case 'sm': return 'rounded-lg';
      case 'md': return 'rounded-xl';
      case 'lg': return 'rounded-2xl';
      case 'xl': return 'rounded-3xl';
      case 'full': return 'rounded-3xl';
      default: return 'rounded-[32px]';
    }
  };

  return (
    <section id="gks-card" className="py-12 px-4 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`relative bg-white dark:bg-[#1D1D1F] p-8 sm:p-10 shadow-lg border border-[#D2D2D7] dark:border-[#333336] overflow-hidden flex flex-col justify-between ${getRadiusClass()}`}
      >
        {/* Flag gradient ambient accent background */}
        <div className="absolute right-[-40px] top-[-40px] w-96 h-96 bg-gradient-to-br from-[#003478]/10 to-[#C60C30]/10 blur-[100px] rounded-full pointer-events-none -z-10" />

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0066CC] dark:text-blue-400 bg-[#0066CC]/10 dark:bg-blue-500/15 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('GLOBAL KOREA SCHOLARSHIP PROFILE')}</span>
            </span>
            <div className="flex items-center gap-1.5">
              <div className="w-3.5 h-2 bg-[#003478] rounded-sm" title="Korea blue" />
              <div className="w-3.5 h-2 bg-[#C60C30] rounded-sm" title="Korea red" />
            </div>
          </div>

          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#1D1D1F] dark:text-white leading-[1.1] max-w-3xl">
            {t('gks.title')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
            {/* Stat 1 */}
            <div className="p-5 rounded-[24px] bg-[#F5F5F7]/60 dark:bg-[#2C2C2E]/60 border border-[#D2D2D7]/50 dark:border-white/5 space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#0066CC]/10 dark:bg-blue-500/10 flex items-center justify-center text-[#0066CC] dark:text-blue-400">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#86868B] uppercase tracking-wider">
                  {t('gks.stats.academicLabel')}
                </h4>
                <p className="text-base font-semibold text-[#1D1D1F] dark:text-white mt-0.5">
                  {t('gks.stats.academicValue')}
                </p>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="p-5 rounded-[24px] bg-[#F5F5F7]/60 dark:bg-[#2C2C2E]/60 border border-[#D2D2D7]/50 dark:border-white/5 space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#AF52DE]/10 dark:bg-purple-500/10 flex items-center justify-center text-[#AF52DE] dark:text-purple-400">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#86868B] uppercase tracking-wider">
                  {t('gks.stats.leadershipLabel')}
                </h4>
                <p className="text-base font-semibold text-[#1D1D1F] dark:text-white mt-0.5">
                  {t('gks.stats.leadershipValue')}
                </p>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="p-5 rounded-[24px] bg-[#F5F5F7]/60 dark:bg-[#2C2C2E]/60 border border-[#D2D2D7]/50 dark:border-white/5 space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#34C759]/10 dark:bg-emerald-500/10 flex items-center justify-center text-[#34C759] dark:text-emerald-400">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#86868B] uppercase tracking-wider">
                  {t('gks.stats.technicalLabel')}
                </h4>
                <p className="text-base font-semibold text-[#1D1D1F] dark:text-white mt-0.5">
                  {t('gks.stats.technicalValue')}
                </p>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="p-5 rounded-[24px] bg-[#F5F5F7]/60 dark:bg-[#2C2C2E]/60 border border-[#D2D2D7]/50 dark:border-white/5 space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#FF9500]/10 dark:bg-amber-500/10 flex items-center justify-center text-[#FF9500] dark:text-amber-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#86868B] uppercase tracking-wider">
                  {t('gks.stats.globalLabel')}
                </h4>
                <p className="text-base font-semibold text-[#1D1D1F] dark:text-white mt-0.5">
                  {t('gks.stats.globalValue')}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#D2D2D7]/30 dark:border-[#333336]/30 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-[#86868B] max-w-xl">
              {t(
                'This application package documents verified qualifications, EU-level certificates, and scale metrics for target institutions in the Republic of Korea.',
                'Bu başvuru paketi, Kore Cumhuriyeti\'ndeki hedef kurumlar için doğrulanmış nitelikleri, AB düzeyindeki sertifikaları ve ölçek metriklerini belgeler.'
              )}
            </p>

            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm bg-gradient-to-r from-[#003478] to-[#C60C30] hover:opacity-90 text-white shadow-md transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{t('gks.download')}</span>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
