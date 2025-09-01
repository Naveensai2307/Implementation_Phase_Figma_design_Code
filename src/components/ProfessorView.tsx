import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft, Play, Pause, Star, Users, BookOpen, Award, MessageCircle, Volume2, Settings, Maximize, ChevronRight, Mic } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function ProfessorView({ course, onBack, onNavigate }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(2580); // 43 minutes in seconds
  const [showControls, setShowControls] = useState(true);
  const [volume, setVolume] = useState(80);

  // Auto-start when coming from continue watching
  useEffect(() => {
    setIsPlaying(true);
  }, []);

  // Video simulation
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => Math.min(prev + 1, duration));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  // Hide controls after inactivity
  useEffect(() => {
    let hideTimeout;
    if (isPlaying) {
      hideTimeout = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    } else {
      setShowControls(true);
    }
    return () => clearTimeout(hideTimeout);
  }, [isPlaying, currentTime]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    return (currentTime / duration) * 100;
  };

  const professorInfo = {
    name: course?.instructor || "Dr. Sarah Chen",
    title: "Senior Software Engineer at Google",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b829?w=150&h=150&fit=crop&crop=face",
    topic: "Advanced React Patterns and Performance Optimization",
    lessonTitle: course?.title || "Building Scalable React Applications"
  };

  return (
    <div className="full-screen bg-black text-white">
      {/* Immersive Video Player */}
      <div 
        className="relative w-full h-full cursor-pointer"
        onClick={() => setShowControls(true)}
        onMouseMove={() => setShowControls(true)}
      >
        {/* Professor Video Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
          {/* Simulated professor video */}
          <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
            {/* Professor Avatar - Large */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-96 h-96 rounded-full overflow-hidden border-8 border-white/20 shadow-2xl">
                <ImageWithFallback
                  src={professorInfo.avatar}
                  alt={professorInfo.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Animated Speaking Indicator */}
            {isPlaying && (
              <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2">
                  <Mic className="w-4 h-4 text-green-400" />
                  <div className="flex gap-1">
                    <div className="w-1 h-4 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="w-1 h-6 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-1 h-3 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-1 h-5 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                  </div>
                  <span className="text-sm text-white/80">Speaking...</span>
                </div>
              </div>
            )}

            {/* Floating Topic Cards */}
            <div className="absolute top-20 left-8 bg-white/10 backdrop-blur-md rounded-2xl p-6 max-w-md">
              <h3 className="text-xl font-semibold mb-2">{professorInfo.topic}</h3>
              <p className="text-white/80 text-sm">Learn advanced techniques for building high-performance React applications with real-world examples.</p>
            </div>

            {/* Live Indicator */}
            <div className="absolute top-8 right-8 flex items-center gap-2 bg-red-500 rounded-full px-4 py-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">LIVE</span>
            </div>
          </div>
        </div>

        {/* Video Controls Overlay */}
        {showControls && (
          <div className="absolute inset-0 bg-black/20">
            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/50 to-transparent p-6">
              <div className="flex items-center justify-between">
                <button 
                  onClick={onBack}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 hover:bg-white/20 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-sm">Back</span>
                </button>

                <div className="text-center">
                  <h1 className="text-xl font-semibold">{professorInfo.name}</h1>
                  <p className="text-sm text-white/80">{professorInfo.title}</p>
                </div>

                <div className="flex items-center gap-3">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white"
                    onClick={() => alert('Chat with professor feature coming soon!')}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat
                  </Button>
                </div>
              </div>
            </div>

            {/* Center Play/Pause Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all hover:scale-110"
              >
                {isPlaying ? (
                  <Pause className="w-10 h-10" />
                ) : (
                  <Play className="w-10 h-10 ml-1" />
                )}
              </button>
            </div>

            {/* Bottom Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="w-full bg-white/20 rounded-full h-2 cursor-pointer">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300 relative"
                    style={{ width: `${getProgressPercentage()}%` }}
                  >
                    <div className="w-4 h-4 bg-white rounded-full absolute right-0 top-1/2 -translate-y-1/2 shadow-lg"></div>
                  </div>
                </div>
              </div>
              
              {/* Control Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6" />
                    ) : (
                      <Play className="w-6 h-6 ml-0.5" />
                    )}
                  </button>
                  
                  <div className="flex items-center gap-3">
                    <Volume2 className="w-5 h-5" />
                    <div className="w-20 bg-white/20 rounded-full h-2">
                      <div 
                        className="bg-white h-2 rounded-full"
                        style={{ width: `${volume}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="text-sm">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all">
                    <Settings className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all">
                    <Maximize className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Lesson Information */}
              <div className="mt-6 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{professorInfo.lessonTitle}</h3>
                  <p className="text-white/80 text-sm">Chapter 3: Component Optimization Techniques</p>
                </div>
                <div className="flex items-center gap-4">
                  <Button 
                    variant="outline"
                    className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20"
                    onClick={() => onNavigate('courseDetails', course)}
                  >
                    Course Details
                  </Button>
                  <Button 
                    className="bg-blue-500 hover:bg-blue-600"
                    onClick={() => alert('Taking notes...')}
                  >
                    Take Notes
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Subtitle/Caption Area */}
        {isPlaying && (
          <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 max-w-4xl w-full px-6">
            <div className="bg-black/50 backdrop-blur-md rounded-lg p-4 text-center">
              <p className="text-lg leading-relaxed">
                "So when we optimize React components, we need to consider the rendering lifecycle. 
                Let me show you how useMemo and useCallback can dramatically improve performance..."
              </p>
            </div>
          </div>
        )}

        {/* Professor Info Card - Slides in occasionally */}
        <div className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-md rounded-2xl p-4 max-w-xs">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <ImageWithFallback
                src={professorInfo.avatar}
                alt={professorInfo.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 className="font-semibold text-sm">{professorInfo.name}</h4>
              <p className="text-xs text-white/80">{professorInfo.title}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-400" />
              <span>4.9</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3 text-blue-400" />
              <span>125k</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="w-3 h-3 text-green-400" />
              <span>12 courses</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}