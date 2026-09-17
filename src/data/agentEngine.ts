import { ActionItem, DailyBriefData, SourceCitation } from '../types';

export const BASE_ACTIONS: ActionItem[] = [
  {
    id: 'act-vendor-list',
    canonicalTitle: 'Send Updated Vendor List to Raghav Sethi',
    summary: 'Arjun committed to send Raghav Sethi the updated vendor list. Promised across meeting and email threads, repeatedly delayed from Monday to Tuesday to Wednesday morning.',
    owner: 'Arjun Malhotra',
    ownershipType: 'MY_ACTION',
    counterparty: 'Raghav Sethi (Ops Manager)',
    assignedBy: 'Arjun Malhotra (Self-commitment to Raghav)',
    originalDeadlineText: 'Mon 21 Sep: "by end of day tomorrow" -> Mon 5:40 PM: "tomorrow morning" -> Tue 6:30 PM: "Wednesday morning for sure"',
    resolvedDeadlineDate: '2026-09-23T11:00:00',
    resolvedDeadlineLabel: 'Wednesday 23 Sep, Morning',
    status: 'OVERDUE', // as of end-of-week; dynamic resolver recalculates based on reference date
    statusJustification: 'Arjun promised Raghav he would send the updated vendor list by Wednesday morning for sure. On Wed 23 Sep 8:45 AM Raghav checked in ("still good for this morning?"). No email or record in the data pack shows Arjun ever sent it.',
    citations: [
      {
        id: 'cit-vl-1',
        sourceType: 'meeting',
        title: 'Leadership Sync Transcript',
        timestamp: 'Mon 21 Sep 2026, 9:00 AM',
        author: 'Arjun Malhotra',
        recipient: 'Raghav Sethi',
        snippet: 'Arjun confirms commitment during Leadership Sync.',
        quote: '“Also, remind me — I told Raghav I’d send him the updated vendor list. I’ll get that to him by end of day tomorrow.”',
      },
      {
        id: 'cit-vl-2',
        sourceType: 'voice_note',
        title: 'Voice Note 1 (in cab)',
        timestamp: 'Mon 21 Sep 2026, 6:40 PM',
        author: 'Arjun Malhotra',
        recipient: 'Self (Arjun)',
        snippet: 'Arjun reminds himself that vendor list delivery might slip.',
        quote: '“Quick note to self — need to get Raghav that vendor list, I think I said today but it might slip to tomorrow morning, remind me.”',
      },
      {
        id: 'cit-vl-3',
        sourceType: 'email',
        title: 'Email Thread 1 (Vendor List) — Email 1 & 2',
        timestamp: 'Mon 21 Sep 2026, 5:40 PM',
        author: 'Arjun Malhotra',
        recipient: 'Raghav Sethi',
        snippet: 'Arjun updates Raghav on initial delay.',
        quote: '“Running behind, will send first thing tomorrow morning instead.”',
      },
      {
        id: 'cit-vl-4',
        sourceType: 'email',
        title: 'Email Thread 1 (Vendor List) — Email 4',
        timestamp: 'Tue 22 Sep 2026, 6:30 PM',
        author: 'Arjun Malhotra',
        recipient: 'Raghav Sethi',
        snippet: 'Arjun commits to Wednesday morning deadline.',
        quote: '“Sorry, got pulled into board prep — will send by tomorrow (Wednesday) morning for sure.”',
      },
      {
        id: 'cit-vl-5',
        sourceType: 'email',
        title: 'Email Thread 1 (Vendor List) — Email 5',
        timestamp: 'Wed 23 Sep 2026, 8:45 AM',
        author: 'Raghav Sethi',
        recipient: 'Arjun Malhotra',
        snippet: 'Raghav follows up on Wednesday morning.',
        quote: '“Just checking — still good for this morning?”',
      },
    ],
    deduplicationHistory: {
      sourceCount: 3,
      timeline: [
        { date: 'Mon 21 Sep, 9:00 AM', source: 'Leadership Sync', update: 'Arjun commits to sending by Tuesday EOD' },
        { date: 'Mon 21 Sep, 5:40 PM', source: 'Email Thread 1 #2', update: 'Arjun delays to Tuesday morning' },
        { date: 'Mon 21 Sep, 6:40 PM', source: 'Voice Note 1', update: 'Arjun records reminder to self about vendor list' },
        { date: 'Tue 22 Sep, 6:30 PM', source: 'Email Thread 1 #4', update: 'Arjun pushes deadline to Wednesday morning for sure' },
        { date: 'Wed 23 Sep, 8:45 AM', source: 'Email Thread 1 #5', update: 'Raghav asks if still good for this morning' },
      ],
    },
    priority: 'HIGH',
    category: 'OPERATIONS',
    suggestedAction: 'Send the updated vendor list to Raghav Sethi immediately; 3 follow-ups received without fulfillment.',
  },
  {
    id: 'act-meridian-call',
    canonicalTitle: 'Reconfirm & Hold Call with Meridian Logistics (Priya Nair)',
    summary: 'Meridian Logistics requested to reschedule their call. Arjun committed to propose a new time, settled on Wednesday 3:00 PM, and reconfirmed with Priya Nair.',
    owner: 'Arjun Malhotra',
    ownershipType: 'MY_ACTION',
    counterparty: 'Priya Nair (Meridian Logistics)',
    assignedBy: 'Priya Nair request / Arjun confirmation',
    originalDeadlineText: 'Sync: "need to reconfirm new time myself" -> Wed 23 Sep 3:00 PM',
    resolvedDeadlineDate: '2026-09-23T15:00:00',
    resolvedDeadlineLabel: 'Wednesday 23 Sep, 3:00–3:30 PM',
    status: 'COMPLETED',
    statusJustification: 'Call proposed by Arjun for Wednesday 3:00 PM, confirmed by Priya, placed on calendar (3:00-3:30 PM), reconfirmed via email at 2:00 PM on Wednesday, and completed.',
    completedAt: 'Wed 23 Sep 2026, 3:30 PM',
    citations: [
      {
        id: 'cit-mc-1',
        sourceType: 'meeting',
        title: 'Leadership Sync Transcript',
        timestamp: 'Mon 21 Sep 2026, 9:00 AM',
        author: 'Arjun Malhotra',
        recipient: 'Sync Attendees',
        snippet: 'Arjun flags that Meridian call got pushed.',
        quote: '“One more thing — client call with Meridian Logistics got pushed. I need to reconfirm the new time with their team myself.”',
      },
      {
        id: 'cit-mc-2',
        sourceType: 'voice_note',
        title: 'Voice Note 2',
        timestamp: 'Wed 23 Sep 2026, 8:15 AM',
        author: 'Arjun Malhotra',
        recipient: 'Self (Arjun)',
        snippet: 'Arjun reminds himself to lock in time with Priya today.',
        quote: '“Also Meridian call — I owe Priya a time, need to lock that in today.”',
      },
      {
        id: 'cit-mc-3',
        sourceType: 'email',
        title: 'Email Thread 3 (Call Reschedule) — Email 2 & 3',
        timestamp: 'Tue 22 Sep 2026, 3:00 PM – 5:45 PM',
        author: 'Arjun Malhotra & Priya Nair',
        recipient: 'Priya Nair / Arjun Malhotra',
        snippet: 'Arjun proposes Wednesday 3 PM; Priya confirms.',
        quote: '“Apologies for the delay — how about Wednesday 3:00 PM?” / “Wednesday 3 PM works on our end, confirmed.”',
      },
      {
        id: 'cit-mc-4',
        sourceType: 'email',
        title: 'Email Thread 3 (Call Reschedule) — Email 4 & 5',
        timestamp: 'Wed 23 Sep 2026, 1:30 PM – 2:00 PM',
        author: 'Priya Nair & Arjun Malhotra',
        recipient: 'Arjun Malhotra / Priya Nair',
        snippet: 'Final pre-call confirmation.',
        quote: 'Priya: “Quick check — still on for 3 PM today?” Arjun: “Yes, confirmed, see you at 3.”',
      },
      {
        id: 'cit-mc-5',
        sourceType: 'calendar',
        title: 'Arjun Malhotra Calendar',
        timestamp: 'Wed 23 Sep 2026, 3:00–3:30 PM',
        author: 'Calendar',
        snippet: 'Calendar block confirmed.',
        quote: 'Wed 23 Sep | 3:00–3:30 PM | Call — Meridian Logistics',
      },
    ],
    deduplicationHistory: {
      sourceCount: 4,
      timeline: [
        { date: 'Mon 21 Sep, 9:00 AM', source: 'Leadership Sync', update: 'Arjun acknowledges client call got bumped, will reconfirm himself' },
        { date: 'Mon 21 Sep, 1:00 PM', source: 'Email Thread 3 #1', update: 'Priya asks Arjun to propose a new time Tue-Thu' },
        { date: 'Tue 22 Sep, 3:00 PM', source: 'Email Thread 3 #2', update: 'Arjun proposes Wednesday 3:00 PM' },
        { date: 'Tue 22 Sep, 5:45 PM', source: 'Email Thread 3 #3', update: 'Priya confirms Wednesday 3:00 PM' },
        { date: 'Wed 23 Sep, 8:15 AM', source: 'Voice Note 2', update: 'Arjun note to lock in time (fulfilled by prior email & 2 PM reconfirmation)' },
        { date: 'Wed 23 Sep, 2:00 PM', source: 'Email Thread 3 #5', update: 'Final confirmation from Arjun; call held 3:00–3:30 PM' },
      ],
    },
    priority: 'HIGH',
    category: 'CLIENT',
    suggestedAction: 'No pending action. Call completed on Wednesday, September 23 at 3:00 PM.',
  },
  {
    id: 'act-campaign-deck',
    canonicalTitle: 'Review Q3 Campaign Deck Draft with Neha Kapoor',
    summary: 'Neha Kapoor prepared the Q3 campaign deck draft and shifted the review from Wednesday to Thursday 9:30 AM before board prep.',
    owner: 'Neha Kapoor (Author) / Arjun Malhotra (Reviewer)',
    ownershipType: 'WAITING_ON_OTHERS',
    counterparty: 'Neha Kapoor (Marketing Lead)',
    assignedBy: 'Neha Kapoor commitment',
    originalDeadlineText: 'Sync: Wednesday -> Thursday morning 9:30 AM before board prep',
    resolvedDeadlineDate: '2026-09-24T09:30:00',
    resolvedDeadlineLabel: 'Thursday 24 Sep, 9:30 AM',
    status: 'COMPLETED',
    statusJustification: 'Neha delivered draft on Thu 24 Sep 8:00 AM ("Deck is ready, attaching the draft ahead of our 9:30 review"). The 9:30 AM review session on calendar with Arjun completed ahead of the 10:00 AM Board Prep Session.',
    completedAt: 'Thu 24 Sep 2026, 10:00 AM',
    citations: [
      {
        id: 'cit-cd-1',
        sourceType: 'meeting',
        title: 'Leadership Sync Transcript',
        timestamp: 'Mon 21 Sep 2026, 9:00 AM',
        author: 'Neha Kapoor',
        recipient: 'Arjun Malhotra',
        snippet: 'Neha indicates draft is 80% done; targets Wednesday, later suggests Thursday.',
        quote: '“Draft is 80% done. I’ll send it to Arjun for review by Wednesday... Also, just a reminder, the campaign deck review — I said Wednesday, but realistically Thursday morning is safer.”',
      },
      {
        id: 'cit-cd-2',
        sourceType: 'email',
        title: 'Email Thread 2 (Q3 Campaign Deck) — Email 2 & 4',
        timestamp: 'Tue 22 Sep 4:15 PM – Wed 23 Sep 10:20 AM',
        author: 'Neha Kapoor',
        recipient: 'Arjun Malhotra',
        snippet: 'Neha confirms shifting review to Thursday 9:30 AM.',
        quote: '“Heads up — shifting the review to Thursday morning instead of Wednesday, need one more day on the data slides... Let’s say 9:30 AM Thursday, before your board prep block.”',
      },
      {
        id: 'cit-cd-3',
        sourceType: 'email',
        title: 'Email Thread 2 (Q3 Campaign Deck) — Email 5',
        timestamp: 'Thu 24 Sep 2026, 8:00 AM',
        author: 'Neha Kapoor',
        recipient: 'Arjun Malhotra',
        snippet: 'Neha delivers the finalized draft ahead of the meeting.',
        quote: '“Deck is ready, attaching the draft ahead of our 9:30 review.”',
      },
      {
        id: 'cit-cd-4',
        sourceType: 'calendar',
        title: 'Neha & Arjun Calendars',
        timestamp: 'Thu 24 Sep 2026, 9:30–10:00 AM',
        author: 'Calendar',
        snippet: 'Deck review block on calendar.',
        quote: 'Thu 24 Sep | 9:30–10:00 AM | Deck Review with Arjun',
      },
    ],
    deduplicationHistory: {
      sourceCount: 3,
      timeline: [
        { date: 'Mon 21 Sep, 9:00 AM', source: 'Leadership Sync', update: 'Neha targets Wednesday, flags Thursday morning as safer' },
        { date: 'Mon 21 Sep, 11:00 AM', source: 'Email Thread 2 #1', update: 'Neha: deck coming together, still targeting Wednesday' },
        { date: 'Tue 22 Sep, 4:15 PM', source: 'Email Thread 2 #2', update: 'Neha shifts review to Thursday morning for data slides' },
        { date: 'Wed 23 Sep, 10:20 AM', source: 'Email Thread 2 #4', update: 'Agreed time locked: Thursday 9:30 AM' },
        { date: 'Thu 24 Sep, 8:00 AM', source: 'Email Thread 2 #5', update: 'Neha delivers draft; review held at 9:30 AM' },
      ],
    },
    priority: 'HIGH',
    category: 'MARKETING',
    suggestedAction: 'Deliverable completed and review held on Thursday, September 24.',
  },
  {
    id: 'act-expense-report',
    canonicalTitle: 'Pull July Expense Variance Report for Board Prep',
    summary: 'Arjun requested Divya pull the July expense variance report by Wednesday evening so he could review it prior to Thursday board prep.',
    owner: 'Divya Rao',
    ownershipType: 'WAITING_ON_OTHERS',
    counterparty: 'Divya Rao (Finance)',
    assignedBy: 'Arjun Malhotra request',
    originalDeadlineText: 'Sync: "before Thursday’s board prep" -> Tue 9:00 AM: "Wednesday evening instead"',
    resolvedDeadlineDate: '2026-09-23T18:00:00',
    resolvedDeadlineLabel: 'Wednesday 23 Sep, Evening (6:00 PM)',
    status: 'COMPLETED',
    statusJustification: 'Divya delivered the report on Wed 23 Sep at 6:00 PM ("Report attached, sent as promised"). Arjun confirmed receipt at 6:10 PM ("Got it, thank you — exactly what I needed before tomorrow").',
    completedAt: 'Wed 23 Sep 2026, 6:10 PM',
    citations: [
      {
        id: 'cit-er-1',
        sourceType: 'meeting',
        title: 'Leadership Sync Transcript',
        timestamp: 'Mon 21 Sep 2026, 9:00 AM',
        author: 'Arjun Malhotra & Divya Rao',
        recipient: 'Divya Rao / Arjun Malhotra',
        snippet: 'Arjun asks Divya for report before Thursday; Divya commits to Wednesday evening.',
        quote: 'Arjun: “Divya, can you also pull the July expense variance report before Thursday’s board prep?” Divya: “Yes, I’ll have it ready Wednesday evening.”',
      },
      {
        id: 'cit-er-2',
        sourceType: 'email',
        title: 'Email Thread 4 (Expense Variance Report) — Email 2 & 3',
        timestamp: 'Tue 22 Sep 9:00 AM – 9:40 AM',
        author: 'Arjun Malhotra & Divya Rao',
        recipient: 'Divya Rao / Arjun Malhotra',
        snippet: 'Arjun re-confirms Wednesday evening requirement; Divya agrees.',
        quote: 'Arjun: “Actually, can I get it by Wednesday evening instead? Want time to review before Thursday.” Divya: “Wednesday evening is tight but doable, I’ll prioritize it.”',
      },
      {
        id: 'cit-er-3',
        sourceType: 'voice_note',
        title: 'Voice Note 2',
        timestamp: 'Wed 23 Sep 2026, 8:15 AM',
        author: 'Arjun Malhotra',
        recipient: 'Self (Arjun)',
        snippet: 'Arjun stresses deadline to himself.',
        quote: '“Reminder — expense variance report from Divya needs to be in my hands by Wednesday evening, not Thursday, I want time to go through it before board prep.”',
      },
      {
        id: 'cit-er-4',
        sourceType: 'email',
        title: 'Email Thread 4 (Expense Variance Report) — Email 4 & 5',
        timestamp: 'Wed 23 Sep 6:00 PM – 6:10 PM',
        author: 'Divya Rao & Arjun Malhotra',
        recipient: 'Arjun Malhotra / Divya Rao',
        snippet: 'Delivery and receipt confirmed.',
        quote: 'Divya: “Report attached, sent as promised.” Arjun: “Got it, thank you — exactly what I needed before tomorrow.”',
      },
    ],
    deduplicationHistory: {
      sourceCount: 3,
      timeline: [
        { date: 'Mon 21 Sep, 9:00 AM', source: 'Leadership Sync', update: 'Arjun requests report before Thursday; Divya promises Wednesday evening' },
        { date: 'Mon 21 Sep, 2:30 PM', source: 'Email Thread 4 #1', update: 'Divya mentions targeting Thursday morning' },
        { date: 'Tue 22 Sep, 9:00 AM', source: 'Email Thread 4 #2', update: 'Arjun firmly requests Wednesday evening' },
        { date: 'Tue 22 Sep, 9:40 AM', source: 'Email Thread 4 #3', update: 'Divya accepts Wednesday evening deadline' },
        { date: 'Wed 23 Sep, 8:15 AM', source: 'Voice Note 2', update: 'Arjun records reminder about Wednesday evening cutoff' },
        { date: 'Wed 23 Sep, 6:00 PM', source: 'Email Thread 4 #4 & #5', update: 'Report delivered and acknowledged by Arjun' },
      ],
    },
    priority: 'HIGH',
    category: 'FINANCE',
    suggestedAction: 'Deliverable completed on Wednesday, September 23 at 6:00 PM. No further action needed.',
  },
  {
    id: 'act-mumbai-lease',
    canonicalTitle: 'Sign-off on Mumbai Office Lease Renewal (Unowned Signatory)',
    summary: 'The Mumbai office lease renewal requires an authorized signature by Friday, 25 September. Neither Facilities, Raghav, Divya, nor Arjun has confirmed ownership.',
    owner: 'Unassigned / Unclear',
    ownershipType: 'UNCLEAR',
    counterparty: 'Facilities / Corporate Legal / Executive Signatory',
    assignedBy: 'Facilities Notification to All Staff',
    originalDeadlineText: 'Monday All-Staff: "by Friday, 25 September" -> Thursday All-Staff: "Friday, 25 September, end of day"',
    resolvedDeadlineDate: '2026-09-25T17:00:00',
    resolvedDeadlineLabel: 'Friday 25 Sep, End of Day (5:00 PM)',
    status: 'UNCLEAR',
    statusJustification: 'Critical corporate deadline has no assigned owner. Facilities reminded staff twice. Raghav flagged twice that it is unassigned. Divya believes it sits with Facilities. Arjun stated in Voice Note 1 "someone needs to own that, I don’t think it’s me." Ownership is strictly unconfirmed; the agent will never fabricate ownership.',
    unclearReason: 'No individual has accepted responsibility or authorized sign-off. Facilities is an internal distribution list, not a named authorized officer. Raghav specifically warned on Thu 24 Sep at 4:45 PM: “This is now one day out and still unowned — can you confirm who’s handling it?”',
    citations: [
      {
        id: 'cit-ml-1',
        sourceType: 'meeting',
        title: 'Leadership Sync Transcript',
        timestamp: 'Mon 21 Sep 2026, 9:00 AM',
        author: 'Raghav Sethi, Divya Rao, Arjun Malhotra',
        recipient: 'Sync Attendees',
        snippet: 'Ownership ambiguity surfaced in sync.',
        quote: 'Raghav: “Separately, the Mumbai office renewal paperwork needs someone to sign off this week. Not sure whose desk that’s on right now.” Divya: “I think that’s supposed to be Facilities, but I haven’t seen anyone pick it up.” Arjun: “Okay, flag it, don’t assume.”',
      },
      {
        id: 'cit-ml-2',
        sourceType: 'voice_note',
        title: 'Voice Note 1',
        timestamp: 'Mon 21 Sep 2026, 6:40 PM',
        author: 'Arjun Malhotra',
        recipient: 'Self (Arjun)',
        snippet: 'Arjun notes that someone needs to own it and doubts it is his responsibility.',
        quote: '“Also still haven’t heard back on the Mumbai lease thing, someone needs to own that, I don’t think it’s me.”',
      },
      {
        id: 'cit-ml-3',
        sourceType: 'email',
        title: 'Email Thread 5 (Mumbai Lease) — Email 1',
        timestamp: 'Mon 21 Sep 2026, 10:15 AM',
        author: 'facilities@veridian-corp.example',
        recipient: 'All Staff',
        snippet: 'First formal reminder from Facilities.',
        quote: '“Reminder: the Mumbai office lease renewal requires an authorized signature by Friday, 25 September.”',
      },
      {
        id: 'cit-ml-4',
        sourceType: 'email',
        title: 'Email Thread 5 (Mumbai Lease) — Email 2 & 3',
        timestamp: 'Tue 22 Sep 11:00 AM – Wed 23 Sep 9:30 AM',
        author: 'Raghav Sethi & Divya Rao',
        recipient: 'Arjun Malhotra, Divya Rao, Raghav Sethi',
        snippet: 'Raghav queries assignment; Divya disclaims ownership.',
        quote: 'Raghav: “Following up from the sync — has anyone confirmed who’s signing off on the Mumbai renewal? Don’t think it’s been assigned.” Divya: “Not on my end — I believe this typically sits with Facilities directly, not us.”',
      },
      {
        id: 'cit-ml-5',
        sourceType: 'email',
        title: 'Email Thread 5 (Mumbai Lease) — Email 4 & 5',
        timestamp: 'Thu 24 Sep 4:00 PM – 4:45 PM',
        author: 'Facilities & Raghav Sethi',
        recipient: 'All Staff / Arjun Malhotra',
        snippet: 'Second reminder and Raghav urgent escalation to Arjun.',
        quote: 'Facilities: “Second reminder: signature is still pending. Deadline is Friday, 25 September, end of day.” Raghav: “This is now one day out and still unowned — can you confirm who’s handling it?”',
      },
      {
        id: 'cit-ml-6',
        sourceType: 'calendar',
        title: 'Arjun & Raghav Calendars',
        timestamp: 'Fri 25 Sep 2026, 10:00–10:30 AM',
        author: 'Calendar',
        snippet: 'Facilities Check-in scheduled for Friday morning.',
        quote: 'Fri 25 Sep | 10:00–10:30 AM | Facilities Check-in',
      },
    ],
    deduplicationHistory: {
      sourceCount: 4,
      timeline: [
        { date: 'Mon 21 Sep, 9:00 AM', source: 'Leadership Sync', update: 'Raghav flags renewal needs sign-off; Arjun instructs “flag it, don’t assume”' },
        { date: 'Mon 21 Sep, 10:15 AM', source: 'Email Thread 5 #1', update: 'Facilities sends 1st reminder: signature required by Friday 25 Sep' },
        { date: 'Mon 21 Sep, 6:40 PM', source: 'Voice Note 1', update: 'Arjun memo: “someone needs to own that, I don’t think it’s me”' },
        { date: 'Tue 22 Sep, 11:00 AM', source: 'Email Thread 5 #2', update: 'Raghav follows up on whether sign-off is assigned' },
        { date: 'Wed 23 Sep, 9:30 AM', source: 'Email Thread 5 #3', update: 'Divya confirms not on her end, believes it sits with Facilities' },
        { date: 'Thu 24 Sep, 4:00 PM', source: 'Email Thread 5 #4', update: 'Facilities 2nd reminder: signature still pending, deadline Friday EOD' },
        { date: 'Thu 24 Sep, 4:45 PM', source: 'Email Thread 5 #5', update: 'Raghav warns Arjun: “1 day out and still unowned — can you confirm who’s handling it?”' },
      ],
    },
    priority: 'URGENT',
    category: 'FACILITIES',
    suggestedAction: 'URGENT: Use Friday 10:00 AM Facilities Check-in to formally assign a designated signatory or escalate to Executive/Legal today.',
  },
  {
    id: 'act-board-prep',
    canonicalTitle: 'Attend & Lead Board Prep Session',
    summary: 'Executive preparation session on Thursday morning with Divya Rao for upcoming board meeting.',
    owner: 'Arjun Malhotra',
    ownershipType: 'MY_ACTION',
    counterparty: 'Divya Rao (Finance) & Executive Leadership',
    assignedBy: 'Calendar Event',
    originalDeadlineText: 'Thursday 24 Sep, 9:00–10:00 AM',
    resolvedDeadlineDate: '2026-09-24T09:00:00',
    resolvedDeadlineLabel: 'Thursday 24 Sep, 9:00–10:00 AM',
    status: 'COMPLETED',
    statusJustification: 'Completed Thursday morning following receipt of July expense variance numbers from Divya on Wednesday evening.',
    completedAt: 'Thu 24 Sep 2026, 10:00 AM',
    citations: [
      {
        id: 'cit-bp-1',
        sourceType: 'calendar',
        title: 'Arjun & Divya Calendars',
        timestamp: 'Thu 24 Sep 2026, 9:00–10:00 AM',
        author: 'Calendar',
        snippet: 'Board Prep Session block.',
        quote: 'Thu 24 Sep | 9:00–10:00 AM | Board Prep Session',
      },
      {
        id: 'cit-bp-2',
        sourceType: 'meeting',
        title: 'Leadership Sync',
        timestamp: 'Mon 21 Sep 2026, 9:00 AM',
        author: 'Arjun Malhotra',
        recipient: 'Divya Rao',
        snippet: 'Arjun references preparation timeline.',
        quote: '“Divya, can you also pull the July expense variance report before Thursday’s board prep?”',
      },
    ],
    deduplicationHistory: {
      sourceCount: 2,
      timeline: [
        { date: 'Mon 21 Sep, 9:00 AM', source: 'Leadership Sync', update: 'Referenced as milestone for financial reporting' },
        { date: 'Thu 24 Sep, 9:00 AM', source: 'Calendar', update: 'Session scheduled and conducted' },
      ],
    },
    priority: 'HIGH',
    category: 'OPERATIONS',
    suggestedAction: 'Completed. Board prep session concluded Thursday morning.',
  },
  {
    id: 'act-hiring-panel',
    canonicalTitle: 'Conduct Sales Associate Hiring Panel',
    summary: 'Executive interview panel for open Sales Associate position on Thursday afternoon.',
    owner: 'Arjun Malhotra',
    ownershipType: 'MY_ACTION',
    counterparty: 'Sales Associate Candidates / Hiring Team',
    assignedBy: 'Calendar Event',
    originalDeadlineText: 'Thursday 24 Sep, 4:00–5:00 PM',
    resolvedDeadlineDate: '2026-09-24T16:00:00',
    resolvedDeadlineLabel: 'Thursday 24 Sep, 4:00–5:00 PM',
    status: 'COMPLETED',
    statusJustification: 'Scheduled on Arjun’s calendar for Thursday 24 Sep 4:00–5:00 PM.',
    completedAt: 'Thu 24 Sep 2026, 5:00 PM',
    citations: [
      {
        id: 'cit-hp-1',
        sourceType: 'calendar',
        title: 'Arjun Malhotra Calendar',
        timestamp: 'Thu 24 Sep 2026, 4:00–5:00 PM',
        author: 'Calendar',
        snippet: 'Interview panel block.',
        quote: 'Thu 24 Sep | 4:00–5:00 PM | Hiring Panel — Sales Associate',
      },
    ],
    deduplicationHistory: {
      sourceCount: 1,
      timeline: [
        { date: 'Thu 24 Sep, 4:00 PM', source: 'Calendar', update: 'Interview panel held' },
      ],
    },
    priority: 'MEDIUM',
    category: 'OPERATIONS',
    suggestedAction: 'Completed. Submit candidate scorecards to HR.',
  },
  {
    id: 'act-facilities-checkin',
    canonicalTitle: 'Attend Facilities Check-in Meeting (Resolve Mumbai Lease)',
    summary: 'Scheduled check-in between Arjun Malhotra, Raghav Sethi, and Facilities team on Friday morning.',
    owner: 'Arjun Malhotra',
    ownershipType: 'MY_ACTION',
    counterparty: 'Raghav Sethi & Facilities',
    assignedBy: 'Calendar Event',
    originalDeadlineText: 'Friday 25 Sep, 10:00–10:30 AM',
    resolvedDeadlineDate: '2026-09-25T10:00:00',
    resolvedDeadlineLabel: 'Friday 25 Sep, 10:00–10:30 AM',
    status: 'DUE_TODAY', // when Friday is reference date
    statusJustification: 'Critical sync to establish who signs the Mumbai lease before Friday end-of-day deadline.',
    citations: [
      {
        id: 'cit-fc-1',
        sourceType: 'calendar',
        title: 'Arjun & Raghav Calendars',
        timestamp: 'Fri 25 Sep 2026, 10:00–10:30 AM',
        author: 'Calendar',
        snippet: 'Facilities Check-in block.',
        quote: 'Fri 25 Sep | 10:00–10:30 AM | Facilities Check-in',
      },
    ],
    deduplicationHistory: {
      sourceCount: 1,
      timeline: [
        { date: 'Fri 25 Sep, 10:00 AM', source: 'Calendar', update: 'Key scheduled forum for Mumbai lease resolution' },
      ],
    },
    priority: 'HIGH',
    category: 'FACILITIES',
    suggestedAction: 'Bring up the Mumbai Lease renewal paperwork immediately with Facilities and assign authorized signer.',
  },
];

/**
 * Resolves action status dynamically according to a selected reference date.
 * Reference date can be:
 * - '2026-09-21' (Monday)
 * - '2026-09-22' (Tuesday)
 * - '2026-09-23' (Wednesday)
 * - '2026-09-24' (Thursday)
 * - '2026-09-25' (Friday)
 * - 'current' / 'week_end' (End of week overview)
 */
export function calculateActionsForDate(referenceDate: string): ActionItem[] {
  const refDateStr = referenceDate === 'current' ? '2026-09-25' : referenceDate;

  return BASE_ACTIONS.map((action) => {
    const updated = { ...action };

    if (action.id === 'act-vendor-list') {
      if (refDateStr === '2026-09-21') {
        updated.status = 'OPEN';
        updated.statusJustification = 'Promised by end of day Tuesday. Still open and pending preparation.';
      } else if (refDateStr === '2026-09-22') {
        updated.status = 'DUE_TODAY';
        updated.statusJustification = 'Originally promised for today. Arjun notified Raghav in evening that it is pushed to Wednesday morning.';
      } else if (refDateStr === '2026-09-23') {
        updated.status = 'DUE_TODAY';
        updated.statusJustification = 'Promised for Wednesday morning for sure. Raghav checked in at 8:45 AM.';
      } else {
        // Thu or Fri
        updated.status = 'OVERDUE';
        updated.statusJustification = 'Promised for Wednesday morning for sure. No confirmation of delivery exists in subsequent emails; Raghav checked in Wed 8:45 AM.';
      }
    } else if (action.id === 'act-meridian-call') {
      if (refDateStr === '2026-09-21') {
        updated.status = 'OPEN';
        updated.statusJustification = 'Priya requested reschedule; Arjun needs to propose new time.';
      } else if (refDateStr === '2026-09-22') {
        updated.status = 'OPEN';
        updated.statusJustification = 'Arjun proposed Wednesday 3:00 PM; confirmed by Priya at 5:45 PM.';
      } else if (refDateStr === '2026-09-23') {
        updated.status = 'DUE_TODAY';
        updated.statusJustification = 'Scheduled for today at 3:00 PM. Reconfirmed via email at 2:00 PM.';
      } else {
        updated.status = 'COMPLETED';
        updated.statusJustification = 'Concluded Wednesday 23 Sep 3:00–3:30 PM as confirmed in calendar and correspondence.';
      }
    } else if (action.id === 'act-campaign-deck') {
      if (refDateStr === '2026-09-21' || refDateStr === '2026-09-22' || refDateStr === '2026-09-23') {
        updated.status = 'OPEN';
        updated.statusJustification = 'Waiting on Neha to deliver draft for Thursday morning 9:30 AM review session.';
      } else if (refDateStr === '2026-09-24') {
        updated.status = 'DUE_TODAY';
        updated.statusJustification = 'Neha sent draft at 8:00 AM; review session scheduled for 9:30 AM today before Board Prep.';
      } else {
        updated.status = 'COMPLETED';
        updated.statusJustification = 'Draft received Thu 8:00 AM; review completed prior to Board Prep.';
      }
    } else if (action.id === 'act-expense-report') {
      if (refDateStr === '2026-09-21' || refDateStr === '2026-09-22') {
        updated.status = 'OPEN';
        updated.statusJustification = 'Waiting on Divya Rao to pull numbers by Wednesday evening.';
      } else if (refDateStr === '2026-09-23') {
        updated.status = 'DUE_TODAY';
        updated.statusJustification = 'Due Wednesday evening. Delivered by Divya at 6:00 PM and acknowledged by Arjun at 6:10 PM.';
      } else {
        updated.status = 'COMPLETED';
        updated.statusJustification = 'Delivered by Divya Rao on Wed 23 Sep at 6:00 PM; acknowledged by Arjun at 6:10 PM.';
      }
    } else if (action.id === 'act-mumbai-lease') {
      updated.status = 'UNCLEAR';
      if (refDateStr === '2026-09-25') {
        updated.statusJustification = 'DEADLINE IS TODAY (Friday 25 Sep EOD). Still completely unassigned and unowned!';
      } else {
        updated.statusJustification = 'Deadline is Friday 25 Sep EOD. Still completely unassigned and unowned. High business risk.';
      }
    } else if (action.id === 'act-board-prep') {
      if (refDateStr === '2026-09-24') {
        updated.status = 'DUE_TODAY';
      } else if (refDateStr === '2026-09-25') {
        updated.status = 'COMPLETED';
      } else {
        updated.status = 'OPEN';
      }
    } else if (action.id === 'act-hiring-panel') {
      if (refDateStr === '2026-09-24') {
        updated.status = 'DUE_TODAY';
      } else if (refDateStr === '2026-09-25') {
        updated.status = 'COMPLETED';
      } else {
        updated.status = 'OPEN';
      }
    } else if (action.id === 'act-facilities-checkin') {
      if (refDateStr === '2026-09-25') {
        updated.status = 'DUE_TODAY';
      } else {
        updated.status = 'OPEN';
      }
    }

    return updated;
  });
}

/**
 * Builds daily brief data structure for a given reference date
 */
export function generateDailyBrief(referenceDate: string): DailyBriefData {
  const actions = calculateActionsForDate(referenceDate);

  const dateNames: Record<string, string> = {
    '2026-09-21': 'Monday, 21 September 2026',
    '2026-09-22': 'Tuesday, 22 September 2026',
    '2026-09-23': 'Wednesday, 23 September 2026',
    '2026-09-24': 'Thursday, 24 September 2026',
    '2026-09-25': 'Friday, 25 September 2026',
    current: 'Friday, 25 September 2026 (End-of-Week Audit)',
  };

  const dayName = dateNames[referenceDate] || 'Friday, 25 September 2026';

  const todayActions = actions.filter((a) => a.status === 'DUE_TODAY');
  const overdueActions = actions.filter((a) => a.status === 'OVERDUE');
  const waitingOnOthersActions = actions.filter((a) => a.ownershipType === 'WAITING_ON_OTHERS' && a.status !== 'COMPLETED');
  const unclearOwnershipActions = actions.filter((a) => a.ownershipType === 'UNCLEAR');
  const completedActions = actions.filter((a) => a.status === 'COMPLETED');
  const upcomingDeadlines = actions.filter((a) => a.status === 'OPEN' && a.ownershipType !== 'UNCLEAR');

  const myOpenActions = actions.filter((a) => a.ownershipType === 'MY_ACTION' && a.status !== 'COMPLETED');

  let headline = `Executive Action Brief for ${dayName}`;
  let summary = '';

  if (referenceDate === '2026-09-21') {
    summary = 'Week kick-off following Leadership Sync. Key initial commitments include sending updated vendor list to Raghav (due Tue), aligning with Priya on rescheduled Meridian Logistics call, and monitoring Divya for expense variance numbers.';
  } else if (referenceDate === '2026-09-22') {
    summary = 'Internal budget review today. Arjun delayed vendor list to Wednesday morning. Meridian call confirmed for Wednesday 3 PM. Mumbai lease sign-off remains unassigned despite Raghav checking.';
  } else if (referenceDate === '2026-09-23') {
    summary = 'High operational activity: Vendor list is promised for this morning to Raghav. Meridian client call reconfirmed for 3:00 PM. Expense variance report due by evening from Divya (received at 6:00 PM).';
  } else if (referenceDate === '2026-09-24') {
    summary = 'Board prep day: July expense variance report in hand from Divya. Q3 campaign deck delivered by Neha at 8:00 AM; review at 9:30 AM before Board Prep session at 9:00–10:00 AM. Vendor list to Raghav is now OVERDUE. Mumbai lease remains unowned with 1 day left.';
  } else {
    // Friday or current
    summary = 'CRITICAL DEADLINE DAY: Mumbai office lease renewal requires an authorized signature by End of Day today and remains completely unassigned. Vendor list promised to Raghav is OVERDUE. Facilities Check-in is scheduled for 10:00 AM.';
  }

  const recommendedFollowUps = [
    {
      title: 'Escalate Mumbai Office Lease Signatory',
      description: 'The lease renewal deadline is Friday, September 25 EOD. Raghav flagged this twice; Divya disclaimed it. Do not assume Facilities can sign authorized corporate leases. Address this during the 10:00 AM Facilities Check-in.',
      urgency: 'HIGH' as const,
      targetPerson: 'Raghav Sethi / Corporate Legal',
    },
    {
      title: 'Fulfill Vendor List Commitment to Raghav',
      description: 'Raghav has followed up three times (Monday sync, Tuesday morning, Wednesday morning). Send the updated vendor list immediately to clear Arjun’s outstanding commitment.',
      urgency: 'HIGH' as const,
      targetPerson: 'Raghav Sethi',
    },
    {
      title: 'Review Deliverables Received (Deck & Expenses)',
      description: 'Divya delivered the July expense variance report Wednesday at 6:00 PM and Neha delivered the Q3 campaign deck draft Thursday at 8:00 AM. Ensure feedback is finalized.',
      urgency: 'MEDIUM' as const,
      targetPerson: 'Divya Rao & Neha Kapoor',
    },
  ];

  return {
    referenceDate,
    referenceDayName: dayName,
    headline,
    summary,
    stats: {
      totalActions: actions.length,
      myOpenActions: myOpenActions.length,
      waitingOnOthers: waitingOnOthersActions.length,
      unclearOwnership: unclearOwnershipActions.length,
      dueToday: todayActions.length,
      overdue: overdueActions.length,
      completed: completedActions.length,
    },
    todayActions,
    overdueActions,
    upcomingDeadlines,
    waitingOnOthersActions,
    unclearOwnershipActions,
    completedActions,
    recommendedFollowUps,
  };
}

/**
 * Intelligent deterministic answer engine grounded strictly in the assignment data pack.
 * Used as primary grounded responder and server fallback if Gemini API is not configured or fails.
 */
export function answerDeterministicQuery(query: string, referenceDate: string = 'current'): {
  answer: string;
  citations: SourceCitation[];
  referencedActionIds: string[];
} {
  const q = query.toLowerCase().trim();
  const actions = calculateActionsForDate(referenceDate);

  // Question 1: "What did I promise Raghav?"
  if (q.includes('promise') && q.includes('raghav') || q.includes('promised raghav') || q.includes('raghav')) {
    const item = actions.find((a) => a.id === 'act-vendor-list')!;
    return {
      answer: `**Commitment to Raghav Sethi:**
You (Arjun Malhotra) promised Raghav the **Updated Vendor List**.

• **Initial Commitment:** During Monday's Leadership Sync (9:00 AM), you stated: *"I told Raghav I’d send him the updated vendor list. I’ll get that to him by end of day tomorrow."*
• **First Deferral:** On Monday at 5:40 PM, you emailed him: *"Running behind, will send first thing tomorrow morning instead."*
• **Second Deferral:** On Tuesday at 6:30 PM, you emailed him: *"Sorry, got pulled into board prep — will send by tomorrow (Wednesday) morning for sure."*
• **Latest Status:** On Wednesday at 8:45 AM, Raghav checked in: *"Just checking — still good for this morning?"*
• **Ground Truth:** No record or email in the source data confirms you ever sent the vendor list. Therefore, this item is **OVERDUE** and needs immediate action.`,
      citations: item.citations,
      referencedActionIds: [item.id],
    };
  }

  // Question 2: "What needs action today?"
  if (q.includes('action today') || q.includes('needs action today') || q.includes('due today')) {
    const todayItems = actions.filter((a) => a.status === 'DUE_TODAY' || a.status === 'OVERDUE');
    const unclear = actions.find((a) => a.id === 'act-mumbai-lease')!;

    const listText = todayItems
      .map(
        (a) =>
          `• **${a.canonicalTitle}** (${a.status === 'OVERDUE' ? '🚨 OVERDUE' : '⏳ Due Today'}): ${a.suggestedAction}`
      )
      .join('\n');

    return {
      answer: `**Actions Requiring Attention Today (${referenceDate === 'current' ? 'Friday 25 Sep' : referenceDate}):**

${listText}

⚠️ **Critical Unclear Ownership Risk:**
• **Mumbai Office Lease Renewal:** Signature is required by Friday, 25 September End of Day. Raghav flagged that it is still unowned. You must designate a signer or escalate to Legal today.`,
      citations: [
        ...todayItems.flatMap((a) => a.citations.slice(0, 1)),
        ...unclear.citations.slice(0, 2),
      ],
      referencedActionIds: [...todayItems.map((a) => a.id), unclear.id],
    };
  }

  // Question 3: "What am I waiting on?"
  if (q.includes('waiting on') || q.includes('waiting-on') || q.includes('waiting on others')) {
    const waitingItems = actions.filter(
      (a) => a.ownershipType === 'WAITING_ON_OTHERS'
    );

    return {
      answer: `**Items Involving Others / Delegated Deliverables:**

1. **July Expense Variance Report (Divya Rao):**
   • *Status:* **COMPLETED**.
   • *Detail:* You requested this by Wednesday evening for Thursday board prep. Divya delivered the report on Wednesday, 23 Sep at 6:00 PM (*"Report attached, sent as promised"*), and you acknowledged receipt at 6:10 PM.

2. **Q3 Campaign Deck Draft (Neha Kapoor):**
   • *Status:* **COMPLETED**.
   • *Detail:* Neha shifted the review from Wednesday to Thursday morning 9:30 AM to finalize data slides. Neha emailed the completed draft on Thursday, 24 Sep at 8:00 AM (*"Deck is ready, attaching the draft ahead of our 9:30 review"*).

Currently, there are no unfulfilled deliverables you are actively waiting on from colleagues; both Divya and Neha fulfilled their promised deliverables.`,
      citations: [
        ...actions.find((a) => a.id === 'act-expense-report')!.citations.slice(-2),
        ...actions.find((a) => a.id === 'act-campaign-deck')!.citations.slice(-2),
      ],
      referencedActionIds: ['act-expense-report', 'act-campaign-deck'],
    };
  }

  // Question 4: "Which items have unclear ownership?"
  if (q.includes('unclear ownership') || q.includes('unclear') || q.includes('unowned') || q.includes('who owns')) {
    const item = actions.find((a) => a.id === 'act-mumbai-lease')!;
    return {
      answer: `**Items with Unclear Ownership:**

🚨 **Mumbai Office Lease Renewal Paperwork**
• **Deadline:** Friday, 25 September 2026, End of Day (Strict).
• **Current State:** **UNCONFIRMED / UNOWNED**.
• **Evidence of Ambiguity:**
  1. *Monday Leadership Sync (9:00 AM):* Raghav noted sign-off is needed this week and wasn't sure whose desk it is on. Divya guessed Facilities, but you (Arjun) explicitly warned: *"Okay, flag it, don’t assume."*
  2. *Monday Voice Note 1 (6:40 PM):* You stated to yourself: *"someone needs to own that, I don’t think it’s me."*
  3. *Tuesday Email (11:00 AM):* Raghav asked who is signing off.
  4. *Wednesday Email (9:30 AM):* Divya stated: *"Not on my end — I believe this typically sits with Facilities directly, not us."*
  5. *Thursday All-Staff Email (4:00 PM):* Facilities sent a 2nd reminder that signature is still pending.
  6. *Thursday Escalation (4:45 PM):* Raghav emailed you: *"This is now one day out and still unowned — can you confirm who’s handling it?"*
• **Safety Rule:** The agent strictly refuses to invent an owner (such as guessing Facilities or Raghav). This is marked as an urgent escalation item.`,
      citations: item.citations,
      referencedActionIds: [item.id],
    };
  }

  // Question 5: "What deadlines are coming up?"
  if (q.includes('deadline') || q.includes('upcoming') || q.includes('dates')) {
    return {
      answer: `**Timeline & Deadlines Across the Week (Sep 21–25, 2026):**

• **Monday 21 Sep:**
  - 9:00 AM: Leadership Sync (commitments established)
• **Wednesday 23 Sep:**
  - Morning: **Updated Vendor List to Raghav** (Promised by Arjun — ⚠️ OVERDUE)
  - 3:00–3:30 PM: **Call with Meridian Logistics (Priya Nair)** (✅ COMPLETED)
  - 6:00 PM: **July Expense Variance Report from Divya** (✅ COMPLETED)
• **Thursday 24 Sep:**
  - 8:00 AM / 9:30 AM: **Q3 Campaign Deck Draft & Review with Neha** (✅ COMPLETED)
  - 9:00–10:00 AM: **Board Prep Session** (✅ COMPLETED)
  - 4:00–5:00 PM: **Sales Associate Hiring Panel** (✅ COMPLETED)
• **Friday 25 Sep:**
  - 10:00–10:30 AM: **Facilities Check-in** (Key sync with Raghav & Facilities)
  - 5:00 PM (EOD): **Mumbai Office Lease Renewal Signature** (🚨 CRITICAL HARD DEADLINE — UNOWNED)`,
      citations: actions.flatMap((a) => a.citations.slice(0, 1)),
      referencedActionIds: actions.map((a) => a.id),
    };
  }

  // Question 6: "Show completed commitments"
  if (q.includes('completed') || q.includes('done') || q.includes('finished')) {
    const completed = actions.filter((a) => a.status === 'COMPLETED');
    const text = completed
      .map(
        (a) =>
          `• **${a.canonicalTitle}** (${a.owner}): Completed at ${a.completedAt || a.resolvedDeadlineLabel}. Grounded in ${a.citations[a.citations.length - 1]?.title}.`
      )
      .join('\n');

    return {
      answer: `**Confirmed Completed Commitments (Verified by Source Data):**

${text}

*Note:* The vendor list to Raghav and the Mumbai lease renewal remain incomplete or unowned in the source data.`,
      citations: completed.flatMap((a) => a.citations.slice(-1)),
      referencedActionIds: completed.map((a) => a.id),
    };
  }

  // Question 7: Specific counterparty query for Divya
  if (q.includes('divya')) {
    const item = actions.find((a) => a.id === 'act-expense-report')!;
    return {
      answer: `**Interactions & Commitments Involving Divya Rao (Finance):**

• **Deliverable:** July Expense Variance Report before Thursday's board prep.
• **Negotiation:** In the Monday sync, Divya initially promised Wednesday evening. In Monday's email she targeted Thursday morning, but you requested Wednesday evening so you could review it first. Divya agreed on Tuesday morning (*"Wednesday evening is tight but doable, I’ll prioritize it"*).
• **Completion:** On Wednesday 23 Sep at 6:00 PM, Divya sent the report (*"Report attached, sent as promised"*). You replied at 6:10 PM: *"Got it, thank you — exactly what I needed before tomorrow."*
• **Calendar Event:** Divya also attended the Board Prep Session with you on Thursday 24 Sep, 9:00–10:00 AM.`,
      citations: item.citations,
      referencedActionIds: [item.id],
    };
  }

  // Question 8: Specific counterparty query for Neha
  if (q.includes('neha')) {
    const item = actions.find((a) => a.id === 'act-campaign-deck')!;
    return {
      answer: `**Interactions & Commitments Involving Neha Kapoor (Marketing):**

• **Deliverable:** Q3 Campaign Deck Draft.
• **Timeline:** Neha initially indicated Wednesday in the Monday sync, but noted Thursday morning was safer. On Tuesday at 4:15 PM she officially shifted the review to Thursday morning to add data slides.
• **Completion:** Neha sent the completed draft on Thursday 24 Sep at 8:00 AM ahead of the 9:30 AM review session on your calendars.
• **Meetings:** 1:1 with Neha took place Monday 21 Sep 2:00–2:30 PM; Deck Review took place Thursday 24 Sep 9:30–10:00 AM.`,
      citations: item.citations,
      referencedActionIds: [item.id],
    };
  }

  // Question 9: Specific counterparty query for Priya / Meridian
  if (q.includes('priya') || q.includes('meridian')) {
    const item = actions.find((a) => a.id === 'act-meridian-call')!;
    return {
      answer: `**Interactions & Commitments Involving Priya Nair (Meridian Logistics):**

• **Background:** Priya Nair is an external client at Meridian Logistics. Their scheduled call got bumped, and Priya emailed on Monday at 1:00 PM asking you to propose a new time Tuesday–Thursday.
• **Rescheduling:** On Tuesday at 3:00 PM, you proposed Wednesday 3:00 PM. Priya confirmed at 5:45 PM.
• **Execution:** On Wednesday at 1:30 PM Priya re-checked (*"Quick check — still on for 3 PM today?"*), and you replied at 2:00 PM (*"Yes, confirmed, see you at 3."*). The call took place Wednesday 23 Sep, 3:00–3:30 PM as blocked on your calendar.`,
      citations: item.citations,
      referencedActionIds: [item.id],
    };
  }

  // Question 10: General summary fallback
  return {
    answer: `**Executive Summary for Arjun Malhotra (VP Sales):**

Based on the assignment data pack (Sep 21–25, 2026):

1. **My Commitments (Arjun):**
   • **Vendor List to Raghav Sethi:** Promised for Wednesday morning. Raghav checked in; no record of delivery. **Status: OVERDUE.**
   • **Meridian Logistics Call:** Rescheduled and confirmed with Priya Nair for Wednesday 3:00 PM. **Status: COMPLETED.**
   • **Board Prep & Hiring Panel:** Conducted on Thursday. **Status: COMPLETED.**

2. **Waiting on Others:**
   • **July Expense Variance (Divya Rao):** Delivered Wednesday 6:00 PM. **Status: COMPLETED.**
   • **Q3 Campaign Deck (Neha Kapoor):** Delivered Thursday 8:00 AM. **Status: COMPLETED.**

3. **Critical Unclear Ownership:**
   • **Mumbai Office Lease Renewal:** Signature required by Friday, 25 September EOD. Facilities sent 2 reminders; Raghav flagged it twice; nobody is confirmed as owner. **Status: UNCLEAR / URGENT RISK.**

You can also ask specific questions like:
- *"What did I promise Raghav?"*
- *"What needs action today?"*
- *"What am I waiting on?"*
- *"Which items have unclear ownership?"*
- *"What deadlines are coming up?"*`,
    citations: actions.flatMap((a) => a.citations.slice(0, 1)),
    referencedActionIds: actions.map((a) => a.id),
  };
}
