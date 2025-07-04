import React, { useState } from "react";
import { User, Save, Wallet, Copy as CopyIcon } from "lucide-react";
import { useApp } from "../context/AppContext";

export function UserProfile() {
  const { user, updateUserProfile, walletAddress } = useApp();
  const [formData, setFormData] = useState({
    businessName: user?.businessName || "",
    email: user?.email || "",
    website: user?.website || "",
    description: user?.description || "",
    logo: user?.logo || "https://cdn-icons-png.flaticon.com/512/846/846423.png",
    banner:
      user?.banner ||
      "https://img.freepik.com/free-vector/ombre-blue-curve-light-blue-background_53876-173299.jpg?semt=ais_hybrid&w=740",
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await updateUserProfile(formData);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start p-8 bg-gray-50">
      <div className="w-full max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Profile Settings
          </h1>
          <p className="text-gray-600">
            Manage your account information and preferences
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-teal-600 to-blue-600 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Account Information
              </h2>
              <p className="text-gray-500">Update your profile details</p>
            </div>
          </div>

          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Wallet className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Connected Wallet
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-base font-mono text-blue-700 bg-blue-50 px-2 py-1 rounded">
                    {user?.walletAddress || walletAddress || "Not connected"}
                  </span>
                  {(user?.walletAddress || walletAddress) && (
                    <button
                      type="button"
                      className="text-blue-600 hover:text-blue-800 px-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          user?.walletAddress || walletAddress || ""
                        );
                      }}
                      title="Copy address"
                    >
                      <CopyIcon className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Name
              </label>
              <input
                type="text"
                value={formData.businessName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    businessName: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="Your business or personal name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="your@email.com"
              />
              <p className="text-xs text-gray-500 mt-1">
                Used for payment notifications and receipts
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, website: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="https://your-website.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
                rows={4}
                placeholder="Tell us about your business or what you're selling..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Logo URL
              </label>
              <input
                type="url"
                value={formData.logo}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, logo: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="https://cdn-icons-png.flaticon.com/512/846/846423.png"
              />
              <div className="mt-2">
                <img
                  src={formData.logo}
                  alt="Logo Preview"
                  className="h-12 w-auto rounded bg-gray-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Banner URL
              </label>
              <input
                type="url"
                value={formData.banner}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, banner: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="https://img.freepik.com/free-vector/ombre-blue-curve-light-blue-background_53876-173299.jpg?semt=ais_hybrid&w=740"
              />
              <div className="mt-2">
                <img
                  src={formData.banner}
                  alt="Banner Preview"
                  className="h-16 w-full object-cover rounded bg-gray-100"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              {saved && (
                <div className="text-green-600 text-sm font-medium">
                  Profile updated successfully!
                </div>
              )}
              <button
                type="submit"
                disabled={saving}
                className="ml-auto px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Account Statistics
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-teal-600">
                {user ? new Date(user.connectedAt).toLocaleDateString() : "-"}
              </div>
              <div className="text-sm text-gray-500">Member Since</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">Active</div>
              <div className="text-sm text-gray-500">Account Status</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
