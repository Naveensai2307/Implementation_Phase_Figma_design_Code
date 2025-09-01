import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Smartphone, Play, Users, GraduationCap, Briefcase, User, Shield, FileText, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Checkbox } from './ui/checkbox';

export function SignInPage({ onSignIn, onNavigate }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState(null);
  const [showUserTypeSelection, setShowUserTypeSelection] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
  const [showError, setShowError] = useState('');

  const userTypes = [
    {
      id: 'student',
      title: 'Student',
      description: 'Learn new skills and advance your career',
      icon: GraduationCap,
      color: 'bg-blue-500',
      features: ['Access to all courses', 'Interactive assignments', 'Progress tracking', 'Community support']
    },
    {
      id: 'professional',
      title: 'Professional',
      description: 'Upskill and stay competitive in your field',
      icon: Briefcase,
      color: 'bg-green-500',
      features: ['Professional certificates', 'Industry projects', 'Career guidance', 'Networking opportunities']
    },
    {
      id: 'teacher',
      title: 'Teacher',
      description: 'Create courses and teach others',
      icon: User,
      color: 'bg-purple-500',
      features: ['Course creation tools', 'Student analytics', 'Revenue sharing', 'Teaching resources']
    }
  ];

  const platformFeatures = [
    {
      icon: Smartphone,
      title: 'Mobile Learning',
      description: 'Learn anywhere, anytime with our mobile-optimized platform',
      color: 'from-blue-500 to-cyan-500',
      action: () => alert('Mobile Learning: Access courses on any device, download for offline viewing, and sync progress across all platforms!')
    },
    {
      icon: Play,
      title: 'HD Content',
      description: 'High-definition videos and interactive content for better learning',
      color: 'from-purple-500 to-pink-500',
      action: () => alert('HD Content: Enjoy crystal-clear 4K videos, interactive labs, and immersive learning experiences!')
    },
    {
      icon: Users,
      title: 'Interactive Content',
      description: 'Engage with quizzes, assignments, and peer discussions',
      color: 'from-green-500 to-teal-500',
      action: () => alert('Interactive Content: Participate in live coding sessions, peer reviews, and hands-on projects!')
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowError('');

    // Validate inputs
    if (!email || !password) {
      setShowError('Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      setShowError('Please enter a valid email address');
      return;
    }

    if (isSignUp && (!agreedToTerms || !agreedToPrivacy)) {
      setShowError('Please agree to the Terms of Service and Privacy Policy');
      return;
    }

    // Basic email format validation
    if (!email.includes('@') || !email.includes('.')) {
      setShowError('Please enter a valid email address');
      return;
    }

    // Mock authentication logic
    if (password.length < 6) {
      setShowError('Password must be at least 6 characters long');
      return;
    }

    // For sign up, show user type selection
    if (isSignUp && !selectedUserType) {
      setShowUserTypeSelection(true);
      return;
    }

    // Successful authentication
    const userData = {
      name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
      email: email,
      userType: selectedUserType || 'student'
    };

    onSignIn(userData);
  };

  const handleUserTypeSelection = (userType) => {
    setSelectedUserType(userType);
    setShowUserTypeSelection(false);
    
    // Complete registration
    const userData = {
      name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
      email: email,
      userType: userType
    };

    onSignIn(userData);
  };

  const handlePrivacyClick = () => {
    alert('Privacy Policy: We protect your personal information and never share it with third parties. Your learning data is encrypted and secure.');
  };

  const handleTermsClick = () => {
    alert('Terms of Service: By using Growify, you agree to our fair use policy, content guidelines, and community standards.');
  };

  // Handle social sign-in with actual OAuth redirects
  const handleSocialSignIn = (provider) => {
    // Generate OAuth URLs for real authentication
    const redirectUri = encodeURIComponent(window.location.origin + '/auth/callback');
    
    if (provider === 'google') {
      // Google OAuth 2.0 URL - Replace YOUR_GOOGLE_CLIENT_ID with actual client ID
      const googleAuthUrl = `https://accounts.google.com/oauth2/authorize?` +
        `client_id=YOUR_GOOGLE_CLIENT_ID&` +
        `redirect_uri=${redirectUri}&` +
        `response_type=code&` +
        `scope=email profile&` +
        `access_type=offline&` +
        `prompt=consent`;
      
      window.location.href = googleAuthUrl;
    } else if (provider === 'facebook') {
      // Facebook OAuth URL - Replace YOUR_FACEBOOK_APP_ID with actual app ID
      const facebookAuthUrl = `https://www.facebook.com/v18.0/dialog/oauth?` +
        `client_id=YOUR_FACEBOOK_APP_ID&` +
        `redirect_uri=${redirectUri}&` +
        `scope=email&` +
        `response_type=code`;
      
      window.location.href = facebookAuthUrl;
    }
  };

  if (showUserTypeSelection) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Choose Your Path</h1>
            <p className="text-gray-600">Select how you'll be using Growify</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {userTypes.map((type) => {
              const Icon = type.icon;
              return (
                <Card 
                  key={type.id}
                  className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
                  onClick={() => handleUserTypeSelection(type.id)}
                >
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 ${type.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-lg">{type.title}</CardTitle>
                    <CardDescription>{type.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {type.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-6">
            <Button 
              variant="outline" 
              onClick={() => setShowUserTypeSelection(false)}
            >
              Back to Sign Up
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container-responsive px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen">
          {/* Left Side - Branding and Features */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Welcome to <span className="text-blue-600">Growify</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8">
                Transform your learning journey with our comprehensive online platform
              </p>
            </div>

            {/* Platform Features - Now Clickable */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Discover Our Features</h2>
              <div className="space-y-4">
                {platformFeatures.map((feature, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className={`w-full p-6 h-auto hover:shadow-md transition-all duration-200 bg-white rounded-lg border border-gray-200 hover:border-blue-300`}
                    onClick={feature.action}
                  >
                    <div className="flex items-start gap-4 text-left">
                      <div className={`bg-gradient-to-r ${feature.color} p-3 rounded-full`}>
                        <feature.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">{feature.title}</h3>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-400 mt-1" />
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 p-6 bg-white rounded-lg shadow-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">50K+</div>
                <div className="text-sm text-gray-600">Students</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">200+</div>
                <div className="text-sm text-gray-600">Courses</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">95%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Right Side - Sign In Form */}
          <div className="w-full max-w-md mx-auto">
            <Card className="shadow-xl">
              <CardHeader className="text-center space-y-2">
                <CardTitle className="text-2xl">
                  {isSignUp ? 'Create Account' : 'Sign In'}
                </CardTitle>
                <CardDescription>
                  {isSignUp 
                    ? 'Join thousands of learners worldwide' 
                    : 'Welcome back! Please sign in to continue'
                  }
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {showError && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                    {showError}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {isSignUp && (
                    <div className="space-y-4">
                      <div className="flex items-start space-x-2">
                        <Checkbox 
                          id="terms" 
                          checked={agreedToTerms}
                          onCheckedChange={setAgreedToTerms}
                        />
                        <div className="grid gap-1.5 leading-none">
                          <Label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            I agree to the{' '}
                            <Button 
                              variant="link" 
                              type="button" 
                              className="p-0 h-auto text-blue-600"
                              onClick={handleTermsClick}
                            >
                              Terms of Service
                            </Button>
                          </Label>
                        </div>
                      </div>

                      <div className="flex items-start space-x-2">
                        <Checkbox 
                          id="privacy" 
                          checked={agreedToPrivacy}
                          onCheckedChange={setAgreedToPrivacy}
                        />
                        <div className="grid gap-1.5 leading-none">
                          <Label
                            htmlFor="privacy"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            I agree to the{' '}
                            <Button 
                              variant="link" 
                              type="button" 
                              className="p-0 h-auto text-blue-600"
                              onClick={handlePrivacyClick}
                            >
                              Privacy Policy
                            </Button>
                          </Label>
                        </div>
                      </div>
                    </div>
                  )}

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    {isSignUp ? 'Create Account' : 'Sign In'}
                  </Button>
                </form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    type="button" 
                    className="w-full hover:bg-gray-50 transition-colors"
                    onClick={() => handleSocialSignIn('google')}
                  >
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                  </Button>
                  <Button 
                    variant="outline" 
                    type="button" 
                    className="w-full hover:bg-gray-50 transition-colors"
                    onClick={() => handleSocialSignIn('facebook')}
                  >
                    <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </Button>
                </div>

                <div className="text-center">
                  <Button 
                    variant="link" 
                    type="button"
                    onClick={() => {
                      setIsSignUp(!isSignUp);
                      setShowError('');
                      setAgreedToTerms(false);
                      setAgreedToPrivacy(false);
                    }}
                    className="text-blue-600"
                  >
                    {isSignUp 
                      ? 'Already have an account? Sign in' 
                      : "Don't have an account? Sign up"
                    }
                  </Button>
                </div>


              </CardContent>
            </Card>

            {/* Legal Links - Now Clickable */}
            <div className="text-center mt-6 space-y-2">
              <div className="flex justify-center gap-6 text-sm text-gray-600">
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-gray-600 hover:text-blue-600"
                  onClick={handlePrivacyClick}
                >
                  <Shield className="h-3 w-3 mr-1" />
                  Privacy Policy
                </Button>
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-gray-600 hover:text-blue-600"
                  onClick={handleTermsClick}
                >
                  <FileText className="h-3 w-3 mr-1" />
                  Terms of Service
                </Button>
              </div>
              <p className="text-xs text-gray-500">© 2024 Growify. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}