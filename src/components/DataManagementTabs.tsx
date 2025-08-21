import React, { useState } from 'react';
import {
  Upload,
  Download,
  Database,
  RefreshCw,
} from 'lucide-react';

const DataManagementTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('import');

  const tabs = [
    { id: 'import', label: 'Data Import', icon: Upload },
    { id: 'export', label: 'Data Export', icon: Download },
    { id: 'connections', label: 'API Connections', icon: Database },
    { id: 'jobs', label: 'Processing Jobs', icon: RefreshCw },
  ];

  return (
    <div className="bg-white border-b">
      <div className="px-6">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
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
      {/* Placeholder for tab content - This will be handled in the Astro page */}
      {/* You would typically render the content here in a pure React app */}
      {/* but in Astro, we'll use conditional rendering based on activeTab in the .astro file */}
    </div>
  );
};

export default DataManagementTabs;