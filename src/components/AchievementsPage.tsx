import React from 'react';
import { ArrowLeft, Search, Award, Star, Trophy, Target, Medal, Zap, BookOpen } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

export function AchievementsPage({ user, onBack, onNavigate, completedLessons }) {
  const achievements = [
    {
      id: 'first-course',
      title: 'First Steps',
      description: 'Complete your first course',
      icon: Trophy,
      completed: true,
      bgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      category: 'Milestone',
      points: 100
    },
    {
      id: 'quick-learner',
      title: 'Quick Learner',
      description: 'Finish 3 lessons in one day',
      icon: Zap,
      completed: true,
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      category: 'Speed',
      points: 150
    },
    {
      id: 'dedicated-student',
      title: 'Dedicated Student',
      description: 'Study for 7 consecutive days',
      icon: Target,
      completed: true,
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
      category: 'Consistency',
      points: 200
    },
    {
      id: 'certification-hunter',
      title: 'Certification Hunter',
      description: 'Complete a professional certification course',
      icon: Medal,
      completed: (completedLessons?.length || 0) >= 6,
      progress: `${Math.min(completedLessons?.length || 0, 6)}/6`,
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
      category: 'Professional',
      points: 500
    },
    {
      id: 'course-master',
      title: 'Course Master',
      description: 'Complete 5 courses',
      icon: Award,
      completed: false,
      progress: '2/5',
      bgColor: 'bg-gray-100',
      iconColor: 'text-gray-400',
      category: 'Achievement',
      points: 300
    },
    {
      id: 'perfect-score',
      title: 'Perfect Score',
      description: 'Get 100% on a quiz',
      icon: Star,
      completed: false,
      progress: '0/1',
      bgColor: 'bg-gray-100',
      iconColor: 'text-gray-400',
      category: 'Excellence',
      points: 250
    },
    {
      id: 'knowledge-seeker',
      title: 'Knowledge Seeker',
      description: 'Complete 50 lessons across all courses',
      icon: BookOpen,
      completed: (completedLessons?.length || 0) >= 50,
      progress: `${Math.min(completedLessons?.length || 0, 50)}/50`,
      bgColor: (completedLessons?.length || 0) >= 50 ? 'bg-indigo-100' : 'bg-gray-100',
      iconColor: (completedLessons?.length || 0) >= 50 ? 'text-indigo-600' : 'text-gray-400',
      category: 'Learning',
      points: 400
    }
  ];

  const stats = [
    { label: 'Total Points', value: achievements.filter(a => a.completed).reduce((sum, a) => sum + a.points, 0).toLocaleString(), color: 'text-blue-600' },
    { label: 'Achievements', value: `${achievements.filter(a => a.completed).length}/${achievements.length}`, color: 'text-green-600' },
    { label: 'Current Streak', value: '7 days', color: 'text-orange-600' },
    { label: 'Lessons Done', value: completedLessons?.length || 0, color: 'text-purple-600' }
  ];

  const completedCount = achievements.filter(a => a.completed).length;
  const completionPercentage = Math.round((completedCount / achievements.length) * 100);

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
            <h1 className="text-lg lg:text-xl font-semibold">Achievements</h1>
            <p className="text-xs lg:text-sm text-gray-500">Your Learning Journey</p>
          </div>
          <button 
            onClick={() => onNavigate('search')}
            className="hover:bg-gray-100 p-2 rounded-lg transition-colors"
          >
            <Search className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="p-4 lg:p-6 xl:p-8 space-y-6 lg:space-y-8">
          {/* Overall Progress */}
          <Card className="p-6 lg:p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl">
            <div className="text-center mb-6">
              <h2 className="text-2xl lg:text-3xl font-bold mb-2">🏆 Achievement Progress</h2>
              <p className="text-gray-600">You've completed {completedCount} out of {achievements.length} achievements</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm lg:text-base">
                <span className="font-medium">Overall Completion</span>
                <span className="font-semibold">{completionPercentage}%</span>
              </div>
              <Progress value={completionPercentage} className="h-3" />
            </div>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {stats.map((stat, index) => (
              <Card 
                key={index} 
                className="p-4 lg:p-6 text-center rounded-2xl shadow-sm cursor-pointer hover:shadow-md transition-all"
                onClick={() => {}}
              >
                <p className={`text-2xl lg:text-3xl font-bold mb-1 ${stat.color}`}>{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </Card>
            ))}
          </div>

          {/* Achievement Categories */}
          <div>
            <div className="flex items-center justify-between mb-4 lg:mb-6">
              <h2 className="text-xl lg:text-2xl font-semibold">Your Achievements</h2>
              <Badge className="bg-blue-100 text-blue-700">
                {completedCount} Unlocked
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {achievements.map((achievement) => {
                const IconComponent = achievement.icon;
                const progressValue = achievement.progress ? 
                  parseInt(achievement.progress.split('/')[0]) / parseInt(achievement.progress.split('/')[1]) * 100 
                  : 0;

                return (
                  <Card 
                    key={achievement.id} 
                    className={`p-6 rounded-2xl shadow-sm cursor-pointer hover:shadow-md transition-all ${
                      achievement.completed 
                        ? 'border-2 border-green-200 bg-gradient-to-br from-green-50 to-green-25' 
                        : 'border border-gray-200 hover:border-blue-200'
                    }`}
                    onClick={() => onNavigate('achievementDetail', achievement)}
                  >
                    <div className="text-center">
                      <div className={`w-16 h-16 lg:w-20 lg:h-20 ${achievement.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                        achievement.completed ? 'ring-4 ring-green-100' : ''
                      }`}>
                        <IconComponent className={`w-8 h-8 lg:w-10 lg:h-10 ${achievement.iconColor}`} />
                      </div>
                      
                      <div className="mb-3">
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <h3 className={`font-semibold ${achievement.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                            {achievement.title}
                          </h3>
                          {achievement.completed && (
                            <Badge className="bg-green-100 text-green-800 text-xs">
                              ✓
                            </Badge>
                          )}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {achievement.category}
                        </Badge>
                      </div>
                      
                      <p className={`text-sm mb-4 ${achievement.completed ? 'text-gray-600' : 'text-gray-400'}`}>
                        {achievement.description}
                      </p>
                      
                      {!achievement.completed && achievement.progress && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-blue-600 font-medium">Progress: {achievement.progress}</span>
                            <span className="text-gray-500">{Math.round(progressValue)}%</span>
                          </div>
                          <Progress value={progressValue} className="h-2" />
                        </div>
                      )}
                      
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-center gap-1 text-sm">
                          <Trophy className="w-4 h-4 text-yellow-500" />
                          <span className={achievement.completed ? 'text-yellow-600 font-semibold' : 'text-gray-400'}>
                            {achievement.points} points
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Motivational Section */}
          <Card className="p-6 lg:p-8 rounded-3xl bg-gradient-to-r from-purple-500 to-blue-600 text-white text-center">
            <h3 className="text-xl lg:text-2xl font-bold mb-2">Keep Going! 🚀</h3>
            <p className="text-purple-100 mb-4">
              You're doing amazing! Complete more courses and challenges to unlock new achievements.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button 
                onClick={() => onNavigate('courses')}
                className="bg-white text-purple-600 hover:bg-gray-100 px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Browse Courses
              </button>
              <button 
                onClick={() => onNavigate('contests')}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors border-2 border-white/20"
              >
                Join Contests
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}