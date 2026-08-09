import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ThemeSettings } from '../../types';
import { Sparkles, Palette, Moon, Sun, Layers, Clock, Lock, Unlock, ShieldCheck } from 'lucide-react';

export const ThemeCustomizer: React.FC = () => {
  const { data, updateTheme, toggleThemeLock, t } = usePortfolio();
  const { theme } = data;

  const radii: ThemeSettings['borderRadius'][] = ['sm', 'md', 'lg', 'xl', '2xl', 'full'];
  const accents: { id: ThemeSettings['accentColor']; name: string; colorClass: string }[] = [
    { id: 'blue', name: 'San Francisco Blue', colorClass: 'bg-blue-500' },
    { id: 'purple', name: 'Midnight Purple', colorClass: 'bg-purple-500' },
    { id: 'emerald', name: 'Emerald Green', colorClass: 'bg-emerald-500' },
    { id: 'amber', name: 'Titanium Amber', colorClass: 'bg-amber-500' },
    { id: 'rose', name: 'Crimson Rose', colorClass: 'bg-rose-500' },
    { id: 'slate', name: 'Apple Gray', colorClass: 'bg-slate-700' }
  ];

  return (
    <div className="space-y-6 text-xs">
      <div className="border-b border-black/10 dark:border-white/10 pb-3">
        <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
          <Palette className="w-4 h-4 text-blue-500" />
          <span>{t('Apple Tasarım & Tema Özelleştirici', 'Apple UI & Theme Customizer')}</span>
        </h3>
        <p className="text-zinc-500 mt-0.5">
          {t(
            'Ziyaretçinin yerel saatine göre çalışan akıllı tema geçişini, kilit durumunu, köşe kavislerini ve renklerini ayarlayın.',
            'Manage time-based auto theme switching, manual lock preference, border radius, and accent colors.'
          )}
        </p>
      </div>

      {/* Auto Time-based Theme Section */}
      <div className="p-4 rounded-2xl bg-[#0066CC]/5 dark:bg-[#0066CC]/10 border border-[#0066CC]/20 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#0066CC]" />
            <div>
              <span className="font-bold text-zinc-900 dark:text-white block">
                {t('Otomatik Yerel Saat Teması (19:00 - 07:00 Dark)', 'Time-Based Auto Theme (7 PM - 7 AM Dark)')}
              </span>
              <span className="text-[11px] text-zinc-500">
                {theme.isThemeLocked
                  ? t('Şu an manuel seçim kilitli. Otomatik geçiş duraklatıldı.', 'Currently locked to manual selection. Auto switch paused.')
                  : t('Ziyaretçinin yerel saatine göre otomatik Gece/Gündüz teması aktif.', 'Auto switching active based on visitor local time.')}
              </span>
            </div>
          </div>

          <button
            onClick={toggleThemeLock}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              theme.isThemeLocked
                ? 'bg-amber-500/10 text-amber-600 border border-amber-500/30'
                : 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/30'
            }`}
          >
            {theme.isThemeLocked ? (
              <>
                <Lock className="w-3.5 h-3.5" />
                <span>{t('Kilitli (Manuel)', 'Locked (Manual)')}</span>
              </>
            ) : (
              <>
                <Unlock className="w-3.5 h-3.5" />
                <span>{t('Otomatik Aktif', 'Auto Active')}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Dark / Light Mode */}
      <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 space-y-2">
        <label className="font-bold text-zinc-900 dark:text-white block">
          {t('Aydınlık / Karanlık Mod Seçimi', 'Light / Dark Mode Selection')}
        </label>
        <div className="flex items-center gap-3">
          <button
            onClick={() => updateTheme({ darkMode: false })}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border font-semibold transition-all cursor-pointer ${
              !theme.darkMode 
                ? 'bg-white text-zinc-900 border-black/20 shadow-sm' 
                : 'bg-black/5 text-zinc-500 border-transparent'
            }`}
          >
            <Sun className="w-4 h-4 text-amber-500" />
            <span>{t('Aydınlık Mod', 'Light Mode')}</span>
          </button>

          <button
            onClick={() => updateTheme({ darkMode: true })}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border font-semibold transition-all cursor-pointer ${
              theme.darkMode 
                ? 'bg-zinc-800 text-white border-white/20 shadow-sm' 
                : 'bg-black/5 text-zinc-500 border-transparent'
            }`}
          >
            <Moon className="w-4 h-4 text-purple-400" />
            <span>{t('Karanlık Mod (Apple Dark)', 'Dark Mode (Apple Dark)')}</span>
          </button>
        </div>
      </div>

      {/* Radius selector */}
      <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 space-y-3">
        <label className="font-bold text-zinc-900 dark:text-white block">Köşe Kavis Derecesi (Apple Curvature)</label>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {radii.map((r) => (
            <button
              key={r}
              onClick={() => updateTheme({ borderRadius: r })}
              className={`py-2 px-3 rounded-xl border text-xs font-semibold capitalize transition-all cursor-pointer ${
                theme.borderRadius === r
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                  : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-black/10 dark:border-white/10'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Accent Colors */}
      <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 space-y-3">
        <label className="font-bold text-zinc-900 dark:text-white block">Apple Vurgu Rengi (Accent Theme)</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {accents.map((acc) => (
            <button
              key={acc.id}
              onClick={() => updateTheme({ accentColor: acc.id })}
              className={`flex items-center gap-2.5 p-2.5 rounded-xl border font-semibold text-xs transition-all cursor-pointer ${
                theme.accentColor === acc.id
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border-black/20 dark:border-white/20 shadow-md ring-2 ring-blue-500/50'
                  : 'bg-white/50 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 border-black/5 dark:border-white/5'
              }`}
            >
              <div className={`w-4 h-4 rounded-full ${acc.colorClass} shadow-sm`} />
              <span>{acc.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Glass blur toggle */}
      <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-between">
        <div>
          <span className="font-bold text-zinc-900 dark:text-white block">Buzlu Cam Efekti (Backdrop Blur)</span>
          <span className="text-[11px] text-zinc-500">Arka plan görsel geçişlerinde yarı saydam Apple buzlu cam efekti kullan.</span>
        </div>
        <input
          type="checkbox"
          checked={theme.glassBlur}
          onChange={(e) => updateTheme({ glassBlur: e.target.checked })}
          className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};
