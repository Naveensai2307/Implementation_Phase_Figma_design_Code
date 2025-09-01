import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft, Search, Play, Users, Clock, Star, BookOpen, Award, ChevronRight, ChevronDown, CheckCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { getAllCourses } from '../data/coursesData';

export function CourseDetails({ course, onNavigate, onBack, videoProgress, completedLessons }) {
  const [selectedTopic, setSelectedTopic] = useState(0);
  const [expandedTopics, setExpandedTopics] = useState(new Set([0]));

  // Get all courses for recommendations
  const allCourses = getAllCourses();
  
  // Get comprehensive recommended courses
  const getRecommendedCourses = () => {
    if (!course) return [];
    
    // Get courses from same category
    const sameCategory = allCourses.filter(c => 
      c.id !== course.id && c.category === course.category
    );
    
    // Get related categories based on current course
    const relatedCategories = {
      'Programming': ['Frontend', 'Backend'],
      'Frontend': ['Programming', 'Design'],
      'Backend': ['Programming', 'Database'],
      'Data Science': ['AI/ML', 'Programming'],
      'AI/ML': ['Data Science', 'Programming'],
      'Design': ['Frontend'],
      'Cybersecurity': ['Computer Networks'],
      'Database': ['Backend', 'Programming'],
      'Computer Networks': ['Cybersecurity'],
      'Web Development': ['Frontend', 'Backend'],
      'Cloud Computing': ['DevOps', 'Backend'],
      'DevOps': ['Cloud Computing', 'Backend'],
      'Mobile Development': ['Frontend', 'Programming']
    };
    
    const related = course.category in relatedCategories 
      ? allCourses.filter(c => 
          c.id !== course.id && 
          relatedCategories[course.category].includes(c.category)
        )
      : [];
    
    // Get popular courses (high rating + many students)
    const popular = allCourses
      .filter(c => c.id !== course.id && (c.rating || 4.5) >= 4.6 && (c.students || 0) > 10000)
      .sort((a, b) => ((b.rating || 4.5) * (b.students || 0)) - ((a.rating || 4.5) * (a.students || 0)));
    
    // Combine and deduplicate
    const allRecommended = [...sameCategory, ...related, ...popular];
    const uniqueRecommended = allRecommended.filter((course, index, self) => 
      self.findIndex(c => c.id === course.id) === index
    );
    
    return uniqueRecommended.slice(0, 12); // Show up to 12 recommendations
  };

  const recommendedCourses = getRecommendedCourses();

  const toggleTopic = (topicIndex) => {
    const newExpanded = new Set(expandedTopics);
    if (newExpanded.has(topicIndex)) {
      newExpanded.delete(topicIndex);
    } else {
      newExpanded.add(topicIndex);
    }
    setExpandedTopics(newExpanded);
  };

  const getCompletedLessonsCount = (lessons) => {
    if (!lessons || !completedLessons) return 0;
    return lessons.filter(lesson => 
      completedLessons.includes(`${course.id}-${lesson.id}`)
    ).length;
  };

  const getTotalProgressPercentage = () => {
    if (!course?.lessons || !completedLessons) return 0;
    const totalLessons = course.lessons.length;
    const completedCount = getCompletedLessonsCount(course.lessons);
    return totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
  };

  const isLessonCompleted = (lessonId) => {
    return completedLessons?.includes(`${course.id}-${lessonId}`) || false;
  };

  const formatDuration = (duration) => {
    return duration || '5:00';
  };

  const getLessonTypeIcon = (type) => {
    const typeIcons = {
      'video': '🎥',
      'quiz': '❓',
      'coding': '💻',
      'project': '🎯',
      'reading': '📖'
    };
    return typeIcons[type] || '📚';
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Course not found</h2>
          <Button onClick={onBack}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-responsive bg-white min-h-screen pb-20">
        {/* Header */}
        <div className="flex items-center justify-between p-4 lg:p-6 border-b border-gray-100">
          <button onClick={onBack} className="hover:bg-gray-100 p-2 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="text-center">
            <h1 className="text-lg font-semibold">Course Details</h1>
            <p className="text-xs text-gray-500">{course.category}</p>
          </div>
          <button 
            onClick={() => onNavigate('search')}
            className="hover:bg-gray-100 p-2 rounded-lg transition-colors"
          >
            <Search className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="p-4 lg:p-6 xl:p-8 space-y-6">
          {/* Course Hero Section */}
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 space-y-6 lg:space-y-0">
            {/* Course Image */}
            <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden relative">
              <ImageWithFallback
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <button 
                  onClick={() => onNavigate('lesson', course, { lessonId: 1 })}
                  className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                >
                  <Play className="w-6 h-6 text-gray-700 ml-1" />
                </button>
              </div>
              
              {!course.isPaid && (
                <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Free Course
                </div>
              )}
            </div>

            {/* Course Info */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-blue-100 text-blue-700">
                    {course.category}
                  </Badge>
                  <Badge className={`${course.level?.includes('Beginner') ? 'bg-green-100 text-green-700' : 
                    course.level?.includes('Intermediate') ? 'bg-yellow-100 text-yellow-700' : 
                    'bg-red-100 text-red-700'}`}>
                    {course.level || 'Intermediate'}
                  </Badge>
                </div>
                
                <h2 className="text-2xl lg:text-3xl font-bold mb-2">{course.title}</h2>
                <p className="text-gray-600 mb-4">{course.instructor}</p>
                <p className="text-gray-700 mb-4">{course.description}</p>
              </div>

              {/* Course Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-semibold">{course.rating || 4.5}</span>
                  </div>
                  <p className="text-xs text-gray-600">Rating</p>
                </div>
                
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span className="font-semibold">{((course.students || 0) / 1000).toFixed(1)}k</span>
                  </div>
                  <p className="text-xs text-gray-600">Students</p>
                </div>
                
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Clock className="w-4 h-4 text-green-500" />
                    <span className="font-semibold">{course.duration || 'N/A'}</span>
                  </div>
                  <p className="text-xs text-gray-600">Duration</p>
                </div>
                
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <BookOpen className="w-4 h-4 text-purple-500" />
                    <span className="font-semibold">{course.lessons?.length || 0}</span>
                  </div>
                  <p className="text-xs text-gray-600">Lessons</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Your Progress</span>
                  <span className="text-sm text-gray-600">{getTotalProgressPercentage()}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${getTotalProgressPercentage()}%` }}
                  ></div>
                </div>
              </div>

              {/* Instructor Info */}
              <Card className="p-4 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl">
                    {course.instructor ? course.instructor.charAt(0) : '👨‍🏫'}
                  </div>
                  <div>
                    <p className="font-medium">{course.instructor || 'Expert Instructor'}</p>
                    <p className="text-sm text-gray-600">Course Instructor</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Course Content */}
          <div className="lg:grid lg:grid-cols-3 lg:gap-8 space-y-6 lg:space-y-0">
            {/* Course Lessons */}
            <div className="lg:col-span-3">
              <h3 className="text-lg font-semibold mb-4">Course Content</h3>
              
              <div className="space-y-3">
                {course.lessons?.map((lesson, index) => (
                  <Card 
                    key={lesson.id}
                    className="p-4 rounded-xl hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => {
                      if (!course.isPaid) {
                        onNavigate('lesson', course, { lessonId: lesson.id });
                      } else {
                        onNavigate('pricingPlans', course);
                      }
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                        <span className="text-xl">{getLessonTypeIcon('video')}</span>
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">{lesson.title}</h4>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatDuration(lesson.duration)}
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            Video
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {isLessonCompleted(lesson.id) && (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                        <Play className="w-5 h-5 text-blue-500" />
                      </div>
                    </div>
                  </Card>
                )) || (
                  <div className="text-center py-8 text-gray-500">
                    <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Course content will be available soon</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Pricing and Enrollment */}
          {course.isPaid && (
            <Card className="p-6 lg:p-8 rounded-3xl bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">Enroll in this Course</h3>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="text-3xl font-bold text-blue-600">${course.price || 99}</span>
                  {course.originalPrice && course.originalPrice > (course.price || 99) && (
                    <span className="text-lg text-gray-500 line-through">${course.originalPrice}</span>
                  )}
                </div>
                <p className="text-gray-600 mb-6">
                  Get lifetime access to all course materials, quizzes, and certificates.
                </p>
                <Button 
                  onClick={() => onNavigate('pricingPlans', course)}
                  className="bg-blue-500 hover:bg-blue-600 text-white h-12 px-8 rounded-xl font-semibold"
                >
                  Choose Premium Plan
                  {course.discount && (
                    <Badge className="ml-2 bg-red-500 text-white text-xs">
                      {course.discount}% OFF
                    </Badge>
                  )}
                </Button>
              </div>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button 
              onClick={() => {
                if (!course.isPaid) {
                  onNavigate('lesson', course, { lessonId: 1 });
                } else {
                  onNavigate('pricingPlans', course);
                }
              }}
              className="h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold"
            >
              <Play className="w-4 h-4 mr-2" />
              {!course.isPaid ? 'Start Learning' : 'Enroll Now'}
            </Button>
            
            <Button 
              onClick={() => onNavigate('professor', course)}
              className="h-12 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-semibold"
            >
              <Users className="w-4 h-4 mr-2" />
              Meet Instructor
            </Button>
            
            <Button 
              onClick={() => onNavigate('quiz', course)}
              variant="outline"
              className="h-12 rounded-xl font-semibold"
            >
              <Award className="w-4 h-4 mr-2" />
              Take Quiz
            </Button>
          </div>

          {/* Related Courses */}
          {recommendedCourses.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Recommended for You</h3>
                <Button 
                  onClick={() => onNavigate('courses')}
                  variant="outline" 
                  className="h-10 px-6 rounded-xl"
                >
                  View All Courses
                </Button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                {recommendedCourses.map((recCourse) => (
                  <Card
                    key={recCourse.id}
                    className="p-4 rounded-2xl cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => onNavigate('courseDetails', recCourse)}
                  >
                    <div className="aspect-video bg-gray-100 rounded-xl mb-3 overflow-hidden">
                      <ImageWithFallback
                        src={recCourse.thumbnail}
                        alt={recCourse.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 className="font-medium mb-1 line-clamp-2">{recCourse.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{recCourse.instructor}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-xs">{recCourse.rating || 4.5}</span>
                      </div>
                      <span className="text-sm font-semibold text-blue-600">
                        {!recCourse.isPaid ? 'Free' : `$${recCourse.price || 99}`}
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}