
import React, { useEffect, useMemo, useState } from "react";
import { syncLeetCodeStats, fetchUserReflectionJournal } from "../api";
import { LeetCodeStats, SolvedProblemHistory, UserProfile, UserStats } from "../types";
import { SkillHeatmap } from "../components/SkillHeatmap";
import { UserStatsDashboard } from "../components/UserStatsDashboard";
import { TrophyCase } from "../components/TrophyCase";

export const Profile = ({ user, stats, onSync }: { user: UserProfile; stats: LeetCodeStats | null; onSync: (stats: LeetCodeStats) => void }) => {
  const [loading, setLoading] = useState(!stats);
  const [activeTab, setActiveTab] = useState<'overview' | 'journal'>('overview');
  const [journal, setJournal] = useState<SolvedProblemHistory[]>([]);
  const [journalLoading, setJournalLoading] = useState(false);

    // Derive dashboard-friendly stats from LeetCode stats; fallback to simple defaults
    const derivedStats: UserStats | null = useMemo(() => {
        if (!stats) return null;

        const totalSolved = stats.totalSolved || 0;
        const topicsFlat = stats.topicSkills.flatMap((c) => c.topics) || [];
        const maxSolved = Math.max(150, ...topicsFlat.map((t) => t.solved || 0));
        const skillRadar = topicsFlat.slice(0, 6).map((t) => ({
            subject: t.name,
            A: t.solved,
            fullMark: maxSolved,
        }));

        const weakest = [...topicsFlat]
            .sort((a, b) => (a.solved || 0) - (b.solved || 0))
            .slice(0, 2)
            .map((t) => t.name);

        // Build a lightweight reputation trend using total solved as a proxy
        const monthly = 5;
        const step = Math.max(5, Math.floor(totalSolved / monthly));
        const reputationHistory = Array.from({ length: monthly }, (_, idx) => ({
            date: `M${idx + 1}`,
            score: step * (idx + 1),
        }));

        return {
            topicsLearned: topicsFlat.length,
            totalSolved,
            totalAttempted: Math.max(totalSolved, Math.round(totalSolved * 1.15)),
            accuracyRate: totalSolved > 0 ? 80 + Math.min(15, totalSolved / 50) : 78,
            weakAreas: weakest,
            streakDays: 7,
            reputationHistory,
            skillRadar,
        };
    }, [stats]);

    useEffect(() => {
        if (!stats) {
            const fetchStats = async () => {
                const data = await syncLeetCodeStats("alexdev_leetcode");
                onSync(data);
                setLoading(false);
            };
            fetchStats();
        } else {
            setLoading(false);
        }
    }, [stats, onSync]);

  useEffect(() => {
    if (activeTab === 'journal') {
        const fetchJournal = async () => {
            setJournalLoading(true);
            const data = await fetchUserReflectionJournal();
            setJournal(data);
            setJournalLoading(false);
        };
        fetchJournal();
    }
  }, [activeTab]);

  const groupedJournal = journal.reduce((acc, problem) => {
    if (!acc[problem.topicName]) acc[problem.topicName] = [];
    acc[problem.topicName].push(problem);
    return acc;
  }, {} as Record<string, SolvedProblemHistory[]>);

  return (
    <div className="p-8 lg:p-12 overflow-y-auto h-[calc(100vh-80px)]">
      <div className="max-w-6xl mx-auto space-y-12 pb-20">
        
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
          </div>
          <div className="px-8 pb-8 relative">
            <div className="flex flex-col sm:flex-row items-end sm:items-center -mt-12 mb-6 gap-6">
                            <img
                                src={user.photoURL || `https://api.dicebear.com/7.x/identicon/svg?seed=${user.uid}`}
                                alt="Profile"
                                className="w-24 h-24 rounded-full border-4 border-white shadow-lg bg-white"
                            />
              <div className="flex-1">
                                <h1 className="text-2xl font-bold text-slate-900">{user.displayName}</h1>
                                <p className="text-slate-500 font-medium">{user.targetRole} • {user.preferredLanguage} Enthusiast</p>
              </div>
            </div>

            <div className="border-b border-slate-100 flex gap-8">
                <button 
                    onClick={() => setActiveTab('overview')}
                    className={`pb-4 text-sm font-bold uppercase tracking-wider transition-all border-b-2 ${activeTab === 'overview' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                >
                    Performance Overview
                </button>
                <button 
                    onClick={() => setActiveTab('journal')}
                    className={`pb-4 text-sm font-bold uppercase tracking-wider transition-all border-b-2 ${activeTab === 'journal' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                >
                    Mastery Journal
                </button>
            </div>
          </div>
        </div>

        {activeTab === 'overview' ? (
            <>
                {/* Visual Stats Dashboard */}
                                <div>
                                        <div className="flex items-center gap-3 mb-6">
                                                <div className="w-8 h-8 rounded-lg bg-slate-800 text-blue-400 flex items-center justify-center">
                                                        <i className="fa-solid fa-chart-line"></i>
                                                </div>
                                                <h2 className="text-2xl font-bold text-slate-900">Performance Analytics</h2>
                                        </div>
                                        {derivedStats ? (
                                            <UserStatsDashboard stats={derivedStats} />
                                        ) : (
                                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-slate-500">
                                                Fetching your stats...
                                            </div>
                                        )}
                                </div>

                {/* Trophy Case */}
                <TrophyCase earnedBadgeIds={user.badges} />

                {/* Detailed Breakdown */}
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                            <i className="fa-solid fa-list-check"></i>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">Skill Breakdown</h2>
                    </div>
                    {loading ? (
                        <div className="bg-white p-12 rounded-2xl border border-slate-200 flex flex-col items-center justify-center">
                            <i className="fa-solid fa-spinner fa-spin text-3xl text-blue-500 mb-4"></i>
                            <p className="text-slate-500 font-medium">Syncing profile data...</p>
                        </div>
                    ) : (
                        stats && <SkillHeatmap stats={stats} />
                    )}
                </div>
            </>
        ) : (
            <div className="space-y-12">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
                        <i className="fa-solid fa-book-bookmark"></i>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">Learning Journal</h2>
                </div>

                {journalLoading ? (
                    <div className="grid grid-cols-1 gap-6 animate-pulse">
                        {[1, 2].map(i => (
                            <div key={i} className="h-40 bg-slate-100 rounded-2xl border border-slate-200"></div>
                        ))}
                    </div>
                ) : Object.keys(groupedJournal).length > 0 ? (
                    <div className="space-y-10">
                        {Object.entries(groupedJournal).map(([topic, problems]: [string, SolvedProblemHistory[]]) => (
                            <div key={topic} className="space-y-4">
                                <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-2">{topic}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {problems.map(prob => (
                                        <div key={prob.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col hover:border-indigo-300 transition-all">
                                            <div className="flex justify-between items-start mb-4">
                                                <h4 className="font-bold text-slate-900">{prob.problemTitle}</h4>
                                                <span className="text-[10px] text-slate-400 font-bold">{new Date(prob.completedAt).toLocaleDateString()}</span>
                                            </div>
                                            
                                            <div className="space-y-4 flex-1">
                                                {prob.reflections.map((ref, idx) => (
                                                    <div key={idx} className="bg-slate-50 rounded-xl p-4 border border-slate-100 text-sm">
                                                        <p className="text-indigo-600 font-bold mb-1 flex items-center gap-1.5">
                                                            <i className="fa-solid fa-sparkles text-[10px]"></i> AI Question
                                                        </p>
                                                        <p className="text-slate-700 italic mb-3">"{ref.aiQuestion}"</p>
                                                        
                                                        <p className="text-slate-400 font-bold mb-1 uppercase text-[9px]">Your Reflection</p>
                                                        <p className="text-slate-800 leading-relaxed">{ref.userAnswer}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-300">
                         <i className="fa-solid fa-pencil text-slate-200 text-5xl mb-4"></i>
                         <p className="text-slate-500 font-medium">Your journal is empty. Solve problems to see reflections here!</p>
                    </div>
                )}
            </div>
        )}
      </div>
    </div>
  );
};
