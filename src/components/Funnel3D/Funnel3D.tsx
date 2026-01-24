// Premium 3D Funnel Component with CSS 3D Transforms
import React, { useState, useEffect, useRef } from 'react';
import type { FunnelStage, FunnelStageDetail } from '../../lib/funnelTypes';

interface Funnel3DProps {
    stages: (FunnelStage | FunnelStageDetail)[];
    width?: number;
    height?: number;
    showLabels?: boolean;
    interactive?: boolean;
    simulationData?: {
        scales: number[];
        projectedRevenue?: string;
        conversionRates?: number[];
    };
}

export const Funnel3D: React.FC<Funnel3DProps> = ({
    stages,
    width = 600,
    height = 700,
    showLabels = true,
    interactive = true,
    simulationData
}) => {
    const [hoveredStage, setHoveredStage] = useState<number | null>(null);
    const [rotation, setRotation] = useState({ x: 15, y: -20 }); // Initial attractive tilt
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const autoRotateRef = useRef<number | null>(null);

    // Auto-rotation effect for depth
    useEffect(() => {
        if (!interactive || isDragging) return;

        const animate = () => {
            setRotation(prev => ({
                ...prev,
                y: prev.y + 0.1
            }));
            autoRotateRef.current = requestAnimationFrame(animate);
        };

        autoRotateRef.current = requestAnimationFrame(animate);
        return () => {
            if (autoRotateRef.current) cancelAnimationFrame(autoRotateRef.current);
        };
    }, [interactive, isDragging]);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!interactive) return;
        setIsDragging(true);
        setDragStart({ x: e.clientX, y: e.clientY });
        if (autoRotateRef.current) cancelAnimationFrame(autoRotateRef.current);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !interactive) return;
        const deltaX = e.clientX - dragStart.x;
        const deltaY = e.clientY - dragStart.y;

        setRotation(prev => ({
            x: Math.max(-45, Math.min(45, prev.x - deltaY * 0.3)),
            y: prev.y + deltaX * 0.3
        }));
        setDragStart({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const stageHeight = height / (stages.length + 1.5);
    const baseRadius = width / 3.5;

    return (
        <div className="relative mx-auto group" style={{ width: `${width}px`, height: `${height}px` }}>
            {/* Ambient Lighting & Particles */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05)_0%,transparent_70%)]" />
                <div className="absolute top-0 left-1/4 w-1 h-1 bg-white/40 rounded-full animate-float-slow" style={{ left: '20%', top: '30%' }} />
                <div className="absolute top-0 left-1/4 w-2 h-2 bg-indigo-400/20 rounded-full animate-float-fast" style={{ left: '70%', top: '60%' }} />
                <div className="absolute top-0 left-1/4 w-1.5 h-1.5 bg-blue-300/30 rounded-full animate-float-medium" style={{ left: '10%', top: '80%' }} />
            </div>

            <div
                className="w-full h-full"
                style={{
                    perspective: '2000px',
                    perspectiveOrigin: '50% 50%',
                    cursor: interactive ? (isDragging ? 'grabbing' : 'grab') : 'default'
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                <div
                    className="relative w-full h-full transition-transform duration-500 ease-out"
                    style={{
                        transformStyle: 'preserve-3d',
                        transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                    }}
                >
                    {stages.map((stage, index) => {
                        const scale = simulationData?.scales[index] || 1;
                        const nextScale = simulationData?.scales[index + 1] || simulationData?.scales[index] || 1;

                        const topRadius = baseRadius * (1 - index * 0.12) * scale;
                        const bottomRadius = baseRadius * (1 - (index + 1) * 0.12) * (index === stages.length - 1 ? scale * 0.5 : nextScale);
                        const yPosition = index * stageHeight - height / 3;
                        const isHovered = hoveredStage === index;

                        return (
                            <div
                                key={index}
                                className="absolute left-1/2 top-1/2"
                                style={{
                                    transformStyle: 'preserve-3d',
                                    transform: `translate(-50%, -50%) translateY(${yPosition}px)`,
                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                                }}
                                onMouseEnter={() => interactive && setHoveredStage(index)}
                                onMouseLeave={() => interactive && setHoveredStage(null)}
                            >
                                <ConeSegment
                                    topRadius={topRadius}
                                    bottomRadius={bottomRadius}
                                    height={stageHeight}
                                    color={stage.color || '#4F46E5'}
                                    isHovered={isHovered}
                                />

                                {showLabels && (
                                    <div
                                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-center z-50 whitespace-nowrap"
                                        style={{
                                            transform: `translate(-50%, -50%) rotateX(${-rotation.x}deg) rotateY(${-rotation.y}deg) translateZ(${topRadius + 50}px)`,
                                            width: '240px',
                                            transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
                                        }}
                                    >
                                        <div
                                            className={`px-4 py-3 rounded-2xl backdrop-blur-xl border transition-all duration-500 shadow-2xl ${isHovered
                                                ? 'bg-white/20 border-white/40 scale-110 -translate-y-2'
                                                : 'bg-black/20 border-white/10 scale-95 opacity-80'
                                                }`}
                                            style={{
                                                boxShadow: isHovered ? `0 20px 40px -10px ${stage.color}40, inset 0 0 20px rgba(255,255,255,0.1)` : 'none'
                                            }}
                                        >
                                            <div className="flex items-center gap-2 justify-center mb-1">
                                                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: stage.color }} />
                                                <span className="font-bold text-white text-sm tracking-wide uppercase">{stage.label}</span>
                                            </div>

                                            {isHovered ? (
                                                <div className="text-white/90 text-[11px] leading-relaxed max-w-[200px] mx-auto animate-in fade-in slide-in-from-bottom-2 duration-300">
                                                    {stage.objective}
                                                </div>
                                            ) : (
                                                <div className="text-white/50 text-[10px] font-medium">
                                                    STAGE {index + 1}
                                                </div>
                                            )}

                                            <div className="mt-2 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full transition-all duration-1000 ease-out"
                                                    style={{
                                                        width: `${100 - (index * (100 / stages.length))}%`,
                                                        backgroundColor: stage.color,
                                                        boxShadow: `0 0 10px ${stage.color}`
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    {/* Final Conversion Goal */}
                    <div
                        className="absolute left-1/2 top-1/2"
                        style={{
                            transformStyle: 'preserve-3d',
                            transform: `translate(-50%, -50%) translateY(${stages.length * stageHeight - height / 3 + 20}px)`,
                        }}
                    >
                        <div className="relative group">
                            <div className="absolute inset-0 bg-emerald-400 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-1000 animate-pulse" />
                            <div
                                className="w-20 h-20 rounded-[2.5rem] bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.3)] border border-white/20 relative overflow-hidden active:scale-95 transition-transform"
                                style={{
                                    transform: `rotateX(${-rotation.x}deg) rotateY(${-rotation.y}deg)`,
                                }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                <span className="text-white text-4xl font-bold drop-shadow-lg">✨</span>
                            </div>
                        </div>
                        <div
                            className="text-white text-xs font-black tracking-widest mt-4 text-center uppercase opacity-60"
                            style={{
                                transform: `rotateX(${-rotation.x}deg) rotateY(${-rotation.y}deg)`,
                                textShadow: '0 0 10px rgba(255,255,255,0.3)'
                            }}
                        >
                            Revenue Peak
                        </div>
                    </div>
                </div>
            </div>

            {/* UI HUD Overlay */}
            <div className="absolute bottom-6 right-6 flex flex-col items-end gap-3 pointer-events-none">
                <div className="flex flex-col items-end backdrop-blur-md bg-white/5 p-4 rounded-2xl border border-white/10 shadow-2xl">
                    <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">PROJECTION_ENGINE_V2</div>
                    <div className="text-xl font-bold text-white tabular-nums tracking-tighter">
                        {simulationData?.projectedRevenue || '$2.4M'}
                    </div>
                    <div className="text-[10px] font-bold text-emerald-400/80 uppercase tracking-tighter mt-1 flex items-center gap-1">
                        <div className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" />
                        Live Forecast Optimized
                    </div>
                </div>

                <div className="flex gap-2 items-center">
                    <div className="flex flex-col items-end">
                        <div className="text-[9px] font-mono text-white/30 truncate uppercase">ROI.Sim_Status</div>
                        <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Active</div>
                    </div>
                    <div className="w-8 h-[1px] bg-white/10" />
                    <div className="w-3 h-3 rounded-full border border-indigo-500/50 flex items-center justify-center">
                        <div className="w-1 h-1 rounded-full bg-indigo-500 animate-pulse" />
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes float-slow {
                    0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; }
                    50% { transform: translateY(-40px) translateX(20px); opacity: 0.5; }
                }
                @keyframes float-medium {
                    0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
                    50% { transform: translateY(-60px) translateX(-30px); opacity: 0.6; }
                }
                @keyframes float-fast {
                    0%, 100% { transform: translateY(0) translateX(0); opacity: 0.1; }
                    50% { transform: translateY(-30px) translateX(10px); opacity: 0.4; }
                }
                .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
                .animate-float-medium { animation: float-medium 6s ease-in-out infinite; }
                .animate-float-fast { animation: float-fast 4s ease-in-out infinite; }
            `}</style>
        </div>
    );
};

const ConeSegment: React.FC<{
    topRadius: number;
    bottomRadius: number;
    height: number;
    color: string;
    isHovered: boolean;
}> = ({ topRadius, bottomRadius, height, color, isHovered }) => {
    const segments = 48; // Increased for higher fidelity
    const angleStep = (Math.PI * 2) / segments;

    return (
        <div
            className="relative"
            style={{
                transformStyle: 'preserve-3d',
                width: `${topRadius * 2}px`,
                height: `${height}px`,
            }}
        >
            {/* Glossy Top Surface */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full transition-all duration-500"
                style={{
                    width: `${topRadius * 2}px`,
                    height: `${topRadius * 2}px`,
                    background: `radial-gradient(circle at 35% 35%, 
                        ${adjustColorBrightness(color, isHovered ? 1.4 : 1.2)}, 
                        ${color}, 
                        ${adjustColorBrightness(color, 0.4)})`,
                    transform: `translateX(-50%) rotateX(90deg)`,
                    transformStyle: 'preserve-3d',
                    boxShadow: `inset 0 0 40px rgba(255,255,255,0.2), 0 0 ${isHovered ? '40' : '10'}px ${color}60`,
                    border: '1px solid rgba(255,255,255,0.3)',
                    zIndex: 10
                }}
            />

            {/* 3D Body Faces */}
            {Array.from({ length: segments }).map((_, i) => {
                const angle = i * angleStep;
                const nextAngle = (i + 1) * angleStep;
                const midAngle = (angle + nextAngle) / 2;
                const rotationY = (midAngle * 180) / Math.PI;

                // Lighting based on angle
                const shadow = Math.cos(midAngle);
                const highlight = Math.max(0, Math.cos(midAngle - 0.8));
                const brightness = 0.5 + shadow * 0.4 + highlight * 0.5;

                const faceWidth = (Math.PI * (topRadius + bottomRadius)) / segments;

                return (
                    <div
                        key={i}
                        className="absolute transition-all duration-500 overflow-hidden"
                        style={{
                            transformStyle: 'preserve-3d',
                            transform: `
                                rotateY(${rotationY}deg) 
                                translateZ(${(topRadius + bottomRadius) / 2.1}px)
                                rotateX(${Math.atan((topRadius - bottomRadius) / height) * (180 / Math.PI)}deg)
                            `,
                            width: `${faceWidth + 1}px`, // Slight overlap to prevent gaps
                            height: `${height}px`,
                            left: '50%',
                            top: '0',
                            marginLeft: `-${faceWidth / 2}px`,
                            background: `linear-gradient(to right, 
                                transparent 0%, 
                                rgba(255,255,255,${highlight * 0.2}) 50%, 
                                transparent 100%),
                                linear-gradient(to bottom, 
                                ${adjustColorBrightness(color, brightness * (isHovered ? 1.3 : 1.1))}, 
                                ${adjustColorBrightness(color, brightness * 0.6 * (isHovered ? 1.3 : 1.1))})`,
                            opacity: isHovered ? 1 : 0.85,
                            borderRight: '0.1px solid rgba(255,255,255,0.05)',
                        }}
                    >
                        {/* Dynamic glint effect */}
                        {isHovered && i % 4 === 0 && (
                            <div className="absolute inset-0 bg-white/10 animate-pulse" />
                        )}
                    </div>
                );
            })}

            {/* Bottom Seal (Optional depth) */}
            <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full"
                style={{
                    width: `${bottomRadius * 2}px`,
                    height: `${bottomRadius * 2}px`,
                    background: `rgba(0,0,0,0.4)`,
                    transform: `translateX(-50%) rotateX(90deg)`,
                    boxShadow: `0 0 20px rgba(0,0,0,0.5)`
                }}
            />
        </div>
    );
};

function adjustColorBrightness(color: string, factor: number): string {
    const hex = color.replace('#', '');
    const r = Math.min(255, Math.floor(parseInt(hex.substring(0, 2), 16) * factor));
    const g = Math.min(255, Math.floor(parseInt(hex.substring(2, 4), 16) * factor));
    const b = Math.min(255, Math.floor(parseInt(hex.substring(4, 6), 16) * factor));
    return `rgb(${r}, ${g}, ${b})`;
}
