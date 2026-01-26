import React, { useState } from 'react';
import { MessageSquare, Send, AlertTriangle, Sparkles, Loader2 } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { generateReply } from '../lib/ai';

export const SocialInbox: React.FC = () => {
    const [selectedMessage, setSelectedMessage] = useState<any>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [suggestions, setSuggestions] = useState<any>(null);

    const messages = [
        { id: 1, user: 'Sarah J.', platform: 'Instagram', text: 'Hey! I love your product but having trouble with the login.', time: '10m ago', sentiment: 'neutral' },
        { id: 2, user: 'Mike Ross', platform: 'Twitter', text: 'This is the worst service ever! Total scam! 😡', time: '1h ago', sentiment: 'negative' },
        { id: 3, user: 'Emily B.', platform: 'LinkedIn', text: 'We are interested in a partnership. DM please?', time: '2h ago', sentiment: 'positive' },
    ];

    const handleGenerate = async () => {
        if (!selectedMessage) return;
        setIsGenerating(true);
        try {
            const result = await generateReply(selectedMessage.text, `Platform: ${selectedMessage.platform}`);
            setSuggestions(result);
        } catch (error) {
            console.error(error);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto h-[calc(100vh-100px)] flex flex-col md:flex-row gap-6 animate-in fade-in duration-500">
            {/* Message List */}
            <div className="w-full md:w-1/3 flex flex-col gap-4 h-1/3 md:h-full">
                <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="w-6 h-6 text-indigo-600" />
                    <h2 className="text-xl font-bold text-slate-800">Unified Inbox</h2>
                </div>

                <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                    {messages.map(msg => (
                        <Card
                            key={msg.id}
                            onClick={() => { setSelectedMessage(msg); setSuggestions(null); }}
                            className={`cursor-pointer transition-all hover:bg-slate-50 ${selectedMessage?.id === msg.id ? 'ring-2 ring-indigo-500 border-transparent' : ''}`}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className="font-bold text-slate-800">{msg.user}</span>
                                <span className="text-xs text-slate-400">{msg.time}</span>
                            </div>
                            <p className="text-sm text-slate-600 line-clamp-2">{msg.text}</p>
                            <div className="mt-2 flex gap-2">
                                <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">{msg.platform}</span>
                                {msg.sentiment === 'negative' && <span className="text-[10px] text-red-600 bg-red-100 px-2 py-0.5 rounded font-bold flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Urgent</span>}
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Message Detail & Reply */}
            <div className="flex-1 flex flex-col h-2/3 md:h-full">
                {selectedMessage ? (
                    <Card className="h-full flex flex-col p-0 overflow-hidden">
                        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                            <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                                Reply to {selectedMessage.user}
                                {selectedMessage.sentiment === 'negative' && <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-medium">Handle with Care</span>}
                            </h3>
                            <p className="text-slate-600 mt-2 p-4 bg-white rounded-lg border border-slate-200 italic">"{selectedMessage.text}"</p>
                        </div>

                        <div className="flex-1 p-6 overflow-y-auto">
                            {!suggestions ? (
                                <div className="h-full flex flex-col items-center justify-center text-center">
                                    <Sparkles className="w-12 h-12 text-indigo-200 mb-4" />
                                    <h4 className="text-slate-900 font-medium mb-2">AI Reply Assistant</h4>
                                    <p className="text-slate-500 text-sm max-w-xs mb-6">Generate professional, tone-appropriate replies instantly.</p>
                                    <Button onClick={handleGenerate} icon={isGenerating ? Loader2 : Sparkles}>
                                        {isGenerating ? 'Drafting Replies...' : 'Generate AI Suggestions'}
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-2 text-indigo-600 font-medium">
                                        <Sparkles className="w-5 h-5" />
                                        <span>AI Suggestions</span>
                                    </div>
                                    <div className="grid gap-4">
                                        {suggestions.replyOptions.map((option: any, idx: number) => (
                                            <div key={idx} className="group relative border border-slate-200 rounded-xl p-4 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer">
                                                <div className="flex justify-between mb-2">
                                                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 group-hover:text-indigo-500">{option.tone}</span>
                                                    <button className="text-xs text-indigo-600 opacity-0 group-hover:opacity-100 font-medium">Use this</button>
                                                </div>
                                                <p className="text-slate-700 leading-relaxed text-sm">{option.text}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="border-t border-slate-100 pt-6"></div>
                                </div>
                            )}
                        </div>

                        <div className="p-4 border-t border-slate-100 bg-slate-50">
                            <div className="relative">
                                <textarea
                                    className="w-full pl-4 pr-12 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none h-24"
                                    placeholder="Type your reply..."
                                ></textarea>
                                <button className="absolute right-3 bottom-3 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors">
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </Card>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400">
                        <MessageSquare className="w-16 h-16 mb-4 opacity-20" />
                        <p>Select a message to start replying</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SocialInbox;
