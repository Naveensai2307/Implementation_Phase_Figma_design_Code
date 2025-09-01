import React, { useState, useEffect } from 'react';
import { SignInPage } from './components/SignInPage';
import { Dashboard } from './components/Dashboard';
import { CourseSelection } from './components/CourseSelection';
import { CourseDetails } from './components/CourseDetails';
import { LessonPage } from './components/LessonPage';
import { ProfilePage } from './components/ProfilePage';
import { AchievementsPage } from './components/AchievementsPage';
import { BottomNavigation } from './components/BottomNavigation';
import { QuizPage } from './components/QuizPage';
import { ProfessorView } from './components/ProfessorView';
import { SearchPage } from './components/SearchPage';
import { ChallengesPage } from './components/ChallengesPage';
import { ContestsPage } from './components/ContestsPage';
import { PaymentPage } from './components/PaymentPage';
import { CourseFeedbackPage } from './components/CourseFeedbackPage';
import { DailyChallengeDetailPage } from './components/DailyChallengeDetailPage';
import { AchievementDetailPage } from './components/AchievementDetailPage';
import { ContinueWatchingPage } from './components/ContinueWatchingPage';
import { SettingsPage } from './components/SettingsPage';
import { OrderHistoryPage } from './components/OrderHistoryPage';
import { AccountManagementPage } from './components/AccountManagementPage';
import { SupportPage } from './components/SupportPage';
import { LogoutConfirmPage } from './components/LogoutConfirmPage';
import { RegistrationPage } from './components/RegistrationPage';
import { ContinuePracticePage } from './components/ContinuePracticePage';
import { FullLeaderboardPage } from './components/FullLeaderboardPage';
import { JoinChallengePage } from './components/JoinChallengePage';
import { PreferencesPage } from './components/PreferencesPage';
import { NotificationsPage } from './components/NotificationsPage';
import { LearningPage } from './components/LearningPage';
import { SupportLegalPage } from './components/SupportLegalPage';
import { PricingPlansPage } from './components/PricingPlansPage';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('signin');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [videoProgress, setVideoProgress] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [completedLessons, setCompletedLessons] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load dark mode preference from localStorage and apply immediately
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('growify-dark-mode');
    if (savedDarkMode !== null) {
      const darkMode = JSON.parse(savedDarkMode);
      setIsDarkMode(darkMode);
      applyDarkMode(darkMode);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
      applyDarkMode(prefersDark);
    }
  }, []);

  // Apply dark mode to DOM
  const applyDarkMode = (darkMode) => {
    const html = document.documentElement;
    const body = document.body;
    
    if (darkMode) {
      html.classList.add('dark');
      body.classList.add('dark');
    } else {
      html.classList.remove('dark');
      body.classList.remove('dark');
    }
  };

  // Save dark mode preference and apply to DOM
  useEffect(() => {
    localStorage.setItem('growify-dark-mode', JSON.stringify(isDarkMode));
    applyDarkMode(isDarkMode);
  }, [isDarkMode]);

  // Add mock progress data for demo with longer durations
  useEffect(() => {
    if (Object.keys(videoProgress).length === 0) {
      const mockProgress = {
        '1-1': { currentTime: 1820, duration: 4680, progress: 38.9, lastWatched: new Date().toISOString() },
        '2-3': { currentTime: 2134, duration: 5280, progress: 40.4, lastWatched: new Date(Date.now() - 3600000).toISOString() },
        '3-2': { currentTime: 3456, duration: 6120, progress: 56.5, lastWatched: new Date(Date.now() - 7200000).toISOString() },
        '4-1': { currentTime: 1234, duration: 4320, progress: 28.6, lastWatched: new Date(Date.now() - 86400000).toISOString() },
        '5-4': { currentTime: 2876, duration: 5760, progress: 49.9, lastWatched: new Date(Date.now() - 172800000).toISOString() },
        '6-2': { currentTime: 2145, duration: 4980, progress: 43.1, lastWatched: new Date(Date.now() - 259200000).toISOString() },
        '7-1': { currentTime: 567, duration: 3900, progress: 14.5, lastWatched: new Date(Date.now() - 345600000).toISOString() },
        '8-5': { currentTime: 3234, duration: 6480, progress: 49.9, lastWatched: new Date(Date.now() - 432000000).toISOString() }
      };
      setVideoProgress(mockProgress);
    }
  }, []);

  // Load saved data from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('growify-video-progress');
    const savedLessons = localStorage.getItem('growify-completed-lessons');
    
    if (savedProgress) {
      setVideoProgress(JSON.parse(savedProgress));
    }
    if (savedLessons) {
      setCompletedLessons(JSON.parse(savedLessons));
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('growify-video-progress', JSON.stringify(videoProgress));
  }, [videoProgress]);

  useEffect(() => {
    localStorage.setItem('growify-completed-lessons', JSON.stringify(completedLessons));
  }, [completedLessons]);

  const handleSignIn = (userData) => {
    setUser(userData);
    setCurrentScreen('dashboard');
    setActiveTab('dashboard');
  };

  const navigateToScreen = (screen, courseData = null, additionalData = null) => {
    setCurrentScreen(screen);
    if (courseData) {
      setSelectedCourse(courseData);
    }
    // Handle additional navigation data if needed
    if (additionalData && additionalData.searchQuery) {
      setSearchQuery(additionalData.searchQuery);
    }
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setCurrentScreen(tabId);
  };

  const updateVideoProgress = (courseId, lessonId, currentTime, duration) => {
    setVideoProgress(prev => ({
      ...prev,
      [`${courseId}-${lessonId}`]: {
        currentTime,
        duration,
        progress: (currentTime / duration) * 100,
        lastWatched: new Date().toISOString()
      }
    }));
  };

  const markLessonComplete = (courseId, lessonId) => {
    const lessonKey = `${courseId}-${lessonId}`;
    if (!completedLessons.includes(lessonKey)) {
      setCompletedLessons(prev => [...prev, lessonKey]);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentScreen('signin');
    setActiveTab('dashboard');
    // Clear stored data
    localStorage.removeItem('growify-video-progress');
    localStorage.removeItem('growify-completed-lessons');
    setVideoProgress({});
    setCompletedLessons([]);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Screens that should show bottom navigation
  const screensWithBottomNav = ['dashboard', 'courses', 'achievements', 'profile', 'challenges', 'contests'];
  const showBottomNav = user && screensWithBottomNav.includes(currentScreen);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'signin':
        return <SignInPage onSignIn={handleSignIn} onNavigate={navigateToScreen} />;
      
      case 'dashboard':
        return (
          <Dashboard 
            user={user} 
            onNavigate={navigateToScreen}
            videoProgress={videoProgress}
            completedLessons={completedLessons}
          />
        );
      
      case 'courses':
        return (
          <CourseSelection 
            onNavigate={navigateToScreen} 
            onBack={() => {
              setCurrentScreen('dashboard');
              setActiveTab('dashboard');
            }}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        );
      
      case 'courseDetails':
        return (
          <CourseDetails 
            course={selectedCourse} 
            onNavigate={navigateToScreen} 
            onBack={() => {
              setCurrentScreen('courses');
              setActiveTab('courses');
            }}
            videoProgress={videoProgress}
            completedLessons={completedLessons}
          />
        );
      
      case 'lesson':
        return (
          <LessonPage 
            course={selectedCourse} 
            onBack={() => setCurrentScreen('courseDetails')}
            onNavigate={navigateToScreen}
            videoProgress={videoProgress}
            onUpdateProgress={updateVideoProgress}
            onMarkComplete={markLessonComplete}
            completedLessons={completedLessons}
          />
        );
      
      case 'quiz':
        return (
          <QuizPage 
            course={selectedCourse}
            onBack={() => setCurrentScreen('courseDetails')}
            onComplete={(score) => {
              // Handle quiz completion
              setCurrentScreen('courseDetails');
            }}
          />
        );
      
      case 'professor':
        return (
          <ProfessorView 
            course={selectedCourse}
            onBack={() => setCurrentScreen('courseDetails')}
            onNavigate={navigateToScreen}
          />
        );
      
      case 'achievements':
        return (
          <AchievementsPage 
            user={user} 
            onBack={() => {
              setCurrentScreen('dashboard');
              setActiveTab('dashboard');
            }}
            onNavigate={navigateToScreen}
            completedLessons={completedLessons}
          />
        );
      
      case 'profile':
        return (
          <ProfilePage 
            user={user} 
            onBack={() => {
              setCurrentScreen('dashboard');
              setActiveTab('dashboard');
            }}
            onNavigate={navigateToScreen}
            onLogout={handleLogout}
          />
        );
      
      case 'search':
        return (
          <SearchPage 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onBack={() => {
              // Go back to previous screen
              if (currentScreen === 'search') {
                setCurrentScreen('dashboard');
                setActiveTab('dashboard');
              }
            }}
            onNavigate={navigateToScreen}
          />
        );
      
      case 'challenges':
        return (
          <ChallengesPage 
            user={user}
            onBack={() => {
              setCurrentScreen('dashboard');
              setActiveTab('dashboard');
            }}
            onNavigate={navigateToScreen}
          />
        );
      
      case 'contests':
        return (
          <ContestsPage 
            user={user}
            onBack={() => {
              setCurrentScreen('dashboard');
              setActiveTab('dashboard');
            }}
            onNavigate={navigateToScreen}
          />
        );
      
      case 'continueWatching':
        return (
          <ContinueWatchingPage 
            videoProgress={videoProgress}
            onBack={() => setCurrentScreen('dashboard')}
            onNavigate={navigateToScreen}
          />
        );
      
      case 'settings':
        return (
          <SettingsPage 
            user={user}
            onBack={() => setCurrentScreen('profile')}
            onLogout={handleLogout}
            onNavigate={navigateToScreen}
            isDarkMode={isDarkMode}
            onToggleDarkMode={toggleDarkMode}
          />
        );

      case 'preferences':
        return (
          <PreferencesPage 
            user={user}
            onBack={() => setCurrentScreen('settings')}
            onNavigate={navigateToScreen}
            isDarkMode={isDarkMode}
            onToggleDarkMode={toggleDarkMode}
          />
        );

      case 'notifications':
        return (
          <NotificationsPage 
            user={user}
            onBack={() => setCurrentScreen('settings')}
            onNavigate={navigateToScreen}
          />
        );

      case 'learning':
        return (
          <LearningPage 
            user={user}
            onBack={() => setCurrentScreen('settings')}
            onNavigate={navigateToScreen}
          />
        );

      case 'supportLegal':
        return (
          <SupportLegalPage 
            user={user}
            onBack={() => setCurrentScreen('settings')}
            onNavigate={navigateToScreen}
          />
        );
      
      case 'orderHistory':
        return (
          <OrderHistoryPage 
            user={user}
            onBack={() => setCurrentScreen('profile')}
            onNavigate={navigateToScreen}
          />
        );
      
      case 'accountManagement':
        return (
          <AccountManagementPage 
            user={user}
            onBack={() => setCurrentScreen('profile')}
            onNavigate={navigateToScreen}
          />
        );
      
      case 'support':
        return (
          <SupportPage 
            user={user}
            onBack={() => setCurrentScreen('profile')}
            onNavigate={navigateToScreen}
          />
        );
      
      case 'logoutConfirm':
        return (
          <LogoutConfirmPage 
            onBack={() => setCurrentScreen('profile')}
            onConfirm={handleLogout}
          />
        );
      
      case 'pricingPlans':
        return (
          <PricingPlansPage 
            selectedCourse={selectedCourse}
            onBack={() => setCurrentScreen('courseDetails')}
            onNavigate={navigateToScreen}
          />
        );
      
      case 'payment':
        return (
          <PaymentPage 
            course={selectedCourse}
            onBack={() => setCurrentScreen('pricingPlans')}
            onNavigate={navigateToScreen}
            onPaymentComplete={() => {
              // On successful payment, redirect to course
              setCurrentScreen('courseDetails');
            }}
          />
        );
      
      case 'dailyChallengeDetail':
        return (
          <DailyChallengeDetailPage 
            challenge={selectedCourse}
            onBack={() => setCurrentScreen('contests')}
            onNavigate={navigateToScreen}
          />
        );
      
      case 'weeklyChallengeDetail':
        return (
          <DailyChallengeDetailPage 
            challenge={selectedCourse}
            onBack={() => setCurrentScreen('contests')}
            onNavigate={navigateToScreen}
          />
        );
      
      case 'contestRegistration':
        return (
          <RegistrationPage 
            challenge={selectedCourse}
            onBack={() => setCurrentScreen('contests')}
            onNavigate={navigateToScreen}
          />
        );
      
      case 'placementPractice':
        return (
          <ContinuePracticePage 
            challenge={selectedCourse}
            onBack={() => setCurrentScreen('contests')}
            onNavigate={navigateToScreen}
          />
        );
      
      case 'fullLeaderboard':
        return (
          <FullLeaderboardPage 
            onBack={() => setCurrentScreen('contests')}
            onNavigate={navigateToScreen}
          />
        );
      
      case 'joinChallenge':
        return (
          <JoinChallengePage 
            challenge={selectedCourse}
            onBack={() => setCurrentScreen('contests')}
            onNavigate={navigateToScreen}
          />
        );
      
      case 'continuePractice':
        return (
          <ContinuePracticePage 
            challenge={selectedCourse}
            onBack={() => setCurrentScreen('contests')}
            onNavigate={navigateToScreen}
          />
        );
      
      case 'achievementDetail':
        return (
          <AchievementDetailPage 
            achievement={selectedCourse}
            onBack={() => setCurrentScreen('achievements')}
            onNavigate={navigateToScreen}
          />
        );
      
      default:
        return <SignInPage onSignIn={handleSignIn} onNavigate={navigateToScreen} />;
    }
  };

  return (
    <div className={`full-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen w-full bg-background text-foreground">
        {/* Full screen container */}
        <div className="container-responsive">
          {renderScreen()}
        </div>
      </div>
      {showBottomNav && (
        <BottomNavigation 
          activeTab={activeTab} 
          onTabChange={handleTabChange} 
        />
      )}
    </div>
  );
}