export interface CheckoutPage {
  id: string;
  user_id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  logo?: string;
  banner?: string;
  productImage?: string;
  theme: 'light' | 'dark' | 'custom';
  customColors?: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    accent: string;
  };
  layout: 'centered' | 'split' | 'minimal' | 'hero';
  typography: {
    headingFont: string;
    bodyFont: string;
    fontSize: 'small' | 'medium' | 'large';
  };
  content: {
    headline?: string;
    subheadline?: string;
    features?: string[];
    testimonial?: {
      text: string;
      author: string;
      role: string;
    };
    faq?: Array<{
      question: string;
      answer: string;
    }>;
  };
  payoutChain: string;
  walletAddress: string;
  collectEmail: boolean;
  collectNotes: boolean;
  collectShipping: boolean;
  customFields?: Array<{
    id: string;
    label: string;
    type: 'text' | 'email' | 'phone' | 'select' | 'textarea';
    required: boolean;
    options?: string[];
  }>;
  seo: {
    title: string;
    description: string;
    ogImage?: string;
  };
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  checkoutPageId: string;
  userId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'success' | 'failed';
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
}