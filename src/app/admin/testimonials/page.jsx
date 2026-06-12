"use client";

import { useState, useEffect } from 'react';

export default function TestimonialsAdmin() {
  const [testimonials, setTestimonials] = useState([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/data/testimonials')
      .then(res => res.json())
      .then(json => {
        if (Array.isArray(json)) setTestimonials(json);
      })
      .catch(err => console.error(err));
  }, []);

  const saveTestimonials = async (updatedData) => {
    setSaving(true);
    setMessage('');
    try {
      const res = await fetch('/api/data/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      if (res.ok) setMessage('Saved successfully!');
      else setMessage('Failed to save.');
    } catch (err) {
      setMessage('Error saving data.');
    }
    setSaving(false);
  };

  const handleAdd = () => {
    const newData = [...testimonials, { name: '', review: '', rating: 5 }];
    setTestimonials(newData);
  };

  const handleChange = (index, field, value) => {
    const newData = [...testimonials];
    newData[index][field] = value;
    setTestimonials(newData);
  };

  const handleDelete = (index) => {
    const newData = testimonials.filter((_, i) => i !== index);
    setTestimonials(newData);
    saveTestimonials(newData);
  };

  const handleSaveAll = () => {
    saveTestimonials(testimonials);
  };

  return (
    <div className="admin-card">
      <h1 className="admin-page-header">Manage Testimonials</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {testimonials.map((item, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '4px' }}>
            <div style={{ marginBottom: '0.5rem' }}>
              <label>Name</label>
              <input type="text" value={item.name || ''} onChange={(e) => handleChange(index, 'name', e.target.value)} className="admin-input" />
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
              <label>Rating (1-5)</label>
              <input type="number" min="1" max="5" value={item.rating || 5} onChange={(e) => handleChange(index, 'rating', parseInt(e.target.value))} className="admin-input" />
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
              <label>Review</label>
              <textarea value={item.review || ''} onChange={(e) => handleChange(index, 'review', e.target.value)} className="admin-input" rows={3}></textarea>
            </div>
            <button onClick={() => handleDelete(index)} style={{ background: 'red', color: 'white', border: 'none', padding: '0.5rem', cursor: 'pointer' }}>Delete</button>
          </div>
        ))}
        <button onClick={handleAdd} style={{ padding: '0.5rem', cursor: 'pointer' }}>+ Add Testimonial</button>
        <button onClick={handleSaveAll} className="btn-primary" disabled={saving}>
          {saving ? 'Saving...' : 'Save All Testimonials'}
        </button>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}
