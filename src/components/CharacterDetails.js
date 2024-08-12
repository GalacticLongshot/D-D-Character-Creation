import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db, doc, getDoc, auth } from '../firebase';
import './CharacterDetails.css';

const CharacterDetails = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [playerName, setPlayerName] = useState('');
  const [classLevel, setClassLevel] = useState('');
  const [background, setBackground] = useState('');
  const [race, setRace] = useState('');
  const [races, setRaces] = useState([]);
  const [alignment, setAlignment] = useState('');
  const [experiencePoints, setExperiencePoints] = useState('');

  const [strength, setStrength] = useState('');
  const [dexterity, setDexterity] = useState('');
  const [constitution, setConstitution] = useState('');
  const [intelligence, setIntelligence] = useState('');
  const [wisdom, setWisdom] = useState('');
  const [charisma, setCharisma] = useState('');

  const [armorClass, setArmorClass] = useState('');
  const [initiative, setInitiative] = useState('');
  const [speed, setSpeed] = useState('');
  const [currentHitPoints, setCurrentHitPoints] = useState('');
  const [tempHitPoints, setTempHitPoints] = useState('');
  const [hitDice, setHitDice] = useState('');
  const [deathSaves, setDeathSaves] = useState({ success: 0, failure: 0 });

  useEffect(() => {
    const fetchCharacter = async () => {
      const docRef = doc(db, 'characters', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setCharacter({ id: docSnap.id, ...data });
        setPlayerName(data.playerName || auth.currentUser?.email || '');
        setClassLevel(data.classLevel || data.class || '');
        setBackground(data.background || '');
        setRace(data.race || '');
        setAlignment(data.alignment || '');
        setExperiencePoints(data.experiencePoints || '');
        setStrength(data.strength || '');
        setDexterity(data.dexterity || '');
        setConstitution(data.constitution || '');
        setIntelligence(data.intelligence || '');
        setWisdom(data.wisdom || '');
        setCharisma(data.charisma || '');
        setArmorClass(data.armorClass || '');
        setInitiative(data.initiative || '');
        setSpeed(data.speed || '');
        setCurrentHitPoints(data.currentHitPoints || '');
        setTempHitPoints(data.tempHitPoints || '');
        setHitDice(data.hitDice || '');
        setDeathSaves(data.deathSaves || { success: 0, failure: 0 });
      } else {
        console.log('No such document!');
      }
    };

    fetchCharacter();
  }, [id]);

  useEffect(() => {
    const fetchRaces = async () => {
      try {
        const response = await fetch('https://www.dnd5eapi.co/api/races');
        const data = await response.json();
        setRaces(data.results);
      } catch (error) {
        console.error('Error fetching races:', error);
      }
    };

    fetchRaces();
  }, []);

  const calculateModifier = (score) => {
    return Math.floor((score - 10) / 2);
  };

  if (!character) {
    return <div>Loading...</div>;
  }

  return (
    <div className="character-details">
      <h1>{character.name}</h1>
      <div className="details-grid">
        <div className="details-box">
          <div className="detail-item">
            <strong>Class & Level:</strong>
            <input
              type="text"
              value={classLevel}
              onChange={(e) => setClassLevel(e.target.value)}
            />
          </div>
          <div className="detail-item">
            <strong>Background:</strong>
            <input
              type="text"
              value={background}
              onChange={(e) => setBackground(e.target.value)}
            />
          </div>
          <div className="detail-item">
            <strong>Player Name:</strong>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
            />
          </div>
          <div className="detail-item">
            <strong>Race:</strong>
            <select
              value={race}
              onChange={(e) => setRace(e.target.value)}
            >
              <option value="">Select a race</option>
              {races.map((raceOption) => (
                <option key={raceOption.index} value={raceOption.name}>
                  {raceOption.name}
                </option>
              ))}
            </select>
          </div>
          <div className="detail-item">
            <strong>Alignment:</strong>
            <input
              type="text"
              value={alignment}
              onChange={(e) => setAlignment(e.target.value)}
            />
          </div>
          <div className="detail-item">
            <strong>Experience Points:</strong>
            <input
              type="text"
              value={experiencePoints}
              onChange={(e) => setExperiencePoints(e.target.value)}
            />
          </div>
        </div>

        <div className="attributes-column">
          <div className="attribute-box">
            <strong>Strength</strong>
            <input
              type="text"
              value={strength}
              onChange={(e) => setStrength(e.target.value)}
            />
            <input
              type="text"
              className="modifier-input"
              value={calculateModifier(strength)}
              readOnly
            />
            <div className="saving-throw">
              <strong>Saving Throw</strong>
              <input
                type="text"
                value={calculateModifier(strength)}
                readOnly
              />
            </div>
          </div>
          
          <div className="attribute-box">
            <strong>Dexterity</strong>
            <input
              type="text"
              value={dexterity}
              onChange={(e) => setDexterity(e.target.value)}
            />
            <input
              type="text"
              className="modifier-input"
              value={calculateModifier(dexterity)}
              readOnly
            />
            <div className="saving-throw">
              <strong>Saving Throw</strong>
              <input
                type="text"
                value={calculateModifier(dexterity)}
                readOnly
              />
            </div>
          </div>

          <div className="attribute-box">
            <strong>Constitution</strong>
            <input
              type="text"
              value={constitution}
              onChange={(e) => setConstitution(e.target.value)}
            />
            <input
              type="text"
              className="modifier-input"
              value={calculateModifier(constitution)}
              readOnly
            />
            <div className="saving-throw">
              <strong>Saving Throw</strong>
              <input
                type="text"
                value={calculateModifier(constitution)}
                readOnly
              />
            </div>
          </div>

          <div className="attribute-box">
            <strong>Intelligence</strong>
            <input
              type="text"
              value={intelligence}
              onChange={(e) => setIntelligence(e.target.value)}
            />
            <input
              type="text"
              className="modifier-input"
              value={calculateModifier(intelligence)}
              readOnly
            />
            <div className="saving-throw">
              <strong>Saving Throw</strong>
              <input
                type="text"
                value={calculateModifier(intelligence)}
                readOnly
              />
            </div>
          </div>

          <div className="attribute-box">
            <strong>Wisdom</strong>
            <input
              type="text"
              value={wisdom}
              onChange={(e) => setWisdom(e.target.value)}
            />
            <input
              type="text"
              className="modifier-input"
              value={calculateModifier(wisdom)}
              readOnly
            />
            <div className="saving-throw">
              <strong>Saving Throw</strong>
              <input
                type="text"
                value={calculateModifier(wisdom)}
                readOnly
              />
            </div>
          </div>

          <div className="attribute-box">
            <strong>Charisma</strong>
            <input
              type="text"
              value={charisma}
              onChange={(e) => setCharisma(e.target.value)}
            />
            <input
              type="text"
              className="modifier-input"
              value={calculateModifier(charisma)}
              readOnly
            />
            <div className="saving-throw">
              <strong>Saving Throw</strong>
              <input
                type="text"
                value={calculateModifier(charisma)}
                readOnly
              />
            </div>
          </div>
        </div>

        <div className="combat-stats-column">
          <div className="combat-stat-box">
            <strong>Armor Class</strong>
            <input
              type="text"
              value={armorClass}
              onChange={(e) => setArmorClass(e.target.value)}
            />
          </div>
          <div className="combat-stat-box">
            <strong>Initiative</strong>
            <input
              type="text"
              value={initiative}
              onChange={(e) => setInitiative(e.target.value)}
            />
          </div>
          <div className="combat-stat-box">
            <strong>Speed</strong>
            <input
              type="text"
              value={speed}
              onChange={(e) => setSpeed(e.target.value)}
            />
          </div>
          <div className="combat-stat-box">
            <strong>Hit Dice</strong>
            <input
              type="text"
              value={hitDice}
              onChange={(e) => setHitDice(e.target.value)}
            />
          </div>
          <div className="combat-stat-box">
            <strong>Death Saves</strong>
            <div className="death-saves">
              <div>
                <label>Successes: </label>
                <input
                  type="number"
                  min="0"
                  max="3"
                  value={deathSaves.success}
                  onChange={(e) =>
                    setDeathSaves({ ...deathSaves, success: e.target.value })
                  }
                />
              </div>
              <div>
                <label>Failures: </label>
                <input
                  type="number"
                  min="0"
                  max="3"
                  value={deathSaves.failure}
                  onChange={(e) =>
                    setDeathSaves({ ...deathSaves, failure: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Hit Points Section */}
      <div className="hit-points-container">
        <div className="hit-points-box">
          <strong>Current Hit Points</strong>
          <input
            type="text"
            value={currentHitPoints}
            onChange={(e) => setCurrentHitPoints(e.target.value)}
          />
        </div>
        <div className="hit-points-box">
          <strong>Temporary Hit Points</strong>
          <input
            type="text"
            value={tempHitPoints}
            onChange={(e) => setTempHitPoints(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;
