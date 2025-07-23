import React, { useState } from 'react';

const AddNodeForm = ({ isVisible, onClose, onSubmit, coordinates }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'academic',
    description: '',
    tags: ''
  });

  const [errors, setErrors] = useState({});

  const categories = [
    { value: 'academic', label: 'Academic Building' },
    { value: 'residence', label: 'Residence/Hostel' },
    { value: 'dining', label: 'Dining/Cafeteria' },
    { value: 'sports', label: 'Sports/Recreation' },
    { value: 'admin', label: 'Administrative' },
    { value: 'entrance', label: 'Entrance/Gate' },
    { value: 'other', label: 'Other' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Location name is required';
    }
    
    if (formData.name.length > 50) {
      newErrors.name = 'Name must be less than 50 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const newNode = {
      id: Date.now(), // Simple ID generation
      name: formData.name.trim(),
      category: formData.category,
      description: formData.description.trim(),
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      lat: coordinates.lat,
      lng: coordinates.lng,
      isTemporary: true,
      createdAt: new Date().toISOString()
    };

    onSubmit(newNode);
    
    // Reset form
    setFormData({
      name: '',
      category: 'academic',
      description: '',
      tags: ''
    });
    setErrors({});
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      category: 'academic',
      description: '',
      tags: ''
    });
    setErrors({});
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 2000,
      backgroundColor: 'white',
      padding: '24px',
      borderRadius: '12px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
      width: '90%',
      maxWidth: '400px',
      maxHeight: '80vh',
      overflowY: 'auto'
    }}>
      <h3 style={{ margin: '0 0 16px 0', color: '#333' }}>Add New Location</h3>
      
      {coordinates && (
        <div style={{ 
          backgroundColor: '#f5f5f5', 
          padding: '8px 12px', 
          borderRadius: '6px', 
          marginBottom: '16px',
          fontSize: '14px'
        }}>
          <strong>Coordinates:</strong> {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>
            Location Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="e.g., Central Library, Hostel Block A"
            style={{
              width: '100%',
              padding: '8px 12px',
              border: errors.name ? '2px solid #f44336' : '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '14px',
              boxSizing: 'border-box'
            }}
          />
          {errors.name && (
            <div style={{ color: '#f44336', fontSize: '12px', marginTop: '4px' }}>
              {errors.name}
            </div>
          )}
        </div>

        {/* Category Field */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>
            Category *
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '14px',
              boxSizing: 'border-box'
            }}
          >
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Description Field */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Brief description of the location..."
            rows="3"
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '14px',
              boxSizing: 'border-box',
              resize: 'vertical'
            }}
          />
        </div>

        {/* Tags Field */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>
            Tags
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
            placeholder="e.g., wifi, 24/7, parking (comma-separated)"
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '14px',
              boxSizing: 'border-box'
            }}
          />
          <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
            Separate tags with commas
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={handleCancel}
            style={{
              padding: '10px 16px',
              backgroundColor: '#f5f5f5',
              color: '#333',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{
              padding: '10px 16px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Add Location
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNodeForm;