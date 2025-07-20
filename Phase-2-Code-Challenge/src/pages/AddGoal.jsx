import './AddGoal.css';
import { useState } from 'react';

function AddGoal({ onAddGoal }) {
  // State to track form inputs
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [category, setCategory] = useState('Savings');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh

    // Create a new goal object
    const newGoal = {
      name,
      targetAmount: Number(targetAmount),
      savedAmount: 0, // Initialize saved amount to 0
      category,
      deadline,
    };

    onAddGoal(newGoal); // Pass to parent (Dashboard)

    // Clear form
    setName('');
    setTargetAmount('');
    setCategory('Savings');
    setDeadline('');
  };

  return (
    <form onSubmit={handleSubmit} className="add-goal">
      <h3 style = {{ marginBottom: '1.5rem', color: '#2c3e50'}}>Add New Goal</h3>
      <div className="form-group">
        <label>Goal Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Target Amount ($):</label>
        <input
          type="number"
          value={targetAmount}
          onChange={(e) => setTargetAmount(e.target.value)}
          min="1"
          required
        />
      </div>
      <div className="form-group">
        <label>Category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Savings">Savings</option>
          <option value="Travel">Travel</option>
          <option value="Emergency">Emergency</option>
        </select>
      </div>
      <div className='form-group'>
        <label>Deadline:</label>
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="submit-btn">Add Goal</button>
    </form>
  );
}

export default AddGoal;