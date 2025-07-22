import React, { useState } from 'react';
import { UserData } from '../KYCRefreshModal';

export interface DocumentUploadStepProps {
  onNext: () => void;
  onPrevious: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  riskProfile: string;
  entityType: string;
  userData?: UserData;
}

interface UploadedFile {
  name: string;
  size: number;
  type: string;
  uploadDate: Date;
}

const DocumentUploadStep: React.FC<DocumentUploadStepProps> = ({
  onNext,
  onPrevious,
  isFirstStep,
  isLastStep,
  userData,
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    setUploading(true);
    
    // Simulate file upload
    setTimeout(() => {
      const newFiles: UploadedFile[] = Array.from(files).map(file => ({
        name: file.name,
        size: file.size,
        type: file.type,
        uploadDate: new Date(),
      }));
      
      setUploadedFiles(prev => [...prev, ...newFiles]);
      setUploading(false);
    }, 1500);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Always allow continue - document upload can be optional for exploration
  const canContinue = true;

  return (
    <div className="kyc-step document-upload-step">
      <div className="step-header">
        <h2>Document Upload</h2>
        <p>Please upload proof of address documents for verification. You can continue to see what's needed and come back to upload documents.</p>
      </div>
      
      <div className="upload-section">
        <div className="upload-requirements">
          <h3>Required Documents</h3>
          <ul>
            <li>Proof of Address (utility bill, bank statement, or lease agreement)</li>
            <li>Document must be dated within the last 3 months</li>
            <li>Document must clearly show your name and address</li>
            <li>Accepted formats: PDF, JPG, PNG (max 10MB per file)</li>
          </ul>
        </div>
        
        <div 
          className={`upload-zone ${dragActive ? 'drag-active' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {uploading ? (
            <div className="upload-loading">
              <div className="loading-spinner"></div>
              <p>Uploading files...</p>
            </div>
          ) : (
            <>
              <div className="upload-icon">📄</div>
              <h3>Drop files here or click to browse</h3>
              <p>Drag and drop your documents here, or click the button below to select files</p>
              <input
                type="file"
                id="file-input"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileInput}
                style={{ display: 'none' }}
              />
              <label htmlFor="file-input" className="btn btn-secondary">
                Select Files
              </label>
            </>
          )}
        </div>
        
        {uploadedFiles.length > 0 && (
          <div className="uploaded-files">
            <h3>Uploaded Files</h3>
            {uploadedFiles.map((file, index) => (
              <div key={index} className="uploaded-file">
                <div className="file-info">
                  <div className="file-name">{file.name}</div>
                  <div className="file-meta">
                    {formatFileSize(file.size)} • Uploaded {file.uploadDate.toLocaleTimeString()}
                  </div>
                </div>
                <button 
                  onClick={() => removeFile(index)}
                  className="remove-file-btn"
                  type="button"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        
        {uploadedFiles.length === 0 && (
          <div style={{
            background: 'var(--color-blue-50)',
            border: '1px solid var(--color-blue-400)',
            borderRadius: '4px',
            padding: '12px',
            marginTop: '16px'
          }}>
            <p style={{
              margin: '0',
              color: 'var(--color-blue-500)',
              font: 'var(--font-body-medium)'
            }}>
              💡 No documents uploaded yet. You can continue to explore other steps and come back to upload documents later.
            </p>
          </div>
        )}
      </div>
      
      <div className="step-actions">
        {!isFirstStep && (
          <button 
            type="button"
            onClick={onPrevious}
            className="btn btn-secondary"
          >
            Previous
          </button>
        )}
        <button 
          onClick={onNext}
          disabled={!canContinue}
          className="btn btn-primary"
        >
          {isLastStep ? 'Complete' : 'Continue'}
        </button>
      </div>
    </div>
  );
};

export default DocumentUploadStep; 