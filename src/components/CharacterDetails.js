import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db, doc, getDoc, auth } from '../firebase';
import './CharacterDetails.css';
import { DetailItem, AttributeBox, CombatStatBox } from './CharacterComponents';
import Inventory from './Inventory';
import SaveLayout from './SaveLayout';

const CharacterDetails = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [races, setRaces] = useState([]);

  const [formData, setFormData] = useState({
    playerName: '',
    className: '',
    level: '',
    background: '',
    race: '',
    alignment: '',
    experiencePoints: '',
    money: '',
    strength: '',
    dexterity: '',
    constitution: '',
    intelligence: '',
    wisdom: '',
    charisma: '',
    armorClass: '',
    initiative: '',
    speed: '',
    currentHitPoints: '',
    tempHitPoints: '',
    hitDice: '',
    deathSaves: { success: 0, failure: 0 },
    inventory: Array(12).fill({ name: '', quantity: '' }) // Initialize 12 empty slots
  });

  useEffect(() => {
    const fetchCharacter = async () => {
      const docRef = doc(db, 'characters', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setCharacter({ id: docSnap.id, ...data });
        setFormData({
          playerName: data.playerName || auth.currentUser?.email || '',
          className: data.className || data.class || '',
          level: data.level || '',
          background: data.background || '',
          race: data.race || '',
          alignment: data.alignment || '',
          experiencePoints: data.experiencePoints || '',
          money: data.money || '',
          strength: data.strength || '',
          dexterity: data.dexterity || '',
          constitution: data.constitution || '',
          intelligence: data.intelligence || '',
          wisdom: data.wisdom || '',
          charisma: data.charisma || '',
          armorClass: data.armorClass || '',
          initiative: data.initiative || '',
          speed: data.speed || '',
          currentHitPoints: data.currentHitPoints || '',
          tempHitPoints: data.tempHitPoints || '',
          hitDice: data.hitDice || '',
          deathSaves: data.deathSaves || { success: 0, failure: 0 },
          inventory: data.inventory || Array(12).fill({ name: '', quantity: '' })
        });
      }
    };

    fetchCharacter();
  }, [id]);

  useEffect(() => {
    const fetchRaces = async () => {
      const response = await fetch('https://www.dnd5eapi.co/api/races');
      const data = await response.json();
      setRaces(data.results);
    };

    fetchRaces();
  }, []);

  const calculateModifier = (score) => Math.floor((score - 10) / 2);

  if (!character) return <div>Loading...</div>;

  const handleInputChange = (field) => (e) => setFormData({ ...formData, [field]: e.target.value });

  const handleInventoryChange = (newInventory) => {
    setFormData({ ...formData, inventory: newInventory });
  };

  const attributes = [
    { label: 'Strength', value: formData.strength, modifier: calculateModifier(formData.strength) },
    { label: 'Dexterity', value: formData.dexterity, modifier: calculateModifier(formData.dexterity) },
    { label: 'Constitution', value: formData.constitution, modifier: calculateModifier(formData.constitution) },
    { label: 'Intelligence', value: formData.intelligence, modifier: calculateModifier(formData.intelligence) },
    { label: 'Wisdom', value: formData.wisdom, modifier: calculateModifier(formData.wisdom) },
    { label: 'Charisma', value: formData.charisma, modifier: calculateModifier(formData.charisma) },
  ];

  const combatStats = [
    { label: 'Armor Class', value: formData.armorClass },
    { label: 'Initiative', value: formData.initiative },
    { label: 'Speed', value: formData.speed },
    { label: 'Hit Dice', value: formData.hitDice }
  ];

  return (
    <div className="character-details">
      <h1>{character.name}</h1>

      <div className="details-grid-top">
        <DetailItem label="Class" value={formData.className} onChange={handleInputChange('className')} />
        <DetailItem label="Level" value={formData.level} onChange={handleInputChange('level')} />
        <DetailItem label="Background" value={formData.background} onChange={handleInputChange('background')} />
        <DetailItem label="Player Name" value={formData.playerName} onChange={handleInputChange('playerName')} />
        <div className="detail-item">
          <strong>Race:</strong>
          <select value={formData.race} onChange={handleInputChange('race')}>
            <option value="">Select a race</option>
            {races.map((raceOption) => (
              <option key={raceOption.index} value={raceOption.name}>
                {raceOption.name}
              </option>
            ))}
          </select>
        </div>
        <DetailItem label="Alignment" value={formData.alignment} onChange={handleInputChange('alignment')} />
        <DetailItem label="Experience Points" value={formData.experiencePoints} onChange={handleInputChange('experiencePoints')} />
        <DetailItem label="Money" value={formData.money} onChange={handleInputChange('money')} />
      </div>

      <div className="details-grid">
        <div className="attributes-column">
          {attributes.map((attr) => (
            <AttributeBox
              key={attr.label}
              label={attr.label}
              value={attr.value}
              modifier={attr.modifier}
              onChange={handleInputChange(attr.label.toLowerCase())}
            />
          ))}
        </div>

        <div className="combat-stats-column">
          <div className="combat-stats-grid">
            {combatStats.map((stat) => (
              <CombatStatBox
                key={stat.label}
                label={stat.label}
                value={stat.value}
                onChange={handleInputChange(stat.label.toLowerCase().replace(' ', ''))}
              />
            ))}
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
                  value={formData.deathSaves.success}
                  onChange={(e) => setFormData({
                    ...formData,
                    deathSaves: { ...formData.deathSaves, success: e.target.value }
                  })}
                />
              </div>
              <div>
                <label>Failures: </label>
                <input
                  type="number"
                  min="0"
                  max="3"
                  value={formData.deathSaves.failure}
                  onChange={(e) => setFormData({
                    ...formData,
                    deathSaves: { ...formData.deathSaves, failure: e.target.value }
                  })}
                />
              </div>
            </div>
          </div>
          <Inventory items={formData.inventory} totalSlots={12} onInventoryChange={handleInventoryChange} />
          <SaveLayout characterId={id} formData={formData} />
        </div>
      </div>

      <div className="hit-points-container">
        <CombatStatBox
          label="Current Hit Points"
          value={formData.currentHitPoints}
          onChange={handleInputChange('currentHitPoints')}
        />
        <CombatStatBox
          label="Temporary Hit Points"
          value={formData.tempHitPoints}
          onChange={handleInputChange('tempHitPoints')}
        />
      </div>
    </div>
  );
};

export default CharacterDetails;
