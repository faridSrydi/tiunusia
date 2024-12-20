import React from 'react';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import Gallery from '../components/Gallery';
import Stats from '../components/Stats';
import Team from '../components/Team';

const Home = () => {
  return (
    <div>
      <Hero />
      <div className="bg-gray-100 rounded-lg p-6">
      <div className="bg-gray py-16 text-center rounded-lg">
        <h1 className="text-4xl font-bold mb-4">Informatics Engineering</h1>
        <p className="text-xl font-semibold mb-6">No Engineering No Party</p>
        <p className="text-gray-600">
          This is the Portfolio Website of Informatics Engineering Students Semester 1,
          Nahdlatul Ulama University.
        </p>
      </div>
      </div>
      <Skills />
      <Gallery preview />
      <Stats />
      <Team preview />
    </div>
  );
};

export default Home;