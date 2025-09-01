import React from 'react';
import { ArrowLeft, Search, ChevronRight, Settings, ShoppingCart, HelpCircle, LogOut } from 'lucide-react';
import { getAllCourses } from '../data/coursesData';
import { Card } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export function ProfilePage({ user, onBack, onNavigate, onLogout }) {
  
  const handleLogoutClick = () => {
    onNavigate('logoutConfirm');
  };

  const handleAccountClick = () => {
    onNavigate('accountManagement');
  };

  const handleOrdersClick = () => {
    onNavigate('orderHistory');
  };

  const handleSupportClick = () => {
    onNavigate('support');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // Handle account deletion
      alert('Account deletion requested. Our team will process this within 24 hours.');
    }
  };
  // Get actual enrolled courses from coursesData
  const allCourses = getAllCourses();
  const enrolledCourseIds = [7, 9, 16]; // Mock enrolled course IDs - JavaScript, Python, Machine Learning
  
  const courses = enrolledCourseIds.map(id => {
    const course = allCourses.find(c => c.id === id);
    if (!course) return null;
    
    // Get course icon based on category
    const getCourseIcon = (category) => {
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
    };

    const getBgColor = (category) => {
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
    };
    
    return {
      ...course,
      lessons: `${course.lessons?.length || 0} lessons • ${course.duration}`,
      bgColor: getBgColor(course.category),
      icon: getCourseIcon(course.category)
    };
  }).filter(Boolean);

  const menuItems = [
    { icon: Settings, label: 'Account', hasChevron: true, onClick: handleAccountClick },
    { icon: Settings, label: 'Settings', hasChevron: true, onClick: () => onNavigate('settings') },
    { icon: ShoppingCart, label: 'Orders', hasChevron: true, onClick: handleOrdersClick },
    { icon: HelpCircle, label: 'Support', hasChevron: true, onClick: handleSupportClick },
    { icon: LogOut, label: 'Logout', hasChevron: false, onClick: handleLogoutClick }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-responsive bg-white min-h-screen pb-20">
        {/* Header */}
        <div className="flex items-center justify-between p-4 lg:p-6 border-b border-gray-100">
          <button 
            onClick={onBack}
            className="hover:bg-gray-100 p-2 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="text-center">
            <h1 className="text-lg lg:text-xl font-semibold">Profile</h1>
            <p className="text-xs lg:text-sm text-gray-500">Manage your account</p>
          </div>
          <button 
            onClick={() => onNavigate('search')}
            className="hover:bg-gray-100 p-2 rounded-lg transition-colors"
          >
            <Search className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="p-4 lg:p-6 xl:p-8 space-y-6 lg:space-y-8">
          {/* User Info */}
          <div className="flex flex-col sm:flex-row items-center gap-6 p-6 lg:p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl">
            <Avatar className="w-16 h-16 lg:w-20 lg:h-20 ring-4 ring-blue-100">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback className="bg-blue-500 text-white text-xl lg:text-2xl">
                {user?.name?.charAt(0) || 'J'}
              </AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <h2 className="text-xl lg:text-2xl font-semibold mb-2">{user?.name || 'Jane Doe'}</h2>
              <p className="text-gray-600">{user?.email || 'jane.doe@example.com'}</p>
              <p className="text-sm text-blue-600 mt-1">Premium Member</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <Card className="p-4 lg:p-6 text-center">
              <h3 className="text-gray-600 text-sm mb-2">Progress</h3>
              <p className="text-2xl lg:text-3xl font-semibold text-blue-600">68%</p>
            </Card>
            <Card className="p-4 lg:p-6 text-center">
              <h3 className="text-gray-600 text-sm mb-2">Achievements</h3>
              <p className="text-2xl lg:text-3xl font-semibold text-green-600">12</p>
            </Card>
            <Card className="p-4 lg:p-6 text-center">
              <h3 className="text-gray-600 text-sm mb-2">Courses</h3>
              <p className="text-2xl lg:text-3xl font-semibold text-purple-600">8</p>
            </Card>
            <Card className="p-4 lg:p-6 text-center">
              <h3 className="text-gray-600 text-sm mb-2">Hours</h3>
              <p className="text-2xl lg:text-3xl font-semibold text-orange-600">127</p>
            </Card>
          </div>

          {/* My Courses */}
          <div>
            <div className="flex items-center justify-between mb-4 lg:mb-6">
              <h3 className="text-xl lg:text-2xl font-semibold">My Courses</h3>
              <button 
                onClick={() => onNavigate('courses')}
                className="text-blue-500 text-sm lg:text-base hover:underline font-medium"
              >
                View All
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {courses.map((course) => (
                <Card 
                  key={course.id} 
                  className="p-4 lg:p-6 rounded-2xl shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => onNavigate('courseDetails', course)}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 lg:w-14 lg:h-14 ${course.bgColor} rounded-xl flex items-center justify-center`}>
                      <span className="text-xl lg:text-2xl">{course.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold mb-1 truncate">{course.title}</h4>
                      <p className="text-sm text-gray-600">{course.lessons}</p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Account Settings */}
          <div>
            <h3 className="text-xl lg:text-2xl font-semibold mb-4 lg:mb-6">Account Settings</h3>
            <div className="space-y-3">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.onClick}
                  className="w-full flex items-center gap-4 p-4 lg:p-6 hover:bg-gray-50 rounded-2xl transition-colors border border-gray-100 hover:border-blue-200"
                >
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                    <item.icon className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <span className="font-medium text-gray-900">{item.label}</span>
                  </div>
                  {item.hasChevron && <ChevronRight className="w-5 h-5 text-gray-400" />}
                </button>
              ))}
              
              {/* Delete Account Button */}
              <button
                onClick={handleDeleteAccount}
                className="w-full flex items-center gap-4 p-4 lg:p-6 hover:bg-red-50 rounded-2xl transition-colors border border-red-200 text-red-600"
              >
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-red-50 rounded-xl flex items-center justify-center">
                  <LogOut className="w-5 h-5 lg:w-6 lg:h-6 text-red-600" />
                </div>
                <div className="flex-1 text-left">
                  <span className="font-medium">Delete Account</span>
                  <p className="text-sm text-red-500">Permanent action - cannot be undone</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}