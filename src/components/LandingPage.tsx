import { useState } from 'react';
import { DollarSign, Loader2, ArrowRight } from 'lucide-react';
import StablecoinAnimation from './StablecoinAnimation';

interface LandingPageProps {
  onLogin: () => void;
}

export default function LandingPage({ onLogin }: LandingPageProps) {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = () => {
    setIsLoggingIn(true);
    // Simulate authentication delay
    setTimeout(() => {
      onLogin();
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0a1929] via-[#1a2f45] to-[#0a1929] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div> */}

      <div className="absolute top-8 right-8 z-10">
        <button
          onClick={handleLogin}
          disabled={isLoggingIn}
          className="text-white/90 hover:text-white transition-all flex items-center gap-2 text-sm font-medium hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoggingIn ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Connecting...
            </>
          ) : (
            <>
              <DollarSign className="w-4 h-4" />
              Sign In
            </>
          )}
        </button>
      </div>

      <div className="max-w-screen-2xl w-full grid lg:grid-cols-2 items-center relative z-10">
        <div className="space-y-8 animate-fade-in">
          <div className="inline-block">
            <span className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium border border-blue-500/30 animate-pulse-slow">
              🚀 Secure Payment Platform
            </span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight animate-fade-in">
            Manage your invoices
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 mt-2">
              with ease
            </span>
          </h1>
          <p className="text-lg text-white/70 leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Easily view and track unpaid invoices, stay organized, and ensure
            timely payment using stable coins (USDC - USDT)
          </p>
          <div className="flex flex-col sm:flex-row gap-4" style={{ animationDelay: '0.3s' }}>
            <button
              onClick={handleLogin}
              disabled={isLoggingIn}
              className="group bg-gradient-to-r from-[#6b9d3e] to-[#5a8534] hover:from-[#5a8534] hover:to-[#4a7324] text-white px-8 py-4 rounded-full font-semibold text-lg transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Connecting to your wallet...
                </>
              ) : (
                <>
                  Log in
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
          
          {/* Feature Pills */}
          <div className="flex flex-wrap gap-3 pt-4">
            <div className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full text-white/80 text-sm border border-white/10">
              ✓ Secure Transactions
            </div>
            <div className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full text-white/80 text-sm border border-white/10">
              ✓ Real-time Tracking
            </div>
            <div className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full text-white/80 text-sm border border-white/10">
              ✓ Multi-Currency Support
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="relative">
            <div className="absolute -inset-8 bg-gradient-to-r from-blue-500/20 to-green-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
            <StablecoinAnimation className="relative z-10" />
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoggingIn && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <Loader2 className="w-16 h-16 text-blue-400 animate-spin" />
                <div className="absolute inset-0 w-16 h-16 border-4 border-green-400/30 rounded-full animate-ping"></div>
              </div>
              <p className="text-white text-lg font-medium">Connecting to your wallet...</p>
              <p className="text-white/60 text-sm">Please wait a moment</p>
            </div>
          </div>
        </div>
      )}

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 text-sm animate-fade-in">
        Powered by Nation Wide Trust Finance, LLC
      </div>
    </div>
  );
}
