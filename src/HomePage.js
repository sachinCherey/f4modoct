// src/components/HomePage.js

import './App.css';
import React, { useState } from 'react';
import Loader from './Loader';
import { connect } from 'react-redux';
import { addWordToHistory } from './actions/wordHistoryActions';

function HomePage({ wordHistory, addWordToHistory }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState({
    word: '',
    nounDefinition: 'N/A',
    verbDefinition: 'N/A',
    audioLink: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    setLoading(true);

    fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + searchTerm)
      .then((response) => response.json())
      .then((data) => {
        const result = data[0] || {};

        const word = result.word || 'N/A';

        const nounDefinition =
          result.meanings.find((meaning) => meaning.partOfSpeech === 'noun')
            ?.definitions[0]?.definition || 'N/A';
        const verbDefinition =
          result.meanings.find((meaning) => meaning.partOfSpeech === 'verb')
            ?.definitions[0]?.definition || 'N/A';

        const phonetics = result.phonetics.filter((phonetic) => phonetic.audio);
        const audioLink = phonetics.length ? phonetics[0].audio : '';

        const filteredData = {
          word,
          nounDefinition,
          verbDefinition,
          audioLink,
        };

        setSearchResults(filteredData);
        setLoading(false);

        // Add the searched word to the history
        addWordToHistory(searchTerm);
      });
  };

  return (
    <div className="Home">
      <nav>
        <h1>Dictionary App</h1>
        <ul className="item">
          <a href="/">Home</a>
          <a href="/history">History</a>
        </ul>
      </nav>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter a word..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="search-results">
        {loading ? (
          <Loader />
        ) : (
          <div>
            <h2>{searchResults.word}</h2>
            <h3>Noun Definition:</h3>
            <p>
              <strong>Definition:</strong> {searchResults.nounDefinition}
            </p>
            <h3>Verb Definition:</h3>
            <p>
              <strong>Definition:</strong> {searchResults.verbDefinition}
            </p>
            {searchResults.audioLink && (
              <div key={searchResults.audioLink}>
                <p>
                  <strong>Audio:</strong>
                </p>
                <audio controls>
                  <source src={searchResults.audioLink} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  wordHistory: state.wordHistory,
});

export default connect(mapStateToProps, { addWordToHistory })(HomePage);
