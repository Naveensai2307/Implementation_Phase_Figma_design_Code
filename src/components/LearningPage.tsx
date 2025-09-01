import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Play, Clock, Target, BarChart3, Brain, Zap, Volume2, Eye, Repeat, Award } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';

export function LearningPage({ user, onBack, onNavigate }) {
  // Playback settings
  const [defaultSpeed, setDefaultSpeed] = useState('1.0');
  const [autoPlay, setAutoPlay] = useState(true);
  const [autoSkipIntro, setAutoSkipIntro] = useState(false);
  const [continuousPlay, setContinuousPlay] = useState(true);

  // Progress tracking
  const [trackingEnabled, setTrackingEnabled] = useState(true);
  const [detailedAnalytics, setDetailedAnalytics] = useState(true);
  const [shareProgress, setShareProgress] = useState(false);
  const [weeklyReports, setWeeklyReports] = useState(true);

  // Learning goals
  const [dailyGoalMinutes, setDailyGoalMinutes] = useState([30]);
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [reminderTime, setReminderTime] = useState('19:00');
  const [weekendGoals, setWeekendGoals] = useState(false);

  // Accessibility
  const [captions, setCaptions] = useState(false);
  const [captionSize, setCaptionSize] = useState('medium');
  const [highContrast, setHighContrast] = useState(false);
  const [focusMode, setFocusMode] = useState(false);

  // Study features
  const [noteTaking, setNoteTaking] = useState(true);
  const [bookmarks, setBookmarks] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);
  const [smartRecommendations, setSmartRecommendations] = useState(true);

  const speedOptions = [
    { value: '0.5', label: '0.5x Slow' },
    { value: '0.75', label: '0.75x' },
    { value: '1.0', label: '1.0x Normal' },
    { value: '1.25', label: '1.25x' },
    { value: '1.5', label: '1.5x Fast' },
    { value: '2.0', label: '2.0x Very Fast' }
  ];

  const captionSizes = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
    { value: 'xlarge', label: 'Extra Large' }
  ];

  const timeOptions = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      timeOptions.push({ value: timeString, label: timeString });
    }
  }

  const learningGroups = [
    {
      title: "Video Playback",
      icon: Play,
      items: [
        {
          id: 'defaultSpeed',
          title: 'Default Playback Speed',
          description: 'Choose your preferred video speed',
          icon: Play,
          hasSelect: true,
          value: defaultSpeed,
          onChange: setDefaultSpeed,
          options: speedOptions
        },
        {
          id: 'autoPlay',
          title: 'Auto Play Next Lesson',
          description: 'Automatically play the next lesson when current one ends',
          icon: Play,
          hasSwitch: true,
          value: autoPlay,
          onChange: setAutoPlay
        },
        {
          id: 'autoSkipIntro',
          title: 'Skip Intro Automatically',
          description: 'Skip introduction sections in lessons',
          icon: Zap,
          hasSwitch: true,
          value: autoSkipIntro,
          onChange: setAutoSkipIntro
        },
        {
          id: 'continuousPlay',
          title: 'Continuous Playback',
          description: 'Play lessons continuously without stopping',
          icon: Repeat,
          hasSwitch: true,
          value: continuousPlay,
          onChange: setContinuousPlay
        }
      ]
    },
    {
      title: "Progress Tracking",
      icon: BarChart3,
      items: [
        {
          id: 'tracking',
          title: 'Enable Progress Tracking',
          description: 'Track your learning progress and statistics',
          icon: BarChart3,
          hasSwitch: true,
          value: trackingEnabled,
          onChange: setTrackingEnabled,
          primary: true
        },
        {
          id: 'analytics',
          title: 'Detailed Analytics',
          description: 'Collect detailed learning analytics and insights',
          icon: Brain,
          hasSwitch: true,
          value: detailedAnalytics,
          onChange: setDetailedAnalytics,
          disabled: !trackingEnabled
        },
        {
          id: 'shareProgress',
          title: 'Share Progress',
          description: 'Allow sharing progress with instructors and peers',
          icon: Award,
          hasSwitch: true,
          value: shareProgress,
          onChange: setShareProgress,
          disabled: !trackingEnabled
        },
        {
          id: 'weeklyReports',
          title: 'Weekly Progress Reports',
          description: 'Receive weekly summaries of your learning progress',
          icon: BarChart3,
          hasSwitch: true,
          value: weeklyReports,
          onChange: setWeeklyReports,
          disabled: !trackingEnabled
        }
      ]
    },
    {
      title: "Learning Goals",
      icon: Target,
      items: [
        {
          id: 'dailyGoal',
          title: 'Daily Learning Goal',
          description: `Study for ${dailyGoalMinutes[0]} minutes per day`,
          icon: Target,
          hasSlider: true,
          value: dailyGoalMinutes,
          onChange: setDailyGoalMinutes,
          min: 5,
          max: 180,
          step: 5
        },
        {
          id: 'reminders',
          title: 'Daily Reminders',
          description: 'Get reminded to study at your preferred time',
          icon: Clock,
          hasSwitch: true,
          value: reminderEnabled,
          onChange: setReminderEnabled
        },
        {
          id: 'weekendGoals',
          title: 'Weekend Goals',
          description: 'Include weekends in your learning goals',
          icon: Target,
          hasSwitch: true,
          value: weekendGoals,
          onChange: setWeekendGoals
        }
      ]
    },
    {
      title: "Accessibility",
      icon: Eye,
      items: [
        {
          id: 'captions',
          title: 'Closed Captions',
          description: 'Show captions for video content',
          icon: Eye,
          hasSwitch: true,
          value: captions,
          onChange: setCaptions
        },
        {
          id: 'captionSize',
          title: 'Caption Size',
          description: 'Choose caption text size',
          icon: Eye,
          hasSelect: true,
          value: captionSize,
          onChange: setCaptionSize,
          options: captionSizes,
          disabled: !captions
        },
        {
          id: 'highContrast',
          title: 'High Contrast Mode',
          description: 'Increase contrast for better visibility',
          icon: Eye,
          hasSwitch: true,
          value: highContrast,
          onChange: setHighContrast
        },
        {
          id: 'focusMode',
          title: 'Focus Mode',
          description: 'Hide distracting elements during lessons',
          icon: Brain,
          hasSwitch: true,
          value: focusMode,
          onChange: setFocusMode
        }
      ]
    },
    {
      title: "Study Features",
      icon: BookOpen,
      items: [
        {
          id: 'notes',
          title: 'Note Taking',
          description: 'Enable in-video note taking feature',
          icon: BookOpen,
          hasSwitch: true,
          value: noteTaking,
          onChange: setNoteTaking
        },
        {
          id: 'bookmarks',
          title: 'Video Bookmarks',
          description: 'Save important moments in videos',
          icon: BookOpen,
          hasSwitch: true,
          value: bookmarks,
          onChange: setBookmarks
        },
        {
          id: 'offline',
          title: 'Offline Learning',
          description: 'Download lessons for offline study',
          icon: BookOpen,
          hasSwitch: true,
          value: offlineMode,
          onChange: setOfflineMode
        },
        {
          id: 'recommendations',
          title: 'Smart Recommendations',
          description: 'Get AI-powered course and lesson suggestions',
          icon: Brain,
          hasSwitch: true,
          value: smartRecommendations,
          onChange: setSmartRecommendations
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
            <h1 className="text-xl md:text-2xl font-bold">Learning Settings</h1>
            <p className="text-sm text-muted-foreground">Customize your learning experience</p>
          </div>
        </div>

        {/* Learning Stats */}
        <Card className="mb-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/50 dark:to-blue-950/50">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{dailyGoalMinutes[0]}m</div>
                <div className="text-sm text-muted-foreground">Daily Goal</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{defaultSpeed}x</div>
                <div className="text-sm text-muted-foreground">Playback Speed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{trackingEnabled ? 'On' : 'Off'}</div>
                <div className="text-sm text-muted-foreground">Progress Tracking</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{captions ? 'On' : 'Off'}</div>
                <div className="text-sm text-muted-foreground">Captions</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Learning Groups */}
        <div className="space-y-6">
          {learningGroups.map((group, groupIndex) => (
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
                            item.primary ? 'text-blue-500' : 'text-muted-foreground'
                          } ${item.disabled ? 'opacity-50' : ''}`} />
                          <div className="flex-1">
                            <div className={`text-sm md:text-base font-medium ${
                              item.disabled ? 'opacity-50' : ''
                            }`}>
                              {item.title}
                            </div>
                            <div className={`text-xs md:text-sm text-muted-foreground ${
                              item.disabled ? 'opacity-50' : ''
                            }`}>
                              {item.description}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {item.hasSwitch && (
                            <Switch
                              checked={item.value}
                              onCheckedChange={item.onChange}
                              disabled={item.disabled}
                            />
                          )}
                          
                          {item.hasSelect && (
                            <Select 
                              value={item.value} 
                              onValueChange={item.onChange}
                              disabled={item.disabled}
                            >
                              <SelectTrigger className="w-[140px]">
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
                          <div className="flex justify-between text-xs text-muted-foreground mt-1 max-w-xs">
                            <span>{item.min}m</span>
                            <span>{item.max}m</span>
                          </div>
                        </div>
                      )}

                      {itemIndex < group.items.length - 1 && (
                        <Separator className="mt-4" />
                      )}
                    </div>
                  ))}

                  {/* Reminder Time Selection */}
                  {group.title === "Learning Goals" && reminderEnabled && (
                    <div className="mt-4 p-4 bg-muted rounded-lg">
                      <h4 className="font-medium mb-3">Daily Reminder Time</h4>
                      <Select value={reminderTime} onValueChange={setReminderTime}>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {timeOptions.map((time) => (
                            <SelectItem key={time.value} value={time.value}>
                              {time.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground mt-2">
                        We'll remind you to study at {reminderTime} every day
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Learning Tips */}
        <Card className="mt-6">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="font-semibold mb-2">💡 Learning Tips</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="p-3 bg-muted rounded-lg">
                  <h4 className="font-medium text-sm">Consistent Schedule</h4>
                  <p className="text-xs text-muted-foreground">Study at the same time daily for better retention</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <h4 className="font-medium text-sm">Take Notes</h4>
                  <p className="text-xs text-muted-foreground">Active note-taking improves comprehension by 40%</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <h4 className="font-medium text-sm">Use Bookmarks</h4>
                  <p className="text-xs text-muted-foreground">Mark important sections for quick review</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <h4 className="font-medium text-sm">Adjust Speed</h4>
                  <p className="text-xs text-muted-foreground">Slower for complex topics, faster for review</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Notice */}
        <div className="text-center mt-6 p-4 bg-blue-50 dark:bg-blue-950/50 rounded-lg">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            ✓ Your learning preferences are automatically saved
          </p>
        </div>
      </div>
    </div>
  );
}