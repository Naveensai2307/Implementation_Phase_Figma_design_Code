import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft, Clock, CheckCircle, XCircle, Trophy, RotateCcw } from 'lucide-react';

export function QuizPage({ course, onBack, onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  // Mock quiz data - in real app this would come from API
  const quizData = {
    title: `${course?.title || 'Course'} Quiz`,
    description: 'Test your knowledge and earn points',
    timeLimit: 300,
    questions: [
      {
        id: 1,
        question: "What is the primary purpose of color theory in UI design?",
        options: [
          "To make designs look pretty",
          "To guide user behavior and emotions",
          "To use as many colors as possible",
          "To follow current trends"
        ],
        correctAnswer: 1,
        explanation: "Color theory helps designers understand how colors influence user behavior and emotions, creating more effective user experiences."
      },
      {
        id: 2,
        question: "Which color combination provides the best accessibility?",
        options: [
          "High contrast combinations",
          "Similar colors",
          "Bright neon colors",
          "Pastel colors only"
        ],
        correctAnswer: 0,
        explanation: "High contrast combinations ensure better readability and accessibility for users with visual impairments."
      },
      {
        id: 3,
        question: "What does the 60-30-10 rule refer to in design?",
        options: [
          "Font sizes",
          "Color proportions",
          "Spacing measurements",
          "Image dimensions"
        ],
        correctAnswer: 1,
        explanation: "The 60-30-10 rule is a color distribution guideline: 60% primary color, 30% secondary color, and 10% accent color."
      },
      {
        id: 4,
        question: "Which psychological effect is associated with the color blue?",
        options: [
          "Excitement and energy",
          "Trust and stability",
          "Urgency and warning",
          "Growth and nature"
        ],
        correctAnswer: 1,
        explanation: "Blue is psychologically associated with trust, stability, and professionalism, making it popular for business applications."
      },
      {
        id: 5,
        question: "What is color temperature in design?",
        options: [
          "How hot colors appear",
          "The warmth or coolness of colors",
          "The brightness of colors",
          "The saturation level"
        ],
        correctAnswer: 1,
        explanation: "Color temperature refers to whether colors appear warm (reds, oranges, yellows) or cool (blues, greens, purples)."
      }
    ]
  };

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0 && !isCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isCompleted) {
      handleSubmitQuiz();
    }
  }, [timeLeft, isCompleted]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitQuiz = () => {
    let correctAnswers = 0;
    quizData.questions.forEach(question => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    const finalScore = Math.round((correctAnswers / quizData.questions.length) * 100);
    setScore(finalScore);
    setIsCompleted(true);
    setShowResults(true);
    onComplete(finalScore);
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setTimeLeft(300);
    setIsCompleted(false);
    setShowResults(false);
    setScore(0);
  };

  const question = quizData.questions[currentQuestion];

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="w-full max-w-4xl mx-auto bg-white min-h-screen pb-20">
          {/* Header */}
          <div className="flex items-center justify-between p-4 lg:p-6 border-b border-gray-100">
            <button onClick={onBack} className="hover:bg-gray-100 p-2 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="text-center">
              <h1 className="text-lg lg:text-xl font-semibold">Quiz Results</h1>
              <p className="text-xs lg:text-sm text-gray-500">Your Performance</p>
            </div>
            <div className="w-9 h-9"></div>
          </div>

          <div className="p-4 lg:p-6 space-y-6">
            {/* Score Card */}
            <Card className="p-6 lg:p-8 text-center rounded-3xl shadow-lg bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
              <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-2">{score}%</h2>
              <p className="text-lg lg:text-xl text-gray-700 mb-4">
                {score >= 80 ? 'Excellent!' : score >= 60 ? 'Good Job!' : 'Keep Learning!'}
              </p>
              <div className="grid grid-cols-3 gap-4 lg:gap-6 text-center">
                <div>
                  <p className="text-2xl lg:text-3xl font-bold text-green-600">
                    {Object.values(selectedAnswers).filter((answer, index) => 
                      answer === quizData.questions[index].correctAnswer
                    ).length}
                  </p>
                  <p className="text-sm text-gray-600">Correct</p>
                </div>
                <div>
                  <p className="text-2xl lg:text-3xl font-bold text-red-600">
                    {quizData.questions.length - Object.values(selectedAnswers).filter((answer, index) => 
                      answer === quizData.questions[index].correctAnswer
                    ).length}
                  </p>
                  <p className="text-sm text-gray-600">Incorrect</p>
                </div>
                <div>
                  <p className="text-2xl lg:text-3xl font-bold text-blue-600">
                    {Math.round(score / 10)}
                  </p>
                  <p className="text-sm text-gray-600">Points</p>
                </div>
              </div>
            </Card>

            {/* Question Review */}
            <div>
              <h3 className="text-lg lg:text-xl font-semibold mb-4">Review Answers</h3>
              <div className="space-y-4">
                {quizData.questions.map((q, index) => {
                  const userAnswer = selectedAnswers[q.id];
                  const isCorrect = userAnswer === q.correctAnswer;
                  
                  return (
                    <Card key={q.id} className={`p-4 lg:p-6 rounded-2xl ${
                      isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                    }`}>
                      <div className="flex items-start gap-3 mb-3">
                        {isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <h4 className="font-medium mb-2">Question {index + 1}: {q.question}</h4>
                          <p className="text-sm text-gray-600 mb-2">
                            Your answer: <span className={isCorrect ? 'text-green-700' : 'text-red-700'}>
                              {q.options[userAnswer] || 'Not answered'}
                            </span>
                          </p>
                          {!isCorrect && (
                            <p className="text-sm text-gray-600 mb-2">
                              Correct answer: <span className="text-green-700">
                                {q.options[q.correctAnswer]}
                              </span>
                            </p>
                          )}
                          <p className="text-sm text-gray-700 italic">{q.explanation}</p>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button 
                onClick={handleRetakeQuiz}
                className="h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Retake Quiz
              </Button>
              <Button 
                onClick={onBack}
                className="h-12 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-xl font-semibold"
              >
                Back to Course
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
            <h1 className="text-lg lg:text-xl font-semibold">{quizData.title}</h1>
            <p className="text-xs lg:text-sm text-gray-500">Question {currentQuestion + 1} of {quizData.questions.length}</p>
          </div>
          <div className="flex items-center gap-2 bg-orange-100 px-3 py-1 rounded-full">
            <Clock className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-medium text-orange-700">{formatTime(timeLeft)}</span>
          </div>
        </div>

        <div className="p-4 lg:p-6 space-y-6">
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / quizData.questions.length) * 100}%` }}
            ></div>
          </div>

          {/* Question Card */}
          <Card className="p-6 lg:p-8 rounded-3xl shadow-lg">
            <div className="mb-6">
              <Badge className="bg-blue-100 text-blue-700 mb-4">
                Question {currentQuestion + 1}
              </Badge>
              <h2 className="text-xl lg:text-2xl font-semibold mb-6">{question.question}</h2>
            </div>

            {/* Answer Options */}
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(question.id, index)}
                  className={`w-full p-4 lg:p-5 text-left rounded-2xl border-2 transition-all hover:shadow-md ${
                    selectedAnswers[question.id] === index
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswers[question.id] === index
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedAnswers[question.id] === index && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span className="text-base lg:text-lg">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between gap-4">
            <Button 
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="flex-1 h-12 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-xl font-semibold disabled:opacity-50"
            >
              Previous
            </Button>
            
            {currentQuestion === quizData.questions.length - 1 ? (
              <Button 
                onClick={handleSubmitQuiz}
                disabled={!selectedAnswers[question.id] && selectedAnswers[question.id] !== 0}
                className="flex-1 h-12 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold disabled:opacity-50"
              >
                Submit Quiz
              </Button>
            ) : (
              <Button 
                onClick={handleNext}
                disabled={!selectedAnswers[question.id] && selectedAnswers[question.id] !== 0}
                className="flex-1 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold disabled:opacity-50"
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}