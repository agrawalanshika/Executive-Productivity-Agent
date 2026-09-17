import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Sidebar, NavTab } from './components/Sidebar';
import { DailyBriefView } from './components/DailyBriefView';
import { ActionListView } from './components/ActionListView';
import { AgentChatView } from './components/AgentChatView';
import { SourcesView } from './components/SourcesView';
import { EvidenceModal } from './components/EvidenceModal';
import { calculateActionsForDate, generateDailyBrief } from './data/agentEngine';
import { ActionItem } from './types';

export const App: React.FC = () => {
  const [referenceDate, setReferenceDate] = useState<string>('current');
  const [activeTab, setActiveTab] = useState<NavTab>('daily-brief');
  const [selectedActionForEvidence, setSelectedActionForEvidence] =
    useState<ActionItem | null>(null);
  const [chatInitialQuestion, setChatInitialQuestion] = useState<
    string | undefined
  >(undefined);

  // Compute reactive states based on selected reference date
  const calculatedActions = useMemo(() => {
    return calculateActionsForDate(referenceDate);
  }, [referenceDate]);

  const dailyBrief = useMemo(() => {
    return generateDailyBrief(referenceDate);
  }, [referenceDate]);

  const counts = useMemo(() => {
    const total = calculatedActions.length;
    const myOpen = calculatedActions.filter(
      (a) => a.ownershipType === 'MY_ACTION' && a.status !== 'COMPLETED'
    ).length;
    const waiting = calculatedActions.filter(
      (a) => a.ownershipType === 'WAITING_ON_OTHERS' && a.status !== 'COMPLETED'
    ).length;
    const unclear = calculatedActions.filter(
      (a) => a.ownershipType === 'UNCLEAR'
    ).length;
    const completed = calculatedActions.filter(
      (a) => a.status === 'COMPLETED'
    ).length;
    const overdue = calculatedActions.filter(
      (a) => a.status === 'OVERDUE'
    ).length;

    return { total, myOpen, waiting, unclear, completed, overdue };
  }, [calculatedActions]);

  const handleAskAgentAbout = (question: string) => {
    setChatInitialQuestion(question);
    setActiveTab('ask-agent');
  };

  const handleSelectActionById = (actionId: string) => {
    const act = calculatedActions.find((a) => a.id === actionId);
    if (act) {
      setSelectedActionForEvidence(act);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F5F0] text-[#2A1816] flex flex-col font-sans antialiased selection:bg-[#C0824B]/20 selection:text-[#2A1816]">
      {/* Top Header */}
      <Header
        referenceDate={referenceDate}
        onSelectReferenceDate={setReferenceDate}
        unclearCount={counts.unclear}
        overdueCount={counts.overdue}
        onNavigateToUnclear={() => setActiveTab('unclear-ownership')}
        onOpenChat={() => {
          setChatInitialQuestion(undefined);
          setActiveTab('ask-agent');
        }}
      />

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={(tab) => {
            if (tab === 'ask-agent') {
              setChatInitialQuestion(undefined);
            }
            setActiveTab(tab);
          }}
          counts={counts}
        />

        {/* Dynamic Center Stage */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-6xl mx-auto">
            {activeTab === 'daily-brief' && (
              <DailyBriefView
                brief={dailyBrief}
                onSelectAction={setSelectedActionForEvidence}
                onAskAgentAbout={handleAskAgentAbout}
                onNavigateToTab={setActiveTab}
              />
            )}

            {activeTab === 'all-actions' && (
              <ActionListView
                actions={calculatedActions}
                defaultOwnershipFilter="ALL"
                onSelectAction={setSelectedActionForEvidence}
                title="All Tracked Commitments & Actions"
                subtitle="Comprehensive inventory of commitments deduplicated across all channels"
              />
            )}

            {activeTab === 'my-commitments' && (
              <ActionListView
                actions={calculatedActions}
                defaultOwnershipFilter="MY_ACTION"
                onSelectAction={setSelectedActionForEvidence}
                title="My Actions (Arjun Malhotra)"
                subtitle="Direct personal deliverables and outbound commitments"
              />
            )}

            {activeTab === 'waiting-on-others' && (
              <ActionListView
                actions={calculatedActions}
                defaultOwnershipFilter="WAITING_ON_OTHERS"
                onSelectAction={setSelectedActionForEvidence}
                title="Waiting on Others"
                subtitle="Deliverables and reports owned by colleagues or external partners"
              />
            )}

            {activeTab === 'unclear-ownership' && (
              <ActionListView
                actions={calculatedActions}
                defaultOwnershipFilter="UNCLEAR"
                onSelectAction={setSelectedActionForEvidence}
                title="Unclear Ownership Alerts"
                subtitle="Items with unconfirmed owners strictly flagged to prevent organizational failure"
              />
            )}

            {activeTab === 'ask-agent' && (
              <AgentChatView
                initialQuestion={chatInitialQuestion}
                onConsumedInitialQuestion={() => setChatInitialQuestion(undefined)}
                referenceDate={referenceDate}
                onSelectActionById={handleSelectActionById}
                allActions={calculatedActions}
              />
            )}

            {activeTab === 'sources' && <SourcesView />}
          </div>
        </main>
      </div>

      {/* Audit Evidence Modal */}
      <EvidenceModal
        action={selectedActionForEvidence}
        onClose={() => setSelectedActionForEvidence(null)}
      />
    </div>
  );
};

export default App;
