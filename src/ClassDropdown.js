// src/ClassDropdown.js
import React, { useState, useEffect } from 'react';

function ClassDropdown() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedClass) {
      alert(`Selected class: ${selectedClass}`);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="class-select">Choose a class:</label>
        <select
          id="class-select"
          value={selectedClass}
          onChange={handleChange}
        >
          <option value="">--Select a class--</option>
          {classes.map((dndClass) => (
            <option key={dndClass.index} value={dndClass.name}>
              {dndClass.name}
            </option>
          ))}
        </select>
        <button type="submit">Submit</button>
      </form>
      {selectedClass && <p>Selected class: {selectedClass}</p>}
    </div>
  );
}

export default ClassDropdown;
