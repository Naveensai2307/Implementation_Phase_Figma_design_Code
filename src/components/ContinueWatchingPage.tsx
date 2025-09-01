import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft, Play, Clock, BookOpen } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function ContinueWatchingPage({ videoProgress, onBack, onNavigate }) {
  // Expanded mock course data - in real app this would come from API
  const coursesData = {
    1: {
      id: 1,
      title: 'Python Programming Mastery',
      subtitle: 'Complete Python course from beginner to advanced',
      category: 'Programming',
      image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=225&fit=crop',
      instructor: 'Dr. Sarah Chen',
      totalLessons: 45
    },
    2: {
      id: 2,
      title: 'Data Structures & Algorithms',
      subtitle: 'Master DSA for coding interviews',
      category: 'Programming',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=225&fit=crop',
      instructor: 'Prof. Alex Kumar',
      totalLessons: 60
    },
    3: {
      id: 3,
      title: 'Pandas for Data Analysis',
      subtitle: 'Master data manipulation and analysis',
      category: 'Data Science',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop',
      instructor: 'Dr. Emily Watson',
      totalLessons: 30
    },
    4: {
      id: 4,
      title: 'NumPy Mastery',
      subtitle: 'Scientific computing with NumPy',
      category: 'Data Science',
      image: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=400&h=225&fit=crop',
      instructor: 'Dr. Michael Chang',
      totalLessons: 25
    },
    5: {
      id: 5,
      title: 'Matplotlib Data Visualization',
      subtitle: 'Create stunning visualizations',
      category: 'Data Science',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop',
      instructor: 'Prof. Lisa Anderson',
      totalLessons: 22
    },
    6: {
      id: 6,
      title: 'Excel Mastery for Data Analysis',
      subtitle: 'Complete Excel course for business',
      category: 'Data Analytics',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=225&fit=crop',
      instructor: 'Robert Martinez',
      totalLessons: 40
    },
    7: {
      id: 7,
      title: 'Google Sheets Mastery',
      subtitle: 'Cloud-based spreadsheet mastery',
      category: 'Data Analytics',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop',
      instructor: 'Jennifer Liu',
      totalLessons: 25
    },
    8: {
      id: 8,
      title: 'Complete Data Science Bootcamp',
      subtitle: 'End-to-end data science with Python, ML',
      category: 'Data Science',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop',
      instructor: 'Dr. David Thompson',
      totalLessons: 100
    },
    9: {
      id: 9,
      title: 'Power BI for Business Intelligence',
      subtitle: 'Create interactive dashboards',
      category: 'Data Analytics',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop',
      instructor: 'Maria Rodriguez',
      totalLessons: 35
    },
    10: {
      id: 10,
      title: 'SQL for Data Analysis',
      subtitle: 'Master SQL for database management',
      category: 'Data Analytics',
      image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=225&fit=crop',
      instructor: 'James Wilson',
      totalLessons: 30
    }
  };

  // Convert video progress to continue watching items
  const continueWatchingItems = Object.entries(videoProgress).map(([key, progress]) => {
    const [courseId, lessonId] = key.split('-');
    const course = coursesData[courseId];
    
    if (!course) return null;

    return {
      id: key,
      courseId: parseInt(courseId),
      lessonId: parseInt(lessonId),
      course,
      progress: Math.round(progress.progress),
      currentTime: progress.currentTime,
      duration: progress.duration,
      lastWatched: new Date(progress.lastWatched),
      lessonTitle: `Lesson ${lessonId}: ${getLessonTitle(courseId, lessonId)}`
    };
  }).filter(Boolean).sort((a, b) => new Date(b.lastWatched) - new Date(a.lastWatched));

  function getLessonTitle(courseId, lessonId) {
    const lessonTitles = {
      1: {
        1: 'Introduction to UI Design',
        2: 'Design Principles',
        3: 'Color Theory',
        4: 'Typography Basics',
        5: 'Layout and Spacing'
      },
      2: {
        1: 'Python Basics',
        2: 'Variables and Data Types',
        3: 'Control Structures',
        4: 'Functions and Modules',
        5: 'Object-Oriented Programming'
      },
      3: {
        1: 'Introduction to Data Science',
        2: 'Data Collection Methods',
        3: 'Data Cleaning Techniques',
        4: 'Exploratory Data Analysis',
        5: 'Data Visualization'
      }
    };
    return lessonTitles[courseId]?.[lessonId] || 'Lesson Content';
  }

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)} days ago`;
    }
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (continueWatchingItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="w-full max-w-4xl mx-auto bg-white min-h-screen pb-20">
          {/* Header */}
          <div className="flex items-center justify-between p-4 lg:p-6 border-b border-gray-100">
            <button onClick={onBack} className="hover:bg-gray-100 p-2 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="text-center">
              <h1 className="text-lg lg:text-xl font-semibold">Continue Watching</h1>
              <p className="text-xs lg:text-sm text-gray-500">Pick up where you left off</p>
            </div>
            <div className="w-9 h-9"></div>
          </div>

          <div className="p-4 lg:p-6 flex items-center justify-center min-h-96">
            <div className="text-center">
              <div className="text-6xl mb-4">📺</div>
              <h3 className="text-xl font-semibold mb-2">No videos in progress</h3>
              <p className="text-gray-600 mb-6">
                Start watching a course to see your progress here
              </p>
              <Button 
                onClick={() => onNavigate('courses')}
                className="h-12 px-8 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold"
              >
                Browse Courses
              </Button>
            </div>
          </div>
        </div>
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
            <h1 className="text-lg lg:text-xl font-semibold">Continue Watching</h1>
            <p className="text-xs lg:text-sm text-gray-500">{continueWatchingItems.length} videos in progress</p>
          </div>
          <div className="w-9 h-9"></div>
        </div>

        <div className="p-4 lg:p-6 space-y-6">
          {/* Recently Watched */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Recently Watched</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 lg:gap-4">
              {continueWatchingItems.map((item) => (
                <Card
                  key={item.id}
                  className="p-0 overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => onNavigate('lesson', item.course, { 
                    lessonId: item.lessonId,
                    resumeTime: item.currentTime 
                  })}
                >
                  {/* Video Thumbnail - Even Smaller */}
                  <div className="aspect-[16/10] bg-gray-900 relative">
                    <ImageWithFallback
                      src={item.course.image}
                      alt={item.course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                      <div className="w-10 h-10 bg-white bg-opacity-90 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 text-gray-700 ml-0.5" />
                      </div>
                    </div>
                    
                    {/* Progress indicator */}
                    <div className="absolute top-3 left-3 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full">
                      {item.progress}% complete
                    </div>
                    
                    {/* Duration */}
                    <div className="absolute bottom-3 right-3 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                      {formatDuration(item.currentTime)} / {formatDuration(item.duration)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-3 lg:p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-base lg:text-lg mb-1">{item.course.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{item.lessonTitle}</p>
                      </div>
                      <Badge className="ml-2 bg-blue-100 text-blue-700 text-xs">
                        {item.course.category}
                      </Badge>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4 text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{formatTimeAgo(item.lastWatched)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          <span>By {item.course.instructor}</span>
                        </div>
                      </div>
                      
                      <Button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigate('professor', item.course, { 
                            lessonId: item.lessonId,
                            lessonTitle: item.lessonTitle 
                          });
                        }}
                        className="h-8 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm"
                      >
                        <Play className="w-3 h-3 mr-1" />
                        Resume
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Progress Summary */}
          <Card className="p-6 lg:p-8 rounded-3xl shadow-sm bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="text-center">
              <h4 className="text-lg lg:text-xl font-semibold mb-2">Your Learning Progress</h4>
              <p className="text-gray-600 mb-6">Keep up the great work! You're making excellent progress.</p>
              
              <div className="grid grid-cols-3 gap-4 lg:gap-6">
                <div className="text-center">
                  <p className="text-2xl lg:text-3xl font-bold text-blue-600 mb-1">
                    {continueWatchingItems.length}
                  </p>
                  <p className="text-sm text-gray-600">Courses Started</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl lg:text-3xl font-bold text-green-600 mb-1">
                    {Math.round(continueWatchingItems.reduce((acc, item) => acc + item.progress, 0) / continueWatchingItems.length)}%
                  </p>
                  <p className="text-sm text-gray-600">Avg Progress</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl lg:text-3xl font-bold text-purple-600 mb-1">
                    {Math.round(continueWatchingItems.reduce((acc, item) => acc + item.duration, 0) / 3600)}h
                  </p>
                  <p className="text-sm text-gray-600">Total Hours</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button 
              onClick={() => onNavigate('courses')}
              className="h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Browse More Courses
            </Button>
            <Button 
              onClick={() => onNavigate('achievements')}
              className="h-12 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-xl font-semibold"
            >
              View Achievements
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}