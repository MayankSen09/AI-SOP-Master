import { Users as UsersIcon, Crown, Shield, Eye, Trash2 } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { useTeam } from '../context/TeamContext';
import { useToast } from '../context/ToastContext';

export function TeamMembers() {
    const { currentTeam, getTeamMembers, removeTeamMember } = useTeam();
    const { success, warning } = useToast();

    if (!currentTeam) {
        return (
            <div className="text-center py-20">
                <p className="text-slate-500 dark:text-slate-400">Please select a team to manage members</p>
            </div>
        );
    }

    const members = getTeamMembers(currentTeam.id);

    const getRoleIcon = (role: string) => {
        switch (role) {
            case 'Owner': return <Crown className="w-4 h-4" />;
            case 'Admin': return <Shield className="w-4 h-4" />;
            case 'Editor': return <UsersIcon className="w-4 h-4" />;
            default: return <Eye className="w-4 h-4" />;
        }
    };

    const getRoleColor = (role: string) => {
        switch (role) {
            case 'Owner': return 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30';
            case 'Admin': return 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30';
            case 'Editor': return 'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30';
            default: return 'text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50';
        }
    };

    const handleRemoveMember = (memberId: string) => {
        if (confirm('Are you sure you want to remove this member?')) {
            removeTeamMember(memberId);
            warning('Team member removed');
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">Team Members</h1>
                <p className="text-slate-500 dark:text-slate-400">Manage members and permissions for {currentTeam.name}</p>
            </div>

            {/* Invite Code Card */}
            <Card title="Invite New Members">
                <div className="flex items-center justify-between p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                    <div>
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Team Invite Code</p>
                        <p className="text-2xl font-mono font-bold text-indigo-600 dark:text-indigo-400">{currentTeam.inviteCode}</p>
                    </div>
                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(currentTeam.inviteCode);
                            success('Invite code copied!');
                        }}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                    >
                        Copy Code
                    </button>
                </div>
            </Card>

            {/* Members List */}
            <Card title={`Members (${members.length})`}>
                <div className="divide-y divide-slate-200 dark:divide-slate-700">
                    {members.map(member => (
                        <div key={member.id} className="py-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold text-lg">
                                    {member.userId.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <p className="font-medium text-slate-900 dark:text-slate-100">{member.userId}</p>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Joined {new Date(member.joinedAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium ${getRoleColor(member.role)}`}>
                                    {getRoleIcon(member.role)}
                                    {member.role}
                                </div>
                                {member.role !== 'Owner' && (
                                    <button
                                        onClick={() => handleRemoveMember(member.id)}
                                        className="p-2 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}
