/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from 'react';

export default function ServicesAdmin() {
  const [services, setServices] = useState([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [isDirty, setIsDirty] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  useEffect(() => {
    fetch(`/api/data/services?t=${Date.now()}`)
      .then(res => res.json())
      .then(json => {
        if (Array.isArray(json)) setServices(json);
      })
      .catch(err => console.error(err));
  }, []);

  const saveServices = async (updatedData) => {
    setSaving(true);
    setMessage('');
    try {
      const res = await fetch('/api/data/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      const data = await res.json().catch(() => ({}));
      
      if (res.ok) {
        setMessage('Saved successfully!');
        setIsDirty(false);
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage(`Failed to save: ${data.error || res.statusText}`);
      }
    } catch (err) {
      setMessage(`Error saving data: ${err.message}`);
    }
    setSaving(false);
  };

  const handleAdd = () => {
    const newData = [...services, { title: '', description: '', image: '' }];
    setServices(newData);
    setIsDirty(true);
  };

  const handleChange = (index, field, value) => {
    const newData = [...services];
    newData[index] = { ...newData[index], [field]: value };
    setServices(newData);
    setIsDirty(true);
  };

  const handleImageUpload = async (index, file) => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      
      if (data.success) {
        const newData = [...services];
        newData[index] = { ...newData[index], image: data.url };
        setServices(newData);
        saveServices(newData);
      } else {
        alert(`Upload failed: ${data.error || 'Unknown error'}`);
      }
    } catch (err) {
      console.error(err);
      alert('Error uploading file');
    }
  };

  const confirmDelete = () => {
    if (deleteIndex === null) return;
    const newData = services.filter((_, i) => i !== deleteIndex);
    setServices(newData);
    saveServices(newData);
    setDeleteIndex(null);
  };

  const handleSaveAll = () => {
    saveServices(services);
  };

  return (
    <div className="animate-fade-in">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Manage Services</h1>
          <p style={{ color: 'var(--admin-text-muted)', marginTop: '0.5rem', marginBottom: 0 }}>Add, edit, or remove dental services offered at the clinic.</p>
        </div>
        <div className="admin-btn-group">
          <button onClick={handleAdd} className="btn-secondary">
            + Add New Service
          </button>
          <button onClick={handleSaveAll} className="btn-primary" disabled={saving || !isDirty}>
            {saving ? 'Saving...' : 'Save All Changes'}
          </button>
        </div>
      </div>

      {message && (
        <div className={`admin-toast ${message.includes('success') ? 'success' : 'error'}`} style={{ marginBottom: '1.5rem' }}>
          {message}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteIndex !== null && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.6)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="animate-fade-in" style={{ background: 'white', padding: '2rem', borderRadius: '1rem', width: '100%', maxWidth: '400px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#0F172A', fontSize: '1.25rem' }}>Confirm Deletion</h3>
            <p style={{ color: '#64748B', marginBottom: '1.5rem', lineHeight: '1.5' }}>Are you sure you want to delete this service? This action cannot be undone unless you refresh without saving.</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button onClick={() => setDeleteIndex(null)} className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>Cancel</button>
              <button onClick={confirmDelete} className="btn-primary" style={{ background: '#EF4444', padding: '0.5rem 1rem', border: 'none', boxShadow: 'none' }}>Delete Service</button>
            </div>
          </div>
        </div>
      )}

      <div className="admin-grid-services" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
        {services.map((item, index) => (
          <div key={index} className="data-item-card animate-slide-in" style={{ animationDelay: `${index * 0.05}s` }}>
            <div style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 10 }}>
              <button onClick={() => setDeleteIndex(index)} className="btn-danger" style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem' }}>Delete</button>
            </div>
            
            <div className="admin-form-group" style={{ marginTop: '1.5rem' }}>
              <label className="admin-label">Service Title</label>
              <input type="text" placeholder="e.g. Dental Implants" value={item.title || ''} onChange={(e) => handleChange(index, 'title', e.target.value)} className="admin-input" />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Description</label>
              <textarea placeholder="Describe the service..." value={item.description || ''} onChange={(e) => handleChange(index, 'description', e.target.value)} className="admin-textarea" rows={3}></textarea>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Service Image</label>
              
              {item.image ? (
                <div style={{ position: 'relative', marginTop: '0.5rem', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--admin-border)' }}>
                  <img src={item.image} alt={item.title} style={{ width: '100%', height: '140px', objectFit: 'cover', display: 'block' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)', display: 'flex', alignItems: 'flex-end', padding: '1rem' }}>
                     <button onClick={() => handleChange(index, 'image', '')} className="btn-secondary" style={{ width: '100%', background: 'white', color: '#0F172A', border: 'none', fontSize: '0.85rem', padding: '0.5rem' }}>Replace / Remove Image</button>
                  </div>
                </div>
              ) : (
                <div className="upload-area" style={{ padding: '1.5rem', minHeight: '140px' }}>
                  <div style={{ fontSize: '1.5rem', color: 'var(--admin-primary)' }}>📸</div>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ margin: '0 0 0.25rem 0', fontWeight: '600', color: 'var(--admin-text-main)', fontSize: '0.9rem' }}>Upload Image</p>
                  </div>
                  <input type="file" onChange={(e) => handleImageUpload(index, e.target.files[0])} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }} />
                  <input type="text" placeholder="Or URL..." value={item.image || ''} onChange={(e) => handleChange(index, 'image', e.target.value)} className="admin-input" style={{ width: '100%', padding: '0.5rem', fontSize: '0.8rem' }} />
                </div>
              )}
            </div>
          </div>
        ))}

        <div className="upload-area animate-slide-in" onClick={handleAdd} style={{ animationDelay: `${services.length * 0.05}s`, minHeight: '350px', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'transparent' }}>
           <div style={{ fontSize: '2.5rem', color: 'var(--admin-primary)', marginBottom: '0.5rem' }}>+</div>
           <h3 style={{ margin: 0, color: 'var(--admin-text-main)', fontSize: '1.1rem' }}>Add New Service</h3>
        </div>
      </div>
    </div>
  );
}
