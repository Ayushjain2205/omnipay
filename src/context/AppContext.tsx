import React, { createContext, useContext, ReactNode, useState } from "react";
import { CheckoutPage, Payment, User } from "../types";
// import { supabase } from '../lib/supabase';
// import { User as SupabaseUser } from '@supabase/supabase-js';

interface AppContextType {
  user: User | null;
  supabaseUser: any; // No longer used
  checkoutPages: CheckoutPage[];
  payments: Payment[];
  loading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  addCheckoutPage: (
    page: Omit<CheckoutPage, "id" | "user_id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  updateCheckoutPage: (
    id: string,
    updates: Partial<CheckoutPage>
  ) => Promise<void>;
  deleteCheckoutPage: (id: string) => Promise<void>;
  addPayment: (payment: Omit<Payment, "id" | "createdAt">) => Promise<void>;
  getCheckoutPage: (id: string) => CheckoutPage | undefined;
  updateUserProfile: (updates: Partial<User>) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  // Always provide a mock user and set loading to false
  const [user] = useState<User>({
    id: "mock-user-id",
    walletAddress: "0xMOCKADDRESS",
    email: "mock@example.com",
    businessName: "Mock Business",
    website: "https://mock.com",
    description: "This is a mock user.",
    connectedAt: new Date().toISOString(),
  });
  const [checkoutPages, setCheckoutPages] = useState<CheckoutPage[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading] = useState(false);

  // All auth functions are now no-ops
  const signInWithEmail = async () => {};
  const signUpWithEmail = async () => {};
  const signOut = async () => {};

  // The rest of the context functions can remain as stubs or no-ops
  const addCheckoutPage = async () => {};
  const updateCheckoutPage = async () => {};
  const deleteCheckoutPage = async () => {};
  const addPayment = async () => {};
  const getCheckoutPage = () => undefined;
  const updateUserProfile = async () => {};

  return (
    <AppContext.Provider
      value={{
        user,
        supabaseUser: null,
        checkoutPages,
        payments,
        loading,
        signInWithEmail,
        signUpWithEmail,
        signOut,
        addCheckoutPage,
        updateCheckoutPage,
        deleteCheckoutPage,
        addPayment,
        getCheckoutPage,
        updateUserProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}

// Helper functions to transform data between app types and database types
function transformCheckoutPageFromDB(dbPage: any): CheckoutPage {
  return {
    id: dbPage.id,
    user_id: dbPage.user_id,
    name: dbPage.name,
    description: dbPage.description,
    price: parseFloat(dbPage.price),
    currency: dbPage.currency,
    logo: dbPage.logo,
    banner: dbPage.banner,
    productImage: dbPage.product_image,
    theme: dbPage.theme,
    customColors: dbPage.custom_colors,
    layout: dbPage.layout,
    typography: dbPage.typography,
    content: dbPage.content,
    payoutChain: dbPage.payout_chain,
    walletAddress: dbPage.wallet_address,
    collectEmail: dbPage.collect_email,
    collectNotes: dbPage.collect_notes,
    collectShipping: dbPage.collect_shipping,
    customFields: dbPage.custom_fields,
    seo: dbPage.seo,
    status: dbPage.status,
    createdAt: dbPage.created_at,
    updatedAt: dbPage.updated_at,
  };
}

function transformCheckoutPageToDB(appPage: any) {
  return {
    id: appPage.id,
    user_id: appPage.user_id,
    name: appPage.name,
    description: appPage.description,
    price: appPage.price,
    currency: appPage.currency,
    logo: appPage.logo,
    banner: appPage.banner,
    product_image: appPage.productImage,
    theme: appPage.theme,
    custom_colors: appPage.customColors,
    layout: appPage.layout,
    typography: appPage.typography,
    content: appPage.content,
    payout_chain: appPage.payoutChain,
    wallet_address: appPage.walletAddress,
    collect_email: appPage.collectEmail,
    collect_notes: appPage.collectNotes,
    collect_shipping: appPage.collectShipping,
    custom_fields: appPage.customFields,
    seo: appPage.seo,
    status: appPage.status,
  };
}

function transformPaymentFromDB(dbPayment: any): Payment {
  return {
    id: dbPayment.id,
    checkoutPageId: dbPayment.checkout_page_id,
    userId: dbPayment.user_id,
    amount: parseFloat(dbPayment.amount),
    currency: dbPayment.currency,
    status: dbPayment.status,
    txHash: dbPayment.tx_hash,
    buyerEmail: dbPayment.buyer_email,
    notes: dbPayment.notes,
    shippingAddress: dbPayment.shipping_address,
    customFieldData: dbPayment.custom_field_data,
    paymentMethod: dbPayment.payment_method,
    fromChain: dbPayment.from_chain,
    toChain: dbPayment.to_chain,
    createdAt: dbPayment.created_at,
  };
}

function transformPaymentToDB(appPayment: any) {
  return {
    checkout_page_id: appPayment.checkoutPageId,
    user_id: appPayment.userId,
    amount: appPayment.amount,
    currency: appPayment.currency,
    status: appPayment.status,
    tx_hash: appPayment.txHash,
    buyer_email: appPayment.buyerEmail,
    notes: appPayment.notes,
    shipping_address: appPayment.shippingAddress,
    custom_field_data: appPayment.customFieldData,
    payment_method: appPayment.paymentMethod,
    from_chain: appPayment.fromChain,
    to_chain: appPayment.toChain,
  };
}
