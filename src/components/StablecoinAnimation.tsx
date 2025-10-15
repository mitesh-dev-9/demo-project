
import { useState } from 'react';

interface StablecoinAnimationProps {
  className?: string;
}

export default function StablecoinAnimation({ className = "" }: StablecoinAnimationProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; name: string } | null>(null);
  
  const cryptocurrencies = [
    { symbol: '₿', name: 'Bitcoin', color: 'from-orange-500 to-orange-600' },
    { symbol: 'Ξ', name: 'Ethereum', color: 'from-purple-500 to-purple-600' },
    { symbol: '₮', name: 'Tether', color: 'from-green-500 to-green-600' },
    { symbol: '◎', name: 'Solana', color: 'from-purple-400 to-purple-500' },
    { symbol: '💵', name: 'USD Coin', color: 'from-blue-500 to-blue-600' },
    { symbol: 'ɱ', name: 'Monero', color: 'from-orange-400 to-orange-500' },
    { symbol: 'Ł', name: 'Litecoin', color: 'from-gray-400 to-gray-500' },
    { symbol: '◈', name: 'Dai', color: 'from-yellow-500 to-yellow-600' }
  ];

  return (
    <div className={`relative ${className}`}>
      {/* Central "Stablecoin" text */}
      <div className="absolute inset-0 flex items-center justify-center z-5">
        <div className="text-white text-2xl font-bold text-center">
          <div className="text-4xl mb-1">Stablecoin</div>
          <div className="text-sm opacity-80">Payment Platform</div>
        </div>
      </div>

      {/* Rotating circle of cryptocurrency logos */}
      <div className="relative w-96 h-96 mx-auto">
        {/* Outer connecting circle with glow effect */}
        <div className="absolute inset-0 border-2 border-green-400/30 rounded-full animate-pulse-slow"></div>
        <div className="absolute inset-0 border border-green-400/20 rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        
        {/* Rotating background pattern */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/10 via-green-500/10 to-blue-500/10 animate-spin-slow"></div>
        
        {/* Rotating container for all symbols */}
        <div 
          className={`absolute inset-0 animate-smooth-rotation ${hoveredIndex !== null ? 'animation-paused' : ''}`}
        >
          {cryptocurrencies.map((crypto, index) => {
            const angle = (360 / cryptocurrencies.length) * index;
            const radius = 180; // Distance from center (increased for more spacing)
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;

            return (
              <div
                key={crypto.symbol}
                className={`absolute w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all duration-500 cursor-pointer group animate-float ${
                  hoveredIndex === index ? 'scale-150 z-50' : 'hover:scale-110'
                }`}
                style={{
                  left: `calc(50% + ${x}px - 40px)`,
                  top: `calc(50% + ${y}px - 40px)`,
                  animationDelay: `${index * 0.1}s`,
                  transitionTimingFunction: 'cubic-bezier(0.4, 0.0, 0.2, 1)'
                }}
                onMouseEnter={(e) => {
                  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                  setHoveredIndex(index);
                  setTooltip({
                    x: rect.right + 10,
                    y: rect.top + rect.height / 2,
                    name: crypto.name,
                  });
                }}
                onMouseLeave={() => {
                  setHoveredIndex(null);
                  setTooltip(null);
                }}
              >
              {/* Connecting lines to center */}
              <div 
                className="absolute  rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                  width: '2px',
                  height: `${radius}px`,
                  transformOrigin: 'bottom center',
                  transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                  zIndex: -1
                }}
              />
              
              {/* Crypto logo with enhanced glow */}
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${crypto.color} flex items-center justify-center shadow-xl transition-all duration-500 relative overflow-hidden ${
                hoveredIndex === index ? 'shadow-2xl shadow-white/50' : 'group-hover:shadow-2xl'
              }`}>
                {/* Inner glow effect */}
                <div className={`absolute inset-0 rounded-full bg-white/20 transition-opacity duration-500 ${
                  hoveredIndex === index ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`}></div>
                {/* Special glow ring for hovered state */}
                {hoveredIndex === index && (
                  <div className="absolute -inset-2 rounded-full border-2 border-white/50 animate-pulse"></div>
                )}
                <span className={`text-white text-xl font-bold transition-transform duration-500 relative z-10 ${
                  hoveredIndex === index ? 'scale-125' : 'group-hover:scale-110'
                }`}>
                  {crypto.symbol}
                </span>
              </div>

              {/* Per-logo tooltip removed; a single fixed tooltip is rendered below */}

            </div>
          );
        })}
        </div>
      </div>

      {/* Fixed, screen-space tooltip so text is never rotated/flipped */}
      {tooltip && (
        <div
          className="fixed bg-black/95 backdrop-blur-sm text-white px-3 py-2 rounded-lg border border-white/30 shadow-2xl z-[99999] pointer-events-none"
          style={{ left: tooltip.x, top: tooltip.y, transform: 'translateY(-50%)' }}
        >
          <div className="text-sm font-semibold whitespace-nowrap text-center">{tooltip.name}</div>
        </div>
      )}

    </div>
  );
}
