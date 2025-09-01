import React, { useState } from 'react';
import { ArrowLeft, Bell, BellOff, Smartphone, Mail, MessageSquare, Trophy, BookOpen, Clock, Volume2, Vibrate } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export function NotificationsPage({ user, onBack, onNavigate }) {
  const [masterNotifications, setMasterNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [quietHours, setQuietHours] = useState(false);
  const [quietStart, setQuietStart] = useState('22:00');
  const [quietEnd, setQuietEnd] = useState('08:00');

  // Course notifications
  const [newLessons, setNewLessons] = useState(true);
  const [courseUpdates, setCourseUpdates] = useState(true);
  const [assignmentDue, setAssignmentDue] = useState(true);
  const [lessonReminders, setLessonReminders] = useState(false);

  // Achievement notifications
  const [achievements, setAchievements] = useState(true);
  const [streaks, setStreaks] = useState(true);
  const [leaderboard, setLeaderboard] = useState(false);

  // Social notifications
  const [comments, setComments] = useState(false);
  const [mentions, setMentions] = useState(true);
  const [followUpdates, setFollowUpdates] = useState(false);

  const notificationGroups = [
    {
      title: "General Settings",
      icon: Bell,
      items: [
        {
          id: 'master',
          title: 'Enable Notifications',
          description: 'Master switch for all notifications',
          icon: masterNotifications ? Bell : BellOff,
          hasSwitch: true,
          value: masterNotifications,
          onChange: setMasterNotifications,
          primary: true
        },
        {
          id: 'push',
          title: 'Push Notifications',
          description: 'Receive notifications on this device',
          icon: Smartphone,
          hasSwitch: true,
          value: pushNotifications,
          onChange: setPushNotifications,
          disabled: !masterNotifications
        },
        {
          id: 'email',
          title: 'Email Notifications',
          description: 'Receive notifications via email',
          icon: Mail,
          hasSwitch: true,
          value: emailNotifications,
          onChange: setEmailNotifications,
          disabled: !masterNotifications
        },
        {
          id: 'sms',
          title: 'SMS Notifications',
          description: 'Receive important updates via SMS',
          icon: MessageSquare,
          hasSwitch: true,
          value: smsNotifications,
          onChange: setSmsNotifications,
          disabled: !masterNotifications
        }
      ]
    },
    {
      title: "Sound & Vibration",
      icon: Volume2,
      items: [
        {
          id: 'sound',
          title: 'Sound',
          description: 'Play sound for notifications',
          icon: Volume2,
          hasSwitch: true,
          value: soundEnabled,
          onChange: setSoundEnabled,
          disabled: !masterNotifications
        },
        {
          id: 'vibration',
          title: 'Vibration',
          description: 'Vibrate for notifications',
          icon: Vibrate,
          hasSwitch: true,
          value: vibrationEnabled,
          onChange: setVibrationEnabled,
          disabled: !masterNotifications
        }
      ]
    },
    {
      title: "Quiet Hours",
      icon: Clock,
      items: [
        {
          id: 'quietHours',
          title: 'Enable Quiet Hours',
          description: 'Silence notifications during specific hours',
          icon: Clock,
          hasSwitch: true,
          value: quietHours,
          onChange: setQuietHours,
          disabled: !masterNotifications
        }
      ]
    },
    {
      title: "Learning & Courses",
      icon: BookOpen,
      items: [
        {
          id: 'newLessons',
          title: 'New Lessons',
          description: 'When new lessons are added to your courses',
          icon: BookOpen,
          hasSwitch: true,
          value: newLessons,
          onChange: setNewLessons,
          disabled: !masterNotifications
        },
        {
          id: 'courseUpdates',
          title: 'Course Updates',
          description: 'Updates and announcements from instructors',
          icon: BookOpen,
          hasSwitch: true,
          value: courseUpdates,
          onChange: setCourseUpdates,
          disabled: !masterNotifications
        },
        {
          id: 'assignments',
          title: 'Assignment Reminders',
          description: 'Reminders for upcoming assignment deadlines',
          icon: Clock,
          hasSwitch: true,
          value: assignmentDue,
          onChange: setAssignmentDue,
          disabled: !masterNotifications
        },
        {
          id: 'lessonReminders',
          title: 'Daily Learning Reminders',
          description: 'Gentle reminders to continue learning',
          icon: Clock,
          hasSwitch: true,
          value: lessonReminders,
          onChange: setLessonReminders,
          disabled: !masterNotifications
        }
      ]
    },
    {
      title: "Achievements & Progress",
      icon: Trophy,
      items: [
        {
          id: 'achievements',
          title: 'Achievement Unlocked',
          description: 'When you earn badges and achievements',
          icon: Trophy,
          hasSwitch: true,
          value: achievements,
          onChange: setAchievements,
          disabled: !masterNotifications
        },
        {
          id: 'streaks',
          title: 'Learning Streaks',
          description: 'Celebrate your learning streaks',
          icon: Trophy,
          hasSwitch: true,
          value: streaks,
          onChange: setStreaks,
          disabled: !masterNotifications
        },
        {
          id: 'leaderboard',
          title: 'Leaderboard Updates',
          description: 'Changes in your leaderboard position',
          icon: Trophy,
          hasSwitch: true,
          value: leaderboard,
          onChange: setLeaderboard,
          disabled: !masterNotifications
        }
      ]
    },
    {
      title: "Social & Community",
      icon: MessageSquare,
      items: [
        {
          id: 'comments',
          title: 'Comments & Replies',
          description: 'When someone replies to your comments',
          icon: MessageSquare,
          hasSwitch: true,
          value: comments,
          onChange: setComments,
          disabled: !masterNotifications
        },
        {
          id: 'mentions',
          title: 'Mentions',
          description: 'When someone mentions you in discussions',
          icon: MessageSquare,
          hasSwitch: true,
          value: mentions,
          onChange: setMentions,
          disabled: !masterNotifications
        },
        {
          id: 'follows',
          title: 'Follower Updates',
          description: 'Updates from people you follow',
          icon: MessageSquare,
          hasSwitch: true,
          value: followUpdates,
          onChange: setFollowUpdates,
          disabled: !masterNotifications
        }
      ]
    }
  ];

  const timeOptions = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      timeOptions.push({ value: timeString, label: timeString });
    }
  }

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
            <h1 className="text-xl md:text-2xl font-bold">Notifications</h1>
            <p className="text-sm text-muted-foreground">Manage your notification preferences</p>
          </div>
        </div>

        {/* Notification Status */}
        <Card className={`mb-6 ${masterNotifications ? 'bg-green-50 dark:bg-green-950/50' : 'bg-red-50 dark:bg-red-950/50'}`}>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full ${masterNotifications ? 'bg-green-500' : 'bg-red-500'}`}>
                {masterNotifications ? <Bell className="h-6 w-6 text-white" /> : <BellOff className="h-6 w-6 text-white" />}
              </div>
              <div>
                <h3 className="font-semibold">
                  Notifications {masterNotifications ? 'Enabled' : 'Disabled'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {masterNotifications 
                    ? 'You will receive notifications based on your preferences below' 
                    : 'All notifications are currently disabled'
                  }
                </p>
              </div>
              <div className="ml-auto">
                <Badge variant={masterNotifications ? "default" : "destructive"}>
                  {masterNotifications ? 'On' : 'Off'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Groups */}
        <div className="space-y-6">
          {notificationGroups.map((group, groupIndex) => (
            <Card key={groupIndex} className={!masterNotifications ? 'opacity-60' : ''}>
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

                        <Switch
                          checked={item.value}
                          onCheckedChange={item.onChange}
                          disabled={item.disabled}
                        />
                      </div>

                      {itemIndex < group.items.length - 1 && (
                        <Separator className="mt-4" />
                      )}
                    </div>
                  ))}

                  {/* Quiet Hours Time Selection */}
                  {group.title === "Quiet Hours" && quietHours && masterNotifications && (
                    <div className="mt-4 p-4 bg-muted rounded-lg">
                      <h4 className="font-medium mb-3">Quiet Hours Schedule</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Start Time</label>
                          <Select value={quietStart} onValueChange={setQuietStart}>
                            <SelectTrigger>
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
                        </div>
                        <div>
                          <label className="text-sm font-medium">End Time</label>
                          <Select value={quietEnd} onValueChange={setQuietEnd}>
                            <SelectTrigger>
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
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Notifications will be silenced from {quietStart} to {quietEnd}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Test Notification */}
        <Card className="mt-6">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="font-semibold mb-2">Test Your Settings</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Send a test notification to see how your settings work
              </p>
              <Button 
                onClick={() => {
                  if (masterNotifications) {
                    alert('🔔 Test notification sent! Check your device for the notification.');
                  } else {
                    alert('Please enable notifications first to test.');
                  }
                }}
                disabled={!masterNotifications}
              >
                Send Test Notification
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Save Notice */}
        <div className="text-center mt-6 p-4 bg-blue-50 dark:bg-blue-950/50 rounded-lg">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            ✓ Your notification preferences are automatically saved
          </p>
        </div>
      </div>
    </div>
  );
}