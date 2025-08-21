import React, { useState } from 'react';
import {
  Plus,
  Edit,
  Trash2,
  Save,
  Copy,
  Eye,
  ArrowUp,
  ArrowDown,
  Settings,
  Tag,
  FileText,
  CheckCircle,
  AlertCircle,
  X
} from 'lucide-react';

interface Question {
  id: string;
  text: string;
  type: string;
  required: boolean;
  scale: number;
  weight: number;
  tags: string[];
  helpText: string;
  options?: string[];
  frameworkAlignments: string[];
}

interface Section {
  id: string;
  title: string;
  description: string;
  weight: number;
  questions: Question[];
}

interface Framework {
  id: string;
  name: string;
  description: string;
  version: string;
  status: string;
  lastModified: string;
  tags: string[];
  sections: Section[];
}

interface FrameworkOption {
  id: string;
  label: string;
  category: string;
  color: string;
}

const FrameworkConfigurator: React.FC = () => {
  const [selectedFramework, setSelectedFramework] = useState('crp-in-action');
  const [editMode, setEditMode] = useState(false);
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [showEditQuestion, setShowEditQuestion] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [selectedSection, setSelectedSection] = useState(0);

  const [frameworks, setFrameworks] = useState<Record<string, Framework>>({
    'crp-in-action': {
      id: 'crp-in-action',
      name: 'CRP in Action: Integrated Observation Tool',
      description: 'Comprehensive evaluation framework integrating Culturally Responsive Practices',
      version: '1.0',
      status: 'active',
      lastModified: '2025-08-15',
      tags: ['crp', 'culturally-responsive', 'assessment'],
      sections: [
        {
          id: 'integrated-lookfors',
          title: '10 Look-Fors: Integrated Observation',
          description: 'Evidence-based look-fors aligned to multiple frameworks',
          weight: 100,
          questions: [
            {
              id: 'lookfor1',
              text: 'The learning target is clearly communicated and relevant to students.',
              type: 'rating',
              required: true,
              scale: 4,
              weight: 10,
              tags: ['learning-targets', 'clarity'],
              helpText: 'Look for visible learning targets and student understanding',
              frameworkAlignments: ['5-daily-assessment', 'crp-curriculum', 'tripod-clarify']
            },
            {
              id: 'lookfor2',
              text: 'Teacher fosters an inclusive environment where all students feel belonging.',
              type: 'rating',
              required: true,
              scale: 4,
              weight: 10,
              tags: ['belonging', 'inclusive'],
              helpText: 'Observe inclusive language and cultural affirmation',
              frameworkAlignments: ['crp-general', 'casel-social-awareness', 'panorama', 'tripod-care']
            },
            {
              id: 'lookfor3',
              text: 'Teacher checks for understanding and adjusts instruction.',
              type: 'rating',
              required: true,
              scale: 4,
              weight: 10,
              tags: ['formative-assessment', 'responsive-teaching'],
              helpText: 'Look for checks for understanding and instructional adjustments',
              frameworkAlignments: ['5-daily-assessment', 'tripod-clarify', 'inclusive-practices']
            }
          ]
        }
      ]
    }
  });

  // Framework alignment options
  const frameworkOptions: FrameworkOption[] = [
    { id: 'crp-general', label: 'CRP (General)', category: 'Culturally Responsive Practices', color: 'green' },
    { id: 'crp-curriculum', label: 'CRP (Curriculum Relevance)', category: 'Culturally Responsive Practices', color: 'green' },
    { id: 'crp-high-expectations', label: 'CRP (High Expectations)', category: 'Culturally Responsive Practices', color: 'green' },
    { id: 'crp-learning-partnerships', label: 'CRP (Learning Partnerships)', category: 'Culturally Responsive Practices', color: 'green' },

    { id: 'casel-self-awareness', label: 'CASEL (Self-Awareness)', category: 'Social-Emotional Learning', color: 'pink' },
    { id: 'casel-social-awareness', label: 'CASEL (Social Awareness)', category: 'Social-Emotional Learning', color: 'pink' },
    { id: 'casel-relationship-skills', label: 'CASEL (Relationship Skills)', category: 'Social-Emotional Learning', color: 'pink' },
    { id: 'casel-self-management', label: 'CASEL (Self-Management)', category: 'Social-Emotional Learning', color: 'pink' },
    { id: 'casel-responsible-decision', label: 'CASEL (Responsible Decision-Making)', category: 'Social-Emotional Learning', color: 'pink' },

    { id: 'tripod-care', label: 'Tripod: Care', category: '7Cs of Learning', color: 'blue' },
    { id: 'tripod-challenge', label: 'Tripod: Challenge', category: '7Cs of Learning', color: 'blue' },
    { id: 'tripod-clarify', label: 'Tripod: Clarify', category: '7Cs of Learning', color: 'blue' },
    { id: 'tripod-captivate', label: 'Tripod: Captivate', category: '7Cs of Learning', color: 'blue' },
    { id: 'tripod-confer', label: 'Tripod: Confer', category: '7Cs of Learning', color: 'blue' },
    { id: 'tripod-consolidate', label: 'Tripod: Consolidate', category: '7Cs of Learning', color: 'blue' },
    { id: 'tripod-control', label: 'Tripod: Control', category: '7Cs of Learning', color: 'blue' },

    { id: '5-daily-assessment', label: '5 Daily Assessment Practices', category: 'Assessment', color: 'yellow' },

    { id: 'panorama', label: 'Panorama (Student Experience)', category: 'Student Experience', color: 'purple' },

    { id: 'inclusive-practices', label: 'Inclusive Practices', category: 'Inclusion & Equity', color: 'indigo' }
  ];

  const [newQuestion, setNewQuestion] = useState<Partial<Question>>({
    text: '',
    type: 'rating',
    required: true,
    scale: 4,
    weight: 10,
    tags: [],
    helpText: '',
    options: [],
    frameworkAlignments: []
  });

  const [tagInput, setTagInput] = useState('');

  const questionTypes = [
    { value: 'rating', label: 'Rating Scale', description: '1-4 rating scale for observation' },
    { value: 'text', label: 'Text Response', description: 'Open-ended text input' },
    { value: 'multiselect', label: 'Multiple Choice', description: 'Select multiple options' },
    { value: 'single-select', label: 'Single Choice', description: 'Select one option' },
    { value: 'yes-no', label: 'Yes/No', description: 'Binary choice question' }
  ];

  const currentFramework = frameworks[selectedFramework] || frameworks['crp-in-action'];
  const currentSection = currentFramework?.sections?.[selectedSection] || currentFramework?.sections?.[0];

  const startEditQuestion = (question: Question) => {
    setEditingQuestion({
      ...question,
      frameworkAlignments: question.frameworkAlignments || []
    });
    setTagInput('');
    setShowEditQuestion(true);
  };

  const saveEditQuestion = () => {
    if (!editingQuestion?.text.trim() || !currentSection) return;

    const updatedFramework = { ...currentFramework };
    const questionIndex = updatedFramework.sections[selectedSection].questions.findIndex(q => q.id === editingQuestion.id);

    if (questionIndex !== -1) {
      updatedFramework.sections[selectedSection].questions[questionIndex] = {
        ...editingQuestion,
        tags: editingQuestion.tags.filter(tag => tag.trim())
      };

      setFrameworks(prev => ({
        ...prev,
        [selectedFramework]: updatedFramework
      }));
    }

    setEditingQuestion(null);
    setTagInput('');
    setShowEditQuestion(false);
  };

  const addFrameworkAlignment = (frameworkId: string) => {
    if (showEditQuestion && editingQuestion) {
      if (!editingQuestion.frameworkAlignments.includes(frameworkId)) {
        setEditingQuestion(prev => ({
          ...prev!,
          frameworkAlignments: [...prev!.frameworkAlignments, frameworkId]
        }));
      }
    } else if (showAddQuestion && newQuestion) {
      if (!newQuestion.frameworkAlignments?.includes(frameworkId)) {
        setNewQuestion(prev => ({
          ...prev,
          frameworkAlignments: [...(prev.frameworkAlignments || []), frameworkId]
        }));
      }
    }
  };

  const removeFrameworkAlignment = (frameworkId: string) => {
    if (showEditQuestion && editingQuestion) {
      setEditingQuestion(prev => ({
        ...prev! as Question,
        frameworkAlignments: prev!.frameworkAlignments.filter(id => id !== frameworkId)
      }));
    } else if (showAddQuestion) {
      setNewQuestion(prev => ({
        ...prev,
        frameworkAlignments: prev.frameworkAlignments?.filter(id => id !== frameworkId)
      }));
    }
  };

  const getFrameworkColorClasses = (color: string) => {
    const colorMap = {
      green: 'bg-green-100 text-green-800 border-green-200',
      pink: 'bg-pink-100 text-pink-800 border-pink-200',
      blue: 'bg-blue-100 text-blue-800 border-blue-200',
      yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      purple: 'bg-purple-100 text-purple-800 border-purple-200',
      indigo: 'bg-indigo-100 text-indigo-800 border-indigo-200'
    };
    return colorMap[color as keyof typeof colorMap] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const addTag = () => {
    const trimmedTag = tagInput.trim().toLowerCase();
    if (trimmedTag) {
      if (showEditQuestion && editingQuestion) {
        if (!editingQuestion.tags.includes(trimmedTag)) {
          setEditingQuestion(prev => ({
            ...prev! as Question,
            tags: [...prev!.tags, trimmedTag]
          }));
          setTagInput('');
        }
      } else if (showAddQuestion) {
        if (!newQuestion.tags?.includes(trimmedTag)) {
          setNewQuestion(prev => ({
            ...prev,
            tags: [...(prev.tags || []), trimmedTag]
          }));
          setTagInput('');
        }
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    if (showEditQuestion && editingQuestion) {
      setEditingQuestion(prev => ({
        ...prev! as Question,
        tags: prev!.tags.filter(tag => tag !== tagToRemove)
      }));
    } else if (showAddQuestion) {
      setNewQuestion(prev => ({
        ...prev,
        tags: prev.tags?.filter(tag => tag !== tagToRemove)
      }));
    }
  };

  const handleTagInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const addQuestion = () => {
    if (!newQuestion.text?.trim() || !currentSection) return;

    const questionId = `q${Date.now()}`;
    const updatedFramework = { ...currentFramework };
    updatedFramework.sections[selectedSection].questions.push({
      ...newQuestion as Question,
      id: questionId,
      tags: (newQuestion.tags || []).filter(tag => tag.trim())
    });

    setFrameworks(prev => ({
      ...prev,
      [selectedFramework]: updatedFramework
    }));

    setNewQuestion({
      text: '',
      type: 'rating',
      required: true,
      scale: 4,
      weight: 10,
      tags: [],
      helpText: '',
      options: [],
      frameworkAlignments: []
    });
    setTagInput('');
    setShowAddQuestion(false);
  };

  const removeQuestion = (questionId: string) => {
    if (!currentSection) return;

    const updatedFramework = { ...currentFramework };
    updatedFramework.sections[selectedSection].questions =
      updatedFramework.sections[selectedSection].questions.filter(q => q.id !== questionId);

    setFrameworks(prev => ({
      ...prev,
      [selectedFramework]: updatedFramework
    }));
  };

  const moveQuestion = (questionId: string, direction: 'up' | 'down') => {
    if (!currentSection) return;

    const updatedFramework = { ...currentFramework };
    const questions = updatedFramework.sections[selectedSection].questions;
    const index = questions.findIndex(q => q.id === questionId);

    if (direction === 'up' && index > 0) {
      [questions[index], questions[index - 1]] = [questions[index - 1], questions[index]];
    } else if (direction === 'down' && index < questions.length - 1) {
      [questions[index], questions[index + 1]] = [questions[index + 1], questions[index]];
    }

    setFrameworks(prev => ({
      ...prev,
      [selectedFramework]: updatedFramework
    }));
  };


  return (
    <div>
      {/* Placeholder for Framework Configuration UI */}
      <div>
        <h1>Framework Configuration</h1>
        <p>State and logic are defined here. UI will be added later.</p>
      </div>
      {showAddQuestion && (
        <div>
          <h2>Add New Question Modal Placeholder</h2>
          <button onClick={() => setShowAddQuestion(false)}>Close Modal</button>
        </div>
      )}
      {showEditQuestion && (
        <div>
          <h2>Edit Question Modal Placeholder</h2>
          <button onClick={() => setShowEditQuestion(false)}>Close Modal</button>
        </div>
      )}
    </div>
  );
};

export default FrameworkConfigurator;