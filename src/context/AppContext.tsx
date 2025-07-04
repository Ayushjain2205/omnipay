import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { CheckoutPage, Payment, User } from "../types";
import { supabase } from "../lib/supabase";
// import { User as SupabaseUser } from '@supabase/supabase-js';

interface AppContextType {
  walletAddress: string | null;
  setWalletAddress: (address: string | null) => void;
  checkoutPages: CheckoutPage[];
  payments: Payment[];
  loading: boolean;
  user: User | null;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  addCheckoutPage: (
    page: Omit<CheckoutPage, "id" | "createdAt" | "updatedAt">
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
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [checkoutPages, setCheckoutPages] = useState<CheckoutPage[]>([]);
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: "pay_1",
      checkoutPageId: "page_1",
      userId: "user_1",
      amount: 120.5,
      currency: "USD",
      status: "success",
      txHash: "0xabc123def4567890abc123def4567890abc123de",
      buyerEmail: "alice@example.com",
      notes: "First order",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
      paymentMethod: "USDC",
      fromChain: "Ethereum",
      toChain: "Polygon",
    },
    {
      id: "pay_2",
      checkoutPageId: "page_2",
      userId: "user_2",
      amount: 75.0,
      currency: "USD",
      status: "success",
      txHash: "0xdef456abc1237890def456abc1237890def456ab",
      buyerEmail: "bob@example.com",
      notes: "",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      paymentMethod: "USDC",
      fromChain: "Arbitrum",
      toChain: "Polygon",
    },
    {
      id: "pay_3",
      checkoutPageId: "page_1",
      userId: "user_3",
      amount: 200.0,
      currency: "USD",
      status: "pending",
      txHash: undefined,
      buyerEmail: "carol@example.com",
      notes: "",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
      paymentMethod: "USDC",
      fromChain: "Polygon",
      toChain: "Polygon",
    },
    {
      id: "pay_4",
      checkoutPageId: "page_3",
      userId: "user_4",
      amount: 50.0,
      currency: "USD",
      status: "failed",
      txHash: undefined,
      buyerEmail: "dave@example.com",
      notes: "",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
      paymentMethod: "USDC",
      fromChain: "Optimism",
      toChain: "Polygon",
    },
    {
      id: "pay_5",
      checkoutPageId: "page_2",
      userId: "user_5",
      amount: 300.0,
      currency: "USD",
      status: "success",
      txHash: "0x7890abc123def4567890abc123def4567890abcd",
      buyerEmail: "eve@example.com",
      notes: "VIP customer",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      paymentMethod: "USDC",
      fromChain: "Ethereum",
      toChain: "Polygon",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Fetch all checkout pages from the database, not just for the current wallet
  useEffect(() => {
    setLoading(true);
    supabase
      .from("checkout_pages")
      .select("*")
      .then(({ data, error }) => {
        if (!error && data) {
          setCheckoutPages(data);
        }
        setLoading(false);
      });
  }, []);

  // Fetch user profile from the database when walletAddress changes
  useEffect(() => {
    if (!walletAddress) {
      setUser(null);
      return;
    }
    setLoading(true);
    supabase
      .from("users")
      .select("*")
      .eq("wallet_address", walletAddress)
      .single()
      .then(({ data, error }) => {
        if (!error && data) {
          setUser(data);
        }
        setLoading(false);
      });
  }, [walletAddress]);

  // All auth functions are now no-ops
  const signInWithEmail = async () => {};
  const signUpWithEmail = async () => {};
  const signOut = async () => {};

  // Replace addCheckoutPage with full insert
  const addCheckoutPage = async (
    page: Omit<CheckoutPage, "id" | "createdAt" | "updatedAt">
  ) => {
    if (!walletAddress) {
      console.error("Cannot create page: walletAddress is not set.");
      return;
    }
    // Only send required fields for insert
    const insertObj = {
      name: page.name,
      wallet_address: walletAddress,
      price: page.price,
      description: page.description,
      currency: page.currency,
      status: page.status,
      collect_email: page.collectEmail ?? false,
      // Use logo for both logo and product_image for now
      logo: page.logo,
      product_image: page.logo,
      // collect_notes: page.collectNotes ?? false,
      // collect_shipping: page.collectShipping ?? false,
    };
    const { data, error } = await supabase
      .from("checkout_pages")
      .insert([insertObj])
      .select();
    if (error) {
      console.error("Error inserting checkout page:", error);
      return;
    }
    if (data) {
      setCheckoutPages((prev) => [
        ...prev,
        transformCheckoutPageFromDB(data[0]),
      ]);
    }
  };

  // Update checkout page
  const updateCheckoutPage = async (
    id: string,
    updates: Partial<CheckoutPage>
  ) => {
    const dbUpdates = transformCheckoutPageToDB(updates);
    const { data, error } = await supabase
      .from("checkout_pages")
      .update(dbUpdates)
      .eq("id", id)
      .select();
    if (!error && data) {
      setCheckoutPages((prev) =>
        prev.map((p) =>
          p.id === id ? transformCheckoutPageFromDB(data[0]) : p
        )
      );
    }
  };

  // Delete checkout page by id only
  const deleteCheckoutPage = async (id: string) => {
    const { error } = await supabase
      .from("checkout_pages")
      .delete()
      .eq("id", id);
    if (!error) {
      setCheckoutPages((prev) => prev.filter((p) => p.id !== id));
    }
  };

  // The rest of the context functions can remain as stubs or no-ops
  const addPayment = async () => {};
  const getCheckoutPage = () => undefined;
  const updateUserProfile = async (updates: Partial<User>) => {
    if (!walletAddress) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("users")
      .update(updates)
      .eq("wallet_address", walletAddress)
      .select();
    if (!error && data && data[0]) {
      setUser(data[0]);
    }
    setLoading(false);
  };

  return (
    <AppContext.Provider
      value={{
        walletAddress,
        setWalletAddress,
        checkoutPages,
        payments,
        loading,
        user,
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
    name: appPage.name,
    description: appPage.description,
    price: appPage.price,
    currency: appPage.currency,
    logo: appPage.logo,
    banner: appPage.banner,
    product_image: appPage.product_image,
    theme: appPage.theme,
    custom_colors: appPage.custom_colors,
    layout: appPage.layout,
    typography: appPage.typography,
    content: appPage.content,
    payout_chain: appPage.payout_chain,
    wallet_address: appPage.wallet_address,
    collect_email: appPage.collect_email,
    collect_notes: appPage.collect_notes,
    collect_shipping: appPage.collect_shipping,
    custom_fields: appPage.custom_fields,
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
