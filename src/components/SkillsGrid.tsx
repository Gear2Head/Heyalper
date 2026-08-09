import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Cpu, CheckCircle2, Code2, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

export const SkillsGrid: React.FC = () => {
  const { data, t } = usePortfolio();

  return (
    <section id="skills" className="py-16 px-4 max-w-6xl mx-auto space-y-8">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-[#0066CC] mb-1 block">
          {t('TEKNİK & AKADEMİK YETKİNLİKLER', 'TECHNICAL & OPERATIONAL SKILLS')}
        </span>
        <h2 className="text-3xl sm:text-4xl font-semibold text-[#1D1D1F] dark:text-white tracking-tight">
          {t('Yapay Zeka, SQL & Operasyon Matrisi', 'AI Tools, SQL & Operations Matrix')}
        </h2>
        <p className="text-sm text-[#86868B] mt-1 max-w-xl font-medium">
          {t(
            'Claude, Codex & Gemini yapay zeka araçları, SQL veritabanı sorgulama ve devasa topluluk operasyon yönetimi yetkinlikleri.',
            'Proficiency in Claude, Codex & Gemini AI tools, relational SQL querying, and large-scale community operations management.'
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.skillCategories.map((cat, idx) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="p-7 rounded-[32px] bg-white dark:bg-[#1D1D1F] border border-[#D2D2D7] dark:border-[#333336] shadow-sm space-y-6"
          >
            <div className="flex items-center justify-between border-b border-[#D2D2D7]/50 dark:border-[#333336] pb-3">
              <h3 className="text-base font-bold text-[#1D1D1F] dark:text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#0066CC]" />
                <span>{cat.name}</span>
              </h3>
            </div>

            <div className="space-y-4">
              {cat.skills.map((skill, sIdx) => (
                <div key={sIdx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-[#1D1D1F] dark:text-white">{skill.name}</span>
                    <span className="text-[#0066CC] font-mono text-[11px] font-bold">{skill.badge || `%${skill.level}`}</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 rounded-full bg-[#F5F5F7] dark:bg-[#2C2C2E] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="h-full rounded-full bg-[#0066CC]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
