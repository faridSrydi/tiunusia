import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TeamManager = () => {
  const [team, setTeam] = useState<any[]>([]); // Array for storing team members
  const [error, setError] = useState<string>(''); // State for error messages
  const [showAlert, setShowAlert] = useState(false); // State for showing the alert
  const [alertMessage, setAlertMessage] = useState(''); // Message in the alert
  const [imageToDelete, setImageToDelete] = useState<string | null>(null); // Team member ID to delete

  // Add Member State
  const [newMember, setNewMember] = useState({
    name: '',
    role: '',
    image: null as File | null, // Image will now be a File object
  });

  const [isUploading, setIsUploading] = useState(false); // Uploading state

  // Fetch team data
  const fetchTeam = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/team');
      const data = await response.json();
      setTeam(data); // Set team data from response
    } catch (err) {
      setError('Failed to fetch team data');
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  // Handle input changes for new team member
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMember((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image change for new member
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Use optional chaining to access the first file
    if (file) {
      setNewMember((prev) => ({ ...prev, image: file }));
    } else {
      console.log('No file selected');
    }
  };

  // Handle adding a new team member
  const handleAddMember = async () => {
    if (!newMember.name || !newMember.role || !newMember.image) {
      setError('All fields are required.');
      return;
    }

    const formData = new FormData();
    formData.append('name', newMember.name);
    formData.append('role', newMember.role);
    formData.append('image', newMember.image);

    setIsUploading(true);

    try {
      const response = await fetch('http://localhost:5000/api/uploadteam', {
        method: 'POST',
        body: formData,
      });
      const addedMember = await response.json();
      setTeam((prev) => [...prev, addedMember]);
      setAlertMessage('Member added successfully!');
      setShowAlert(true);
      setNewMember({ name: '', role: '', image: null });
    } catch (err) {
      setAlertMessage('Failed to add member.');
      setShowAlert(true);
    } finally {
      setIsUploading(false);
    }
  };

  // Handle Delete Team Member
  const handleDelete = async (id: string) => {
    if (!id) return;

    try {
      await fetch(`http://localhost:5000/api/team/${id}`, {
        method: 'DELETE',
      });
      setTeam((prev) => prev.filter((member) => member._id !== id)); // Remove deleted member from the list
      setAlertMessage('Team member deleted successfully.');
      setShowAlert(true); // Show success alert
    } catch (err) {
      setAlertMessage('Failed to delete team member.');
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
        <h3 className="text-xl font-bold mb-2">Manage Team</h3>

        {/* Display Total Number of Team Members */}
        <p className="text-gray-700 mb-9">Total Team Members: {team.length}</p>

        {/* Error Message */}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Add Member Form */}
        <div className="mb-4">
          <input
            type="text"
            name="name"
            value={newMember.name}
            onChange={handleInputChange}
            placeholder="Member Name"
            className="w-full mb-2 px-3 py-2 border rounded"
          />
          <input
            type="text"
            name="role"
            value={newMember.role}
            onChange={handleInputChange}
            placeholder="Role"
            className="w-full mb-2 px-3 py-2 border rounded"
          />
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            className="w-full mb-2 px-3 py-2 border rounded"
          />
          <button
            onClick={handleAddMember}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            disabled={isUploading}
          >
            {isUploading ? 'Uploading...' : 'Add Member'}
          </button>
        </div>

        {/* Team Member Display */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-1">
          {team.map((member) => (
            <div key={member._id} className="border rounded-lg p-1 relative">
              <img
                src={`http://localhost:5000${member.image}`} // Assuming images are served from the server
                alt={member.name}
                className="w-full h-29 object-cover rounded"
              />
              <h4 className="mt-2 text-sm font-medium">{member.name}</h4>
              <p className="text-xs text-gray-600">{member.role}</p>

              {/* Stylish Delete Button */}
              <motion.button
                onClick={() => setImageToDelete(member._id)} // Set the member to be deleted
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
          className="fixed inset-0 flex justify-center items-center z-50"
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
          className="fixed inset-0 flex justify-center items-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="bg-white p-6 rounded-lg shadow-lg max-w-xs w-full"
          >
            <h3 className="text-lg font-semibold mb-4 text-center">Are you sure?</h3>
            <p className="text-center mb-6">Do you want to delete this team member?</p>
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

export default TeamManager;
