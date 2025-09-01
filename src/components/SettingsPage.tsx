import React, { useState } from 'react';
import { ArrowLeft, User, Bell, Shield, Palette, Globe, HelpCircle, Info, ChevronRight, BookOpen, Volume2, Lock, CreditCard, Download, Share, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

export function SettingsPage({ user, onBack, onLogout, onNavigate, isDarkMode, onToggleDarkMode }) {
  const settingsGroups = [
    {
      title: "Account",
      icon: User,
      items: [
        {
          id: 'profile',
          title: 'Profile Settings',
          description: 'Manage your personal information',
          icon: User,
          action: () => onNavigate('accountManagement'),
          hasSwitch: false
        },
        {
          id: 'security',
          title: 'Security & Privacy',
          description: 'Password, two-factor authentication',
          icon: Shield,
          action: () => onNavigate('accountManagement'),
          hasSwitch: false
        },
        {
          id: 'billing',
          title: 'Billing & Payments',
          description: 'Manage subscriptions and payment methods',
          icon: CreditCard,
          action: () => onNavigate('orderHistory'),
          hasSwitch: false
        }
      ]
    },
    {
      title: "Preferences",
      icon: Palette,
      items: [
        {
          id: 'preferences',
          title: 'App Preferences',
          description: 'Theme, language, and display settings',
          icon: Palette,
          action: () => onNavigate('preferences'),
          hasSwitch: false
        },
        {
          id: 'autoDownload',
          title: 'Download Settings',
          description: 'Manage offline content and quality',
          icon: Download,
          action: () => onNavigate('preferences'),
          hasSwitch: false
        }
      ]
    },
    {
      title: "Notifications",
      icon: Bell,
      items: [
        {
          id: 'notifications',
          title: 'Notification Settings',
          description: 'Customize your notification preferences',
          icon: Bell,
          action: () => onNavigate('notifications'),
          hasSwitch: false
        },
        {
          id: 'sound',
          title: 'Sound & Alerts',
          description: 'Manage sound settings and alerts',
          icon: Volume2,
          action: () => onNavigate('notifications'),
          hasSwitch: false
        }
      ]
    },
    {
      title: "Learning",
      icon: BookOpen,
      items: [
        {
          id: 'learningPrefs',
          title: 'Learning Preferences',
          description: 'Customize your learning experience',
          icon: BookOpen,
          action: () => onNavigate('learning'),
          hasSwitch: false
        },
        {
          id: 'playbackSpeed',
          title: 'Playback & Quality',
          description: 'Video speed and quality settings',
          icon: Volume2,
          action: () => onNavigate('learning'),
          hasSwitch: false
        },
        {
          id: 'progress',
          title: 'Progress Tracking',
          description: 'How we track your learning progress',
          icon: BookOpen,
          action: () => onNavigate('learning'),
          hasSwitch: false
        }
      ]
    },
    {
      title: "Support & Legal",
      icon: HelpCircle,
      items: [
        {
          id: 'help',
          title: 'Help Center',
          description: 'Get help and find answers',
          icon: HelpCircle,
          action: () => onNavigate('supportLegal'),
          hasSwitch: false
        },
        {
          id: 'feedback',
          title: 'Send Feedback',
          description: 'Help us improve Growify',
          icon: Share,
          action: () => onNavigate('supportLegal'),
          hasSwitch: false
        },
        {
          id: 'privacy',
          title: 'Privacy Policy',
          description: 'Read our privacy policy',
          icon: Shield,
          action: () => onNavigate('supportLegal'),
          hasSwitch: false
        },
        {
          id: 'terms',
          title: 'Terms of Service',
          description: 'View terms and conditions',
          icon: Info,
          action: () => onNavigate('supportLegal'),
          hasSwitch: false
        }
      ]
    },
    {
      title: "Advanced",
      icon: Lock,
      items: [
        {
          id: 'clearCache',
          title: 'Clear Cache',
          description: 'Free up storage space',
          icon: Trash2,
          action: () => {
            if (confirm('Are you sure you want to clear the cache?')) {
              alert('Cache cleared successfully!');
            }
          },
          hasSwitch: false,
          destructive: true
        },
        {
          id: 'resetSettings',
          title: 'Reset All Settings',
          description: 'Reset to default preferences',
          icon: Trash2,
          action: () => {
            if (confirm('Are you sure you want to reset all settings? This cannot be undone.')) {
              // Reset dark mode to default
              if (isDarkMode && onToggleDarkMode) {
                onToggleDarkMode();
              }
              alert('Settings reset to defaults!');
            }
          },
          hasSwitch: false,
          destructive: true
        }
      ]
    }
  ];

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
            <h1 className="text-xl md:text-2xl font-bold">Settings</h1>
            <p className="text-sm text-muted-foreground">Manage your preferences and account</p>
          </div>
        </div>

        {/* User Info Card */}
        <Card className="mb-6">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 md:h-16 md:w-16 bg-blue-500 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 md:h-8 md:w-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-sm md:text-base">{user?.name || 'Janne'}</h3>
                <p className="text-xs md:text-sm text-muted-foreground">{user?.email || 'janne@example.com'}</p>
                <Badge variant="secondary" className="mt-1 text-xs">Premium Member</Badge>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate('accountManagement')}
                className="text-xs md:text-sm"
              >
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Settings Groups */}
        <div className="space-y-6">
          {settingsGroups.map((group, groupIndex) => (
            <Card key={groupIndex}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                  <group.icon className="h-4 w-4 md:h-5 md:w-5" />
                  {group.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-1">
                  {group.items.map((item, itemIndex) => (
                    <div key={item.id}>
                      <Button
                        variant="ghost"
                        className={`w-full justify-start p-3 md:p-4 h-auto hover:bg-accent ${
                          item.destructive ? 'hover:bg-destructive/10 text-destructive hover:text-destructive' : ''
                        }`}
                        onClick={item.action}
                      >
                        <div className="flex items-center gap-3 md:gap-4 w-full">
                          <item.icon className={`h-4 w-4 md:h-5 md:w-5 flex-shrink-0 ${
                            item.destructive ? 'text-destructive' : 'text-muted-foreground'
                          }`} />
                          <div className="flex-1 text-left">
                            <div className={`text-sm md:text-base font-medium ${
                              item.destructive ? 'text-destructive' : ''
                            }`}>
                              {item.title}
                            </div>
                            <div className={`text-xs md:text-sm text-muted-foreground ${
                              item.destructive ? 'text-destructive/70' : ''
                            }`}>
                              {item.description}
                            </div>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        </div>
                      </Button>
                      {itemIndex < group.items.length - 1 && (
                        <Separator className="my-1" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Logout Button */}
        <Card className="mt-6">
          <CardContent className="p-0">
            <Button
              variant="ghost"
              className="w-full justify-start p-4 h-auto text-destructive hover:bg-destructive/10"
              onClick={() => onNavigate('logoutConfirm')}
            >
              <div className="flex items-center gap-4 w-full">
                <ArrowLeft className="h-5 w-5 rotate-180" />
                <div className="text-left">
                  <div className="text-base font-medium">Sign Out</div>
                  <div className="text-sm text-destructive/70">Sign out of your account</div>
                </div>
              </div>
            </Button>
          </CardContent>
        </Card>

        {/* App Info */}
        <div className="text-center mt-8 space-y-2">
          <p className="text-xs md:text-sm text-muted-foreground">Growify Learning Platform</p>
          <p className="text-xs text-muted-foreground">Version 2.1.0</p>
          <p className="text-xs text-muted-foreground">© 2024 Growify. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}