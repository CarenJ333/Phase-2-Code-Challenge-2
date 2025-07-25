# Smart Goal Planner 

A React-based financial goal tracking application that helps users manage multiple savings goals with full CRUD functionality.



## Features 

- **Goal Management**
  - Create new savings goals (name, target amount, category, deadline)
  - Track progress with visual indicators
  - Make deposits to any goal
  - Delete goals when no longer needed

- **Visual Tracking**
  - Progress bars for each goal
  - Remaining amount calculation
  - Total savings overview
  - Deadline warnings (within 30 days)

- **Data Persistence**
  - Uses `json-server` as a mock backend
  - All changes persist to `db.json`

## Technologies Used 

- **Frontend**
  - React (Vite)
  - CSS Modules

- **Backend**
  - json-server
  - RESTful endpoints

## Installation 

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/smart-goal-planner.git
   cd smart-goal-planner

2. Install dependencies:

    ```bash
    npm install

3. Start the development server:

   ```bash
    npm run dev

4. In a separate terminal, start json-server:

    ```bash
    npx json-server --watch db.json --port 3000
5. Open your browser to:

    ```text
    http://localhost:5173