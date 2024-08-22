import React, { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import './SaveLayout.css';

const SaveLayout = ({ characterId, formData }) => {
  const [status, setStatus] = useState('');

  const handleSave = async () => {
    try {
      await setDoc(doc(db, 'characters', characterId), formData, { merge: true });
      setStatus('Layout saved successfully!');
    } catch (error) {
      console.error('Error saving layout:', error);
      setStatus('Failed to save layout.');
    }
  };

  return (
    <div className="save-layout-section">
      <button onClick={handleSave} className="save-button">
        Save Layout
      </button>
      {status && <p className="save-status">{status}</p>}
    </div>
  );
};

export default SaveLayout;
