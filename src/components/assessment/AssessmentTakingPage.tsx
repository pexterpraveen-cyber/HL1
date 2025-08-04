import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { genAICourses } from '../../data/mockData';
import { 
  ClockIcon, 
  CheckCircleIcon, 
  XCircleIcon, 
  PlayIcon,
  CodeBracketIcon,
  SparklesIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline';

const AssessmentTakingPage: React.FC = () => {
  const { assessmentId } = useParams();
  const navigate = useNavigate();
  const { currentUser, updateUser } = useApp();
  
  const [assessmentMode, setAssessmentMode] = useState<'quiz' | 'coding' | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(45 * 60); // 45 minutes
  const [code, setCode] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const course = genAICourses[0]; // For demo, using the first course
  const currentQuiz = course.quizzes[currentQuestionIndex];
  const currentCodingChallenge = course.codingChallenges[0];

  useEffect(() => {
    if (assessmentMode && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [assessmentMode, timeRemaining]);

  useEffect(() => {
    if (assessmentMode === 'coding') {
      setCode(currentCodingChallenge.starterCode);
    }
  }, [assessmentMode, currentCodingChallenge]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleModeSelection = (mode: 'quiz' | 'coding') => {
    setAssessmentMode(mode);
    if (currentUser) {
      updateUser(currentUser.id, { assessmentStatus: 'in-progress' });
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < course.quizzes.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowExplanation(false);
    } else {
      handleSubmitAssessment();
    }
  };

  const handleSubmitAssessment = async () => {
    setIsSubmitting(true);
    
    // Simulate assessment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (currentUser) {
      updateUser(currentUser.id, { 
        assessmentStatus: 'completed',
        recommendationStatus: 'generating'
      });
      
      // Simulate recommendation generation
      setTimeout(() => {
        updateUser(currentUser.id, { recommendationStatus: 'ready' });
      }, 3000);
    }
    
    navigate('/assessments');
  };

  const languages = [
    { id: 'javascript', name: 'JavaScript', icon: '🟨' },
    { id: 'python', name: 'Python', icon: '🐍' },
    { id: 'java', name: 'Java', icon: '☕' },
    { id: 'typescript', name: 'TypeScript', icon: '🔷' },
    { id: 'react', name: 'React', icon: '⚛️' },
    { id: 'nodejs', name: 'Node.js', icon: '🟢' }
  ];

  if (!assessmentMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl mb-6 shadow-2xl">
              <SparklesIcon className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Choose Your Assessment Mode
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Select how you'd like to demonstrate your {course.title} skills
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-slide-up">
            {/* Quiz Mode */}
            <div 
              onClick={() => handleModeSelection('quiz')}
              className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-3xl group"
            >
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <CheckCircleIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Interactive Quiz</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Answer multiple-choice questions with AI-powered explanations and instant feedback
                </p>
                <div className="space-y-3 text-sm text-gray-500">
                  <div className="flex items-center justify-center">
                    <ClockIcon className="w-4 h-4 mr-2" />
                    <span>15-20 minutes</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <LightBulbIcon className="w-4 h-4 mr-2" />
                    <span>AI-generated explanations</span>
                  </div>
                </div>
                <button className="mt-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg">
                  Start Quiz Assessment
                </button>
              </div>
            </div>

            {/* Coding Mode */}
            <div 
              onClick={() => handleModeSelection('coding')}
              className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-3xl group"
            >
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <CodeBracketIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Coding Challenge</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Solve real-world coding problems with our interactive code editor and AI assistance
                </p>
                <div className="space-y-3 text-sm text-gray-500">
                  <div className="flex items-center justify-center">
                    <ClockIcon className="w-4 h-4 mr-2" />
                    <span>30-45 minutes</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <CodeBracketIcon className="w-4 h-4 mr-2" />
                    <span>Multiple language support</span>
                  </div>
                </div>
                <button className="mt-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg">
                  Start Coding Challenge
                </button>
              </div>
            </div>
          </div>

          <div className="text-center mt-12 animate-fade-in delay-500">
            <button
              onClick={() => navigate('/assessments')}
              className="text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              ← Back to Assessments
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (assessmentMode === 'quiz') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 animate-slide-down">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{course.title} - Quiz Assessment</h1>
                <p className="text-gray-600">Question {currentQuestionIndex + 1} of {course.quizzes.length}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-orange-600 bg-orange-50 px-4 py-2 rounded-xl">
                  <ClockIcon className="w-5 h-5 mr-2" />
                  <span className="font-semibold">{formatTime(timeRemaining)}</span>
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${((currentQuestionIndex + 1) / course.quizzes.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Question */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 animate-slide-up">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">{currentQuiz.question}</h2>
            
            <div className="space-y-4">
              {currentQuiz.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 ${
                    selectedAnswers[currentQuestionIndex] === index
                      ? 'border-blue-500 bg-blue-50 text-blue-900'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                      selectedAnswers[currentQuestionIndex] === index
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedAnswers[currentQuestionIndex] === index && (
                        <CheckCircleIcon className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <span className="font-medium">{option}</span>
                  </div>
                </button>
              ))}
            </div>

            {showExplanation && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl animate-fade-in">
                <div className="flex items-start">
                  <LightBulbIcon className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-green-900 mb-2">AI Explanation</h4>
                    <p className="text-green-800">{currentQuiz.explanation}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => navigate('/assessments')}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Exit Assessment
            </button>
            
            <div className="space-x-4">
              {selectedAnswers[currentQuestionIndex] !== undefined && !showExplanation && (
                <button
                  onClick={() => setShowExplanation(true)}
                  className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
                >
                  Show Explanation
                </button>
              )}
              
              {(showExplanation || selectedAnswers[currentQuestionIndex] !== undefined) && (
                <button
                  onClick={handleNextQuestion}
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </div>
                  ) : (
                    currentQuestionIndex === course.quizzes.length - 1 ? 'Complete Assessment' : 'Next Question'
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (assessmentMode === 'coding') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 animate-slide-down">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{currentCodingChallenge.title}</h1>
                <p className="text-gray-600">{course.title} - Coding Challenge</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-orange-600 bg-orange-50 px-4 py-2 rounded-xl">
                  <ClockIcon className="w-5 h-5 mr-2" />
                  <span className="font-semibold">{formatTime(timeRemaining)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Problem Description */}
            <div className="bg-white rounded-2xl shadow-lg p-6 animate-slide-up">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Challenge Description</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">{currentCodingChallenge.description}</p>
              
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Requirements:</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Create a functional counter component</li>
                  <li>• Implement increment and decrement functionality</li>
                  <li>• Style the component appropriately</li>
                  <li>• Use React hooks for state management</li>
                </ul>
              </div>

              {/* Language Selection */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Choose Programming Language:</h3>
                <div className="grid grid-cols-2 gap-3">
                  {languages.map((lang) => (
                    <button
                      key={lang.id}
                      onClick={() => setSelectedLanguage(lang.id)}
                      className={`flex items-center p-3 rounded-xl border-2 transition-all duration-300 ${
                        selectedLanguage === lang.id
                          ? 'border-purple-500 bg-purple-50 text-purple-900'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-lg mr-3">{lang.icon}</span>
                      <span className="font-medium">{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Code Editor */}
            <div className="bg-white rounded-2xl shadow-lg p-6 animate-slide-up delay-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Code Editor</h2>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Language:</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                    {languages.find(l => l.id === selectedLanguage)?.name}
                  </span>
                </div>
              </div>
              
              <div className="relative">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-96 p-4 border border-gray-300 rounded-xl font-mono text-sm bg-gray-900 text-green-400 resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Write your code here..."
                  style={{ 
                    backgroundColor: '#1a1a1a',
                    color: '#00ff00',
                    fontFamily: 'Monaco, Consolas, "Courier New", monospace'
                  }}
                />
                <div className="absolute top-2 right-2">
                  <button className="px-3 py-1 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700 transition-colors">
                    Run Code
                  </button>
                </div>
              </div>

              <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-2">AI Assistant Tips:</h4>
                <div className="text-sm text-gray-700 space-y-1">
                  <p>• Use useState hook to manage the counter state</p>
                  <p>• Remember to import React and necessary components</p>
                  <p>• Consider accessibility with proper button labels</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={() => navigate('/assessments')}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Exit Challenge
            </button>
            
            <div className="space-x-4">
              <button className="px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors">
                Save Progress
              </button>
              <button
                onClick={handleSubmitAssessment}
                disabled={isSubmitting}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </div>
                ) : (
                  'Submit Solution'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default AssessmentTakingPage;