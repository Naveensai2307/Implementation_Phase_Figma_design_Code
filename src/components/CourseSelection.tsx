import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowLeft, Search, Star, Users, Clock } from 'lucide-react';
import { getAllCourses } from '../data/coursesData';

export function CourseSelection({ onNavigate, onBack, searchQuery, onSearchChange }) {
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Certifications', 'Programming', 'Frontend', 'Backend', 'AI/ML', 'Data Science', 'Design', 'Cybersecurity', 'Database', 'Free', 'Paid'];

  // Get all courses from the comprehensive data
  const courses = getAllCourses();

  // Transform courses data to match existing component structure
  const transformedCourses = courses.map(course => ({
    ...course,
    type: course.isPaid ? 'Paid' : 'Free',
    price: course.isPaid ? `$${course.price}` : 'Free',
    bgColor: getBgColorByCategory(course.category),
    icon: getIconByCategory(course.category),
    progress: 0, // Default progress, in real app would come from user data
    subtitle: course.description || '', // Use description as subtitle
    lessonsCount: course.lessons ? course.lessons.length : 0
  }));

  function getBgColorByCategory(category) {
    const colorMap = {
      'Programming': 'bg-blue-100',
      'Frontend': 'bg-green-100',
      'Backend': 'bg-purple-100',
      'Data Science': 'bg-indigo-100',
      'AI/ML': 'bg-red-100',
      'Design': 'bg-pink-100',
      'Cybersecurity': 'bg-orange-100',
      'Database': 'bg-yellow-100',
      'Computer Networks': 'bg-teal-100',
      'Web Development': 'bg-emerald-100',
      'Cloud Computing': 'bg-sky-100',
      'DevOps': 'bg-violet-100',
      'Mobile Development': 'bg-rose-100',
      'CRM': 'bg-cyan-100'
    };
    return colorMap[category] || 'bg-gray-100';
  }

  function getIconByCategory(category) {
    const iconMap = {
      'Programming': '💻',
      'Frontend': '🎨',
      'Backend': '⚙️',
      'Data Science': '📊',
      'AI/ML': '🤖',
      'Design': '🎨',
      'Cybersecurity': '🔒',
      'Database': '🗄️',
      'Computer Networks': '🌐',
      'Web Development': '🌍',
      'Cloud Computing': '☁️',
      'DevOps': '🚀',
      'Mobile Development': '📱',
      'CRM': '📈'
    };
    return iconMap[category] || '📚';
  }

  const filteredCourses = activeTab === 'All' 
    ? transformedCourses 
    : activeTab === 'Free' 
    ? transformedCourses.filter(course => course.type === 'Free')
    : activeTab === 'Paid'
    ? transformedCourses.filter(course => course.type === 'Paid')
    : activeTab === 'Certifications'
    ? transformedCourses.filter(course => course.certification)
    : transformedCourses.filter(course => course.category === activeTab);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-responsive bg-white min-h-screen pb-20">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <button onClick={onBack} className="hover:bg-gray-100 p-2 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="text-center">
            <h1 className="text-lg font-semibold">Growify Courses</h1>
            <p className="text-xs text-gray-500">Discover & Learn</p>
          </div>
          <button 
            onClick={() => onNavigate('search')}
            className="hover:bg-gray-100 p-2 rounded-lg transition-colors"
          >
            <Search className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="p-4 lg:p-6 xl:p-8">
          {/* Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-sm transition-colors whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab === 'Certifications' ? '🏆 Certifications' : tab}
              </button>
            ))}
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 mb-6">
            {filteredCourses.map((course) => (
              <Card
                key={course.id}
                className={`p-0 rounded-2xl shadow-sm cursor-pointer hover:shadow-lg transition-all duration-200 bg-white border overflow-hidden ${
                  course.certification 
                    ? 'border-gradient-to-r from-yellow-200 to-orange-200 border-2' 
                    : 'border-gray-100 hover:border-blue-200'
                }`}
                onClick={() => onNavigate('courseDetails', course)}
              >
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-12 h-12 ${
                      course.certification 
                        ? 'bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-300' 
                        : course.bgColor
                    } rounded-xl flex items-center justify-center`}>
                      <span className="text-xl">{course.certification ? '🏆' : course.icon}</span>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        course.certification
                          ? 'bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700'
                          : course.type === 'Free' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {course.certification ? 'Certification' : course.price}
                      </span>
                      {course.originalPrice && course.originalPrice > course.price && (
                        <p className="text-xs text-gray-400 line-through mt-1">
                          ${course.originalPrice}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="font-semibold mb-1 line-clamp-2">{course.title}</h3>
                  
                  {course.certification && (
                    <div className="text-xs text-orange-700 bg-orange-50 px-2 py-1 rounded-full text-center mb-2">
                      {course.certification}
                    </div>
                  )}
                  
                  <p className="text-xs text-gray-600 mb-3 line-clamp-2">{course.subtitle}</p>
                  
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span>{course.rating || 4.5}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{course.students?.toLocaleString() || '0'}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{course.duration || 'N/A'}</span>
                    </div>
                    <span>{course.lessonsCount} lessons</span>
                  </div>
                  
                  {course.progress > 0 && (
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Course Action Button */}
                <div className="p-4 pt-0">
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate('courseDetails', course);
                    }}
                    className={`w-full h-9 rounded-lg transition-colors ${
                      course.certification
                        ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white'
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                  >
                    {course.certification 
                      ? 'Get Certified' 
                      : course.type === 'Free' 
                      ? 'Start Learning' 
                      : 'Enroll Now'
                    }
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-lg font-semibold mb-2">No courses found</h3>
              <p className="text-gray-600 mb-4">Try selecting a different category or check back later for new courses.</p>
              <Button onClick={() => setActiveTab('All')} variant="outline">
                View All Courses
              </Button>
            </div>
          )}

          {/* Category Summary */}
          {filteredCourses.length > 0 && (
            <div className={`mt-8 p-6 rounded-2xl ${
              activeTab === 'Certifications' 
                ? 'bg-gradient-to-r from-yellow-50 to-orange-50' 
                : 'bg-gradient-to-r from-blue-50 to-purple-50'
            }`}>
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">
                  {activeTab === 'All' ? 'All Courses' : activeTab} Collection
                </h3>
                <p className="text-gray-600 mb-4">
                  {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} available to boost your skills
                </p>
                <div className="flex justify-center gap-6 text-sm">
                  <div className="text-center">
                    <p className="font-semibold text-green-600">
                      {filteredCourses.filter(c => c.type === 'Free').length}
                    </p>
                    <p className="text-gray-600">Free</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-blue-600">
                      {filteredCourses.filter(c => c.type === 'Paid').length}
                    </p>
                    <p className="text-gray-600">Premium</p>
                  </div>
                  {activeTab === 'Certifications' && (
                    <div className="text-center">
                      <p className="font-semibold text-orange-600">
                        {filteredCourses.filter(c => c.certification).length}
                      </p>
                      <p className="text-gray-600">Certifications</p>
                    </div>
                  )}
                  <div className="text-center">
                    <p className="font-semibold text-purple-600">
                      {filteredCourses.length > 0 ? 
                        Math.round(filteredCourses.reduce((acc, c) => acc + (c.rating || 4.5), 0) / filteredCourses.length * 10) / 10 
                        : 4.5
                      }
                    </p>
                    <p className="text-gray-600">Avg Rating</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}