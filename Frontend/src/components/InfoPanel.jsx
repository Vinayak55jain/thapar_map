import React from 'react';

const InfoPanel = ({ selectedNode, onClose, onDelete }) => {
  if (!selectedNode) return null;

  return (
    <>
      {/* Background overlay */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onClick={onClose}
      >
        {/* Popup content */}
        <div 
          style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            maxWidth: '400px',
            width: '90%',
            position: 'relative'
          }}
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        >
          {/* Close button */}
          <button 
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#666',
              padding: '5px',
              borderRadius: '50%',
              width: '35px',
              height: '35px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#f0f0f0'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            ✕
          </button>

          {/* Location name */}
          <h2 style={{ 
            margin: '0 0 16px 0', 
            fontSize: '20px', 
            color: '#333',
            paddingRight: '40px' // Space for close button
          }}>
            {selectedNode.name}
          </h2>

          {/* Location details */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              marginBottom: '8px',
              padding: '8px',
              backgroundColor: '#f8f9fa',
              borderRadius: '6px'
            }}>
              <span style={{ fontWeight: 'bold', color: '#555' }}>Latitude:</span>
              <span style={{ fontFamily: 'monospace', color: '#007bff' }}>
                {selectedNode.lat.toFixed(6)}
              </span>
            </div>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              marginBottom: '8px',
              padding: '8px',
              backgroundColor: '#f8f9fa',
              borderRadius: '6px'
            }}>
              <span style={{ fontWeight: 'bold', color: '#555' }}>Longitude:</span>
              <span style={{ fontFamily: 'monospace', color: '#007bff' }}>
                {selectedNode.lng.toFixed(6)}
              </span>
            </div>
          </div>

          {/* Timestamp */}
          {selectedNode.timestamp && (
            <div style={{ 
              marginBottom: '20px',
              padding: '8px',
              backgroundColor: '#e9ecef',
              borderRadius: '6px',
              fontSize: '14px',
              color: '#666'
            }}>
              <strong>Added:</strong> {selectedNode.timestamp}
            </div>
          )}

          {/* Action buttons */}
          <div style={{ 
            display: 'flex', 
            gap: '10px', 
            justifyContent: 'flex-end' 
          }}>
            <button 
              onClick={onClose}
              style={{
                padding: '10px 20px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Close
            </button>
            
            {onDelete && (
              <button 
                onClick={() => {
                  if (window.confirm(`Delete "${selectedNode.name}"?`)) {
                    onDelete(selectedNode.id);
                    onClose();
                  }
                }}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoPanel;