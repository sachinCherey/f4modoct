import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes
import { Provider } from 'react-redux';
import store from './store'; // Import your Redux store
import HomePage from './HomePage';
import HistoryPage from './HistoryPage'; // Import the HistoryPage component

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes> {/* Use Routes instead of Switch */}
            <Route path="/" element={<HomePage />} />
            <Route path="/history" element={<HistoryPage />} /> {/* Add the route for HistoryPage */}
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
