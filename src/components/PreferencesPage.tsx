import React, { useState } from 'react';
import { ArrowLeft, Palette, Globe, Download, Moon, Sun, Smartphone, Monitor, Eye, Volume2, Type, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';

export function PreferencesPage({ user, onBack, onNavigate, isDarkMode, onToggleDarkMode }) {
  const [language, setLanguage] = useState('english');
  const [autoDownload, setAutoDownload] = useState(false);
  const [downloadQuality, setDownloadQuality] = useState('hd');
  const [fontSize, setFontSize] = useState([16]);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);

  const languages = [
    { value: 'english', label: 'English (US)' },
    { value: 'spanish', label: 'Español' },
    { value: 'french', label: 'Français' },
    { value: 'german', label: 'Deutsch' },
    { value: 'japanese', label: '日本語' },
    { value: 'chinese', label: '中文' },
    { value: 'hindi', label: 'हिन्दी' }
  ];

  const qualityOptions = [
    { value: 'low', label: 'Low (480p)' },
    { value: 'medium', label: 'Medium (720p)' },
    { value: 'hd', label: 'HD (1080p)' },
    { value: 'uhd', label: '4K (2160p)' }
  ];

  const preferenceGroups = [
    {
      title: "Appearance",
      icon: Palette,
      items: [
        {
          id: 'darkMode',
          title: 'Dark Mode',
          description: 'Switch between light and dark themes',
          icon: isDarkMode ? Moon : Sun,
          hasSwitch: true,
          value: isDarkMode,
          onChange: onToggleDarkMode,
          color: isDarkMode ? 'text-blue-400' : 'text-yellow-500'
        },
        {
          id: 'fontSize',
          title: 'Font Size',
          description: `Text size: ${fontSize[0]}px`,
          icon: Type,
          hasSlider: true,
          value: fontSize,
          onChange: setFontSize,
          min: 12,
          max: 24,
          step: 1
        },
        {
          id: 'reducedMotion',
          title: 'Reduce Motion',
          description: 'Minimize animations and transitions',
          icon: Zap,
          hasSwitch: true,
          value: reducedMotion,
          onChange: setReducedMotion
        }
      ]
    },
    {
      title: "Language & Region",
      icon: Globe,
      items: [
        {
          id: 'language',
          title: 'Language',
          description: 'Choose your preferred language',
          icon: Globe,
          hasSelect: true,
          value: language,
          onChange: setLanguage,
          options: languages
        }
      ]
    },
    {
      title: "Downloads & Offline",
      icon: Download,
      items: [
        {
          id: 'autoDownload',
          title: 'Auto Download',
          description: 'Automatically download lessons for offline viewing',
          icon: Download,
          hasSwitch: true,
          value: autoDownload,
          onChange: setAutoDownload
        },
        {
          id: 'downloadQuality',
          title: 'Download Quality',
          description: 'Choose video quality for downloads',
          icon: Monitor,
          hasSelect: true,
          value: downloadQuality,
          onChange: setDownloadQuality,
          options: qualityOptions
        }
      ]
    },
    {
      title: "Playback",
      icon: Volume2,
      items: [
        {
          id: 'autoPlay',
          title: 'Auto Play Next',
          description: 'Automatically play the next lesson',
          icon: Volume2,
          hasSwitch: true,
          value: autoPlay,
          onChange: setAutoPlay
        }
      ]
    },
    {
      title: "Accessibility",
      icon: Eye,
      items: [
        {
          id: 'accessibility',
          title: 'Accessibility Options',
          description: 'Screen reader and accessibility settings',
          icon: Eye,
          action: () => alert('Accessibility settings will open advanced options for screen readers, keyboard navigation, and other accessibility features.')
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
            <h1 className="text-xl md:text-2xl font-bold">Preferences</h1>
            <p className="text-sm text-muted-foreground">Customize your app experience</p>
          </div>
        </div>

        {/* Current Theme Preview */}
        <Card className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full ${isDarkMode ? 'bg-blue-500' : 'bg-yellow-500'}`}>
                {isDarkMode ? <Moon className="h-6 w-6 text-white" /> : <Sun className="h-6 w-6 text-white" />}
              </div>
              <div>
                <h3 className="font-semibold">{isDarkMode ? 'Dark Mode' : 'Light Mode'} Active</h3>
                <p className="text-sm text-muted-foreground">
                  {isDarkMode 
                    ? 'Easier on the eyes in low light conditions' 
                    : 'Bright and clear for daytime use'
                  }
                </p>
              </div>
              <div className="ml-auto">
                <Badge variant={isDarkMode ? "default" : "secondary"}>
                  {isDarkMode ? 'Dark' : 'Light'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preference Groups */}
        <div className="space-y-6">
          {preferenceGroups.map((group, groupIndex) => (
            <Card key={groupIndex}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                  <group.icon className="h-4 w-4 md:h-5 md:w-5" />
                  {group.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  {group.items.map((item, itemIndex) => (
                    <div key={item.id}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 md:gap-4 flex-1">
                          <item.icon className={`h-4 w-4 md:h-5 md:w-5 flex-shrink-0 ${
                            item.color || 'text-muted-foreground'
                          }`} />
                          <div className="flex-1">
                            <div className="text-sm md:text-base font-medium">
                              {item.title}
                            </div>
                            <div className="text-xs md:text-sm text-muted-foreground">
                              {item.description}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {item.hasSwitch && (
                            <Switch
                              checked={item.value}
                              onCheckedChange={item.onChange}
                            />
                          )}
                          
                          {item.hasSelect && (
                            <Select value={item.value} onValueChange={item.onChange}>
                              <SelectTrigger className="w-[180px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {item.options.map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}

                          {item.action && (
                            <Button variant="outline" size="sm" onClick={item.action}>
                              Configure
                            </Button>
                          )}
                        </div>
                      </div>

                      {item.hasSlider && (
                        <div className="mt-3 pl-7">
                          <Slider
                            value={item.value}
                            onValueChange={item.onChange}
                            max={item.max}
                            min={item.min}
                            step={item.step}
                            className="w-full max-w-xs"
                          />
                        </div>
                      )}

                      {itemIndex < group.items.length - 1 && (
                        <Separator className="mt-4" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Preview Changes */}
        <Card className="mt-6">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="font-semibold mb-2">Preview Your Changes</h3>
              <p className="text-sm text-muted-foreground mb-4">
                See how your preferences affect the app appearance
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium" style={{ fontSize: `${fontSize[0]}px` }}>Sample Text</h4>
                  <p className="text-sm text-muted-foreground" style={{ fontSize: `${fontSize[0] - 2}px` }}>
                    This is how text will appear
                  </p>
                </div>
                <div className="p-4 bg-primary text-primary-foreground rounded-lg">
                  <h4 className="font-medium" style={{ fontSize: `${fontSize[0]}px` }}>Themed Content</h4>
                  <p className="text-sm opacity-90" style={{ fontSize: `${fontSize[0] - 2}px` }}>
                    With current theme applied
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Notice */}
        <div className="text-center mt-6 p-4 bg-blue-50 dark:bg-blue-950/50 rounded-lg">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            ✓ Your preferences are automatically saved
          </p>
        </div>
      </div>
    </div>
  );
}