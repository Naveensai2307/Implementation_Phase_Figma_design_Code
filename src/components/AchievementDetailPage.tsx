import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ArrowLeft, Award, Star, Trophy, Target, Calendar, CheckCircle, Clock, BookOpen } from 'lucide-react';

export function AchievementDetailPage({ achievement, onBack, onNavigate }) {
  // Mock achievement data based on type
  const getAchievementData = (type) => {
    const achievementTypes = {
      'first-course': {
        id: 'first-course',
        title: 'First Course Completed',
        description: 'Completed your very first course on Growify',
        icon: '🎓',
        category: 'Learning Milestone',
        earnedDate: '2024-01-15',
        points: 100,
        rarity: 'Common',
        criteria: 'Complete any course on the platform',
        progress: 100,
        totalRequired: 1,
        tips: [
          'Every expert was once a beginner',
          'The first step is always the hardest',
          'You\'ve started your learning journey!'
        ],
        relatedAchievements: ['quick-learner', 'course-master'],
        stats: {
          completionRate: '92%',
          averageTime: '3 days',
          totalEarners: '15,847'
        }
      },
      'quick-learner': {
        id: 'quick-learner',
        title: 'Quick Learner',
        description: 'Completed a course in under 24 hours',
        icon: '⚡',
        category: 'Speed Achievement',
        earnedDate: '2024-01-20',
        points: 150,
        rarity: 'Uncommon',
        criteria: 'Complete any course within 24 hours',
        progress: 100,
        totalRequired: 1,
        tips: [
          'Focus and dedication lead to quick results',
          'Intensive learning can be very effective',
          'You have excellent learning speed!'
        ],
        relatedAchievements: ['dedicated-student', 'course-master'],
        stats: {
          completionRate: '23%',
          averageTime: '18 hours',
          totalEarners: '3,245'
        }
      },
      'dedicated-student': {
        id: 'dedicated-student',
        title: 'Dedicated Student',
        description: 'Studied for 7 consecutive days',
        icon: '📚',
        category: 'Consistency Achievement',
        earnedDate: '2024-02-01',
        points: 200,
        rarity: 'Rare',
        criteria: 'Complete lessons for 7 consecutive days',
        progress: 100,
        totalRequired: 7,
        tips: [
          'Consistency is key to mastering any skill',
          'Daily practice builds strong foundations',
          'Your dedication is inspiring!'
        ],
        relatedAchievements: ['course-master', 'perfect-score'],
        stats: {
          completionRate: '12%',
          averageTime: '7 days',
          totalEarners: '1,892'
        }
      },
      'course-master': {
        id: 'course-master',
        title: 'Course Master',
        description: 'Completed 10 courses successfully',
        icon: '👑',
        category: 'Mastery Achievement',
        earnedDate: '2024-03-15',
        points: 500,
        rarity: 'Epic',
        criteria: 'Complete 10 different courses',
        progress: 100,
        totalRequired: 10,
        tips: [
          'You\'ve become a true learning master',
          'Diverse knowledge is powerful',
          'You\'re in the top 5% of learners!'
        ],
        relatedAchievements: ['perfect-score'],
        stats: {
          completionRate: '5%',
          averageTime: '3 months',
          totalEarners: '743'
        }
      },
      'perfect-score': {
        id: 'perfect-score',
        title: 'Perfect Score',
        description: 'Scored 100% on a course quiz',
        icon: '💯',
        category: 'Excellence Achievement',
        earnedDate: '2024-02-10',
        points: 300,
        rarity: 'Epic',
        criteria: 'Score 100% on any course quiz',
        progress: 100,
        totalRequired: 1,
        tips: [
          'Perfect scores show true understanding',
          'Excellence is a habit, not an act',
          'You\'ve mastered the material!'
        ],
        relatedAchievements: ['course-master', 'dedicated-student'],
        stats: {
          completionRate: '8%',
          averageTime: 'Variable',
          totalEarners: '1,156'
        }
      }
    };
    
    return achievementTypes[type] || achievementTypes['first-course'];
  };

  const achievementData = achievement && achievement.id 
    ? getAchievementData(achievement.id) 
    : (achievement || getAchievementData('first-course'));

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'Common': return 'bg-gray-100 text-gray-700';
      case 'Uncommon': return 'bg-green-100 text-green-700';
      case 'Rare': return 'bg-blue-100 text-blue-700';
      case 'Epic': return 'bg-purple-100 text-purple-700';
      case 'Legendary': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full max-w-4xl mx-auto bg-white min-h-screen pb-20">
        {/* Header */}
        <div className="flex items-center justify-between p-4 lg:p-6 border-b border-gray-100">
          <button onClick={onBack} className="hover:bg-gray-100 p-2 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="text-center">
            <h1 className="text-lg lg:text-xl font-semibold">Achievement Details</h1>
            <p className="text-xs lg:text-sm text-gray-500">{achievementData.category || 'Achievement'}</p>
          </div>
          <div className="w-9 h-9"></div>
        </div>

        <div className="p-4 lg:p-6 space-y-6">
          {/* Achievement Hero */}
          <Card className="p-8 rounded-3xl bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
            <div className="text-center">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-4xl">{achievementData.icon || '🏆'}</span>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{achievementData.title || 'Achievement'}</h2>
              <p className="text-gray-600 mb-4">{achievementData.description || 'No description available'}</p>
              
              <div className="flex items-center justify-center gap-4 mb-6">
                <Badge className={getRarityColor(achievementData.rarity || 'Common')}>
                  <Award className="w-3 h-3 mr-1" />
                  {achievementData.rarity || 'Common'}
                </Badge>
                <Badge className="bg-yellow-100 text-yellow-700">
                  <Trophy className="w-3 h-3 mr-1" />
                  {achievementData.points || 0} points
                </Badge>
                {(achievementData.progress || 0) === 100 && (
                  <Badge className="bg-green-100 text-green-700">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Earned
                  </Badge>
                )}
              </div>
              
              {achievementData.earnedDate && (
                <p className="text-sm text-gray-500">
                  Earned on {new Date(achievementData.earnedDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              )}
            </div>
          </Card>

          {/* Achievement Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Criteria & Progress */}
            <Card className="p-6 rounded-2xl shadow-sm">
              <h3 className="text-lg font-semibold mb-4">
                <Target className="w-5 h-5 inline mr-2" />
                Achievement Criteria
              </h3>
              <p className="text-gray-600 mb-4">{achievementData.criteria || 'No criteria defined'}</p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span>Progress</span>
                  <span className="font-semibold">{achievementData.progress || 0}%</span>
                </div>
                <Progress value={achievementData.progress || 0} className="h-2" />
                <p className="text-xs text-gray-500">
                  {(achievementData.progress || 0) === 100 ? 'Completed!' : 
                   `${achievementData.progress || 0}/${achievementData.totalRequired || 1} completed`}
                </p>
              </div>
            </Card>

            {/* Statistics */}
            <Card className="p-6 rounded-2xl shadow-sm">
              <h3 className="text-lg font-semibold mb-4">
                <Star className="w-5 h-5 inline mr-2" />
                Achievement Statistics
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Completion Rate</span>
                  <span className="font-semibold">{achievementData.stats?.completionRate || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Average Time</span>
                  <span className="font-semibold">{achievementData.stats?.averageTime || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Earners</span>
                  <span className="font-semibold">{achievementData.stats?.totalEarners || 'N/A'}</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Tips & Motivation */}
          <Card className="p-6 rounded-2xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">
              <BookOpen className="w-5 h-5 inline mr-2" />
              Achievement Tips
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(achievementData.tips || []).map((tip, index) => (
                <div key={index} className="p-4 bg-blue-50 rounded-xl">
                  <div className="text-2xl mb-2">💡</div>
                  <p className="text-sm text-gray-700">{tip}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Related Achievements */}
          <Card className="p-6 rounded-2xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Related Achievements</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {(achievementData.relatedAchievements || []).map((relatedId) => {
                const related = getAchievementData(relatedId);
                return (
                  <button
                    key={related.id}
                    onClick={() => onNavigate('achievementDetail', related)}
                    className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-left"
                  >
                    <div className="text-2xl mb-2">{related.icon}</div>
                    <h4 className="font-medium mb-1">{related.title}</h4>
                    <p className="text-xs text-gray-600 mb-2">{related.description}</p>
                    <Badge className={getRarityColor(related.rarity)} variant="outline">
                      {related.rarity}
                    </Badge>
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button 
              onClick={() => onNavigate('achievements')}
              className="h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-xl"
            >
              View All Achievements
            </Button>
            <Button 
              onClick={() => onNavigate('courses')}
              variant="outline"
              className="h-12 rounded-xl"
            >
              Continue Learning
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}