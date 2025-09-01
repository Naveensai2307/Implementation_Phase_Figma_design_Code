import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ArrowLeft, Trophy, Calendar, Code, Users, Target, Award, Clock, Star, Play, ChevronRight, Zap } from 'lucide-react';

export function ContestsPage({ user, onBack, onNavigate }) {
  const [activeTab, setActiveTab] = useState('daily');

  // Mock contest data
  const dailyChallenges = [
    {
      id: 1,
      title: 'Array Manipulation',
      difficulty: 'Easy',
      points: 50,
      timeLeft: '2h 30m',
      participants: 1250,
      solved: 850,
      category: 'Data Structures',
      description: 'Solve problems involving array operations and transformations',
      isCompleted: false
    },
    {
      id: 2,
      title: 'String Algorithms',
      difficulty: 'Medium',
      points: 75,
      timeLeft: '2h 30m',
      participants: 980,
      solved: 420,
      category: 'Algorithms',
      description: 'Practice string manipulation and pattern matching',
      isCompleted: true
    },
    {
      id: 3,
      title: 'Dynamic Programming Basics',
      difficulty: 'Hard',
      points: 100,
      timeLeft: '2h 30m',
      participants: 650,
      solved: 180,
      category: 'Advanced',
      description: 'Master the fundamentals of dynamic programming',
      isCompleted: false
    }
  ];

  const weeklyChallenges = [
    {
      id: 4,
      title: 'Full Stack Web Development',
      difficulty: 'Advanced',
      points: 500,
      timeLeft: '4 days',
      participants: 2500,
      solved: 380,
      category: 'Web Development',
      description: 'Build a complete e-commerce application using React, Node.js, and MongoDB',
      isCompleted: false
    },
    {
      id: 5,
      title: 'Machine Learning Pipeline',
      difficulty: 'Expert',
      points: 750,
      timeLeft: '4 days',
      participants: 1200,
      solved: 120,
      category: 'AI/ML',
      description: 'Create an end-to-end ML pipeline for image classification',
      isCompleted: false
    }
  ];

  const codingContests = [
    {
      id: 6,
      title: 'Growify Code Championship',
      type: 'Monthly Contest',
      startTime: 'Dec 15, 2024 - 8:00 PM',
      duration: '3 hours',
      participants: 15000,
      prize: '₹50,000',
      status: 'upcoming',
      category: 'Competitive Programming'
    },
    {
      id: 7,
      title: 'Data Science Hackathon',
      type: 'Special Event',
      startTime: 'Dec 20, 2024 - 10:00 AM',
      duration: '24 hours',
      participants: 8000,
      prize: '₹1,00,000',
      status: 'upcoming',
      category: 'Data Science'
    }
  ];

  const placementTraining = [
    {
      id: 8,
      title: 'Technical Interview Preparation',
      progress: 65,
      totalQuestions: 150,
      solvedQuestions: 98,
      category: 'Interview Prep',
      topics: ['Data Structures', 'Algorithms', 'System Design'],
      difficulty: 'All Levels'
    },
    {
      id: 9,
      title: 'Aptitude & Reasoning',
      progress: 40,
      totalQuestions: 200,
      solvedQuestions: 80,
      category: 'Aptitude',
      topics: ['Quantitative', 'Logical Reasoning', 'Verbal'],
      difficulty: 'Beginner to Advanced'
    },
    {
      id: 10,
      title: 'Company-Specific Practice',
      progress: 25,
      totalQuestions: 300,
      solvedQuestions: 75,
      category: 'Company Prep',
      topics: ['FAANG', 'Startups', 'Service Companies'],
      difficulty: 'Expert'
    }
  ];

  const leaderboard = [
    { rank: 1, name: 'Arjun Kumar', points: 2450, solvedCount: 89, avatar: '🥇' },
    { rank: 2, name: 'Priya Singh', points: 2280, solvedCount: 84, avatar: '🥈' },
    { rank: 3, name: 'Rohit Sharma', points: 2150, solvedCount: 78, avatar: '🥉' },
    { rank: 4, name: 'Sneha Patel', points: 2050, solvedCount: 72, avatar: '👨‍💻' },
    { rank: 5, name: user?.name || 'You', points: 1850, solvedCount: 65, avatar: '👤' }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'hard': return 'bg-red-100 text-red-700';
      case 'advanced': return 'bg-purple-100 text-purple-700';
      case 'expert': return 'bg-gray-100 text-gray-700';
      default: return 'bg-blue-100 text-blue-700';
    }
  };

  const renderDailyChallenges = () => (
    <div className="space-y-4">
      {dailyChallenges.map((challenge) => (
        <Card key={challenge.id} className="p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-semibold">{challenge.title}</h3>
                <Badge className={getDifficultyColor(challenge.difficulty)}>
                  {challenge.difficulty}
                </Badge>
                {challenge.isCompleted && (
                  <Badge className="bg-green-100 text-green-700">
                    <Award className="w-3 h-3 mr-1" />
                    Completed
                  </Badge>
                )}
              </div>
              <p className="text-gray-600 text-sm mb-3">{challenge.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Trophy className="w-4 h-4" />
                  <span>{challenge.points} points</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{challenge.timeLeft} left</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{challenge.participants} participants</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <span className="text-gray-600">{challenge.solved}/{challenge.participants} solved</span>
              <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                <div 
                  className="bg-blue-500 h-2 rounded-full" 
                  style={{ width: `${(challenge.solved / challenge.participants) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <Button 
              onClick={() => {
                if (!challenge.isCompleted) {
                  onNavigate('dailyChallengeDetail', challenge);
                }
              }}
              className={`h-10 px-6 rounded-lg ${
                challenge.isCompleted 
                  ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
              disabled={challenge.isCompleted}
            >
              {challenge.isCompleted ? 'Completed' : 'Start Challenge'}
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderWeeklyChallenges = () => (
    <div className="space-y-4">
      {weeklyChallenges.map((challenge) => (
        <Card key={challenge.id} className="p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-semibold">{challenge.title}</h3>
                <Badge className={getDifficultyColor(challenge.difficulty)}>
                  {challenge.difficulty}
                </Badge>
              </div>
              <p className="text-gray-600 text-sm mb-3">{challenge.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Trophy className="w-4 h-4" />
                  <span>{challenge.points} points</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{challenge.timeLeft} left</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{challenge.participants} participants</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <span className="text-gray-600">{challenge.solved}/{challenge.participants} solved</span>
              <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                <div 
                  className="bg-purple-500 h-2 rounded-full" 
                  style={{ width: `${(challenge.solved / challenge.participants) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <Button 
              onClick={() => onNavigate('weeklyChallengeDetail', challenge)}
              className="h-10 px-6 bg-purple-500 hover:bg-purple-600 text-white rounded-lg"
            >
              Join Challenge
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderCodingContests = () => (
    <div className="space-y-4">
      {codingContests.map((contest) => (
        <Card key={contest.id} className="p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-semibold">{contest.title}</h3>
                <Badge className="bg-orange-100 text-orange-700">
                  {contest.type}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{contest.startTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{contest.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{contest.participants.toLocaleString()} registered</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-100 text-green-700">
                  <Trophy className="w-3 h-3 mr-1" />
                  Prize: {contest.prize}
                </Badge>
                <Badge className="bg-blue-100 text-blue-700">
                  {contest.category}
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Registration closes 1 hour before contest
            </div>
            
            <Button 
              onClick={() => onNavigate('contestRegistration', contest)}
              className="h-10 px-6 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-lg"
            >
              Register Now
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderPlacementTraining = () => (
    <div className="space-y-4">
      {placementTraining.map((training) => (
        <Card key={training.id} className="p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-semibold">{training.title}</h3>
                <Badge className="bg-indigo-100 text-indigo-700">
                  {training.category}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-1">
                  <Target className="w-4 h-4" />
                  <span>{training.solvedQuestions}/{training.totalQuestions} questions</span>
                </div>
                <Badge className={getDifficultyColor(training.difficulty)}>
                  {training.difficulty}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {training.topics.map((topic, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {topic}
                  </Badge>
                ))}
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Progress</span>
                  <span className="font-semibold">{training.progress}%</span>
                </div>
                <Progress value={training.progress} className="h-2" />
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Keep practicing to improve your ranking!
            </div>
            
            <Button 
              onClick={() => onNavigate('placementPractice', training)}
              className="h-10 px-6 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg"
            >
              <Play className="w-4 h-4 mr-2" />
              Continue Practice
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderLeaderboard = () => (
    <div className="space-y-4">
      <Card className="p-6 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Global Rankings</h3>
          <Badge className="bg-yellow-100 text-yellow-700">
            <Star className="w-3 h-3 mr-1" />
            Top Performers
          </Badge>
        </div>
        
        <div className="space-y-4">
          {leaderboard.map((user) => (
            <div 
              key={user.rank}
              className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                user.name === (user?.name || 'You') 
                  ? 'bg-blue-50 border-2 border-blue-200' 
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="text-2xl">{user.avatar}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-lg">#{user.rank}</span>
                  <span className="font-medium">{user.name}</span>
                  {user.name === (user?.name || 'You') && (
                    <Badge className="bg-blue-100 text-blue-700 text-xs">You</Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>{user.points} points</span>
                  <span>{user.solvedCount} solved</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <Button 
            onClick={() => onNavigate('fullLeaderboard')}
            variant="outline" 
            className="h-10 px-6 rounded-lg"
          >
            View Full Leaderboard
          </Button>
        </div>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-responsive bg-white min-h-screen pb-20">
        {/* Header */}
        <div className="flex items-center justify-between p-4 lg:p-6 border-b border-gray-100">
          <button onClick={onBack} className="hover:bg-gray-100 p-2 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="text-center">
            <h1 className="text-lg lg:text-xl font-semibold">Contests & Challenges</h1>
            <p className="text-xs lg:text-sm text-gray-500">Compete, Learn, and Win</p>
          </div>
          <div className="w-9 h-9"></div>
        </div>

        {/* Stats Cards */}
        <div className="p-4 lg:p-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="p-4 text-center rounded-2xl">
              <div className="text-2xl font-bold text-blue-600">65</div>
              <div className="text-sm text-gray-600">Questions Solved</div>
            </Card>
            <Card className="p-4 text-center rounded-2xl">
              <div className="text-2xl font-bold text-green-600">1850</div>
              <div className="text-sm text-gray-600">Total Points</div>
            </Card>
            <Card className="p-4 text-center rounded-2xl">
              <div className="text-2xl font-bold text-purple-600">5</div>
              <div className="text-sm text-gray-600">Global Rank</div>
            </Card>
            <Card className="p-4 text-center rounded-2xl">
              <div className="text-2xl font-bold text-orange-600">12</div>
              <div className="text-sm text-gray-600">Contests Won</div>
            </Card>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-6 bg-gray-100 p-1 rounded-xl">
            {[
              { id: 'daily', label: 'Daily Challenges', icon: Zap },
              { id: 'weekly', label: 'Weekly', icon: Calendar },
              { id: 'contests', label: 'Contests', icon: Trophy },
              { id: 'placement', label: 'Placement', icon: Target },
              { id: 'rankings', label: 'Rankings', icon: Star }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm font-medium ${
                  activeTab === id
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === 'daily' && renderDailyChallenges()}
            {activeTab === 'weekly' && renderWeeklyChallenges()}
            {activeTab === 'contests' && renderCodingContests()}
            {activeTab === 'placement' && renderPlacementTraining()}
            {activeTab === 'rankings' && renderLeaderboard()}
          </div>
        </div>
      </div>
    </div>
  );
}