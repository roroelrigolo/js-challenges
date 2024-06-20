import React, { useState } from 'react';
import { useParams, Link, useNavigate } from '@tanstack/react-router';
import useStore from '../../store/useStore';
import IconEye from '../../assets/icon/eye';
import IconDelete from '../../assets/icon/delete';

const EditNotePage: React.FC = () => {
    const { noteId } = useParams({from: undefined});
  const note = useStore((state) => state.getNote(noteId));
  const updateNote = useStore((state) => state.updateNote);
  const navigate = useNavigate();
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const deleteNote = useStore((state) => state.deleteNote);

  if (!note) {
    return <div>Note non trouvée</div>;
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    updateNote(note.id, title, content);
    navigate({ to: `/note/${note.id}` });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette note ?')) {
      deleteNote(id);
      navigate({ to: `/` });
    }
  };

  return (
    <div className='content-xl'>
        <div className='page-header'>
          <div className='title-cube'>
            <div style={{ backgroundColor: note.color }} className='color-cube'></div>
            <div className='flex-title'>
              <h1>Modifier {note.title}</h1>
              <p><Link className='btn-icon' to={`/note/${note.id}`}><IconEye/></Link></p>
              <button className='btn-icon' onClick={() => handleDelete(note.id)}><IconDelete/></button>
            </div>
          </div>
          <Link to="/"><p className='btn-primary'>Retourner à la liste</p></Link>
        </div>
        <form id="editNote" onSubmit={handleSubmit}>
        <div>
          <label>Titre </label>
          <p className='description-input'>Le titre est limité à 50 caractères</p>
          <input
            type="text"
            value={title}
            maxLength={50}
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
        <button className='btn-primary' type="submit">Modifier</button>
      </form>
    </div>
  );
};

export default EditNotePage;
