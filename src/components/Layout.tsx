import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Settings, 
  Database, 
  Smartphone,
  BookOpen,
  Users,
  TrendingUp 
} from 'lucide-react';

const Layout: React.FC = () => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Framework Config', href: '/framework', icon: Settings },
    { name: 'Data Management', href: '/data', icon: Database },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r border-gray-200 flex flex-col">
        {/* Logo/Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-500 p-2 rounded-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">CRP in Action</h1>
              <p className="text-xs text-gray-600">Observation System</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="p-6 border-b border-gray-200">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Goal Progress</span>
              <span className="text-sm font-medium text-blue-600">247/5,000</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '4.9%' }}></div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="text-center">
                <div className="font-medium text-gray-900">68%</div>
                <div className="text-gray-500">CRP Evidence</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-gray-900">68/80</div>
                <div className="text-gray-500">Observers</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6">
          <div className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Observation Link */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <Link
              to="/observe"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 transition-colors"
            >
              <Smartphone className="w-5 h-5" />
              <span>Mobile Observe</span>
            </Link>
          </div>
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
          <div className="text-xs text-gray-500">
            <div className="font-medium mb-1">Strategic Priorities</div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Users className="w-3 h-3" />
                <span>Social-Emotional Well-being</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-3 h-3" />
                <span>Culturally Responsive Teaching</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
