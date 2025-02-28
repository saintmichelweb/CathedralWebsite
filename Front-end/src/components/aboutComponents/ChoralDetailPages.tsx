import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

// Example data (you would likely fetch this from an API or database)
const choralsData = [
  {
    id: 1,
    isActive: true,
    created_at: '2024-01-01 10:00:00',
    updated_at: '2024-01-01 12:00:00',
    backgroundImageId: 101,
    name: 'Harmony Chorale',
    description_en: 'A beautiful harmony of voices.',
    description_fr: 'Une belle harmonie de voix.',
    description_rw: 'Ubumwe bw\'ijwi ryiza',
    leader: 'John Doe',
    telephone: '123-456-7890',
  },
  {
    id: 2,
    isActive: true,
    created_at: '2024-01-02 11:00:00',
    updated_at: '2024-01-02 13:00:00',
    backgroundImageId: 102,
    name: 'Joyful Voices',
    description_en: 'Spreading joy through choral music.',
    description_fr: 'Diffuser la joie à travers la musique.',
    description_rw: 'Kwirakwiza umunezero',
    leader: 'Jane Smith',
    telephone: '987-654-3210',
  },
];

interface Choral {
  id: number;
  isActive: boolean;
  created_at: string;
  updated_at: string;
  backgroundImageId: number;
  name: string;
  description_en: string;
  description_fr: string;
  description_rw: string;
  leader: string;
  telephone: string;
}

export const ChoralDetailPages: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Capture dynamic 'id' from the URL
  const [choral, setChoral] = useState<Choral | null>(null);

  useEffect(() => {
    const selectedChoral = choralsData.find((ch) => ch.id === parseInt(id));
    setChoral(selectedChoral || null); // Set to null if no choral is found
  }, [id]);

  if (!choral) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-lg text-red-500">Choral details not found!</p>
        <Link to="/chorals" className="text-blue-500 underline">
          Back to Chorals
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div
          className="h-64 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://www.canticanova.com/images/boys_choir_1.jpg)`,
          }}
        >
          {/* Optional: Replace with dynamic URL if you have an image endpoint */}
        </div>
        <div className="p-6">
          <h1 className="text-3xl font-bold text-yellow-500 text-center mb-4">
            {choral.name}
          </h1>
          <p className="text-gray-600 text-center italic mb-6">
            {choral.isActive ? 'Active' : 'Inactive'}
          </p>
          <div className="text-gray-700 mb-4">
            <p>{choral.description_en}</p>
            <p>{choral.description_fr}</p>
            <p>{choral.description_rw}</p>
          </div>
          <div className="border-t border-gray-200 pt-4">
            <p>
              <span className="font-semibold">Leader:</span> {choral.leader}
            </p>
            <p>
              <span className="font-semibold">Contact:</span> {choral.telephone}
            </p>
          </div>
        </div>
        <div className="p-4 bg-gray-100 text-center">
          <Link
            to="/chorals"
            className="bg-yellow-500 text-white py-2 px-4 rounded-lg shadow hover:bg-yellow-600"
          >
            Back to Chorals
          </Link>
        </div>
      </div>
    </div>
  );
};
