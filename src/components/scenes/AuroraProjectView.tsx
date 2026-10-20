import React, { useState } from 'react';
import { ArrowRight, Zap, Shield, Sparkles } from 'lucide-react';

interface AuroraProjectViewProps {
  opacity: number;
  onOpenCaseStudy: () => void;
  onPullBack: () => void;
}

export const AuroraProjectView: React.FC<AuroraProjectViewProps> = ({
  opacity,
  onOpenCaseStudy,
  onPullBack
}) => {
  const [activeTab, setActiveTab] = useState<'balance' | 'cards' | 'activity'>('balance');
  const [balance, setBalance] = useState<number>(34820.50);

  if (opacity <= 0.01) return null;

  return (
    <div
      className="absolute inset-0 z-20 flex flex-col justify-between transition-opacity duration-300 overflow-y-auto sm:overflow-hidden"
      style={{
        opacity,
        pointerEvents: opacity > 0.4 ? 'auto' : 'none',
        backgroundColor: '#faf8f5'
      }}
    >
      {/* Aurora Digital Banking Navigation Bar */}
      <header className="w-full px-8 md:px-16 py-5 flex items-center justify-between border-b border-[#ece6dc] bg-[#faf8f5]/95 backdrop-blur-md sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <span className="font-editorial text-2xl font-semibold tracking-tight text-[#1a1918]">
            Aurora
          </span>
          <span className="text-[#999285] text-xs uppercase tracking-wider font-medium hidden sm:inline">
            — Conceptual Banking Study
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest text-[#666056] font-medium">
          <button onClick={onOpenCaseStudy} className="hover:text-[#1a1918] transition-colors">Architecture</button>
          <button onClick={onOpenCaseStudy} className="hover:text-[#1a1918] transition-colors">Interface System</button>
          <button onClick={onOpenCaseStudy} className="hover:text-[#1a1918] transition-colors">Security Model</button>
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={onOpenCaseStudy}
            className="px-5 py-2.5 rounded-full bg-[#141414] text-[#fbf9f5] text-xs font-medium tracking-wider uppercase hover:bg-[#333] transition-colors"
          >
            View Case Study
          </button>
        </div>
      </header>

      {/* Main Hero & Showcase Layout */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-16 py-8 md:py-12 flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Left Editorial Copy */}
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eee7db] text-[10px] font-medium uppercase tracking-wider text-[#524c43] mb-5">
            <span>Evorique R&D Lab</span>
            <span>•</span>
            <span>Conceptual Product Study</span>
          </div>

          <h1 className="font-editorial text-5xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#1a1918] leading-[1.02]">
            A more intuitive<br />
            way to bank.
          </h1>

          <p className="mt-5 text-sm sm:text-base text-[#5c564c] font-light leading-relaxed max-w-lg">
            We designed a modern banking experience focused on simplicity, trust and control. By replacing anxious tabular clutter with spatial cash-flow topologies, Aurora turns financial management into a quiet, confident ritual.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenCaseStudy}
              className="px-7 py-3.5 rounded-full bg-[#1a1918] text-[#fbf9f5] text-xs font-medium uppercase tracking-widest hover:bg-[#333333] transition-all flex items-center gap-3 shadow-sm hover:shadow"
            >
              <span>Explore Case Study</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onPullBack}
              className="px-6 py-3.5 rounded-full border border-[#d5cec2] text-xs uppercase tracking-widest text-[#4a453e] font-medium hover:border-[#1a1918] hover:text-[#1a1918] transition-colors"
            >
              Pull Back to World
            </button>
          </div>

          {/* Transparent Research Specifications Grid */}
          <div className="mt-10 grid grid-cols-3 gap-6 pt-6 border-t border-[#ece5d8]">
            <div>
              <div className="text-xl sm:text-2xl font-light font-editorial text-[#1a1918]">Topology</div>
              <div className="text-[10px] uppercase tracking-wider text-[#827a6f] mt-1">Spatial Balance Map</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-light font-editorial text-[#1a1918]">42 Tokens</div>
              <div className="text-[10px] uppercase tracking-wider text-[#827a6f] mt-1">Design System</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-light font-editorial text-[#1a1918]">Prototype</div>
              <div className="text-[10px] uppercase tracking-wider text-[#827a6f] mt-1">Web & Mobile</div>
            </div>
          </div>
        </div>

        {/* Right Visual / Phone Mockup Showcase */}
        <div className="relative w-full max-w-md lg:max-w-lg flex justify-center items-center">
          {/* Alpine Mountain Backdrop */}
          <div className="absolute inset-0 -z-10 rounded-2xl overflow-hidden shadow-sm opacity-90">
            <img
              src="/scenes/aurora_mountain.png"
              alt="Aurora Mountain Scenery"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#faf8f5] via-transparent to-transparent opacity-60" />
          </div>

          {/* Interactive Mobile Device Simulator */}
          <div className="w-[290px] sm:w-[320px] rounded-[38px] p-3 bg-[#1c1b1a] shadow-2xl border-4 border-[#33312e] text-[#1c1b1a]">
            <div className="w-full bg-[#fbf9f5] rounded-[30px] overflow-hidden p-5 flex flex-col justify-between min-h-[440px]">
              {/* Phone Status Bar */}
              <div className="flex items-center justify-between text-[11px] font-medium text-[#736d64] mb-3">
                <span>9:41</span>
                <div className="w-16 h-3.5 bg-[#141414] rounded-full mx-auto" />
                <span>5G 100%</span>
              </div>

              {/* In-app Header */}
              <div className="text-center my-2">
                <span className="text-[10px] uppercase tracking-widest text-[#8a8377] font-semibold">
                  Personal Vault
                </span>
                <div className="text-xs text-[#8a8377] mt-0.5">Your money in focus.</div>
                <div className="font-editorial text-3xl font-normal text-[#1a1918] mt-2">
                  ${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
              </div>

              {/* Minimalist Virtual Card */}
              <div className="my-2.5 p-4 rounded-2xl bg-gradient-to-br from-[#2c2a27] to-[#141414] text-[#ede8de] shadow-md">
                <div className="flex justify-between items-center text-[10px] uppercase tracking-wider text-[#a8a195]">
                  <span>Aurora Obsidian</span>
                  <Zap className="w-3.5 h-3.5 text-[#e5dbcc]" />
                </div>
                <div className="mt-4 font-mono text-sm tracking-widest text-[#d8cfbe]">
                  •••• 9184
                </div>
                <div className="mt-1.5 flex justify-between text-[10px] text-[#9c9487]">
                  <span>EXP 12/28</span>
                  <span>STATUS: ACTIVE</span>
                </div>
              </div>

              {/* Quick Action Tabs */}
              <div className="grid grid-cols-3 gap-1.5 my-2 bg-[#f0ebdF] p-1 rounded-xl text-center text-[11px] font-medium text-[#5c564c]">
                <button
                  onClick={() => setActiveTab('balance')}
                  className={`py-1.5 rounded-lg transition-all ${
                    activeTab === 'balance' ? 'bg-[#ffffff] text-[#141414] shadow-xs' : ''
                  }`}
                >
                  Activity
                </button>
                <button
                  onClick={() => setActiveTab('cards')}
                  className={`py-1.5 rounded-lg transition-all ${
                    activeTab === 'cards' ? 'bg-[#ffffff] text-[#141414] shadow-xs' : ''
                  }`}
                >
                  Cards
                </button>
                <button
                  onClick={() => setActiveTab('activity')}
                  className={`py-1.5 rounded-lg transition-all ${
                    activeTab === 'activity' ? 'bg-[#ffffff] text-[#141414] shadow-xs' : ''
                  }`}
                >
                  Vaults
                </button>
              </div>

              {/* Recent Transactions List */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between items-center py-1 border-b border-[#f0ebdF]">
                  <span className="text-[#3d3a35] font-medium">Nordic Treasury Yield</span>
                  <span className="text-[#3b7a57] font-medium">+$142.80</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-[#f0ebdF]">
                  <span className="text-[#3d3a35] font-medium">Zurich Studio Office</span>
                  <span className="text-[#696358]">-$850.00</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-[#3d3a35] font-medium">Cloud Infrastructure</span>
                  <span className="text-[#696358]">-$210.40</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Pull Back Guide Annotation as seen in reference */}
      <footer className="w-full py-4 px-8 flex justify-center items-center pointer-events-auto">
        <button
          onClick={onPullBack}
          className="group flex flex-col items-center gap-1.5 text-xs uppercase tracking-widest text-[#5c564c] hover:text-[#141414] transition-colors"
        >
          <div className="relative">
            <svg className="w-24 h-10 text-[#4a453e]" viewBox="0 0 100 40" fill="none">
              <path
                d="M 10 10 Q 50 35 90 20"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="3 3"
                fill="none"
              />
              <polygon points="90,20 82,15 84,25" fill="currentColor" />
            </svg>
          </div>
          <span className="font-medium text-[11px]">Pull back to explore more</span>
        </button>
      </footer>
    </div>
  );
};
