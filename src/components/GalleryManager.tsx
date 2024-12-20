import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const GalleryManager = () => {
  const [gallery, setGallery] = useState<any[]>([]); // Array for storing images
  const [selectedImages, setSelectedImages] = useState<File[]>([]); // State for selected images
  const [error, setError] = useState<string>(''); // State for error messages
  const [showAlert, setShowAlert] = useState(false); // State for showing the alert
  const [alertMessage, setAlertMessage] = useState(''); // Message in the alert
  const [isUploading, setIsUploading] = useState(false); // State for tracking upload process
  const [imageToDelete, setImageToDelete] = useState<string | null>(null); // Image ID to delete

  // Fetch gallery data
  const fetchGallery = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/gallery');
      const data = await response.json();
      setGallery(data); // Set gallery data from response
    } catch (err) {
      setError('Failed to fetch gallery data');
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  // Handle Image Upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedImages(Array.from(e.target.files)); // Handle multiple files
    }
  };

  const handleSubmit = async () => {
    if (selectedImages.length === 0) {
      setError('Please select at least one image to upload.');
      return;
    }

    setIsUploading(true); // Indicating upload process

    // Prepare form data for upload
    const formData = new FormData();
    selectedImages.forEach((image, index) => {
      formData.append('images', image); // Append each image to the 'images' field
    });
    formData.append('title', `Image ${gallery.length + 1}`); // Auto title with sequence number if no title provided

    try {
      const response = await fetch('http://localhost:5000/api/uploadgallery', {
        method: 'POST',
        body: formData,
      });
      const newImages = await response.json();
      setGallery((prev) => [...prev, ...newImages]); // Add new images to gallery
      setAlertMessage(`Images uploaded successfully!`); // Success message
      setShowAlert(true); // Show alert
      setSelectedImages([]); // Reset selected images
      setError(''); // Reset any previous errors
    } catch (err) {
      setAlertMessage('Failed to upload images.'); // Error message
      setShowAlert(true); // Show alert on failure
    } finally {
      setIsUploading(false); // End the uploading state
    }
  };

  const handleDelete = async (id: string) => {
    if (!id) return;

    try {
      await fetch(`http://localhost:5000/api/gallery/${id}`, {
        method: 'DELETE',
      });
      setGallery((prev) => prev.filter((image) => image._id !== id)); // Remove deleted image from the gallery
      setAlertMessage('Image deleted successfully.');
      setShowAlert(true); // Show success alert
    } catch (err) {
      setAlertMessage('Failed to delete image.');
      setShowAlert(true); // Show error alert
    } finally {
      setImageToDelete(null); // Close the delete confirmation alert
    }
  };

  const closeAlert = () => {
    setShowAlert(false); // Close alert
  };

  return (
    <div className="py-5 bg-gray-100">
      <div className="max-w-7xl mx-auto px-3">
        <h3 className="text-xl font-bold mb-2">Manage Gallery</h3>

        {/* Display Total Number of Photos */}
        <p className="text-gray-700 mb-9">Total Photos: {gallery.length}</p>

        {/* Error Message */}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Image Upload Section */}
        <div className="flex flex-col sm:flex-row items-center justify-left mb-12 space-y-4 sm:space-y-0 sm:space-x-4">
          <input
            type="file"
            onChange={handleImageUpload}
            className="p-2 bg-white-w-full mb-2 px-3 py-2 border rounded"
            multiple // Allow multiple files to be selected
          />
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition w-full sm:w-auto"
            disabled={isUploading}
          >
            {isUploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>

        {/* Gallery Display */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-1">
          {gallery.map((image) => (
            <div key={image._id} className="border rounded-lg p-1 relative">
              <img
                src={`http://localhost:5000${image.url}`} // Assuming images are served from the server
                alt={image.title}
                className="w-full h-29 object-cover rounded"
              />
              <h4 className="mt-2 text-sm font-medium">{image.title}</h4>

              {/* Stylish Delete Button */}
              <motion.button
                onClick={() => setImageToDelete(image._id)} // Set the image to be deleted
                className="absolute bottom-0 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-700 focus:outline-none shadow-md transition-transform transform hover:scale-105"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </motion.button>
            </div>
          ))}
        </div>
      </div>

      {/* Success/Error Alert */}
      {showAlert && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed inset-0 flex justify-center items-center z-50" // Removed the background dimming class
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="bg-white p-6 rounded-lg shadow-lg max-w-xs w-full"
          >
            <h3 className="text-lg font-semibold mb-4 text-center">Status</h3>
            <p className="text-center mb-6">{alertMessage}</p>
            <div className="flex justify-around">
              <button
                onClick={closeAlert}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Delete Confirmation Alert */}
      {imageToDelete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed inset-0 flex justify-center items-center z-50" // Removed the background dimming class
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="bg-white p-6 rounded-lg shadow-lg max-w-xs w-full"
          >
            <h3 className="text-lg font-semibold mb-4 text-center">Are you sure?</h3>
            <p className="text-center mb-6">Do you want to delete this image?</p>
            <div className="flex justify-around">
              <button
                onClick={() => handleDelete(imageToDelete)} // Proceed with deletion
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setImageToDelete(null)} // Close the confirmation
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                No
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default GalleryManager;
