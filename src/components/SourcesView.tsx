import React, { useState } from 'react';
import {
  FileText,
  Mail,
  Calendar,
  Mic,
  Users,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import {
  PEOPLE,
  MEETING_TRANSCRIPT,
  CALENDARS,
  EMAIL_THREADS,
  VOICE_NOTES,
  ASSUMPTIONS_AND_CONSTRAINTS,
} from '../data/assignmentData';

export const SourcesView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'transcript' | 'calendars' | 'emails' | 'voice_notes' | 'people' | 'assumptions'
  >('transcript');

  const [expandedThreads, setExpandedThreads] = useState<Record<string, boolean>>({
    'thread-1': true,
    'thread-5': true,
  });

  const toggleThread = (id: string) => {
    setExpandedThreads((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E6DDD3] shadow-xs space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C5234] bg-[#F0EAE1] px-2.5 py-1 rounded-md border border-[#DFCFC0]">
            Authoritative Raw Ground Truth
          </span>
          <span className="text-xs text-[#8C5234] font-medium">
            Week of September 21–25, 2026
          </span>
        </div>
        <h2 className="text-xl font-bold tracking-tight text-[#2A1816]">
          Sources, Inputs & Assumptions Matrix
        </h2>
        <p className="text-xs text-[#5A453D] leading-relaxed max-w-3xl">
          Inspect the full verbatim assignment data pack. Every action, commitment, deadline, and classification in the system is directly traceable to the raw records below without any invented facts.
        </p>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 pt-3 border-t border-[#E6DDD3] mt-4">
          {[
            { id: 'transcript', label: '1. Meeting Transcript', icon: FileText },
            { id: 'calendars', label: '2. Executive Calendars', icon: Calendar },
            { id: 'emails', label: '3. Email Threads ', icon: Mail },
            { id: 'voice_notes', label: '4. Voice Notes (2)', icon: Mic },
            { id: 'people', label: 'People & Directory', icon: Users },
            { id: 'assumptions', label: 'Safety Assumptions', icon: ShieldAlert },
          ].map((tab) => {
            const active = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                id={`source-tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs rounded-xl font-semibold transition-all ${
                  active
                    ? 'bg-gradient-to-r from-[#C0824B] to-[#8C5234] text-white shadow-xs border border-[#D89B66]/30'
                    : 'bg-[#FAF7F2] text-[#5A453D] hover:bg-[#F0EAE1] hover:text-[#2A1816] border border-[#E0D7CD]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${active ? 'text-white' : 'text-[#C0824B]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: Meeting Transcript */}
      {activeTab === 'transcript' && (
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#E6DDD3] p-6 shadow-xs space-y-4">
          <div className="border-b border-[#E6DDD3] pb-3">
            <h3 className="text-base font-bold text-[#2A1816]">
              {MEETING_TRANSCRIPT.title}
            </h3>
            <div className="text-xs text-[#8C5234] mt-1 flex flex-wrap items-center gap-3">
              <span>Time: <strong className="text-[#2A1816]">{MEETING_TRANSCRIPT.dateTime}</strong></span>
              <span>•</span>
              <span>Attendees: <strong className="text-[#2A1816]">{MEETING_TRANSCRIPT.attendees.join(', ')}</strong></span>
            </div>
          </div>

          <div className="space-y-3 font-mono text-xs text-[#5A453D] bg-[#FAF7F2] p-4 rounded-xl border border-[#ECE2D8]">
            {MEETING_TRANSCRIPT.dialogue.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <span className="font-bold text-[#8C5234]">{item.speaker}:</span>{' '}
                <span className="text-[#5A453D]">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Calendars */}
      {activeTab === 'calendars' && (
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#E6DDD3] p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-[#2A1816]">
            Calendars — Week of 21–25 September 2026
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['Arjun Malhotra', 'Neha Kapoor', 'Raghav Sethi', 'Divya Rao'].map((person) => {
              const events = CALENDARS.filter((c) => c.personName === person);
              return (
                <div
                  key={person}
                  className="bg-[#FAF7F2] p-4 rounded-xl border border-[#ECE2D8] space-y-2"
                >
                  <div className="font-bold text-xs text-[#2A1816] pb-2 border-b border-[#E6DDD3] flex items-center justify-between">
                    <span>{person}</span>
                    <span className="text-[10px] text-[#8C5234]">{events.length} events</span>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    {events.map((evt) => (
                      <div
                        key={evt.id}
                        className="bg-[#FFFFFF] p-2 rounded-lg border border-[#E6DDD3] flex items-center justify-between"
                      >
                        <div className="font-medium text-[#2A1816]">{evt.event}</div>
                        <div className="text-[11px] text-[#8C5234] font-mono">
                          {evt.dayDate} · {evt.time}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: Email Threads */}
      {activeTab === 'emails' && (
        <div className="space-y-4">
          <div className="bg-[#FFFFFF] p-4 rounded-2xl border border-[#E6DDD3] shadow-xs text-xs text-[#8C5234]">
            Showing all 5 email threads (5 messages each = 25 total emails) verbatim from the assignment pack.
          </div>

          {EMAIL_THREADS.map((thread) => {
            const isExpanded = expandedThreads[thread.threadId];
            return (
              <div
                key={thread.threadId}
                className="bg-[#FFFFFF] rounded-2xl border border-[#E6DDD3] shadow-xs overflow-hidden"
              >
                <div
                  onClick={() => toggleThread(thread.threadId)}
                  className="p-4 bg-[#FAF7F2] border-b border-[#E6DDD3] flex items-center justify-between cursor-pointer hover:bg-[#F0EAE1] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-sky-600" />
                    <div>
                      <h4 className="text-sm font-bold text-[#2A1816]">
                        Thread: {thread.subject}
                      </h4>
                      <span className="text-[11px] text-[#8C5234]">
                        {thread.emails.length} messages in conversation
                      </span>
                    </div>
                  </div>

                  <button className="text-[#73584E] hover:text-[#2A1816]">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>

                {isExpanded && (
                  <div className="p-4 space-y-3 bg-[#FAF7F2]">
                    {thread.emails.map((msg) => (
                      <div
                        key={msg.id}
                        className="p-3.5 rounded-xl border border-[#E6DDD3] bg-[#FFFFFF] text-xs space-y-1.5"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] text-[#73584E] pb-1 border-b border-[#F0EAE1]">
                          <div>
                            <strong className="text-[#2A1816]">From:</strong> {msg.from} → <strong className="text-[#2A1816]">To:</strong> {msg.to}
                          </div>
                          <span className="font-mono text-[#8C5234]">{msg.dateStr}</span>
                        </div>
                        <p className="text-[#5A453D] leading-relaxed font-mono">
                          {msg.body}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 4: Voice Notes */}
      {activeTab === 'voice_notes' && (
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#E6DDD3] p-6 shadow-xs space-y-4">
          <div className="border-b border-[#E6DDD3] pb-3">
            <h3 className="text-base font-bold text-[#2A1816]">
              Personal Voice Note Transcripts (2)
            </h3>
            <p className="text-xs text-[#73584E] mt-1">
              Both notes are personal voice memos recorded by Arjun Malhotra for himself — dictated reminders, not messages sent to anyone else. Treated as a source of Arjun’s commitments and open items.
            </p>
          </div>

          <div className="space-y-4">
            {VOICE_NOTES.map((vn) => (
              <div
                key={vn.id}
                className="p-5 rounded-xl border border-[#FDE68A] bg-[#FFFBEB] space-y-2 text-xs"
              >
                <div className="flex items-center justify-between font-bold text-[#2A1816] text-sm">
                  <div className="flex items-center gap-2">
                    <Mic className="w-4 h-4 text-[#B45309]" />
                    <span>{vn.title}</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#B45309]">{vn.recordedTime}</span>
                </div>

                <div className="text-[#78350F] italic text-[11px]">
                  Context: {vn.context}
                </div>

                <div className="p-3 bg-[#FFFFFF] rounded-lg border border-[#FDE68A] text-[#5A453D] font-mono leading-relaxed">
                  {vn.transcript}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: People & Directory */}
      {activeTab === 'people' && (
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#E6DDD3] p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-[#2A1816]">
            People & Email Directory
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {PEOPLE.map((p) => (
              <div
                key={p.email}
                className="p-4 rounded-xl border border-[#ECE2D8] bg-[#FAF7F2] space-y-2 text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${p.avatarColor}`}
                  >
                    {p.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-bold text-[#2A1816]">{p.name}</div>
                    <div className="text-[11px] text-[#73584E]">{p.role}</div>
                  </div>
                </div>
                <div className="pt-2 border-t border-[#E6DDD3] text-[11px] font-mono text-[#8C5234] break-all">
                  {p.email}
                </div>
                {p.isUser && (
                  <span className="inline-block text-[10px] bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0] font-bold px-2 py-0.5 rounded">
                    Agent User
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 6: Assumptions */}
      {activeTab === 'assumptions' && (
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#E6DDD3] p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-[#2A1816] flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-[#B45309]" />
            Safety Constraints & Assumptions Matrix
          </h3>

          <div className="space-y-3">
            {ASSUMPTIONS_AND_CONSTRAINTS.map((asm) => (
              <div
                key={asm.id}
                className="p-4 rounded-xl border border-[#ECE2D8] bg-[#FAF7F2] space-y-1 text-xs"
              >
                <div className="font-bold text-[#2A1816] text-sm">{asm.title}</div>
                <p className="text-[#5A453D] leading-relaxed">{asm.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
