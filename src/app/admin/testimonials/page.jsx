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
    newData[index] = { ...newData[index], [field]: value };
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
    <div className="animate-fade-in">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Manage Testimonials</h1>
          <p style={{ color: 'var(--admin-text-muted)', marginTop: '0.5rem', marginBottom: 0 }}>Manage patient reviews and ratings displayed on your site.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={handleAdd} className="btn-primary" style={{ background: 'white', color: 'var(--admin-primary)', border: '1px solid var(--admin-primary)', boxShadow: 'none' }}>
            + Add New Testimonial
          </button>
          <button onClick={handleSaveAll} className="btn-primary" disabled={saving}>
            {saving ? 'Saving...' : 'Save All Changes'}
          </button>
        </div>
      </div>

      {message && (
        <div className={`admin-toast ${message.includes('success') ? 'success' : 'error'}`} style={{ marginBottom: '1.5rem' }}>
          {message}
        </div>
      )}

      <div className="admin-grid-testimonials" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
        {testimonials.map((item, index) => (
          <div key={index} className="data-item-card animate-slide-in" style={{ animationDelay: `${index * 0.05}s` }}>
            <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
              <button onClick={() => handleDelete(index)} className="btn-danger" style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem' }}>Delete</button>
            </div>
            
            <div className="admin-form-group" style={{ marginTop: '1.5rem' }}>
              <label className="admin-label">Patient Name</label>
              <input type="text" placeholder="e.g. John Doe" value={item.name || ''} onChange={(e) => handleChange(index, 'name', e.target.value)} className="admin-input" />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Rating (1-5)</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <input type="number" min="1" max="5" value={item.rating || 5} onChange={(e) => handleChange(index, 'rating', parseInt(e.target.value))} className="admin-input" style={{ width: '100px' }} />
                <div style={{ color: '#F59E0B', fontSize: '1.25rem', display: 'flex', gap: '0.25rem' }}>
                   {Array.from({ length: 5 }).map((_, i) => (
                     <span key={i} style={{ opacity: i < (item.rating || 5) ? 1 : 0.3 }}>★</span>
                   ))}
                </div>
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Review</label>
              <textarea placeholder="What did the patient say?" value={item.review || ''} onChange={(e) => handleChange(index, 'review', e.target.value)} className="admin-textarea" rows={4}></textarea>
            </div>
          </div>
        ))}

        <div className="upload-area animate-slide-in" onClick={handleAdd} style={{ animationDelay: `${testimonials.length * 0.05}s`, minHeight: '350px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
           <div style={{ fontSize: '3rem', color: 'var(--admin-primary)', marginBottom: '1rem' }}>+</div>
           <h3 style={{ margin: 0, color: 'var(--admin-text-main)' }}>Add New Testimonial</h3>
           <p style={{ color: 'var(--admin-text-muted)', marginTop: '0.5rem' }}>Create a blank review card</p>
        </div>
      </div>
    </div>
  );
}
