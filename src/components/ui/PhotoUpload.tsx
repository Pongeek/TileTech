'use client';

import { useState, useRef } from 'react';
import { usePhotoUpload } from '@/hooks/usePhotoUpload';
import Image from 'next/image';

interface PhotoUploadProps {
  onUploadComplete?: (success: boolean) => void;
  allowedFileTypes?: string[];
  maxFileSize?: number; // in bytes
}

export default function PhotoUpload({ 
  onUploadComplete,
  allowedFileTypes = ['image/jpeg', 'image/png', 'image/webp'],
  maxFileSize = 10 * 1024 * 1024, // 10MB default
}: PhotoUploadProps) {
  const { upload, progress, reset } = usePhotoUpload();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('general');
  const [tags, setTags] = useState('');
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    
    const selectedFile = e.target.files[0];
    
    // Validate file type
    if (!allowedFileTypes.includes(selectedFile.type)) {
      setError(`Invalid file type. Allowed types: ${allowedFileTypes.join(', ')}`);
      return;
    }
    
    // Validate file size
    if (selectedFile.size > maxFileSize) {
      setError(`File is too large. Maximum size: ${maxFileSize / (1024 * 1024)}MB`);
      return;
    }
    
    setFile(selectedFile);
    
    // Create preview
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);
    
    // Clean up the preview URL when component unmounts
    return () => URL.revokeObjectURL(objectUrl);
  };

  // Handle drag events
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setError(null);
    
    if (!e.dataTransfer.files || e.dataTransfer.files.length === 0) {
      return;
    }
    
    const droppedFile = e.dataTransfer.files[0];
    
    // Validate file type
    if (!allowedFileTypes.includes(droppedFile.type)) {
      setError(`Invalid file type. Allowed types: ${allowedFileTypes.join(', ')}`);
      return;
    }
    
    // Validate file size
    if (droppedFile.size > maxFileSize) {
      setError(`File is too large. Maximum size: ${maxFileSize / (1024 * 1024)}MB`);
      return;
    }
    
    setFile(droppedFile);
    
    // Create preview
    const objectUrl = URL.createObjectURL(droppedFile);
    setPreviewUrl(objectUrl);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select a file to upload');
      return;
    }
    
    try {
      console.log('Starting upload...');
      const photo = await upload(file, {
        title,
        description,
        category,
        tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
      });
      
      if (photo) {
        // Reset form
        setFile(null);
        setPreviewUrl(null);
        setTitle('');
        setDescription('');
        setCategory('general');
        setTags('');
        setError(null);
        reset();
        
        // Notify parent component
        if (onUploadComplete) {
          onUploadComplete(true);
        }
        
        console.log('Upload completed successfully', photo);
      } else {
        setError('Upload failed');
        if (onUploadComplete) {
          onUploadComplete(false);
        }
      }
    } catch (err) {
      console.error('Error in upload:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      if (onUploadComplete) {
        onUploadComplete(false);
      }
    }
  };

  // Trigger file selector click
  const handleSelectFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Reset form
  const handleCancel = () => {
    setFile(null);
    setPreviewUrl(null);
    setTitle('');
    setDescription('');
    setCategory('general');
    setTags('');
    setError(null);
    reset();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Upload Photo</h2>
      
      {/* Error display */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          <p className="font-medium">Error: {error}</p>
        </div>
      )}
      
      {/* Progress bar */}
      {progress.status === 'uploading' && (
        <div className="mb-4">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 transition-all duration-300 ease-in-out"
              style={{ width: `${progress.percentage}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-1">Uploading... {progress.percentage}%</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        {/* File drop zone */}
        <div 
          className={`border-2 border-dashed rounded-lg p-6 mb-4 text-center cursor-pointer
            ${previewUrl ? 'border-green-400 bg-green-50' : 'border-gray-300 hover:border-blue-400'}
          `}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleSelectFileClick}
        >
          <input 
            type="file" 
            className="hidden" 
            accept={allowedFileTypes.join(',')}
            onChange={handleFileChange}
            ref={fileInputRef}
          />
          
          {previewUrl ? (
            <div className="relative h-48 mx-auto">
              <Image 
                src={previewUrl} 
                alt="Preview" 
                className="object-contain mx-auto rounded" 
                fill 
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>
          ) : (
            <div>
              <p className="text-lg mb-2">Drag & drop your photo here</p>
              <p className="text-sm text-gray-500 mb-3">or click to browse files</p>
              <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-xs text-gray-500 mt-3">
                Supported formats: {allowedFileTypes.map(type => type.split('/')[1]).join(', ')}
              </p>
              <p className="text-xs text-gray-500">
                Maximum size: {maxFileSize / (1024 * 1024)}MB
              </p>
            </div>
          )}
        </div>
        
        {/* Metadata fields */}
        <div className="space-y-4 mb-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter a title for your photo"
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe your photo"
              rows={3}
            />
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="general">General</option>
              <option value="project">Project</option>
              <option value="testimonial">Testimonial</option>
              <option value="service">Service</option>
              <option value="product">Product</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
              Tags
            </label>
            <input
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter tags separated by commas (e.g., bathroom, tile, renovation)"
            />
          </div>
        </div>
        
        {/* Buttons */}
        <div className="flex space-x-3">
          <button
            type="submit"
            disabled={!file || progress.status === 'uploading'}
            className={`px-4 py-2 rounded-md text-white font-medium
              ${!file || progress.status === 'uploading'
                ? 'bg-blue-300 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'}
            `}
          >
            {progress.status === 'uploading' ? 'Uploading...' : 'Upload Photo'}
          </button>
          
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
} 