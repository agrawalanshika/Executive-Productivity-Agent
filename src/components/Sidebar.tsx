import React from 'react';
import {
  CalendarDays,
  CheckSquare,
  UserCheck,
  Clock,
  AlertTriangle,
  MessageSquareText,
  Database,
} from 'lucide-react';

export type NavTab =
  | 'daily-brief'
  | 'all-actions'
  | 'my-commitments'
  | 'waiting-on-others'
  | 'unclear-ownership'
  | 'ask-agent'
  | 'sources';

interface SidebarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  counts: {
    total: number;
    myOpen: number;
    waiting: number;
    unclear: number;
    completed: number;
  };
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  counts,
}) => {
  const primaryNav = [
    {
      id: 'daily-brief' as NavTab,
      label: 'Daily Brief',
      icon: CalendarDays,
      badge: null,
    },
    {
      id: 'all-actions' as NavTab,
      label: 'All Actions',
      icon: CheckSquare,
      badge: counts.total,
      badgeColor: 'bg-[#F0EAE1] text-[#73584E] border border-[#E3D7C8]',
    },
    {
      id: 'my-commitments' as NavTab,
      label: 'My Commitments',
      icon: UserCheck,
      badge: counts.myOpen,
      badgeColor: 'bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]',
    },
    {
      id: 'waiting-on-others' as NavTab,
      label: 'Waiting on Others',
      icon: Clock,
      badge: counts.waiting,
      badgeColor: 'bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]',
    },
    {
      id: 'unclear-ownership' as NavTab,
      label: 'Unclear Ownership',
      icon: AlertTriangle,
      badge: counts.unclear,
      badgeColor: 'bg-[#FEE2E2] text-[#991B1B] border border-[#FCA5A5] font-bold',
    },
    {
      id: 'ask-agent' as NavTab,
      label: 'Ask the Agent',
      icon: MessageSquareText,
      badge: 'AI',
      badgeColor: 'bg-[#FAF0E6] text-[#8C5234] border border-[#E7D6C5] font-semibold',
    },
  ];

  const secondaryNav = [
    {
      id: 'sources' as NavTab,
      label: 'Sources & Assumptions',
      icon: Database,
    },
  ];

  return (
    <aside className="w-64 shrink-0 bg-[#FFFFFF] border-r border-[#E6DDD3] flex flex-col justify-between p-4 min-h-[calc(100vh-65px)]">
      <div className="space-y-6">
        <div>
          <div className="px-3 mb-2 text-[11px] font-bold uppercase tracking-wider text-[#8C5234]">
            Executive Briefing
          </div>
          <nav className="space-y-1">
            {primaryNav.map((item) => {
              const active = activeTab === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-xs rounded-xl font-medium transition-all ${
                    active
                      ? 'bg-gradient-to-r from-[#C0824B] to-[#8C5234] text-white shadow-xs border border-[#D89B66]/30'
                      : 'text-[#5A453D] hover:text-[#2A1816] hover:bg-[#F6EFE9]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon
                      className={`w-4 h-4 ${
                        active ? 'text-white' : 'text-[#C0824B]'
                      }`}
                    />
                    <span className="tracking-tight">{item.label}</span>
                  </div>
                  {item.badge !== null && (
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded-md font-semibold ${
                        active
                          ? 'bg-white/20 text-white border border-white/30'
                          : item.badgeColor || 'bg-[#F0EAE1] text-[#73584E]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div>
          <div className="px-3 mb-2 text-[11px] font-bold uppercase tracking-wider text-[#8C5234]">
            System & Governance
          </div>
          <nav className="space-y-1">
            {secondaryNav.map((item) => {
              const active = activeTab === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-xs rounded-xl font-medium transition-all ${
                    active
                      ? 'bg-gradient-to-r from-[#C0824B] to-[#8C5234] text-white shadow-xs border border-[#D89B66]/30'
                      : 'text-[#5A453D] hover:text-[#2A1816] hover:bg-[#F6EFE9]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon
                      className={`w-4 h-4 ${
                        active ? 'text-white' : 'text-[#C0824B]'
                      }`}
                    />
                    <span className="tracking-tight">{item.label}</span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </aside>
  );
};
