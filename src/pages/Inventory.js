import React, { useState } from 'react';

const Inventory = () => {
  const [inventory, setInventory] = useState([
    {
      id: 1,
      item: 'Animal Feed',
      category: 'Feed',
      quantity: 500,
      unit: 'kg',
      minStock: 100,
      cost: 2.5,
      supplier: 'FeedCo',
      lastRestocked: '2024-07-15'
    },
    {
      id: 2,
      item: 'Penicillin',
      category: 'Medicine',
      quantity: 10,
      unit: 'bottles',
      minStock: 5,
      cost: 25,
      supplier: 'MedSupply',
      lastRestocked: '2024-07-10'
    }
  ]);

  const [lowStockItems, setLowStockItems] = useState([]);

  React.useEffect(() => {
    const lowStock = inventory.filter(item => item.quantity <= item.minStock);
    setLowStockItems(lowStock);
  }, [inventory]);

  const restockItem = (itemId, quantity) => {
    setInventory(inventory.map(item => 
      item.id === itemId 
        ? { ...item, quantity: item.quantity + quantity, lastRestocked: new Date().toISOString().split('T')[0] }
        : item
    ));
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Inventory Management</h1>
        <button className="btn btn-primary">Add New Item</button>
      </div>

      {/* Low Stock Alerts */}
      {lowStockItems.length > 0 && (
        <div className="alert alert-warning">
          <h3>⚠️ Low Stock Alert</h3>
          <div className="low-stock-items">
            {lowStockItems.map(item => (
              <div key={item.id} className="stock-alert">
                <span>{item.item} - Only {item.quantity} {item.unit} left</span>
                <button 
                  className="btn btn-sm btn-primary"
                  onClick={() => {
                    const quantity = prompt(`How many ${item.unit} to add?`);
                    if (quantity) restockItem(item.id, parseInt(quantity));
                  }}
                >
                  Restock
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Inventory Summary */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-info">
            <h3>{inventory.length}</h3>
            <p>Total Items</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⚠️</div>
          <div className="stat-info">
            <h3>{lowStockItems.length}</h3>
            <p>Low Stock Items</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h3>${inventory.reduce((sum, item) => sum + (item.quantity * item.cost), 0).toFixed(2)}</h3>
            <p>Inventory Value</p>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="table-card">
        <h3>Current Inventory</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Min Stock</th>
              <th>Unit Cost</th>
              <th>Total Value</th>
              <th>Supplier</th>
              <th>Last Restocked</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map(item => (
              <tr key={item.id} className={item.quantity <= item.minStock ? 'low-stock' : ''}>
                <td>{item.item}</td>
                <td>{item.category}</td>
                <td>
                  <span className={item.quantity <= item.minStock ? 'stock-low' : 'stock-ok'}>
                    {item.quantity} {item.unit}
                  </span>
                </td>
                <td>{item.minStock} {item.unit}</td>
                <td>${item.cost}</td>
                <td>${(item.quantity * item.cost).toFixed(2)}</td>
                <td>{item.supplier}</td>
                <td>{item.lastRestocked}</td>
                <td>
                  <button 
                    className="btn btn-sm btn-primary"
                    onClick={() => {
                      const quantity = prompt(`How many ${item.unit} to add?`);
                      if (quantity) restockItem(item.id, parseInt(quantity));
                    }}
                  >
                    Restock
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;