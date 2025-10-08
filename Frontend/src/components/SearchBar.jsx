import React, { useState, useEffect, useRef } from 'react';

const SearchBar = ({ onSearch, onSearchSubmit, locations = [] }) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // Fuzzy search function
  const fuzzySearch = (query, locations) => {
    if (!query.trim()) return [];
    
    const queryLower = query.toLowerCase();
    const matches = locations
      .map(location => {
        const nameLower = location.name.toLowerCase();
        let score = 0;
        
        // Exact match gets highest score
        if (nameLower === queryLower) {
          score = 1000;
        }
        // Starts with query gets high score
        else if (nameLower.startsWith(queryLower)) {
          score = 500 + (queryLower.length / nameLower.length) * 100;
        }
        // Contains query gets medium score
        else if (nameLower.includes(queryLower)) {
          score = 200 + (queryLower.length / nameLower.length) * 50;
        }
        // Fuzzy matching for partial matches
        else {
          let fuzzyScore = 0;
          let queryIndex = 0;
          
          for (let i = 0; i < nameLower.length && queryIndex < queryLower.length; i++) {
            if (nameLower[i] === queryLower[queryIndex]) {
              fuzzyScore += 10;
              queryIndex++;
            }
          }
          
          // Only include if at least 60% of query characters are found
          if (queryIndex >= queryLower.length * 0.6) {
            score = fuzzyScore;
          }
        }
        
        return { ...location, score };
      })
      .filter(location => location.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8); // Limit to top 8 matches
    
    return matches;
  };

  useEffect(() => {
    if (inputValue.trim()) {
      const matches = fuzzySearch(inputValue, locations);
      setSuggestions(matches);
      setShowDropdown(matches.length > 0);
      setSelectedIndex(-1);
    } else {
      setSuggestions([]);
      setShowDropdown(false);
      setSelectedIndex(-1);
    }
  }, [inputValue, locations]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    onSearch(value);
  };

  const handleSuggestionClick = (location) => {
    setInputValue(location.name);
    setShowDropdown(false);
    if (onSearchSubmit) {
      onSearchSubmit(location.name);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        // Select the highlighted suggestion
        handleSuggestionClick(suggestions[selectedIndex]);
      } else {
        // Submit current input
        if (onSearchSubmit) {
          onSearchSubmit(inputValue);
        }
        setShowDropdown(false);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => prev > -1 ? prev - 1 : -1);
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
      setSelectedIndex(-1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedIndex >= 0 && suggestions[selectedIndex]) {
      handleSuggestionClick(suggestions[selectedIndex]);
    } else if (onSearchSubmit) {
      onSearchSubmit(inputValue);
    }
    setShowDropdown(false);
  };

  const handleBlur = (e) => {
    // Delay hiding dropdown to allow click on suggestions
    setTimeout(() => {
      if (!dropdownRef.current?.contains(document.activeElement)) {
        setShowDropdown(false);
        setSelectedIndex(-1);
      }
    }, 150);
  };

  const highlightMatch = (text, query) => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query.split('').join('.*?')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => {
      if (part.toLowerCase().includes(query.toLowerCase())) {
        return <strong key={index} style={{ backgroundColor: '#fff3cd' }}>{part}</strong>;
      }
      return part;
    });
  };

  return (
    <div style={{
      position: 'absolute',
      top: '20px',
      left: '20px',
      zIndex: 1000,
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
      width: '300px'
    }}>
      <form onSubmit={handleSubmit}>
        <div style={{ padding: '8px 12px' }}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search locations..."
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            onBlur={handleBlur}
            onFocus={() => inputValue.trim() && setShowDropdown(suggestions.length > 0)}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '2px solid #ddd',
              borderRadius: '6px',
              fontSize: '14px',
              outline: 'none',
              transition: 'border-color 0.2s ease',
              boxSizing: 'border-box'
            }}
            // onFocus={(e) => {
            //   e.target.style.borderColor = '#007bff';
            //   if (inputValue.trim()) setShowDropdown(suggestions.length > 0);
            // }}
            // onBlur={(e) => {
            //   e.target.style.borderColor = '#ddd';
            //   handleBlur(e);
            // }}
          />
          <div style={{
            fontSize: '11px',
            color: '#666',
            marginTop: '4px',
            textAlign: 'center'
          }}>
            Use ↑↓ to navigate, Enter to select
          </div>
        </div>
      </form>

      {showDropdown && suggestions.length > 0 && (
        <div
          ref={dropdownRef}
          style={{
            borderTop: '1px solid #eee',
            maxHeight: '250px',
            overflowY: 'auto'
          }}
        >
          {suggestions.map((location, index) => (
            <div
              key={location.id}
              onClick={() => handleSuggestionClick(location)}
              style={{
                padding: '10px 12px',
                cursor: 'pointer',
                borderBottom: index < suggestions.length - 1 ? '1px solid #f0f0f0' : 'none',
                backgroundColor: selectedIndex === index ? '#f8f9fa' : 'white',
                fontSize: '14px',
                transition: 'background-color 0.1s ease'
              }}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              <div style={{ fontWeight: '500', color: '#333' }}>
                {highlightMatch(location.name, inputValue)}
              </div>
              <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>
                {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;