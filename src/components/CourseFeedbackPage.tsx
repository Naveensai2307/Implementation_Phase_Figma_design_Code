import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { ArrowLeft, Star, ThumbsUp, MessageCircle, Award, CheckCircle, Send } from 'lucide-react';

export function CourseFeedbackPage({ course, onBack, onNavigate, onSubmitFeedback }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [selectedAspects, setSelectedAspects] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const feedbackAspects = [
    { id: 'content', label: 'Course Content', icon: '📚' },
    { id: 'instructor', label: 'Instructor', icon: '👨‍🏫' },
    { id: 'pace', label: 'Learning Pace', icon: '⏱️' },
    { id: 'difficulty', label: 'Difficulty Level', icon: '🎯' },
    { id: 'projects', label: 'Projects & Exercises', icon: '💻' },
    { id: 'support', label: 'Student Support', icon: '🤝' },
    { id: 'platform', label: 'Platform Experience', icon: '🖥️' },
    { id: 'value', label: 'Value for Money', icon: '💰' }
  ];

  const quickFeedbacks = [
    'Excellent course! Highly recommended.',
    'Great content but could use more practical examples.',
    'Perfect for beginners like me.',
    'Instructor explains concepts very clearly.',
    'Projects were challenging and helpful.',
    'Good course overall, learned a lot.'
  ];

  const toggleAspect = (aspectId) => {
    setSelectedAspects(prev => 
      prev.includes(aspectId) 
        ? prev.filter(id => id !== aspectId)
        : [...prev, aspectId]
    );
  };

  const handleSubmitFeedback = () => {
    const feedbackData = {
      courseId: course.id,
      rating,
      feedback,
      aspects: selectedAspects,
      timestamp: new Date().toISOString()
    };

    // In real app, this would be sent to backend
    console.log('Submitting feedback:', feedbackData);
    
    if (onSubmitFeedback) {
      onSubmitFeedback(feedbackData);
    }

    setSubmitted(true);

    // Redirect after showing success
    setTimeout(() => {
      onNavigate('dashboard');
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 text-center rounded-3xl shadow-xl">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h1>
          <p className="text-gray-600 mb-6">
            Your feedback has been submitted successfully. It helps us improve our courses.
          </p>
          
          <div className="bg-gray-50 rounded-2xl p-4 mb-6">
            <div className="flex items-center justify-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-6 h-6 ${
                    star <= rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-600">You rated this course {rating}/5 stars</p>
          </div>
          
          <div className="space-y-3">
            <Button 
              onClick={() => onNavigate('courses')}
              className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-xl"
            >
              Explore More Courses
            </Button>
            <Button 
              onClick={() => onNavigate('dashboard')}
              variant="outline"
              className="w-full h-12 rounded-xl"
            >
              Go to Dashboard
            </Button>
          </div>
        </Card>
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
            <h1 className="text-lg lg:text-xl font-semibold">Course Feedback</h1>
            <p className="text-xs lg:text-sm text-gray-500">Share your learning experience</p>
          </div>
          <div className="w-9 h-9"></div>
        </div>

        <div className="p-4 lg:p-6 max-w-3xl mx-auto space-y-6">
          {/* Course Completion Celebration */}
          <Card className="p-6 lg:p-8 rounded-3xl bg-gradient-to-r from-green-50 to-blue-50 border border-green-200">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Congratulations! 🎉</h2>
              <p className="text-gray-600 mb-4">
                You've successfully completed <span className="font-semibold">{course?.title}</span>
              </p>
              <div className="flex items-center justify-center gap-4 text-sm">
                <Badge className="bg-green-100 text-green-700">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Course Completed
                </Badge>
                <Badge className="bg-blue-100 text-blue-700">
                  <Award className="w-3 h-3 mr-1" />
                  Certificate Earned
                </Badge>
              </div>
            </div>
          </Card>

          {/* Rating Section */}
          <Card className="p-6 rounded-2xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">How would you rate this course?</h3>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= (hoverRating || rating)
                          ? 'text-yellow-500 fill-current'
                          : 'text-gray-300 hover:text-yellow-400'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-600">
                {rating === 0 && 'Click to rate'}
                {rating === 1 && 'Poor - Needs improvement'}
                {rating === 2 && 'Fair - Could be better'}
                {rating === 3 && 'Good - Satisfactory'}
                {rating === 4 && 'Very Good - Great course!'}
                {rating === 5 && 'Excellent - Outstanding course!'}
              </p>
            </div>
          </Card>

          {/* Feedback Aspects */}
          <Card className="p-6 rounded-2xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">What did you like most?</h3>
            <p className="text-sm text-gray-600 mb-4">Select all that apply:</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {feedbackAspects.map((aspect) => (
                <button
                  key={aspect.id}
                  onClick={() => toggleAspect(aspect.id)}
                  className={`p-3 rounded-xl border-2 transition-all text-left ${
                    selectedAspects.includes(aspect.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-2">{aspect.icon}</div>
                  <p className="text-sm font-medium">{aspect.label}</p>
                </button>
              ))}
            </div>
          </Card>

          {/* Written Feedback */}
          <Card className="p-6 rounded-2xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">
              <MessageCircle className="w-5 h-5 inline mr-2" />
              Additional Comments (Optional)
            </h3>
            
            {/* Quick Feedback Options */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-3">Quick feedback:</p>
              <div className="flex flex-wrap gap-2">
                {quickFeedbacks.map((quickFeedback, index) => (
                  <button
                    key={index}
                    onClick={() => setFeedback(quickFeedback)}
                    className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition-colors"
                  >
                    {quickFeedback}
                  </button>
                ))}
              </div>
            </div>

            <Textarea
              placeholder="Tell us about your learning experience. What could be improved? What did you love most? Your feedback helps us make better courses."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="min-h-32 resize-none rounded-xl border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-2">
              {feedback.length}/500 characters
            </p>
          </Card>

          {/* Instructor Feedback */}
          <Card className="p-6 rounded-2xl shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-xl">
                {course?.instructorAvatar}
              </div>
              <div>
                <h3 className="font-semibold">{course?.instructor}</h3>
                <p className="text-sm text-gray-600">Course Instructor</p>
              </div>
            </div>
            <p className="text-sm text-gray-700 mb-4">
              "Thank you for completing the course! Your feedback helps me create better content for future students. 
              Keep learning and growing! 🌟"
            </p>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                className="h-8 px-4 text-sm rounded-lg"
                onClick={() => onNavigate('professor', course)}
              >
                <ThumbsUp className="w-3 h-3 mr-1" />
                Thank Instructor
              </Button>
            </div>
          </Card>

          {/* Submit Button */}
          <div className="sticky bottom-4">
            <Button
              onClick={handleSubmitFeedback}
              disabled={rating === 0}
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all"
            >
              <Send className="w-5 h-5 mr-2" />
              {rating === 0 ? 'Please rate the course first' : 'Submit Feedback'}
            </Button>
          </div>

          {/* Continue Learning Suggestion */}
          <Card className="p-6 rounded-2xl shadow-sm bg-gradient-to-r from-purple-50 to-pink-50">
            <h3 className="text-lg font-semibold mb-2">Keep Learning!</h3>
            <p className="text-gray-600 mb-4">
              Based on what you've learned, here are some recommended next steps:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button 
                onClick={() => onNavigate('courses')}
                variant="outline"
                className="h-10 rounded-lg"
              >
                Explore Advanced Courses
              </Button>
              <Button 
                onClick={() => onNavigate('contests')}
                variant="outline"
                className="h-10 rounded-lg"
              >
                Join Coding Challenges
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}