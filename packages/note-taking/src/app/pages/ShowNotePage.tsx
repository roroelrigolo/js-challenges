import React, { useState } from 'react';
import { useNavigate, useParams, Link } from '@tanstack/react-router';
import { marked } from 'marked';
import useStore from '../../store/useStore';
import IconPen from '../../assets/icon/pen';
import IconDelete from '../../assets/icon/delete';

const ShowNotePage: React.FC = () => {
    const { noteId } = useParams({from: undefined});
    const note = useStore((state) => state.getNote(noteId));
    const [showHtml, setShowHtml] = useState(false);
    const deleteNote = useStore((state) => state.deleteNote);
    const navigate = useNavigate();

    if (!note) {
      return <div>Note non trouvée</div>;
    }

    const toggleView = () => {
      setShowHtml(!showHtml);
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
              <h1>{note.title}</h1>
              <p><Link className='btn-icon' to={`/note/${note.id}/edit`}><IconPen/></Link></p>
              <button className='btn-icon' onClick={() => handleDelete(note.id)}><IconDelete/></button>
            </div>
          </div>
          <Link to="/"><p className='btn-primary'>Retourner à la liste</p></Link>
        </div>

        <div className='info-note'>
          <p><b>Créée le:</b> {note.createdAt.toLocaleString()}</p>
          <p><b>Modifié le: </b> {note.updatedAt.toLocaleString()}</p>
        </div>

        <div className='content-note'>
          {showHtml ? (
          <div dangerouslySetInnerHTML={{ __html: marked(note.content) }} />
            ) : (
              <pre>{note.content}</pre>
            )}
            <button className='btn-primary' onClick={toggleView}>
            {showHtml ? 'Afficher le Markdown' : 'Afficher la Prévisualisation'}
          </button>
        </div>
        
      </div>
    );
  };

export default ShowNotePage;