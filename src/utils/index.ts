// Utility functions for the CRP Observation System

import { FrameworkAlignment } from '../types';

/**
 * Get CSS classes for framework color styling
 */
export const getFrameworkColorClasses = (color: string): string => {
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

/**
 * Calculate CRP evidence percentage from observation responses
 */
export const calculateCRPEvidence = (responses: Record<string, any>): number => {
  const validResponses = Object.values(responses).filter(response => 
    response && response !== 'not-observed' && !isNaN(Number(response))
  );
  
  if (validResponses.length === 0) return 0;
  
  const evidenceCount = validResponses.filter(response => Number(response) >= 3).length;
  return Math.round((evidenceCount / validResponses.length) * 100);
};

/**
 * Format date for display
 */
export const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

/**
 * Format date and time for display
 */
export const formatDateTime = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Calculate observation duration in minutes
 */
export const calculateDuration = (startTime: string, endTime?: string): number => {
  if (!endTime) return 0;
  
  const start = new Date(startTime);
  const end = new Date(endTime);
  return Math.round((end.getTime() - start.getTime()) / (1000 * 60));
};

/**
 * Generate a unique ID
 */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Debounce function for search inputs
 */
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Get progress color based on percentage
 */
export const getProgressColor = (percentage: number): string => {
  if (percentage >= 70) return 'bg-green-500';
  if (percentage >= 50) return 'bg-blue-500';
  if (percentage >= 30) return 'bg-yellow-500';
  return 'bg-red-500';
};

/**
 * Format large numbers with commas
 */
export const formatNumber = (num: number): string => {
  return num.toLocaleString();
};

/**
 * Get status badge color classes
 */
export const getStatusBadgeColor = (status: string): string => {
  const statusMap = {
    'completed': 'bg-green-100 text-green-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    'processing': 'bg-blue-100 text-blue-800',
    'draft': 'bg-gray-100 text-gray-800',
    'failed': 'bg-red-100 text-red-800',
    'error': 'bg-red-100 text-red-800',
    'active': 'bg-green-100 text-green-800',
    'inactive': 'bg-gray-100 text-gray-800',
    'connected': 'bg-green-100 text-green-800',
    'disconnected': 'bg-gray-100 text-gray-800'
  };
  return statusMap[status as keyof typeof statusMap] || 'bg-gray-100 text-gray-800';
};

/**
 * Calculate progress toward observation goal
 */
export const calculateGoalProgress = (current: number, target: number): number => {
  if (target === 0) return 0;
  return Math.min(Math.round((current / target) * 100), 100);
};

/**
 * Group array by key
 */
export const groupBy = <T>(array: T[], key: keyof T): Record<string, T[]> => {
  return array.reduce((groups, item) => {
    const groupKey = String(item[key]);
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(item);
    return groups;
  }, {} as Record<string, T[]>);
};

/**
 * Filter observations by date range
 */
export const filterByDateRange = <T extends { date: string }>(
  items: T[],
  startDate?: string,
  endDate?: string
): T[] => {
  if (!startDate && !endDate) return items;
  
  return items.filter(item => {
    const itemDate = new Date(item.date);
    if (startDate && itemDate < new Date(startDate)) return false;
    if (endDate && itemDate > new Date(endDate)) return false;
    return true;
  });
};

/**
 * Convert file to base64 for upload
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert file to base64'));
      }
    };
    reader.onerror = error => reject(error);
  });
};

/**
 * Extract framework alignments by category
 */
export const groupFrameworksByCategory = (
  frameworks: FrameworkAlignment[]
): Record<string, FrameworkAlignment[]> => {
  return frameworks.reduce((acc, framework) => {
    if (!acc[framework.category]) {
      acc[framework.category] = [];
    }
    acc[framework.category].push(framework);
    return acc;
  }, {} as Record<string, FrameworkAlignment[]>);
};

/**
 * Validate observation data completeness
 */
export const validateObservationData = (observation: any): string[] => {
  const errors: string[] = [];
  
  if (!observation.teacherId) {
    errors.push('Teacher selection is required');
  }
  
  if (!observation.frameworkId) {
    errors.push('Framework selection is required');
  }
  
  if (!observation.responses || Object.keys(observation.responses).length === 0) {
    errors.push('At least one response is required');
  }
  
  return errors;
};

/**
 * Generate CSV content from data
 */
export const generateCSV = (data: any[], headers: string[]): string => {
  const csvHeaders = headers.join(',');
  const csvRows = data.map(row => 
    headers.map(header => {
      const value = row[header] || '';
      // Escape quotes and wrap in quotes if contains comma
      const stringValue = String(value).replace(/"/g, '""');
      return stringValue.includes(',') ? `"${stringValue}"` : stringValue;
    }).join(',')
  );
  
  return [csvHeaders, ...csvRows].join('\n');
};

/**
 * Download data as file
 */
export const downloadFile = (content: string, filename: string, mimeType: string = 'text/plain'): void => {
  const blob = new Blob([content], { type: mimeType });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

/**
 * Check if device is mobile
 */
export const isMobile = (): boolean => {
  return window.innerWidth <= 768;
};

/**
 * Get current time as string
 */
export const getCurrentTime = (): string => {
  return new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
};
