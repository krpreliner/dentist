/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from 'react';

export default function ServicesAdmin() {
  const [services, setServices] = useState([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/data/services')
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
  };

  const handleChange = (index, field, value) => {
    const newData = [...services];
    newData[index] = { ...newData[index], [field]: value };
    setServices(newData);
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
        handleChange(index, 'image', data.url);
      } else {
        alert(`Upload failed: ${data.error || 'Unknown error'}`);
      }
    } catch (err) {
      console.error(err);
      alert('Error uploading file');
    }
  };

  const handleDelete = (index) => {
    const newData = services.filter((_, i) => i !== index);
    setServices(newData);
    saveServices(newData);
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
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={handleAdd} className="btn-primary" style={{ background: 'white', color: 'var(--admin-primary)', border: '1px solid var(--admin-primary)', boxShadow: 'none' }}>
            + Add New Service
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

      <div className="admin-grid-services" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
        {services.map((item, index) => (
          <div key={index} className="data-item-card animate-slide-in" style={{ animationDelay: `${index * 0.05}s` }}>
            <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
              <button onClick={() => handleDelete(index)} className="btn-danger" style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem' }}>Delete</button>
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
                  <img src={item.image} alt={item.title} style={{ width: '100%', height: '180px', objectFit: 'cover', display: 'block' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)', display: 'flex', alignItems: 'flex-end', padding: '1rem' }}>
                     <button onClick={() => handleChange(index, 'image', '')} className="btn-danger" style={{ width: '100%' }}>Remove Image</button>
                  </div>
                </div>
              ) : (
                <div className="upload-area">
                  <div style={{ fontSize: '2rem', color: 'var(--admin-primary)' }}>📸</div>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ margin: '0 0 0.5rem 0', fontWeight: '600', color: 'var(--admin-text-main)' }}>Click to upload image</p>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--admin-text-muted)' }}>PNG, JPG up to 5MB</p>
                  </div>
                  <input type="file" onChange={(e) => handleImageUpload(index, e.target.files[0])} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }} />
                  <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
                    <div style={{ flex: 1, height: '1px', background: 'var(--admin-border)' }}></div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>OR</span>
                    <div style={{ flex: 1, height: '1px', background: 'var(--admin-border)' }}></div>
                  </div>
                  <input type="text" placeholder="Paste Image URL here..." value={item.image || ''} onChange={(e) => handleChange(index, 'image', e.target.value)} className="admin-input" style={{ width: '100%' }} />
                </div>
              )}
            </div>
          </div>
        ))}

        <div className="upload-area animate-slide-in" onClick={handleAdd} style={{ animationDelay: `${services.length * 0.05}s`, minHeight: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
           <div style={{ fontSize: '3rem', color: 'var(--admin-primary)', marginBottom: '1rem' }}>+</div>
           <h3 style={{ margin: 0, color: 'var(--admin-text-main)' }}>Add New Service</h3>
           <p style={{ color: 'var(--admin-text-muted)', marginTop: '0.5rem' }}>Create a blank service card</p>
        </div>
      </div>
    </div>
  );
}
