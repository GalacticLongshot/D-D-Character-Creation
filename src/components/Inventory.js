import React from 'react';
import './Inventory.css';

const Inventory = ({ items, totalSlots = 12, onInventoryChange }) => {
  const handleItemChange = (index, field) => (e) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: e.target.value };
    onInventoryChange(newItems);
  };

  return (
    <div className="inventory-section">
      <h2>Inventory</h2>
      <div className="inventory-grid">
        {items.slice(0, totalSlots).map((item, index) => (
          <div key={index} className="inventory-item">
            <input
              type="text"
              value={item.name || ''}
              placeholder="Item Name"
              onChange={handleItemChange(index, 'name')}
              className="inventory-input"
            />
            <input
              type="number"
              value={item.quantity || ''}
              placeholder="Qty"
              onChange={handleItemChange(index, 'quantity')}
              className="inventory-input inventory-quantity"
              min="1"
            />
          </div>
        ))}
        {[...Array(totalSlots - items.length)].map((_, index) => (
          <div key={`empty-${index}`} className="inventory-item">
            <input
              type="text"
              placeholder="Item Name"
              onChange={handleItemChange(items.length + index, 'name')}
              className="inventory-input"
            />
            <input
              type="number"
              placeholder="Qty"
              onChange={handleItemChange(items.length + index, 'quantity')}
              className="inventory-input inventory-quantity"
              min="1"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inventory;
