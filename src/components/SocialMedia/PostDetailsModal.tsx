import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/Button';

interface PostDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    post: any; // Using any for now to match the implicit type in planner, ideally should be typed
    platforms: any[];
}

export function PostDetailsModal({ isOpen, onClose, post, platforms }: PostDetailsModalProps) {
    const [copied, setCopied] = useState(false);

    if (!isOpen || !post) return null;

    const platform = platforms.find(p => p.id === post.platform);
    const date = new Date(post.scheduledFor);

    const handleCopy = () => {
        navigator.clipboard.writeText(post.content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            onClick={e => e.stopPropagation()}
                            className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800"
                        >
                            {/* Header */}
                            <div className={`p-6 ${platform?.color || 'bg-slate-500'} text-white relative overflow-hidden`}>
                                <div className="absolute top-0 right-0 p-32 bg-white/10 rounded-fullblur-3xl -translate-y-1/2 translate-x-1/2" />

                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/30 rounded-full transition-colors text-white"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                <div className="relative z-10 flex items-center gap-4">
                                    <div className="text-4xl shadow-sm filter drop-shadow-md">
                                        {platform?.icon}
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium opacity-90 uppercase tracking-wider">Scheduled Post</div>
                                        <h2 className="text-2xl font-bold">{platform?.name}</h2>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 space-y-6">
                                {/* Time Info */}
                                <div className="flex items-center gap-6 text-sm text-slate-600 dark:text-slate-400">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-brand-primary" />
                                        <span className="font-medium">{date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-brand-primary" />
                                        <span className="font-medium">{date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}</span>
                                    </div>
                                </div>

                                {/* Post Body */}
                                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 border border-slate-100 dark:border-slate-700/50 relative group">
                                    <button
                                        onClick={handleCopy}
                                        className="absolute top-3 right-3 p-2 bg-white dark:bg-slate-700 rounded-lg shadow-sm border border-slate-200 dark:border-slate-600 opacity-0 group-hover:opacity-100 transition-all hover:scale-105 active:scale-95"
                                        title="Copy content"
                                    >
                                        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-slate-500" />}
                                    </button>
                                    <p className="whitespace-pre-wrap text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                                        {post.content}
                                    </p>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3 pt-2">
                                    <Button variant="secondary" className="flex-1" onClick={onClose}>
                                        Close
                                    </Button>
                                    <Button className="flex-1 bg-brand-primary text-white hover:bg-brand-secondary">
                                        Edit Post
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
