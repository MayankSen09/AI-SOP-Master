import { motion } from 'framer-motion';
import { ArrowRight, Shield, CheckCircle2, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 h-20 bg-white/80 backdrop-blur-md border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Shield className="w-8 h-8 text-indigo-600" />
                        <span className="font-bold text-xl text-slate-900 tracking-tight">SOP<span className="text-indigo-600">Master</span></span>
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        <a href="#features" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Features</a>
                        <a href="#pricing" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Enterprise</a>
                        <Button onClick={() => navigate('/onboarding')} className="shadow-lg shadow-indigo-500/20">
                            Get Started
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center max-w-3xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-medium mb-8">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                                </span>
                                New: AI Strategy Generator
                            </span>
                            <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 tracking-tight mb-6 leading-tight">
                                Standardize success with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">AI precision</span>.
                            </h1>
                            <p className="text-xl text-slate-600 mb-10 leading-relaxed">
                                Create, manage, and optimize your Standard Operating Procedures in minutes, not months. The intelligent platform for modern enterprises.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Button size="lg" onClick={() => navigate('/onboarding')} className="h-14 px-8 text-lg shadow-xl shadow-indigo-600/20 hover:shadow-indigo-600/30">
                                    Start Free Trial <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                                <Button variant="secondary" size="lg" className="h-14 px-8 text-lg bg-white border-slate-200">
                                    View Demo
                                </Button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Hero Visual */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.7 }}
                        className="mt-20 relative"
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-2xl blur opacity-20"></div>
                        <div className="relative rounded-2xl bg-slate-900 p-2 shadow-2xl ring-1 ring-slate-900/10">
                            <div className="rounded-xl overflow-hidden bg-slate-800 aspect-[16/9] flex items-center justify-center relative">
                                {/* Mock UI Content */}
                                <div className="absolute inset-0 bg-slate-900/50 backdrop-blur flex items-center justify-center">
                                    <div className="text-center p-8">
                                        <Zap className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
                                        <h3 className="text-2xl font-bold text-white mb-2">AI Processing Active</h3>
                                        <p className="text-slate-400">Generating operations workflow...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Background Decoration */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-600/5 rounded-full blur-3xl"></div>
                    <div className="absolute top-[20%] right-0 w-[800px] h-[600px] bg-violet-600/5 rounded-full blur-3xl"></div>
                </div>
            </div>

            {/* Features Preview */}
            <div className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: 'AI-Powered', desc: 'Generate SOPs from simple prompts.', icon: Zap },
                            { title: 'Enterprise Ready', desc: 'Role-based access and audit logs.', icon: Shield },
                            { title: 'Always Compliant', desc: 'Real-time tracking and versioning.', icon: CheckCircle2 },
                        ].map((feature, i) => (
                            <div key={i} className="p-8 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                                <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center mb-6">
                                    <feature.icon className="w-6 h-6 text-indigo-600" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                                <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
