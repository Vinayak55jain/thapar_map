import React, { useState } from 'react';
import MapView from '../components/MapView';
import SearchBar from '../components/SearchBar';
import InfoPanel from '../components/InfoPanel';

const HomePage = () => {
  // State management - focused only on MapView
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteMarkerFunction, setDeleteMarkerFunction] = useState(null);

  // Handle marker click from MapView
  const handleMarkerClick = (marker, deleteFunction) => {
    console.log('Homepage: Marker clicked:', marker.name);
    setSelectedMarker(marker);
    setDeleteMarkerFunction(() => deleteFunction);
  };

  // Handle search (real-time typing)
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Handle search submission (when Enter is pressed)
  const handleSearchSubmit = (term) => {
    console.log('HomePage: Search submitted:', term);
    setSearchTerm(term); // This will trigger the marker reveal
  };

  // Close info panel
  const closeInfoPanel = () => {
    setSelectedMarker(null);
    setDeleteMarkerFunction(null);
  };

  // Handle marker deletion
  const handleMarkerDelete = (markerId) => {
    if (deleteMarkerFunction) {
      deleteMarkerFunction(markerId);
    }
    closeInfoPanel();
  };

  return (
    <div>
      {/* Search Bar */}
      <SearchBar 
        onSearch={handleSearch}
        onSearchSubmit={handleSearchSubmit}
      />

      {/* Custom Map Only */}
      <MapView 
        searchTerm={searchTerm}
        onMarkerClick={handleMarkerClick}
      />

      {/* Info Panel */}
      {selectedMarker && (
        <InfoPanel 
          marker={selectedMarker}
          onClose={closeInfoPanel}
          onDelete={handleMarkerDelete}
        />
      )}

      {/* App Title */}
      <div>
        🗺️ Thapar Custom Map
      </div>
    </div>
  );
};

export default HomePage;