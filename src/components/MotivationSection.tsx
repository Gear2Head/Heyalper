import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Sparkles, Compass, Cpu, GraduationCap, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const MotivationSection: React.FC = () => {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', damping: 25, stiffness: 120 } }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="motivation" className="py-16 px-4 max-w-6xl mx-auto space-y-8">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#0066CC] dark:text-blue-400 bg-[#0066CC]/10 dark:bg-blue-500/15 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5" />
          <span>{t('why.title')}</span>
        </span>
        <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#1D1D1F] dark:text-white">
          {t('why.subtitle')}
        </h2>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {/* Why AI Card */}
        <motion.div
          variants={itemVariants}
          className={`bg-white dark:bg-[#1D1D1F] p-8 border border-[#D2D2D7] dark:border-[#333336] shadow-sm relative overflow-hidden flex flex-col justify-between ${getRadiusClass()}`}
        >
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 dark:bg-blue-500/15 flex items-center justify-center text-[#0066CC] dark:text-blue-400">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-[#1D1D1F] dark:text-white">
              {t('why.whyAiTitle')}
            </h3>
            <p className="text-sm text-[#86868B] dark:text-zinc-400 leading-relaxed font-normal">
              {t('why.whyAiText1')}
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-[#D2D2D7]/30 dark:border-white/5 flex items-center justify-between text-xs text-[#86868B]">
            <span>{t('2+ Years Expertise', '2+ Yıllık Deneyim')}</span>
            <span className="font-semibold text-[#0066CC] dark:text-blue-400">{t('Mastery in LLM Workflows', 'LLM İş Akışlarında Uzmanlık')}</span>
          </div>
        </motion.div>

        {/* Why Korea Card */}
        <motion.div
          variants={itemVariants}
          className={`bg-white dark:bg-[#1D1D1F] p-8 border border-[#D2D2D7] dark:border-[#333336] shadow-sm relative overflow-hidden flex flex-col justify-between ${getRadiusClass()}`}
        >
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 dark:bg-purple-500/15 flex items-center justify-center text-[#AF52DE] dark:text-purple-400">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-[#1D1D1F] dark:text-white">
              {t('why.whyKoreaTitle')}
            </h3>
            <p className="text-sm text-[#86868B] dark:text-zinc-400 leading-relaxed font-normal">
              {t('why.whyKoreaText1')}
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-[#D2D2D7]/30 dark:border-white/5 flex items-center justify-between text-xs text-[#86868B]">
            <span>{t('Korea Global Career Path', 'Kore Küresel Kariyer Yolu')}</span>
            <span className="font-semibold text-[#AF52DE] dark:text-purple-400">{t('KAIST / SNU / Tech Labs', 'KAIST / SNU / Teknoloji Laboratuvarları')}</span>
          </div>
        </motion.div>
      </motion.div>

      <div className="flex justify-center pt-4">
        <button
          onClick={() => scrollToSection('projects')}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm bg-zinc-100 hover:bg-zinc-200 dark:bg-[#2C2C2E] dark:hover:bg-[#333336] text-[#1D1D1F] dark:text-white border border-[#D2D2D7]/50 dark:border-white/5 shadow-sm transition-all cursor-pointer"
        >
          <span>{t('why.cta')}</span>
          <ArrowRight className="w-4 h-4 text-[#0066CC] dark:text-blue-400" />
        </button>
      </div>
    </section>
  );
};
