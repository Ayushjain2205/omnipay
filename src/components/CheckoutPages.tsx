import React, { useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Copy,
  Settings,
  QrCode,
  Share,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { CheckoutPage } from "../types";
import { supabase } from "../lib/supabase";
import toast from "react-hot-toast";

interface CheckoutPagesProps {
  onViewChange: (view: string, data?: any) => void;
}

export function CheckoutPages({ onViewChange }: CheckoutPagesProps) {
  const { checkoutPages, deleteCheckoutPage } = useApp();
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleCreatePage = () => {
    setShowCreateForm(true);
  };

  const handleEditPage = (page: CheckoutPage) => {
    onViewChange("page-builder", page);
  };

  const handleDeletePage = async (id: string) => {
    await deleteCheckoutPage(id);
    toast.success("Page deleted");
  };

  const copyPaymentLink = (pageId: string) => {
    const link = `${window.location.origin}/checkout/${pageId}`;
    navigator.clipboard.writeText(link);
    toast.success("Payment link copied!");
  };

  const generateQR = (pageId: string) => {
    // In a real app, this would generate a QR code
    alert(`QR code for page ${pageId} would be generated here`);
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Checkout Pages
          </h1>
          <p className="text-gray-600">
            Create and manage your crypto payment pages
          </p>
        </div>
        <button
          onClick={handleCreatePage}
          className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-teal-700 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Create Page</span>
        </button>
      </div>

      {checkoutPages.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Plus className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No checkout pages yet
          </h3>
          <p className="text-gray-500 mb-6">
            Create your first checkout page to start accepting crypto payments
          </p>
          <button
            onClick={handleCreatePage}
            className="bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
          >
            Create your first page
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {checkoutPages.map((page) => (
            <div
              key={page.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Page Preview */}
              <div className="h-24 bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden">
                {page.banner ? (
                  <img
                    src={page.banner}
                    alt="Banner"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100" />
                )}
                {page.logo && (
                  <div className="absolute top-2 left-2">
                    <img
                      src={page.logo}
                      alt="Logo"
                      className="h-6 w-auto bg-white rounded p-1"
                    />
                  </div>
                )}
                <div className="absolute bottom-2 right-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      page.status === "published"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {page.status}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {page.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                      {page.description}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="font-medium text-lg text-blue-600">
                        ${page.price}
                      </span>
                      <span className="text-xs text-gray-400">
                        {page.customFields?.length || 0} custom fields
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEditPage(page)}
                      className="text-gray-400 hover:text-teal-600 transition-colors"
                      title="Edit page"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => copyPaymentLink(page.id)}
                      className="text-gray-400 hover:text-green-600 transition-colors"
                      title="Copy payment link"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => generateQR(page.id)}
                      className="text-gray-400 hover:text-purple-600 transition-colors"
                      title="Generate QR code"
                    >
                      <QrCode className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() =>
                        window.open(`/checkout/${page.id}`, "_blank")
                      }
                      className="text-gray-400 hover:text-teal-600 transition-colors"
                      title="Preview page"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => handleDeletePage(page.id)}
                    className="text-gray-400 hover:text-red-600 transition-colors"
                    title="Delete page"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showCreateForm && (
        <CreatePageModal
          onClose={() => setShowCreateForm(false)}
          onViewChange={onViewChange}
        />
      )}
    </div>
  );
}

function CreatePageModal({
  onClose,
  onViewChange,
}: {
  onClose: () => void;
  onViewChange: (view: string, data?: any) => void;
}) {
  const { addCheckoutPage, walletAddress } = useApp();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    payoutChain: "ethereum",
    walletAddress: walletAddress || "",
  });

  // Update wallet address in form if it changes in context
  React.useEffect(() => {
    setFormData((prev) => ({ ...prev, walletAddress: walletAddress || "" }));
  }, [walletAddress]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newPage = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      currency: "USD",
      theme: "light" as const,
      layout: "centered" as const,
      typography: {
        headingFont: "Inter",
        bodyFont: "Inter",
        fontSize: "medium" as const,
      },
      content: {
        headline: "",
        subheadline: "",
        features: [],
        faq: [],
      },
      payoutChain: formData.payoutChain,
      walletAddress: formData.walletAddress,
      collectEmail: false,
      collectNotes: false,
      collectShipping: false,
      customFields: [],
      seo: {
        title: formData.name,
        description: formData.description,
      },
      status: "draft" as const,
    };

    addCheckoutPage(newPage);
    onClose();

    // Navigate to page builder for the new page
    setTimeout(() => {
      onViewChange("page-builder", newPage);
    }, 100);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Create Checkout Page
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price (USD) *
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, price: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              required
            />
          </div>

          <div className="omnipay-dropdown">
            <select
              value={formData.payoutChain}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  payoutChain: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="ethereum">Ethereum</option>
              <option value="polygon">Polygon</option>
              <option value="arbitrum">Arbitrum</option>
              <option value="optimism">Optimism</option>
              <option value="bsc">BSC</option>
              <option value="avalanche">Avalanche</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Wallet Address *
            </label>
            <input
              type="text"
              value={formData.walletAddress}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  walletAddress: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="0x..."
              required
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              Create Page
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
