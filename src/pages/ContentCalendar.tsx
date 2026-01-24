import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useMarketing } from '../context/MarketingContext';
import { useToast } from '../context/ToastContext';

const CONTENT_TYPES = [
    { id: 'blog', name: 'Blog Post', color: 'bg-blue-500' },
    { id: 'social', name: 'Social Media', color: 'bg-pink-500' },
    { id: 'email', name: 'Email', color: 'bg-purple-500' },
    { id: 'webinar', name: 'Webinar', color: 'bg-teal-500' },
    { id: 'video', name: 'Video', color: 'bg-red-500' },
];

export function ContentCalendar() {
    const { contentItems, createContentItem } = useMarketing();
    const { success } = useToast();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [creating, setCreating] = useState(false);
    const [newItem, setNewItem] = useState({
        title: '',
        type: 'blog' as any,
        channel: '',
        scheduledDate: '',
        status: 'planned' as any
    });

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days = [];
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(null);
        }
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(new Date(year, month, i));
        }
        return days;
    };

    const getItemsForDate = (date: Date | null) => {
        if (!date) return [];
        const dateStr = date.toISOString().split('T')[0];
        return contentItems.filter(item =>
            item.scheduledDate.startsWith(dateStr)
        );
    };

    const handleCreateItem = () => {
        if (!newItem.title || !newItem.scheduledDate) return;

        createContentItem(newItem);
        success('Content item added to calendar!');
        setNewItem({ title: '', type: 'blog', channel: '', scheduledDate: '', status: 'planned' });
        setCreating(false);
    };

    const days = getDaysInMonth(currentDate);
    const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl text-white shadow-lg">
                            <CalendarIcon className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Content Calendar</h1>
                            <p className="text-slate-500 dark:text-slate-400">Plan and organize your content strategy</p>
                        </div>
                    </div>
                    <Button onClick={() => setCreating(!creating)} icon={Plus} variant="gradient">
                        Add Content
                    </Button>
                </div>
            </motion.div>

            {creating && (
                <Card>
                    <h2 className="text-xl font-bold mb-4">Add Content Item</h2>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Title</label>
                            <input
                                type="text"
                                value={newItem.title}
                                onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                                placeholder="Content title"
                                className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Type</label>
                            <select
                                value={newItem.type}
                                onChange={(e) => setNewItem({ ...newItem, type: e.target.value as any })}
                                className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
                            >
                                {CONTENT_TYPES.map(type => (
                                    <option key={type.id} value={type.id}>{type.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Channel</label>
                            <input
                                type="text"
                                value={newItem.channel}
                                onChange={(e) => setNewItem({ ...newItem, channel: e.target.value })}
                                placeholder="e.g., LinkedIn, Blog"
                                className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Scheduled Date</label>
                            <input
                                type="datetime-local"
                                value={newItem.scheduledDate}
                                onChange={(e) => setNewItem({ ...newItem, scheduledDate: e.target.value })}
                                className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
                            />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button onClick={handleCreateItem} variant="gradient" className="flex-1">Add to Calendar</Button>
                        <Button onClick={() => setCreating(false)} variant="secondary">Cancel</Button>
                    </div>
                </Card>
            )}

            {/* Calendar Header */}
            <Card>
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            icon={ChevronLeft}
                            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
                        />
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{monthName}</h2>
                        <Button
                            variant="ghost"
                            icon={ChevronRight}
                            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
                        />
                    </div>
                    <div className="flex gap-2">
                        {CONTENT_TYPES.map(type => (
                            <div key={type.id} className="flex items-center gap-2">
                                <div className={`w-3 h-3 rounded ${type.color}`} />
                                <span className="text-xs text-slate-600">{type.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="text-center font-semibold text-sm text-slate-600 dark:text-slate-400 pb-2">
                            {day}
                        </div>
                    ))}

                    {days.map((date, index) => {
                        const items = getItemsForDate(date);
                        const isToday = date && date.toDateString() === new Date().toDateString();

                        return (
                            <div
                                key={index}
                                className={`min-h-[100px] border border-slate-200 dark:border-slate-700 rounded-lg p-2 ${date ? 'bg-white dark:bg-slate-800' : 'bg-slate-50 dark:bg-slate-900'
                                    } ${isToday ? 'ring-2 ring-indigo-500' : ''}`}
                            >
                                {date && (
                                    <>
                                        <div className={`text-sm font-medium ${isToday ? 'text-indigo-600' : 'text-slate-600 dark:text-slate-400'}`}>
                                            {date.getDate()}
                                        </div>
                                        <div className="space-y-1 mt-1">
                                            {items.slice(0, 3).map(item => {
                                                const typeColor = CONTENT_TYPES.find(t => t.id === item.type)?.color || 'bg-slate-500';
                                                return (
                                                    <div
                                                        key={item.id}
                                                        className={`text-xs px-2 py-1 ${typeColor} text-white rounded truncate cursor-pointer hover:opacity-80`}
                                                        title={item.title}
                                                    >
                                                        {item.title}
                                                    </div>
                                                );
                                            })}
                                            {items.length > 3 && (
                                                <div className="text-xs text-slate-500">+{items.length - 3} more</div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
            </Card>

            {/* Upcoming Content */}
            <Card>
                <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-4">Upcoming Content</h3>
                <div className="space-y-2">
                    {contentItems.slice(0, 5).map(item => (
                        <div key={item.id} className="flex items-center gap-4 p-3 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-indigo-300 transition-colors">
                            <div className={`w-2 h-12 rounded ${CONTENT_TYPES.find(t => t.id === item.type)?.color}`} />
                            <div className="flex-1">
                                <h4 className="font-semibold text-slate-900 dark:text-slate-100">{item.title}</h4>
                                <p className="text-sm text-slate-500">{item.channel} • {new Date(item.scheduledDate).toLocaleDateString()}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.status === 'completed' ? 'bg-green-100 text-green-700' :
                                item.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                                    'bg-slate-100 text-slate-700'
                                }`}>
                                {item.status}
                            </span>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}
