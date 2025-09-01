import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft, Trophy, Clock, Code, Brain, Target, Zap, Play, CheckCircle } from 'lucide-react';

export function ChallengesPage({ user, onBack, onNavigate }) {
  const [activeTab, setActiveTab] = useState('daily');
  const [completedChallenges, setCompletedChallenges] = useState(['daily-1', 'quiz-2']);

  const dailyChallenges = [
    {
      id: 'daily-1',
      title: 'Color Psychology Quiz',
      description: 'Test your understanding of how colors affect user emotions',
      type: 'Quiz',
      difficulty: 'Easy',
      points: 50,
      timeLimit: '5 min',
      icon: Brain,
      color: 'bg-blue-100 text-blue-600',
      completed: true
    },
    {
      id: 'daily-2',
      title: 'CSS Flexbox Challenge',
      description: 'Create a responsive layout using Flexbox properties',
      type: 'Code',
      difficulty: 'Medium',
      points: 100,
      timeLimit: '15 min',
      icon: Code,
      color: 'bg-green-100 text-green-600',
      completed: false
    },
    {
      id: 'daily-3',
      title: 'Python List Comprehension',
      description: 'Write efficient Python code using list comprehensions',
      type: 'Code',
      difficulty: 'Medium',
      points: 100,
      timeLimit: '10 min',
      icon: Code,
      color: 'bg-yellow-100 text-yellow-600',
      completed: false
    }
  ];

  const weeklyQuizzes = [
    {
      id: 'quiz-1',
      title: 'JavaScript Fundamentals',
      description: 'Comprehensive quiz covering JS basics to advanced concepts',
      type: 'Quiz',
      difficulty: 'Hard',
      points: 200,
      questions: 20,
      timeLimit: '30 min',
      icon: Brain,
      color: 'bg-purple-100 text-purple-600',
      completed: false
    },
    {
      id: 'quiz-2',
      title: 'Data Science Basics',
      description: 'Test your knowledge of statistics and data analysis',
      type: 'Quiz',
      difficulty: 'Medium',
      points: 150,
      questions: 15,
      timeLimit: '25 min',
      icon: Brain,
      color: 'bg-orange-100 text-orange-600',
      completed: true
    },
    {
      id: 'quiz-3',
      title: 'Machine Learning Concepts',
      description: 'Advanced ML algorithms and their applications',
      type: 'Quiz',
      difficulty: 'Hard',
      points: 250,
      questions: 25,
      timeLimit: '45 min',
      icon: Brain,
      color: 'bg-red-100 text-red-600',
      completed: false
    }
  ];

  const codingChallenges = [
    {
      id: 'coding-1',
      title: 'Two Sum Problem',
      description: 'Find two numbers in an array that add up to a target sum',
      language: 'Python',
      difficulty: 'Easy',
      points: 75,
      timeLimit: '20 min',
      icon: Code,
      color: 'bg-blue-100 text-blue-600',
      completed: false,
      tags: ['Arrays', 'Hash Table']
    },
    {
      id: 'coding-2',
      title: 'Binary Tree Traversal',
      description: 'Implement in-order, pre-order, and post-order traversal',
      language: 'JavaScript',
      difficulty: 'Medium',
      points: 125,
      timeLimit: '30 min',
      icon: Code,
      color: 'bg-green-100 text-green-600',
      completed: false,
      tags: ['Trees', 'Recursion']
    },
    {
      id: 'coding-3',
      title: 'Dynamic Programming: Fibonacci',
      description: 'Optimize Fibonacci sequence using dynamic programming',
      language: 'Python',
      difficulty: 'Medium',
      points: 150,
      timeLimit: '25 min',
      icon: Code,
      color: 'bg-purple-100 text-purple-600',
      completed: false,
      tags: ['DP', 'Optimization']
    },
    {
      id: 'coding-4',
      title: 'Graph Shortest Path',
      description: 'Implement Dijkstra\'s algorithm for shortest path',
      language: 'Java',
      difficulty: 'Hard',
      points: 200,
      timeLimit: '45 min',
      icon: Code,
      color: 'bg-red-100 text-red-600',
      completed: false,
      tags: ['Graphs', 'Algorithms']
    }
  ];

  const mockInterviews = [
    {
      id: 'interview-1',
      title: 'Frontend Developer Interview',
      description: 'Practice common frontend interview questions',
      type: 'Mock Interview',
      difficulty: 'Medium',
      duration: '45 min',
      price: 'Free',
      topics: ['HTML/CSS', 'JavaScript', 'React', 'System Design'],
      icon: Target,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 'interview-2',
      title: 'Data Scientist Interview',
      description: 'ML algorithms, statistics, and case studies',
      type: 'Mock Interview',
      difficulty: 'Hard',
      duration: '60 min',
      price: '$29',
      topics: ['Statistics', 'ML Algorithms', 'Python', 'SQL'],
      icon: Target,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      id: 'interview-3',
      title: 'System Design Interview',
      description: 'Design scalable systems and architectures',
      type: 'Mock Interview',
      difficulty: 'Hard',
      duration: '90 min',
      price: '$49',
      topics: ['Scalability', 'Databases', 'APIs', 'Cloud'],
      icon: Target,
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  const tabs = [
    { id: 'daily', label: 'Daily', icon: Zap },
    { id: 'quizzes', label: 'Quizzes', icon: Brain },
    { id: 'coding', label: 'Coding', icon: Code },
    { id: 'interviews', label: 'Interviews', icon: Target }
  ];

  const handleChallengeClick = (challenge) => {
    if (challenge.type === 'Quiz' || activeTab === 'quizzes') {
      onNavigate('quiz', { ...challenge, isChallenge: true });
    } else if (challenge.type === 'Code' || activeTab === 'coding') {
      // Navigate to coding challenge page
      onNavigate('codingChallenge', challenge);
    } else if (activeTab === 'interviews') {
      // Navigate to mock interview
      onNavigate('mockInterview', challenge);
    }
  };

  const renderChallengeCard = (challenge, showCompleted = true) => {
    const IconComponent = challenge.icon;
    const isCompleted = completedChallenges.includes(challenge.id);

    return (
      <Card
        key={challenge.id}
        className={`p-4 lg:p-6 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer ${
          isCompleted ? 'bg-green-50 border-green-200' : 'hover:border-blue-200'
        }`}
        onClick={() => handleChallengeClick(challenge)}
      >
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-xl flex items-center justify-center ${challenge.color}`}>
            <IconComponent className="w-6 h-6 lg:w-7 lg:h-7" />
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="font-semibold text-base lg:text-lg mb-1">{challenge.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{challenge.description}</p>
              </div>
              {isCompleted && showCompleted && (
                <CheckCircle className="w-5 h-5 text-green-500 ml-2" />
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge className={`text-xs ${
                challenge.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                challenge.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {challenge.difficulty}
              </Badge>
              
              {challenge.language && (
                <Badge className="bg-gray-100 text-gray-700 text-xs">
                  {challenge.language}
                </Badge>
              )}
              
              {challenge.price && (
                <Badge className={`text-xs ${
                  challenge.price === 'Free' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {challenge.price}
                </Badge>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Trophy className="w-4 h-4 text-yellow-500" />
                  <span>{challenge.points || challenge.duration} {challenge.points ? 'pts' : ''}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{challenge.timeLimit || challenge.duration}</span>
                </div>
                {challenge.questions && (
                  <span>📝 {challenge.questions} questions</span>
                )}
              </div>

              <Button 
                className={`h-8 px-4 text-sm rounded-lg ${
                  isCompleted 
                    ? 'bg-green-500 hover:bg-green-600 text-white' 
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                {isCompleted ? 'Completed' : (
                  <>
                    <Play className="w-3 h-3 mr-1" />
                    Start
                  </>
                )}
              </Button>
            </div>

            {challenge.tags && (
              <div className="flex flex-wrap gap-1 mt-3">
                {challenge.tags.map((tag, index) => (
                  <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {challenge.topics && (
              <div className="flex flex-wrap gap-2 mt-3">
                {challenge.topics.map((topic, index) => (
                  <span key={index} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                    {topic}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Card>
    );
  };

  const getCurrentData = () => {
    switch (activeTab) {
      case 'daily': return dailyChallenges;
      case 'quizzes': return weeklyQuizzes;
      case 'coding': return codingChallenges;
      case 'interviews': return mockInterviews;
      default: return dailyChallenges;
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
            <h1 className="text-lg lg:text-xl font-semibold">Challenges</h1>
            <p className="text-xs lg:text-sm text-gray-500">Test Your Skills & Earn Points</p>
          </div>
          <div className="w-9 h-9"></div>
        </div>

        <div className="p-4 lg:p-6 space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-4 text-center rounded-2xl shadow-sm">
              <Trophy className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
              <p className="text-lg lg:text-xl font-bold">1,250</p>
              <p className="text-xs text-gray-600">Total Points</p>
            </Card>
            <Card className="p-4 text-center rounded-2xl shadow-sm">
              <Target className="w-6 h-6 mx-auto mb-2 text-blue-500" />
              <p className="text-lg lg:text-xl font-bold">15</p>
              <p className="text-xs text-gray-600">Completed</p>
            </Card>
            <Card className="p-4 text-center rounded-2xl shadow-sm">
              <Zap className="w-6 h-6 mx-auto mb-2 text-orange-500" />
              <p className="text-lg lg:text-xl font-bold">7</p>
              <p className="text-xs text-gray-600">Day Streak</p>
            </Card>
            <Card className="p-4 text-center rounded-2xl shadow-sm">
              <Brain className="w-6 h-6 mx-auto mb-2 text-purple-500" />
              <p className="text-lg lg:text-xl font-bold">Level 5</p>
              <p className="text-xs text-gray-600">Current Level</p>
            </Card>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg lg:text-xl font-semibold">
                {activeTab === 'daily' && 'Daily Challenges'}
                {activeTab === 'quizzes' && 'Weekly Quizzes'}
                {activeTab === 'coding' && 'Coding Challenges'}
                {activeTab === 'interviews' && 'Mock Interviews'}
              </h3>
              <Badge className="bg-blue-100 text-blue-700">
                {getCurrentData().length} available
              </Badge>
            </div>

            <div className="space-y-4">
              {getCurrentData().map((item) => renderChallengeCard(item, activeTab !== 'interviews'))}
            </div>
          </div>

          {/* Call to Action */}
          {activeTab === 'interviews' && (
            <Card className="p-6 lg:p-8 rounded-3xl shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center">
              <Target className="w-12 h-12 mx-auto mb-4 text-white" />
              <h3 className="text-xl lg:text-2xl font-bold mb-2">Ready for Your Dream Job?</h3>
              <p className="text-blue-100 mb-4">
                Practice with industry-standard interview questions and get personalized feedback
              </p>
              <Button className="bg-white text-blue-600 hover:bg-gray-100 h-12 px-8 rounded-xl font-semibold">
                Schedule 1-on-1 Session
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}