import React from "react";
import { Mail, Shield, Zap, Globe } from "lucide-react";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

export function WalletConnect() {
  const { setShowAuthFlow } = useDynamicContext();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-teal-950 flex flex-col items-center justify-center p-4">
      {/* Logo and Title */}
      <div className="flex flex-col items-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6">
          <Mail className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-5xl font-bold text-white mb-2 text-center">
          OmniPay{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">
            Pages
          </span>
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto text-center">
          Create fully customizable crypto checkout pages. Accept any token on
          any chain, receive USDC on your preferred network.
        </p>
      </div>

      {/* Features Section */}
      <div className="w-full max-w-4xl grid md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-10 border border-white/20 flex flex-col items-center text-center shadow-lg">
          <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-semibold text-white mb-2">
            Secure & Trustless
          </h3>
          <p className="text-cyan-200 text-base">
            Non-custodial payments directly to your wallet
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-10 border border-white/20 flex flex-col items-center text-center shadow-lg">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-4">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-semibold text-white mb-2">
            Cross-Chain Magic
          </h3>
          <p className="text-cyan-200 text-base">
            Accept any token, get USDC on your preferred chain
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-10 border border-white/20 flex flex-col items-center text-center shadow-lg">
          <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-4">
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
        className="mt-4 px-10 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white text-xl font-bold rounded-2xl shadow-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-cyan-400"
      >
        Get Started
      </button>
    </div>
  );
}
