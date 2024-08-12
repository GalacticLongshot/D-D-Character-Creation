// src/ClassList.js
import React, { useState, useEffect } from 'react';

function ClassList() {
  const [classes, setClasses] = useState([]);
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>D&D Classes</h1>
      <ul>
        {classes.map((dndClass) => (
          <li key={dndClass.index}>{dndClass.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ClassList;
