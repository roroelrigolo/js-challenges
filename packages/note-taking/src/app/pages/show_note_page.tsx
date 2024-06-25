import { useNavigate, useParams, Link } from '@tanstack/react-router';
import { marked } from 'marked';
import React, { useState } from 'react';

import IconDelete from '../../assets/icon/delete';
import IconPen from '../../assets/icon/pen';
import use_store from '../../store/use_store.tsx';

const Show_note_page: React.FC = () => {
    const { noteId } = useParams({from: undefined});
    const note = use_store((state) => state.getNote(noteId));
    const [showHtml, setShowHtml] = useState(false);
    const deleteNote = use_store((state) => state.deleteNote);
    const navigate = useNavigate();
		const toggleView = () => {
      setShowHtml(!showHtml);
    };

    const handleDelete = (id: string) => {
      if (window.confirm('Êtes-vous sûr de vouloir supprimer cette note ?')) {
        deleteNote(id);
        void navigate({ to: `/` });
      }
    };

	return note ? (
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
		) : <div>Note non trouvée</div>;
  };

export default Show_note_page;
