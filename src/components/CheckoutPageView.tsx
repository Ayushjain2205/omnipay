import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { CheckoutPage } from "../types";
import { CheckoutPageDisplay } from "./CheckoutPageDisplay";

interface CheckoutPageViewProps {
  pageId: string;
  onBack: () => void;
}

export function CheckoutPageView({ pageId, onBack }: CheckoutPageViewProps) {
  const [page, setPage] = useState<CheckoutPage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPage = async () => {
      try {
        const { data, error } = await supabase
          .from("checkout_pages")
          .select("*")
          .eq("id", pageId)
          .single();

        if (error) throw error;

        if (data) {
          setPage({
            id: data.id,
            name: data.name,
            description: data.description,
            price: parseFloat(data.price),
            currency: data.currency,
            logo: data.logo,
            banner: data.banner,
            productImage: data.product_image,
            theme: data.theme,
            customColors: data.custom_colors,
            layout: data.layout,
            typography: data.typography,
            content: data.content,
            payoutChain: data.payout_chain,
            walletAddress: data.wallet_address,
            collectEmail: data.collect_email,
            collectNotes: data.collect_notes,
            collectShipping: data.collect_shipping,
            customFields: data.custom_fields,
            seo: data.seo,
            status: data.status,
            createdAt: data.created_at,
            updatedAt: data.updated_at,
          });
        }
      } catch (error) {
        console.error("Error loading checkout page:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPage();
  }, [pageId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading checkout page...</p>
        </div>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Page not found
          </h1>
          <p className="text-gray-600 mb-4">
            The checkout page you're looking for doesn't exist or is not
            published.
          </p>
          <button
            onClick={onBack}
            className="text-teal-600 hover:text-teal-700 font-medium"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  return <CheckoutPageDisplay page={page} isPreview={false} />;
}
