import { User, SkillGap, LearningPath, LearningModule, Assessment, AgentStatus, DepartmentAnalytics } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Praveen',
    email: 'praveen@hexaware.com',
    department: 'Engineering',
    role: 'Senior Developer',
    tsrRole: 'Full Stack Developer',
    profileStatus: 'loaded',
    assessmentStatus: 'completed',
    recommendationStatus: 'ready',
    learningStatus: 'in-progress',
    completionRate: 75,
    lastActivity: new Date('2025-01-20T10:30:00'),
    skillGaps: [
      {
        id: '1',
        skill: 'React Native',
        currentLevel: 2,
        requiredLevel: 4,
        gap: 2,
        priority: 'high',
        category: 'Frontend'
      },
      {
        id: '2',
        skill: 'Microservices Architecture',
        currentLevel: 3,
        requiredLevel: 4,
        gap: 1,
        priority: 'medium',
        category: 'Backend'
      }
    ],
    currentPath: {
      id: 'path-1',
      title: 'Advanced Frontend Development',
      description: 'Master modern frontend technologies and best practices',
      estimatedHours: 40,
      completionStatus: 'in-progress',
      progress: 60,
      modules: [
        {
          id: 'mod-1',
          title: 'React Native Fundamentals',
          description: 'Learn the basics of React Native development',
          estimatedTime: 8,
          status: 'completed',
          type: 'video',
          difficulty: 'intermediate'
        },
        {
          id: 'mod-2',
          title: 'Advanced React Native',
          description: 'Deep dive into advanced React Native concepts',
          estimatedTime: 12,
          status: 'in-progress',
          type: 'project',
          difficulty: 'advanced'
        },
        {
          id: 'mod-3',
          title: 'Performance Optimization',
          description: 'Optimize React Native app performance',
          estimatedTime: 6,
          status: 'not-started',
          type: 'exercise',
          difficulty: 'advanced'
        }
      ]
    }
  },
  {
    id: '2',
    name: 'Vittal',
    email: 'vittal@hexaware.com',
    department: 'Engineering',
    role: 'DevOps Engineer',
    tsrRole: 'Cloud Solutions Architect',
    profileStatus: 'loaded',
    assessmentStatus: 'in-progress',
    recommendationStatus: 'pending',
    learningStatus: 'not-started',
    completionRate: 25,
    lastActivity: new Date('2025-01-19T14:15:00'),
    skillGaps: [
      {
        id: '3',
        skill: 'Kubernetes',
        currentLevel: 2,
        requiredLevel: 5,
        gap: 3,
        priority: 'high',
        category: 'DevOps'
      },
      {
        id: '4',
        skill: 'AWS Lambda',
        currentLevel: 1,
        requiredLevel: 4,
        gap: 3,
        priority: 'high',
        category: 'Cloud'
      }
    ]
  },
  {
    id: '3',
    name: 'Esther',
    email: 'esther@hexaware.com',
    department: 'Data Science',
    role: 'Data Analyst',
    tsrRole: 'Senior Data Scientist',
    profileStatus: 'loaded',
    assessmentStatus: 'completed',
    recommendationStatus: 'ready',
    learningStatus: 'in-progress',
    completionRate: 85,
    lastActivity: new Date('2025-01-20T16:45:00'),
    skillGaps: [
      {
        id: '5',
        skill: 'Machine Learning',
        currentLevel: 3,
        requiredLevel: 5,
        gap: 2,
        priority: 'high',
        category: 'Data Science'
      }
    ]
  },
  {
    id: '4',
    name: 'Laksshaiya',
    email: 'laksshaiya@hexaware.com',
    department: 'QA',
    role: 'QA Engineer',
    tsrRole: 'Test Automation Lead',
    profileStatus: 'loaded',
    assessmentStatus: 'pending',
    recommendationStatus: 'pending',
    learningStatus: 'not-started',
    completionRate: 15,
    lastActivity: new Date('2025-01-18T11:20:00'),
    skillGaps: [
      {
        id: '6',
        skill: 'Automation Testing',
        currentLevel: 2,
        requiredLevel: 4,
        gap: 2,
        priority: 'high',
        category: 'Testing'
      },
      {
        id: '7',
        skill: 'Selenium WebDriver',
        currentLevel: 1,
        requiredLevel: 4,
        gap: 3,
        priority: 'medium',
        category: 'Testing'
      }
    ]
  },
  {
    id: '5',
    name: 'John',
    email: 'john@hexaware.com',
    department: 'Engineering',
    role: 'Junior Developer',
    tsrRole: 'Software Developer',
    profileStatus: 'loading',
    assessmentStatus: 'pending',
    recommendationStatus: 'pending',
    learningStatus: 'not-started',
    completionRate: 0,
    lastActivity: new Date('2025-01-20T09:00:00'),
    skillGaps: []
  },
  {
    id: '6',
    name: 'Sarah',
    email: 'sarah@hexaware.com',
    department: 'Data Science',
    role: 'Data Analyst Trainee',
    tsrRole: 'Data Analyst',
    profileStatus: 'loading',
    assessmentStatus: 'pending',
    recommendationStatus: 'pending',
    learningStatus: 'not-started',
    completionRate: 0,
    lastActivity: new Date('2025-01-20T08:30:00'),
    skillGaps: []
  }
];

// Admin user data
export const adminUser = {
  id: 'admin-1',
  name: 'Admin User',
  email: 'admin@hexaware.com',
  role: 'System Administrator',
  isAdmin: true
};

export const mockAssessments: Assessment[] = [
  {
    id: 'assess-1',
    userId: '1',
    competency: 'React Native',
    score: 75,
    maxScore: 100,
    completedAt: new Date('2025-01-18T09:00:00'),
    timeSpent: 45
  },
  {
    id: 'assess-2',
    userId: '1',
    competency: 'Microservices',
    score: 82,
    maxScore: 100,
    completedAt: new Date('2025-01-17T14:30:00'),
    timeSpent: 60
  }
];

export const mockAgentStatus: AgentStatus[] = [
  {
    name: 'GenAI Content Generator',
    status: 'processing',
    queueSize: 3,
    avgLatency: 1.2,
    errorRate: 0.02,
    lastProcessed: new Date('2025-01-20T16:58:00')
  },
  {
    name: 'Assessment Agent',
    status: 'idle',
    queueSize: 0,
    avgLatency: 2.1,
    errorRate: 0.01,
    lastProcessed: new Date('2025-01-20T16:55:00')
  },
  {
    name: 'AI Recommender Agent',
    status: 'processing',
    queueSize: 5,
    avgLatency: 3.8,
    errorRate: 0.05,
    lastProcessed: new Date('2025-01-20T16:59:00')
  },
  {
    name: 'Progress Tracker Agent',
    status: 'idle',
    queueSize: 1,
    avgLatency: 0.8,
    errorRate: 0.00,
    lastProcessed: new Date('2025-01-20T16:57:00')
  }
];

export const mockDepartmentAnalytics: DepartmentAnalytics[] = [
  {
    department: 'Engineering',
    totalEmployees: 45,
    averageCompletion: 68,
    topSkillGaps: [
      {
        id: 'gap-1',
        skill: 'Kubernetes',
        currentLevel: 2.1,
        requiredLevel: 4.5,
        gap: 2.4,
        priority: 'high',
        category: 'DevOps'
      },
      {
        id: 'gap-2',
        skill: 'React Native',
        currentLevel: 2.8,
        requiredLevel: 4.2,
        gap: 1.4,
        priority: 'medium',
        category: 'Frontend'
      }
    ],
    engagementScore: 72,
    trainingCost: 125000
  },
  {
    department: 'Data Science',
    totalEmployees: 28,
    averageCompletion: 81,
    topSkillGaps: [
      {
        id: 'gap-3',
        skill: 'Deep Learning',
        currentLevel: 2.5,
        requiredLevel: 4.8,
        gap: 2.3,
        priority: 'high',
        category: 'AI/ML'
      }
    ],
    engagementScore: 85,
    trainingCost: 98000
  },
  {
    department: 'QA',
    totalEmployees: 22,
    averageCompletion: 59,
    topSkillGaps: [
      {
        id: 'gap-4',
        skill: 'Automation Testing',
        currentLevel: 2.2,
        requiredLevel: 4.0,
        gap: 1.8,
        priority: 'high',
        category: 'Testing'
      }
    ],
    engagementScore: 63,
    trainingCost: 67000
  }
];

// GenAI Course Content
export const genAICourses = [
  {
    id: 'course-1',
    title: 'React Native Development',
    description: 'Master mobile app development with React Native',
    difficulty: 'Intermediate',
    duration: '40 hours',
    modules: 8,
    quizzes: [
      {
        id: 'quiz-1',
        question: 'What is the primary advantage of React Native over native development?',
        options: [
          'Better performance',
          'Code reusability across platforms',
          'Smaller app size',
          'Better security'
        ],
        correctAnswer: 1,
        explanation: 'React Native allows you to write code once and deploy it on both iOS and Android platforms, significantly reducing development time and cost.'
      },
      {
        id: 'quiz-2',
        question: 'Which component is used for navigation in React Native?',
        options: [
          'NavigationContainer',
          'Router',
          'Navigator',
          'RouteHandler'
        ],
        correctAnswer: 0,
        explanation: 'NavigationContainer is the component that manages the navigation tree and contains the navigation state.'
      }
    ],
    codingChallenges: [
      {
        id: 'code-1',
        title: 'Create a Simple Counter App',
        description: 'Build a React Native component that displays a counter with increment and decrement buttons.',
        starterCode: `import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Counter = () => {
  // Your code here
  
  return (
    <View style={styles.container}>
      {/* Add your counter UI here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Counter;`,
        solution: `import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Counter = () => {
  const [count, setCount] = useState(0);
  
  return (
    <View style={styles.container}>
      <Text style={styles.countText}>{count}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => setCount(count - 1)}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => setCount(count + 1)}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Counter;`
      }
    ]
  }
];