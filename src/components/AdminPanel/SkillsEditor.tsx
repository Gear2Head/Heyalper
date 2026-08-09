import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Plus, Trash2, Award, Check } from 'lucide-react';

export const SkillsEditor: React.FC = () => {
  const { data, addCertificate, deleteCertificate } = usePortfolio();
  const [newCert, setNewCert] = useState({ title: '', issuer: '', date: '', code: '', credentialUrl: '' });

  const handleAddCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCert.title || !newCert.issuer) return;
    addCertificate(newCert);
    setNewCert({ title: '', issuer: '', date: '', code: '', credentialUrl: '' });
  };

  return (
    <div className="space-y-6 text-xs">
      <div className="border-b border-black/10 dark:border-white/10 pb-3">
        <h3 className="text-base font-bold text-zinc-900 dark:text-white">
          Sertifika & Eğitim Belgeleri Yönetimi
        </h3>
        <p className="text-zinc-500">
          Akademik başvurunuz için sahip olduğunuz ek sertifika ve lisansları ekleyin.
        </p>
      </div>

      <form onSubmit={handleAddCert} className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 space-y-3">
        <h4 className="font-bold text-zinc-900 dark:text-white text-xs">Yeni Sertifika Ekle</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            required
            placeholder="Sertifika Adı (Örn: CS50x)"
            value={newCert.title}
            onChange={(e) => setNewCert({ ...newCert, title: e.target.value })}
            className="px-3 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white"
          />
          <input
            type="text"
            required
            placeholder="Veren Kurum (Örn: Harvard / edX)"
            value={newCert.issuer}
            onChange={(e) => setNewCert({ ...newCert, issuer: e.target.value })}
            className="px-3 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white"
          />
          <input
            type="text"
            placeholder="Tarih (Örn: Ocak 2026)"
            value={newCert.date}
            onChange={(e) => setNewCert({ ...newCert, date: e.target.value })}
            className="px-3 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white"
          />
          <input
            type="text"
            placeholder="Sertifika Kodu (Örn: CS50-2026)"
            value={newCert.code}
            onChange={(e) => setNewCert({ ...newCert, code: e.target.value })}
            className="px-3 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white"
          />
        </div>
        <button
          type="submit"
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Sertifika Ekle</span>
        </button>
      </form>

      <div className="space-y-2">
        {data.certificates.map((cert) => (
          <div
            key={cert.id}
            className="p-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-between"
          >
            <div>
              <span className="font-bold text-zinc-900 dark:text-white block">{cert.title}</span>
              <span className="text-[10px] text-zinc-500 font-medium">{cert.issuer} • {cert.date}</span>
            </div>
            <button
              onClick={() => deleteCertificate(cert.id)}
              className="p-1.5 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
