import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Activity, BarChart3, ShieldCheck, Award, GraduationCap, Sparkles } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface MetricItem {
  id: string;
  labelTr: string;
  labelEn: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  subtextTr: string;
  subtextEn: string;
  icon: React.ElementType;
  color: string;
  badgeTr: string;
  badgeEn: string;
}

const metricsData: MetricItem[] = [
  {
    id: 'members',
    labelTr: 'Toplam Yönetilen Üye',
    labelEn: 'Total Managed Members',
    value: 297782,
    suffix: '+',
    subtextTr: 'Adalances Ana (228.359) + İkincil (68.505) + Lutheus (918) Sunucuları',
    subtextEn: 'Adalances Main (228k) + Secondary (68.5k) + Lutheus (918) Servers',
    icon: Users,
    color: 'from-blue-500 to-indigo-600',
    badgeTr: '3 Sunucuda Toplam',
    badgeEn: 'Across 3 Servers'
  },
  {
    id: 'active',
    labelTr: 'Anlık Peak Aktif Kullanıcı',
    labelEn: 'Peak Concurrent Online',
    value: 15934,
    suffix: '+',
    subtextTr: 'Anlık Çevrimiçi Trafik & Kriz Yönetimi (9.896 + 5.763 + 275)',
    subtextEn: 'Concurrent Online Traffic & Crisis Handling (9,896 + 5,763 + 275)',
    icon: Activity,
    color: 'from-emerald-500 to-teal-600',
    badgeTr: 'Anlık Trafik',
    badgeEn: 'Live Traffic'
  },
  {
    id: 'records',
    labelTr: 'AI Kayıtlı Ceza & KPI Analizi',
    labelEn: 'AI Recorded Penalty & KPI Logs',
    value: 306,
    suffix: '+',
    subtextTr: 'Lutheus Manage Dashboard AI Veri İşleme',
    subtextEn: 'Lutheus Manage Dashboard AI Data Processing',
    icon: BarChart3,
    color: 'from-purple-500 to-violet-600',
    badgeTr: 'AI Otomasyon',
    badgeEn: 'AI Automation'
  },
  {
    id: 'accuracy',
    labelTr: 'Doğrulanmış İşlem Oranı',
    labelEn: 'Verified Action Accuracy',
    value: 90.8,
    suffix: '%',
    decimals: 1,
    subtextTr: 'Lutheus YSYM & Moderatör Başarı KPI Skoru',
    subtextEn: 'Lutheus Exam & Moderator Success KPI Score',
    icon: ShieldCheck,
    color: 'from-amber-500 to-orange-600',
    badgeTr: 'Yüksek Doğruluk',
    badgeEn: 'High Precision'
  },
  {
    id: 'ielts',
    labelTr: 'IELTS Academic Skor',
    labelEn: 'IELTS Academic Score',
    value: 7.0,
    decimals: 1,
    subtextTr: 'C1 Düzeyi Akıcı Akademik İngilizce',
    subtextEn: 'C1 Level Fluent Academic English',
    icon: Award,
    color: 'from-sky-500 to-blue-600',
    badgeTr: 'C1 İleri Seviye',
    badgeEn: 'C1 Proficient'
  },
  {
    id: 'gpa',
    labelTr: 'Ortaöğretim Başarı Puanı',
    labelEn: 'High School Graduation GPA',
    value: 94.4,
    decimals: 1,
    subtextTr: 'Kore Devlet Bursu (GKS) Adayı Akademik Not',
    subtextEn: 'Korea GKS Scholarship Candidate Score',
    icon: GraduationCap,
    color: 'from-[#0066CC] to-cyan-600',
    badgeTr: 'OBP 94.4 / 100',
    badgeEn: 'GPA 94.4 / 100'
  }
];

// Animated Number Counter Component
const CountUpNumber: React.FC<{
  targetValue: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}> = ({ targetValue, decimals = 0, prefix = '', suffix = '' }) => {
  const { language } = usePortfolio();
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepTime = duration / steps;
    const increment = targetValue / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= targetValue) {
        setCount(targetValue);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, targetValue]);

  const formatted = decimals > 0 
    ? count.toFixed(decimals) 
    : Math.floor(count).toLocaleString(language === 'tr' ? 'tr-TR' : 'en-US');

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{formatted}{suffix}
    </span>
  );
};

export const ImpactMetrics: React.FC = () => {
  const { t } = usePortfolio();

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#0066CC]/10 dark:bg-white/10 text-[#0066CC] dark:text-blue-400 border border-[#0066CC]/20 dark:border-white/15"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t('SAYILARLA ETKİ VE BÜYÜKLÜK', 'IMPACT & OPERATIONAL METRICS')}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#1D1D1F] dark:text-white"
        >
          {t('Operasyonel Metrikler & Başarılar', 'Operational Metrics & Achievements')}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg text-[#86868B]"
        >
          {t(
            'Devasa topluluk yönetimi, AI otomasyon verileri ve akademik başarı metriklerinin somut özeti.',
            'A concrete overview of large-scale community operations, AI workflow logs, and academic excellence.'
          )}
        </motion.p>
      </div>

      {/* Grid of Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {metricsData.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="group relative p-6 sm:p-8 rounded-3xl bg-white/80 dark:bg-[#1D1D1F]/80 backdrop-blur-xl border border-[#D2D2D7]/60 dark:border-[#333336] shadow-lg hover:shadow-xl hover:border-[#0066CC]/40 dark:hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${item.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#F5F5F7] dark:bg-[#2C2C2E] text-[#86868B] dark:text-gray-300 border border-[#D2D2D7]/40 dark:border-white/10">
                    {t(item.badgeTr, item.badgeEn)}
                  </span>
                </div>

                <div className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#1D1D1F] dark:text-white my-2">
                  <CountUpNumber
                    targetValue={item.value}
                    decimals={item.decimals}
                    prefix={item.prefix}
                    suffix={item.suffix}
                  />
                </div>

                <h3 className="text-base font-bold text-[#1D1D1F] dark:text-white mb-1">
                  {t(item.labelTr, item.labelEn)}
                </h3>
              </div>

              <p className="text-xs text-[#86868B] pt-4 border-t border-[#D2D2D7]/40 dark:border-[#333336] mt-4">
                {t(item.subtextTr, item.subtextEn)}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
