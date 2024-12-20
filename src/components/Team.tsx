import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Define types for the team member data
interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
}

const Team = ({ preview = false }: { preview?: boolean }) => {
  const [team, setTeam] = useState<TeamMember[]>([]); // State to store team data

  // Fetch team data from the backend
  const fetchTeam = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/team'); // API call to /api/team endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch team data');
      }
      const data = await response.json();
      setTeam(data); // Set team data from response
    } catch (err) {
      console.error('Error fetching team:', err);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const displayedMembers = preview ? team.slice(0, 8) : team;

  return (
    <div className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Animated heading */}
        <motion.h2
          className="text-4xl font-bold text-center text-black mb-10"
          initial={{ y: 0 }}
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
          }}
        >
        👨‍👩‍👧‍👦Our Team
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayedMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="relative overflow-hidden rounded-lg">
                {/* Use a fallback image in case member.image is missing */}
                <img
                  src={`http://localhost:5000${member.image}`}
                  alt={member.name}
                  className="w-full aspect-[3/4] object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300">
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-white text-center p-4">
                      <h3 className="text-xl font-bold">{member.name}</h3>
                      <p className="text-sm">{member.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        {preview && (
          <div className="text-center mt-14">
            <a
              href="/team"
              className="inline-block px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition"
            >
              See All Team Members
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Team;
