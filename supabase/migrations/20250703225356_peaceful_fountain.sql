/*
  # Update users table to make wallet_address optional

  1. Changes
    - Make wallet_address nullable in users table
    - Update existing constraint to allow empty wallet addresses

  2. Security
    - Maintain existing RLS policies
*/

-- Make wallet_address nullable and remove unique constraint temporarily
ALTER TABLE users ALTER COLUMN wallet_address DROP NOT NULL;
DROP INDEX IF EXISTS users_wallet_address_key;

-- Add a new unique constraint that allows nulls but prevents duplicate non-null values
CREATE UNIQUE INDEX users_wallet_address_key ON users (wallet_address) WHERE wallet_address IS NOT NULL AND wallet_address != '';