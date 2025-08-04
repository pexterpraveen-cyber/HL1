import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { BeakerIcon, CheckCircleIcon, ClockIcon, PlayIcon, CodeBracketIcon } from '@heroicons/react/24/outline';

const AssessmentsPage: React.FC = () => {
  const { currentUser, updateUser } = useApp();
  const [activeAssessment, setActiveAssessment] = useState<string | null>(null);
  const navigate = useNavigate();

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  const assessments = [
    {
      id: 'react-native',
      title: 'React Native Development',
      description: 'Evaluate your React Native skills including components, navigation, and state management',
      duration: '45 minutes',
      questions: 25,
      status: currentUser.assessmentStatus === 'completed' ? 'completed' : 'available',
      score: currentUser.assessmentStatus === 'completed' ? 75 : null
    },
    {
      id: 'microservices',
      title: 'Microservices Architecture',
      description: 'Test your understanding of microservices patterns, communication, and deployment',
      duration: '60 minutes',
      questions: 30,
      status: 'available',
      score: null
    },
    {
      id: 'cloud-security',
      title: 'Cloud Security',
      description: 'Assess your knowledge of cloud security best practices and compliance',
      duration: '40 minutes',
      questions: 20,
      status: 'locked',
      score: null
    }
  ];

  const startAssessment = (assessmentId: string) => {
    // Navigate to the assessment taking page
    navigate(`/assessment/${assessmentId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50 border-green-200';
      case 'available': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'locked': return 'text-gray-400 bg-gray-50 border-gray-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
          AI-Powered Skill Assessments
        </h1>
        <p className="text-lg text-gray-600">Evaluate your current competencies with our GenAI-enhanced assessment platform</p>
      </div>

      {/* Assessment Progress */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-lg border border-blue-100 p-6 mb-8 animate-slide-up">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Assessment Journey</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-white rounded-xl shadow-sm">
            <div className="text-3xl font-bold text-green-600 mb-2">1</div>
            <div className="text-sm font-medium text-gray-600">Completed</div>
            <div className="w-full bg-green-100 rounded-full h-2 mt-2">
              <div className="bg-green-500 h-2 rounded-full w-full"></div>
            </div>
          </div>
          <div className="text-center p-4 bg-white rounded-xl shadow-sm">
            <div className="text-3xl font-bold text-blue-600 mb-2">2</div>
            <div className="text-sm font-medium text-gray-600">Available</div>
            <div className="w-full bg-blue-100 rounded-full h-2 mt-2">
              <div className="bg-blue-500 h-2 rounded-full w-2/3"></div>
            </div>
          </div>
          <div className="text-center p-4 bg-white rounded-xl shadow-sm">
            <div className="text-3xl font-bold text-gray-400 mb-2">1</div>
            <div className="text-sm font-medium text-gray-600">Locked</div>
            <div className="w-full bg-gray-100 rounded-full h-2 mt-2">
              <div className="bg-gray-300 h-2 rounded-full w-1/4"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Assessments List */}
      <div className="space-y-6 animate-slide-up delay-200">
        {assessments.map((assessment) => (
          <div key={assessment.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                    <BeakerIcon className="w-7 h-7 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{assessment.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{assessment.description}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(assessment.status)}`}>
                  {assessment.status === 'completed' && <CheckCircleIcon className="w-4 h-4 mr-1" />}
                  {assessment.status === 'available' && <ClockIcon className="w-4 h-4 mr-1" />}
                  {assessment.status.charAt(0).toUpperCase() + assessment.status.slice(1)}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="flex items-center text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                  <ClockIcon className="w-4 h-4 mr-2" />
                  <span className="font-medium">Duration: {assessment.duration}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                  <BeakerIcon className="w-4 h-4 mr-2" />
                  <span className="font-medium">Questions: {assessment.questions}</span>
                </div>
                {assessment.score && (
                  <div className="flex items-center text-sm font-semibold text-green-600 bg-green-50 rounded-lg p-3">
                    <CheckCircleIcon className="w-4 h-4 mr-2" />
                    <span>Score: {assessment.score}%</span>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-3">
                {assessment.status === 'available' && (
                  <button
                    onClick={() => startAssessment(assessment.id)}
                    disabled={activeAssessment !== null}
                    className="flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <PlayIcon className="w-5 h-5 mr-2" />
                    Start Learning Assessment
                  </button>
                )}
                {assessment.status === 'completed' && (
                  <button className="flex items-center border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-50 transition-all duration-300 font-semibold">
                    <CheckCircleIcon className="w-5 h-5 mr-2" />
                    View Results
                  </button>
                )}
                {assessment.status === 'locked' && (
                  <button disabled className="bg-gray-100 text-gray-400 px-6 py-3 rounded-xl cursor-not-allowed font-semibold">
                    Complete Prerequisites
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* GenAI Features Highlight */}
      <div className="mt-12 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100 animate-slide-up delay-400">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4">
            <CodeBracketIcon className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Enhanced with GenAI</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our assessments use advanced AI to provide personalized questions, real-time coding challenges, 
            and intelligent feedback tailored to your learning journey.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-2">Adaptive Questions</h4>
              <p className="text-sm text-gray-600">AI adjusts difficulty based on your responses</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-2">Code Analysis</h4>
              <p className="text-sm text-gray-600">Real-time feedback on coding solutions</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-2">Smart Recommendations</h4>
              <p className="text-sm text-gray-600">Personalized learning paths generated by AI</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentsPage;