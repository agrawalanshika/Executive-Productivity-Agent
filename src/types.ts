export type SourceType = 'meeting' | 'calendar' | 'email' | 'voice_note';

export type OwnershipType = 'MY_ACTION' | 'WAITING_ON_OTHERS' | 'UNCLEAR';

export type ActionStatus = 'OPEN' | 'DUE_TODAY' | 'OVERDUE' | 'COMPLETED' | 'UNCLEAR';

export type PriorityLevel = 'URGENT' | 'HIGH' | 'MEDIUM' | 'LOW';

export interface Person {
  name: string;
  role: string;
  email: string;
  isUser: boolean;
  avatarColor: string;
}

export interface SourceCitation {
  id: string;
  sourceType: SourceType;
  title: string;
  timestamp: string;
  author: string;
  recipient?: string;
  snippet: string;
  quote: string;
  urlRef?: string;
}

export interface ActionItem {
  id: string;
  canonicalTitle: string;
  summary: string;
  owner: string;
  ownershipType: OwnershipType;
  counterparty?: string;
  assignedBy?: string;
  originalDeadlineText: string;
  resolvedDeadlineDate: string; // YYYY-MM-DD or specific time
  resolvedDeadlineLabel: string;
  status: ActionStatus;
  statusJustification: string;
  completedAt?: string;
  citations: SourceCitation[];
  deduplicationHistory: {
    sourceCount: number;
    timeline: { date: string; source: string; update: string }[];
  };
  unclearReason?: string;
  priority: PriorityLevel;
  category: 'OPERATIONS' | 'MARKETING' | 'FINANCE' | 'CLIENT' | 'FACILITIES';
  suggestedAction: string;
}

export interface DailyBriefData {
  referenceDate: string; // YYYY-MM-DD
  referenceDayName: string;
  headline: string;
  summary: string;
  stats: {
    totalActions: number;
    myOpenActions: number;
    waitingOnOthers: number;
    unclearOwnership: number;
    dueToday: number;
    overdue: number;
    completed: number;
  };
  todayActions: ActionItem[];
  overdueActions: ActionItem[];
  upcomingDeadlines: ActionItem[];
  waitingOnOthersActions: ActionItem[];
  unclearOwnershipActions: ActionItem[];
  completedActions: ActionItem[];
  recommendedFollowUps: {
    title: string;
    description: string;
    urgency: 'HIGH' | 'MEDIUM';
    targetPerson?: string;
  }[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
  citations?: SourceCitation[];
  referencedActionIds?: string[];
  isFallback?: boolean;
  modelUsed?: string;
}

export interface EmailMessage {
  id: string;
  threadId: string;
  threadSubject: string;
  indexInThread: number;
  dateStr: string;
  from: string;
  to: string;
  body: string;
}

export interface CalendarEvent {
  id: string;
  personName: string;
  dayDate: string;
  time: string;
  event: string;
}

export interface MeetingTranscript {
  title: string;
  dateTime: string;
  attendees: string[];
  dialogue: { speaker: string; text: string }[];
}

export interface VoiceNote {
  id: string;
  title: string;
  recordedTime: string;
  speaker: string;
  context: string;
  transcript: string;
}
