import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Award, ExternalLink, ShieldCheck, CheckCircle, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export const CertificatesSection: React.FC = () => {
  const { data } = usePortfolio();

  const getRadiusClass = () => {
    switch (data.theme.borderRadius) {
      case 'sm': return 'rounded-xl';
      case 'md': return 'rounded-2xl';
      case 'lg': return 'rounded-3xl';
      case 'xl': return 'rounded-[2rem]';
      default: return 'rounded-2xl';
    }
  };

  return (
    <section id="certificates" className="py-16 px-4 max-w-6xl mx-auto space-y-8">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-[#0066CC] mb-1 block">
          SERTİFİKALAR & DOĞRULANMIŞ BELGELER
        </span>
        <h2 className="text-3xl sm:text-4xl font-semibold text-[#1D1D1F] dark:text-white tracking-tight">
          Akademik Sertifikasyonlar
        </h2>
        <p className="text-sm text-[#86868B] mt-1 max-w-xl font-medium">
          Harvard CS50, Coursera DeepLearning.AI ve uluslararası sertifika belgeleri.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.certificates.map((cert, idx) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.08 }}
            className="p-6 rounded-[28px] bg-white dark:bg-[#1D1D1F] border border-[#D2D2D7] dark:border-[#333336] shadow-sm flex flex-col justify-between space-y-4 hover:border-[#0066CC] transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-2xl bg-[#F5F5F7] dark:bg-[#2C2C2E] text-[#0066CC]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-[#F5F5F7] dark:bg-[#2C2C2E] text-[#86868B]">
                  {cert.code || 'VERIFIED'}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-[#1D1D1F] dark:text-white">
                  {cert.title}
                </h3>
                <p className="text-xs font-semibold text-[#86868B] mt-0.5">
                  {cert.issuer}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#D2D2D7]/50 dark:border-[#333336] flex items-center justify-between text-xs text-[#86868B]">
              <span className="flex items-center gap-1 font-medium">
                <Calendar className="w-3.5 h-3.5 text-[#0066CC]" />
                <span>{cert.date}</span>
              </span>

              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 font-bold text-[#0066CC] hover:underline"
                >
                  <span>Doğrula</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
