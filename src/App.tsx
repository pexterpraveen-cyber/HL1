import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import ProtectedRoute from './components/layout/ProtectedRoute';
import Navigation from './components/layout/Navigation';
import OnboardingPage from './components/onboarding/OnboardingPage';
import Dashboard from './components/learner/Dashboard';
import LearningPage from './components/learner/LearningPage';
import AssessmentsPage from './components/learner/AssessmentsPage';
import AssessmentTakingPage from './components/assessment/AssessmentTakingPage';
import AdminDashboard from './components/admin/AdminDashboard';
import UsersPage from './components/admin/UsersPage';
import AgentsPage from './components/admin/AgentsPage';
import AnalyticsPage from './components/admin/AnalyticsPage';

function App() {
  return (
    <AppProvider>
      <Router>
        <ProtectedRoute>
          <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            <Navigation />
            <main className="flex-1 overflow-auto transition-all duration-300">
              <Routes>
                {/* Learner Routes */}
                <Route path="/onboarding" element={<OnboardingPage />} />
                <Route path="/" element={<Dashboard />} />
                <Route path="/learning" element={<LearningPage />} />
                <Route path="/assessments" element={<AssessmentsPage />} />
                <Route path="/assessment/:assessmentId" element={<AssessmentTakingPage />} />
                
                {/* Admin Routes */}
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/users" element={<UsersPage />} />
                <Route path="/admin/agents" element={<AgentsPage />} />
                <Route path="/admin/analytics" element={<AnalyticsPage />} />
              </Routes>
            </main>
          </div>
        </ProtectedRoute>
      </Router>
    </AppProvider>
  );
}

export default App;