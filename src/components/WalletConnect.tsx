import React from "react";
import { Wallet, Shield, Zap, Globe } from "lucide-react";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

export function WalletConnect() {
  const { setShowAuthFlow } = useDynamicContext();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-teal-950 flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Halo Effect */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[420px] h-[320px] bg-cyan-400 opacity-30 rounded-full blur-3xl z-0" />
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[320px] h-[180px] bg-blue-500 opacity-20 rounded-full blur-2xl z-0" />
      {/* Main Content */}
      <div className="flex flex-col items-center mb-12 z-10">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-teal-600 to-blue-600 rounded-2xl shadow-lg mb-6">
          <Wallet className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-5xl font-extrabold text-white mb-3 text-center tracking-tight drop-shadow-lg">
          OmniPay
        </h1>
        <p className="text-2xl text-cyan-100 max-w-2xl mx-auto text-center font-medium mb-2">
          The easiest way to accept crypto payments, anywhere.
        </p>
        <p className="text-lg text-cyan-200 max-w-2xl mx-auto text-center">
          Create fully customizable checkout pages. Accept any token on any
          chain, receive USDC on your preferred network.
        </p>
      </div>

      {/* Features Section */}
      <div className="w-full max-w-4xl grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-10 border border-white/20 flex flex-col items-center text-center shadow-xl hover:scale-105 transition-transform">
          <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4 shadow-md">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-semibold text-white mb-2">
            Secure & Trustless
          </h3>
          <p className="text-cyan-200 text-base">
            Non-custodial payments directly to your wallet
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-10 border border-white/20 flex flex-col items-center text-center shadow-xl hover:scale-105 transition-transform">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-4 shadow-md">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-semibold text-white mb-2">
            Cross-Chain Magic
          </h3>
          <p className="text-cyan-200 text-base">
            Accept any token, get USDC on your preferred chain
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-10 border border-white/20 flex flex-col items-center text-center shadow-xl hover:scale-105 transition-transform">
          <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-4 shadow-md">
            <Globe className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-semibold text-white mb-2">
            Global Reach
          </h3>
          <p className="text-cyan-200 text-base">
            Support for 50+ chains and 1000+ tokens
          </p>
        </div>
      </div>

      {/* Get Started Button */}
      <button
        onClick={() => setShowAuthFlow(true)}
        className="mt-2 px-12 py-5 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white text-2xl font-bold rounded-2xl shadow-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-cyan-400"
      >
        Get Started
      </button>
    </div>
  );
}

// Add custom animation classes to your CSS (e.g., in index.css or tailwind.config.js):
// .animate-pulse-slow { animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
// .animate-pulse-slower { animation: pulse 12s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
