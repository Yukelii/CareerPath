import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { RoadmapSection } from '../components/RoadmapSection';


// Hardcoded career data - easy to swap with API later
const CAREERS = [
  { id: '1', title: 'Front-end Developer' },
  { id: '2', title: 'Game Developer' },
  { id: '3', title: 'Software Architect' },
  { id: '4', title: 'Back-end Developer' },
  { id: '5', title: 'UX Designer' },
  { id: '6', title: 'Cyber Security' },
];

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleCardClick = (careerId: string) => {
    // Navigate to roadmap page with career ID
    navigate(`/roadmap/${careerId}`);
  };

  return (
    <div>
      <Header userName="Zaidy" userImage="https://via.placeholder.com/40" />
      <RoadmapSection careers={CAREERS} onCardClick={handleCardClick} />
    </div>
  );
};
