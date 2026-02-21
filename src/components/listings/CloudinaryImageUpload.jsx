// Cloudinary Image Upload Component
import { useState, useRef } from 'react';
import { Upload, X, Loader } from 'lucide-react';

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export default function CloudinaryImageUpload({ images = [], onImagesChange, maxImages = 10 }) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    formData.append('cloud_name', CLOUDINARY_CLOUD_NAME);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      throw error;
    }
  };

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length === 0) return;
    
    if (images.length + files.length > maxImages) {
      alert(`You can only upload up to ${maxImages} images`);
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      const uploadPromises = files.map(async (file, index) => {
        const url = await uploadToCloudinary(file);
        setUploadProgress(((index + 1) / files.length) * 100);
        return url;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      onImagesChange([...images, ...uploadedUrls]);
    } catch (error) {
      alert('Failed to upload images. Please try again.');
    } finally {
      setUploading(false);
      setUploadProgress(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  const moveImage = (fromIndex, toIndex) => {
    const newImages = [...images];
    const [removed] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, removed);
    onImagesChange(newImages);
  };

  return (
    <div className="space-y-4">
      {/* Upload Button */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
        disabled={uploading || images.length >= maxImages}
      />

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading || images.length >= maxImages}
        className={`w-full border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
          uploading || images.length >= maxImages
            ? 'border-gray-200 bg-gray-50 cursor-not-allowed'
            : 'border-gray-300 hover:border-orange-500 hover:bg-orange-50'
        }`}
      >
        {uploading ? (
          <div>
            <Loader className="w-12 h-12 mx-auto mb-2 text-orange-500 animate-spin" />
            <p className="text-gray-600">Uploading... {Math.round(uploadProgress)}%</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-orange-500 h-2 rounded-full transition-all"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        ) : images.length >= maxImages ? (
          <div>
            <Upload className="w-12 h-12 mx-auto mb-2 text-gray-400" />
            <p className="text-gray-500">Maximum {maxImages} photos reached</p>
          </div>
        ) : (
          <div>
            <Upload className="w-12 h-12 mx-auto mb-2 text-gray-400" />
            <p className="text-gray-600 font-medium">Click to upload photos</p>
            <p className="text-sm text-gray-500 mt-1">
              {images.length}/{maxImages} photos uploaded
            </p>
          </div>
        )}
      </button>

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200">
                <img
                  src={image}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Cover Badge */}
              {index === 0 && (
                <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded font-medium">
                  Cover Photo
                </div>
              )}

              {/* Remove Button */}
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Move Buttons */}
              <div className="absolute bottom-2 left-2 right-2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => moveImage(index, index - 1)}
                    className="bg-white bg-opacity-90 text-gray-700 px-2 py-1 rounded text-sm hover:bg-opacity-100"
                  >
                    ←
                  </button>
                )}
                {index < images.length - 1 && (
                  <button
                    type="button"
                    onClick={() => moveImage(index, index + 1)}
                    className="bg-white bg-opacity-90 text-gray-700 px-2 py-1 rounded text-sm hover:bg-opacity-100 ml-auto"
                  >
                    →
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}