import type { Note } from '../../types/note.tsx';

import { Link } from '@tanstack/react-router';
import React from 'react';

import IconDelete from '../../assets/icon/delete';
import IconEye from '../../assets/icon/eye';
import IconPen from '../../assets/icon/pen';
import ContentSubstr from '../../components/content_substr';
import use_store from '../../store/use_store.tsx';

const Home_page: React.FC = () => {
	const notes: Array<Note> = use_store((state) => state.notes);
  const deleteNote = use_store((state) => state.deleteNote);

  const handleDelete = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette note ?')) {
      deleteNote(id);
    }
  };

  return (
    <div className='content-xl'>
      <div className='page-header'>
        <h1>Notes</h1>
        <Link to="/create"><p className='btn-primary'>Ajouter une note</p></Link>
      </div>
      {notes.length === 0 ? (
        <p>Vous n'avez aucune note pour le moment 😶</p>
      ) : (
        <div className='list-notes'>
          {notes.map((note) => (
            <div className='note' key={note.id} style={{ backgroundColor: note.color }}>
              <div>
                <p className='title'>{note.title}</p>
                <ContentSubstr content={note.content} />
              </div>
              <div className='end'>
                <p className='date'>{note.createdAt.toLocaleDateString()}</p>
                <div className='icons'>
                  <p><Link className='btn-icon' to={`/note/${note.id}`}><IconEye/></Link></p>
                  <p><Link className='btn-icon' to={`/note/${note.id}/edit`}><IconPen/></Link></p>
                  <button className='btn-icon' onClick={() => handleDelete(note.id)}><IconDelete/></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home_page;
