import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ArrowLeft, Trophy, Clock, Users, Code, Play, CheckCircle, Star } from 'lucide-react';

export function DailyChallengeDetailPage({ challenge, onBack, onNavigate }) {
  const [challengeStarted, setChallengeStarted] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);

  // Mock challenge data if not provided or incomplete
  const challengeData = (challenge && typeof challenge === 'object' && challenge.id) 
    ? challenge 
    : {
    id: 1,
    title: 'Array Manipulation Challenge',
    difficulty: 'Easy',
    points: 50,
    timeLeft: '2h 30m',
    participants: 1250,
    solved: 850,
    category: 'Data Structures',
    description: 'Solve problems involving array operations and transformations',
    problems: [
      {
        id: 1,
        title: 'Two Sum Problem',
        difficulty: 'Easy',
        points: 15,
        completed: false
      },
      {
        id: 2,
        title: 'Remove Duplicates',
        difficulty: 'Easy',
        points: 20,
        completed: false
      },
      {
        id: 3,
        title: 'Rotate Array',
        difficulty: 'Medium',
        points: 15,
        completed: false
      }
    ]
  };

  const handleStartChallenge = () => {
    setChallengeStarted(true);
    // Simulate progress
    const interval = setInterval(() => {
      setCurrentProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  if (challengeStarted && currentProgress === 100) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 text-center rounded-3xl shadow-xl">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-10 h-10 text-green-600" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Challenge Completed!</h1>
          <p className="text-gray-600 mb-6">
            You earned {challengeData.points || 0} points!
          </p>
          
          <div className="space-y-3">
            <Button 
              onClick={() => onNavigate('contests')}
              className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-xl"
            >
              View More Challenges
            </Button>
            <Button 
              onClick={() => onNavigate('dashboard')}
              variant="outline"
              className="w-full h-12 rounded-xl"
            >
              Go to Dashboard
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full max-w-4xl mx-auto bg-white min-h-screen pb-20">
        {/* Header */}
        <div className="flex items-center justify-between p-4 lg:p-6 border-b border-gray-100">
          <button onClick={onBack} className="hover:bg-gray-100 p-2 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="text-center">
            <h1 className="text-lg lg:text-xl font-semibold">Daily Challenge</h1>
            <p className="text-xs lg:text-sm text-gray-500">{challengeData.category || 'Challenge'}</p>
          </div>
          <div className="w-9 h-9"></div>
        </div>

        <div className="p-4 lg:p-6 space-y-6">
          {/* Challenge Header */}
          <Card className="p-6 rounded-2xl shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-xl font-semibold">{challengeData.title || 'Challenge'}</h2>
                  <Badge className="bg-green-100 text-green-700">
                    {challengeData.difficulty || 'Easy'}
                  </Badge>
                </div>
                <p className="text-gray-600 mb-4">{challengeData.description || 'No description available'}</p>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Trophy className="w-4 h-4 text-yellow-500" />
                      <span className="font-semibold">{challengeData.points || 0}</span>
                    </div>
                    <p className="text-xs text-gray-600">Points</p>
                  </div>
                  
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Clock className="w-4 h-4 text-red-500" />
                      <span className="font-semibold">{challengeData.timeLeft || 'N/A'}</span>
                    </div>
                    <p className="text-xs text-gray-600">Time Left</p>
                  </div>
                  
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Users className="w-4 h-4 text-blue-500" />
                      <span className="font-semibold">{challengeData.participants || 0}</span>
                    </div>
                    <p className="text-xs text-gray-600">Participants</p>
                  </div>
                  
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="font-semibold">{challengeData.solved || 0}</span>
                    </div>
                    <p className="text-xs text-gray-600">Solved</p>
                  </div>
                </div>
              </div>
            </div>
            
            {challengeStarted && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Challenge Progress</span>
                  <span className="font-semibold">{currentProgress}%</span>
                </div>
                <Progress value={currentProgress} className="h-2" />
              </div>
            )}
          </Card>

          {/* Problems List */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Challenge Problems</h3>
            <div className="space-y-3">
              {(challengeData.problems || []).map((problem, index) => (
                <Card key={problem.id || index} className="p-4 rounded-xl hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Code className="w-5 h-5 text-blue-600" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{problem.title || 'Problem'}</h4>
                        <Badge variant="outline" className="text-xs">
                          {problem.difficulty || 'Easy'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Trophy className="w-3 h-3" />
                        <span>{problem.points || 0} points</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {problem.completed && (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      )}
                      <Button 
                        size="sm" 
                        disabled={!challengeStarted}
                        className="h-8 px-4 rounded-lg"
                      >
                        <Play className="w-3 h-3 mr-1" />
                        Solve
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Action Button */}
          {!challengeStarted && (
            <div className="sticky bottom-4">
              <Button
                onClick={handleStartChallenge}
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Challenge
              </Button>
            </div>
          )}

          {/* Leaderboard Preview */}
          <Card className="p-6 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Today's Top Performers</h3>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onNavigate('contests')}
                className="h-8 px-4 rounded-lg"
              >
                View All
              </Button>
            </div>
            
            <div className="space-y-3">
              {[
                { rank: 1, name: 'Alex Kumar', points: 50, time: '5:23', avatar: '🥇' },
                { rank: 2, name: 'Priya Singh', points: 50, time: '6:45', avatar: '🥈' },
                { rank: 3, name: 'Rohit Sharma', points: 45, time: '8:12', avatar: '🥉' },
              ].map((user) => (
                <div key={user.rank} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="text-xl">{user.avatar}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">#{user.rank}</span>
                      <span className="font-medium">{user.name}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-600">
                      <span>{user.points} points</span>
                      <span>{user.time} completion time</span>
                    </div>
                  </div>
                  <Star className="w-4 h-4 text-yellow-500" />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}