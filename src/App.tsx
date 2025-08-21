import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import AdminDashboard from './pages/AdminDashboard';
import MobileObservationCapture from './pages/MobileObservationCapture';
import FrameworkConfiguration from './pages/FrameworkConfiguration';
import DataManagement from './pages/DataManagement';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Mobile observation route - no layout for fullscreen mobile experience */}
          <Route path="/observe" element={<MobileObservationCapture />} />
          
          {/* Desktop routes with layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="framework" element={<FrameworkConfiguration />} />
            <Route path="data" element={<DataManagement />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
