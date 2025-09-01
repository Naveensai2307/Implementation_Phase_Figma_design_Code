import React, { useState } from 'react';
import { ArrowLeft, Play, Clock, Star, BookOpen, Code, Brain, Target, ChevronRight, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

export function ContinuePracticePage({ onBack, onNavigate, challenge }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  const practiceResources = [
    {
      id: 1,
      title: "Advanced JavaScript Concepts",
      type: "course",
      category: "programming",
      level: "intermediate",
      duration: "4 hours",
      progress: 65,
      rating: 4.8,
      students: 2341,
      description: "Master closures, prototypes, and async programming",
      lessons: 18,
      thumbnail: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400",
      tags: ["JavaScript", "ES6+", "Async/Await"]
    },
    {
      id: 2,
      title: "Data Structures Practice",
      type: "practice",
      category: "algorithms",
      level: "beginner",
      duration: "2 hours",
      progress: 30,
      rating: 4.9,
      students: 1876,
      description: "Hands-on practice with arrays, linked lists, and trees",
      lessons: 25,
      thumbnail: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=400",
      tags: ["Data Structures", "Arrays", "Trees"]
    },
    {
      id: 3,
      title: "Machine Learning Fundamentals",
      type: "course",
      category: "ai-ml",
      level: "intermediate",
      duration: "6 hours",
      progress: 45,
      rating: 4.7,
      students: 3452,
      description: "Introduction to ML algorithms and implementations",
      lessons: 32,
      thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400",
      tags: ["Machine Learning", "Python", "Scikit-learn"]
    },
    {
      id: 4,
      title: "System Design Interview Prep",
      type: "interview",
      category: "system-design",
      level: "advanced",
      duration: "8 hours",
      progress: 20,
      rating: 4.9,
      students: 1234,
      description: "Master system design concepts for technical interviews",
      lessons: 15,
      thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400",
      tags: ["System Design", "Scalability", "Architecture"]
    },
    {
      id: 5,
      title: "SQL Query Optimization",
      type: "practice",
      category: "database",
      level: "intermediate",
      duration: "3 hours",
      progress: 80,
      rating: 4.6,
      students: 987,
      description: "Learn to write efficient and optimized SQL queries",
      lessons: 20,
      thumbnail: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400",
      tags: ["SQL", "Database", "Performance"]
    },
    {
      id: 6,
      title: "React Advanced Patterns",
      type: "course",
      category: "programming",
      level: "advanced",
      duration: "5 hours",
      progress: 10,
      rating: 4.8,
      students: 2876,
      description: "Advanced React patterns and performance optimization",
      lessons: 22,
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400",
      tags: ["React", "Performance", "Patterns"]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Categories', icon: BookOpen },
    { id: 'programming', name: 'Programming', icon: Code },
    { id: 'algorithms', name: 'Algorithms', icon: Brain },
    { id: 'ai-ml', name: 'AI/ML', icon: Target },
    { id: 'system-design', name: 'System Design', icon: Target },
    { id: 'database', name: 'Database', icon: BookOpen }
  ];

  const levels = [
    { id: 'all', name: 'All Levels' },
    { id: 'beginner', name: 'Beginner' },
    { id: 'intermediate', name: 'Intermediate' },
    { id: 'advanced', name: 'Advanced' }
  ];

  const filteredResources = practiceResources.filter(resource => {
    const categoryMatch = selectedCategory === 'all' || resource.category === selectedCategory;
    const levelMatch = selectedLevel === 'all' || resource.level === selectedLevel;
    return categoryMatch && levelMatch;
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case 'course':
        return <BookOpen className="h-4 w-4" />;
      case 'practice':
        return <Code className="h-4 w-4" />;
      case 'interview':
        return <Target className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'course':
        return 'bg-blue-100 text-blue-800';
      case 'practice':
        return 'bg-green-100 text-green-800';
      case 'interview':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
            <h1 className="text-2xl font-bold">Continue Practice</h1>
            <p className="text-gray-600">Related resources and courses to enhance your skills</p>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium">Filter by:</span>
            </div>
          </div>
          
          {/* Category Filter */}
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">Category</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="flex items-center gap-2"
                  >
                    <Icon className="h-3 w-3" />
                    {category.name}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Level Filter */}
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">Difficulty Level</h3>
            <div className="flex flex-wrap gap-2">
              {levels.map((level) => (
                <Button
                  key={level.id}
                  variant={selectedLevel === level.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedLevel(level.id)}
                >
                  {level.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}        
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Showing {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <Card key={resource.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <div 
                onClick={() => onNavigate('courseDetails', resource)}
                className="block"
              >
                {/* Thumbnail */}
                <div className="relative h-40 bg-gray-200 rounded-t-lg overflow-hidden">
                  <img 
                    src={resource.thumbnail} 
                    alt={resource.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge className={`${getTypeColor(resource.type)} flex items-center gap-1`}>
                      {getTypeIcon(resource.type)}
                      {resource.type}
                    </Badge>
                  </div>
                  <div className="absolute top-2 right-2">
                    <Badge className={getLevelColor(resource.level)}>
                      {resource.level}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <CardTitle className="text-lg line-clamp-2">{resource.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {resource.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{resource.progress}%</span>
                    </div>
                    <Progress value={resource.progress} className="h-2" />
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {resource.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      {resource.lessons} lessons
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      {resource.rating} ({resource.students})
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {resource.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Action Button */}
                  <Button 
                    className="w-full flex items-center gap-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate('lesson', resource);
                    }}
                  >
                    <Play className="h-4 w-4" />
                    {resource.progress > 0 ? 'Continue' : 'Start'} Practice
                  </Button>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your filters to see more results.</p>
            <Button onClick={() => {
              setSelectedCategory('all');
              setSelectedLevel('all');
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}