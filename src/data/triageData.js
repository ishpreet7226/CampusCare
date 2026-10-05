/**
 * CampusCare — Smart Triage Data & Classification Engine
 *
 * This module contains all category definitions, keyword maps, and the
 * mock classification function that powers the Smart Triage feature.
 */

export const CATEGORIES = {
  ACADEMIC: {
    id: 'academic',
    label: 'Academic Support',
    icon: 'GraduationCap',
    service: 'Academic Advisor',
    department: 'Academic Services',
    color: '#3B82F6',
    description: 'Help with coursework, exams, attendance, and academic workload.',
    responseTime: '1–2 business days',
    keywords: [
      'coursework', 'assignment', 'exam', 'exams', 'grades', 'grade',
      'attendance', 'professor', 'class', 'classes', 'academic', 'study',
      'studying', 'lecture', 'lectures', 'homework', 'deadline', 'deadlines',
      'failing', 'fail', 'gpa', 'course', 'courses', 'subject', 'subjects',
      'semester', 'credit', 'credits', 'syllabus', 'workload', 'keep up',
      'falling behind', 'behind', 'struggling', 'assignments', 'thesis',
      'dissertation', 'research', 'lab', 'tutorial', 'tutorials',
    ],
  },
  WELLBEING: {
    id: 'wellbeing',
    label: 'Wellbeing Support',
    icon: 'Heart',
    service: 'Student Wellbeing Counsellor',
    department: 'Student Wellbeing Services',
    color: '#EC4899',
    description: 'Support for stress, anxiety, emotional wellbeing and mental health.',
    responseTime: 'Within 24 hours',
    keywords: [
      'overwhelmed', 'stressed', 'stress', 'anxious', 'anxiety', 'wellbeing',
      'well-being', 'mental health', 'emotional', 'pressure', 'depressed',
      'depression', 'lonely', 'loneliness', 'homesick', 'sad', 'panic',
      'burnout', 'exhausted', 'tired', 'sleep', 'insomnia', 'crying',
      'feeling down', 'feeling low', 'not coping', 'can\'t cope', 'help me',
      'counselling', 'counseling', 'therapy', 'therapist', 'mental',
      'upset', 'worried', 'worry', 'fear', 'scared',
    ],
  },
  FINANCIAL: {
    id: 'financial',
    label: 'Financial Support',
    icon: 'DollarSign',
    service: 'Financial Aid Office',
    department: 'Student Finance',
    color: '#10B981',
    description: 'Assistance with fees, scholarships, payments and financial hardship.',
    responseTime: '2–3 business days',
    keywords: [
      'money', 'fees', 'fee', 'financial', 'scholarship', 'scholarships',
      'payment', 'payments', 'tuition', 'loan', 'loans', 'bursary',
      'funding', 'fund', 'afford', 'expensive', 'cost', 'costs',
      'debt', 'pay', 'paying', 'hardship', 'income', 'budget',
      'rent', 'bill', 'bills', 'financial aid', 'grant', 'grants',
    ],
  },
  ACCOMMODATION: {
    id: 'accommodation',
    label: 'Accommodation Support',
    icon: 'Home',
    service: 'Accommodation Office',
    department: 'Campus Housing',
    color: '#F59E0B',
    description: 'Help with campus housing, room allocation and accommodation issues.',
    responseTime: '1–2 business days',
    keywords: [
      'hostel', 'housing', 'room', 'rooms', 'accommodation', 'dorm',
      'dormitory', 'residence', 'residential', 'flat', 'apartment',
      'roommate', 'room-mate', 'living', 'move in', 'move out',
      'maintenance', 'repair', 'broken', 'heating', 'noise',
      'landlord', 'lease', 'tenant', 'housing office',
    ],
  },
  CAREER: {
    id: 'career',
    label: 'Career Support',
    icon: 'Briefcase',
    service: 'Career Services Advisor',
    department: 'Career Development Centre',
    color: '#8B5CF6',
    description: 'Guidance on internships, placements, CVs, interviews and career planning.',
    responseTime: '2–3 business days',
    keywords: [
      'career', 'internship', 'internships', 'placement', 'placements',
      'resume', 'cv', 'job', 'jobs', 'interview', 'interviews',
      'employer', 'employment', 'work experience', 'graduate',
      'graduation', 'networking', 'linkedin', 'cover letter',
      'application', 'applying', 'hire', 'hiring', 'recruited',
      'recruitment', 'skill', 'skills', 'portfolio',
    ],
  },
  GENERAL: {
    id: 'general',
    label: 'General Student Services',
    icon: 'HelpCircle',
    service: 'Student Services Desk',
    department: 'Student Services',
    color: '#6B7280',
    description: 'General enquiries and support for any student-related matter.',
    responseTime: '2–3 business days',
    keywords: [],
  },
};

/**
 * Classify a student's message into a support category.
 *
 * Scores each category by counting keyword matches (with partial
 * matching for phrases). Returns the highest-scoring category, or
 * GENERAL as a fallback.
 */
export function classifyRequest(message) {
  const lower = message.toLowerCase();
  let bestCategory = CATEGORIES.GENERAL;
  let bestScore = 0;

  for (const [key, category] of Object.entries(CATEGORIES)) {
    if (key === 'GENERAL') continue;

    let score = 0;
    for (const keyword of category.keywords) {
      if (lower.includes(keyword)) {
        // Longer keyword matches are worth more to improve accuracy
        score += keyword.split(' ').length;
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestCategory = category;
    }
  }

  return bestCategory;
}

/**
 * Generate a human-readable reason for the classification.
 */
export function generateReason(message, category) {
  const lower = message.toLowerCase();
  const matchedKeywords = category.keywords.filter(kw => lower.includes(kw));
  const topKeywords = matchedKeywords.slice(0, 3);

  if (topKeywords.length > 0) {
    return `Your request appears to relate to ${topKeywords.join(', ')}. We've matched this to our ${category.label} team for the best assistance.`;
  }

  return `Based on your description, we believe our ${category.label} team can best assist you.`;
}

/**
 * Assign a priority level based on category and certain keywords.
 */
export function assignPriority(message, category) {
  const lower = message.toLowerCase();
  const urgentKeywords = [
    'urgent', 'emergency', 'immediately', 'asap', 'crisis',
    'can\'t cope', 'not coping', 'panic', 'help me',
  ];

  if (urgentKeywords.some(kw => lower.includes(kw))) {
    return 'High';
  }

  if (category.id === 'wellbeing') {
    return 'High';
  }

  return 'Normal';
}

/**
 * Generate a mock case ID in the format SN-XXXX.
 */
export function generateCaseId() {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `SN-${num}`;
}

/**
 * Demo examples for judges to quickly test different categories.
 */
export const DEMO_EXAMPLES = [
  {
    label: 'Academic difficulty',
    text: "I'm struggling to keep up with my assignments and exams.",
    expectedCategory: 'Academic Support',
  },
  {
    label: 'Feeling overwhelmed',
    text: "I've been feeling overwhelmed and under a lot of pressure.",
    expectedCategory: 'Wellbeing Support',
  },
  {
    label: 'Financial concern',
    text: "I'm having difficulty paying my tuition fees.",
    expectedCategory: 'Financial Support',
  },
  {
    label: 'Accommodation issue',
    text: 'I need help with my campus housing situation and room allocation.',
    expectedCategory: 'Accommodation Support',
  },
  {
    label: 'Career guidance',
    text: 'I need help finding an internship.',
    expectedCategory: 'Career Support',
  },
];
