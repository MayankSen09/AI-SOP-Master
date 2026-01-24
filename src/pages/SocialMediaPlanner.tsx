import { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, Sparkles, Calendar as CalendarIcon, Hash, TrendingUp, Loader2, List, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useMarketing } from '../context/MarketingContext';
import { useToast } from '../context/ToastContext';
import { PostDetailsModal } from '../components/SocialMedia/PostDetailsModal';

const PLATFORMS = [
    { id: 'facebook', name: 'Facebook', icon: '📘', color: 'bg-blue-600', maxChars: 63206 },
    { id: 'instagram', name: 'Instagram', icon: '📸', color: 'bg-pink-600', maxChars: 2200 },
    { id: 'linkedin', name: 'LinkedIn', icon: '💼', color: 'bg-blue-700', maxChars: 3000 },
    { id: 'twitter', name: 'Twitter/X', icon: '🐦', color: 'bg-slate-900', maxChars: 280 },
    { id: 'tiktok', name: 'TikTok', icon: '🎵', color: 'bg-slate-800', maxChars: 2200 },
];

export function SocialMediaPlanner() {
    const { socialPosts, createSocialPost } = useMarketing();
    const { success } = useToast();
    const [view, setView] = useState<'list' | 'calendar'>('list');
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
    const [content, setContent] = useState('');
    const [scheduledDate, setScheduledDate] = useState('');
    const [generating, setGenerating] = useState(false);
    const [topic, setTopic] = useState('');

    const togglePlatform = (platformId: string) => {
        setSelectedPlatforms(prev =>
            prev.includes(platformId) ? prev.filter(p => p !== platformId) : [...prev, platformId]
        );
    };

    const handleGenerateAI = async () => {
        if (!topic) return;
        setGenerating(true);

        await new Promise(resolve => setTimeout(resolve, 2000));

        const generatedPosts = {
            facebook: `🎯 ${topic}\n\nDiscover how our solution helps businesses like yours achieve remarkable results. Click to learn more! 💼✨\n\n#Business #Growth #Innovation`,
            instagram: `✨ ${topic}\n\nSwipe left to see how we're changing the game! 👉\n\n📸 Tag a friend who needs to see this!\n\n#inspo #businessgrowth #innovation #success`,
            linkedin: `${topic}\n\nIn today's competitive landscape, staying ahead requires innovative thinking and strategic execution.\n\nHere's what we've learned:\n• Focus on customer value\n• Iterate quickly\n• Measure what matters\n\nWhat strategies have worked for you? Share in the comments! 👇`,
            twitter: `🚀 ${topic}\n\nTransforming businesses through innovation. Learn more about our approach ⬇️\n\n#TechInnovation #BusinessGrowth`,
            tiktok: `${topic} 🎬\n\nQuick tip: Small changes lead to big results! Watch to discover our secret sauce ✨\n\n#foryou #businesstips #success`,
        };

        const firstPlatform = selectedPlatforms[0] as keyof typeof generatedPosts;
        setContent(generatedPosts[firstPlatform] || `Check out this amazing content about ${topic}! 🚀`);
        setGenerating(false);
        success('Content generated!');
    };

    const handleSchedule = () => {
        if (!content || selectedPlatforms.length === 0 || !scheduledDate) return;

        selectedPlatforms.forEach(platform => {
            createSocialPost({
                platform: platform as any,
                content,
                scheduledFor: scheduledDate,
                status: 'scheduled'
            });
        });

        success(`Scheduled for ${selectedPlatforms.length} platform(s)!`);
        setContent('');
        setSelectedPlatforms([]);
        setScheduledDate('');
    };

    const getCharLimit = () => {
        if (selectedPlatforms.length === 0) return null;
        const platform = PLATFORMS.find(p => p.id === selectedPlatforms[0]);
        return platform?.maxChars || 280;
    };

    // Calendar functions
    const getDaysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const getPostsForDate = (date: Date) => {
        return socialPosts.filter(post => {
            const postDate = new Date(post.scheduledFor);
            return postDate.toDateString() === date.toDateString();
        });
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    const goToToday = () => {
        setCurrentDate(new Date());
    };

    const [selectedPost, setSelectedPost] = useState<any>(null);

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <PostDetailsModal
                isOpen={!!selectedPost}
                onClose={() => setSelectedPost(null)}
                post={selectedPost}
                platforms={PLATFORMS}
            />

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl text-white shadow-lg">
                            <Share2 className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Social Media Planner</h1>
                            <p className="text-slate-500 dark:text-slate-400">Plan and schedule content across all platforms</p>
                        </div>
                    </div>
                    <div className="flex border border-slate-200 dark:border-slate-700 rounded-lg p-1">
                        <button
                            onClick={() => setView('list')}
                            className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-all ${view === 'list'
                                ? 'bg-brand-primary text-white shadow-sm'
                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                                }`}
                        >
                            <List className="w-4 h-4" />
                            List
                        </button>
                        <button
                            onClick={() => setView('calendar')}
                            className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-all ${view === 'calendar'
                                ? 'bg-brand-primary text-white shadow-sm'
                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                                }`}
                        >
                            <CalendarIcon className="w-4 h-4" />
                            Calendar
                        </button>
                    </div>
                </div>
            </motion.div>

            {view === 'list' ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Content Creator */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">Create Post</h2>

                            {/* Platform Selection */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Select Platforms</label>
                                <div className="flex flex-wrap gap-2">
                                    {PLATFORMS.map(platform => (
                                        <button
                                            key={platform.id}
                                            onClick={() => togglePlatform(platform.id)}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${selectedPlatforms.includes(platform.id)
                                                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                                                : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                                                }`}
                                        >
                                            <span>{platform.icon}</span>
                                            <span className="text-sm font-medium">{platform.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* AI Generation */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Generate with AI</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={topic}
                                        onChange={(e) => setTopic(e.target.value)}
                                        placeholder="What's your post about?"
                                        className="flex-1 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
                                    />
                                    <Button
                                        onClick={handleGenerateAI}
                                        disabled={generating || !topic || selectedPlatforms.length === 0}
                                        variant="gradient"
                                        icon={generating ? Loader2 : Sparkles}
                                    >
                                        Generate
                                    </Button>
                                </div>
                            </div>

                            {/* Content Input */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Post Content</label>
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    rows={8}
                                    placeholder="What's happening?"
                                    className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                                />
                                <div className="flex items-center justify-between mt-2">
                                    <div className="flex gap-3">
                                        <button className="text-slate-400 hover:text-indigo-500">
                                            <Hash className="w-5 h-5" />
                                        </button>
                                        <button className="text-slate-400 hover:text-indigo-500">
                                            <TrendingUp className="w-5 h-5" />
                                        </button>
                                    </div>
                                    {getCharLimit() && (
                                        <span className={`text-sm ${content.length > getCharLimit()! ? 'text-red-500' : 'text-slate-500'}`}>
                                            {content.length} / {getCharLimit()}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Schedule */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Schedule For</label>
                                <input
                                    type="datetime-local"
                                    value={scheduledDate}
                                    onChange={(e) => setScheduledDate(e.target.value)}
                                    className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
                                />
                            </div>

                            <Button
                                onClick={handleSchedule}
                                disabled={!content || selectedPlatforms.length === 0 || !scheduledDate}
                                variant="gradient"
                                icon={CalendarIcon}
                                className="w-full"
                            >
                                Schedule Post
                            </Button>
                        </Card>
                    </div>

                    {/* Scheduled Posts */}
                    <div className="space-y-6">
                        <Card className="sticky top-4">
                            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-4">Scheduled Posts</h3>
                            {socialPosts.length > 0 ? (
                                <div className="space-y-3">
                                    {socialPosts.slice(0, 10).map(post => (
                                        <div
                                            key={post.id}
                                            onClick={() => setSelectedPost(post)}
                                            className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-brand-primary/50 hover:shadow-md cursor-pointer transition-all dark:hover:bg-slate-800/50"
                                        >
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-lg">
                                                    {PLATFORMS.find(p => p.id === post.platform)?.icon}
                                                </span>
                                                <span className="text-xs text-slate-500">
                                                    {new Date(post.scheduledFor).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <p className="text-sm text-slate-700 dark:text-slate-300 line-clamp-2">{post.content}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-slate-400 text-sm text-center py-8">No scheduled posts yet</p>
                            )}
                        </Card>
                    </div>
                </div>
            ) : (
                /* Calendar View */
                <Card className="p-6">
                    {/* Calendar Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                            </h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                {socialPosts.length} posts scheduled
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button onClick={goToToday} variant="secondary" size="sm">
                                Today
                            </Button>
                            <button
                                onClick={prevMonth}
                                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={nextMonth}
                                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-px bg-slate-200 dark:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                        {/* Day Headers */}
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <div
                                key={day}
                                className="bg-slate-50 dark:bg-slate-800 px-3 py-2 text-center text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider"
                            >
                                {day}
                            </div>
                        ))}

                        {/* Empty cells for days before month starts */}
                        {Array.from({ length: getFirstDayOfMonth(currentDate) }, (_, i) => (
                            <div key={`empty-${i}`} className="bg-slate-50 dark:bg-slate-900 min-h-[120px] p-2" />
                        ))}

                        {/* Calendar days */}
                        {Array.from({ length: getDaysInMonth(currentDate) }, (_, i) => {
                            const day = i + 1;
                            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                            const postsForDay = getPostsForDate(date);
                            const isToday = date.toDateString() === new Date().toDateString();

                            return (
                                <div
                                    key={day}
                                    className={`bg-white dark:bg-slate-900 min-h-[120px] p-2 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800 ${isToday ? 'ring-2 ring-brand-primary ring-inset' : ''
                                        }`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <span className={`text-sm font-semibold ${isToday
                                            ? 'bg-brand-primary text-white w-6 h-6 rounded-full flex items-center justify-center'
                                            : 'text-slate-700 dark:text-slate-300'
                                            }`}>
                                            {day}
                                        </span>
                                        {postsForDay.length > 0 && (
                                            <span className="text-xs bg-brand-primary/10 text-brand-primary px-2 py-0.5 rounded-full font-medium">
                                                {postsForDay.length}
                                            </span>
                                        )}
                                    </div>
                                    <div className="space-y-1">
                                        {postsForDay.slice(0, 3).map(post => (
                                            <div
                                                key={post.id}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedPost(post);
                                                }}
                                                className="text-xs p-1.5 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 border border-pink-200 dark:border-pink-800 rounded group cursor-pointer hover:shadow-md transition-all hover:scale-[1.02]"
                                                title={post.content}
                                            >
                                                <div className="flex items-center gap-1">
                                                    <span className="text-xs">
                                                        {PLATFORMS.find(p => p.id === post.platform)?.icon}
                                                    </span>
                                                    <span className="text-slate-700 dark:text-slate-300 font-medium truncate">
                                                        {new Date(post.scheduledFor).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                                                    </span>
                                                </div>
                                                <p className="text-slate-600 dark:text-slate-400 line-clamp-1 mt-0.5">
                                                    {post.content}
                                                </p>
                                            </div>
                                        ))}
                                        {postsForDay.length > 3 && (
                                            <div
                                                className="text-xs text-slate-500 dark:text-slate-400 font-medium pl-1.5 cursor-pointer hover:text-brand-primary"
                                                onClick={() => {
                                                    // In a real app this would open a day view or modal with all posts
                                                    // For now just selecting the first hidden one as a fallback or doing nothing
                                                }}
                                            >
                                                +{postsForDay.length - 3} more
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Card>
            )}
        </div>
    );
}
