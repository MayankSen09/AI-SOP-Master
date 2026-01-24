import { useState } from 'react';
import { Users, Plus, LogIn, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTeam } from '../../context/TeamContext';

export function TeamSelector() {
    const { currentTeam, teams, createTeam, switchTeam, joinTeam } = useTeam();
    const [isOpen, setIsOpen] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showJoinModal, setShowJoinModal] = useState(false);
    const [newTeamName, setNewTeamName] = useState('');
    const [joinCode, setJoinCode] = useState('');
    const [copied, setCopied] = useState(false);

    const handleCreateTeam = () => {
        if (!newTeamName.trim()) return;
        createTeam(newTeamName);
        setNewTeamName('');
        setShowCreateModal(false);
    };

    const handleJoinTeam = () => {
        if (!joinCode.trim()) return;
        const success = joinTeam(joinCode.toUpperCase());
        if (success) {
            setJoinCode('');
            setShowJoinModal(false);
        } else {
            alert('Invalid invite code');
        }
    };

    const copyInviteCode = async () => {
        if (!currentTeam) return;
        await navigator.clipboard.writeText(currentTeam.inviteCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <>
            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                    <Users className="w-4 h-4" />
                    <span className="max-w-32 truncate">{currentTeam?.name || 'Select Team'}</span>
                    <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <>
                            <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 z-20 overflow-hidden"
                            >
                                {/* Team List */}
                                <div className="p-2 max-h-64 overflow-y-auto">
                                    <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase px-3 py-2">Your Teams</div>
                                    {teams.map(team => (
                                        <button
                                            key={team.id}
                                            onClick={() => {
                                                switchTeam(team.id);
                                                setIsOpen(false);
                                            }}
                                            className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${team.id === currentTeam?.id
                                                    ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                                                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                                                }`}
                                        >
                                            <div className="font-medium text-sm">{team.name}</div>
                                            <div className="text-xs text-slate-500 dark:text-slate-400">Code: {team.inviteCode}</div>
                                        </button>
                                    ))}
                                </div>

                                {/* Actions */}
                                <div className="border-t border-slate-200 dark:border-slate-700 p-2 space-y-1">
                                    <button
                                        onClick={() => {
                                            setShowCreateModal(true);
                                            setIsOpen(false);
                                        }}
                                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Create Team
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowJoinModal(true);
                                            setIsOpen(false);
                                        }}
                                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                                    >
                                        <LogIn className="w-4 h-4" />
                                        Join Team
                                    </button>
                                    {currentTeam && (
                                        <button
                                            onClick={copyInviteCode}
                                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
                                        >
                                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                            {copied ? 'Copied!' : 'Copy Invite Code'}
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>

            {/* Create Team Modal */}
            <AnimatePresence>
                {showCreateModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6"
                        >
                            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">Create New Team</h3>
                            <input
                                type="text"
                                placeholder="Team name"
                                value={newTeamName}
                                onChange={e => setNewTeamName(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleCreateTeam()}
                                className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                                autoFocus
                            />
                            <div className="flex gap-2 mt-4">
                                <button
                                    onClick={() => setShowCreateModal(false)}
                                    className="flex-1 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleCreateTeam}
                                    disabled={!newTeamName.trim()}
                                    className="flex-1 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Create
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Join Team Modal */}
            <AnimatePresence>
                {showJoinModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6"
                        >
                            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">Join Team</h3>
                            <input
                                type="text"
                                placeholder="Enter 6-digit invite code"
                                value={joinCode}
                                onChange={e => setJoinCode(e.target.value.toUpperCase().slice(0, 6))}
                                onKeyDown={e => e.key === 'Enter' && handleJoinTeam()}
                                className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-center text-2xl tracking-widest font-mono placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none uppercase"
                                maxLength={6}
                                autoFocus
                            />
                            <div className="flex gap-2 mt-4">
                                <button
                                    onClick={() => setShowJoinModal(false)}
                                    className="flex-1 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleJoinTeam}
                                    disabled={joinCode.length !== 6}
                                    className="flex-1 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Join
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
