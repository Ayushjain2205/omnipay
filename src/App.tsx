import React, { useState } from "react";
import { AppProvider } from "./context/AppContext";
import { Layout } from "./components/Layout";
import { WalletConnect } from "./components/WalletConnect";
import { Dashboard } from "./components/Dashboard";
import { CheckoutPages } from "./components/CheckoutPages";
import { PageBuilder } from "./components/PageBuilder";
import { CheckoutPageView } from "./components/CheckoutPageView";
import { Analytics } from "./components/Analytics";
import { UserProfile } from "./components/UserProfile";
import { useAccount } from "wagmi";
import WalletSyncer from "./components/WalletSyncer";

function AppContent() {
  const { isConnected, isConnecting } = useAccount();
  const [currentView, setCurrentView] = useState<string>("dashboard");
  const [viewData, setViewData] = useState<any>(null);

  const handleViewChange = (view: string, data?: any) => {
    setCurrentView(view);
    setViewData(data);
  };

  // Handle checkout page routing
  const checkoutMatch = window.location.pathname.match(/^\/checkout\/(.+)$/);
  if (checkoutMatch) {
    const pageId = checkoutMatch[1];
    return (
      <CheckoutPageView pageId={pageId} onBack={() => window.history.back()} />
    );
  }

  if (isConnecting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-teal-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Connecting wallet...</p>
        </div>
      </div>
    );
  }

  if (!isConnected) {
    return <WalletConnect />;
  }

  return (
    <Layout currentView={currentView} onViewChange={handleViewChange}>
      {currentView === "dashboard" && (
        <Dashboard onViewChange={handleViewChange} />
      )}
      {currentView === "pages" && (
        <CheckoutPages onViewChange={handleViewChange} />
      )}
      {currentView === "page-builder" && (
        <PageBuilder onViewChange={handleViewChange} initialPage={viewData} />
      )}
      {currentView === "analytics" && <Analytics />}
      {currentView === "profile" && <UserProfile />}
    </Layout>
  );
}

function App() {
  return (
    <AppProvider>
      <WalletSyncer />
      <AppContent />
    </AppProvider>
  );
}

export default App;
