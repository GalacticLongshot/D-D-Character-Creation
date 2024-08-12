// src/CharacterForm.js
import React, { useState, useEffect } from 'react';
import { db, auth, collection, addDoc } from '../firebase';

function CharacterForm() {
  const [characterName, setCharacterName] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchClasses = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('https://www.dnd5eapi.co/api/classes', {
          headers: {
            'Accept': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setClasses(data.results);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  const handleCharacterNameChange = (e) => {
    setCharacterName(e.target.value);
  };

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (characterName && selectedClass) {
      try {
        // Add character to Firestore
        await addDoc(collection(db, 'characters'), {
          name: characterName,
          class: selectedClass,
          createdAt: new Date(),
        });
        setSubmitted(true);
      } catch (error) {
        setError('Failed to save character: ' + error.message);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (submitted) {
    return (
      <div>
        <h2>Character Submitted!</h2>
        <p>Name: {characterName}</p>
        <p>Class: {selectedClass}</p>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="character-name">Character Name:</label>
          <input
            type="text"
            id="character-name"
            value={characterName}
            onChange={handleCharacterNameChange}
            placeholder="Enter your character's name"
          />
        </div>
        <div>
          <label htmlFor="class-select">Choose a class:</label>
          <select
            id="class-select"
            value={selectedClass}
            onChange={handleClassChange}
          >
            <option value="">--Select a class--</option>
            {classes.map((dndClass) => (
              <option key={dndClass.index} value={dndClass.name}>
                {dndClass.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CharacterForm;
