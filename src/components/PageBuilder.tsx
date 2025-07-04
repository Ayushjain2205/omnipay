import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Save,
  Eye,
  Palette,
  Type,
  Layout,
  Settings,
  Globe,
  Plus,
  Trash2,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { CheckoutPage } from "../types";
import { CheckoutPageDisplay } from "./CheckoutPageDisplay";

interface PageBuilderProps {
  onViewChange: (view: string) => void;
  initialPage?: CheckoutPage;
}

export function PageBuilder({ onViewChange, initialPage }: PageBuilderProps) {
  const { updateCheckoutPage, addCheckoutPage } = useApp();
  const [currentPage, setCurrentPage] = useState<CheckoutPage>(
    initialPage || {
      id: "",
      name: "My Product",
      description: "Product description",
      price: 99.99,
      currency: "USD",
      theme: "light",
      layout: "centered",
      typography: {
        headingFont: "Inter",
        bodyFont: "Inter",
        fontSize: "medium",
      },
      content: {
        headline: "",
        subheadline: "",
        features: [],
        faq: [],
      },
      payoutChain: "ethereum",
      walletAddress: "",
      collectEmail: false,
      collectNotes: false,
      collectShipping: false,
      customFields: [],
      seo: {
        title: "",
        description: "",
      },
      status: "draft",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  );

  const [activeTab, setActiveTab] = useState<
    "design" | "content" | "fields" | "settings"
  >("design");

  const handleSave = () => {
    if (initialPage) {
      updateCheckoutPage(initialPage.id, currentPage);
    } else {
      addCheckoutPage(currentPage);
    }
    onViewChange("pages");
  };

  const handlePublish = () => {
    const updatedPage = { ...currentPage, status: "published" as const };
    setCurrentPage(updatedPage);

    if (initialPage) {
      updateCheckoutPage(initialPage.id, updatedPage);
    } else {
      addCheckoutPage(updatedPage);
    }
    onViewChange("pages");
  };

  const tabs = [
    { id: "design", label: "Design", icon: Palette },
    { id: "content", label: "Content", icon: Type },
    { id: "fields", label: "Form Fields", icon: Layout },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onViewChange("pages")}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                Page Builder
              </h1>
              <p className="text-sm text-gray-500">{currentPage.name}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() =>
                window.open(
                  `/checkout/${currentPage.id || "preview"}`,
                  "_blank"
                )
              }
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2"
            >
              <Eye className="w-4 h-4" />
              <span>Preview</span>
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Draft</span>
            </button>
            <button
              onClick={handlePublish}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center space-x-2"
            >
              <Globe className="w-4 h-4" />
              <span>Publish</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex omnipay-form">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto omnipay-panel">
          <div className="p-4">
            <div className="flex space-x-1 mb-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 flex flex-col items-center space-y-1 px-2 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? "bg-teal-100 text-teal-700"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-xs font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {activeTab === "design" && (
              <DesignPanel
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            )}
            {activeTab === "content" && (
              <ContentPanel
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            )}
            {activeTab === "fields" && (
              <FieldsPanel
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            )}
            {activeTab === "settings" && (
              <SettingsPanel
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            )}
          </div>
        </div>

        {/* Main Content - Live Preview */}
        <div className="flex-1 p-8 overflow-y-auto bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="border border-gray-200 rounded-xl overflow-hidden shadow-lg">
              <div className="bg-gray-100 px-4 py-2 flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <div className="flex-1 text-center text-sm text-gray-600">
                  omnipay.com/checkout/{currentPage.id || "preview"}
                </div>
              </div>

              <CheckoutPageDisplay page={currentPage} isPreview={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DesignPanel({
  currentPage,
  setCurrentPage,
}: {
  currentPage: CheckoutPage;
  setCurrentPage: (page: CheckoutPage) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Layout Style</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            {
              id: "centered",
              name: "Centered",
              desc: "Classic centered layout",
            },
            { id: "split", name: "Split", desc: "Two-column layout" },
            { id: "minimal", name: "Minimal", desc: "Clean and simple" },
            { id: "hero", name: "Hero", desc: "Full-width hero section" },
          ].map((layout) => (
            <button
              key={layout.id}
              onClick={() =>
                setCurrentPage({ ...currentPage, layout: layout.id as any })
              }
              className={`p-3 rounded-lg border text-left transition-colors ${
                currentPage.layout === layout.id
                  ? "border-teal-500 bg-teal-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="font-medium text-sm">{layout.name}</div>
              <div className="text-xs text-gray-500">{layout.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Theme</h3>
        <div className="space-y-2">
          {["light", "dark", "custom"].map((theme) => (
            <button
              key={theme}
              onClick={() =>
                setCurrentPage({ ...currentPage, theme: theme as any })
              }
              className={`w-full p-3 rounded-lg border text-left transition-colors ${
                currentPage.theme === theme
                  ? "border-teal-500 bg-teal-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="font-medium capitalize">{theme}</div>
              <div className="text-sm text-gray-500">
                {theme === "light" && "Clean white background"}
                {theme === "dark" && "Dark mode styling"}
                {theme === "custom" && "Custom color scheme"}
              </div>
            </button>
          ))}
        </div>
      </div>

      {currentPage.theme === "custom" && (
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">
            Custom Colors
          </h3>
          <div className="space-y-3">
            {[
              { key: "primary", label: "Primary Color" },
              { key: "secondary", label: "Secondary Color" },
              { key: "background", label: "Background" },
              { key: "text", label: "Text Color" },
              { key: "accent", label: "Accent Color" },
            ].map((color) => (
              <div key={color.key}>
                <label className="block text-sm text-gray-700 mb-1">
                  {color.label}
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={
                      currentPage.customColors?.[
                        color.key as keyof typeof currentPage.customColors
                      ] || "#000000"
                    }
                    onChange={(e) =>
                      setCurrentPage({
                        ...currentPage,
                        customColors: {
                          ...currentPage.customColors,
                          [color.key]: e.target.value,
                        },
                      })
                    }
                    className="w-10 h-10 rounded border border-gray-300"
                  />
                  <input
                    type="text"
                    value={
                      currentPage.customColors?.[
                        color.key as keyof typeof currentPage.customColors
                      ] || "#000000"
                    }
                    onChange={(e) =>
                      setCurrentPage({
                        ...currentPage,
                        customColors: {
                          ...currentPage.customColors,
                          [color.key]: e.target.value,
                        },
                      })
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 font-mono text-sm"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Typography</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Heading Font
            </label>
            <div className="omnipay-dropdown">
              <select
                value={currentPage.typography?.headingFont || "Inter"}
                onChange={(e) =>
                  setCurrentPage({
                    ...currentPage,
                    typography: {
                      ...currentPage.typography,
                      headingFont: e.target.value,
                    },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="Inter">Inter</option>
                <option value="Poppins">Poppins</option>
                <option value="Roboto">Roboto</option>
                <option value="Open Sans">Open Sans</option>
                <option value="Montserrat">Montserrat</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Body Font
            </label>
            <div className="omnipay-dropdown">
              <select
                value={currentPage.typography?.bodyFont || "Inter"}
                onChange={(e) =>
                  setCurrentPage({
                    ...currentPage,
                    typography: {
                      ...currentPage.typography,
                      bodyFont: e.target.value,
                    },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="Inter">Inter</option>
                <option value="Poppins">Poppins</option>
                <option value="Roboto">Roboto</option>
                <option value="Open Sans">Open Sans</option>
                <option value="Montserrat">Montserrat</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Branding</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Logo URL</label>
            <input
              type="url"
              value={currentPage.logo || ""}
              onChange={(e) =>
                setCurrentPage({ ...currentPage, logo: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="https://example.com/logo.png"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Banner Image URL
            </label>
            <input
              type="url"
              value={currentPage.banner || ""}
              onChange={(e) =>
                setCurrentPage({ ...currentPage, banner: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="https://example.com/banner.jpg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ContentPanel({
  currentPage,
  setCurrentPage,
}: {
  currentPage: CheckoutPage;
  setCurrentPage: (page: CheckoutPage) => void;
}) {
  const addFeature = () => {
    const features = [...(currentPage.content?.features || []), ""];
    setCurrentPage({
      ...currentPage,
      content: { ...currentPage.content, features },
    });
  };

  const updateFeature = (index: number, value: string) => {
    const features = [...(currentPage.content?.features || [])];
    features[index] = value;
    setCurrentPage({
      ...currentPage,
      content: { ...currentPage.content, features },
    });
  };

  const removeFeature = (index: number) => {
    const features = [...(currentPage.content?.features || [])];
    features.splice(index, 1);
    setCurrentPage({
      ...currentPage,
      content: { ...currentPage.content, features },
    });
  };

  const addFaq = () => {
    const faq = [
      ...(currentPage.content?.faq || []),
      { question: "", answer: "" },
    ];
    setCurrentPage({
      ...currentPage,
      content: { ...currentPage.content, faq },
    });
  };

  const updateFaq = (
    index: number,
    field: "question" | "answer",
    value: string
  ) => {
    const faq = [...(currentPage.content?.faq || [])];
    faq[index] = { ...faq[index], [field]: value };
    setCurrentPage({
      ...currentPage,
      content: { ...currentPage.content, faq },
    });
  };

  const removeFaq = (index: number) => {
    const faq = [...(currentPage.content?.faq || [])];
    faq.splice(index, 1);
    setCurrentPage({
      ...currentPage,
      content: { ...currentPage.content, faq },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">
          Basic Information
        </h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              value={currentPage.name}
              onChange={(e) =>
                setCurrentPage({ ...currentPage, name: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={currentPage.description}
              onChange={(e) =>
                setCurrentPage({ ...currentPage, description: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Price (USD)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={currentPage.price}
              onChange={(e) =>
                setCurrentPage({
                  ...currentPage,
                  price: parseFloat(e.target.value) || 0,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Headlines</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Main Headline
            </label>
            <input
              type="text"
              value={currentPage.content?.headline || ""}
              onChange={(e) =>
                setCurrentPage({
                  ...currentPage,
                  content: { ...currentPage.content, headline: e.target.value },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="Leave empty to use product name"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Subheadline
            </label>
            <textarea
              value={currentPage.content?.subheadline || ""}
              onChange={(e) =>
                setCurrentPage({
                  ...currentPage,
                  content: {
                    ...currentPage.content,
                    subheadline: e.target.value,
                  },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              rows={2}
              placeholder="Leave empty to use description"
            />
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-900">Features</h3>
          <button
            onClick={addFeature}
            className="text-teal-600 hover:text-teal-700 text-sm flex items-center space-x-1"
          >
            <Plus className="w-4 h-4" />
            <span>Add Feature</span>
          </button>
        </div>
        <div className="space-y-2">
          {(currentPage.content?.features || []).map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={feature}
                onChange={(e) => updateFeature(index, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="Feature description"
              />
              <button
                onClick={() => removeFeature(index)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Testimonial</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Testimonial Text
            </label>
            <textarea
              value={currentPage.content?.testimonial?.text || ""}
              onChange={(e) =>
                setCurrentPage({
                  ...currentPage,
                  content: {
                    ...currentPage.content,
                    testimonial: {
                      ...currentPage.content?.testimonial,
                      text: e.target.value,
                    },
                  },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              rows={3}
              placeholder="Customer testimonial..."
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Author Name
              </label>
              <input
                type="text"
                value={currentPage.content?.testimonial?.author || ""}
                onChange={(e) =>
                  setCurrentPage({
                    ...currentPage,
                    content: {
                      ...currentPage.content,
                      testimonial: {
                        ...currentPage.content?.testimonial,
                        author: e.target.value,
                      },
                    },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Role/Title
              </label>
              <input
                type="text"
                value={currentPage.content?.testimonial?.role || ""}
                onChange={(e) =>
                  setCurrentPage({
                    ...currentPage,
                    content: {
                      ...currentPage.content,
                      testimonial: {
                        ...currentPage.content?.testimonial,
                        role: e.target.value,
                      },
                    },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="CEO, Company"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-900">FAQ</h3>
          <button
            onClick={addFaq}
            className="text-teal-600 hover:text-teal-700 text-sm flex items-center space-x-1"
          >
            <Plus className="w-4 h-4" />
            <span>Add FAQ</span>
          </button>
        </div>
        <div className="space-y-4">
          {(currentPage.content?.faq || []).map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  FAQ {index + 1}
                </span>
                <button
                  onClick={() => removeFaq(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2">
                <input
                  type="text"
                  value={item.question}
                  onChange={(e) => updateFaq(index, "question", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Question"
                />
                <textarea
                  value={item.answer}
                  onChange={(e) => updateFaq(index, "answer", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  rows={2}
                  placeholder="Answer"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FieldsPanel({
  currentPage,
  setCurrentPage,
}: {
  currentPage: CheckoutPage;
  setCurrentPage: (page: CheckoutPage) => void;
}) {
  const addCustomField = () => {
    const customFields = [
      ...(currentPage.customFields || []),
      {
        id: Date.now().toString(),
        label: "",
        type: "text" as const,
        required: false,
      },
    ];
    setCurrentPage({ ...currentPage, customFields });
  };

  const updateCustomField = (index: number, updates: any) => {
    const customFields = [...(currentPage.customFields || [])];
    customFields[index] = { ...customFields[index], ...updates };
    setCurrentPage({ ...currentPage, customFields });
  };

  const removeCustomField = (index: number) => {
    const customFields = [...(currentPage.customFields || [])];
    customFields.splice(index, 1);
    setCurrentPage({ ...currentPage, customFields });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">
          Built-in Fields
        </h3>
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={currentPage.collectEmail}
              onChange={(e) =>
                setCurrentPage({
                  ...currentPage,
                  collectEmail: e.target.checked,
                })
              }
              className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
            />
            <span className="ml-2 text-sm text-gray-700">
              Collect email address
            </span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={currentPage.collectNotes}
              onChange={(e) =>
                setCurrentPage({
                  ...currentPage,
                  collectNotes: e.target.checked,
                })
              }
              className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
            />
            <span className="ml-2 text-sm text-gray-700">
              Allow customer notes
            </span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={currentPage.collectShipping}
              onChange={(e) =>
                setCurrentPage({
                  ...currentPage,
                  collectShipping: e.target.checked,
                })
              }
              className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
            />
            <span className="ml-2 text-sm text-gray-700">
              Collect shipping address
            </span>
          </label>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-900">Custom Fields</h3>
          <button
            onClick={addCustomField}
            className="text-teal-600 hover:text-teal-700 text-sm flex items-center space-x-1"
          >
            <Plus className="w-4 h-4" />
            <span>Add Field</span>
          </button>
        </div>
        <div className="space-y-4">
          {(currentPage.customFields || []).map((field, index) => (
            <div
              key={field.id}
              className="border border-gray-200 rounded-lg p-3"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700">
                  Field {index + 1}
                </span>
                <button
                  onClick={() => removeCustomField(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Label
                  </label>
                  <input
                    type="text"
                    value={field.label}
                    onChange={(e) =>
                      updateCustomField(index, { label: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="Field label"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Type
                    </label>
                    <div className="omnipay-dropdown">
                      <select
                        value={field.type}
                        onChange={(e) =>
                          updateCustomField(index, { type: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      >
                        <option value="text">Text</option>
                        <option value="email">Email</option>
                        <option value="phone">Phone</option>
                        <option value="textarea">Textarea</option>
                        <option value="select">Select</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex items-end">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={field.required}
                        onChange={(e) =>
                          updateCustomField(index, {
                            required: e.target.checked,
                          })
                        }
                        className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                      />
                      <span className="ml-2 text-xs text-gray-700">
                        Required
                      </span>
                    </label>
                  </div>
                </div>
                {field.type === "select" && (
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Options (one per line)
                    </label>
                    <textarea
                      value={(field.options || []).join("\n")}
                      onChange={(e) =>
                        updateCustomField(index, {
                          options: e.target.value.split("\n").filter(Boolean),
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      rows={3}
                      placeholder="Option 1&#10;Option 2&#10;Option 3"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SettingsPanel({
  currentPage,
  setCurrentPage,
}: {
  currentPage: CheckoutPage;
  setCurrentPage: (page: CheckoutPage) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">
          Payment Settings
        </h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Payout Chain
            </label>
            <select
              value={currentPage.payoutChain}
              onChange={(e) =>
                setCurrentPage({ ...currentPage, payoutChain: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="ethereum">Ethereum</option>
              <option value="polygon">Polygon</option>
              <option value="arbitrum">Arbitrum</option>
              <option value="optimism">Optimism</option>
              <option value="bsc">BSC</option>
              <option value="avalanche">Avalanche</option>
              <option value="fantom">Fantom</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Wallet Address
            </label>
            <input
              type="text"
              value={currentPage.walletAddress}
              onChange={(e) =>
                setCurrentPage({
                  ...currentPage,
                  walletAddress: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="0x..."
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">SEO Settings</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Page Title
            </label>
            <input
              type="text"
              value={currentPage.seo?.title || ""}
              onChange={(e) =>
                setCurrentPage({
                  ...currentPage,
                  seo: { ...currentPage.seo, title: e.target.value },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="Leave empty to use product name"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Meta Description
            </label>
            <textarea
              value={currentPage.seo?.description || ""}
              onChange={(e) =>
                setCurrentPage({
                  ...currentPage,
                  seo: { ...currentPage.seo, description: e.target.value },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              rows={3}
              placeholder="Leave empty to use product description"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Social Share Image URL
            </label>
            <input
              type="url"
              value={currentPage.seo?.ogImage || ""}
              onChange={(e) =>
                setCurrentPage({
                  ...currentPage,
                  seo: { ...currentPage.seo, ogImage: e.target.value },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
