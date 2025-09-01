import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Search, ArrowRight, Play, Clock, Trophy, Target, BookOpen, Shield, Award } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { getAllCourses, getCertificationCourses } from '../data/coursesData';

export function Dashboard({ user, onNavigate, videoProgress, completedLessons }) {
  const allCourses = getAllCourses();
  const certificationCourses = getCertificationCourses();

  // Get continue watching data from video progress
  const getContinueWatchingCourses = () => {
    if (!videoProgress || Object.keys(videoProgress).length === 0) return [];
    
    const progressEntries = Object.entries(videoProgress)
      .sort((a, b) => new Date(b[1].lastWatched) - new Date(a[1].lastWatched))
      .slice(0, 4);
    
    return progressEntries.map(([key, progress]) => {
      const [courseId] = key.split('-');
      const course = allCourses.find(c => c.id === parseInt(courseId));
      if (!course) return null;
      
      return {
        ...course,
        progress: Math.round(progress.progress),
        lastWatched: progress.lastWatched,
        currentTime: progress.currentTime,
        duration: progress.duration
      };
    }).filter(Boolean);
  };

  // Get recommended courses (popular free courses + new courses)
  const getRecommendedCourses = () => {
    const nonCertificationCourses = allCourses.filter(course => !course.certification);
    const freeCourses = nonCertificationCourses.filter(course => !course.isPaid);
    const paidCourses = nonCertificationCourses.filter(course => course.isPaid);
    
    // Mix of free and popular paid courses
    const recommended = [
      ...freeCourses.slice(0, 2),
      ...paidCourses.filter(c => (c.rating || 4.5) >= 4.7).slice(0, 2)
    ];
    
    return recommended.slice(0, 4);
  };

  const continueWatchingCourses = getContinueWatchingCourses();
  const recommendedCourses = getRecommendedCourses();

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getWelcomeMessage = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-responsive bg-white min-h-screen pb-20">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-lg">🚀</span>
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Growify
              </h1>
              <p className="text-sm text-gray-600">{getWelcomeMessage()}, {user?.name || 'Learner'}!</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onNavigate('search')}
              className="hover:bg-gray-100 p-2 rounded-lg transition-colors"
            >
              <Search className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="p-4 lg:p-6 xl:p-8 space-y-6 lg:space-y-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-4 text-center">
              <BookOpen className="h-6 w-6 text-blue-500 mx-auto mb-2" />
              <div className="text-lg font-semibold">{allCourses.length}</div>
              <div className="text-xs text-gray-600">Courses Available</div>
            </Card>
            <Card className="p-4 text-center">
              <Trophy className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
              <div className="text-lg font-semibold">{completedLessons?.length || 0}</div>
              <div className="text-xs text-gray-600">Lessons Completed</div>
            </Card>
            <Card className="p-4 text-center">
              <Clock className="h-6 w-6 text-green-500 mx-auto mb-2" />
              <div className="text-lg font-semibold">{Math.round((completedLessons?.length || 0) * 0.75)}h</div>
              <div className="text-xs text-gray-600">Time Learned</div>
            </Card>
            <Card className="p-4 text-center">
              <Target className="h-6 w-6 text-purple-500 mx-auto mb-2" />
              <div className="text-lg font-semibold">{continueWatchingCourses.length}</div>
              <div className="text-xs text-gray-600">In Progress</div>
            </Card>
          </div>

          {/* Professional Certifications */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl lg:text-2xl">Professional Certifications</h2>
                <p className="text-sm text-gray-600">Industry-recognized certifications from top companies</p>
              </div>
              <button 
                onClick={() => onNavigate('courses', null, { category: 'certifications' })}
                className="text-blue-500 text-sm lg:text-base hover:underline font-medium"
              >
                View All
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
              {certificationCourses.slice(0, 4).map((course) => (
                <Card 
                  key={course.id} 
                  className="p-4 rounded-2xl shadow-sm cursor-pointer hover:shadow-md transition-shadow border-2 border-gradient-to-r from-yellow-200 to-orange-200"
                  onClick={() => onNavigate('courseDetails', course)}
                >
                  <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden mb-3 relative">
                    <ImageWithFallback
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      🏆 Certification
                    </div>
                    <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-full">
                      {course.duration}
                    </div>
                  </div>
                  <h3 className="text-sm mb-1 line-clamp-2 font-medium">{course.title}</h3>
                  <p className="text-xs text-gray-600 mb-2">{course.instructor}</p>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1">
                      <span className="text-xs">⭐ {course.rating || 4.5}</span>
                      <span className="text-xs text-gray-500">({course.students?.toLocaleString() || 0})</span>
                    </div>
                    <span className="text-xs font-semibold text-orange-600">
                      ${course.price}
                    </span>
                  </div>
                  <div className="text-xs text-orange-700 bg-orange-50 px-2 py-1 rounded-full text-center">
                    {course.certification}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Continue Watching */}
          {continueWatchingCourses.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl lg:text-2xl">Continue Watching</h2>
                <button 
                  onClick={() => onNavigate('continueWatching')}
                  className="text-blue-500 text-sm lg:text-base hover:underline font-medium"
                >
                  View All
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                {continueWatchingCourses.map((course) => (
                  <Card 
                    key={course.id}
                    className="p-4 rounded-2xl shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => onNavigate('professor', course)}
                  >
                    <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden relative mb-3">
                      <ImageWithFallback
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                        <div className="w-8 h-8 bg-white bg-opacity-95 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                          <Play className="w-4 h-4 text-gray-700 ml-0.5" />
                        </div>
                      </div>
                      <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full">
                        {course.progress}%
                      </div>
                      {course.currentTime && course.duration && (
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full">
                          {formatTime(course.currentTime)}/{formatTime(course.duration)}
                        </div>
                      )}
                    </div>
                    <h3 className="text-sm mb-1 line-clamp-2">{course.title}</h3>
                    <p className="text-xs text-gray-600 mb-2">{course.instructor}</p>
                    <div className="w-full bg-gray-200 rounded-full h-1 mb-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-1 rounded-full transition-all duration-300"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate('professor', course);
                      }}
                      className="w-full h-8 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs"
                    >
                      Watch Professor
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Recommended for you */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl lg:text-2xl">Recommended for you</h2>
              <button 
                onClick={() => onNavigate('courses')}
                className="text-blue-500 text-sm lg:text-base hover:underline font-medium"
              >
                See All
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
              {recommendedCourses.map((course) => (
                <Card 
                  key={course.id} 
                  className="p-4 rounded-2xl shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => onNavigate('courseDetails', course)}
                >
                  <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden mb-3 relative">
                    <ImageWithFallback
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    {!course.isPaid && (
                      <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        Free
                      </div>
                    )}
                  </div>
                  <h3 className="text-sm mb-1 line-clamp-2">{course.title}</h3>
                  <p className="text-xs text-gray-600 mb-2">{course.instructor}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <span className="text-xs">⭐ {course.rating || 4.5}</span>
                    </div>
                    <span className="text-xs font-semibold text-blue-600">
                      {!course.isPaid ? 'Free' : `$${course.price}`}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Button 
              onClick={() => onNavigate('courses')}
              variant="outline"
              className="h-16 flex flex-col gap-2"
            >
              <BookOpen className="h-5 w-5" />
              <span className="text-xs">Browse Courses</span>
            </Button>
            <Button 
              onClick={() => onNavigate('challenges')}
              variant="outline"
              className="h-16 flex flex-col gap-2"
            >
              <Target className="h-5 w-5" />
              <span className="text-xs">Daily Challenges</span>
            </Button>
            <Button 
              onClick={() => onNavigate('contests')}
              variant="outline"
              className="h-16 flex flex-col gap-2"
            >
              <Trophy className="h-5 w-5" />
              <span className="text-xs">Contests</span>
            </Button>
            <Button 
              onClick={() => onNavigate('achievements')}
              variant="outline"
              className="h-16 flex flex-col gap-2"
            >
              <Trophy className="h-5 w-5" />
              <span className="text-xs">Achievements</span>
            </Button>
          </div>

          {/* Navigation Button */}
          <Button 
            onClick={() => onNavigate('courses')}
            className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg mt-8 font-semibold"
          >
            Explore All Courses
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}