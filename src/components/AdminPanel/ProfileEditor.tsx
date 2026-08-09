import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Save, Sparkles, Check, Image as ImageIcon } from 'lucide-react';

export const ProfileEditor: React.FC = () => {
  const { data, updateProfile } = usePortfolio();
  const [profile, setProfile] = useState(data.profile);
  const [saved, setSaved] = useState(false);
  const [isEnhancingBio, setIsEnhancingBio] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(profile);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const enhanceBioWithAI = async () => {
    if (!profile.bio) return;
    setIsEnhancingBio(true);
    try {
      const res = await fetch('/api/ai/enhance-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: profile.bio,
          contextType: 'Biyografi Özeti',
          targetUniversity: profile.targetUniversity
        })
      });
      const result = await res.json();
      if (result.enhancedText) {
        setProfile((prev) => ({ ...prev, bio: result.enhancedText }));
      }
    } catch (e) {
      console.error('AI error', e);
    } finally {
      setIsEnhancingBio(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-xs">
      <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-3">
        <div>
          <h3 className="text-base font-bold text-zinc-900 dark:text-white">
            Kişisel Profil & Üniversite Hedefleri
          </h3>
          <p className="text-zinc-500">
            Portfolyonun başlık, biyografi, GPA ve hedef üniversite verilerini güncelleyin.
          </p>
        </div>

        <button
          type="submit"
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition-all cursor-pointer"
        >
          {saved ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
          <span>{saved ? 'Kaydedildi!' : 'Değişiklikleri Kaydet'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="font-semibold text-zinc-700 dark:text-zinc-300">Ad & Soyad</label>
          <input
            type="text"
            value={profile.fullName}
            onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>

        <div className="space-y-1">
          <label className="font-semibold text-zinc-700 dark:text-zinc-300">Unvan & Çalışma Alanı</label>
          <input
            type="text"
            value={profile.title}
            onChange={(e) => setProfile({ ...profile, title: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>

        <div className="space-y-1">
          <label className="font-semibold text-zinc-700 dark:text-zinc-300">Hedef Üniversite(ler)</label>
          <input
            type="text"
            value={profile.targetUniversity}
            onChange={(e) => setProfile({ ...profile, targetUniversity: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>

        <div className="space-y-1">
          <label className="font-semibold text-zinc-700 dark:text-zinc-300">Hedef Bölüm / Lisans Programı</label>
          <input
            type="text"
            value={profile.targetMajor}
            onChange={(e) => setProfile({ ...profile, targetMajor: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>

        <div className="space-y-1">
          <label className="font-semibold text-zinc-700 dark:text-zinc-300">GPA / Not Ortalaması</label>
          <input
            type="text"
            value={profile.gpa}
            onChange={(e) => setProfile({ ...profile, gpa: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>

        <div className="space-y-1">
          <label className="font-semibold text-zinc-700 dark:text-zinc-300">SAT / Sınav Skoru</label>
          <input
            type="text"
            value={profile.satScore}
            onChange={(e) => setProfile({ ...profile, satScore: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>
      </div>

      {/* Avatar URL & Live Image Preview */}
      <div className="space-y-2 p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
        <label className="font-semibold text-zinc-700 dark:text-zinc-300 flex items-center justify-between">
          <span>Profil Fotoğraf Bağlantısı (Görsel URL)</span>
          <span className="text-[10px] text-zinc-400">Örn: Unsplash, Imgur, Vb.</span>
        </label>
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={profile.avatarUrl}
            onChange={(e) => setProfile({ ...profile, avatarUrl: e.target.value })}
            className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
          <img
            src={profile.avatarUrl}
            alt="Önizleme"
            className="w-10 h-10 rounded-full object-cover border border-black/20 dark:border-white/20 flex-shrink-0"
          />
        </div>
      </div>

      {/* Short Bio + AI Button */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="font-semibold text-zinc-700 dark:text-zinc-300">Özet Biyografi</label>
          <button
            type="button"
            onClick={enhanceBioWithAI}
            disabled={isEnhancingBio}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 font-semibold transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isEnhancingBio ? 'AI İyileştiriyor...' : 'AI İle Cilala'}</span>
          </button>
        </div>
        <textarea
          rows={3}
          value={profile.bio}
          onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
          className="w-full px-3 py-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
        />
      </div>

      {/* Long Statement */}
      <div className="space-y-2">
        <label className="font-semibold text-zinc-700 dark:text-zinc-300">Detaylı Niyet Beyanı (Long Statement)</label>
        <textarea
          rows={4}
          value={profile.longBio}
          onChange={(e) => setProfile({ ...profile, longBio: e.target.value })}
          className="w-full px-3 py-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
        />
      </div>

      {/* Contact & Socials */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <div className="space-y-1">
          <label className="font-semibold text-zinc-700 dark:text-zinc-300">E-Posta Adresi</label>
          <input
            type="email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white"
          />
        </div>

        <div className="space-y-1">
          <label className="font-semibold text-zinc-700 dark:text-zinc-300">Konum</label>
          <input
            type="text"
            value={profile.location}
            onChange={(e) => setProfile({ ...profile, location: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white"
          />
        </div>

        <div className="space-y-1">
          <label className="font-semibold text-zinc-700 dark:text-zinc-300">GitHub Adresi</label>
          <input
            type="text"
            value={profile.githubUrl}
            onChange={(e) => setProfile({ ...profile, githubUrl: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white"
          />
        </div>

        <div className="space-y-1">
          <label className="font-semibold text-zinc-700 dark:text-zinc-300">LinkedIn Adresi</label>
          <input
            type="text"
            value={profile.linkedinUrl}
            onChange={(e) => setProfile({ ...profile, linkedinUrl: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white"
          />
        </div>

        <div className="space-y-1">
          <label className="font-semibold text-zinc-700 dark:text-zinc-300">Instagram Adresi</label>
          <input
            type="text"
            value={profile.instagramUrl || ''}
            onChange={(e) => setProfile({ ...profile, instagramUrl: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white"
          />
        </div>
      </div>
    </form>
  );
};
