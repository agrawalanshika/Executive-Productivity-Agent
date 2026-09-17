import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Bot,
  User,
  Quote,
  ShieldCheck,
  RotateCcw,
  ChevronRight,
} from 'lucide-react';
import { ChatMessage, ActionItem } from '../types';
import { FormattedText } from './FormattedText';

interface AgentChatViewProps {
  initialQuestion?: string;
  onConsumedInitialQuestion?: () => void;
  referenceDate: string;
  onSelectActionById: (actionId: string) => void;
  allActions: ActionItem[];
}

export const AgentChatView: React.FC<AgentChatViewProps> = ({
  initialQuestion,
  onConsumedInitialQuestion,
  referenceDate,
  onSelectActionById,
  allActions,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'agent',
      text: `Hello Arjun. I am your **Executive Productivity Agent** for the week of September 21–25, 2026.

I analyze your meetings, emails, calendars, and voice notes with **strict grounding** in your source data. I will never invent ownership or guess deadlines.

Try asking one of the suggested questions below, or ask any specific question about your commitments, deliverables, or counterparties:`,
      timestamp: 'Just now',
      modelUsed: 'Executive AI Engine',
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const isSendingRef = useRef(false);
  const lastHandledInitialQuestionRef = useRef<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sampleQuestions = [
    'What did I promise Raghav?',
    'What needs action today?',
    'What am I waiting on?',
    'Which items have unclear ownership?',
    'What deadlines are coming up?',
    'Show completed commitments.',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (
      initialQuestion &&
      initialQuestion.trim() &&
      lastHandledInitialQuestionRef.current !== initialQuestion
    ) {
      lastHandledInitialQuestionRef.current = initialQuestion;
      onConsumedInitialQuestion?.();
      handleSend(initialQuestion);
    }
  }, [initialQuestion]);

  const getEngineLabel = (model?: string) => {
    if (!model) return 'Authoritative Grounded Engine';
    if (model.includes('3.8-flash')) return 'Gemini 3.8 Flash (Live AI)';
    if (model.includes('3.1-flash')) return 'Gemini 3.1 Flash Lite (Live AI)';
    if (model.includes('deterministic') || model.includes('grounded')) return 'Authoritative Grounded Engine';
    return model;
  };

  const handleSend = async (queryText?: string) => {
    const textToSend = (queryText || input).trim();
    if (!textToSend || isSendingRef.current) return;

    isSendingRef.current = true;
    setIsLoading(true);
    setInput('');

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => {
      // Guard against accidental duplicate user bubbles
      const last = prev[prev.length - 1];
      if (last && last.sender === 'user' && last.text === textToSend) {
        return prev;
      }
      return [...prev, userMsg];
    });

    try {
      // Fetch with single retry if needed
      let response: Response | null = null;
      for (let i = 0; i < 2; i++) {
        try {
          response = await fetch('/api/ask', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              query: textToSend,
              referenceDate,
            }),
          });
          if (response.ok) break;
        } catch {
          if (i === 0) await new Promise((r) => setTimeout(r, 600));
        }
      }

      if (!response || !response.ok) {
        throw new Error(`Server response error: ${response?.status || 'Network error'}`);
      }

      const data = await response.json();

      const agentMsg: ChatMessage = {
        id: `agent-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        sender: 'agent',
        text: data.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations: data.citations || [],
        referencedActionIds: data.referencedActionIds || [],
        isFallback: data.isFallback,
        modelUsed: data.modelUsed,
      };

      setMessages((prev) => [...prev, agentMsg]);
    } catch {
      const errorMsg: ChatMessage = {
        id: `agent-err-${Date.now()}`,
        sender: 'agent',
        text: `The AI inference service is momentarily busy. Please select one of the suggested grounded queries or ask again in a moment.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isFallback: true,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
      isSendingRef.current = false;
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'agent',
        text: `Chat reset. Ask me anything about your commitments, deadlines, or unclear items for September 21–25, 2026.`,
        timestamp: 'Just now',
        modelUsed: 'Executive AI Engine',
      },
    ]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-[#FFFFFF] rounded-2xl border border-[#E6DDD3] shadow-xs overflow-hidden">
      {/* Chat Header */}
      <div className="px-6 py-3.5 border-b border-[#E6DDD3] bg-[#FAF7F2] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#C0824B] to-[#8C5234] text-white flex items-center justify-center shadow-xs border border-[#D89B66]/30">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#2A1816] flex items-center gap-2">
              <span>Executive AI Assistant</span>
              <span className="text-[10px] bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" /> Grounded in Source Pack
              </span>
            </h3>
            <p className="text-[11px] text-[#8C5234]">
              Active Reference Date: <strong className="text-[#2A1816]">{referenceDate === 'current' ? 'Friday 25 Sep (Week Overview)' : referenceDate}</strong>
            </p>
          </div>
        </div>

        <button
          onClick={handleResetChat}
          title="Reset conversation"
          className="text-xs text-[#73584E] hover:text-[#2A1816] flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-[#EAE0D5] transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#C0824B]" />
          <span>Reset</span>
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#FAF7F2]">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-3xl ${isUser ? 'ml-auto flex-row-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                  isUser
                    ? 'bg-gradient-to-r from-[#C0824B] to-[#8C5234] text-white shadow-xs'
                    : 'bg-[#F0EAE1] text-[#8C5234] border border-[#DFCFC0]'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-[#8C5234]" />}
              </div>

              <div className="space-y-2 flex-1">
                <div
                  className={`p-4 rounded-2xl text-xs leading-relaxed space-y-2.5 shadow-xs ${
                    isUser
                      ? 'bg-gradient-to-r from-[#C0824B] to-[#8C5234] text-white rounded-tr-xs'
                      : 'bg-[#FFFFFF] text-[#2A1816] border border-[#E6DDD3] rounded-tl-xs'
                  }`}
                >
                  <FormattedText text={msg.text} inverted={isUser} />

                  {/* Model & Source Attribution */}
                  {!isUser && msg.modelUsed && (
                    <div className="pt-2 border-t border-[#F0EAE1] flex items-center justify-between text-[10px] text-[#8C776D]">
                      <span className="font-medium text-[#8C5234]">Engine: {getEngineLabel(msg.modelUsed)}</span>
                      <span className="text-[#8C776D]">{msg.timestamp}</span>
                    </div>
                  )}
                </div>

                {/* Grounded Source Citations */}
                {!isUser && msg.citations && msg.citations.length > 0 && (
                  <div className="bg-[#FFFFFF] p-3 rounded-xl border border-[#E6DDD3] shadow-xs space-y-2">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#8C5234] flex items-center gap-1">
                      <Quote className="w-3 h-3 text-[#C0824B]" />
                      Verified Source Citations ({msg.citations.length})
                    </div>

                    <div className="space-y-1.5">
                      {msg.citations.slice(0, 3).map((cit) => (
                        <div
                          key={cit.id}
                          className="bg-[#FAF7F2] p-2.5 rounded-lg text-[11px] text-[#5A453D] space-y-1 border border-[#E6DDD3]"
                        >
                          <div className="font-semibold text-[#2A1816] flex items-center justify-between">
                            <span>{cit.title}</span>
                            <span className="text-[#8C5234] text-[10px]">{cit.timestamp}</span>
                          </div>
                          <div className="italic text-[#5A453D] text-[11px] bg-[#FFFFFF] p-2 rounded-lg border border-[#E6DDD3] leading-relaxed">
                            {cit.quote}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Referenced Action Item Links */}
                {!isUser && msg.referencedActionIds && msg.referencedActionIds.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {msg.referencedActionIds.map((actId) => {
                      const act = allActions.find((a) => a.id === actId);
                      if (!act) return null;
                      return (
                        <button
                          key={actId}
                          onClick={() => onSelectActionById(actId)}
                          className="text-[11px] px-2.5 py-1 rounded-lg bg-[#FFFFFF] hover:bg-[#F0EAE1] text-[#2A1816] font-medium border border-[#DFCFC0] flex items-center gap-1 transition-colors shadow-xs"
                        >
                          <span>{act.canonicalTitle}</span>
                          <ChevronRight className="w-3 h-3 text-[#8C5234]" />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-3 max-w-2xl">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#C0824B] to-[#8C5234] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Bot className="w-4 h-4 animate-pulse text-white" />
            </div>
            <div className="bg-[#FFFFFF] p-4 rounded-2xl rounded-tl-xs border border-[#E6DDD3] shadow-xs text-xs text-[#8C5234] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C0824B] animate-ping" />
              <span>Synthesizing answer against the assignment data pack...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Questions */}
      <div className="px-6 py-2.5 bg-[#FAF7F2] border-t border-[#E6DDD3]">
        <div className="text-[10px] font-bold uppercase tracking-wider text-[#8C5234] mb-1.5">
          Suggested Demo Questions
        </div>
        <div className="flex flex-wrap gap-1.5">
          {sampleQuestions.map((q, idx) => (
            <button
              key={idx}
              id={`quick-query-${idx}`}
              onClick={() => {
                if (!isLoading && !isSendingRef.current) {
                  handleSend(q);
                }
              }}
              disabled={isLoading}
              className="text-[11px] px-2.5 py-1 rounded-lg bg-[#FFFFFF] hover:bg-[#F0EAE1] text-[#5A453D] hover:text-[#2A1816] font-medium border border-[#E0D7CD] transition-colors shadow-xs"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <div className="p-4 border-t border-[#E6DDD3] bg-[#FFFFFF]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!isLoading && !isSendingRef.current && input.trim()) {
              handleSend();
            }
          }}
          className="flex items-center gap-2"
        >
          <input
            id="agent-chat-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about commitments, dates, owners, or counterparties..."
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 text-xs rounded-xl border border-[#E0D7CD] focus:outline-hidden focus:ring-2 focus:ring-[#C0824B] bg-[#FAF7F2] text-[#2A1816] placeholder:text-[#9C8B7F] focus:bg-[#FFFFFF] transition-all"
          />
          <button
            id="agent-send-query-btn"
            type="submit"
            disabled={!input.trim() || isLoading}
            className="px-4 py-2.5 bg-gradient-to-r from-[#C0824B] to-[#8C5234] hover:from-[#B0743E] hover:to-[#7B462C] disabled:opacity-40 text-white rounded-xl font-medium text-xs flex items-center gap-1.5 transition-all shadow-xs border border-[#D89B66]/30"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
