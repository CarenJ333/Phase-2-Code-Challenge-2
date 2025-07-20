import { useState, useEffect } from 'react';
import GoalCard from '../components/GoalCard';
import AddGoal from './AddGoal'; 
import './Dashboard.css';

function Dashboard() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const totalSaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);

  useEffect(() => {
    fetch('http://localhost:3000/goals')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch goals');
        }
        return response.json();
      })
      .then((data) => {
        setGoals(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleAddGoal = (newGoal) => {
    fetch('http://localhost:3000/goals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newGoal),
    })
      .then((res) => res.json())
      .then((data) => {
        setGoals([...goals, data]);
      })
      .catch((err) => {
        console.error('Error adding goal:', err);
      });
  };

  const handleDeposit = (goalId, amount) => {
    // Optimistic UI update
    setGoals(goals.map(goal => 
      goal.id === goalId 
        ? { ...goal, savedAmount: goal.savedAmount + amount }
        : goal
    ));

    // PATCH request to json-server
    fetch(`http://localhost:3000/goals/${goalId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        savedAmount: goals.find(g => g.id === goalId).savedAmount + amount
      }),
    })
    .catch(err => {
      console.error('Deposit failed:', err);
      // Revert if error
      setGoals([...goals]);
    });
  };

  if (loading) return <p>Loading goals...</p>;
  if (error) return <p>Error: {error}</p>;


const handleDelete = (goalId) => {
  if (window.confirm('Are you sure you want to delete this goal?')) {
    // Optimistic UI update
    setGoals(goals.filter(goal => goal.id !== goalId));
    
    // DELETE request to json-server
    fetch(`http://localhost:3000/goals/${goalId}`, {
      method: 'DELETE',
    })
    .catch(err => {
      console.error('Delete failed:', err);
      setGoals([...goals]); // Revert if error
    });
  }
};

  return (
    <div className="dashboard-container">
      {/* Header Section */}
      <header className="dashboard-header">
        <h1>Your Goals</h1>
        <div className="stats-summary">
          <div className="stat-card">
            <span className="stat-value">${totalSaved.toLocaleString()}</span>
            <span className="stat-label">Total Saved</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{goals.length}</span>
            <span className="stat-label">Goals</span>
          </div>
        </div>
      </header>

      {/* Content Area */}
      <div className="content-grid">
        {/* Form Section */}
        <section className="form-section">
          <AddGoal onAddGoal={handleAddGoal} />
        </section>

        {/* Goals Section */}
        <section className="goals-section">
          {loading ? (
            <div className="loading-spinner"></div>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : (
            <div className="goals-grid">
              {goals.map((goal) => (
                <GoalCard 
                  key={goal.id} 
                  goal={goal} 
                  onDeposit={handleDeposit} 
                  onDelete={handleDelete} 
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Dashboard;