import React, { useState } from 'react';
import { Upload, RefreshCw, CheckCircle } from 'lucide-react';

const FileUpload: React.FC = () => {
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadStatus('uploading');
      // Simulate upload process
      setTimeout(() => {
        setUploadStatus('processing');
        setTimeout(() => {
          setUploadStatus('completed');
          // In a real application, you would handle the file upload and processing here
          console.log('File uploaded and processed:', file.name);
        }, 2000);
      }, 1000);
    }
  };

  return (
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
  );
};

export default FileUpload;