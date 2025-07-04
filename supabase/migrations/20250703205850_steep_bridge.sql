/*
  # Create OmniPay Pages Database Schema

  1. New Tables
    - `users`
      - `id` (uuid, primary key, references auth.users)
      - `wallet_address` (text, unique)
      - `email` (text)
      - `business_name` (text)
      - `website` (text)
      - `description` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `checkout_pages`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to users)
      - `name` (text)
      - `description` (text)
      - `price` (decimal)
      - `currency` (text)
      - `logo` (text)
      - `banner` (text)
      - `product_image` (text)
      - `theme` (text)
      - `custom_colors` (jsonb)
      - `layout` (text)
      - `typography` (jsonb)
      - `content` (jsonb)
      - `payout_chain` (text)
      - `wallet_address` (text)
      - `collect_email` (boolean)
      - `collect_notes` (boolean)
      - `collect_shipping` (boolean)
      - `custom_fields` (jsonb)
      - `seo` (jsonb)
      - `status` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `payments`
      - `id` (uuid, primary key)
      - `checkout_page_id` (uuid, foreign key to checkout_pages)
      - `user_id` (uuid, foreign key to users)
      - `amount` (decimal)
      - `currency` (text)
      - `status` (text)
      - `tx_hash` (text)
      - `buyer_email` (text)
      - `notes` (text)
      - `shipping_address` (jsonb)
      - `custom_field_data` (jsonb)
      - `payment_method` (text)
      - `from_chain` (text)
      - `to_chain` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Add policies for public access to published checkout pages
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  wallet_address text UNIQUE NOT NULL,
  email text,
  business_name text,
  website text,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create checkout_pages table
CREATE TABLE IF NOT EXISTS checkout_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  description text DEFAULT '',
  price decimal(10,2) NOT NULL DEFAULT 0,
  currency text DEFAULT 'USD',
  logo text,
  banner text,
  product_image text,
  theme text DEFAULT 'light',
  custom_colors jsonb,
  layout text DEFAULT 'centered',
  typography jsonb DEFAULT '{"headingFont": "Inter", "bodyFont": "Inter", "fontSize": "medium"}',
  content jsonb DEFAULT '{"headline": "", "subheadline": "", "features": [], "faq": []}',
  payout_chain text DEFAULT 'ethereum',
  wallet_address text NOT NULL,
  collect_email boolean DEFAULT false,
  collect_notes boolean DEFAULT false,
  collect_shipping boolean DEFAULT false,
  custom_fields jsonb DEFAULT '[]',
  seo jsonb DEFAULT '{"title": "", "description": ""}',
  status text DEFAULT 'draft',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  checkout_page_id uuid REFERENCES checkout_pages(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  amount decimal(10,2) NOT NULL,
  currency text DEFAULT 'USD',
  status text DEFAULT 'pending',
  tx_hash text,
  buyer_email text,
  notes text,
  shipping_address jsonb,
  custom_field_data jsonb,
  payment_method text NOT NULL,
  from_chain text NOT NULL,
  to_chain text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE checkout_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own data"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Checkout pages policies
CREATE POLICY "Users can manage own checkout pages"
  ON checkout_pages
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view published checkout pages"
  ON checkout_pages
  FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

-- Payments policies
CREATE POLICY "Users can view own payments"
  ON payments
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create payments for published pages"
  ON payments
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM checkout_pages 
      WHERE id = checkout_page_id 
      AND status = 'published'
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_checkout_pages_user_id ON checkout_pages(user_id);
CREATE INDEX IF NOT EXISTS idx_checkout_pages_status ON checkout_pages(status);
CREATE INDEX IF NOT EXISTS idx_payments_checkout_page_id ON payments(checkout_page_id);
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_checkout_pages_updated_at
  BEFORE UPDATE ON checkout_pages
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();