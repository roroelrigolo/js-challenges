import { Link, useNavigate } from '@tanstack/react-router';
import React, { useState } from 'react';

import use_store from '../../store/use_store.tsx';

const Create_note_page: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const addNote = use_store((state) => state.addNote);
  const navigate = useNavigate();

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		addNote(title, content);
		void navigate({ to: '/' })
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
              name='title'
              maxLength={50}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div>
            <label>Contenu </label>
            <textarea
              name='content'
              value={content}
              rows={15}
              onChange={(event) => setContent(event.target.value)}
            />
          </div>
        <button className='btn-primary' type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default Create_note_page;
