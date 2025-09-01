import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ArrowLeft, CreditCard, Smartphone, Shield, CheckCircle, AlertCircle, Star, Clock } from 'lucide-react';

export function PaymentPage({ course, onBack, onNavigate, onPaymentComplete }) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Payment methods
  const paymentMethods = [
    {
      id: 'upi',
      name: 'UPI Apps',
      icon: '📱',
      methods: ['PhonePe', 'Google Pay', 'Paytm', 'BHIM UPI'],
      description: 'Quick payments with UPI apps',
      processingTime: 'Instant'
    },
    {
      id: 'razorpay',
      name: 'Razorpay',
      icon: '💳',
      methods: ['Cards', 'NetBanking', 'Wallets'],
      description: 'Secure payment gateway',
      processingTime: 'Instant'
    },
    {
      id: 'flyware',
      name: 'Flyware',
      icon: '✈️',
      methods: ['Instant Transfer', 'Wallet'],
      description: 'Fast and reliable payments',
      processingTime: 'Instant'
    },
    {
      id: 'credit-cards',
      name: 'Credit Cards',
      icon: '💳',
      methods: ['CRED', 'Simpl', 'Direct Card'],
      description: 'Credit card payments with rewards',
      processingTime: '1-2 minutes'
    }
  ];

  // Course pricing with discounts
  const originalPrice = course?.price || 2999;
  const discountPercent = course?.discount || 30;
  const discountAmount = Math.round((originalPrice * discountPercent) / 100);
  const finalPrice = originalPrice - discountAmount;
  const gstAmount = Math.round(finalPrice * 0.18);
  const totalAmount = finalPrice + gstAmount;

  const handlePayment = async () => {
    if (!selectedPaymentMethod) return;

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      
      // Call completion handler
      setTimeout(() => {
        if (onPaymentComplete) {
          onPaymentComplete();
        }
      }, 2000);
    }, 3000);
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 text-center rounded-3xl shadow-xl">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-gray-600 mb-6">
            Welcome to <span className="font-semibold">{course?.title}</span>! 
            You can now start learning.
          </p>
          
          <div className="bg-gray-50 rounded-2xl p-4 mb-6">
            <div className="flex items-center justify-between text-sm mb-2">
              <span>Course</span>
              <span className="font-semibold">{course?.title}</span>
            </div>
            <div className="flex items-center justify-between text-sm mb-2">
              <span>Amount Paid</span>
              <span className="font-semibold">₹{totalAmount.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Transaction ID</span>
              <span className="font-mono text-xs">TXN{Date.now()}</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <Button 
              onClick={() => onNavigate('courseDetails', course)}
              className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-xl"
            >
              Start Learning Now
            </Button>
            <Button 
              onClick={() => onNavigate('dashboard')}
              variant="outline"
              className="w-full h-12 rounded-xl"
            >
              Go to Dashboard
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 text-center rounded-3xl shadow-xl">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-spin">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Processing Payment...</h1>
          <p className="text-gray-600 mb-6">
            Please don't close this page. Your payment is being processed securely.
          </p>
          
          <div className="bg-gray-50 rounded-2xl p-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span>Amount</span>
              <span className="font-semibold">₹{totalAmount.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Payment Method</span>
              <span className="font-semibold">
                {paymentMethods.find(m => m.id === selectedPaymentMethod)?.name}
              </span>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full max-w-4xl mx-auto bg-white min-h-screen pb-20">
        {/* Header */}
        <div className="flex items-center justify-between p-4 lg:p-6 border-b border-gray-100">
          <button onClick={onBack} className="hover:bg-gray-100 p-2 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="text-center">
            <h1 className="text-lg lg:text-xl font-semibold">Complete Payment</h1>
            <p className="text-xs lg:text-sm text-gray-500">Secure checkout</p>
          </div>
          <div className="w-9 h-9 flex items-center justify-center">
            <Shield className="w-5 h-5 text-green-600" />
          </div>
        </div>

        <div className="p-4 lg:p-6 max-w-2xl mx-auto">
          {/* Course Summary */}
          <Card className="p-6 rounded-2xl shadow-sm mb-6">
            <div className="flex gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
                <span className="text-2xl">
                  {course?.category === 'Programming' ? '💻' :
                   course?.category === 'Data Science' ? '📊' :
                   course?.category === 'Data Analytics' ? '📈' : '🎓'}
                </span>
              </div>
              
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-2">{course?.title}</h2>
                <p className="text-gray-600 text-sm mb-3">{course?.subtitle}</p>
                
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span>{course?.rating || '4.8'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{course?.duration || '15 hours'}</span>
                  </div>
                  <Badge className="bg-blue-100 text-blue-700">
                    {course?.category}
                  </Badge>
                </div>

                {course?.discount && (
                  <Badge className="bg-red-100 text-red-700">
                    {discountPercent}% OFF - Limited Time!
                  </Badge>
                )}
              </div>
            </div>
          </Card>

          {/* Price Breakdown */}
          <Card className="p-6 rounded-2xl shadow-sm mb-6">
            <h3 className="text-lg font-semibold mb-4">Price Details</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Course Price</span>
                <span className={course?.discount ? 'line-through text-gray-500' : 'font-semibold'}>
                  ₹{originalPrice.toLocaleString()}
                </span>
              </div>
              
              {course?.discount && (
                <>
                  <div className="flex justify-between items-center text-green-600">
                    <span>Discount ({discountPercent}%)</span>
                    <span>-₹{discountAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Discounted Price</span>
                    <span className="font-semibold">₹{finalPrice.toLocaleString()}</span>
                  </div>
                </>
              )}
              
              <div className="flex justify-between items-center">
                <span>GST (18%)</span>
                <span>₹{gstAmount.toLocaleString()}</span>
              </div>
              
              <hr className="border-gray-200" />
              
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total Amount</span>
                <span>₹{totalAmount.toLocaleString()}</span>
              </div>
            </div>

            {course?.discount && (
              <div className="mt-4 p-3 bg-green-50 rounded-xl">
                <div className="flex items-center gap-2 text-green-700">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    You save ₹{discountAmount.toLocaleString()} with this offer!
                  </span>
                </div>
              </div>
            )}
          </Card>

          {/* Payment Methods */}
          <Card className="p-6 rounded-2xl shadow-sm mb-6">
            <h3 className="text-lg font-semibold mb-4">Choose Payment Method</h3>
            
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  onClick={() => setSelectedPaymentMethod(method.id)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedPaymentMethod === method.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">{method.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{method.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {method.processingTime}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{method.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {method.methods.map((subMethod, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {subMethod}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 ${
                      selectedPaymentMethod === method.id
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedPaymentMethod === method.id && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Security Info */}
          <Card className="p-4 rounded-2xl shadow-sm mb-6 bg-green-50 border border-green-200">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-900">Secure Payment</p>
                <p className="text-xs text-green-700">
                  Your payment information is encrypted and secure
                </p>
              </div>
            </div>
          </Card>

          {/* Pay Button */}
          <Button
            onClick={handlePayment}
            disabled={!selectedPaymentMethod}
            className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {selectedPaymentMethod ? (
              <>
                <CreditCard className="w-5 h-5 mr-2" />
                Pay ₹{totalAmount.toLocaleString()}
              </>
            ) : (
              'Select Payment Method'
            )}
          </Button>

          {/* Terms */}
          <p className="text-xs text-gray-500 text-center mt-4">
            By proceeding, you agree to our Terms of Service and Privacy Policy. 
            Payments are processed securely through our trusted partners.
          </p>
        </div>
      </div>
    </div>
  );
}