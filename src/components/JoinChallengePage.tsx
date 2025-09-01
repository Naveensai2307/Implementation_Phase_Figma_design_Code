import React, { useState } from 'react';
import { ArrowLeft, Clock, Trophy, Code, Brain, BookOpen, CheckCircle, XCircle, Play, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

export function JoinChallengePage({ onBack, onNavigate, challenge }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(1800); // 30 minutes
  const [challengeStarted, setChallengeStarted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const challengeQuestions = [
    {
      id: 1,
      type: 'multiple-choice',
      category: 'Algorithms',
      question: 'What is the time complexity of binary search in a sorted array?',
      options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'],
      correctAnswer: 1,
      explanation: 'Binary search divides the search space in half with each iteration, resulting in O(log n) time complexity.'
    },
    {
      id: 2,
      type: 'coding',
      category: 'Programming',
      question: 'Write a function to reverse a string without using built-in reverse methods.',
      template: `function reverseString(str) {
    // Your code here
    
}`,
      testCases: [
        { input: '"hello"', expected: '"olleh"' },
        { input: '"world"', expected: '"dlrow"' },
        { input: '"a"', expected: '"a"' }
      ]
    },
    {
      id: 3,
      type: 'multiple-choice',
      category: 'Data Structures',
      question: 'Which data structure follows LIFO (Last In First Out) principle?',
      options: ['Queue', 'Stack', 'Array', 'Linked List'],
      correctAnswer: 1,
      explanation: 'Stack follows LIFO principle where the last element added is the first one to be removed.'
    },
    {
      id: 4,
      type: 'aptitude',
      category: 'Logical Reasoning',
      question: 'If it takes 5 machines 5 minutes to make 5 widgets, how long would it take 100 machines to make 100 widgets?',
      options: ['5 minutes', '20 minutes', '100 minutes', '500 minutes'],
      correctAnswer: 0,
      explanation: 'Each machine makes 1 widget in 5 minutes, so 100 machines make 100 widgets in 5 minutes.'
    },
    {
      id: 5,
      type: 'multiple-choice',
      category: 'System Design',
      question: 'What is the primary purpose of load balancing in system design?',
      options: [
        'To increase storage capacity',
        'To distribute incoming requests across multiple servers',
        'To encrypt data transmission',
        'To backup data automatically'
      ],
      correctAnswer: 1,
      explanation: 'Load balancing distributes incoming network traffic across multiple servers to ensure reliability and performance.'
    },
    {
      id: 6,
      type: 'coding',
      category: 'Programming',
      question: 'Implement a function to find the maximum element in an array.',
      template: `function findMax(arr) {
    // Your code here
    
}`,
      testCases: [
        { input: '[1, 3, 2, 8, 5]', expected: '8' },
        { input: '[-1, -3, -2]', expected: '-1' },
        { input: '[42]', expected: '42' }
      ]
    },
    {
      id: 7,
      type: 'aptitude',
      category: 'Mathematical',
      question: 'What is the next number in the sequence: 2, 6, 12, 20, 30, ?',
      options: ['40', '42', '45', '48'],
      correctAnswer: 1,
      explanation: 'The sequence follows n(n+1): 1×2=2, 2×3=6, 3×4=12, 4×5=20, 5×6=30, 6×7=42.'
    },
    {
      id: 8,
      type: 'multiple-choice',
      category: 'Database',
      question: 'Which SQL command is used to retrieve data from a database?',
      options: ['INSERT', 'UPDATE', 'SELECT', 'DELETE'],
      correctAnswer: 2,
      explanation: 'SELECT is used to query and retrieve data from database tables.'
    }
  ];

  const currentQuestion = challengeQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / challengeQuestions.length) * 100;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < challengeQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const startChallenge = () => {
    setChallengeStarted(true);
    // Start timer countdown
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowResults(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'algorithms':
      case 'programming':
        return <Code className="h-4 w-4" />;
      case 'logical reasoning':
      case 'mathematical':
        return <Brain className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case 'algorithms':
        return 'bg-blue-100 text-blue-800';
      case 'programming':
        return 'bg-green-100 text-green-800';
      case 'logical reasoning':
        return 'bg-purple-100 text-purple-800';
      case 'mathematical':
        return 'bg-orange-100 text-orange-800';
      case 'data structures':
        return 'bg-red-100 text-red-800';
      case 'system design':
        return 'bg-indigo-100 text-indigo-800';
      case 'database':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!challengeStarted) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Join Challenge</h1>
              <p className="text-gray-600">Test your skills with coding, algorithms, and aptitude questions</p>
            </div>
          </div>

          <Card className="mb-6">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Trophy className="h-6 w-6 text-yellow-500" />
                Technical Assessment Challenge
              </CardTitle>
              <CardDescription>
                A comprehensive test covering algorithms, programming, and logical reasoning
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Challenge Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-medium">Duration</div>
                  <div className="text-sm text-gray-600">30 minutes</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <BookOpen className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="font-medium">Questions</div>
                  <div className="text-sm text-gray-600">{challengeQuestions.length} questions</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Trophy className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="font-medium">Difficulty</div>
                  <div className="text-sm text-gray-600">Mixed Level</div>
                </div>
              </div>

              {/* Question Categories */}
              <div>
                <h3 className="font-medium mb-3">Question Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set(challengeQuestions.map(q => q.category))).map((category) => (
                    <Badge key={category} className={`${getCategoryColor(category)} flex items-center gap-1`}>
                      {getCategoryIcon(category)}
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Instructions</h3>
                <ul className="text-sm space-y-1">
                  <li>• Answer all questions within the time limit</li>
                  <li>• You can navigate between questions</li>
                  <li>• For coding questions, test your solution thoroughly</li>
                  <li>• Review your answers before submitting</li>
                  <li>• Once submitted, you cannot change your answers</li>
                </ul>
              </div>

              <Button 
                onClick={startChallenge}
                className="w-full bg-green-600 hover:bg-green-700 flex items-center gap-2"
              >
                <Play className="h-4 w-4" />
                Start Challenge
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (showResults) {
    const correctAnswers = Object.entries(answers).filter(([questionId, answer]) => {
      const question = challengeQuestions.find(q => q.id === parseInt(questionId));
      return question && answer === question.correctAnswer;
    }).length;
    const score = Math.round((correctAnswers / challengeQuestions.length) * 100);

    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Challenge Complete!</h1>
            <p className="text-gray-600">Here are your results</p>
          </div>

          <Card className="mb-6">
            <CardContent className="text-center p-8">
              <div className="text-6xl font-bold text-blue-600 mb-2">{score}%</div>
              <div className="text-xl mb-4">
                {correctAnswers} out of {challengeQuestions.length} correct
              </div>
              <Badge className={`text-lg px-4 py-2 ${
                score >= 80 ? 'bg-green-100 text-green-800' :
                score >= 60 ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {score >= 80 ? 'Excellent!' : score >= 60 ? 'Good Job!' : 'Keep Practicing!'}
              </Badge>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              onClick={() => onNavigate('contests')}
              className="flex items-center gap-2"
            >
              View More Challenges
            </Button>
            <Button 
              variant="outline"
              onClick={() => onNavigate('continuePractice')}
              className="flex items-center gap-2"
            >
              Continue Practice
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Exit
            </Button>
            <div>
              <h1 className="text-xl font-bold">Technical Challenge</h1>
              <p className="text-sm text-gray-600">
                Question {currentQuestionIndex + 1} of {challengeQuestions.length}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-red-100 text-red-800 px-3 py-1 rounded-full">
              <Clock className="h-4 w-4" />
              {formatTime(timeRemaining)}
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge className={`${getCategoryColor(currentQuestion.category)} flex items-center gap-1`}>
                {getCategoryIcon(currentQuestion.category)}
                {currentQuestion.category}
              </Badge>
              <Badge variant="outline">{currentQuestion.type}</Badge>
            </div>
            <CardTitle className="text-lg">{currentQuestion.question}</CardTitle>
          </CardHeader>
          <CardContent>
            {currentQuestion.type === 'multiple-choice' || currentQuestion.type === 'aptitude' ? (
              <RadioGroup
                value={answers[currentQuestion.id]?.toString() || ''}
                onValueChange={(value) => handleAnswerChange(currentQuestion.id, parseInt(value))}
              >
                {currentQuestion.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            ) : currentQuestion.type === 'coding' ? (
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Your Solution:</Label>
                  <Textarea
                    placeholder={currentQuestion.template}
                    value={answers[currentQuestion.id] || currentQuestion.template}
                    onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                    className="font-mono text-sm h-40 mt-2"
                  />
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <Label className="text-sm font-medium">Test Cases:</Label>
                  <div className="space-y-2 mt-2">
                    {currentQuestion.testCases.map((testCase, index) => (
                      <div key={index} className="text-sm bg-white p-2 rounded border">
                        <div><span className="font-medium">Input:</span> {testCase.input}</div>
                        <div><span className="font-medium">Expected:</span> {testCase.expected}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>
          
          <div className="flex gap-2">
            {currentQuestionIndex === challengeQuestions.length - 1 ? (
              <Button 
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
              >
                <Send className="h-4 w-4" />
                Submit Challenge
              </Button>
            ) : (
              <Button onClick={handleNext}>
                Next
              </Button>
            )}
          </div>
        </div>

        {/* Question Navigation */}
        <div className="mt-6 bg-white rounded-lg p-4">
          <h3 className="text-sm font-medium mb-3">Question Navigation</h3>
          <div className="grid grid-cols-8 gap-2">
            {challengeQuestions.map((_, index) => (
              <Button
                key={index}
                variant={index === currentQuestionIndex ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentQuestionIndex(index)}
                className={`w-10 h-10 ${
                  answers[challengeQuestions[index].id] !== undefined 
                    ? 'bg-green-100 border-green-300 text-green-800' 
                    : ''
                }`}
              >
                {index + 1}
              </Button>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-3 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-600 rounded"></div>
              Current
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-100 border border-green-300 rounded"></div>
              Answered
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 border border-gray-300 rounded"></div>
              Not Answered
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}