import React from 'react';
import { Calendar, ShieldAlert, Sparkles } from 'lucide-react';

interface HeaderProps {
  referenceDate: string;
  onSelectReferenceDate: (date: string) => void;
  unclearCount: number;
  overdueCount: number;
  onNavigateToUnclear: () => void;
  onOpenChat: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  referenceDate,
  onSelectReferenceDate,
  unclearCount,
  overdueCount,
  onNavigateToUnclear,
  onOpenChat,
}) => {
  const dates = [
    { id: '2026-09-21', label: 'Mon 21', full: 'Mon, 21 Sep' },
    { id: '2026-09-22', label: 'Tue 22', full: 'Tue, 22 Sep' },
    { id: '2026-09-23', label: 'Wed 23', full: 'Wed, 23 Sep' },
    { id: '2026-09-24', label: 'Thu 24', full: 'Thu, 24 Sep' },
    { id: '2026-09-25', label: 'Fri 25', full: 'Fri, 25 Sep' },
    { id: 'current', label: 'Full Week', full: 'Week Overview (Sep 21–25)' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-[#FFFFFF]/90 backdrop-blur-md border-b border-[#E6DDD3] px-6 py-3 shadow-xs">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* User Identity & Assignment Context */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C0824B] to-[#8C5234] text-white flex items-center justify-center font-bold text-sm tracking-wide shadow-xs border border-[#D89B66]/40">
            AM
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#2A1816] text-sm tracking-tight">
                Arjun Malhotra
              </span>
              <span className="text-xs bg-[#F4EDE4] text-[#8C5234] px-2 py-0.5 rounded-md font-medium border border-[#E3D6C8]">
                VP Sales · Veridian Corp
              </span>
            </div>
          </div>
        </div>

        {/* Timeline Simulation Control */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 bg-[#F4EDE4] p-1 rounded-xl border border-[#E3D6C8]">
            <span className="text-[11px] font-semibold text-[#8C5234] uppercase tracking-wider px-2 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#C0824B]" />
              Day:
            </span>
            {dates.map((d) => {
              const active = referenceDate === d.id;
              return (
                <button
                  key={d.id}
                  id={`ref-date-btn-${d.id}`}
                  onClick={() => onSelectReferenceDate(d.id)}
                  title={`Simulate brief as of ${d.full}`}
                  className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all ${
                    active
                      ? 'bg-gradient-to-r from-[#C0824B] to-[#8C5234] text-white shadow-xs border border-[#D89B66]/30 font-semibold'
                      : 'text-[#6B554B] hover:text-[#2A1816] hover:bg-[#EAE0D5]'
                  }`}
                >
                  {d.label}
                </button>
              );
            })}
          </div>

          {/* Quick Status Alerts */}
          {unclearCount > 0 && (
            <button
              id="header-unclear-alert-btn"
              onClick={onNavigateToUnclear}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-[#FEF3C7] text-[#92400E] border border-[#FCD34D] hover:bg-[#FDE68A] transition-colors shadow-xs"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-[#B45309]" />
              <span>{unclearCount} Unclear Ownership</span>
            </button>
          )}

          {overdueCount > 0 && (
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-xl bg-[#FEE2E2] text-[#991B1B] border border-[#FCA5A5]">
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
              <span>{overdueCount} Overdue</span>
            </div>
          )}

          {/* Ask Agent button */}
          <button
            id="header-ask-agent-btn"
            onClick={onOpenChat}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-xl bg-gradient-to-r from-[#C0824B] to-[#8C5234] text-white hover:from-[#B0743E] hover:to-[#7B462C] transition-all shadow-xs border border-[#D89B66]/30"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            <span>Ask Agent</span>
          </button>
        </div>
      </div>
    </header>
  );
};
