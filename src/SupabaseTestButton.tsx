import React from "react";
import { supabase } from "./lib/supabase";

export function SupabaseTestButton() {
  const handleTestInsert = async () => {
    const { data, error } = await supabase
      .from("checkout_pages")
      .insert([{ name: "Test Page", wallet_address: "0x123" }])
      .select();

    if (error) {
      alert("Error: " + error.message);
      console.error(error);
    } else {
      alert("Success! Check console for data.");
      console.log(data);
    }
  };

  return (
    <button
      onClick={handleTestInsert}
      style={{
        padding: "1rem",
        background: "teal",
        color: "white",
        borderRadius: "8px",
        margin: "2rem",
      }}
    >
      Test Supabase Insert
    </button>
  );
}
