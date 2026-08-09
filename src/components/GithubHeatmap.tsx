import React, { useMemo } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Flame, GitCommit, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export const GithubHeatmap: React.FC = () => {
  const { t } = usePortfolio();

  // Generate realistic contribution data for the last 53 weeks (371 days)
  const heatmapData = useMemo(() => {
    const data = [];
    const today = new Date();
    // Start from 53 weeks ago, aligned to the starting Sunday
    const startDate = new Date();
    startDate.setDate(today.getDate() - 365);
    const startDay = startDate.getDay();
    startDate.setDate(startDate.getDate() - startDay); // Go back to Sunday

    const totalDays = 371; // 53 weeks * 7 days
    
    // Seeded random number generator for realistic patterns
    let seed = 42;
    const random = () => {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };

    for (let i = 0; i < totalDays; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);

      // Determine activity weight based on day of week and random streaks
      const dayOfWeek = currentDate.getDay();
      let weight = 0;

      // Higher chance of commit on weekdays, lower on weekends
      if (dayOfWeek > 0 && dayOfWeek < 6) {
        const rand = random();
        if (rand > 0.45) {
          weight = Math.floor(random() * 8) + 1; // 1-8 commits
        }
      } else {
        if (random() > 0.8) {
          weight = Math.floor(random() * 3) + 1; // 1-3 commits
        }
      }

      // Add occasional heavy days (10-15 commits)
      if (random() > 0.97) {
        weight = Math.floor(random() * 6) + 10;
      }

      data.push({
        date: currentDate.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' }),
        count: weight,
        dayOfWeek
      });
    }
    return data;
  }, []);

  // Calculate stats
  const stats = useMemo(() => {
    const total = heatmapData.reduce((acc, curr) => acc + curr.count, 0);
    
    // Calculate streaks
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;

    heatmapData.forEach((day) => {
      if (day.count > 0) {
        tempStreak++;
        if (tempStreak > longestStreak) {
          longestStreak = tempStreak;
        }
      } else {
        tempStreak = 0;
      }
    });

    // Estimate current streak up to today
    const reverseData = [...heatmapData].reverse();
    for (const day of reverseData) {
      if (day.count > 0) {
        currentStreak++;
      } else {
        // Allow a 1-day grace period for today
        if (currentStreak > 0) break;
      }
    }

    return {
      total,
      longestStreak: longestStreak || 18,
      currentStreak: currentStreak || 6
    };
  }, [heatmapData]);

  // Map count to GitHub contribution colors
  const getColorClass = (count: number) => {
    if (count === 0) return 'bg-[#ebedf0] dark:bg-[#22272e]';
    if (count <= 2) return 'bg-[#9be9a8] dark:bg-[#0e4429]';
    if (count <= 5) return 'bg-[#40c463] dark:bg-[#006d32]';
    if (count <= 8) return 'bg-[#30a14e] dark:bg-[#26a641]';
    return 'bg-[#216e39] dark:bg-[#39d353]';
  };

  // Group days into columns (weeks)
  const columns = useMemo(() => {
    const cols = [];
    for (let i = 0; i < heatmapData.length; i += 7) {
      cols.push(heatmapData.slice(i, i + 7));
    }
    return cols;
  }, [heatmapData]);

  // Month label offsets (approximate)
  const monthLabels = useMemo(() => {
    const labels: { name: string; index: number }[] = [];
    let lastMonth = -1;

    columns.forEach((week, colIdx) => {
      const firstDayOfWeek = new Date(week[0].date.split(' ').reverse().join('-')); // Simple parse estimate
      const month = firstDayOfWeek.getMonth();
      if (month !== lastMonth && colIdx % 4 === 0) {
        const monthName = firstDayOfWeek.toLocaleDateString('tr-TR', { month: 'short' });
        labels.push({ name: monthName, index: colIdx });
        lastMonth = month;
      }
    });

    return labels;
  }, [columns]);

  return (
    <div className="p-5 bg-white dark:bg-[#1D1D1F] border border-[#d0d7de] dark:border-[#30363d] rounded-2xl shadow-sm text-[#24292f] dark:text-[#adbac7] font-sans space-y-4">
      {/* Heatmap Header / Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#d0d7de]/60 dark:border-[#30363d]/60">
        <div className="flex items-center gap-2">
          <GitCommit className="w-5 h-5 text-[#0066CC] dark:text-blue-400 animate-pulse" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#1D1D1F] dark:text-[#f0f6fc]">
            {t('GitHub Aktivite Takvimi', 'GitHub Contribution Activity')}
          </h3>
        </div>

        {/* Quick Stats Grid */}
        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
            <span>
              {stats.currentStreak} {t('Günlük Seri', 'Day Streak')}
            </span>
          </div>
          <div className="w-[1px] h-3 bg-[#d0d7de] dark:bg-[#30363d]" />
          <div>
            {stats.total} {t('Son 1 Yıldaki Katkı', 'Contributions in last year')}
          </div>
        </div>
      </div>

      {/* Grid Container */}
      <div className="overflow-x-auto custom-scrollbar pb-2">
        <div className="min-w-[670px] space-y-1.5">
          {/* Months Header row */}
          <div className="relative h-4 text-[10px] text-[#57606a] dark:text-[#8b949e]">
            {monthLabels.map((lbl, idx) => (
              <span 
                key={idx} 
                className="absolute"
                style={{ left: `${lbl.index * 11.5 + 24}px` }}
              >
                {lbl.name}
              </span>
            ))}
          </div>

          <div className="flex gap-1.5">
            {/* Days of Week side labels */}
            <div className="flex flex-col justify-between text-[9px] text-[#57606a] dark:text-[#8b949e] w-5 pr-1.5 pt-0.5 select-none leading-none">
              <span>Paz</span>
              <span className="opacity-0">Pzt</span>
              <span>Çar</span>
              <span className="opacity-0">Per</span>
              <span>Cum</span>
              <span className="opacity-0">Cmt</span>
              <span className="opacity-0">Paz</span>
            </div>

            {/* Contribution Cells Columns */}
            <div className="flex gap-[3px]">
              {columns.map((week, colIdx) => (
                <div key={colIdx} className="flex flex-col gap-[3px]">
                  {week.map((day, rIdx) => (
                    <motion.div
                      key={rIdx}
                      whileHover={{ scale: 1.25, zIndex: 10 }}
                      className={`w-[8.5px] h-[8.5px] rounded-[1.5px] cursor-pointer transition-colors duration-150 relative group ${getColorClass(day.count)}`}
                    >
                      {/* Premium Floating Tooltip on Hover */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-30 bg-black/85 text-white dark:bg-[#2c2c2e]/95 text-[10px] py-1 px-2.5 rounded-lg border border-white/10 dark:border-white/5 shadow-md whitespace-nowrap select-none font-medium pointer-events-none">
                        <span className="font-bold text-[#39d353]">{day.count === 0 ? t('Katkı yok', 'No contributions') : `${day.count} ${t('katkı', 'contributions')}`}</span>
                        <span className="text-[#86868b] dark:text-zinc-400"> on {day.date}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid Legend & Info Footer */}
      <div className="flex items-center justify-between text-[11px] text-[#57606a] dark:text-[#8b949e] pt-1">
        <span className="flex items-center gap-1 text-[10px]">
          <Calendar className="w-3.5 h-3.5 text-[#0066CC] dark:text-blue-400" />
          <span>{t('Katkı verileri son 365 gün için simüle edilmiştir.', 'Activity data is simulated for the last 365 days.')}</span>
        </span>

        <div className="flex items-center gap-1 select-none">
          <span>{t('Az', 'Less')}</span>
          <span className="w-2.5 h-2.5 rounded-[1.5px] bg-[#ebedf0] dark:bg-[#22272e]" />
          <span className="w-2.5 h-2.5 rounded-[1.5px] bg-[#9be9a8] dark:bg-[#0e4429]" />
          <span className="w-2.5 h-2.5 rounded-[1.5px] bg-[#40c463] dark:bg-[#006d32]" />
          <span className="w-2.5 h-2.5 rounded-[1.5px] bg-[#30a14e] dark:bg-[#26a641]" />
          <span className="w-2.5 h-2.5 rounded-[1.5px] bg-[#216e39] dark:bg-[#39d353]" />
          <span>{t('Çok', 'More')}</span>
        </div>
      </div>
    </div>
  );
};
