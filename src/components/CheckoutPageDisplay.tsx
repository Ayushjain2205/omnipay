import React, { useState } from "react";
import {
  Check,
  Star,
  ChevronDown,
  ChevronUp,
  Shield,
  Globe,
} from "lucide-react";
import { CheckoutPage } from "../types";
import { LiFiWidget } from "@lifi/widget";

interface CheckoutPageDisplayProps {
  page: CheckoutPage;
  isPreview?: boolean;
}

export function CheckoutPageDisplay({
  page,
  isPreview = false,
}: CheckoutPageDisplayProps) {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const isDark = page.theme === "dark";
  const isCustom = page.theme === "custom";

  const colors = {
    background: isCustom
      ? page.customColors?.background || "#ffffff"
      : isDark
      ? "#0f172a"
      : "#f8fafc",
    text: isCustom
      ? page.customColors?.text || "#000000"
      : isDark
      ? "#f8fafc"
      : "#1e293b",
    primary: isCustom ? page.customColors?.primary || "#3b82f6" : "#14b8a6",
    secondary: isCustom
      ? page.customColors?.secondary || "#64748b"
      : isDark
      ? "#94a3b8"
      : "#64748b",
    accent: isCustom ? page.customColors?.accent || "#10b981" : "#0891b2",
  };

  const fonts = {
    heading: page.typography?.headingFont || "Inter",
    body: page.typography?.bodyFont || "Inter",
  };

  const containerClass = isPreview ? "min-h-0 overflow-y-auto" : "min-h-screen";

  const headerHeight = isPreview ? "h-32" : "h-64";
  const logoSize = isPreview ? "h-8" : "h-16";
  const titleSize = isPreview ? "text-lg" : "text-4xl";
  const subtitleSize = isPreview ? "text-sm" : "text-xl";
  const padding = isPreview ? "p-4" : "px-4 py-12";

  return (
    <div
      className={containerClass}
      style={{ backgroundColor: colors.background }}
    >
      {/* Header with Logo and Banner */}
      <div className="relative">
        {/* Banner Section */}
        <div
          className={`${headerHeight} bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 relative overflow-hidden`}
          style={
            page.banner
              ? {
                  backgroundImage: `url(${page.banner})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : {}
          }
        >
          {!page.banner && (
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-cyan-600/20 to-teal-600/20" />
          )}
          <div className="absolute inset-0 bg-black/30" />

          {/* Logo positioned over banner */}
          <div
            className={`absolute ${
              isPreview ? "top-2 left-2" : "top-8 left-8"
            }`}
          >
            {page.logo ? (
              <img
                src={page.logo}
                alt="Logo"
                className={`${logoSize} w-auto bg-white/90 backdrop-blur-sm rounded-lg ${
                  isPreview ? "p-1" : "p-3"
                } shadow-lg`}
              />
            ) : (
              <div
                className={`${logoSize} ${
                  isPreview ? "w-12" : "w-24"
                } bg-white/90 backdrop-blur-sm rounded-lg ${
                  isPreview ? "p-1" : "p-3"
                } shadow-lg flex items-center justify-center`}
              >
                <div className="text-gray-400 text-xs text-center">Logo</div>
              </div>
            )}
          </div>

          {/* Banner content */}
          <div
            className={`absolute ${
              isPreview ? "bottom-2 left-2 right-2" : "bottom-8 left-8 right-8"
            } text-white`}
          >
            <h1
              className={`${titleSize} font-bold ${
                isPreview ? "mb-1" : "mb-2"
              }`}
              style={{ fontFamily: fonts.heading }}
            >
              {page.content?.headline || page.name}
            </h1>
            <p
              className={`${subtitleSize} opacity-90 ${
                isPreview ? "" : "max-w-2xl"
              }`}
            >
              {page.content?.subheadline || page.description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`${
          isPreview ? "px-4 py-4" : "max-w-4xl mx-auto"
        } ${padding}`}
      >
        <div className="space-y-8">
          {/* Product Details Card */}
          <div
            className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
            style={{ backgroundColor: isDark ? "#1e293b" : "#ffffff" }}
          >
            <div className={isPreview ? "p-4" : "p-8"}>
              <div
                className={`flex items-center justify-between ${
                  isPreview ? "mb-3" : "mb-6"
                }`}
              >
                <div>
                  <h2
                    className={`${
                      isPreview ? "text-lg" : "text-2xl"
                    } font-bold ${isPreview ? "mb-1" : "mb-2"}`}
                    style={{ color: colors.text }}
                  >
                    Product Details
                  </h2>
                  {!isPreview && (
                    <p className="text-lg" style={{ color: colors.secondary }}>
                      Everything you need to know
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <div
                    className={`${
                      isPreview ? "text-lg" : "text-3xl"
                    } font-bold`}
                    style={{ color: colors.primary }}
                  >
                    ${page.price.toFixed(2)}
                  </div>
                  <div className="text-sm" style={{ color: colors.secondary }}>
                    USD
                  </div>
                </div>
              </div>

              {/* Features */}
              {page.content?.features && page.content.features.length > 0 && (
                <div className={isPreview ? "mb-4" : "mb-8"}>
                  {!isPreview && (
                    <h3
                      className="text-xl font-semibold mb-4"
                      style={{ color: colors.text }}
                    >
                      What's Included
                    </h3>
                  )}
                  <div
                    className={`${
                      isPreview ? "space-y-1" : "grid md:grid-cols-2 gap-3"
                    }`}
                  >
                    {(isPreview
                      ? page.content.features.slice(0, 3)
                      : page.content.features
                    ).map((feature: any, index: number) => (
                      <div
                        key={index}
                        className={`flex items-center space-x-${
                          isPreview ? "2" : "3"
                        } ${isPreview ? "" : "p-3 rounded-lg bg-gray-50"}`}
                        style={
                          !isPreview
                            ? {
                                backgroundColor: isDark ? "#334155" : "#f8fafc",
                              }
                            : {}
                        }
                      >
                        <div
                          className={`${
                            isPreview ? "w-3 h-3" : "w-6 h-6"
                          } bg-green-500 rounded-full flex items-center justify-center flex-shrink-0`}
                        >
                          {!isPreview && (
                            <Check className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <span
                          className={isPreview ? "text-sm" : ""}
                          style={{ color: colors.text }}
                        >
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Testimonial - Only show in full view */}
              {!isPreview && page.content?.testimonial && (
                <div
                  className="p-6 rounded-xl border-l-4 border-teal-500 bg-teal-50"
                  style={{ backgroundColor: isDark ? "#1e40af20" : "#f0fdfa" }}
                >
                  <div className="flex items-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p
                    className="text-lg italic mb-4"
                    style={{ color: colors.text }}
                  >
                    "{page.content.testimonial.text}"
                  </p>
                  <div>
                    <p className="font-semibold" style={{ color: colors.text }}>
                      {page.content.testimonial.author}
                    </p>
                    <p className="text-sm" style={{ color: colors.secondary }}>
                      {page.content.testimonial.role}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Li.Fi Widget Integration */}
          <div className="my-8">
            <h3
              className="text-xl font-bold mb-4"
              style={{ color: colors.text }}
            >
              Swap & Pay with Crypto
            </h3>
            <LiFiWidget
              integrator="OmniPay"
              config={{
                variant: "wide",
                appearance: "light",
                theme: {
                  colorSchemes: {
                    light: {
                      palette: {
                        primary: {
                          main: "#006Eff",
                        },
                        secondary: {
                          main: "#FFC800",
                        },
                        background: {
                          default: "#ffffff",
                          paper: "#f8f8fa",
                        },
                        text: {
                          primary: "#00070F",
                          secondary: "#6A7481",
                        },
                        grey: {
                          200: "#EEEFF2",
                          300: "#D5DAE1",
                          700: "#555B62",
                          800: "#373F48",
                        },
                        playground: {
                          main: "#f3f5f8",
                        },
                      },
                    },
                  },
                  shape: {
                    borderRadius: 12,
                    borderRadiusSecondary: 12,
                    borderRadiusTertiary: 24,
                  },
                  typography: {
                    fontFamily: "Inter, sans-serif",
                  },
                  container: {
                    boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.08)",
                    borderRadius: "16px",
                  },
                  components: {
                    MuiCard: {
                      defaultProps: {
                        variant: "filled",
                      },
                    },
                    MuiTabs: {
                      styleOverrides: {
                        root: {
                          backgroundColor: "#f8f8fa",
                          ".MuiTabs-indicator": {
                            backgroundColor: "#ffffff",
                          },
                        },
                      },
                    },
                  },
                },
              }}
            />
          </div>

          {/* FAQ Section - Only show in full view */}
          {!isPreview && page.content?.faq && page.content.faq.length > 0 && (
            <div
              className="bg-white rounded-2xl shadow-xl border border-gray-200"
              style={{ backgroundColor: isDark ? "#1e293b" : "#ffffff" }}
            >
              <div className="p-8">
                <h3
                  className="text-2xl font-bold mb-6"
                  style={{ color: colors.text }}
                >
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                  {page.content.faq.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="border rounded-lg"
                      style={{ borderColor: colors.secondary + "30" }}
                    >
                      <button
                        onClick={() =>
                          setExpandedFaq(expandedFaq === index ? null : index)
                        }
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors rounded-lg"
                        style={{ color: colors.text }}
                      >
                        <span className="font-medium">{item.question}</span>
                        {expandedFaq === index ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </button>
                      {expandedFaq === index && (
                        <div className="px-6 pb-4">
                          <p style={{ color: colors.secondary }}>
                            {item.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      {!isPreview && (
        <div
          className="border-t border-gray-200 py-8"
          style={{ backgroundColor: isDark ? "#1e293b" : "#ffffff" }}
        >
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div
              className="flex items-center justify-center space-x-2 text-sm"
              style={{ color: colors.secondary }}
            >
              <Shield className="w-4 h-4" />
              <span>
                Powered by OmniPay • Secure & Trustless Crypto Payments
              </span>
              <Globe className="w-4 h-4" />
            </div>
          </div>
        </div>
      )}

      {/* Preview Footer */}
      {isPreview && (
        <div
          className="text-center text-xs"
          style={{ color: colors.secondary }}
        >
          <p>Powered by OmniPay • Secure Crypto Payments</p>
        </div>
      )}
    </div>
  );
}
