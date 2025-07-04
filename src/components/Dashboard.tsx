import React from 'react';
import { Plus, TrendingUp, DollarSign, Users, Eye, Copy, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface DashboardProps {
  onViewChange: (view: string) => void;
}

export function Dashboard({ onViewChange }: DashboardProps) {
  const { checkoutPages, payments } = useApp();

  const totalRevenue = payments
    .filter(p => p.status === 'success')
    .reduce((sum, p) => sum + p.amount, 0);

  const recentPages = checkoutPages.slice(-3);
  const recentPayments = payments.slice(-5);

  const copyPaymentLink = (pageId: string) => {
    const link = `${window.location.origin}/checkout/${pageId}`;
    navigator.clipboard.writeText(link);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Manage your crypto checkout pages and track payments</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${totalRevenue.toFixed(2)}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+12% from last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Checkout Pages</p>
              <p className="text-2xl font-bold text-gray-900">{checkoutPages.length}</p>
            </div>
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
              <Plus className="w-6 h-6 text-teal-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-600">{checkoutPages.filter(p => p.status === 'published').length} published</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Payments</p>
              <p className="text-2xl font-bold text-gray-900">{payments.length}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-600">{payments.filter(p => p.status === 'success').length} successful</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900">73%</p>
            </div>
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-teal-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-600">Above average</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Checkout Pages */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Recent Checkout Pages</h2>
              <button 
                onClick={() => onViewChange('pages')}
                className="text-teal-600 hover:text-teal-700 text-sm font-medium"
              >
                View all
              </button>
            </div>
          </div>
          <div className="p-6">
            {recentPages.length === 0 ? (
              <div className="text-center py-8">
                <Plus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">No checkout pages yet</p>
                <button 
                  onClick={() => onViewChange('pages')}
                  className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                >
                  Create your first page
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {recentPages.map(page => (
                  <div key={page.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">{page.name}</h3>
                      <p className="text-sm text-gray-500">${page.price} • {page.status}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => copyPaymentLink(page.id)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Payments */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Recent Payments</h2>
              <button 
                onClick={() => onViewChange('analytics')}
                className="text-teal-600 hover:text-teal-700 text-sm font-medium"
              >
                View all
              </button>
            </div>
          </div>
          <div className="p-6">
            {recentPayments.length === 0 ? (
              <div className="text-center py-8">
                <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No payments yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentPayments.map(payment => (
                  <div key={payment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">${payment.amount}</h3>
                      <p className="text-sm text-gray-500">{payment.paymentMethod} • {payment.fromChain}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        payment.status === 'success' 
                          ? 'bg-green-100 text-green-800'
                          : payment.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {payment.status}
                      </span>
                      {payment.txHash && (
                        <button className="text-gray-400 hover:text-gray-600 transition-colors">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}