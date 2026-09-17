import React, { useState, useMemo } from 'react';
import {
  Search,
  UserCheck,
  Clock,
  AlertTriangle,
  CheckCircle2,
  FileText,
  AlertCircle,
} from 'lucide-react';
import { ActionItem, OwnershipType, ActionStatus } from '../types';

interface ActionListViewProps {
  actions: ActionItem[];
  defaultOwnershipFilter?: OwnershipType | 'ALL';
  onSelectAction: (action: ActionItem) => void;
  title: string;
  subtitle: string;
}

export const ActionListView: React.FC<ActionListViewProps> = ({
  actions,
  defaultOwnershipFilter = 'ALL',
  onSelectAction,
  title,
  subtitle,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [ownershipFilter, setOwnershipFilter] = useState<OwnershipType | 'ALL'>(
    defaultOwnershipFilter
  );
  const [statusFilter, setStatusFilter] = useState<ActionStatus | 'ALL'>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  const filteredActions = useMemo(() => {
    return actions.filter((action) => {
      // Ownership filter
      if (ownershipFilter !== 'ALL' && action.ownershipType !== ownershipFilter) {
        return false;
      }

      // Status filter
      if (statusFilter !== 'ALL' && action.status !== statusFilter) {
        return false;
      }

      // Category filter
      if (categoryFilter !== 'ALL' && action.category !== categoryFilter) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = action.canonicalTitle.toLowerCase().includes(q);
        const matchesSummary = action.summary.toLowerCase().includes(q);
        const matchesOwner = action.owner.toLowerCase().includes(q);
        const matchesCounterparty = action.counterparty?.toLowerCase().includes(q);
        const matchesQuotes = action.citations.some(
          (c) =>
            c.quote.toLowerCase().includes(q) || c.title.toLowerCase().includes(q)
        );

        if (
          !matchesTitle &&
          !matchesSummary &&
          !matchesOwner &&
          !matchesCounterparty &&
          !matchesQuotes
        ) {
          return false;
        }
      }

      return true;
    });
  }, [actions, ownershipFilter, statusFilter, categoryFilter, searchQuery]);

  const getOwnershipBadge = (type: OwnershipType) => {
    switch (type) {
      case 'MY_ACTION':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]">
            <UserCheck className="w-3 h-3" /> My Action
          </span>
        );
      case 'WAITING_ON_OTHERS':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]">
            <Clock className="w-3 h-3" /> Waiting on Others
          </span>
        );
      case 'UNCLEAR':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-[#FEE2E2] text-[#991B1B] border border-[#FCA5A5] font-bold">
            <AlertTriangle className="w-3 h-3 text-[#DC2626]" /> Unclear Ownership
          </span>
        );
    }
  };

  const getStatusBadge = (status: ActionStatus) => {
    switch (status) {
      case 'DUE_TODAY':
        return (
          <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]">
            Due Today
          </span>
        );
      case 'OVERDUE':
        return (
          <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-[#FEE2E2] text-[#991B1B] border border-[#FCA5A5] flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> Overdue
          </span>
        );
      case 'COMPLETED':
        return (
          <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0] flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Completed
          </span>
        );
      case 'OPEN':
        return (
          <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-[#F0EAE1] text-[#8C5234] border border-[#DFCFC0]">
            Open
          </span>
        );
      case 'UNCLEAR':
        return (
          <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]">
            Unassigned
          </span>
        );
    }
  };

  return (
    <div className="space-y-5 pb-12">
      {/* Title & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E6DDD3]">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-[#2A1816]">
            {title}
          </h2>
          <p className="text-xs text-[#73584E] mt-0.5">{subtitle}</p>
        </div>
        <div className="text-xs text-[#8C5234] font-medium">
          Showing <strong className="text-[#2A1816]">{filteredActions.length}</strong> of {actions.length} records
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-[#FFFFFF] p-3.5 rounded-2xl border border-[#E6DDD3] shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#C0824B] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="action-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search actions by keyword, person, quote, or topic..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-[#E0D7CD] bg-[#FAF7F2] text-[#2A1816] placeholder:text-[#9C8B7F] focus:bg-[#FFFFFF] focus:outline-hidden focus:ring-2 focus:ring-[#C0824B]"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Ownership Dropdown */}
            <select
              id="ownership-filter-select"
              value={ownershipFilter}
              onChange={(e) => setOwnershipFilter(e.target.value as any)}
              className="text-xs px-3 py-2 rounded-xl border border-[#E0D7CD] bg-[#FAF7F2] font-medium text-[#5A453D] focus:outline-hidden focus:ring-1 focus:ring-[#C0824B]"
            >
              <option value="ALL">All Ownerships</option>
              <option value="MY_ACTION">My Actions (Arjun)</option>
              <option value="WAITING_ON_OTHERS">Waiting on Others</option>
              <option value="UNCLEAR">Unclear Ownership</option>
            </select>

            {/* Status Dropdown */}
            <select
              id="status-filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="text-xs px-3 py-2 rounded-xl border border-[#E0D7CD] bg-[#FAF7F2] font-medium text-[#5A453D] focus:outline-hidden focus:ring-1 focus:ring-[#C0824B]"
            >
              <option value="ALL">All Statuses</option>
              <option value="DUE_TODAY">Due Today</option>
              <option value="OVERDUE">Overdue</option>
              <option value="OPEN">Open</option>
              <option value="COMPLETED">Completed</option>
              <option value="UNCLEAR">Unclear</option>
            </select>

            {/* Category Dropdown */}
            <select
              id="category-filter-select"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="text-xs px-3 py-2 rounded-xl border border-[#E0D7CD] bg-[#FAF7F2] font-medium text-[#5A453D] focus:outline-hidden focus:ring-1 focus:ring-[#C0824B]"
            >
              <option value="ALL">All Categories</option>
              <option value="OPERATIONS">Operations</option>
              <option value="CLIENT">Client</option>
              <option value="MARKETING">Marketing</option>
              <option value="FINANCE">Finance</option>
              <option value="FACILITIES">Facilities</option>
            </select>
          </div>
        </div>
      </div>

      {/* Action Cards List */}
      {filteredActions.length === 0 ? (
        <div className="bg-[#FFFFFF] p-12 text-center rounded-2xl border border-[#E6DDD3] text-[#73584E] space-y-2 shadow-xs">
          <p className="text-sm font-medium">No actions match your filter criteria.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setOwnershipFilter('ALL');
              setStatusFilter('ALL');
              setCategoryFilter('ALL');
            }}
            className="text-xs text-[#8C5234] hover:text-[#C0824B] hover:underline font-semibold"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="space-y-3.5">
          {filteredActions.map((action) => (
            <div
              key={action.id}
              className={`rounded-2xl border p-5 transition-all shadow-xs ${
                action.ownershipType === 'UNCLEAR'
                  ? 'border-[#FCD34D] bg-[#FFFBEB]'
                  : action.status === 'OVERDUE'
                  ? 'border-[#FECACA] bg-[#FEF2F2]'
                  : 'border-[#E6DDD3] bg-[#FFFFFF] hover:border-[#C0824B]/70'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    {getOwnershipBadge(action.ownershipType)}
                    {getStatusBadge(action.status)}
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-[#F0EAE1] text-[#8C5234] border border-[#DFCFC0]">
                      {action.category}
                    </span>
                    <span className="text-xs text-[#8C776D] font-medium">
                      Merged from {action.deduplicationHistory.sourceCount} sources
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#2A1816] pt-1">
                    {action.canonicalTitle}
                  </h3>

                  <p className="text-xs text-[#5A453D] leading-relaxed">
                    {action.summary}
                  </p>
                </div>

                <div className="text-left sm:text-right shrink-0">
                  <div className="text-xs font-semibold text-[#2A1816]">
                    {action.resolvedDeadlineLabel}
                  </div>
                  <div className="text-[11px] text-[#8C776D] mt-0.5">
                    Deadline
                  </div>
                </div>
              </div>

              {/* Status Justification / Unclear Warning */}
              <div
                className={`mt-3 p-3 rounded-xl border text-xs leading-relaxed space-y-1 ${
                  action.ownershipType === 'UNCLEAR'
                    ? 'bg-[#FFFFFF] border-[#FDE68A] text-[#78350F]'
                    : action.status === 'OVERDUE'
                    ? 'bg-[#FFFFFF] border-[#FECACA] text-[#991B1B]'
                    : 'bg-[#FAF7F2] border-[#ECE2D8] text-[#5A453D]'
                }`}
              >
                <div>
                  <strong className="text-[#2A1816] font-semibold">Status Justification: </strong>
                  {action.statusJustification}
                </div>
                {action.unclearReason && (
                  <div className="text-[#B45309] font-medium pt-1 border-t border-[#FDE68A]">
                    ⚠️ {action.unclearReason}
                  </div>
                )}
              </div>

              {/* Action Footer with Citations Preview & Audit Button */}
              <div className="mt-4 pt-3 border-t border-[#F0EAE1] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-[#73584E] text-[11px]">
                  <span>Owner: <strong className="text-[#2A1816]">{action.owner}</strong></span>
                  {action.counterparty && (
                    <span>· Counterparty: <strong className="text-[#2A1816]">{action.counterparty}</strong></span>
                  )}
                </div>

                <button
                  id={`view-evidence-${action.id}`}
                  onClick={() => onSelectAction(action)}
                  className="px-3.5 py-1.5 text-xs font-semibold bg-gradient-to-r from-[#C0824B] to-[#8C5234] text-white hover:from-[#B0743E] hover:to-[#7B462C] rounded-xl transition-all flex items-center gap-1.5 self-start sm:self-auto shadow-xs border border-[#D89B66]/30"
                >
                  <FileText className="w-3.5 h-3.5 text-amber-200" />
                  <span>Inspect Audit & Citations ({action.citations.length})</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
