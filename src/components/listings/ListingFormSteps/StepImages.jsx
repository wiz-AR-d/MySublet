import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

export default function StepImages({ formData, updateFormData, errors }) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length === 0) return;

    setUploading(true);

    try {
      // For now, we'll use the file URLs directly (from Unsplash or file input)
      // In production, you'd upload to Supabase Storage or Cloudinary
      const imagePromises = files.map(async (file) => {
        // If it's a URL (for demo purposes), use it directly
        if (typeof file === 'string') {
          return file;
        }

        // Otherwise, create a preview URL (in production, upload to storage first)
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(file);
        });
      });

      const newImages = await Promise.all(imagePromises);
      updateFormData({ images: [...(formData.images || []), ...newImages] });
    } catch (error) {
      console.error('Error uploading images:', error);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    updateFormData({ images: newImages });
  };

  const moveImage = (fromIndex, toIndex) => {
    const newImages = [...formData.images];
    const [removed] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, removed);
    updateFormData({ images: newImages });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Photos *
        </label>
        <p className="text-sm text-gray-500 mb-4">
          Add at least one photo. You can upload up to 10 photos. The first photo will be the cover image.
        </p>

        {/* Upload Button */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="hidden"
          disabled={uploading || formData.images?.length >= 10}
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading || formData.images?.length >= 10}
          className={`w-full border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            uploading || formData.images?.length >= 10
              ? 'border-gray-200 bg-gray-50 cursor-not-allowed'
              : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
          }`}
        >
          <Upload className={`w-12 h-12 mx-auto mb-2 ${uploading ? 'text-gray-400' : 'text-gray-400'}`} />
          {uploading ? (
            <p className="text-gray-500">Uploading...</p>
          ) : formData.images?.length >= 10 ? (
            <p className="text-gray-500">Maximum 10 photos reached</p>
          ) : (
            <p className="text-gray-600 font-medium">Click to upload photos</p>
          )}
        </button>

        {errors.images && (
          <p className="mt-2 text-sm text-red-600">{errors.images}</p>
        )}
      </div>

      {/* Image Preview Grid */}
      {formData.images && formData.images.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Uploaded Photos ({formData.images.length}/10)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {formData.images.map((image, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200">
                  <img
                    src={image}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Cover Badge */}
                {index === 0 && (
                  <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                    Cover
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
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => moveImage(index, index - 1)}
                    className="absolute bottom-2 left-2 bg-white bg-opacity-80 text-gray-700 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-opacity-100"
                    title="Move left"
                  >
                    ←
                  </button>
                )}
                {index < formData.images.length - 1 && (
                  <button
                    type="button"
                    onClick={() => moveImage(index, index + 1)}
                    className="absolute bottom-2 right-2 bg-white bg-opacity-80 text-gray-700 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-opacity-100"
                    title="Move right"
                  >
                    →
                  </button>
                )}
              </div>
            ))}
          </div>

          <p className="mt-3 text-xs text-gray-500">
            💡 Drag to reorder or click the arrows. The first image will be the cover photo.
          </p>
        </div>
      )}

      {/* Quick Add from URLs (for demo/testing) */}
      <details className="text-sm">
        <summary className="cursor-pointer text-gray-600 hover:text-gray-900 mb-2">
          Quick add: Use image URLs (for testing)
        </summary>
        <div className="mt-3 space-y-2">
          <input
            type="text"
            placeholder="Paste image URL"
            className="w-full px-3 py-2 border border-gray-300 rounded"
            onKeyPress={(e) => {
              if (e.key === 'Enter' && e.target.value) {
                updateFormData({ images: [...(formData.images || []), e.target.value] });
                e.target.value = '';
              }
            }}
          />
          <p className="text-xs text-gray-500">
            Press Enter to add the URL to your images
          </p>
        </div>
      </details>
    </div>
  );
}

