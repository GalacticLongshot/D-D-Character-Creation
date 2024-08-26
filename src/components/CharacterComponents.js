import React from 'react';

const DetailItem = ({ label, value, onChange }) => (
  <div className="detail-item">
    <strong>{label}:</strong>
    <input type="text" value={value} onChange={onChange} />
  </div>
);

const AttributeBox = ({ label, value, modifier, onChange }) => (
  <div className="attribute-box">
    <strong>{label}</strong>
    <input type="text" value={value} onChange={onChange} />
    <input type="text" className="modifier-input" value={modifier} readOnly />
    <div className="saving-throw">
      <strong>Saving Throw</strong>
      <input type="text" value={modifier} readOnly />
    </div>
  </div>
);

const CombatStatBox = ({ label, value, onChange }) => (
  <div className="combat-stat-box">
    <strong>{label}</strong>
    <input type="text" value={value} onChange={onChange} />
  </div>
);

export { DetailItem, AttributeBox, CombatStatBox };
