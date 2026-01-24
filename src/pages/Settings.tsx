import { useState } from 'react';
import { Shield, Bell, Palette, User, Edit2 } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useTeam } from '../context/TeamContext';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

export function Settings() {
    const { currentTeam } = useTeam();
    const { success } = useToast();
    const { user, updateProfile } = useAuth();
    const [showEditProfile, setShowEditProfile] = useState(false);
    const [profileData, setProfileData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        avatarUrl: user?.avatarUrl || ''
    });

    if (!currentTeam || !user) {
        return (
            <div className="text-center py-20">
                <p className="text-slate-500 dark:text-slate-400">Please select a team to view settings</p>
            </div>
        );
    }

    const handleSaveProfile = () => {
        updateProfile(profileData);
        success('Profile updated successfully!');
        setShowEditProfile(false);
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Settings</h1>
                <p className="text-slate-500 dark:text-slate-400">Manage your profile, team and application preferences</p>
            </div>

            {/* Profile Settings */}
            <Card title="Profile">
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                        <div className="flex items-center gap-4">
                            <img
                                src={user.avatarUrl}
                                alt={user.name}
                                className="w-16 h-16 rounded-full border-2 border-indigo-200 dark:border-indigo-800"
                            />
                            <div>
                                <p className="font-semibold text-slate-900 dark:text-white">{user.name}</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">{user.email}</p>
                                <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-1 capitalize">{user.role}</p>
                            </div>
                        </div>
                        <Button
                            onClick={() => {
                                setProfileData({
                                    name: user.name,
                                    email: user.email,
                                    avatarUrl: user.avatarUrl || ''
                                });
                                setShowEditProfile(true);
                            }}
                            variant="secondary"
                            icon={Edit2}
                            size="sm"
                        >
                            Edit Profile
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Team Settings */}
            <Card title="Team Settings">
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                        <div className="flex items-center gap-3">
                            <Shield className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                            <div>
                                <p className="font-medium text-slate-900 dark:text-white">Team Name</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">{currentTeam.name}</p>
                            </div>
                        </div>
                        <button className="px-4 py-2 text-sm bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-lg transition-colors text-slate-700 dark:text-slate-300">
                            Edit
                        </button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                        <div className="flex items-center gap-3">
                            <Bell className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                            <div>
                                <p className="font-medium text-slate-900 dark:text-white">Notifications</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Receive updates about team activity</p>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-indigo-600"></div>
                        </label>
                    </div>
                </div>
            </Card>

            {/* Appearance */}
            <Card title="Appearance">
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                        <div className="flex items-center gap-3">
                            <Palette className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                            <div>
                                <p className="font-medium text-slate-900 dark:text-white">Dark Mode</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Toggle theme using the button in header</p>
                            </div>
                        </div>
                        <div className="text-sm text-indigo-600 dark:text-indigo-400">See header →</div>
                    </div>
                </div>
            </Card>

            {/* About */}
            <Card title="About">
                <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-500 dark:text-slate-400">Version</span>
                        <span className="font-medium text-slate-900 dark:text-white">3.1.0</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-500 dark:text-slate-400">Team ID</span>
                        <span className="font-mono text-xs text-slate-900 dark:text-white">{currentTeam.id.slice(0, 12)}...</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-500 dark:text-slate-400">Storage</span>
                        <span className="font-medium text-slate-900 dark:text-white">localStorage</span>
                    </div>
                </div>
            </Card>

            {/* Edit Profile Modal */}
            {showEditProfile && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full"
                    >
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                                    <User className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                                    Edit Profile
                                </h2>
                                <button
                                    onClick={() => setShowEditProfile(false)}
                                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                                >
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        value={profileData.name}
                                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 outline-none"
                                        placeholder="Your name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        value={profileData.email}
                                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 outline-none"
                                        placeholder="your@email.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                        Avatar URL
                                    </label>
                                    <input
                                        type="url"
                                        value={profileData.avatarUrl}
                                        onChange={(e) => setProfileData({ ...profileData, avatarUrl: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 outline-none"
                                        placeholder="https://..."
                                    />
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                                        💡 Use <a href="https://ui-avatars.com/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline">UI Avatars</a> for quick profile pictures
                                    </p>
                                </div>

                                {profileData.avatarUrl && (
                                    <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                                        <img
                                            src={profileData.avatarUrl}
                                            alt="Preview"
                                            className="w-12 h-12 rounded-full"
                                            onError={(e) => {
                                                e.currentTarget.src = 'https://ui-avatars.com/api/?name=User&background=6366f1&color=fff';
                                            }}
                                        />
                                        <span className="text-sm text-slate-600 dark:text-slate-400">Preview</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-3 mt-6">
                                <Button
                                    onClick={handleSaveProfile}
                                    variant="gradient"
                                    className="flex-1"
                                >
                                    Save Changes
                                </Button>
                                <Button
                                    onClick={() => setShowEditProfile(false)}
                                    variant="secondary"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
