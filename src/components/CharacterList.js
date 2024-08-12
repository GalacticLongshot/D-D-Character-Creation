// src/components/CharacterList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db, collection, query, onSnapshot, doc, deleteDoc } from '../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './CharacterList.css';

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  useEffect(() => {
    const q = query(collection(db, 'characters'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const characterData = [];
      querySnapshot.forEach((doc) => {
        characterData.push({ id: doc.id, ...doc.data() });
      });
      setCharacters(characterData);
    }, (error) => {
      setError(error.message);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Confirm deletion?');
    if (confirmed) {
      try {
        await deleteDoc(doc(db, 'characters', id));
        setConfirmDeleteId(null); // Close the confirmation dialog
      } catch (error) {
        setError('Failed to delete character: ' + error.message);
      }
    } else {
      setConfirmDeleteId(null); // Close the confirmation dialog
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="character-list">
      <h2>Character List</h2>
      <div className="grid-container">
        {characters.map((char) => (
          <div key={char.id} className="grid-item">
            <h3>
              <Link to={`/character-details/${char.id}`}>
                {char.name}
              </Link>
              <button 
                className="delete-button" 
                onClick={(e) => { e.stopPropagation(); setConfirmDeleteId(char.id); }}
                aria-label="Delete"
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </h3>
            <p>Class: {char.class}</p>
          </div>
        ))}
      </div>
      {confirmDeleteId && (
        <div className="confirmation-dialog">
          <p>Confirm deletion?</p>
          <button onClick={() => handleDelete(confirmDeleteId)}>Yes</button>
          <button onClick={() => setConfirmDeleteId(null)}>No</button>
        </div>
      )}
    </div>
  );
};

export default CharacterList;
