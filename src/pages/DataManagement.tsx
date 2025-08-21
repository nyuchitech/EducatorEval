import React, { useState } from 'react';
import { 
  Upload, 
  Download, 
  Database, 
  RefreshCw, 
  CheckCircle, 
  AlertTriangle,
  FileText,
  Users,
  Calendar,
  Settings,
  Play,
  Pause,
  X,
  Eye,
  Edit
} from 'lucide-react';

interface ProcessingJob {
  id: number;
  type: string;
  filename?: string;
  source?: string;
  status: 'completed' | 'processing' | 'failed';
  progress: number;
  records: number;
  errors: number;
  startTime: string;
  endTime: string | null;
}

interface ApiConnection {
  id: number;
  name: string;
  type: string;
  status: 'connected' | 'error' | 'disconnected';
  lastSync: string;
  endpoint: string;
  recordCount: number;
}

export default function DataManagement() {
  const [activeTab, setActiveTab] = useState('import');
  const [importMethod, setImportMethod] = useState('csv');
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [processingJobs, setProcessingJobs] = useState<ProcessingJob[]>([
    {
      id: 1,
      type: 'CSV Import',
      filename: 'teachers_data.csv',
      status: 'completed',
      progress: 100,
      records: 150,
      errors: 0,
      startTime: '2025-08-20 14:30',
      endTime: '2025-08-20 14:32'
    },
    {
      id: 2,
      type: 'BigQuery Sync',
      source: 'Student Analytics',
      status: 'processing',
      progress: 65,
      records: 2847,
      errors: 3,
      startTime: '2025-08-20 15:00',
      endTime: null
    },
    {
      id: 3,
      type: 'API Import',
      source: 'SIS Integration',
      status: 'failed',
      progress: 45,
      records: 0,
      errors: 15,
      startTime: '2025-08-20 13:15',
      endTime: '2025-08-20 13:20'
    }
  ]);

  const [apiConnections, setApiConnections] = useState<ApiConnection[]>([
    {
      id: 1,
      name: 'Student Information System',
      type: 'SIS',
      status: 'connected',
      lastSync: '2025-08-20 14:00',
      endpoint: 'https://api.schoolsis.edu/v1',
      recordCount: 1250
    },
    {
      id: 2,
      name: 'Google BigQuery',
      type: 'Analytics',
      status: 'connected',
      lastSync: '2025-08-20 15:00',
      endpoint: 'bigquery.googleapis.com',
      recordCount: 5680
    },
    {
      id: 3,
      name: 'Learning Management System',
      type: 'LMS',
      status: 'error',
      lastSync: '2025-08-19 16:30',
      endpoint: 'https://lms.school.edu/api',
      recordCount: 0
    }
  ]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadStatus('uploading');
      // Simulate upload process
      setTimeout(() => {
        setUploadStatus('processing');
        setTimeout(() => {
          setUploadStatus('completed');
          // Add new job to processing list
          const newJob: ProcessingJob = {
            id: processingJobs.length + 1,
            type: 'CSV Import',
            filename: file.name,
            status: 'completed',
            progress: 100,
            records: Math.floor(Math.random() * 500) + 50,
            errors: Math.floor(Math.random() * 5),
            startTime: new Date().toLocaleString(),
            endTime: new Date().toLocaleString()
          };
          setProcessingJobs(prev => [newJob, ...prev]);
        }, 2000);
      }, 1000);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'processing':
        return <RefreshCw className="w-5 h-5 text-blue-500 animate-spin" />;
      case 'failed':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default:
        return <RefreshCw className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      'completed': 'bg-green-100 text-green-800',
      'processing': 'bg-blue-100 text-blue-800',
      'failed': 'bg-red-100 text-red-800',
      'connected': 'bg-green-100 text-green-800',
      'error': 'bg-red-100 text-red-800',
      'disconnected': 'bg-gray-100 text-gray-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
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
              <h1 className="text-2xl font-bold text-gray-900">Data Management</h1>
              <p className="text-sm text-gray-600 mt-1">Import, export, and sync observation data for CRP in Action initiative</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium">
                <Download className="w-4 h-4 inline mr-2" />
                Export Data
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium">
                <Settings className="w-4 h-4 inline mr-2" />
                Configure
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="px-6">
          <nav className="flex space-x-8">
            {[
              { id: 'import', label: 'Data Import', icon: Upload },
              { id: 'export', label: 'Data Export', icon: Download },
              { id: 'connections', label: 'API Connections', icon: Database },
              { id: 'jobs', label: 'Processing Jobs', icon: RefreshCw }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Import Tab */}
        {activeTab === 'import' && (
          <div className="max-w-4xl">
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Import Method</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {[
                  { id: 'csv', label: 'CSV Upload', description: 'Upload CSV files with teacher, student, or observation data' },
                  { id: 'api', label: 'API Integration', description: 'Connect to external systems via REST APIs' },
                  { id: 'bigquery', label: 'BigQuery Sync', description: 'Import data directly from Google BigQuery' }
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setImportMethod(method.id)}
                    className={`p-4 border rounded-lg text-left transition-all ${
                      importMethod === method.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <h3 className="font-medium text-gray-900 mb-2">{method.label}</h3>
                    <p className="text-sm text-gray-600">{method.description}</p>
                  </button>
                ))}
              </div>

              {/* CSV Upload */}
              {importMethod === 'csv' && (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Upload CSV File</h3>
                  <p className="text-gray-600 mb-4">Drag and drop your CSV file here, or click to select</p>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="csv-upload"
                  />
                  <label
                    htmlFor="csv-upload"
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 cursor-pointer inline-block"
                  >
                    Select File
                  </label>
                  
                  {uploadStatus && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-center space-x-2">
                        {uploadStatus === 'uploading' && <RefreshCw className="w-4 h-4 animate-spin text-blue-500" />}
                        {uploadStatus === 'processing' && <RefreshCw className="w-4 h-4 animate-spin text-blue-500" />}
                        {uploadStatus === 'completed' && <CheckCircle className="w-4 h-4 text-green-500" />}
                        <span className="text-sm font-medium">
                          {uploadStatus === 'uploading' && 'Uploading file...'}
                          {uploadStatus === 'processing' && 'Processing data...'}
                          {uploadStatus === 'completed' && 'Upload completed successfully!'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* API Integration */}
              {importMethod === 'api' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">API Endpoint</label>
                    <input
                      type="url"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://api.example.com/v1/data"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Authentication Type</label>
                      <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>API Key</option>
                        <option>OAuth 2.0</option>
                        <option>Basic Auth</option>
                        <option>Bearer Token</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Data Format</label>
                      <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>JSON</option>
                        <option>XML</option>
                        <option>CSV</option>
                      </select>
                    </div>
                  </div>
                  <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
                    Test Connection
                  </button>
                </div>
              )}

              {/* BigQuery Sync */}
              {importMethod === 'bigquery' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Project ID</label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your-gcp-project-id"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Dataset</label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="education_data"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Table</label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="observations"
                    />
                  </div>
                  <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
                    Start Sync
                  </button>
                </div>
              )}
            </div>

            {/* Import Templates */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">CSV Templates</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: 'Teachers Template', description: 'Import teacher information and classroom assignments', icon: Users },
                  { name: 'Observers Template', description: 'Import observer credentials and framework access', icon: Users },
                  { name: 'CRP Observations Template', description: 'Import existing observation records with 10 look-fors', icon: FileText }
                ].map((template, index) => {
                  const Icon = template.icon;
                  return (
                    <div key={index} className="border border-gray-300 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <Icon className="w-5 h-5 text-blue-500" />
                        <h3 className="font-medium text-gray-900">{template.name}</h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                      <button className="text-blue-600 text-sm font-medium hover:text-blue-800">
                        Download Template
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* API Connections Tab */}
        {activeTab === 'connections' && (
          <div className="max-w-6xl">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">API Connections</h2>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 font-medium">
                    Add Connection
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Connection</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Sync</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Records</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {apiConnections.map((connection) => (
                      <tr key={connection.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{connection.name}</div>
                            <div className="text-sm text-gray-500">{connection.endpoint}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {connection.type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(connection.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {connection.lastSync}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {connection.recordCount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <RefreshCw className="w-4 h-4" />
                            </button>
                            <button className="text-gray-600 hover:text-gray-900">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Processing Jobs Tab */}
        {activeTab === 'jobs' && (
          <div className="max-w-6xl">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Processing Jobs</h2>
              </div>

              <div className="divide-y divide-gray-200">
                {processingJobs.map((job) => (
                  <div key={job.id} className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {getStatusIcon(job.status)}
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">
                            {job.type} - {job.filename || job.source}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Started: {job.startTime} {job.endTime && `• Completed: ${job.endTime}`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm text-gray-900">{job.records} records</p>
                          {job.errors > 0 && (
                            <p className="text-sm text-red-600">{job.errors} errors</p>
                          )}
                        </div>
                        {getStatusBadge(job.status)}
                      </div>
                    </div>
                    
                    {job.status === 'processing' && (
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                          <span>Progress</span>
                          <span>{job.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${job.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Export Tab */}
        {activeTab === 'export' && (
          <div className="max-w-4xl">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Export Data</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Data Type</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>All Observations</option>
                    <option>Teacher Data</option>
                    <option>Student Data</option>
                    <option>Framework Responses</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>CSV</option>
                    <option>Excel (XLSX)</option>
                    <option>JSON</option>
                    <option>PDF Report</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="date"
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Download File</option>
                    <option>Email Report</option>
                    <option>Google Drive</option>
                    <option>BigQuery</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-6 flex space-x-3">
                <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 font-medium">
                  Generate Export
                </button>
                <button className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 font-medium">
                  Schedule Export
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}