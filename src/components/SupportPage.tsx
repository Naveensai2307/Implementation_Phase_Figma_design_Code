import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { ArrowLeft, Search, MessageCircle, Phone, Mail, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export function SupportPage({ user, onBack, onNavigate }) {
  const [activeTab, setActiveTab] = useState('faq');
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [contactForm, setContactForm] = useState({
    subject: '',
    message: '',
    priority: 'medium'
  });

  const faqCategories = [
    {
      title: 'Getting Started',
      icon: '🚀',
      questions: [
        {
          id: 1,
          question: 'How do I create an account on Growify?',
          answer: 'Creating an account is simple! Click the "Sign Up" button on the homepage, enter your email address and create a password. You can also sign up using your Google or Facebook account for faster registration. Once registered, you\'ll receive a confirmation email to verify your account.'
        },
        {
          id: 2,
          question: 'How do I enroll in a course?',
          answer: 'To enroll in a course: 1) Browse our course catalog, 2) Click on the course you\'re interested in, 3) Review the course details and curriculum, 4) Click "Enroll Now" button, 5) Complete the payment process (for paid courses) or click "Start Learning" (for free courses). You\'ll immediately get access to all course materials.'
        },
        {
          id: 3,
          question: 'Can I access courses on mobile devices?',
          answer: 'Yes! Growify is fully responsive and works seamlessly on all devices including smartphones, tablets, laptops, and desktop computers. You can download our mobile app from the App Store or Google Play for the best mobile learning experience with offline video downloads.'
        }
      ]
    },
    {
      title: 'Course & Learning',
      icon: '📚',
      questions: [
        {
          id: 4,
          question: 'How do I track my learning progress?',
          answer: 'Your progress is automatically tracked as you complete lessons. Visit your Dashboard to see overall progress, or go to individual course pages to see detailed progress. You can also check the "Continue Watching" section to resume courses where you left off. Progress is saved across all your devices.'
        },
        {
          id: 5,
          question: 'Can I download videos for offline viewing?',
          answer: 'Yes! Premium subscribers can download course videos for offline viewing. Look for the download icon next to each video lesson. Downloaded content is available for 30 days and can be accessed through our mobile app even without internet connection.'
        },
        {
          id: 6,
          question: 'How do I get a certificate of completion?',
          answer: 'Certificates are automatically generated when you complete 100% of a course, including all lessons, quizzes, and assignments. You can download your certificate from the course completion page or find all your certificates in the "Achievements" section of your profile.'
        },
        {
          id: 7,
          question: 'What if I\'m stuck on a lesson or assignment?',
          answer: 'We offer multiple ways to get help: 1) Check the course discussion forums where instructors and peers answer questions, 2) Use the "Ask Instructor" feature for direct questions, 3) Access our 24/7 live chat support, 4) Join study groups with other learners. Premium members get priority support responses.'
        }
      ]
    },
    {
      title: 'Account & Billing',
      icon: '💳',
      questions: [
        {
          id: 8,
          question: 'How can I upgrade to Premium?',
          answer: 'To upgrade to Premium: Go to your Profile → Account Settings → Subscription. Choose between monthly ($19.99) or annual ($199.99) plans. Premium includes unlimited course access, offline downloads, priority support, and exclusive content. You can upgrade anytime and billing is prorated.'
        },
        {
          id: 9,
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay, and bank transfers. All transactions are secure and encrypted. You can update your payment method anytime in your account settings.'
        },
        {
          id: 10,
          question: 'Can I get a refund?',
          answer: 'Yes! We offer a 30-day money-back guarantee for all paid courses. If you\'re not satisfied, contact our support team within 30 days of purchase for a full refund. The refund process typically takes 3-5 business days. Premium subscriptions can be cancelled anytime with no penalty.'
        },
        {
          id: 11,
          question: 'How do I cancel my subscription?',
          answer: 'You can cancel anytime by going to Profile → Account Settings → Subscription → Cancel Subscription. Your access continues until the end of your current billing period. No cancellation fees apply, and you can reactivate anytime. We also offer pause options if you need a temporary break.'
        }
      ]
    },
    {
      title: 'Technical Issues',
      icon: '⚙️',
      questions: [
        {
          id: 12,
          question: 'Videos won\'t play or are buffering constantly',
          answer: 'Try these solutions: 1) Check your internet connection (minimum 5 Mbps recommended), 2) Clear your browser cache and cookies, 3) Try a different browser (Chrome, Firefox, Safari), 4) Disable browser extensions temporarily, 5) Restart your device. If issues persist, contact support with your device and browser information.'
        },
        {
          id: 13,
          question: 'I forgot my password, how do I reset it?',
          answer: 'Click "Forgot Password" on the login page, enter your email address, and we\'ll send you a reset link. Check your spam folder if you don\'t see the email within 5 minutes. The reset link expires after 24 hours for security. If you still can\'t access your account, contact our support team.'
        },
        {
          id: 14,
          question: 'The website is running slow or not loading',
          answer: 'First, check if the issue is on your end: try refreshing the page, clearing browser cache, or testing other websites. If Growify is specifically slow, try: 1) Using an incognito/private browsing window, 2) Disabling browser extensions, 3) Trying a different network. We also have a status page at status.growify.com for service updates.'
        }
      ]
    }
  ];

  const contactOptions = [
    {
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      icon: MessageCircle,
      color: 'bg-green-100 text-green-700',
      available: '24/7',
      action: () => {}
    },
    {
      title: 'Email Support',
      description: 'Send us a detailed message',
      icon: Mail,
      color: 'bg-blue-100 text-blue-700',
      available: 'Response within 2 hours',
      action: () => {}
    },
    {
      title: 'Phone Support',
      description: 'Speak with a support representative',
      icon: Phone,
      color: 'bg-purple-100 text-purple-700',
      available: 'Mon-Fri 9AM-6PM EST',
      action: () => {}
    }
  ];

  const allQuestions = faqCategories.flatMap(category => category.questions);
  const filteredQuestions = searchQuery 
    ? allQuestions.filter(q => 
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allQuestions;

  const toggleFAQ = (questionId) => {
    setExpandedFAQ(expandedFAQ === questionId ? null : questionId);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    alert('Your message has been sent! We\'ll get back to you within 2 hours.');
    setContactForm({ subject: '', message: '', priority: 'medium' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
  <div className="w-full mx-auto bg-white min-h-screen pb-20">
        {/* Header */}
        <div className="flex items-center justify-between p-4 lg:p-6 border-b border-gray-100">
          <button onClick={onBack} className="hover:bg-gray-100 p-2 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="text-center">
            <h1 className="text-lg lg:text-xl font-semibold">Help & Support</h1>
            <p className="text-xs lg:text-sm text-gray-500">We're here to help you learn</p>
          </div>
          <div className="w-9 h-9"></div>
        </div>

        <div className="p-4 lg:p-6 space-y-6">
          {/* Tab Navigation */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('faq')}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                activeTab === 'faq'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <HelpCircle className="w-4 h-4 inline mr-2" />
              FAQ
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                activeTab === 'contact'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <MessageCircle className="w-4 h-4 inline mr-2" />
              Contact Us
            </button>
          </div>

          {/* FAQ Tab */}
          {activeTab === 'faq' && (
            <>
              {/* Search FAQ */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search frequently asked questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 bg-gray-50 border-gray-200 rounded-xl"
                />
              </div>

              {/* FAQ Categories or Search Results */}
              {searchQuery ? (
                <div>
                  <h3 className="font-semibold mb-4">
                    Search Results ({filteredQuestions.length} found)
                  </h3>
                  <div className="space-y-3">
                    {filteredQuestions.map((question) => (
                      <Card key={question.id} className="rounded-2xl shadow-sm overflow-hidden">
                        <button
                          onClick={() => toggleFAQ(question.id)}
                          className="w-full p-4 lg:p-6 text-left hover:bg-gray-50 transition-colors flex items-center justify-between"
                        >
                          <h4 className="font-medium pr-4">{question.question}</h4>
                          {expandedFAQ === question.id ? (
                            <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                          )}
                        </button>
                        {expandedFAQ === question.id && (
                          <div className="px-4 pb-4 lg:px-6 lg:pb-6 border-t border-gray-100">
                            <p className="text-gray-700 leading-relaxed pt-4">{question.answer}</p>
                          </div>
                        )}
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {faqCategories.map((category, categoryIndex) => (
                    <div key={categoryIndex}>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl">{category.icon}</span>
                        <h3 className="text-lg font-semibold">{category.title}</h3>
                      </div>
                      
                      <div className="space-y-3">
                        {category.questions.map((question) => (
                          <Card key={question.id} className="rounded-2xl shadow-sm overflow-hidden">
                            <button
                              onClick={() => toggleFAQ(question.id)}
                              className="w-full p-4 lg:p-6 text-left hover:bg-gray-50 transition-colors flex items-center justify-between"
                            >
                              <h4 className="font-medium pr-4">{question.question}</h4>
                              {expandedFAQ === question.id ? (
                                <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                              )}
                            </button>
                            {expandedFAQ === question.id && (
                              <div className="px-4 pb-4 lg:px-6 lg:pb-6 border-t border-gray-100">
                                <p className="text-gray-700 leading-relaxed pt-4">{question.answer}</p>
                              </div>
                            )}
                          </Card>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Contact Tab */}
          {activeTab === 'contact' && (
            <>
              {/* Contact Options */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {contactOptions.map((option, index) => {
                  const IconComponent = option.icon;
                  return (
                    <Card 
                      key={index}
                      className="p-6 text-center rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer"
                      onClick={option.action}
                    >
                      <div className={`w-12 h-12 ${option.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <h4 className="font-semibold mb-2">{option.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{option.description}</p>
                      <p className="text-xs text-gray-500">{option.available}</p>
                    </Card>
                  );
                })}
              </div>

              {/* Contact Form */}
              <Card className="p-6 lg:p-8 rounded-3xl shadow-sm">
                <h3 className="text-lg font-semibold mb-6">Send us a message</h3>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Subject</label>
                    <Input
                      type="text"
                      placeholder="What can we help you with?"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                      className="h-12 rounded-xl"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Priority</label>
                    <select 
                      value={contactForm.priority}
                      onChange={(e) => setContactForm(prev => ({ ...prev, priority: e.target.value }))}
                      className="w-full h-12 px-3 border border-gray-200 rounded-xl bg-white"
                    >
                      <option value="low">Low - General question</option>
                      <option value="medium">Medium - Need help with something</option>
                      <option value="high">High - Can't access my course</option>
                      <option value="urgent">Urgent - Payment or billing issue</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <Textarea
                      placeholder="Please describe your issue or question in detail..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                      className="min-h-32 rounded-xl resize-none"
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold"
                  >
                    Send Message
                  </Button>
                </form>
              </Card>
            </>
          )}

          {/* Quick Links */}
          <Card className="p-6 lg:p-8 rounded-3xl shadow-sm bg-gradient-to-r from-green-50 to-blue-50">
            <div className="text-center">
              <h4 className="text-lg font-semibold mb-2">Still need help?</h4>
              <p className="text-gray-600 mb-4">
                Check out these additional resources or contact our support team directly.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button 
                  variant="outline"
                  className="h-12 rounded-xl hover:bg-green-50 hover:border-green-300"
                >
                  📖 User Guide
                </Button>
                <Button 
                  variant="outline"
                  className="h-12 rounded-xl hover:bg-blue-50 hover:border-blue-300"
                >
                  🎥 Video Tutorials
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}