import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { RoadmapSection } from '../components/RoadmapSection';

// Slug-based career IDs
const CAREERS = [
  { id: 'front-end', title: 'Front-end Developer' },
  { id: 'game-dev', title: 'Game Developer' },
  { id: 'software-architect', title: 'Software Architect' },
  { id: 'back-end', title: 'Back-end Developer' },
  { id: 'ux-design', title: 'UX Designer' },
  { id: 'cyber-security', title: 'Cyber Security' },
];

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleCardClick = (careerId: string) => {
    // Go to roadmap page for that career
    navigate(`/roadmap/${careerId}`);
  };

  return (
    <div>
      <Header userName="Zaidy" userImage="https://via.placeholder.com/40" />
      <RoadmapSection careers={CAREERS} onCardClick={handleCardClick} />
    </div>
  );
};
