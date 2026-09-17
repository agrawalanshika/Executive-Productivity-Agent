import React from 'react';
import { X, Quote, FileText, Calendar, Mail, Mic } from 'lucide-react';
import { ActionItem, SourceCitation } from '../types';

interface EvidenceModalProps {
  action: ActionItem | null;
  onClose: () => void;
}

export const EvidenceModal: React.FC<EvidenceModalProps> = ({ action, onClose }) => {
  if (!action) return null;

  const getSourceIcon = (type: SourceCitation['sourceType']) => {
    switch (type) {
      case 'meeting':
        return <FileText className="w-4 h-4 text-[#D89B66]" />;
      case 'calendar':
        return <Calendar className="w-4 h-4 text-emerald-400" />;
      case 'email':
        return <Mail className="w-4 h-4 text-sky-400" />;
      case 'voice_note':
        return <Mic className="w-4 h-4 text-[#FBBF24]" />;
      default:
        return <FileText className="w-4 h-4 text-[#BFAEA0]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2A1816]/40 backdrop-blur-xs">
      <div
        className="bg-[#FFFFFF] rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-[#E6DDD3] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E6DDD3] flex items-start justify-between bg-[#FAF7F2]">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C5234]">
              Audit Trail & Source Evidence
            </span>
            <h3 className="text-base font-semibold text-[#2A1816] mt-0.5">
              {action.canonicalTitle}
            </h3>
          </div>
          <button
            id="close-evidence-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#73584E] hover:text-[#2A1816] hover:bg-[#EAE0D5] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 bg-[#FFFFFF]">
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#FAF7F2] p-3 rounded-xl border border-[#ECE2D8] text-xs">
            <div>
              <div className="text-[#8C5234] text-[10px] uppercase font-bold">Owner</div>
              <div className="font-semibold text-[#2A1816] mt-0.5">{action.owner}</div>
            </div>
            <div>
              <div className="text-[#8C5234] text-[10px] uppercase font-bold">Classification</div>
              <div className="font-semibold text-[#2A1816] mt-0.5">{action.ownershipType}</div>
            </div>
            <div>
              <div className="text-[#8C5234] text-[10px] uppercase font-bold">Confirmed Deadline</div>
              <div className="font-semibold text-[#2A1816] mt-0.5">{action.resolvedDeadlineLabel}</div>
            </div>
            <div>
              <div className="text-[#8C5234] text-[10px] uppercase font-bold">Status</div>
              <div className="font-semibold text-[#2A1816] mt-0.5">{action.status}</div>
            </div>
          </div>

          {/* Deduplication Evolution */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C5234] mb-3 flex items-center gap-1.5">
              <span>Cross-Source Deduplication History</span>
              <span className="text-[10px] bg-[#F0EAE1] text-[#8C5234] border border-[#DFCFC0] px-2 py-0.5 rounded-full font-medium">
                {action.deduplicationHistory.timeline.length} events merged
              </span>
            </h4>
            <div className="relative pl-4 border-l-2 border-[#E6DDD3] space-y-3">
              {action.deduplicationHistory.timeline.map((item, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#C0824B] border-2 border-[#FFFFFF]" />
                  <div className="text-[11px] font-semibold text-[#2A1816]">
                    {item.date} <span className="text-[#73584E] font-normal">· {item.source}</span>
                  </div>
                  <div className="text-xs text-[#5A453D] mt-0.5">{item.update}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Citations & Exact Quotes */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C5234] mb-3">
              Verbatim Evidence Citations ({action.citations.length})
            </h4>
            <div className="space-y-3">
              {action.citations.map((citation) => (
                <div
                  key={citation.id}
                  className="bg-[#FAF7F2] p-4 rounded-xl border border-[#ECE2D8] shadow-xs space-y-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 font-semibold text-[#2A1816]">
                      {getSourceIcon(citation.sourceType)}
                      <span>{citation.title}</span>
                    </div>
                    <span className="text-[#8C776D] text-[11px]">{citation.timestamp}</span>
                  </div>

                  <div className="text-xs text-[#73584E] flex items-center gap-2">
                    <span>From: <strong className="text-[#2A1816]">{citation.author}</strong></span>
                    {citation.recipient && (
                      <span>→ To: <strong className="text-[#2A1816]">{citation.recipient}</strong></span>
                    )}
                  </div>

                  <div className="bg-[#FFFFFF] border-l-4 border-[#C0824B] p-2.5 rounded-r-lg text-xs italic text-[#5A453D] flex items-start gap-2 border-y border-r border-[#E6DDD3]">
                    <Quote className="w-3.5 h-3.5 text-[#C0824B] shrink-0 mt-0.5" />
                    <span>{citation.quote}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#E6DDD3] bg-[#FAF7F2] flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium bg-gradient-to-r from-[#C0824B] to-[#8C5234] hover:from-[#B0743E] hover:to-[#7B462C] text-white rounded-xl transition-all shadow-xs border border-[#D89B66]/30"
          >
            Close Audit View
          </button>
        </div>
      </div>
    </div>
  );
};
