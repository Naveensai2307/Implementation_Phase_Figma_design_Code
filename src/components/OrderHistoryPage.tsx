import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { ArrowLeft, Download, Eye, RefreshCcw, Calendar, CreditCard, Package, X } from 'lucide-react';

export function OrderHistoryPage({ user, onBack, onNavigate }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  const orders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      items: [
        { name: 'Python Mastery Course', price: 49.99 },
        { name: 'Data Science Bundle', price: 79.99 }
      ],
      total: 129.98,
      status: 'Completed',
      paymentMethod: 'Credit Card',
      downloadAvailable: true
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      items: [
        { name: 'React Development Course', price: 39.99 }
      ],
      total: 39.99,
      status: 'Completed',
      paymentMethod: 'PayPal',
      downloadAvailable: true
    },
    {
      id: 'ORD-003',
      date: '2024-01-05',
      items: [
        { name: 'Premium Subscription - 1 Year', price: 199.99 }
      ],
      total: 199.99,
      status: 'Active',
      paymentMethod: 'Credit Card',
      downloadAvailable: false,
      subscription: true
    },
    {
      id: 'ORD-004',
      date: '2023-12-20',
      items: [
        { name: 'Machine Learning Course', price: 59.99 },
        { name: 'Statistics Fundamentals', price: 29.99 }
      ],
      total: 89.98,
      status: 'Completed',
      paymentMethod: 'Credit Card',
      downloadAvailable: true
    },
    {
      id: 'ORD-005',
      date: '2023-12-15',
      items: [
        { name: 'UI/UX Design Bundle', price: 69.99 }
      ],
      total: 69.99,
      status: 'Refunded',
      paymentMethod: 'PayPal',
      downloadAvailable: false
    }
  ];

  const filters = ['All', 'Completed', 'Active', 'Refunded'];

  const filteredOrders = activeFilter === 'All' 
    ? orders 
    : orders.filter(order => order.status === activeFilter);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-700';
      case 'Active': return 'bg-blue-100 text-blue-700';
      case 'Refunded': return 'bg-red-100 text-red-700';
      case 'Processing': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const totalSpent = orders
    .filter(order => order.status !== 'Refunded')
    .reduce((sum, order) => sum + order.total, 0);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const handleDownload = (order) => {
    // Create order details content
    const orderContent = `
GROWIFY ORDER RECEIPT
=====================

Order ID: ${order.id}
Date: ${formatDate(order.date)}
Payment Method: ${order.paymentMethod}
Status: ${order.status}

ITEMS:
======
${order.items.map(item => `${item.name} - ${item.price.toFixed(2)}`).join('\n')}

TOTAL: ${order.total.toFixed(2)}

Thank you for learning with Growify!
Contact support: support@growify.com
    `;

    // Create and download file
    const blob = new Blob([orderContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Growify_Order_${order.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleReorder = (order) => {
    // Simulate reorder process
    const confirmReorder = window.confirm(`Reorder items from ${order.id} for ${order.total.toFixed(2)}?`);
    if (confirmReorder) {
      alert('Items added to cart! Redirecting to checkout...');
      // In real app, would add items to cart and navigate to checkout
      setTimeout(() => {
        alert('Order placed successfully! Check your email for confirmation.');
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full max-w-4xl mx-auto bg-white min-h-screen pb-20">
        {/* Header */}
        <div className="flex items-center justify-between p-4 lg:p-6 border-b border-gray-100">
          <button onClick={onBack} className="hover:bg-gray-100 p-2 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="text-center">
            <h1 className="text-lg lg:text-xl font-semibold">Order History</h1>
            <p className="text-xs lg:text-sm text-gray-500">Your purchases & subscriptions</p>
          </div>
          <div className="w-9 h-9"></div>
        </div>

        <div className="p-4 lg:p-6 space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="p-4 lg:p-6 text-center rounded-2xl shadow-sm">
              <Package className="w-6 h-6 mx-auto mb-2 text-blue-500" />
              <p className="text-xl lg:text-2xl font-bold">{orders.length}</p>
              <p className="text-sm text-gray-600">Total Orders</p>
            </Card>
            
            <Card className="p-4 lg:p-6 text-center rounded-2xl shadow-sm">
              <CreditCard className="w-6 h-6 mx-auto mb-2 text-green-500" />
              <p className="text-xl lg:text-2xl font-bold">${totalSpent.toFixed(2)}</p>
              <p className="text-sm text-gray-600">Total Spent</p>
            </Card>
            
            <Card className="p-4 lg:p-6 text-center rounded-2xl shadow-sm">
              <Calendar className="w-6 h-6 mx-auto mb-2 text-purple-500" />
              <p className="text-xl lg:text-2xl font-bold">
                {orders.filter(o => o.status === 'Active').length}
              </p>
              <p className="text-sm text-gray-600">Active Subscriptions</p>
            </Card>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeFilter === filter
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter} {filter !== 'All' && `(${orders.filter(o => o.status === filter).length})`}
              </button>
            ))}
          </div>

          {/* Orders List */}
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <Card key={order.id} className="p-4 lg:p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">Order {order.id}</h3>
                      <Badge className={`text-xs ${getStatusColor(order.status)}`}>
                        {order.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>📅 {formatDate(order.date)}</span>
                      <span>💳 {order.paymentMethod}</span>
                      <span className="font-semibold text-gray-900">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="space-y-2 mb-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">{item.name}</span>
                      <span className="text-sm font-semibold">${item.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  <Button 
                    variant="outline" 
                    className="h-9 px-4 text-sm rounded-lg hover:bg-blue-50 hover:border-blue-300"
                    onClick={() => handleViewDetails(order)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  
                  {order.downloadAvailable && (
                    <Button 
                      variant="outline" 
                      className="h-9 px-4 text-sm rounded-lg hover:bg-green-50 hover:border-green-300"
                      onClick={() => handleDownload(order)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  )}
                  
                  {order.status === 'Completed' && (
                    <Button 
                      variant="outline" 
                      className="h-9 px-4 text-sm rounded-lg hover:bg-purple-50 hover:border-purple-300"
                      onClick={() => handleReorder(order)}
                    >
                      <RefreshCcw className="w-4 h-4 mr-2" />
                      Reorder
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold mb-2">No orders found</h3>
              <p className="text-gray-600 mb-6">
                {activeFilter === 'All' 
                  ? "You haven't made any purchases yet."
                  : `No ${activeFilter.toLowerCase()} orders found.`
                }
              </p>
              <Button 
                onClick={() => onNavigate('courses')}
                className="h-12 px-8 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold"
              >
                Browse Courses
              </Button>
            </div>
          )}

          {/* Help Section */}
          <Card className="p-6 lg:p-8 rounded-3xl shadow-sm bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="text-center">
              <h4 className="text-lg font-semibold mb-2">Need Help with an Order?</h4>
              <p className="text-gray-600 mb-4">
                Our support team is here to help with any questions about your purchases.
              </p>
              <Button 
                onClick={() => onNavigate('support')}
                className="bg-blue-500 hover:bg-blue-600 text-white h-12 px-8 rounded-xl font-semibold"
              >
                Contact Support
              </Button>
            </div>
          </Card>
        </div>

        {/* Order Details Dialog */}
        <Dialog open={showOrderDetails} onOpenChange={setShowOrderDetails}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                Order Details - {selectedOrder?.id}
                <button 
                  onClick={() => setShowOrderDetails(false)}
                  className="p-1 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </DialogTitle>
            </DialogHeader>
            
            {selectedOrder && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-600">Order Date</p>
                    <p>{formatDate(selectedOrder.date)}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">Status</p>
                    <Badge className={getStatusColor(selectedOrder.status)}>
                      {selectedOrder.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">Payment Method</p>
                    <p>{selectedOrder.paymentMethod}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">Total Amount</p>
                    <p className="font-semibold">${selectedOrder.total.toFixed(2)}</p>
                  </div>
                </div>

                <div>
                  <p className="font-medium text-gray-600 mb-2">Items Purchased</p>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                        <span>{item.name}</span>
                        <span className="font-medium">${item.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  {selectedOrder.downloadAvailable && (
                    <Button 
                      onClick={() => {
                        handleDownload(selectedOrder);
                        setShowOrderDetails(false);
                      }}
                      className="flex-1 h-10 bg-green-500 hover:bg-green-600 text-white"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Receipt
                    </Button>
                  )}
                  
                  {selectedOrder.status === 'Completed' && (
                    <Button 
                      onClick={() => {
                        handleReorder(selectedOrder);
                        setShowOrderDetails(false);
                      }}
                      className="flex-1 h-10 bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      <RefreshCcw className="w-4 h-4 mr-2" />
                      Reorder
                    </Button>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}