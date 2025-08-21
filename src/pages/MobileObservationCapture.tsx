import React, { useState } from 'react';
import { Camera, Mic, MapPin, Save, Send, Clock, User, BookOpen } from 'lucide-react';

interface Teacher {
  id: string;
  name: string;
  currentClass: {
    name: string;
    subject: string;
    room: string;
    period: string;
    grade: string;
  };
}

interface Question {
  id: string;
  text: string;
  type: string;
  scale?: number;
  frameworkAlignments?: string[];
  frameworks?: string;
}

interface ObservationData {
  teacher: string;
  teacherId: string;
  subject: string;
  className: string;
  room: string;
  period: string;
  grade: string;
  duration: number;
  responses: Record<string, string>;
  comments: Record<string, string>;
  overallComment: string;
}

export default function MobileObservationCapture() {
  const [selectedFramework, setSelectedFramework] = useState('crp-in-action');
  const [observationData, setObservationData] = useState<ObservationData>({
    teacher: '',
    teacherId: '',
    subject: '',
    className: '',
    room: '',
    period: '',
    grade: '',
    duration: 30,
    responses: {},
    comments: {},
    overallComment: ''
  });
  const [currentSection, setCurrentSection] = useState(0);

  // Sample teacher schedule data
  const teachers: Teacher[] = [
    {
      id: 'teacher1',
      name: 'Sarah Johnson',
      currentClass: { name: 'Algebra I - Period 3', subject: 'Mathematics', room: 'B205', period: 'Period 3', grade: '9th Grade' }
    },
    {
      id: 'teacher2', 
      name: 'Michael Brown',
      currentClass: { name: 'Biology - Period 2', subject: 'Science', room: 'A108', period: 'Period 2', grade: '10th Grade' }
    },
    {
      id: 'teacher3',
      name: 'Emily Wilson', 
      currentClass: { name: 'English Literature - Period 1', subject: 'English', room: 'C301', period: 'Period 1', grade: '11th Grade' }
    },
    {
      id: 'teacher4',
      name: 'David Chen',
      currentClass: { name: 'World History - Period 4', subject: 'Social Studies', room: 'B112', period: 'Period 4', grade: '9th Grade' }
    }
  ];

  // Framework alignment options
  const frameworkOptions = [
    { id: 'crp-general', label: 'CRP (General)', color: 'green' },
    { id: 'crp-curriculum', label: 'CRP (Curriculum Relevance)', color: 'green' },
    { id: 'casel-social-awareness', label: 'CASEL (Social Awareness)', color: 'pink' },
    { id: 'tripod-care', label: 'Tripod: Care', color: 'blue' },
    { id: 'tripod-clarify', label: 'Tripod: Clarify', color: 'blue' },
    { id: '5-daily-assessment', label: '5 Daily Assessment Practices', color: 'yellow' },
    { id: 'panorama', label: 'Panorama (Student Experience)', color: 'purple' },
    { id: 'inclusive-practices', label: 'Inclusive Practices', color: 'indigo' }
  ];

  const getFrameworkColorClasses = (color: string) => {
    const colorMap = {
      green: 'bg-green-100 text-green-800',
      pink: 'bg-pink-100 text-pink-800',
      blue: 'bg-blue-100 text-blue-800',
      yellow: 'bg-yellow-100 text-yellow-800',
      purple: 'bg-purple-100 text-purple-800',
      indigo: 'bg-indigo-100 text-indigo-800'
    };
    return colorMap[color as keyof typeof colorMap] || 'bg-gray-100 text-gray-800';
  };

  const frameworks = {
    'crp-in-action': {
      name: 'CRP in Action: Integrated Observation Tool',
      sections: [
        {
          title: 'Classroom Observation',
          questions: [
            { 
              id: 'lookfor1', 
              text: 'The learning target is clearly communicated, standards-based, and relevant to students. Students can explain what they are learning and why.', 
              type: 'rating', 
              scale: 4,
              frameworkAlignments: ['5-daily-assessment', 'crp-curriculum', 'tripod-clarify']
            },
            { 
              id: 'lookfor2', 
              text: 'Teacher fosters a respectful, inclusive, and identity-affirming environment where all students feel a sense of belonging.', 
              type: 'rating', 
              scale: 4,
              frameworkAlignments: ['crp-general', 'casel-social-awareness', 'panorama', 'tripod-care']
            },
            { 
              id: 'lookfor3', 
              text: 'Teacher checks for understanding and adjusts instruction in response to student needs.', 
              type: 'rating', 
              scale: 4,
              frameworkAlignments: ['5-daily-assessment', 'tripod-clarify', 'inclusive-practices']
            },
            { 
              id: 'lookfor4', 
              text: 'Teacher uses questioning strategies that increase cognitive demand and promote student thinking.', 
              type: 'rating', 
              scale: 4,
              frameworks: '🎯 5 Daily Assessment Practices, 🌍 CRP (High Expectations), ⚡ Tripod: Challenge'
            },
            { 
              id: 'lookfor5', 
              text: 'Students are engaged in meaningful, collaborative learning experiences with clear roles and expectations.', 
              type: 'rating', 
              scale: 4,
              frameworks: '🌍 CRP, ❤️ CASEL (Relationship Skills), 🎭 Tripod: Captivate & Control, 🧩 Inclusive Practices'
            },
            { 
              id: 'lookfor6', 
              text: 'Teacher demonstrates cultural competence and integrates students\' backgrounds and experiences into the lesson.', 
              type: 'rating', 
              scale: 4,
              frameworks: '🌍 CRP (Learning Partnerships), 🤝 Panorama, ❤️ CASEL (Social Awareness), 💬 Tripod: Confer'
            },
            { 
              id: 'lookfor7', 
              text: 'Teacher actively monitors and supports students during group and independent work.', 
              type: 'rating', 
              scale: 4,
              frameworks: '🎯 5 Daily Assessment Practices, 🔍 Tripod: Control, 🧩 Inclusive Practices'
            },
            { 
              id: 'lookfor8', 
              text: 'Students have opportunities to reflect on and consolidate their learning during and after the lesson.', 
              type: 'rating', 
              scale: 4,
              frameworks: '🎯 5 Daily Assessment Practices, ❤️ CASEL (Self-Management), 🧠 Tripod: Consolidate'
            },
            { 
              id: 'lookfor9', 
              text: 'Teacher builds strong, trusting relationships with students through affirming interactions.', 
              type: 'rating', 
              scale: 4,
              frameworks: '🤝 Panorama, 🌍 CRP, ❤️ CASEL (Relationship Skills), 💬 Tripod: Care'
            },
            { 
              id: 'lookfor10', 
              text: 'Instruction is differentiated and scaffolds support access for diverse learning needs.', 
              type: 'rating', 
              scale: 4,
              frameworks: '🧩 Inclusive Practices, 🌍 CRP, ❤️ CASEL (Equity & Access), 🔍 Tripod: Clarify & Control'
            }
          ]
        }
      ]
    }
  };

  const currentFramework = frameworks[selectedFramework as keyof typeof frameworks];
  const currentQuestions = currentFramework.sections[currentSection]?.questions || [];

  const handleResponseChange = (questionId: string, value: string) => {
    setObservationData(prev => ({
      ...prev,
      responses: { ...prev.responses, [questionId]: value }
    }));
  };

  const handleCommentChange = (questionId: string, comment: string) => {
    setObservationData(prev => ({
      ...prev,
      comments: { ...prev.comments, [questionId]: comment }
    }));
  };

  const renderQuestion = (question: Question) => {
    const value = observationData.responses[question.id] || '';
    const comment = observationData.comments[question.id] || '';

    switch (question.type) {
      case 'rating':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              <select
                value={value}
                onChange={(e) => handleResponseChange(question.id, e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select rating...</option>
                <option value="4">4 - Clearly Observable</option>
                <option value="3">3 - Possibly Present</option>
                <option value="2">2 - Unclear/Minimal</option>
                <option value="1">1 - Not Evident in This Moment</option>
                <option value="not-observed">Not Observed</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Comments & Evidence</label>
              <textarea
                value={comment}
                onChange={(e) => handleCommentChange(question.id, e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg resize-none h-20 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe what you observed for this look-for..."
              />
            </div>
          </div>
        );

      case 'multiselect':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {/* Note: question.options would need to be defined for this to work */}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Comments & Evidence</label>
              <textarea
                value={comment}
                onChange={(e) => handleCommentChange(question.id, e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg resize-none h-20 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe what you observed for this look-for..."
              />
            </div>
          </div>
        );

      case 'text':
        return (
          <textarea
            value={value}
            onChange={(e) => handleResponseChange(question.id, e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg resize-none h-24 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your observations..."
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-6 h-6 text-blue-500" />
              <h1 className="text-lg font-semibold text-gray-900">Live Observation</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">15:23</span>
            </div>
          </div>
        </div>
      </div>

      {/* Class/Teacher Info */}
      <div className="bg-white border-b px-4 py-3">
        <div className="grid grid-cols-1 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Teacher</label>
            <select
              value={observationData.teacherId}
              onChange={(e) => {
                const selectedTeacher = teachers.find(t => t.id === e.target.value);
                if (selectedTeacher) {
                  setObservationData(prev => ({
                    ...prev,
                    teacherId: selectedTeacher.id,
                    teacher: selectedTeacher.name,
                    subject: selectedTeacher.currentClass?.subject || '',
                    className: selectedTeacher.currentClass?.name || '',
                    room: selectedTeacher.currentClass?.room || '',
                    period: selectedTeacher.currentClass?.period || '',
                    grade: selectedTeacher.currentClass?.grade || ''
                  }));
                }
              }}
              className="w-full text-sm border border-gray-300 rounded px-2 py-1"
            >
              <option value="">Select teacher...</option>
              {teachers.map(teacher => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name} - {teacher.currentClass?.name} ({teacher.currentClass?.period})
                </option>
              ))}
            </select>
          </div>
          
          {observationData.teacherId && (
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="font-medium text-gray-600">Class:</span>
                  <div className="text-gray-900">{observationData.className}</div>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Subject:</span>
                  <div className="text-gray-900">{observationData.subject}</div>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Room:</span>
                  <div className="text-gray-900">{observationData.room}</div>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Period:</span>
                  <div className="text-gray-900">{observationData.period}</div>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Grade:</span>
                  <div className="text-gray-900">{observationData.grade}</div>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Duration:</span>
                  <div className="text-gray-900">{observationData.duration} min</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Framework Selector */}
      <div className="bg-white border-b px-4 py-3">
        <select
          value={selectedFramework}
          onChange={(e) => setSelectedFramework(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg text-sm"
        >
          <option value="crp-in-action">CRP in Action: Integrated Observation Tool</option>
        </select>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 py-4">
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-900">
              10 Look-Fors: Integrated Observation
            </h2>
            <p className="text-sm text-gray-600 mt-1">Brief 10-15 minute classroom observation</p>
            
            {/* Progress Indicator */}
            <div className="mt-3 bg-gray-100 rounded-lg p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Progress</span>
                <span className="text-sm text-gray-600">
                  {Object.keys(observationData.responses).length} of {currentQuestions.length} completed
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                  style={{ 
                    width: `${(Object.keys(observationData.responses).length / currentQuestions.length) * 100}%` 
                  }}
                ></div>
              </div>
            </div>
          </div>

          {currentQuestions.map((question, index) => {
            const rating = observationData.responses[question.id];
            const comment = observationData.comments[question.id];
            
            return (
              <div key={question.id} className="bg-white rounded-lg p-4 shadow-sm border">
                <div className="mb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-sm font-medium text-gray-900 flex-1 leading-relaxed">
                        {index + 1}. {question.text}
                      </h3>
                      {rating && (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          rating === '4' ? 'bg-green-100 text-green-800' :
                          rating === '3' ? 'bg-blue-100 text-blue-800' :
                          rating === '2' ? 'bg-yellow-100 text-yellow-800' :
                          rating === '1' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {rating === 'not-observed' ? 'N/O' : rating}
                        </span>
                      )}
                    </div>
                  </div>
                  {question.frameworkAlignments && (
                    <div className="mb-3 p-2 bg-blue-50 rounded text-xs">
                      <strong className="text-blue-800">Aligned Frameworks:</strong>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {question.frameworkAlignments.map(alignmentId => {
                          const framework = frameworkOptions.find(f => f.id === alignmentId);
                          if (!framework) return null;
                          return (
                            <span 
                              key={alignmentId} 
                              className={`px-2 py-1 rounded text-xs ${getFrameworkColorClasses(framework.color)}`}
                            >
                              {framework.label}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  {question.frameworks && (
                    <div className="mb-3 p-2 bg-blue-50 rounded text-xs">
                      <strong className="text-blue-800">Frameworks:</strong>
                      <div className="mt-1 text-blue-700">{question.frameworks}</div>
                    </div>
                  )}
                </div>
                {renderQuestion(question)}
                
                {/* Show completion status */}
                <div className="mt-3 flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    rating ? 'bg-green-500' : 'bg-gray-300'
                  }`}></div>
                  <span className="text-xs text-gray-500">
                    {rating ? 'Completed' : 'Not rated'}
                    {comment && ' • Has comments'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Overall Comments */}
      <div className="bg-white border-t px-4 py-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Overall Observation Comments</label>
          <textarea
            value={observationData.overallComment}
            onChange={(e) => setObservationData(prev => ({...prev, overallComment: e.target.value}))}
            className="w-full p-3 border border-gray-300 rounded-lg resize-none h-24 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="General observations, key strengths, areas for growth, or additional context for this observation..."
          />
        </div>
      </div>

      {/* Media Controls */}
      <div className="bg-white border-t px-4 py-3">
        <div className="flex justify-center space-x-6">
          <button className="flex flex-col items-center space-y-1 p-2">
            <Camera className="w-6 h-6 text-gray-600" />
            <span className="text-xs text-gray-600">Photo</span>
          </button>
          <button className="flex flex-col items-center space-y-1 p-2">
            <Mic className="w-6 h-6 text-gray-600" />
            <span className="text-xs text-gray-600">Audio</span>
          </button>
          <button className="flex flex-col items-center space-y-1 p-2">
            <MapPin className="w-6 h-6 text-gray-600" />
            <span className="text-xs text-gray-600">Location</span>
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-white border-t px-4 py-4">
        <div className="space-y-3">
          {/* Validation Messages */}
          {!observationData.teacherId && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-sm text-yellow-800">Please select a teacher and class to begin observation.</p>
            </div>
          )}
          
          {observationData.teacherId && Object.keys(observationData.responses).length < currentQuestions.length && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-800">
                {currentQuestions.length - Object.keys(observationData.responses).length} look-fors remaining to complete observation.
              </p>
            </div>
          )}
          
          <div className="flex space-x-3">
            <button 
              disabled={!observationData.teacherId}
              className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>Save Draft</span>
            </button>
            <button 
              disabled={!observationData.teacherId || Object.keys(observationData.responses).length === 0}
              className="flex-1 bg-blue-500 text-white py-3 rounded-lg font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:bg-gray-400"
            >
              <Send className="w-4 h-4" />
              <span>Submit</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}