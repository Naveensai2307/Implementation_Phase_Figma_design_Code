import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { ArrowLeft, Search, Play, Check, Pause, SkipForward, SkipBack, Settings, Volume2, Maximize, ChevronRight, X, PenTool, MessageSquare, Minimize, VolumeX, Subtitles, Send, BookmarkPlus, Download } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { getCourseById } from '../data/coursesData';

export function LessonPage({ course, onBack, onNavigate, videoProgress, onUpdateProgress, onMarkComplete, completedLessons }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentLessonId, setCurrentLessonId] = useState(1);
  const [autoplay, setAutoplay] = useState(true);
  const [showNextCoursePopup, setShowNextCoursePopup] = useState(false);
  const [nextCourseCountdown, setNextCourseCountdown] = useState(10);
  const [showControls, setShowControls] = useState(true);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showCaptions, setShowCaptions] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState('1x');
  const [videoQuality, setVideoQuality] = useState('1080p');
  const [notes, setNotes] = useState('');
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [savedNotes, setSavedNotes] = useState([]);
  const videoContainerRef = useRef(null);
  const lastVolumeRef = useRef(volume);
  
  const courseId = course?.id || 1;
  const lessonKey = `${courseId}-${currentLessonId}`;
  const progress = videoProgress?.[lessonKey];

  // Load saved data for this lesson
  useEffect(() => {
    const savedNotesKey = `growify-notes-${courseId}-${currentLessonId}`;
    const savedLessonNotes = localStorage.getItem(savedNotesKey);
    if (savedLessonNotes) {
      const parsedNotes = JSON.parse(savedLessonNotes);
      setSavedNotes(parsedNotes);
    }

    // Load chat messages (mock data for demo)
    const mockChatMessages = [
      { id: 1, user: 'Alex Chen', message: 'Great explanation of the concept!', time: '2 min ago', avatar: '👨‍💻' },
      { id: 2, user: 'Sarah Wilson', message: 'Can someone explain the last part again?', time: '5 min ago', avatar: '👩‍🎓' },
      { id: 3, user: 'Mike Rodriguez', message: 'This helps clarify the fundamentals', time: '8 min ago', avatar: '👨‍🔬' },
      { id: 4, user: 'Emma Davis', message: 'Thanks for the detailed walkthrough!', time: '12 min ago', avatar: '👩‍💼' }
    ];
    setChatMessages(mockChatMessages);
  }, [courseId, currentLessonId]);

  // Get current lesson from course lessons array
  const allLessons = course?.lessons || [];
  const currentLessonIndex = allLessons.findIndex(l => l.id === currentLessonId);
  const currentLesson = allLessons[currentLessonIndex] || allLessons[0];
  const isLastLesson = currentLessonIndex === allLessons.length - 1;
  const isFirstLesson = currentLessonIndex === 0;

  // Initialize with first lesson if currentLessonId doesn't exist
  useEffect(() => {
    if (allLessons.length > 0 && currentLessonIndex === -1) {
      setCurrentLessonId(allLessons[0].id);
    }
  }, [course, allLessons]);

  // Parse duration string to seconds - STRICTLY match lesson duration
  const parseDuration = (durationStr) => {
    if (!durationStr) return 600; // Default 10 minutes
    const parts = durationStr.split(':').map(part => part.trim());
    
    if (parts.length === 2) {
      // Format: "MM:SS"
      const minutes = parseInt(parts[0]) || 0;
      const seconds = parseInt(parts[1]) || 0;
      return minutes * 60 + seconds;
    } else if (parts.length === 3) {
      // Format: "HH:MM:SS"
      const hours = parseInt(parts[0]) || 0;
      const minutes = parseInt(parts[1]) || 0;
      const seconds = parseInt(parts[2]) || 0;
      return hours * 3600 + minutes * 60 + seconds;
    }
    
    // Fallback - try to parse as total minutes
    const totalMinutes = parseInt(durationStr) || 10;
    return totalMinutes * 60;
  };

  // Initialize video with saved progress - STRICT duration matching
  useEffect(() => {
    if (currentLesson) {
      // ALWAYS use the exact lesson duration, no exceptions
      const exactDuration = parseDuration(currentLesson.duration);
      setDuration(exactDuration);
      
      if (progress && progress.duration === exactDuration) {
        // Only restore progress if duration matches exactly
        setCurrentTime(progress.currentTime);
      } else {
        // Reset progress if duration doesn't match
        setCurrentTime(0);
      }
    }
  }, [currentLessonId, currentLesson, progress]);

  // Get course icon based on category
  const getCourseIcon = () => {
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
    return iconMap[course?.category] || '📚';
  };

  // Get course color scheme
  const getCourseColors = () => {
    const colorMap = {
      'Programming': { from: 'from-blue-600', to: 'to-indigo-700', accent: 'bg-blue-500' },
      'Frontend': { from: 'from-green-600', to: 'to-emerald-700', accent: 'bg-green-500' },
      'Backend': { from: 'from-purple-600', to: 'to-violet-700', accent: 'bg-purple-500' },
      'Data Science': { from: 'from-indigo-600', to: 'to-blue-700', accent: 'bg-indigo-500' },
      'AI/ML': { from: 'from-red-600', to: 'to-pink-700', accent: 'bg-red-500' },
      'Design': { from: 'from-pink-600', to: 'to-rose-700', accent: 'bg-pink-500' },
      'Cybersecurity': { from: 'from-orange-600', to: 'to-red-700', accent: 'bg-orange-500' },
      'Database': { from: 'from-yellow-600', to: 'to-orange-700', accent: 'bg-yellow-500' },
      'Computer Networks': { from: 'from-teal-600', to: 'to-cyan-700', accent: 'bg-teal-500' },
      'Web Development': { from: 'from-emerald-600', to: 'to-green-700', accent: 'bg-emerald-500' },
      'Cloud Computing': { from: 'from-sky-600', to: 'to-blue-700', accent: 'bg-sky-500' },
      'DevOps': { from: 'from-violet-600', to: 'to-purple-700', accent: 'bg-violet-500' },
      'Mobile Development': { from: 'from-rose-600', to: 'to-pink-700', accent: 'bg-rose-500' },
      'CRM': { from: 'from-cyan-600', to: 'to-teal-700', accent: 'bg-cyan-500' }
    };
    return colorMap[course?.category] || { from: 'from-blue-600', to: 'to-purple-700', accent: 'bg-blue-500' };
  };

  // Generate comprehensive educational animation content for each topic
  const getVideoContent = () => {
    const colors = getCourseColors();
    const progressPercentage = getProgressPercentage();
    const timeSegment = Math.floor(currentTime / 15); // New educational content every 15 seconds
    const animationPhase = Math.floor(currentTime / 5) % 4; // Animation cycles every 5 seconds
    
    // Comprehensive educational content for each course category
    const educationalContent = {
      'Programming': {
        animations: [
          { phase: 0, title: "Algorithm Fundamentals", content: "Understanding step-by-step problem solving", visual: "🔄" },
          { phase: 1, title: "Data Structures", content: "Arrays, Objects, and Memory Management", visual: "📊" },
          { phase: 2, title: "Control Flow", content: "Loops, Conditions, and Logic Branches", visual: "🔀" },
          { phase: 3, title: "Functions & Scope", content: "Modular Code and Variable Accessibility", visual: "⚡" }
        ],
        codeExamples: [
          "function calculateSum(a, b) {",
          "  return a + b;",
          "}",
          "// Clean, readable code"
        ],
        concepts: ["Variables", "Functions", "Loops", "Objects", "Arrays", "Classes"]
      },
      'Data Science': {
        animations: [
          { phase: 0, title: "Data Collection", content: "Gathering and cleaning raw datasets", visual: "📈" },
          { phase: 1, title: "Statistical Analysis", content: "Finding patterns and correlations", visual: "📊" },
          { phase: 2, title: "Visualization", content: "Creating meaningful charts and graphs", visual: "📉" },
          { phase: 3, title: "Model Building", content: "Predictive algorithms and validation", visual: "🎯" }
        ],
        codeExamples: [
          "import pandas as pd",
          "df = pd.read_csv('data.csv')",
          "analysis = df.describe()",
          "model.fit(X_train, y_train)"
        ],
        concepts: ["Pandas", "NumPy", "Statistics", "Machine Learning", "Visualization", "SQL"]
      },
      'AI/ML': {
        animations: [
          { phase: 0, title: "Neural Networks", content: "Layers, neurons, and activation functions", visual: "🧠" },
          { phase: 1, title: "Training Process", content: "Forward pass, backpropagation, optimization", visual: "🎯" },
          { phase: 2, title: "Model Evaluation", content: "Accuracy, precision, recall metrics", visual: "📊" },
          { phase: 3, title: "Deployment", content: "Production models and real-world usage", visual: "🚀" }
        ],
        codeExamples: [
          "model = tf.keras.Sequential([",
          "  tf.keras.layers.Dense(128, activation='relu'),",
          "  tf.keras.layers.Dense(10, activation='softmax')",
          "])"
        ],
        concepts: ["TensorFlow", "Neural Networks", "Deep Learning", "NLP", "Computer Vision", "MLOps"]
      },
      'Frontend': {
        animations: [
          { phase: 0, title: "HTML Structure", content: "Semantic markup and accessibility", visual: "🏗️" },
          { phase: 1, title: "CSS Styling", content: "Layout, colors, and responsive design", visual: "🎨" },
          { phase: 2, title: "JavaScript Interaction", content: "Dynamic behavior and user events", visual: "⚡" },
          { phase: 3, title: "Framework Integration", content: "React, Vue, Angular components", visual: "⚛️" }
        ],
        codeExamples: [
          "<div className='container'>",
          "  <h1>Welcome</h1>",
          "  <button onClick={handleClick}>",
          "    Click me",
          "  </button>",
          "</div>"
        ],
        concepts: ["HTML5", "CSS3", "JavaScript", "React", "Responsive Design", "Accessibility"]
      },
      'Backend': {
        animations: [
          { phase: 0, title: "Server Architecture", content: "HTTP requests, routing, and APIs", visual: "🖥️" },
          { phase: 1, title: "Database Design", content: "Schema, queries, and relationships", visual: "🗄️" },
          { phase: 2, title: "Authentication", content: "User security and session management", visual: "🔐" },
          { phase: 3, title: "Scalability", content: "Load balancing and performance optimization", visual: "📈" }
        ],
        codeExamples: [
          "app.get('/api/users', async (req, res) => {",
          "  const users = await User.findAll();",
          "  res.json(users);",
          "});"
        ],
        concepts: ["Node.js", "Express", "Databases", "APIs", "Authentication", "Security"]
      },
      'Design': {
        animations: [
          { phase: 0, title: "Design Principles", content: "Balance, contrast, hierarchy, and unity", visual: "🎨" },
          { phase: 1, title: "Color Theory", content: "Palettes, psychology, and accessibility", visual: "🌈" },
          { phase: 2, title: "Typography", content: "Fonts, spacing, and readability", visual: "📝" },
          { phase: 3, title: "User Experience", content: "Journey mapping and interaction design", visual: "👤" }
        ],
        codeExamples: [
          "/* Design System */",
          ":root {",
          "  --primary-color: #007bff;",
          "  --spacing-unit: 8px;",
          "}"
        ],
        concepts: ["UI/UX", "Figma", "Adobe Creative Suite", "Prototyping", "User Research", "Design Systems"]
      },
      'Cybersecurity': {
        animations: [
          { phase: 0, title: "Threat Assessment", content: "Identifying vulnerabilities and risks", visual: "🔍" },
          { phase: 1, title: "Network Security", content: "Firewalls, encryption, and protocols", visual: "🛡️" },
          { phase: 2, title: "Incident Response", content: "Detection, containment, and recovery", visual: "🚨" },
          { phase: 3, title: "Compliance", content: "Standards, audits, and best practices", visual: "✅" }
        ],
        codeExamples: [
          "# Security scan",
          "nmap -sS -O target_ip",
          "# Check for vulnerabilities",
          "nikto -h target_url"
        ],
        concepts: ["Network Security", "Penetration Testing", "Encryption", "Compliance", "Risk Management", "Forensics"]
      }
    };

    const categoryContent = educationalContent[course?.category] || educationalContent['Programming'];
    const currentAnimation = categoryContent.animations[animationPhase] || categoryContent.animations[0];
    const currentCodeExample = categoryContent.codeExamples[timeSegment % categoryContent.codeExamples.length];
    const currentConcept = categoryContent.concepts[timeSegment % categoryContent.concepts.length];
    
    return {
      colors,
      currentAnimation,
      currentCodeExample,
      currentConcept,
      allConcepts: categoryContent.concepts,
      progressPercentage,
      timeSegment,
      animationPhase
    };
  };

  // Video time update simulation - STRICT timing
  useEffect(() => {
    let interval;
    if (isPlaying && duration > 0) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          // STRICT: Never exceed the exact lesson duration
          const newTime = Math.min(prev + 1, duration);
          
          // Auto-save progress every 5 seconds
          if (Math.floor(newTime) % 5 === 0 && onUpdateProgress) {
            onUpdateProgress(courseId, currentLessonId, newTime, duration);
          }
          
          // Mark as complete when 95% watched
          if (newTime / duration >= 0.95 && onMarkComplete && !isLessonCompleted()) {
            onMarkComplete(courseId, currentLessonId);
          }
          
          // Auto-advance to next lesson when current lesson ends EXACTLY
          if (newTime >= duration && autoplay) {
            handleAutoAdvance();
          }
          
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration, currentLessonId, autoplay]);

  // Next course countdown
  useEffect(() => {
    let countdownInterval;
    if (showNextCoursePopup && nextCourseCountdown > 0) {
      countdownInterval = setInterval(() => {
        setNextCourseCountdown(prev => prev - 1);
      }, 1000);
    } else if (showNextCoursePopup && nextCourseCountdown === 0) {
      // Auto-start next course
      handleStartNextCourse();
    }
    return () => clearInterval(countdownInterval);
  }, [showNextCoursePopup, nextCourseCountdown]);

  // Hide controls after 3 seconds of inactivity
  useEffect(() => {
    let hideControlsTimeout;
    if (isPlaying) {
      hideControlsTimeout = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    } else {
      setShowControls(true);
    }
    return () => clearTimeout(hideControlsTimeout);
  }, [isPlaying, currentTime]);

  // Keyboard shortcuts for lesson navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Only handle if not typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }
      
      switch (e.key) {
        case ' ':
          e.preventDefault();
          handlePlayPause();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          if (e.shiftKey && !isFirstLesson) {
            handlePreviousLesson();
          } else {
            // Skip back 10 seconds
            const newTime = Math.max(currentTime - 10, 0);
            setCurrentTime(newTime);
          }
          break;
        case 'ArrowRight':
          e.preventDefault();
          if (e.shiftKey && !isLastLesson) {
            handleNextLesson();
          } else {
            // Skip forward 10 seconds
            const newTime = Math.min(currentTime + 10, duration);
            setCurrentTime(newTime);
          }
          break;
        case 'n':
        case 'N':
          e.preventDefault();
          if (!isLastLesson) {
            handleNextLesson();
          }
          break;
        case 'p':
        case 'P':
          e.preventDefault();
          if (!isFirstLesson) {
            handlePreviousLesson();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying, currentTime, duration, isFirstLesson, isLastLesson]);

  // Full screen functionality
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      if (videoContainerRef.current?.requestFullscreen) {
        videoContainerRef.current.requestFullscreen();
        setIsFullScreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullScreenChange);
  }, []);

  // Volume and mute handlers
  const handleVolumeChange = (newVolume) => {
    if (newVolume[0] === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
      lastVolumeRef.current = newVolume[0];
    }
    setVolume(newVolume[0]);
  };

  const toggleMute = () => {
    if (isMuted || volume === 0) {
      setVolume(lastVolumeRef.current || 50);
      setIsMuted(false);
    } else {
      lastVolumeRef.current = volume;
      setVolume(0);
      setIsMuted(true);
    }
  };

  // Notes functionality
  const saveNote = () => {
    if (notes.trim()) {
      const newNote = {
        id: Date.now(),
        content: notes,
        timestamp: formatTime(currentTime),
        timeInSeconds: currentTime,
        createdAt: new Date().toISOString()
      };
      
      const updatedNotes = [...savedNotes, newNote];
      setSavedNotes(updatedNotes);
      
      // Save to localStorage
      const savedNotesKey = `growify-notes-${courseId}-${currentLessonId}`;
      localStorage.setItem(savedNotesKey, JSON.stringify(updatedNotes));
      
      setNotes('');
    }
  };

  const deleteNote = (noteId) => {
    const updatedNotes = savedNotes.filter(note => note.id !== noteId);
    setSavedNotes(updatedNotes);
    
    const savedNotesKey = `growify-notes-${courseId}-${currentLessonId}`;
    localStorage.setItem(savedNotesKey, JSON.stringify(updatedNotes));
  };

  const jumpToNoteTimestamp = (timeInSeconds) => {
    setCurrentTime(timeInSeconds);
    if (onUpdateProgress) {
      onUpdateProgress(courseId, currentLessonId, timeInSeconds, duration);
    }
  };

  // Chat functionality
  const sendChatMessage = () => {
    if (chatMessage.trim()) {
      const newMessage = {
        id: Date.now(),
        user: 'You',
        message: chatMessage,
        time: 'Just now',
        avatar: '👤',
        isOwn: true
      };
      
      setChatMessages(prev => [newMessage, ...prev]);
      setChatMessage('');
    }
  };

  // Enhanced educational captions with topic-specific content
  const getCurrentCaption = () => {
    if (!showCaptions) return '';
    
    const captionTime = Math.floor(currentTime / 10) * 10;
    const videoContent = getVideoContent();
    const categorySpecificCaptions = {
      'Programming': {
        0: `Welcome to ${currentLesson?.title} - Let's explore programming fundamentals`,
        10: "Understanding algorithms: the step-by-step approach to problem solving",
        20: `In ${course?.category}, we build logical solutions using code structures`,
        30: "Notice how variables store data and functions process information",
        40: "This concept applies to real-world software development projects",
        50: "Let's examine a practical coding example to reinforce learning",
        60: "This connects to object-oriented programming principles we'll cover next"
      },
      'Data Science': {
        0: `Welcome to ${currentLesson?.title} - Diving into data analysis`,
        10: "Data collection and cleaning: the foundation of all data science projects",
        20: `In ${course?.category}, we transform raw data into actionable insights`,
        30: "Statistical analysis reveals patterns hidden in complex datasets",
        40: "These techniques apply to business intelligence and machine learning",
        50: "Here's how pandas and NumPy streamline data manipulation",
        60: "This analysis method connects to predictive modeling techniques"
      },
      'AI/ML': {
        0: `Welcome to ${currentLesson?.title} - Exploring artificial intelligence`,
        10: "Neural networks: mimicking the human brain's learning process",
        20: `In ${course?.category}, we train machines to recognize patterns`,
        30: "Watch how backpropagation optimizes neural network performance",
        40: "These algorithms power modern AI applications like ChatGPT",
        50: "TensorFlow and PyTorch make implementing these models accessible",
        60: "This foundation leads to advanced deep learning architectures"
      },
      'Frontend': {
        0: `Welcome to ${currentLesson?.title} - Building user interfaces`,
        10: "HTML provides semantic structure for accessible web content",
        20: `In ${course?.category}, we create engaging user experiences`,
        30: "CSS transforms basic markup into visually appealing designs",
        40: "JavaScript adds interactivity and dynamic behavior to websites",
        50: "React components make building complex UIs more manageable",
        60: "This approach scales to large, maintainable web applications"
      },
      'Backend': {
        0: `Welcome to ${currentLesson?.title} - Server-side development`,
        10: "Server architecture: handling requests and managing data flow",
        20: `In ${course?.category}, we build the backbone of web applications`,
        30: "Database design ensures efficient data storage and retrieval",
        40: "Authentication systems protect user data and application security",
        50: "APIs enable communication between different system components",
        60: "Scalability patterns handle growing user bases and data volumes"
      },
      'Design': {
        0: `Welcome to ${currentLesson?.title} - Principles of effective design`,
        10: "Visual hierarchy guides users through content naturally",
        20: `In ${course?.category}, we balance aesthetics with usability`,
        30: "Color theory influences emotion and brand perception",
        40: "Typography affects readability and user experience",
        50: "User research informs design decisions with real data",
        60: "Design systems ensure consistency across all touchpoints"
      },
      'Cybersecurity': {
        0: `Welcome to ${currentLesson?.title} - Protecting digital assets`,
        10: "Threat assessment: identifying vulnerabilities before attackers do",
        20: `In ${course?.category}, we build robust security frameworks`,
        30: "Network security layers protect against various attack vectors",
        40: "Incident response procedures minimize damage and restore operations",
        50: "Penetration testing validates security measure effectiveness",
        60: "Compliance frameworks ensure regulatory and industry standards"
      }
    };

    const categoryCaptions = categorySpecificCaptions[course?.category] || categorySpecificCaptions['Programming'];
    return categoryCaptions[captionTime] || `Learning ${videoContent.currentAnimation.title}: ${videoContent.currentAnimation.content}`;
  };

  const isLessonCompleted = () => {
    return completedLessons?.includes(`${courseId}-${currentLessonId}`) || false;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    setShowControls(true);
    
    // Save progress when pausing
    if (isPlaying && onUpdateProgress) {
      onUpdateProgress(courseId, currentLessonId, currentTime, duration);
    }
  };

  const handleSeek = (percentage) => {
    // STRICT: Only allow seeking within exact lesson duration
    const newTime = Math.min((percentage / 100) * duration, duration);
    setCurrentTime(newTime);
    if (onUpdateProgress) {
      onUpdateProgress(courseId, currentLessonId, newTime, duration);
    }
  };

  const handlePreviousLesson = () => {
    if (!isFirstLesson && allLessons.length > 0) {
      const prevLesson = allLessons[currentLessonIndex - 1];
      setCurrentLessonId(prevLesson.id);
      setCurrentTime(0);
      setIsPlaying(false);
    }
  };

  const handleNextLesson = () => {
    if (!isLastLesson && allLessons.length > 0) {
      const nextLesson = allLessons[currentLessonIndex + 1];
      setCurrentLessonId(nextLesson.id);
      setCurrentTime(0);
      setIsPlaying(autoplay);
    }
  };

  const handleCompleteLesson = () => {
    // Jump to exact end of video
    setCurrentTime(duration);
    setIsPlaying(false);
    
    // Mark lesson as complete
    if (onMarkComplete) {
      onMarkComplete(courseId, currentLessonId);
    }
    
    // Auto-advance if autoplay is enabled
    if (autoplay && !isLastLesson) {
      setTimeout(() => {
        handleNextLesson();
      }, 1500);
    } else if (isLastLesson) {
      // Show next course popup
      setShowNextCoursePopup(true);
      setNextCourseCountdown(10);
    }
  };

  const handleAutoAdvance = () => {
    setIsPlaying(false);
    
    if (!isLastLesson) {
      // Auto-advance to next lesson
      setTimeout(() => {
        handleNextLesson();
      }, 2000);
    } else {
      // Show next course popup
      setShowNextCoursePopup(true);
      setNextCourseCountdown(10);
    }
  };

  const handleStartNextCourse = () => {
    setShowNextCoursePopup(false);
    // Get a recommended next course (for demo, just go to next course)
    const nextCourse = getCourseById(course.id === 20 ? 1 : course.id + 1);
    if (nextCourse) {
      onNavigate('courseDetails', nextCourse);
    } else {
      onNavigate('courses');
    }
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    return duration > 0 ? (currentTime / duration) * 100 : 0;
  };

  if (!course || !currentLesson) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Lesson not found</h2>
          <Button onClick={onBack}>Go Back</Button>
        </div>
      </div>
    );
  }

  const videoContent = getVideoContent();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-responsive bg-white min-h-screen pb-20">
        {/* Header */}
        <div className="flex items-center justify-between p-4 lg:p-6 border-b border-gray-100">
          <button onClick={onBack} className="hover:bg-gray-100 p-2 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="text-center">
            <h1 className="text-lg font-semibold">{currentLesson.title}</h1>
            <p className="text-xs text-gray-500">
              {course.title} • Lesson {currentLessonIndex + 1} of {allLessons.length} • {formatTime(duration)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {/* Autoplay Toggle */}
            <button
              onClick={() => setAutoplay(!autoplay)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                autoplay 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              Autoplay: {autoplay ? 'ON' : 'OFF'}
            </button>
            <button 
              className="hover:bg-gray-100 p-2 rounded-lg transition-colors"
              onClick={() => onNavigate('search')}
            >
              <Search className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className={`lg:grid lg:gap-6 ${showChat ? 'lg:grid-cols-5' : showNotes ? 'lg:grid-cols-5' : 'lg:grid-cols-4'}`}>
          {/* Video Player */}
          <div className={`${showChat || showNotes ? 'lg:col-span-3' : 'lg:col-span-3'}`}>
            <div 
              ref={videoContainerRef}
              className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 relative cursor-pointer"
              onClick={() => setShowControls(true)}
              onMouseMove={() => setShowControls(true)}
            >
              {/* Enhanced Educational Video Content */}
              {isPlaying ? (
                <div className={`w-full h-full bg-gradient-to-br ${videoContent.colors.from} ${videoContent.colors.to} flex items-center justify-center relative overflow-hidden`}>
                  {/* Advanced Animated Background Elements */}
                  <div className="absolute inset-0 opacity-15">
                    {/* Floating concept bubbles */}
                    {videoContent.allConcepts.map((concept, index) => (
                      <div
                        key={index}
                        className={`absolute w-16 h-16 bg-white rounded-full flex items-center justify-center text-xs font-medium text-gray-800 animate-pulse`}
                        style={{
                          top: `${20 + (index * 15) % 60}%`,
                          left: `${10 + (index * 20) % 80}%`,
                          animationDelay: `${index * 500}ms`,
                          animationDuration: '3s'
                        }}
                      >
                        {concept.substring(0, 4)}
                      </div>
                    ))}
                    
                    {/* Moving code particles */}
                    <div className="absolute top-0 left-0 w-full h-full">
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-2 h-2 bg-white rounded-full opacity-30"
                          style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
                            animationDelay: `${Math.random() * 2}s`
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-center text-white z-10 relative max-w-4xl mx-auto px-4">
                    {/* Main Educational Animation Section */}
                    <div className="mb-8">
                      <div className="text-6xl lg:text-8xl mb-6 animate-bounce-gentle">
                        {videoContent.currentAnimation.visual}
                      </div>
                      <h3 className="text-2xl lg:text-4xl font-bold mb-4">{videoContent.currentAnimation.title}</h3>
                      <p className="text-lg lg:text-xl text-white/90 mb-6">{videoContent.currentAnimation.content}</p>
                    </div>
                    
                    {/* Interactive Learning Panel */}
                    <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 mb-6 mx-auto max-w-2xl">
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Code Example Section */}
                        <div className="bg-black/40 rounded-xl p-4">
                          <h4 className="text-sm font-medium mb-3 text-green-300">💻 Code Example</h4>
                          <div className="font-mono text-left text-sm space-y-1">
                            {videoContent.currentCodeExample}
                          </div>
                        </div>
                        
                        {/* Concept Focus */}
                        <div className="bg-black/40 rounded-xl p-4">
                          <h4 className="text-sm font-medium mb-3 text-blue-300">🎯 Current Focus</h4>
                          <div className="text-xl font-bold text-yellow-300 mb-2">
                            {videoContent.currentConcept}
                          </div>
                          <div className="text-sm text-white/70">
                            Lesson {currentLessonIndex + 1}: {currentLesson.title}
                          </div>
                        </div>
                      </div>
                      

                    </div>
                    
                    {/* Topic Progression Indicator */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-full py-3 px-6 inline-block">
                      <div className="flex items-center gap-3">
                        <div className="text-sm font-medium">Topic {videoContent.animationPhase + 1} of 4</div>
                        <div className="flex gap-1">
                          {[...Array(4)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                                i <= videoContent.animationPhase ? 'bg-white' : 'bg-white/30'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={`w-full h-full bg-gradient-to-br ${videoContent.colors.from} ${videoContent.colors.to} flex items-center justify-center`}>
                  <div className="text-center text-white">
                    <div className="text-8xl lg:text-9xl mb-8">{getCourseIcon()}</div>
                    <h3 className="text-3xl lg:text-4xl font-bold mb-4">{currentLesson.title}</h3>
                    <p className="text-xl lg:text-2xl text-white/80 mb-6">{course.title}</p>
                    <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto">
                      <div className="text-lg text-white/90 mb-4">
                        Lesson {currentLessonIndex + 1} of {allLessons.length}
                      </div>
                      <div className="text-2xl font-bold mb-2">{formatTime(duration)}</div>
                      <div className="text-sm text-white/70">Ready to learn</div>
                      {currentTime > 0 && (
                        <div className="mt-4 text-sm text-white/80">
                          Resume from {formatTime(currentTime)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Progress Section Below Video */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent p-6">
                <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-white">Learning Progress</span>
                    <span className="text-sm text-white/70">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>
                  
                  <div className="w-full bg-white/20 rounded-full h-3 mb-2">
                    <div 
                      className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-1000 relative"
                      style={{ width: `${getProgressPercentage()}%` }}
                    >
                      <div className="absolute right-0 top-0 w-3 h-3 bg-white rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-xs text-white/60">
                    <span>Beginning</span>
                    <span className="font-medium text-white/80">
                      {Math.round(getProgressPercentage())}% Complete
                    </span>
                    <span>Mastery</span>
                  </div>
                </div>
              </div>
              
              {/* Play/Pause Overlay */}
              {(!isPlaying || showControls) && (
                <div className={`absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center transition-opacity duration-300 ${
                  showControls ? 'opacity-100' : 'opacity-0'
                }`}>
                  {/* Previous lesson navigation - Left side */}
                  {!isFirstLesson && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePreviousLesson();
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black bg-opacity-50 rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all group"
                      title="Previous Lesson"
                    >
                      <SkipBack className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                    </button>
                  )}
                  
                  {/* Main Play/Pause Button */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayPause();
                    }}
                    className="w-16 h-16 lg:w-20 lg:h-20 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all"
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6 lg:w-8 lg:h-8 text-gray-700" />
                    ) : (
                      <Play className="w-6 h-6 lg:w-8 lg:h-8 text-gray-700 ml-1" />
                    )}
                  </button>
                  
                  {/* Next lesson navigation - Right side */}
                  {!isLastLesson && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNextLesson();
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black bg-opacity-50 rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all group"
                      title="Next Lesson"
                    >
                      <SkipForward className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                    </button>
                  )}
                </div>
              )}
              
              {/* Video Controls */}
              <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent p-4 transition-opacity duration-300 ${
                showControls ? 'opacity-100' : 'opacity-0'
              }`}>
                {/* Progress Bar */}
                <div className="mb-4">
                  <div 
                    className="w-full bg-white bg-opacity-30 rounded-full h-2 cursor-pointer"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const percentage = ((e.clientX - rect.left) / rect.width) * 100;
                      handleSeek(percentage);
                    }}
                  >
                    <div 
                      className={`${videoContent.colors.accent} h-2 rounded-full transition-all duration-300 relative`}
                      style={{ width: `${getProgressPercentage()}%` }}
                    >
                      <div className="w-3 h-3 bg-white rounded-full absolute right-0 top-1/2 -translate-y-1/2 opacity-0 hover:opacity-100 transition-opacity"></div>
                    </div>
                  </div>
                </div>
                
                {/* Control Buttons */}
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={handlePlayPause}
                      className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all"
                    >
                      {isPlaying ? (
                        <Pause className="w-5 h-5" />
                      ) : (
                        <Play className="w-5 h-5 ml-0.5" />
                      )}
                    </button>
                    
                    {/* Lesson Navigation Controls */}
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={handlePreviousLesson}
                        disabled={isFirstLesson}
                        className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Previous Lesson"
                      >
                        <SkipBack className="w-4 h-4" />
                      </button>
                      
                      <button 
                        onClick={handleNextLesson}
                        disabled={isLastLesson}
                        className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Next Lesson"
                      >
                        <SkipForward className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button onClick={toggleMute} className="w-6 h-6 flex items-center justify-center">
                        {isMuted || volume === 0 ? 
                          <VolumeX className="w-4 h-4" /> : 
                          <Volume2 className="w-4 h-4" />
                        }
                      </button>
                      <div className="w-16 bg-white bg-opacity-30 rounded-full h-1 cursor-pointer">
                        <div 
                          className="bg-white h-1 rounded-full relative"
                          style={{ width: `${volume}%` }}
                        >
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={volume}
                            onChange={(e) => handleVolumeChange([parseInt(e.target.value)])}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <span className="text-sm font-medium">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {/* Previous Lesson Button */}
                    <button 
                      onClick={handlePreviousLesson}
                      disabled={isFirstLesson}
                      className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Previous Lesson"
                    >
                      <SkipBack className="w-4 h-4" />
                    </button>
                    
                    {/* Next Lesson Button */}
                    <button 
                      onClick={handleNextLesson}
                      disabled={isLastLesson}
                      className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Next Lesson"
                    >
                      <SkipForward className="w-4 h-4" />
                    </button>
                    
                    {/* Take Notes Button */}
                    <button 
                      onClick={() => setShowNotes(!showNotes)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all ${
                        showNotes ? 'bg-blue-500 bg-opacity-80' : 'bg-white bg-opacity-20'
                      }`}
                      title="Take Notes"
                    >
                      <PenTool className="w-4 h-4" />
                    </button>

                    {/* Chat Button */}
                    <button 
                      onClick={() => setShowChat(!showChat)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all ${
                        showChat ? 'bg-green-500 bg-opacity-80' : 'bg-white bg-opacity-20'
                      }`}
                      title="Chat"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </button>

                    {/* Captions Button */}
                    <button 
                      onClick={() => setShowCaptions(!showCaptions)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all ${
                        showCaptions ? 'bg-yellow-500 bg-opacity-80' : 'bg-white bg-opacity-20'
                      }`}
                      title="Captions"
                    >
                      <Subtitles className="w-4 h-4" />
                    </button>
                    
                    {/* Settings Button */}
                    <button 
                      onClick={() => setShowSettings(!showSettings)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all ${
                        showSettings ? 'bg-purple-500 bg-opacity-80' : 'bg-white bg-opacity-20'
                      }`}
                      title="Settings"
                    >
                      <Settings className="w-4 h-4" />
                    </button>

                    {/* Full Screen Button */}
                    <button 
                      onClick={toggleFullScreen}
                      className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all"
                      title={isFullScreen ? "Exit Full Screen" : "Full Screen"}
                    >
                      {isFullScreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Lesson Info Overlay - Top */}
              <div className={`absolute top-4 left-4 right-4 flex items-center justify-between transition-opacity duration-300 ${
                showControls ? 'opacity-100' : 'opacity-0'
              }`}>
                <div className="bg-black bg-opacity-50 backdrop-blur-sm rounded-lg px-3 py-2 text-white text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Lesson {currentLessonIndex + 1}/{allLessons.length}</span>
                    <span className="text-white/70">•</span>
                    <span className="text-white/70">{formatTime(duration)}</span>
                  </div>
                </div>
                
                {/* Lesson Complete Badge */}
                {isLessonCompleted() && (
                  <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    Completed
                  </div>
                )}
              </div>

              {/* Captions */}
              {showCaptions && getCurrentCaption() && (
                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-black bg-opacity-80 backdrop-blur-sm rounded-lg px-4 py-2 text-white text-center max-w-2xl">
                  <p className="text-sm lg:text-base">{getCurrentCaption()}</p>
                </div>
              )}

              {/* Navigation Hints */}
              {!isPlaying && showControls && !showCaptions && (
                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-black bg-opacity-50 backdrop-blur-sm rounded-lg px-4 py-2 text-white text-xs">
                  <div className="flex items-center gap-4 text-center">
                    <span>Space: Play/Pause</span>
                    <span>←/→: Skip 10s</span>
                    <span>Shift+←/→: Previous/Next Lesson</span>
                    <span>N: Next Lesson</span>
                  </div>
                </div>
              )}
            </div>

            {/* Video Controls Below Player */}
            <div className="p-4 lg:p-6 space-y-6">
              {/* Lesson Info */}
              <div>
                <h2 className="text-xl lg:text-2xl font-semibold mb-2">{currentLesson.title}</h2>
                <p className="text-gray-600 mb-4">{course.instructor}</p>
                
                {/* Progress */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`bg-gradient-to-r ${videoContent.colors.from} ${videoContent.colors.to} h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${getProgressPercentage()}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 whitespace-nowrap">
                    {Math.round(getProgressPercentage())}%
                  </span>
                </div>

                {/* Time Remaining */}
                <div className="text-sm text-gray-500">
                  {currentTime < duration ? (
                    <>Time remaining: {formatTime(duration - currentTime)}</>
                  ) : (
                    <>Lesson completed!</>
                  )}
                </div>
              </div>

              {/* Control Buttons */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <Button 
                  onClick={handlePlayPause}
                  className={`h-12 rounded-xl font-semibold transition-all ${
                    isPlaying 
                      ? 'bg-red-500 hover:bg-red-600 text-white' 
                      : `${videoContent.colors.accent} hover:opacity-90 text-white`
                  }`}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 mr-2" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      {currentTime > 0 ? 'Resume' : 'Play'}
                    </>
                  )}
                </Button>
                
                <Button 
                  onClick={handleCompleteLesson}
                  className="h-12 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Complete
                </Button>
                
                <Button 
                  onClick={handlePreviousLesson}
                  disabled={isFirstLesson}
                  className="h-12 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  title={isFirstLesson ? "This is the first lesson" : `Go to lesson ${currentLessonIndex}`}
                >
                  <SkipBack className="w-4 h-4 mr-2" />
                  Previous
                  {!isFirstLesson && (
                    <span className="ml-1 text-xs opacity-70">({currentLessonIndex})</span>
                  )}
                </Button>
                
                <Button 
                  onClick={handleNextLesson}
                  disabled={isLastLesson}
                  className="h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed relative"
                  title={isLastLesson ? "This is the last lesson" : `Go to lesson ${currentLessonIndex + 2}`}
                >
                  {!isLastLesson && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
                  )}
                  Next
                  <SkipForward className="w-4 h-4 ml-2" />
                  {!isLastLesson && (
                    <span className="ml-1 text-xs opacity-70">({currentLessonIndex + 2})</span>
                  )}
                </Button>
              </div>

              {/* Lesson Progress Indicator */}
              <div className="mt-4 flex items-center justify-center">
                <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2">
                  <span className="text-sm text-gray-600">Progress:</span>
                  <div className="flex items-center gap-1">
                    {allLessons.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index < currentLessonIndex 
                            ? 'bg-green-500' 
                            : index === currentLessonIndex 
                            ? `${videoContent.colors.accent} animate-pulse` 
                            : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {currentLessonIndex + 1}/{allLessons.length}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Notes Sidebar */}
          {showNotes && (
            <div className="lg:col-span-1 p-4 lg:p-6 border-t lg:border-t-0 lg:border-l border-gray-100 bg-yellow-50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Lesson Notes</h3>
                <button 
                  onClick={() => setShowNotes(false)}
                  className="w-6 h-6 flex items-center justify-center hover:bg-gray-200 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              {/* Note Taking Area */}
              <div className="space-y-4">
                <div>
                  <Textarea
                    placeholder="Take notes during the lesson..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="min-h-24 resize-none"
                  />
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">
                      @ {formatTime(currentTime)}
                    </span>
                    <Button 
                      onClick={saveNote}
                      size="sm"
                      disabled={!notes.trim()}
                      className="h-8"
                    >
                      <BookmarkPlus className="w-3 h-3 mr-1" />
                      Save Note
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Saved Notes */}
                <div>
                  <h4 className="font-medium mb-2">Saved Notes ({savedNotes.length})</h4>
                  <ScrollArea className="h-48">
                    <div className="space-y-2">
                      {savedNotes.map((note) => (
                        <div key={note.id} className="bg-white p-3 rounded-lg border">
                          <div className="flex items-center justify-between mb-1">
                            <button
                              onClick={() => jumpToNoteTimestamp(note.timeInSeconds)}
                              className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                            >
                              {note.timestamp}
                            </button>
                            <button
                              onClick={() => deleteNote(note.id)}
                              className="w-4 h-4 flex items-center justify-center hover:bg-red-100 rounded text-red-500"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                          <p className="text-sm text-gray-700">{note.content}</p>
                        </div>
                      ))}
                      {savedNotes.length === 0 && (
                        <p className="text-xs text-gray-500 text-center py-4">
                          No notes saved yet
                        </p>
                      )}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </div>
          )}

          {/* Chat Sidebar */}
          {showChat && (
            <div className="lg:col-span-1 p-4 lg:p-6 border-t lg:border-t-0 lg:border-l border-gray-100 bg-green-50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Course Chat</h3>
                <button 
                  onClick={() => setShowChat(false)}
                  className="w-6 h-6 flex items-center justify-center hover:bg-gray-200 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-col h-96">
                {/* Chat Messages */}
                <ScrollArea className="flex-1 mb-4">
                  <div className="space-y-3">
                    {chatMessages.map((msg) => (
                      <div key={msg.id} className={`p-3 rounded-lg ${
                        msg.isOwn ? 'bg-blue-100 ml-6' : 'bg-white mr-6'
                      }`}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm">{msg.avatar}</span>
                          <span className="font-medium text-sm">{msg.user}</span>
                          <span className="text-xs text-gray-500">{msg.time}</span>
                        </div>
                        <p className="text-sm text-gray-700">{msg.message}</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Chat Input */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask a question or share thoughts..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                    className="flex-1"
                  />
                  <Button 
                    onClick={sendChatMessage}
                    disabled={!chatMessage.trim()}
                    size="sm"
                    className="px-3"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Default Sidebar - Lesson List */}
          {!showNotes && !showChat && (
            <div className="lg:col-span-1 p-4 lg:p-6 border-t lg:border-t-0 lg:border-l border-gray-100">
              <h3 className="text-lg font-semibold mb-4">Course Lessons</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {allLessons.map((lesson, index) => (
                  <button
                    key={lesson.id}
                    onClick={() => {
                      setCurrentLessonId(lesson.id);
                      setCurrentTime(0);
                      setIsPlaying(false);
                    }}
                    className={`w-full p-3 rounded-lg text-left transition-all ${
                      lesson.id === currentLessonId 
                        ? 'bg-blue-50 border border-blue-200' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                        completedLessons?.includes(`${courseId}-${lesson.id}`)
                          ? 'bg-green-100 text-green-700'
                          : lesson.id === currentLessonId
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {completedLessons?.includes(`${courseId}-${lesson.id}`) ? (
                          <Check className="w-3 h-3" />
                        ) : (
                          index + 1
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm line-clamp-2">{lesson.title}</p>
                        <p className="text-xs text-gray-500">{lesson.duration}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Settings Modal */}
        <Dialog open={showSettings} onOpenChange={setShowSettings}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Video Settings</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 p-6">
              {/* Playback Speed */}
              <div>
                <label className="text-sm font-medium mb-2 block">Playback Speed</label>
                <Select value={playbackSpeed} onValueChange={setPlaybackSpeed}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0.5x">0.5x</SelectItem>
                    <SelectItem value="0.75x">0.75x</SelectItem>
                    <SelectItem value="1x">1x (Normal)</SelectItem>
                    <SelectItem value="1.25x">1.25x</SelectItem>
                    <SelectItem value="1.5x">1.5x</SelectItem>
                    <SelectItem value="2x">2x</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Video Quality */}
              <div>
                <label className="text-sm font-medium mb-2 block">Video Quality</label>
                <Select value={videoQuality} onValueChange={setVideoQuality}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="360p">360p</SelectItem>
                    <SelectItem value="480p">480p</SelectItem>
                    <SelectItem value="720p">720p (HD)</SelectItem>
                    <SelectItem value="1080p">1080p (Full HD)</SelectItem>
                    <SelectItem value="auto">Auto</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Volume Control */}
              <div>
                <label className="text-sm font-medium mb-2 block">Volume</label>
                <div className="flex items-center gap-3">
                  <button onClick={toggleMute}>
                    {isMuted || volume === 0 ? 
                      <VolumeX className="w-4 h-4" /> : 
                      <Volume2 className="w-4 h-4" />
                    }
                  </button>
                  <Slider
                    value={[volume]}
                    onValueChange={handleVolumeChange}
                    max={100}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-sm w-8">{volume}%</span>
                </div>
              </div>

              {/* Auto-advance Toggle */}
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Auto-advance to next lesson</label>
                <Switch
                  checked={autoplay}
                  onCheckedChange={setAutoplay}
                />
              </div>

              {/* Captions Toggle */}
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Show Captions</label>
                <Switch
                  checked={showCaptions}
                  onCheckedChange={setShowCaptions}
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Next Course Popup */}
        <Dialog open={showNextCoursePopup} onOpenChange={setShowNextCoursePopup}>
          <DialogContent className="sm:max-w-md">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              
              <h3 className="text-xl font-semibold mb-2">Course Complete!</h3>
              <p className="text-gray-600 mb-6">
                Congratulations! You've completed "{course.title}". Ready for the next challenge?
              </p>
              
              <div className="bg-blue-50 rounded-xl p-4 mb-6">
                <h4 className="font-semibold mb-2">Next Course Starting In:</h4>
                <div className="text-3xl font-bold text-blue-600 mb-2">{nextCourseCountdown}s</div>
                <p className="text-sm text-gray-600">Auto-starting next recommended course...</p>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  onClick={() => setShowNextCoursePopup(false)}
                  variant="outline"
                  className="flex-1 h-12 rounded-xl"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleStartNextCourse}
                  className="flex-1 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-xl"
                >
                  Start Now
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}