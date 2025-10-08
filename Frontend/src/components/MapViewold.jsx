import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';

// Fix marker icons for Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-shadow.png',
});

const MapView = ({ onMarkerClick, searchTerm }) => {
  // Load markers from localStorage on startup
  const [markers, setMarkers] = useState(() => {
    const savedMarkers = localStorage.getItem('thaparMapMarkers');
    return savedMarkers ? JSON.parse(savedMarkers) : [];
  });

  // Filtered markers based on search term
  const [filteredMarkers, setFilteredMarkers] = useState(markers);

  // File input reference for import
  const fileInputRef = useRef(null);

  // Save markers to localStorage whenever markers change
  useEffect(() => {
    localStorage.setItem('thaparMapMarkers', JSON.stringify(markers));
  }, [markers]);

  // Filter markers based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredMarkers(markers);
    } else {
      const filtered = markers.filter(marker =>
        marker.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMarkers(filtered);
    }
  }, [searchTerm, markers]);

  function MapClickHandler() {
    useMapEvents({
      click(e) {
        const name = prompt("Enter Location Name:");
        if (!name) return;

        const newMarker = {
          id: Date.now(),
          name,
          lat: e.latlng.lat,
          lng: e.latlng.lng,
          timestamp: new Date().toLocaleString()
        };
        setMarkers((prev) => [...prev, newMarker]);
      }
    });
    return null;
  }

  // Function to delete a marker
  const deleteMarker = (markerId) => {
    setMarkers(prev => prev.filter(m => m.id !== markerId));
  };

  // Function to export markers as JSON
  const exportMarkers = () => {
    if (markers.length === 0) {
      alert('No locations to export!');
      return;
    }

    const dataStr = JSON.stringify(markers, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'thapar_map_locations.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  // Function to trigger file input
  const triggerImport = () => {
    fileInputRef.current?.click();
  };

  // Function to handle file import
  const handleFileImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.name.endsWith('.json')) {
      alert('Please select a JSON file!');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
        
        if (!Array.isArray(importedData)) {
          alert('Invalid JSON format! Expected an array of locations.');
          return;
        }

        const validLocations = importedData.filter(location => {
          return (
            location &&
            typeof location.name === 'string' &&
            typeof location.lat === 'number' &&
            typeof location.lng === 'number' &&
            location.lat >= -90 && location.lat <= 90 &&
            location.lng >= -180 && location.lng <= 180
          );
        });

        if (validLocations.length === 0) {
          alert('No valid locations found in the file!');
          return;
        }

        const action = window.confirm(
          `Found ${validLocations.length} valid locations.\n\n` +
          `Click OK to ADD to existing locations (${markers.length})\n` +
          `Click Cancel to REPLACE all existing locations`
        );

        if (action) {
          const newIds = validLocations.map(loc => ({
            ...loc,
            id: Date.now() + Math.random(),
            timestamp: loc.timestamp || 'Imported on ' + new Date().toLocaleString()
          }));
          setMarkers(prev => [...prev, ...newIds]);
          alert(`Successfully imported ${validLocations.length} locations!`);
        } else {
          const newLocations = validLocations.map(loc => ({
            ...loc,
            id: Date.now() + Math.random(),
            timestamp: loc.timestamp || 'Imported on ' + new Date().toLocaleString()
          }));
          setMarkers(newLocations);
          alert(`Successfully replaced with ${validLocations.length} locations!`);
        }

      } catch (error) {
        alert('Error reading JSON file: ' + error.message);
      }
    };

    reader.readAsText(file);
    event.target.value = '';
  };

  // Function to clear all markers
  const clearAllMarkers = () => {
    if (window.confirm('Are you sure you want to delete all locations?')) {
      setMarkers([]);
      localStorage.removeItem('thaparMapMarkers');
    }
  };

  // Thapar University coordinates
  const thaparCenter = [30.3544, 76.3662];

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileImport}
        accept=".json"
        style={{ display: 'none' }}
      />

      {/* Control Panel */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        zIndex: 1000,
        backgroundColor: 'white',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        fontSize: '12px'
      }}>
        <div style={{ marginBottom: '8px' }}>
          <strong>Share Locations:</strong>
        </div>
        
        <button 
          onClick={exportMarkers}
          style={{
            padding: '5px 10px',
            marginRight: '5px',
            marginBottom: '5px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer',
            fontSize: '11px'
          }}
        >
          📥 Export JSON
        </button>
        
        <button 
          onClick={triggerImport}
          style={{
            padding: '5px 10px',
            marginRight: '5px',
            marginBottom: '5px',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer',
            fontSize: '11px'
          }}
        >
          📤 Import JSON
        </button>
        
        <br />
        
        <button 
          onClick={clearAllMarkers}
          style={{
            padding: '5px 10px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer',
            fontSize: '11px'
          }}
        >
          🗑️ Clear All
        </button>
      </div>

      <MapContainer 
        center={thaparCenter} 
        zoom={16.9} 
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />

        <MapClickHandler />

        {/* Markers without popups - they trigger InfoPanel instead */}
        {filteredMarkers.map(marker => (
          <Marker 
            key={marker.id} 
            position={[marker.lat, marker.lng]}
            eventHandlers={{
              click: () => {
                // Call the parent's onMarkerClick function to show InfoPanel
                if (onMarkerClick) {
                  onMarkerClick(marker, deleteMarker);
                }
              }
            }}
          />
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;