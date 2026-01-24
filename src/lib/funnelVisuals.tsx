// Visual Funnel SVG Generator for Marketing Funnel Builder
import React, { useState } from 'react';
import type { FunnelStage, FunnelStageDetail } from './funnelTypes';

// Export the new 3D Funnel component
export { Funnel3D } from '../components/Funnel3D/Funnel3D';

interface FunnelVisualProps {
    stages: (FunnelStage | FunnelStageDetail)[];
    width?: number;
    height?: number;
    showLabels?: boolean;
    interactive?: boolean;
}

// Premium 3D Glass Funnel Visual Component
export const GlassFunnelVisual: React.FC<FunnelVisualProps> = ({
    stages,
    width = 600,
    height = 700,
    showLabels = true,
    interactive = true
}) => {
    const [hoveredStage, setHoveredStage] = useState<number | null>(null);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    // Calculate positions for stage labels (adjust based on visual appearance)
    const stagePositions = stages.map((_, index) => {
        const totalStages = stages.length;
        const yPercent = 12 + (index * 78) / (totalStages - 1); // Distribute from ~12% to ~90%
        return {
            top: `${yPercent}%`,
            scale: 1 - (index * 0.08) // Slightly scale down as we go down
        };
    });

    return (
        <div
            className="relative mx-auto"
            style={{
                width: `${width}px`,
                height: `${height}px`,
                maxWidth: '100%'
            }}
        >
            {/* Background Glass Funnel Image */}
            <div className="absolute inset-0 flex items-center justify-center">
                {/* Loading Skeleton */}
                {!imageLoaded && !imageError && (
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="relative" style={{ width: '80%', height: '90%' }}>
                            {/* Animated skeleton funnel shape */}
                            <div className="absolute inset-0 bg-gradient-to-b from-slate-700/20 via-slate-600/30 to-slate-700/20 animate-pulse">
                                <div className="absolute inset-0" style={{
                                    clipPath: 'polygon(25% 0%, 75% 0%, 65% 100%, 35% 100%)',
                                    background: 'linear-gradient(180deg, rgba(148, 163, 184, 0.3) 0%, rgba(100, 116, 139, 0.4) 100%)'
                                }} />
                            </div>
                            {/* Loading spinner */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-12 h-12 border-4 border-white/20 border-t-white/60 rounded-full animate-spin" />
                            </div>
                        </div>
                    </div>
                )}

                {/* Error Fallback */}
                {imageError && (
                    <div className="w-full h-full flex items-center justify-center text-white/60">
                        <div className="text-center">
                            <div className="text-4xl mb-2">📊</div>
                            <div className="text-sm">Funnel visualization unavailable</div>
                        </div>
                    </div>
                )}

                {/* Actual Image */}
                <img
                    src="/glass-funnel.png?v=3"
                    alt="3D Glass Funnel"
                    className={`w-full h-full object-contain transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                    style={{
                        filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3))',
                        animation: imageLoaded ? 'subtle-float 6s ease-in-out infinite' : 'none'
                    }}
                    onLoad={() => setImageLoaded(true)}
                    onError={() => {
                        setImageError(true);
                        setImageLoaded(false);
                    }}
                />
            </div>

            {/* Stage Labels Overlay */}
            {showLabels && (
                <div className="absolute inset-0 pointer-events-none">
                    {stages.map((stage, index) => (
                        <div
                            key={index}
                            className="absolute left-0 right-0 transition-all duration-300"
                            style={{
                                top: stagePositions[index].top,
                                transform: `translate(0, -50%) scale(${hoveredStage === index ? 1.05 : 1})`,
                                pointerEvents: interactive ? 'auto' : 'none'
                            }}
                            onMouseEnter={() => interactive && setHoveredStage(index)}
                            onMouseLeave={() => interactive && setHoveredStage(null)}
                        >
                            <div
                                className={`
                                    mx-auto text-center px-4 py-2 rounded-lg backdrop-blur-sm
                                    transition-all duration-300
                                    ${hoveredStage === index
                                        ? 'bg-white/40 shadow-lg scale-105'
                                        : 'bg-white/20'
                                    }
                                `}
                                style={{
                                    maxWidth: `${85 - index * 10}%`,
                                    borderLeft: `4px solid ${stage.color}`,
                                }}
                            >
                                <div
                                    className="font-bold text-white drop-shadow-lg"
                                    style={{
                                        fontSize: `${18 - index * 0.5}px`,
                                        textShadow: '0 2px 8px rgba(0,0,0,0.5), 0 0 20px rgba(0,0,0,0.3)'
                                    }}
                                >
                                    {stage.label}
                                </div>

                                {hoveredStage === index && (
                                    <div
                                        className="text-white/90 mt-1 text-xs drop-shadow animate-fade-in"
                                        style={{
                                            textShadow: '0 1px 4px rgba(0,0,0,0.5)'
                                        }}
                                    >
                                        {stage.objective.length > 50
                                            ? stage.objective.substring(0, 47) + '...'
                                            : stage.objective}
                                    </div>
                                )}

                                {/* Conversion percentage indicator */}
                                <div
                                    className="absolute -left-12 top-1/2 -translate-y-1/2 text-white/80 font-semibold text-sm"
                                    style={{
                                        textShadow: '0 2px 4px rgba(0,0,0,0.8)'
                                    }}
                                >
                                    {`${100 - index * 15}%`}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Bottom Success Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none">
                <div className="flex flex-col items-center animate-bounce-slow">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-xl">
                        <span className="text-white text-2xl font-bold">✓</span>
                    </div>
                    <span className="text-white text-xs mt-2 font-semibold drop-shadow-lg">
                        Conversion
                    </span>
                </div>
            </div>

            {/* Add CSS animations */}
            <style>{`
                @keyframes subtle-float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                }
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(5px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-bounce-slow {
                    animation: bounce-slow 3s ease-in-out infinite;
                }
                .animate-fade-in {
                    animation: fade-in 0.3s ease-out;
                }
            `}</style>
        </div>
    );
};

export const FunnelVisual: React.FC<FunnelVisualProps> = ({
    stages,
    width = 600,
    height = 700,
    showLabels = true,
    interactive = false
}) => {
    const padding = 40;
    const stageHeight = (height - padding * 2) / stages.length;
    const maxWidth = width - padding * 2;

    return (
        <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            xmlns="http://www.w3.org/2000/svg"
            className="funnel-visual"
        >
            {/* Gradient Definitions */}
            <defs>
                {stages.map((stage, index) => (
                    <linearGradient
                        key={`gradient-${index}`}
                        id={`funnel-gradient-${index}`}
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                    >
                        <stop offset="0%" stopColor={stage.color} stopOpacity="1" />
                        <stop offset="100%" stopColor={stage.color} stopOpacity="0.7" />
                    </linearGradient>
                ))}

                {/* Shadow filter */}
                <filter id="funnel-shadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                    <feOffset dx="0" dy="2" result="offsetblur" />
                    <feComponentTransfer>
                        <feFuncA type="linear" slope="0.3" />
                    </feComponentTransfer>
                    <feMerge>
                        <feMergeNode />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Render funnel stages */}
            {stages.map((stage, index) => {
                const y = padding + index * stageHeight;
                const topWidth = maxWidth * (1 - index * 0.12); // Narrowing effect
                const bottomWidth = maxWidth * (1 - (index + 1) * 0.12);
                const x = (width - topWidth) / 2;

                // Calculate trapezoid points (3D funnel effect)
                const points = `
          ${x},${y}
          ${x + topWidth},${y}
          ${(width - bottomWidth) / 2 + bottomWidth},${y + stageHeight}
          ${(width - bottomWidth) / 2},${y + stageHeight}
        `;

                return (
                    <g key={index} className={interactive ? 'funnel-stage-interactive' : 'funnel-stage'}>
                        {/* Stage trapezoid */}
                        <polygon
                            points={points}
                            fill={`url(#funnel-gradient-${index})`}
                            stroke="rgba(255,255,255,0.5)"
                            strokeWidth="2"
                            filter="url(#funnel-shadow)"
                            className={interactive ? 'hover:opacity-90 transition-opacity cursor-pointer' : ''}
                        />

                        {/* Stage label */}
                        {showLabels && (
                            <>
                                {/* Stage name */}
                                <text
                                    x={width / 2}
                                    y={y + stageHeight / 2 - 10}
                                    textAnchor="middle"
                                    fill="white"
                                    fontSize="18"
                                    fontWeight="bold"
                                    style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
                                >
                                    {stage.label}
                                </text>

                                {/* Stage objective (smaller text) */}
                                <text
                                    x={width / 2}
                                    y={y + stageHeight / 2 + 15}
                                    textAnchor="middle"
                                    fill="rgba(255,255,255,0.9)"
                                    fontSize="11"
                                    style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
                                >
                                    {stage.objective.length > 50
                                        ? stage.objective.substring(0, 47) + '...'
                                        : stage.objective}
                                </text>

                                {/* Key channels */}
                                {stage.channels && stage.channels.length > 0 && (
                                    <text
                                        x={width / 2}
                                        y={y + stageHeight / 2 + 32}
                                        textAnchor="middle"
                                        fill="rgba(255,255,255,0.8)"
                                        fontSize="9"
                                        fontStyle="italic"
                                    >
                                        {stage.channels.slice(0, 3).join(' • ')}
                                    </text>
                                )}
                            </>
                        )}

                        {/* Side percentage labels (optional) */}
                        <text
                            x={x - 10}
                            y={y + stageHeight / 2 + 5}
                            textAnchor="end"
                            fill="#64748b"
                            fontSize="12"
                            fontWeight="600"
                        >
                            {`${100 - index * 15}%`}
                        </text>
                    </g>
                );
            })}

            {/* Bottom conversion indicator */}
            <g>
                <circle
                    cx={width / 2}
                    cy={height - padding + 20}
                    r="15"
                    fill="#10B981"
                    filter="url(#funnel-shadow)"
                />
                <text
                    x={width / 2}
                    y={height - padding + 25}
                    textAnchor="middle"
                    fill="white"
                    fontSize="18"
                    fontWeight="bold"
                >
                    ✓
                </text>
            </g>
        </svg>
    );
};

// Export as PNG (for PDF embedding)
export async function exportFunnelAsPNG(
    stages: (FunnelStage | FunnelStageDetail)[],
    width: number = 800,
    height: number = 900
): Promise<string> {
    return new Promise((resolve) => {
        const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svgElement.setAttribute('width', width.toString());
        svgElement.setAttribute('height', height.toString());
        svgElement.setAttribute('viewBox', `0 0 ${width} ${height}`);

        // Create SVG content programmatically
        const padding = 40;
        const stageHeight = (height - padding * 2) / stages.length;
        const maxWidth = width - padding * 2;

        let svgContent = `
      <defs>
        ${stages.map((stage, index) => `
          <linearGradient id="gradient-${index}" x1="0%" y1="0%" x2="100%"  y2="100%">
            <stop offset="0%" stop-color="${stage.color}" stop-opacity="1" />
            <stop offset="100%" stop-color="${stage.color}" stop-opacity="0.7" />
          </linearGradient>
        `).join('')}
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
          <feOffset dx="0" dy="2" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    `;

        stages.forEach((stage, index) => {
            const y = padding + index * stageHeight;
            const topWidth = maxWidth * (1 - index * 0.12);
            const bottomWidth = maxWidth * (1 - (index + 1) * 0.12);
            const x = (width - topWidth) / 2;

            const points = `
        ${x},${y}
        ${x + topWidth},${y}
        ${(width - bottomWidth) / 2 + bottomWidth},${y + stageHeight}
        ${(width - bottomWidth) / 2},${y + stageHeight}
      `;

            svgContent += `
        <polygon
          points="${points}"
          fill="url(#gradient-${index})"
          stroke="rgba(255,255,255,0.5)"
          stroke-width="2"
          filter="url(#shadow)"
        />
        <text
          x="${width / 2}"
          y="${y + stageHeight / 2 - 10}"
          text-anchor="middle"
          fill="white"
          font-size="20"
          font-weight="bold"
          font-family="Arial, sans-serif"
        >${stage.label}</text>
        <text
          x="${width / 2}"
          y="${y + stageHeight / 2 + 15}"
          text-anchor="middle"
          fill="rgba(255,255,255,0.9)"
          font-size="13"
          font-family="Arial, sans-serif"
        >${stage.objective.substring(0, 60)}${stage.objective.length > 60 ? '...' : ''}</text>
      `;
        });

        // Bottom check mark
        svgContent += `
      <circle cx="${width / 2}" cy="${height - padding + 20}" r="15" fill="#10B981" filter="url(#shadow)" />
      <text x="${width / 2}" y="${height - padding + 27}" text-anchor="middle" fill="white" font-size="20" font-weight="bold">✓</text>
    `;

        svgElement.innerHTML = svgContent;

        // Convert SVG to PNG using canvas
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        const img = new Image();
        const svgBlob = new Blob([svgElement.outerHTML], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);

        img.onload = () => {
            ctx?.drawImage(img, 0, 0);
            URL.revokeObjectURL(url);
            resolve(canvas.toDataURL('image/png'));
        };

        img.src = url;
    });
}

// Simple text-based funnel for fallback
export function generateTextFunnel(stages: FunnelStage[]): string {
    let text = '\n';
    const maxWidth = 60;

    stages.forEach((stage, index) => {
        const width = maxWidth - index * 8;
        const padding = ' '.repeat((maxWidth - width) / 2);
        const bar = '█'.repeat(width);

        text += `${padding}${bar}\n`;
        text += `${padding}${stage.label.toUpperCase()}\n`;
        text += `${padding}${stage.objective}\n`;
        text += `${padding}${stage.channels.join(', ')}\n`;
        text += `${padding}${'-'.repeat(width)}\n\n`;
    });

    return text;
}
