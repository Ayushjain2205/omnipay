import React, { useState } from "react";
import {
  TrendingUp,
  DollarSign,
  Users,
  Calendar,
  Download,
  Filter,
} from "lucide-react";
import { useApp } from "../context/AppContext";

export function Analytics() {
  const { payments, checkoutPages } = useApp();
  const [timeRange, setTimeRange] = useState("7d");

  const successfulPayments = payments.filter((p) => p.status === "success");
  const totalRevenue = successfulPayments.reduce((sum, p) => sum + p.amount, 0);
  const avgOrderValue =
    successfulPayments.length > 0
      ? totalRevenue / successfulPayments.length
      : 0;

  const exportData = () => {
    const csvData = payments.map((payment) => ({
      Date: new Date(payment.createdAt).toLocaleDateString(),
      Amount: payment.amount,
      Status: payment.status,
      "Payment Method": payment.paymentMethod,
      "From Chain": payment.fromChain,
      "To Chain": payment.toChain,
      "Transaction Hash": payment.txHash || "N/A",
    }));

    const csvContent = [
      Object.keys(csvData[0] || {}).join(","),
      ...csvData.map((row) => Object.values(row).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "payments-export.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics</h1>
          <p className="text-gray-600">
            Track your payment performance and revenue
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="omnipay-dropdown">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
          </div>
          <button
            onClick={exportData}
            className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">
                ${totalRevenue.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500">Total Revenue</p>
            </div>
          </div>
          <div className="flex items-center">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">
              +12% from last period
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-teal-600" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">
                {successfulPayments.length}
              </p>
              <p className="text-sm text-gray-500">Successful Payments</p>
            </div>
          </div>
          <div className="flex items-center">
            <TrendingUp className="w-4 h-4 text-teal-500 mr-1" />
            <span className="text-sm text-teal-600">+8% from last period</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">
                ${avgOrderValue.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500">Avg. Order Value</p>
            </div>
          </div>
          <div className="flex items-center">
            <TrendingUp className="w-4 h-4 text-purple-500 mr-1" />
            <span className="text-sm text-purple-600">
              +5% from last period
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-teal-600" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">73%</p>
              <p className="text-sm text-gray-500">Conversion Rate</p>
            </div>
          </div>
          <div className="flex items-center">
            <TrendingUp className="w-4 h-4 text-teal-500 mr-1" />
            <span className="text-sm text-teal-600">Above average</span>
          </div>
        </div>
      </div>

      {/* Recent Payments Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Payments
            </h2>
            <button className="flex items-center space-x-2 px-3 py-1 text-gray-600 hover:text-gray-800 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Chains
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  TX Hash
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payments.slice(0, 10).map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(payment.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${payment.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        payment.status === "success"
                          ? "bg-green-100 text-green-800"
                          : payment.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payment.paymentMethod}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payment.fromChain} → {payment.toChain}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payment.txHash ? (
                      <span className="font-mono text-xs">
                        {payment.txHash.slice(0, 6)}...
                        {payment.txHash.slice(-6)}
                      </span>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {payments.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No payments yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
