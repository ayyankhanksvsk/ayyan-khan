
import React, { useState, useRef } from 'react';
import type { ImageState } from '../types';

interface ImageUploaderProps {
  id: string;
  label: string;
  description: string;
  onImageUpload: (imageState: ImageState) => void;
}

const PhotoIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

export const ImageUploader: React.FC<ImageUploaderProps> = ({ id, label, description, onImageUpload }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        if (base64String) {
          onImageUpload({
            src: URL.createObjectURL(file),
            base64: base64String,
            mimeType: file.type
          });
          setPreview(URL.createObjectURL(file));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAreaClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 h-full flex flex-col">
      <h3 className="text-xl font-bold text-gray-800">{label}</h3>
      <p className="text-gray-500 mt-1 mb-4">{description}</p>
      
      <div 
        className="mt-2 flex-grow flex justify-center items-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-blue-500 transition-colors"
        onClick={handleAreaClick}
      >
        {preview ? (
          <img src={preview} alt="Preview" className="max-h-64 object-contain rounded-md" />
        ) : (
          <div className="space-y-1 text-center">
            <PhotoIcon />
            <div className="flex text-sm text-gray-600">
              <span className="relative bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                Upload a file
              </span>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        )}
      </div>
      <input
        id={id}
        name={id}
        type="file"
        className="sr-only"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </div>
  );
};
