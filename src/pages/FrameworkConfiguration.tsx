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

export default function FrameworkConfiguration() {
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
        ...prev!,
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
            ...prev!,
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
        ...prev!,
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">CRP in Action Framework</h1>
              <p className="text-sm text-gray-600 mt-1">Configure the Integrated Observation Tool for culturally responsive practices</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium">
                <Copy className="w-4 h-4 inline mr-2" />
                Duplicate
              </button>
              <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium">
                <Eye className="w-4 h-4 inline mr-2" />
                Preview
              </button>
              <button 
                onClick={() => setEditMode(!editMode)}
                className={`px-4 py-2 rounded-lg font-medium ${
                  editMode 
                    ? 'bg-green-500 text-white hover:bg-green-600' 
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                {editMode ? (
                  <>
                    <Save className="w-4 h-4 inline mr-2" />
                    Save Changes
                  </>
                ) : (
                  <>
                    <Edit className="w-4 h-4 inline mr-2" />
                    Edit Framework
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Framework Overview */}
        <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-gray-900">CRP in Action Framework Structure</h2>
            <span className="text-sm text-gray-600">
              Goal: 5,000 observations by May 2026 • 70% CRP evidence target
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-700">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded font-medium">
              📋 {currentFramework?.name || 'Framework'}
            </span>
            <span className="text-gray-400">contains</span>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded font-medium">
              📂 {(currentFramework?.sections || []).length} Section
            </span>
            <span className="text-gray-400">with</span>
            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded font-medium">
              ❓ {(currentFramework?.sections || []).reduce((total, section) => total + (section.questions?.length || 0), 0)} Look-Fors
            </span>
            <span className="text-gray-400">•</span>
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded font-medium">
              👥 80 Observers
            </span>
          </div>
        </div>
      </div>

      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r flex flex-col">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Frameworks</h3>
            <select
              value={selectedFramework}
              onChange={(e) => setSelectedFramework(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="crp-in-action">CRP in Action: Integrated Observation Tool</option>
            </select>
          </div>

          {/* Framework Info */}
          <div className="p-6 border-b">
            <div className="mb-4">
              <h4 className="text-lg font-semibold text-gray-900 mb-1">{currentFramework?.name || 'Framework'}</h4>
              <p className="text-sm text-gray-600">{currentFramework?.description || ''}</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Status</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  (currentFramework?.status || 'inactive') === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {currentFramework?.status || 'inactive'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Version</span>
                <span className="text-sm text-gray-900">{currentFramework?.version || 'N/A'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Modified</span>
                <span className="text-sm text-gray-900">{currentFramework?.lastModified || 'N/A'}</span>
              </div>
            </div>

            <div className="mt-4">
              <span className="text-sm font-medium text-gray-500 block mb-2">Tags</span>
              <div className="flex flex-wrap gap-1">
                {(currentFramework?.tags || []).map(tag => (
                  <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sections */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-gray-900">Framework Sections</h4>
                <span className="text-xs text-gray-500">{(currentFramework?.sections || []).length} sections</span>
              </div>
              <div className="space-y-2">
                {(currentFramework?.sections || []).map((section, index) => (
                  <button
                    key={section.id}
                    onClick={() => setSelectedSection(index)}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                      selectedSection === index
                        ? 'bg-blue-50 border-blue-200 text-blue-900'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs px-2 py-1 rounded font-medium ${
                          selectedSection === index ? 'bg-blue-200 text-blue-800' : 'bg-gray-100 text-gray-600'
                        }`}>
                          Section {index + 1}
                        </span>
                        <span className="font-medium text-sm">{section.title}</span>
                      </div>
                      <span className="text-xs text-gray-500">{section.questions.length}Q</span>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{section.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Weight: {section.weight}%</span>
                      <div className="flex items-center space-x-1">
                        <span className="text-xs text-green-600">
                          {section.questions.filter(q => q.required).length} required
                        </span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-blue-600">
                          {section.questions.filter(q => !q.required).length} optional
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              
              {editMode && (
                <button className="w-full mt-3 p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors">
                  <Plus className="w-4 h-4 inline mr-2" />
                  Add New Section
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {/* Breadcrumb Navigation */}
            <div className="mb-6 flex items-center space-x-2 text-sm">
              <span className="text-blue-600 font-medium">{currentFramework?.name || 'Framework'}</span>
              <span className="text-gray-400">→</span>
              <span className="text-gray-600">Section {selectedSection + 1} of {(currentFramework?.sections || []).length}</span>
              <span className="text-gray-400">→</span>
              <span className="text-gray-900 font-medium">{currentSection?.title || 'Section'}</span>
            </div>

            {/* Section Header */}
            <div className="mb-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                    <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded font-medium">
                      Section {selectedSection + 1}
                    </span>
                    <span>{currentSection?.title || 'Section'}</span>
                  </h2>
                  <p className="text-gray-600 mt-1">{currentSection?.description || ''}</p>
                </div>
                {editMode && (
                  <button
                    onClick={() => setShowAddQuestion(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 hover:bg-blue-600"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Question</span>
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="bg-white rounded p-3 border">
                  <span className="font-medium text-gray-500 block">Section Weight</span>
                  <span className="text-lg font-semibold text-gray-900">{currentSection?.weight || 0}%</span>
                </div>
                <div className="bg-white rounded p-3 border">
                  <span className="font-medium text-gray-500 block">Total Questions</span>
                  <span className="text-lg font-semibold text-gray-900">{currentSection?.questions?.length || 0}</span>
                </div>
                <div className="bg-white rounded p-3 border">
                  <span className="font-medium text-gray-500 block">Required Questions</span>
                  <span className="text-lg font-semibold text-gray-900">
                    {(currentSection?.questions || []).filter(q => q.required).length}
                  </span>
                </div>
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-4">
              {(currentSection?.questions || []).length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No questions in this section</h3>
                  <p className="text-gray-500 mb-4">Get started by adding your first question to this section.</p>
                  {editMode && (
                    <button
                      onClick={() => setShowAddQuestion(true)}
                      className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2 hover:bg-blue-600 mx-auto"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add First Question</span>
                    </button>
                  )}
                </div>
              ) : (
                (currentSection?.questions || []).map((question, index) => (
                  <div key={question.id} className="bg-white rounded-lg border-l-4 border-l-blue-500 shadow-sm border border-gray-200 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                            Question {index + 1}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            question.required 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {question.required ? 'Required' : 'Optional'}
                          </span>
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                            {questionTypes.find(t => t.value === question.type)?.label}
                          </span>
                          <span className="text-xs text-gray-500">
                            Weight: {question.weight}%
                          </span>
                        </div>
                        
                        <h3 className="text-lg font-medium text-gray-900 mb-3 leading-relaxed">{question.text}</h3>
                        
                        {question.helpText && (
                          <div className="bg-blue-50 border-l-4 border-blue-200 p-3 mb-4">
                            <p className="text-sm text-gray-700">
                              <span className="font-medium text-blue-800">Help: </span>
                              {question.helpText}
                            </p>
                          </div>
                        )}
                        
                        {/* Question Details Grid */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                          <div className="bg-gray-50 rounded p-3">
                            <span className="text-xs font-medium text-gray-500 block">Type</span>
                            <span className="text-sm text-gray-900">{questionTypes.find(t => t.value === question.type)?.label}</span>
                          </div>
                          {question.scale && (
                            <div className="bg-gray-50 rounded p-3">
                              <span className="text-xs font-medium text-gray-500 block">Scale</span>
                              <span className="text-sm text-gray-900">1 to {question.scale}</span>
                            </div>
                          )}
                          <div className="bg-gray-50 rounded p-3">
                            <span className="text-xs font-medium text-gray-500 block">Weight</span>
                            <span className="text-sm text-gray-900">{question.weight}%</span>
                          </div>
                          <div className="bg-gray-50 rounded p-3">
                            <span className="text-xs font-medium text-gray-500 block">Status</span>
                            <span className="text-sm text-gray-900">{question.required ? 'Required' : 'Optional'}</span>
                          </div>
                        </div>

                        {/* Options for multiselect */}
                        {question.options && question.options.length > 0 && (
                          <div className="mt-3">
                            <span className="text-sm font-medium text-gray-500 block mb-2">Options:</span>
                            <div className="flex flex-wrap gap-2">
                              {question.options.map((option, idx) => (
                                <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                                  {option}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Framework Alignments */}
                        {question.frameworkAlignments && question.frameworkAlignments.length > 0 && (
                          <div className="mt-3">
                            <span className="text-sm font-medium text-gray-500 block mb-2">Framework Alignments:</span>
                            <div className="flex flex-wrap gap-2">
                              {question.frameworkAlignments.map(alignmentId => {
                                const framework = frameworkOptions.find(f => f.id === alignmentId);
                                if (!framework) return null;
                                return (
                                  <span 
                                    key={alignmentId} 
                                    className={`px-3 py-1 rounded-full text-xs font-medium border ${getFrameworkColorClasses(framework.color)}`}
                                  >
                                    {framework.label}
                                  </span>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Tags */}
                        {question.tags && question.tags.length > 0 && (
                          <div className="mt-3">
                            <span className="text-sm font-medium text-gray-500 block mb-2">Tags:</span>
                            <div className="flex flex-wrap gap-1">
                              {question.tags.map(tag => (
                                <span key={tag} className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
                                  <Tag className="w-3 h-3 inline mr-1" />
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {editMode && (
                        <div className="flex items-center space-x-2 ml-4">
                          <button
                            onClick={() => moveQuestion(question.id, 'up')}
                            disabled={index === 0}
                            className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                          >
                            <ArrowUp className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => moveQuestion(question.id, 'down')}
                            disabled={index === (currentSection?.questions?.length || 1) - 1}
                            className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                          >
                            <ArrowDown className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => startEditQuestion(question)}
                            className="p-2 text-blue-600 hover:text-blue-800"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => removeQuestion(question.id)}
                            className="p-2 text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Add Question Modal */}
            {showAddQuestion && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Question</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Framework Alignments</label>
                      <div className="space-y-3">
                        <div className="max-h-48 overflow-y-auto border border-gray-300 rounded-lg p-3">
                          {Object.entries(
                            frameworkOptions.reduce((acc, framework) => {
                              if (!acc[framework.category]) acc[framework.category] = [];
                              acc[framework.category].push(framework);
                              return acc;
                            }, {} as Record<string, FrameworkOption[]>)
                          ).map(([category, frameworks]) => (
                            <div key={category} className="mb-4 last:mb-0">
                              <h4 className="text-sm font-medium text-gray-700 mb-2">{category}</h4>
                              <div className="grid grid-cols-1 gap-2">
                                {frameworks.map(framework => (
                                  <label key={framework.id} className="flex items-center">
                                    <input
                                      type="checkbox"
                                      checked={(newQuestion.frameworkAlignments || []).includes(framework.id)}
                                      onChange={(e) => {
                                        if (e.target.checked) {
                                          addFrameworkAlignment(framework.id);
                                        } else {
                                          removeFrameworkAlignment(framework.id);
                                        }
                                      }}
                                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className={`ml-2 px-2 py-1 rounded text-xs ${getFrameworkColorClasses(framework.color)}`}>
                                      {framework.label}
                                    </span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {newQuestion.frameworkAlignments && newQuestion.frameworkAlignments.length > 0 && (
                          <div>
                            <span className="text-sm font-medium text-gray-500 block mb-2">Selected Alignments:</span>
                            <div className="flex flex-wrap gap-2">
                              {newQuestion.frameworkAlignments.map(alignmentId => {
                                const framework = frameworkOptions.find(f => f.id === alignmentId);
                                if (!framework) return null;
                                return (
                                  <span 
                                    key={alignmentId} 
                                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getFrameworkColorClasses(framework.color)}`}
                                  >
                                    {framework.label}
                                    <button
                                      type="button"
                                      onClick={() => removeFrameworkAlignment(alignmentId)}
                                      className="ml-2 hover:opacity-75"
                                    >
                                      <X className="w-3 h-3" />
                                    </button>
                                  </span>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Question Text</label>
                      <textarea
                        value={newQuestion.text || ''}
                        onChange={(e) => setNewQuestion(prev => ({...prev, text: e.target.value}))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={3}
                        placeholder="Enter the question text..."
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Question Type</label>
                        <select
                          value={newQuestion.type || 'rating'}
                          onChange={(e) => setNewQuestion(prev => ({...prev, type: e.target.value}))}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          {questionTypes.map(type => (
                            <option key={type.value} value={type.value}>{type.label}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Weight (%)</label>
                        <input
                          type="number"
                          value={newQuestion.weight || 10}
                          onChange={(e) => setNewQuestion(prev => ({...prev, weight: parseInt(e.target.value)}))}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          min="1"
                          max="100"
                        />
                      </div>
                    </div>

                    {newQuestion.type === 'rating' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Rating Scale</label>
                        <select
                          value={newQuestion.scale || 4}
                          onChange={(e) => setNewQuestion(prev => ({...prev, scale: parseInt(e.target.value)}))}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value={4}>1-4 Scale (CRP Framework Standard)</option>
                          <option value={5}>1-5 Scale</option>
                        </select>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Help Text</label>
                      <textarea
                        value={newQuestion.helpText || ''}
                        onChange={(e) => setNewQuestion(prev => ({...prev, helpText: e.target.value}))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={2}
                        placeholder="Optional help text for observers..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                      <div className="space-y-3">
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyPress={handleTagInputKeyPress}
                            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter a tag (e.g., engagement, assessment)"
                          />
                          <button
                            type="button"
                            onClick={addTag}
                            className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
                          >
                            Add
                          </button>
                        </div>
                        
                        {newQuestion.tags && newQuestion.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {newQuestion.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                              >
                                <Tag className="w-3 h-3 mr-1" />
                                {tag}
                                <button
                                  type="button"
                                  onClick={() => removeTag(tag)}
                                  className="ml-2 text-purple-600 hover:text-purple-800"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </span>
                            ))}
                          </div>
                        )}
                        
                        <p className="text-xs text-gray-500">
                          Tags help categorize and filter questions. Press Enter or click Add to create a tag.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="required"
                        checked={newQuestion.required || false}
                        onChange={(e) => setNewQuestion(prev => ({...prev, required: e.target.checked}))}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="required" className="ml-2 text-sm text-gray-700">Required question</label>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 mt-6">
                    <button
                      onClick={() => setShowAddQuestion(false)}
                      className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={addQuestion}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Add Question
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}