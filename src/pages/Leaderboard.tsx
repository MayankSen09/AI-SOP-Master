import React from 'react';
import { Trophy, Star, Medal, Target, Zap, Crown } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { useGamification } from '../context/GamificationContext';

export const Leaderboard: React.FC = () => {
    const { points, level, achievements, challenges } = useGamification();

    const leaderboardData = [
        { id: 1, name: 'Sarah Connor', points: 15400, avatar: '👩‍🎤', role: 'Marketing Lead' },
        { id: 2, name: 'John Smith', points: 12350, avatar: '👨‍💻', role: 'Content Creator' },
        { id: 3, name: 'You', points: points, avatar: '😎', role: 'Strategist' },
        { id: 4, name: 'Emily Chen', points: 9800, avatar: '👩‍🎨', role: 'Designer' },
    ].sort((a, b) => b.points - a.points);

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
            {/* Header Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-0">
                    <div className="p-2">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-indigo-100 font-medium">Your Level</p>
                                <h2 className="text-4xl font-bold mt-1">{level}</h2>
                            </div>
                            <div className="p-3 bg-white/10 rounded-lg">
                                <Crown className="w-8 h-8 text-yellow-300" />
                            </div>
                        </div>
                        <div className="w-full bg-black/20 rounded-full h-2 mb-2">
                            <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                        <p className="text-sm text-indigo-100">next level in {level * 1000 - points % 1000} pts</p>
                    </div>
                </Card>

                <Card className="flex flex-col justify-center">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-yellow-50 rounded-full">
                            <Zap className="w-8 h-8 text-yellow-500" />
                        </div>
                        <div>
                            <p className="text-slate-500 font-medium">Total Points</p>
                            <h2 className="text-3xl font-bold text-slate-900">{points.toLocaleString()}</h2>
                        </div>
                    </div>
                </Card>

                <Card className="flex flex-col justify-center">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-emerald-50 rounded-full">
                            <Trophy className="w-8 h-8 text-emerald-500" />
                        </div>
                        <div>
                            <p className="text-slate-500 font-medium">Badges Earned</p>
                            <h2 className="text-3xl font-bold text-slate-900">{achievements.length}</h2>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Challenges Column */}
                <div className="lg:col-span-2 space-y-6">
                    <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <Target className="w-6 h-6 text-red-500" /> Active Challenges
                    </h3>
                    <div className="grid gap-4">
                        {challenges.map(challenge => (
                            <Card key={challenge.id} className="flex items-center justify-between p-6 hover:shadow-md transition-shadow">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h4 className="font-bold text-lg text-slate-800">{challenge.title}</h4>
                                        <span className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded">+ {challenge.reward_points} pts</span>
                                    </div>
                                    <p className="text-slate-600 text-sm mb-3">{challenge.description}</p>
                                    <div className="w-full bg-slate-100 rounded-full h-2 max-w-md">
                                        <div
                                            className={`h-2 rounded-full ${challenge.completed ? 'bg-emerald-500' : 'bg-indigo-500'}`}
                                            style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-xs text-slate-400 mt-1">{challenge.progress} / {challenge.total} completed</p>
                                </div>
                                <div>
                                    {challenge.completed ? (
                                        <div className="p-2 bg-emerald-100 rounded-full text-emerald-600">
                                            <CheckCircle className="w-6 h-6" />
                                        </div>
                                    ) : (
                                        <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50">
                                            View
                                        </button>
                                    )}
                                </div>
                            </Card>
                        ))}
                    </div>

                    <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 mt-8">
                        <Medal className="w-6 h-6 text-yellow-500" /> Recent Achievements
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {achievements.map(ach => (
                            <Card key={ach.id} className="text-center p-6 bg-slate-50/50">
                                <div className="text-4xl mb-3">{ach.icon}</div>
                                <h4 className="font-bold text-slate-800">{ach.name}</h4>
                                <p className="text-xs text-slate-500 mt-1">{ach.description}</p>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Leaderboard Column */}
                <div className="space-y-6">
                    <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <Star className="w-6 h-6 text-orange-500" /> Team Leaderboard
                    </h3>
                    <Card className="p-0 overflow-hidden">
                        {leaderboardData.map((user, idx) => (
                            <div
                                key={user.id}
                                className={`flex items-center p-4 border-b border-slate-100 last:border-0 ${user.name === 'You' ? 'bg-indigo-50/50' : 'bg-white'}`}
                            >
                                <div className="w-8 text-center font-bold text-slate-400 text-lg mr-2">
                                    {idx + 1}
                                </div>
                                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-xl mr-3 shadow-inner">
                                    {user.avatar}
                                </div>
                                <div className="flex-1">
                                    <h4 className={`font-bold ${user.name === 'You' ? 'text-indigo-900' : 'text-slate-800'}`}>
                                        {user.name}
                                    </h4>
                                    <p className="text-xs text-slate-500">{user.role}</p>
                                </div>
                                <div className="font-mono font-bold text-indigo-600">
                                    {user.points.toLocaleString()}
                                </div>
                            </div>
                        ))}
                    </Card>
                </div>
            </div>
        </div>
    );
};

const CheckCircle = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
);

export default Leaderboard;
