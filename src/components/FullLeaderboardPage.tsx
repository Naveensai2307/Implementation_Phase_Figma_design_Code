import React, { useState } from 'react';
import { ArrowLeft, Trophy, Medal, Crown, Star, TrendingUp, Filter, Search, User, Award } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export function FullLeaderboardPage({ onBack, onNavigate }) {
  const [selectedTimeframe, setSelectedTimeframe] = useState('all-time');
  const [selectedCategory, setSelectedCategory] = useState('overall');
  const [searchQuery, setSearchQuery] = useState('');

  const leaderboardData = [
    {
      id: 1,
      name: "Alex Johnson",
      username: "@alexcodes",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
      score: 98750,
      rank: 1,
      change: "+2",
      badge: "Coding Master",
      level: "Expert",
      location: "San Francisco, CA",
      completedChallenges: 245,
      streakDays: 127,
      achievements: ["30-Day Streak", "Problem Solver", "Code Ninja"],
      joinedDate: "2023-01-15",
      specialties: ["Algorithms", "Data Structures", "System Design"]
    },
    {
      id: 2,
      name: "Sarah Chen",
      username: "@sarahtech",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b45b2ee2?w=100",
      score: 95420,
      rank: 2,
      change: "0",
      badge: "AI Specialist",
      level: "Expert",
      location: "Seattle, WA",
      completedChallenges: 198,
      streakDays: 89,
      achievements: ["ML Expert", "Data Wizard", "Innovation Leader"],
      joinedDate: "2023-02-10",
      specialties: ["Machine Learning", "Python", "Neural Networks"]
    },
    {
      id: 3,
      name: "Marcus Rodriguez",
      username: "@marcusdev",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      score: 92100,
      rank: 3,
      change: "+1",
      badge: "Full Stack Pro",
      level: "Advanced",
      location: "Austin, TX",
      completedChallenges: 167,
      streakDays: 56,
      achievements: ["Full Stack Master", "API Guru", "Database Expert"],
      joinedDate: "2023-03-05",
      specialties: ["React", "Node.js", "MongoDB"]
    },
    {
      id: 4,
      name: "Emily Park",
      username: "@emilycode",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
      score: 88650,
      rank: 4,
      change: "-1",
      badge: "Frontend Ninja",
      level: "Advanced",
      location: "New York, NY",
      completedChallenges: 189,
      streakDays: 73,
      achievements: ["UI/UX Master", "React Expert", "Design Pro"],
      joinedDate: "2023-01-28",
      specialties: ["React", "TypeScript", "CSS"]
    },
    {
      id: 5,
      name: "David Kim",
      username: "@davidtech",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
      score: 85300,
      rank: 5,
      change: "+3",
      badge: "Backend Expert",
      level: "Advanced",
      location: "Los Angeles, CA",
      completedChallenges: 156,
      streakDays: 42,
      achievements: ["API Master", "Database Pro", "Cloud Expert"],
      joinedDate: "2023-04-12",
      specialties: ["Java", "Spring Boot", "AWS"]
    },
    {
      id: 6,
      name: "Jennifer Liu",
      username: "@jennifercodes",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
      score: 82700,
      rank: 6,
      change: "0",
      badge: "Data Scientist",
      level: "Advanced",
      location: "Boston, MA",
      completedChallenges: 134,
      streakDays: 65,
      achievements: ["Data Master", "Analytics Pro", "Visualization Expert"],
      joinedDate: "2023-02-20",
      specialties: ["Python", "Data Analysis", "Tableau"]
    },
    {
      id: 7,
      name: "Michael Brown",
      username: "@mikecodes",
      avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=100",
      score: 79850,
      rank: 7,
      change: "+1",
      badge: "Mobile Developer",
      level: "Intermediate",
      location: "Chicago, IL",
      completedChallenges: 145,
      streakDays: 38,
      achievements: ["Mobile Master", "Cross-platform Pro", "App Store Hero"],
      joinedDate: "2023-03-15",
      specialties: ["Flutter", "React Native", "Swift"]
    },
    {
      id: 8,
      name: "Lisa Wang",
      username: "@lisatech",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100",
      score: 76200,
      rank: 8,
      change: "-2",
      badge: "DevOps Engineer",
      level: "Intermediate",
      location: "Denver, CO",
      completedChallenges: 123,
      streakDays: 29,
      achievements: ["CI/CD Master", "Cloud Expert", "Infrastructure Pro"],
      joinedDate: "2023-05-01",
      specialties: ["Docker", "Kubernetes", "Jenkins"]
    },
    {
      id: 9,
      name: "Robert Taylor",
      username: "@robtech",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
      score: 73500,
      rank: 9,
      change: "+4",
      badge: "Security Expert",
      level: "Intermediate",
      location: "Miami, FL",
      completedChallenges: 112,
      streakDays: 51,
      achievements: ["Security Pro", "Ethical Hacker", "Vulnerability Hunter"],
      joinedDate: "2023-04-20",
      specialties: ["Cybersecurity", "Penetration Testing", "Network Security"]
    },
    {
      id: 10,
      name: "Amanda Davis",
      username: "@amandacodes",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
      score: 70800,
      rank: 10,
      change: "-1",
      badge: "Game Developer",
      level: "Intermediate",
      location: "Portland, OR",
      completedChallenges: 98,
      streakDays: 34,
      achievements: ["Game Master", "Unity Pro", "Graphics Expert"],
      joinedDate: "2023-06-01",
      specialties: ["Unity", "C#", "Game Design"]
    }
  ];

  const timeframes = [
    { id: 'all-time', name: 'All Time' },
    { id: 'this-month', name: 'This Month' },
    { id: 'this-week', name: 'This Week' },
    { id: 'today', name: 'Today' }
  ];

  const categories = [
    { id: 'overall', name: 'Overall' },
    { id: 'algorithms', name: 'Algorithms' },
    { id: 'data-structures', name: 'Data Structures' },
    { id: 'web-dev', name: 'Web Development' },
    { id: 'mobile-dev', name: 'Mobile Development' },
    { id: 'ai-ml', name: 'AI/ML' },
    { id: 'databases', name: 'Databases' }
  ];

  const filteredLeaderboard = leaderboardData.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return (
          <div className="h-6 w-6 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-xs font-medium">{rank}</span>
          </div>
        );
    }
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500';
      case 3:
        return 'bg-gradient-to-r from-amber-400 to-amber-600';
      default:
        return 'bg-gradient-to-r from-blue-500 to-blue-600';
    }
  };

  const getChangeIcon = (change) => {
    if (change.startsWith('+')) {
      return <TrendingUp className="h-4 w-4 text-green-500" />;
    } else if (change.startsWith('-')) {
      return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />;
    }
    return <div className="h-4 w-4 bg-gray-300 rounded-full" />;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
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
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Trophy className="h-6 w-6 text-yellow-500" />
              Full Leaderboard
            </h1>
            <p className="text-gray-600">Complete rankings and user profiles</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="mb-6 space-y-4">
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Timeframe Filter */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Timeframe:
            </span>
            {timeframes.map((timeframe) => (
              <Button
                key={timeframe.id}
                variant={selectedTimeframe === timeframe.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTimeframe(timeframe.id)}
              >
                {timeframe.name}
              </Button>
            ))}
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium">Category:</span>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Top 3 Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {filteredLeaderboard.slice(0, 3).map((user, index) => (
            <Card 
              key={user.id} 
              className={`relative overflow-hidden cursor-pointer hover:shadow-lg transition-shadow ${
                index === 0 ? 'md:order-2 border-yellow-300' : 
                index === 1 ? 'md:order-1 border-gray-300' : 
                'md:order-3 border-amber-300'
              }`}
              onClick={() => onNavigate('userProfile', user)}
            >
              <div className={`h-2 ${getRankColor(user.rank)}`}></div>
              <CardHeader className="text-center pb-2">
                <div className="flex justify-center mb-2">
                  {getRankIcon(user.rank)}
                </div>
                <Avatar className="h-16 w-16 mx-auto mb-2">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-lg">{user.name}</CardTitle>
                <CardDescription>{user.username}</CardDescription>
                <Badge className="w-fit mx-auto">{user.badge}</Badge>
              </CardHeader>
              <CardContent className="text-center space-y-2">
                <div className="text-2xl font-bold text-blue-600">{user.score.toLocaleString()}</div>
                <div className="text-sm text-gray-600">{user.completedChallenges} challenges</div>
                <div className="flex items-center justify-center gap-1 text-sm">
                  <span>🔥 {user.streakDays} day streak</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Full Leaderboard Table */}
        <Card>
          <CardHeader>
            <CardTitle>Complete Rankings</CardTitle>
            <CardDescription>
              Showing {filteredLeaderboard.length} users
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-2">
              {filteredLeaderboard.map((user) => (
                <div 
                  key={user.id}
                  className="flex items-center gap-4 p-4 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                  onClick={() => onNavigate('userProfile', user)}
                >
                  {/* Rank */}
                  <div className="flex items-center gap-2 w-16">
                    {getRankIcon(user.rank)}
                    <span className="font-medium">#{user.rank}</span>
                  </div>

                  {/* User Info */}
                  <div className="flex items-center gap-3 flex-1">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{user.name}</h3>
                        <Badge variant="secondary">{user.level}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{user.username}</span>
                        <span>{user.location}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">{user.badge}</Badge>
                        {user.specialties.slice(0, 2).map((specialty, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="hidden md:flex flex-col items-center text-center min-w-[100px]">
                    <div className="font-bold text-lg">{user.score.toLocaleString()}</div>
                    <div className="text-xs text-gray-600">points</div>
                  </div>

                  <div className="hidden md:flex flex-col items-center text-center min-w-[100px]">
                    <div className="font-medium">{user.completedChallenges}</div>
                    <div className="text-xs text-gray-600">challenges</div>
                  </div>

                  <div className="hidden md:flex flex-col items-center text-center min-w-[100px]">
                    <div className="font-medium flex items-center gap-1">
                      🔥 {user.streakDays}
                    </div>
                    <div className="text-xs text-gray-600">day streak</div>
                  </div>

                  {/* Change */}
                  <div className="flex items-center gap-1 min-w-[60px] justify-end">
                    {getChangeIcon(user.change)}
                    <span className={`text-sm font-medium ${
                      user.change.startsWith('+') ? 'text-green-600' : 
                      user.change.startsWith('-') ? 'text-red-600' : 
                      'text-gray-600'
                    }`}>
                      {user.change !== '0' ? user.change : '—'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* No Results */}
        {filteredLeaderboard.length === 0 && (
          <div className="text-center py-12">
            <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filters.</p>
            <Button onClick={() => setSearchQuery('')}>
              Clear Search
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}