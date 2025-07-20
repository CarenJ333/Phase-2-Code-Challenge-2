import { useState } from 'react';
import './GoalCard.css';

function GoalCard({ goal, onDeposit, onDelete }) {
  const [depositAmount, setDepositAmount] = useState('');

  // Calculate progress metrics
  const progressPercentage = Math.min(
    100,
    (goal.savedAmount / goal.targetAmount) * 100
  );
  const remainingAmount = goal.targetAmount - goal.savedAmount;

  const handleDeposit = () => {
    if (depositAmount > 0) {
      onDeposit(goal.id, Number(depositAmount));
      setDepositAmount('');
    }
  };

  return (
    <div className="goal-card">
      <h3>{goal.name}</h3>
      
      {/* Progress Tracking Section */}
      <div className="goal-progress">
        <div className="amounts">
          <span className="saved">Saved: ${goal.savedAmount.toLocaleString()}</span>
          <span className="target">Target: ${goal.targetAmount.toLocaleString()}</span>
          <span className={`remaining ${remainingAmount <= 0 ? 'completed' : ''}`}>
            {remainingAmount > 0 
              ? `$${remainingAmount.toLocaleString()} to go` 
              : 'Goal Achieved!'}
          </span>
        </div>

        {/* Visual Progress Bar */}
        <div className="progress-container">
          <div 
            className="progress-bar"
            style={{ width: `${progressPercentage}%` }}
            aria-valuenow={progressPercentage}
          >
            <span className="progress-text">
              {Math.round(progressPercentage)}%
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <div className="deposit-section">
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            placeholder="Amount"
            min="1"
            step="0.01"
          />
          <button onClick={handleDeposit}>Deposit</button>
        </div>
        
        <button 
          className="delete-btn"
          onClick={() => onDelete(goal.id)}
        >
          Delete Goal
        </button>
      </div>
    </div>
  );
}

export default GoalCard;