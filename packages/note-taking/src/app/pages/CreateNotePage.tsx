// src/pages/CreateNotePage.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import useStore from '../../store/useStore';

const CreateNotePage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const addNote = useStore((state) => state.addNote);
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addNote(title, content);
    navigate({ to: '/' });
  };

  return (
    <div className='content-xl'>
      <div className='page-header'>
        <h1>Créer une Note</h1>
        <Link to="/"><p className='btn-primary'>Retourner à la liste</p></Link>
      </div>
      <form id="addNote" onSubmit={handleSubmit}>
        <div>
            <label>Titre </label>
            <p className='description-input'>Le titre est limité à 50 caractères</p>
            <input
              type="text"
              maxLength={50}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label>Contenu </label>
            <textarea
              value={content}
              rows={15}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        <button className='btn-primary' type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default CreateNotePage;
