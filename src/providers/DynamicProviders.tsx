import React from "react";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { WagmiProvider, createConfig } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { mainnet } from "wagmi/chains";
import { http } from "wagmi";

const wagmiConfig = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
});

const queryClient = new QueryClient();

export function DynamicProviders({ children }: { children: React.ReactNode }) {
  return (
    <DynamicContextProvider
      settings={{
        mobileExperience: "redirect",
        environmentId: import.meta.env.VITE_DYNAMIC_ENVIRONMENT_ID!,
        walletConnectors: [EthereumWalletConnectors],
        appName: "Omnipay",
      }}
    >
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>{children}</DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  );
}
