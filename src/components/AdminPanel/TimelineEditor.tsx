import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { AcademicEntry } from '../../types';
import { Plus, Trash2, Edit3, X, GraduationCap, Award, BookOpen, Users } from 'lucide-react';

export const TimelineEditor: React.FC = () => {
  const { data, addAcademicEntry, updateAcademicEntry, deleteAcademicEntry } = usePortfolio();
  const [editingEntry, setEditingEntry] = useState<Partial<AcademicEntry> | null>(null);

  const emptyEntry: Omit<AcademicEntry, 'id'> = {
    type: 'award',
    title: '',
    institution: '',
    location: '',
    period: '2026',
    description: '',
    achievements: [],
    badge: ''
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEntry || !editingEntry.title) return;

    if (editingEntry.id) {
      updateAcademicEntry(editingEntry.id, editingEntry);
    } else {
      addAcademicEntry(editingEntry as Omit<AcademicEntry, 'id'>);
    }
    setEditingEntry(null);
  };

  const handleAchievementsInput = (str: string) => {
    const list = str.split('\n').map((s) => s.trim()).filter(Boolean);
    setEditingEntry((prev) => ({ ...prev, achievements: list }));
  };

  return (
    <div className="space-y-6 text-xs">
      <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-3">
        <div>
          <h3 className="text-base font-bold text-zinc-900 dark:text-white">
            Akademik Geçmiş & Ödül Yönetimi
          </h3>
          <p className="text-zinc-500">
            TÜBİTAK dereceleri, okul öğrenimi, makaleler ve FRC robotik etkinliklerini düzenleyin.
          </p>
        </div>

        {!editingEntry && (
          <button
            onClick={() => setEditingEntry(emptyEntry)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Yeni Kayıt Ekle</span>
          </button>
        )}
      </div>

      {editingEntry && (
        <form onSubmit={handleSave} className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 space-y-3">
          <div className="flex items-center justify-between font-bold text-sm text-zinc-900 dark:text-white border-b border-black/5 dark:border-white/5 pb-2">
            <span>{editingEntry.id ? 'Düzenle' : 'Yeni Kayıt'}</span>
            <button
              type="button"
              onClick={() => setEditingEntry(null)}
              className="p-1 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 text-zinc-500"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">Kayıt Türü</label>
              <select
                value={editingEntry.type || 'award'}
                onChange={(e) => setEditingEntry({ ...editingEntry, type: e.target.value as any })}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white"
              >
                <option value="education">Eğitim & Okul</option>
                <option value="award">TÜBİTAK & Ödül / Olimpiyat</option>
                <option value="research">Araştırma & Makale</option>
                <option value="extracurricular">Robotik & Kulüpler</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">Rozet / Derece Etiketi</label>
              <input
                type="text"
                placeholder="Örn: Bölge 1.si"
                value={editingEntry.badge || ''}
                onChange={(e) => setEditingEntry({ ...editingEntry, badge: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">Başlık / Derece Adı</label>
              <input
                type="text"
                required
                value={editingEntry.title || ''}
                onChange={(e) => setEditingEntry({ ...editingEntry, title: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">Kurum / Okul Adı</label>
              <input
                type="text"
                value={editingEntry.institution || ''}
                onChange={(e) => setEditingEntry({ ...editingEntry, institution: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">Tarih / Dönem</label>
              <input
                type="text"
                value={editingEntry.period || ''}
                onChange={(e) => setEditingEntry({ ...editingEntry, period: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">Açıklama</label>
              <textarea
                rows={2}
                value={editingEntry.description || ''}
                onChange={(e) => setEditingEntry({ ...editingEntry, description: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white resize-none"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">Kazanımlar (Her satıra bir madde)</label>
              <textarea
                rows={3}
                value={editingEntry.achievements ? editingEntry.achievements.join('\n') : ''}
                onChange={(e) => handleAchievementsInput(e.target.value)}
                placeholder="Özel Proje Sergisi Katılımı&#10;Bölge Birinciliği Madalyası"
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white resize-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setEditingEntry(null)}
              className="px-3 py-1.5 rounded-xl bg-black/5 dark:bg-white/10 text-zinc-700 dark:text-zinc-300"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md"
            >
              Kaydet
            </button>
          </div>
        </form>
      )}

      <div className="space-y-2">
        {data.academicEntries.map((item) => (
          <div
            key={item.id}
            className="p-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-between gap-3"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-zinc-900 dark:text-white">{item.title}</span>
                {item.badge && (
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] text-zinc-500 font-medium">{item.institution} ({item.period})</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setEditingEntry(item)}
                className="p-1.5 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-black/10 text-zinc-700 dark:text-zinc-300 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => deleteAcademicEntry(item.id)}
                className="p-1.5 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
