import React, { useState } from 'react';

const SearchBar = ({ onSearch, onSearchSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    onSearch(value); // Still call onSearch for real-time updates
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      // Trigger search submission when Enter is pressed
      if (onSearchSubmit) {
        onSearchSubmit(inputValue);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit(inputValue);
    }
  };

  return (
    <div style={{
      position: 'absolute',
      top: '20px',
      left: '20px',
      zIndex: 1000,
      backgroundColor: 'white',
      padding: '8px 12px',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
    }}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type exact location name..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          style={{
            width: '250px',
            padding: '8px 12px',
            border: '2px solid #ddd',
            borderRadius: '6px',
            fontSize: '14px',
            outline: 'none',
            transition: 'border-color 0.2s ease'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#007bff';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#ddd';
          }}
        />
        <div style={{
          fontSize: '11px',
          color: '#666',
          marginTop: '4px',
          textAlign: 'center'
        }}>
          Press Enter to search
        </div>
      </form>
    </div>
  );
};

export default SearchBar;