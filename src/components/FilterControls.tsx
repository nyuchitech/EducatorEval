import React, { useState } from 'react';

const FilterControls: React.FC = () => {
  const [timeframe, setTimeframe] = useState('this-month');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  return (
    <div className="mb-6 flex flex-wrap items-center gap-4">
      <div className="flex items-center space-x-2">
        <label className="text-sm font-medium text-gray-700" htmlFor="timeframe">Timeframe:</label>
        <select
          id="timeframe"
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
        <label className="text-sm font-medium text-gray-700" htmlFor="department">Department:</label>
        <select
          id="department"
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all\">All Departments</option>
          <option value=\"elementary\">Elementary</option>
          <option value=\"middle\">Middle School</option>
          <option value=\"high\">High School</option>
        </select>
      </div>
    </div>
  );
};

export default FilterControls;