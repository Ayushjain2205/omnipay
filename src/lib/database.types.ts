export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          wallet_address: string;
          email: string | null;
          business_name: string | null;
          website: string | null;
          description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          wallet_address: string;
          email?: string | null;
          business_name?: string | null;
          website?: string | null;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          wallet_address?: string;
          email?: string | null;
          business_name?: string | null;
          website?: string | null;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      checkout_pages: {
        Row: {
          id: string;
          name: string;
          description: string;
          price: number;
          currency: string;
          logo: string | null;
          banner: string | null;
          product_image: string | null;
          theme: string;
          custom_colors: Json | null;
          layout: string;
          typography: Json;
          content: Json;
          payout_chain: string;
          wallet_address: string;
          collect_email: boolean;
          collect_notes: boolean;
          collect_shipping: boolean;
          custom_fields: Json;
          seo: Json;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string;
          price?: number;
          currency?: string;
          logo?: string | null;
          banner?: string | null;
          product_image?: string | null;
          theme?: string;
          custom_colors?: Json | null;
          layout?: string;
          typography?: Json;
          content?: Json;
          payout_chain?: string;
          wallet_address: string;
          collect_email?: boolean;
          collect_notes?: boolean;
          collect_shipping?: boolean;
          custom_fields?: Json;
          seo?: Json;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          price?: number;
          currency?: string;
          logo?: string | null;
          banner?: string | null;
          product_image?: string | null;
          theme?: string;
          custom_colors?: Json | null;
          layout?: string;
          typography?: Json;
          content?: Json;
          payout_chain?: string;
          wallet_address?: string;
          collect_email?: boolean;
          collect_notes?: boolean;
          collect_shipping?: boolean;
          custom_fields?: Json;
          seo?: Json;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      payments: {
        Row: {
          id: string;
          checkout_page_id: string;
          user_id: string;
          amount: number;
          currency: string;
          status: string;
          tx_hash: string | null;
          buyer_email: string | null;
          notes: string | null;
          shipping_address: Json | null;
          custom_field_data: Json | null;
          payment_method: string;
          from_chain: string;
          to_chain: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          checkout_page_id: string;
          user_id: string;
          amount: number;
          currency?: string;
          status?: string;
          tx_hash?: string | null;
          buyer_email?: string | null;
          notes?: string | null;
          shipping_address?: Json | null;
          custom_field_data?: Json | null;
          payment_method: string;
          from_chain: string;
          to_chain: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          checkout_page_id?: string;
          user_id?: string;
          amount?: number;
          currency?: string;
          status?: string;
          tx_hash?: string | null;
          buyer_email?: string | null;
          notes?: string | null;
          shipping_address?: Json | null;
          custom_field_data?: Json | null;
          payment_method?: string;
          from_chain?: string;
          to_chain?: string;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
