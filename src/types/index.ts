export interface CheckoutPage {
  id: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
  logo?: string;
  banner?: string;
  productImage?: string;
  theme?: string;
  customColors?: any;
  layout?: string;
  typography?: any;
  content?: any;
  payoutChain?: string;
  walletAddress: string;
  collectEmail?: boolean;
  collectNotes?: boolean;
  collectShipping?: boolean;
  customFields?: any;
  seo?: any;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Payment {
  id: string;
  checkoutPageId: string;
  userId: string;
  amount: number;
  currency: string;
  status: "pending" | "success" | "failed";
  txHash?: string;
  buyerEmail?: string;
  notes?: string;
  shippingAddress?: {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  customFieldData?: Record<string, string>;
  createdAt: string;
  paymentMethod: string;
  fromChain: string;
  toChain: string;
}

export interface User {
  id: string;
  walletAddress: string;
  email?: string;
  businessName?: string;
  website?: string;
  description?: string;
  connectedAt: string;
  logo?: string;
  banner?: string;
}
