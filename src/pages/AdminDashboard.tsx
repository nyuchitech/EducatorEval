import React, { useState } from 'react';
import { 
  Users, 
  FileText, 
  TrendingUp, 
  Calendar, 
  Download, 
  Upload,
  Settings,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Plus
} from 'lucide-react';

export default function AdminDashboard() {
  const [timeframe, setTimeframe] = useState('this-month');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const stats = [
    { title: 'Total Observations', value: '247', change: '+12%', target: '5,000 by May 2026', icon: FileText, color: 'blue' },
    { title: 'Active Observers', value: '68', change: '+5%', target: '80 target', icon: Users, color: 'green' },
    { title: 'CRP Evidence', value: '68%', change: '+8%', target: '70% goal', icon: TrendingUp, color: 'purple' },
    { title: 'This Week', value: '18', change: '+25%', target: '~32 weekly target', icon: Calendar, color: 'orange' }
  ];

  const recentObservations = [
    {
      id: 1,
      teacher: 'Sarah Johnson',
      subject: 'Mathematics',
      grade: '5th Grade',
      date: '2025-08-19',
      crpEvidence: 8,
      totalLookfors: 10,
      observer: 'Dr. Smith',
      status: 'completed'
    },
    {
      id: 2,
      teacher: 'Michael Brown',
      subject: 'Science',
      grade: '3rd Grade',
      date: '2025-08-19',
      crpEvidence: 7,
      totalLookfors: 10,
      observer: 'Ms. Davis',
      status: 'completed'
    },
    {
      id: 3,
      teacher: 'Emily Wilson',
      subject: 'English',
      grade: '7th Grade',
      date: '2025-08-18',
      crpEvidence: 9,
      totalLookfors: 10,
      observer: 'Dr. Smith',
      status: 'completed'
    },
    {
      id: 4,
      teacher: 'David Chen',
      subject: 'History',
      grade: '6th Grade',
      date: '2025-08-18',
      crpEvidence: null,
      totalLookfors: null,
      observer: 'Ms. Davis',
      status: 'in-progress'
    }
  ];

  const getStatusBadge = (status: string) => {
    const styles = {
      'completed': 'bg-green-100 text-green-800',
      'in-progress': 'bg-yellow-100 text-yellow-800',
      'draft': 'bg-gray-100 text-gray-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {status === 'in-progress' ? 'In Progress' : status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">CRP in Action Dashboard</h1>
              <p className="text-sm text-gray-600 mt-1">Leading with Observation: Culturally Responsive Practices across all learning spaces</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 hover:bg-blue-600 transition-colors">
                <Plus className="w-4 h-4" />
                <span>New Observation</span>
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Filters */}
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Timeframe:</label>
            <select 
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="this-week">This Week</option>
              <option value="this-month">This Month</option>
              <option value="this-quarter">This Quarter</option>
              <option value="this-year">This Year</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Department:</label>
            <select 
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Departments</option>
              <option value="elementary">Elementary</option>
              <option value="middle">Middle School</option>
              <option value="high">High School</option>
            </select>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const colorClasses = {
              blue: 'bg-blue-500',
              green: 'bg-green-500',
              purple: 'bg-purple-500',
              orange: 'bg-orange-500'
            };
            
            return (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <p className="text-sm text-green-600 mt-1">{stat.change} from last period</p>
                    <p className="text-xs text-gray-500 mt-1">{stat.target}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Observations */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Observations</h2>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search observations..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button className="p-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg">
                  <Filter className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CRP Evidence</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Observer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentObservations.map((observation) => (
                  <tr key={observation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{observation.teacher}</div>
                        <div className="text-sm text-gray-500">{observation.grade}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {observation.subject}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(observation.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {observation.crpEvidence !== null ? (
                        <div>
                          <span className={`text-sm font-medium ${
                            observation.crpEvidence >= 7 ? 'text-green-600' : 
                            observation.crpEvidence >= 5 ? 'text-blue-600' : 'text-yellow-600'
                          }`}>
                            {observation.crpEvidence}/{observation.totalLookfors}
                          </span>
                          <div className="text-xs text-gray-500">
                            {Math.round((observation.crpEvidence / observation.totalLookfors!) * 100)}% evidence
                          </div>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">In Progress</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {observation.observer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(observation.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 border border-gray-200 flex items-center space-x-3">
                <Upload className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium">Bulk Upload Data</span>
              </button>
              <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 border border-gray-200 flex items-center space-x-3">
                <Settings className="w-5 h-5 text-purple-500" />
                <span className="text-sm font-medium">Manage Frameworks</span>
              </button>
              <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 border border-gray-200 flex items-center space-x-3">
                <Users className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium">User Management</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm text-gray-900">New observation completed</p>
                  <p className="text-xs text-gray-500">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm text-gray-900">Framework updated</p>
                  <p className="text-xs text-gray-500">1 hour ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm text-gray-900">Bulk data imported</p>
                  <p className="text-xs text-gray-500">3 hours ago</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">API Status</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Operational</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Database</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Healthy</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Last Backup</span>
                <span className="text-xs text-gray-500">2 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}