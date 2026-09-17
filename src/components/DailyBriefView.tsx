import React from 'react';
import {
  AlertCircle,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  UserCheck,
  Calendar,
  Sparkles,
  FileSearch,
} from 'lucide-react';
import { DailyBriefData, ActionItem } from '../types';

interface DailyBriefViewProps {
  brief: DailyBriefData;
  onSelectAction: (action: ActionItem) => void;
  onAskAgentAbout: (question: string) => void;
  onNavigateToTab: (tab: any) => void;
}

export const DailyBriefView: React.FC<DailyBriefViewProps> = ({
  brief,
  onSelectAction,
  onAskAgentAbout,
  onNavigateToTab,
}) => {
  return (
    <div className="space-y-6 pb-12">
      {/* Executive Summary Card */}
      <div className="bg-gradient-to-br from-[#FFFFFF] via-[#FAF6F0] to-[#F4ECE3] text-[#2A1816] p-6 rounded-2xl shadow-xs border border-[#E6DDD3] relative overflow-hidden">
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold tracking-wider text-[#8C5234] bg-[#F0E6DB] px-2.5 py-1 rounded-md border border-[#DFCFC0]">
              Intelligence Brief
            </span>
            <span className="text-xs text-[#8C5234] font-medium">
              {brief.referenceDayName}
            </span>
          </div>

          <h2 className="text-xl font-bold tracking-tight text-[#2A1816]">
            {brief.headline}
          </h2>

          <p className="text-sm text-[#5A453D] leading-relaxed">
            {brief.summary}
          </p>
        </div>

        {/* Subtle decorative warm caramel background aura */}
        <div className="absolute right-0 top-0 bottom-0 w-80 bg-gradient-to-l from-[#C0824B]/10 via-[#C0824B]/5 to-transparent pointer-events-none" />
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div
          onClick={() => onNavigateToTab('all-actions')}
          className="bg-[#FFFFFF] p-4 rounded-xl border border-[#E6DDD3] hover:border-[#C0824B] cursor-pointer transition-all shadow-xs group"
        >
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#8C5234]">
            Total Actions
          </div>
          <div className="text-2xl font-bold text-[#2A1816] mt-1 group-hover:text-[#C0824B] transition-colors">
            {brief.stats.totalActions}
          </div>
          <div className="text-[11px] text-[#8C776D] mt-1">Across 4 sources</div>
        </div>

        <div
          onClick={() => onNavigateToTab('my-commitments')}
          className="bg-[#FFFFFF] p-4 rounded-xl border border-[#E6DDD3] hover:border-emerald-600 cursor-pointer transition-all shadow-xs group"
        >
          <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1">
            <UserCheck className="w-3 h-3" />
            My Open
          </div>
          <div className="text-2xl font-bold text-emerald-700 mt-1">
            {brief.stats.myOpenActions}
          </div>
          <div className="text-[11px] text-emerald-800/80 mt-1">Arjun commitments</div>
        </div>

        <div
          onClick={() => onNavigateToTab('waiting-on-others')}
          className="bg-[#FFFFFF] p-4 rounded-xl border border-[#E6DDD3] hover:border-[#C0824B] cursor-pointer transition-all shadow-xs group"
        >
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#8C5234] flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Waiting On
          </div>
          <div className="text-2xl font-bold text-[#8C5234] mt-1">
            {brief.stats.waitingOnOthers}
          </div>
          <div className="text-[11px] text-[#8C776D] mt-1">Team deliverables</div>
        </div>

        <div
          onClick={() => onNavigateToTab('unclear-ownership')}
          className="bg-[#FFFBEB] p-4 rounded-xl border border-[#FDE68A] hover:border-[#F59E0B] cursor-pointer transition-all shadow-xs group"
        >
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#B45309] flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            Unclear
          </div>
          <div className="text-2xl font-bold text-[#B45309] mt-1">
            {brief.stats.unclearOwnership}
          </div>
          <div className="text-[11px] text-[#92400E] mt-1">Unassigned risk</div>
        </div>

        <div className="bg-[#FFFFFF] p-4 rounded-xl border border-[#E6DDD3] shadow-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Completed
          </div>
          <div className="text-2xl font-bold text-[#2A1816] mt-1">
            {brief.stats.completed}
          </div>
          <div className="text-[11px] text-[#8C776D] mt-1">Fulfilled this week</div>
        </div>
      </div>

      {/* Critical Alerts Section: Unclear Ownership & Overdue */}
      <div className="space-y-4">
        {/* Unclear Ownership Banner */}
        {brief.unclearOwnershipActions.map((item) => (
          <div
            key={item.id}
            className="bg-[#FFFBEB] border border-[#FCD34D] rounded-2xl p-5 shadow-xs space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-[#92400E] font-bold text-sm">
                <ShieldAlert className="w-5 h-5 text-[#B45309] shrink-0" />
                <span>CRITICAL UNCLEAR OWNERSHIP: {item.canonicalTitle}</span>
              </div>
              <span className="text-xs bg-[#FEF3C7] text-[#92400E] font-semibold px-2.5 py-1 rounded-md border border-[#FDE68A] self-start sm:self-auto">
                Deadline: {item.resolvedDeadlineLabel}
              </span>
            </div>

            <p className="text-xs text-[#78350F] leading-relaxed">
              <strong className="text-[#92400E]">Ground Reality:</strong> {item.statusJustification}
            </p>

            <div className="bg-[#FFFFFF] p-3 rounded-xl border border-[#FDE68A] text-xs text-[#78350F] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="font-semibold text-[#92400E]">Recommended Action: </span>
                <span>{item.suggestedAction}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => onSelectAction(item)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#FFFBEB] hover:bg-[#FEF3C7] text-[#92400E] border border-[#FCD34D] transition-colors flex items-center gap-1"
                >
                  <FileSearch className="w-3.5 h-3.5 text-[#B45309]" />
                  View Audit Trail
                </button>
                <button
                  onClick={() =>
                    onAskAgentAbout('Which items have unclear ownership?')
                  }
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-[#C0824B] to-[#8C5234] hover:from-[#B0743E] hover:to-[#7B462C] text-white transition-all shadow-xs flex items-center gap-1 border border-[#D89B66]/40"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                  Analyze in Chat
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Overdue Items Banner */}
        {brief.overdueActions.length > 0 && (
          <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-2xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#991B1B] font-bold text-sm">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                <span>OVERDUE COMMITMENTS ({brief.overdueActions.length})</span>
              </div>
              <span className="text-xs text-[#B91C1C] font-medium">
                Grounded in message history
              </span>
            </div>

            <div className="space-y-2">
              {brief.overdueActions.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#FFFFFF] p-3.5 rounded-xl border border-[#FECACA] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="font-semibold text-sm text-[#2A1816]">
                      {item.canonicalTitle}
                    </div>
                    <div className="text-xs text-[#73584E] mt-0.5">
                      Promised to <strong className="text-[#2A1816]">{item.counterparty}</strong> · Originally due {item.resolvedDeadlineLabel}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onSelectAction(item)}
                      className="px-3 py-1 text-xs font-medium bg-[#FFF5F5] hover:bg-[#FEE2E2] text-[#991B1B] border border-[#FECACA] rounded-lg transition-colors"
                    >
                      Audit Trail
                    </button>
                    <button
                      onClick={() =>
                        onAskAgentAbout(`What did I promise ${item.counterparty?.split(' ')[0]}?`)
                      }
                      className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-[#C0824B] to-[#8C5234] text-white hover:from-[#B0743E] hover:to-[#7B462C] rounded-lg transition-colors flex items-center gap-1 shadow-xs border border-[#D89B66]/30"
                    >
                      <Sparkles className="w-3 h-3 text-amber-200" />
                      Ask Agent
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Two-Column Brief Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Today's Action Items & Upcoming */}
        <div className="space-y-6">
          <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#E6DDD3] shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0EAE1]">
              <h3 className="font-bold text-sm text-[#2A1816] flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#C0824B]" />
                Actions Due Today ({brief.todayActions.length})
              </h3>
              <span className="text-xs text-[#8C5234] font-medium">
                {brief.referenceDayName}
              </span>
            </div>

            {brief.todayActions.length === 0 ? (
              <p className="text-xs text-[#8C776D] py-3 italic">
                No active commitments strictly due on this selected day.
              </p>
            ) : (
              <div className="space-y-3">
                {brief.todayActions.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl border border-[#ECE2D8] bg-[#FAF7F2] hover:bg-[#F5EFE8] transition-colors space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-semibold text-xs text-[#2A1816]">
                          {item.canonicalTitle}
                        </div>
                        <div className="text-[11px] text-[#73584E] mt-0.5">
                          Owner: <strong className="text-[#2A1816]">{item.owner}</strong> · {item.resolvedDeadlineLabel}
                        </div>
                      </div>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[#F0E6DB] text-[#8C5234] border border-[#DFCFC0]">
                        Due Today
                      </span>
                    </div>
                    <p className="text-xs text-[#5A453D] leading-relaxed">{item.summary}</p>
                    <div className="pt-2 flex items-center justify-between text-xs">
                      <span className="text-[#8C776D] text-[11px]">
                        {item.citations.length} Source Citations
                      </span>
                      <button
                        onClick={() => onSelectAction(item)}
                        className="text-[#8C5234] hover:text-[#C0824B] font-medium flex items-center gap-1"
                      >
                        Evidence <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recommended Grounded Follow-Ups */}
          <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#E6DDD3] shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-[#2A1816] flex items-center gap-2 pb-3 border-b border-[#F0EAE1]">
              <Sparkles className="w-4 h-4 text-[#C0824B]" />
              Recommended Follow-Ups Grounded in Data
            </h3>

            <div className="space-y-3">
              {brief.recommendedFollowUps.map((rec, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl border border-[#ECE2D8] bg-[#FAF7F2] space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-[#2A1816]">
                      {rec.title}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        rec.urgency === 'HIGH'
                          ? 'bg-[#FEE2E2] text-[#991B1B] border border-[#FECACA]'
                          : 'bg-[#F0EAE1] text-[#8C5234] border border-[#DFCFC0]'
                      }`}
                    >
                      {rec.urgency}
                    </span>
                  </div>
                  <p className="text-xs text-[#5A453D] leading-relaxed">
                    {rec.description}
                  </p>
                  {rec.targetPerson && (
                    <div className="text-[11px] text-[#8C5234] font-medium">
                      Target: {rec.targetPerson}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Delegated (Waiting on Others) & Completed */}
        <div className="space-y-6">
          {/* Waiting on Others Section */}
          <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#E6DDD3] shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0EAE1]">
              <h3 className="font-bold text-sm text-[#2A1816] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C0824B]" />
                Delegated / Waiting on Others
              </h3>
              <button
                onClick={() => onAskAgentAbout('What am I waiting on?')}
                className="text-xs text-[#8C5234] hover:text-[#C0824B] font-medium flex items-center gap-1"
              >
                Ask Agent <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-3">
              {brief.waitingOnOthersActions.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl border border-[#ECE2D8] bg-[#FAF7F2] space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-[#2A1816]">
                      {item.canonicalTitle}
                    </span>
                    <span className="text-[10px] bg-[#F0E6DB] text-[#8C5234] border border-[#DFCFC0] font-semibold px-2 py-0.5 rounded-md">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#5A453D]">
                    Assigned to: <strong className="text-[#2A1816]">{item.owner}</strong> · Target: {item.resolvedDeadlineLabel}
                  </p>
                  <p className="text-xs text-[#8C776D] italic">
                    {item.statusJustification}
                  </p>
                  <div className="text-right">
                    <button
                      onClick={() => onSelectAction(item)}
                      className="text-xs text-[#8C5234] hover:text-[#C0824B] font-medium"
                    >
                      View Source Evidence →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Completed Commitments */}
          <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#E6DDD3] shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0EAE1]">
              <h3 className="font-bold text-sm text-[#2A1816] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Verified Completed Commitments ({brief.completedActions.length})
              </h3>
              <button
                onClick={() => onAskAgentAbout('Show completed commitments')}
                className="text-xs text-[#8C5234] hover:text-[#C0824B] font-medium flex items-center gap-1"
              >
                Summary <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-2.5">
              {brief.completedActions.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl border border-[#ECE2D8] bg-[#FAF7F2] flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="font-medium text-[#8C776D] line-through">
                      {item.canonicalTitle}
                    </div>
                    <div className="text-[11px] text-[#A69588]">
                      Completed: {item.completedAt || item.resolvedDeadlineLabel} · Owner: {item.owner}
                    </div>
                  </div>
                  <button
                    onClick={() => onSelectAction(item)}
                    className="text-[11px] text-[#5A453D] hover:text-[#2A1816] bg-[#FFFFFF] hover:bg-[#F0EAE1] border border-[#DFCFC0] px-2 py-1 rounded-md font-medium transition-colors"
                  >
                    Evidence
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
