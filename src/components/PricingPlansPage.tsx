import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft, Check, Crown, Zap, Star, Shield } from 'lucide-react';

export function PricingPlansPage({ onBack, onNavigate, selectedCourse }) {
  const [selectedPlan, setSelectedPlan] = useState('monthly');

  const plans = [
    {
      id: 'monthly',
      name: 'Monthly',
      duration: '1 Month',
      price: 999,
      originalPrice: 1499,
      discount: '33% OFF',
      description: 'Perfect for getting started',
      popular: false,
      features: [
        'Access to all premium courses',
        'Professional certifications',
        'Download courses offline',
        'Priority support',
        'Cancel anytime'
      ]
    },
    {
      id: 'quarterly',
      name: '3 Months',
      duration: '3 Months',
      price: 2499,
      originalPrice: 4497,
      discount: '44% OFF',
      description: 'Best for focused learning',
      popular: true,
      features: [
        'Everything in Monthly',
        'Career guidance sessions',
        'Resume review service',
        'Mock interview sessions',
        'Job placement assistance'
      ]
    },
    {
      id: 'sixmonth',
      name: '6 Months',
      duration: '6 Months',
      price: 4499,
      originalPrice: 8994,
      discount: '50% OFF',
      description: 'Complete skill transformation',
      popular: false,
      features: [
        'Everything in 3 Months',
        'Personal mentorship',
        'Project code reviews',
        '1-on-1 career counseling',
        'Industry networking events'
      ]
    },
    {
      id: 'yearly',
      name: 'Annual',
      duration: '12 Months',
      price: 7999,
      originalPrice: 17988,
      discount: '55% OFF',
      description: 'Maximum savings & benefits',
      popular: false,
      features: [
        'Everything in 6 Months',
        'Unlimited course access',
        'Advanced certifications',
        'Company referrals',
        'Lifetime alumni network'
      ]
    }
  ];

  const selectedPlanData = plans.find(plan => plan.id === selectedPlan);

  const benefits = [
    {
      icon: Crown,
      title: 'Premium Courses',
      description: 'Access to all 25+ premium courses and certifications'
    },
    {
      icon: Zap,
      title: 'Fast Track Learning',
      description: 'Accelerated learning paths with personalized recommendations'
    },
    {
      icon: Star,
      title: 'Industry Recognition',
      description: 'Certificates from AWS, Google Cloud, Microsoft, and more'
    },
    {
      icon: Shield,
      title: 'Job Guarantee',
      description: 'Get placed or get your money back (T&C apply)'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-responsive bg-white min-h-screen pb-20">
        {/* Header */}
        <div className="flex items-center justify-between p-4 lg:p-6 border-b border-gray-100">
          <button 
            onClick={onBack}
            className="hover:bg-gray-100 p-2 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="text-center">
            <h1 className="text-lg lg:text-xl font-semibold">Premium Plans</h1>
            <p className="text-xs lg:text-sm text-gray-500">Choose your learning journey</p>
          </div>
          <div className="w-9 h-9"></div>
        </div>

        <div className="p-4 lg:p-6 xl:p-8 space-y-6 lg:space-y-8">
          {/* Hero Section */}
          <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 p-6 lg:p-8 rounded-3xl">
            <div className="text-4xl lg:text-6xl mb-4">🚀</div>
            <h2 className="text-2xl lg:text-3xl font-bold mb-2">Unlock Your Potential</h2>
            <p className="text-gray-600 mb-4">Join 50,000+ learners who advanced their careers with Growify Premium</p>
            <Badge className="bg-green-100 text-green-700 px-4 py-2">
              ⚡ Limited Time Offer - Save up to 55%
            </Badge>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="p-4 lg:p-6 text-center rounded-2xl">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <benefit.icon className="w-6 h-6 lg:w-8 lg:h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </Card>
            ))}
          </div>

          {/* Pricing Plans */}
          <div>
            <h3 className="text-xl lg:text-2xl font-semibold text-center mb-6 lg:mb-8">Choose Your Plan</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {plans.map((plan) => (
                <Card 
                  key={plan.id}
                  className={`relative p-6 rounded-3xl cursor-pointer transition-all duration-200 ${
                    selectedPlan === plan.id 
                      ? 'border-2 border-blue-500 shadow-lg transform scale-105' 
                      : 'border border-gray-200 hover:border-blue-200 hover:shadow-md'
                  } ${plan.popular ? 'ring-2 ring-purple-200' : ''}`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1">
                      🔥 Most Popular
                    </Badge>
                  )}
                  
                  <div className="text-center">
                    <h4 className="font-semibold text-lg mb-2">{plan.name}</h4>
                    <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
                    
                    <div className="mb-4">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-3xl font-bold">₹{plan.price}</span>
                        <span className="text-sm text-gray-500">/{plan.duration}</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 mt-1">
                        <span className="text-sm text-gray-400 line-through">₹{plan.originalPrice}</span>
                        <Badge className="bg-green-100 text-green-700 text-xs">
                          {plan.discount}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-6">
                      {plan.features.slice(0, 3).map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-gray-600">{feature}</span>
                        </div>
                      ))}
                      {plan.features.length > 3 && (
                        <div className="text-xs text-blue-600">
                          +{plan.features.length - 3} more features
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Selected Plan Summary */}
          {selectedPlanData && (
            <Card className="p-6 lg:p-8 rounded-3xl bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="text-center lg:text-left">
                  <h3 className="text-xl font-semibold mb-2">Selected Plan: {selectedPlanData.name}</h3>
                  <p className="text-gray-600 mb-4">{selectedPlanData.description}</p>
                  <div className="flex items-center justify-center lg:justify-start gap-4">
                    <div>
                      <span className="text-2xl font-bold">₹{selectedPlanData.price}</span>
                      <span className="text-gray-500 ml-1">/{selectedPlanData.duration}</span>
                    </div>
                    <Badge className="bg-green-100 text-green-700">
                      Save ₹{selectedPlanData.originalPrice - selectedPlanData.price}
                    </Badge>
                  </div>
                </div>
                <div className="flex flex-col gap-3 w-full lg:w-auto">
                  <Button 
                    onClick={() => onNavigate('payment', selectedCourse, { plan: selectedPlanData })}
                    className="w-full lg:w-48 h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-semibold"
                  >
                    Continue to Payment
                  </Button>
                  <p className="text-xs text-gray-500 text-center">
                    Cancel anytime • 30-day money back guarantee
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Trust Indicators */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4" />
                <span>30-Day Guarantee</span>
              </div>
              <div className="flex items-center gap-1">
                <Crown className="w-4 h-4" />
                <span>Premium Support</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 max-w-2xl mx-auto">
              Trusted by 50,000+ professionals worldwide. Join industry leaders who transformed their careers with Growify.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}