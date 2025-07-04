/*
  # Update users table to make wallet_address optional

  1. Changes
    - Make wallet_address column nullable
    - Update unique constraint to allow nulls but prevent duplicate non-null values

  2. Security
    - Maintain existing RLS policies
    - Preserve data integrity with partial unique constraint
*/

-- Make wallet_address nullable and drop the unique constraint
ALTER TABLE users ALTER COLUMN wallet_address DROP NOT NULL;
ALTER TABLE users DROP CONSTRAINT IF EXISTS users_wallet_address_key;

-- Add a new unique constraint that allows nulls but prevents duplicate non-null values
CREATE UNIQUE INDEX users_wallet_address_key ON users (wallet_address) WHERE wallet_address IS NOT NULL AND wallet_address != '';