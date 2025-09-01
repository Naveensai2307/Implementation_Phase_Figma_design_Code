import React, { useState } from 'react';
import { ArrowLeft, HelpCircle, MessageSquare, Mail, Phone, FileText, Shield, Info, ExternalLink, Search, Book, Video, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export function SupportLegalPage({ user, onBack, onNavigate }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [feedbackType, setFeedbackType] = useState('general');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const supportOptions = [
    {
      title: "Help Center",
      description: "Browse our comprehensive help documentation",
      icon: Book,
      action: () => alert('Opening Help Center with tutorials, guides, and troubleshooting tips...'),
      badge: "24/7 Available"
    },
    {
      title: "Video Tutorials",
      description: "Watch step-by-step video guides",
      icon: Video,
      action: () => alert('Opening video tutorial library with platform walkthroughs...'),
      badge: "New"
    },
    {
      title: "Live Chat Support",
      description: "Chat with our support team in real-time",
      icon: MessageSquare,
      action: () => alert('Starting live chat with support team. Average wait time: 2 minutes'),
      badge: "Online",
      badgeColor: "bg-green-500"
    },
    {
      title: "Email Support",
      description: "Send us a detailed message about your issue",
      icon: Mail,
      action: () => alert('Opening email composer to support@growify.com'),
      badge: "24-48h Response"
    },
    {
      title: "Phone Support",
      description: "Speak directly with our support team",
      icon: Phone,
      action: () => alert('Phone Support: +1-800-GROWIFY (476-9439). Available Mon-Fri 9AM-6PM EST'),
      badge: "Business Hours"
    }
  ];

  const faqItems = [
    {
      question: "How do I reset my password?",
      answer: "Go to Settings > Account > Security & Privacy and click 'Change Password'."
    },
    {
      question: "Can I download courses for offline viewing?",
      answer: "Yes! Enable auto-download in Settings > Preferences > Downloads & Offline."
    },
    {
      question: "How do I change my notification settings?",
      answer: "Visit Settings > Notifications to customize all your notification preferences."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, Apple Pay, Google Pay, and UPI payments."
    },
    {
      question: "How do I cancel my subscription?",
      answer: "Go to Settings > Account > Billing & Payments and click 'Manage Subscription'."
    }
  ];

  const legalDocuments = [
    {
      title: "Privacy Policy",
      description: "How we collect, use, and protect your personal information",
      icon: Shield,
      lastUpdated: "December 1, 2024",
      action: () => alert('Privacy Policy:\n\nWe protect your personal information and never share it with third parties without your consent. Your learning data is encrypted and secure.\n\nKey points:\n• Data encryption at rest and in transit\n• No selling of personal information\n• GDPR and CCPA compliant\n• Right to data deletion\n• Transparent data usage\n\nFull policy available at growify.com/privacy')
    },
    {
      title: "Terms of Service",
      description: "The rules and guidelines for using Growify",
      icon: FileText,
      lastUpdated: "December 1, 2024",
      action: () => alert('Terms of Service:\n\nBy using Growify, you agree to:\n• Use the platform for educational purposes\n• Respect intellectual property rights\n• Follow community guidelines\n• Not share account credentials\n• Accept our refund policy\n\nFull terms available at growify.com/terms')
    },
    {
      title: "Cookie Policy",
      description: "How we use cookies to improve your experience",
      icon: Info,
      lastUpdated: "November 15, 2024",
      action: () => alert('Cookie Policy:\n\nWe use cookies to:\n• Remember your preferences\n• Improve platform performance\n• Provide personalized content\n• Analyze usage patterns\n\nYou can manage cookie preferences in your browser settings.\n\nFull policy available at growify.com/cookies')
    },
    {
      title: "Community Guidelines",
      description: "Rules for interacting with other learners",
      icon: MessageSquare,
      lastUpdated: "October 20, 2024",
      action: () => alert('Community Guidelines:\n\n• Be respectful and kind to all users\n• No harassment, bullying, or discrimination\n• Share knowledge and help others learn\n• No spam or promotional content\n• Report inappropriate behavior\n• Follow instructor guidelines\n\nViolations may result in account suspension.\n\nFull guidelines available at growify.com/community')
    }
  ];

  const feedbackTypes = [
    { value: 'general', label: 'General Feedback' },
    { value: 'bug', label: 'Bug Report' },
    { value: 'feature', label: 'Feature Request' },
    { value: 'course', label: 'Course Feedback' },
    { value: 'technical', label: 'Technical Issue' },
    { value: 'billing', label: 'Billing Question' }
  ];

  const filteredFAQ = faqItems.filter(item =>
    searchQuery === '' || 
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFeedbackSubmit = () => {
    if (!feedbackMessage.trim()) {
      alert('Please enter your feedback message.');
      return;
    }

    alert(`Thank you for your ${feedbackTypes.find(t => t.value === feedbackType)?.label}!\n\nYour message has been sent to our team. We'll review it and get back to you within 24-48 hours if a response is needed.\n\nReference ID: FB-${Date.now()}`);
    setFeedbackMessage('');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container-responsive px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-xl md:text-2xl font-bold">Support & Legal</h1>
            <p className="text-sm text-muted-foreground">Get help and review our policies</p>
          </div>
        </div>

        {/* Quick Support Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {supportOptions.map((option, index) => (
            <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow" onClick={option.action}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <option.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{option.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{option.description}</p>
                    <Badge 
                      variant="secondary" 
                      className={`mt-2 text-xs ${option.badgeColor || 'bg-blue-100 text-blue-700'}`}
                    >
                      {option.badge}
                    </Badge>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Frequently Asked Questions
            </CardTitle>
            <CardDescription>Find quick answers to common questions</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Search FAQ */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search FAQ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* FAQ List */}
            <div className="space-y-4">
              {filteredFAQ.map((faq, index) => (
                <div key={index} className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">{faq.question}</h4>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
              {filteredFAQ.length === 0 && searchQuery && (
                <div className="text-center py-8 text-muted-foreground">
                  <HelpCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No FAQ found matching "{searchQuery}"</p>
                  <p className="text-sm">Try contacting our support team for help</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Feedback Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Send Feedback
            </CardTitle>
            <CardDescription>Help us improve Growify with your suggestions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Feedback Type</label>
              <Select value={feedbackType} onValueChange={setFeedbackType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {feedbackTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium">Your Message</label>
              <Textarea
                placeholder="Tell us what you think, report a bug, or suggest a new feature..."
                value={feedbackMessage}
                onChange={(e) => setFeedbackMessage(e.target.value)}
                rows={4}
              />
            </div>
            
            <Button onClick={handleFeedbackSubmit} className="w-full">
              <Send className="h-4 w-4 mr-2" />
              Send Feedback
            </Button>
          </CardContent>
        </Card>

        {/* Legal Documents */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Legal Documents
            </CardTitle>
            <CardDescription>Important policies and terms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {legalDocuments.map((doc, index) => (
                <div key={index}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start p-4 h-auto hover:bg-accent"
                    onClick={doc.action}
                  >
                    <div className="flex items-center gap-4 w-full">
                      <doc.icon className="h-5 w-5 text-muted-foreground" />
                      <div className="flex-1 text-left">
                        <div className="font-medium">{doc.title}</div>
                        <div className="text-sm text-muted-foreground">{doc.description}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Last updated: {doc.lastUpdated}
                        </div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </Button>
                  {index < legalDocuments.length - 1 && <Separator className="my-2" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="font-semibold mb-4">Still Need Help?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="p-3 bg-muted rounded-lg">
                  <Mail className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                  <div className="font-medium">Email</div>
                  <div className="text-muted-foreground">support@growify.com</div>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <Phone className="h-6 w-6 mx-auto mb-2 text-green-500" />
                  <div className="font-medium">Phone</div>
                  <div className="text-muted-foreground">+1-800-GROWIFY</div>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <MessageSquare className="h-6 w-6 mx-auto mb-2 text-purple-500" />
                  <div className="font-medium">Live Chat</div>
                  <div className="text-muted-foreground">Available 24/7</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 space-y-2">
          <p className="text-xs md:text-sm text-muted-foreground">Growify Learning Platform</p>
          <p className="text-xs text-muted-foreground">© 2024 Growify. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}