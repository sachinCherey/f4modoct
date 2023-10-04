// src/components/HistoryPage.js

import React from 'react';
import { connect } from 'react-redux';

function HistoryPage({ wordHistory }) {
  return (
    <div className="History">
      <h2>Search History</h2>
      <ul>
        {wordHistory.map((word, index) => (
          <li key={index}>{word}</li>
        ))}
      </ul>
    </div>
  );
}

const mapStateToProps = (state) => ({
  wordHistory: state.wordHistory.history,
});

export default connect(mapStateToProps)(HistoryPage);
