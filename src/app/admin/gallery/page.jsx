/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from 'react';

export default function GalleryAdmin() {
  const [gallery, setGallery] = useState([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/data/gallery')
      .then(res => res.json())
      .then(json => {
        if (Array.isArray(json)) setGallery(json);
      })
      .catch(err => console.error(err));
  }, []);

  const saveGallery = async (updatedData) => {
    setSaving(true);
    setMessage('');
    try {
      const res = await fetch('/api/data/gallery', {
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
    const newData = [...gallery, { title: '', beforeImage: '', afterImage: '' }];
    setGallery(newData);
  };

  const handleChange = (index, field, value) => {
    const newData = [...gallery];
    newData[index] = { ...newData[index], [field]: value };
    setGallery(newData);
  };

  const handleImageUpload = async (index, field, file) => {
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
        handleChange(index, field, data.url);
      } else {
        alert(`Upload failed: ${data.error || 'Unknown error'}`);
      }
    } catch (err) {
      console.error(err);
      alert('Error uploading file');
    }
  };

  const handleDelete = (index) => {
    const newData = gallery.filter((_, i) => i !== index);
    setGallery(newData);
    saveGallery(newData);
  };

  const handleSaveAll = () => {
    saveGallery(gallery);
  };

  return (
    <div className="animate-fade-in">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Manage Gallery</h1>
          <p style={{ color: 'var(--admin-text-muted)', marginTop: '0.5rem', marginBottom: 0 }}>Add before/after photos of your patient cases.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={handleAdd} className="btn-primary" style={{ background: 'white', color: 'var(--admin-primary)', border: '1px solid var(--admin-primary)', boxShadow: 'none' }}>
            + Add New Case
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

      <div className="admin-grid-gallery" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '1.5rem' }}>
        {gallery.map((item, index) => (
          <div key={index} className="data-item-card animate-slide-in" style={{ animationDelay: `${index * 0.05}s` }}>
            <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
              <button onClick={() => handleDelete(index)} className="btn-danger" style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem' }}>Delete</button>
            </div>
            
            <div className="admin-form-group" style={{ marginTop: '1.5rem' }}>
              <label className="admin-label">Case Title / Description</label>
              <input type="text" placeholder="e.g. Invisalign Treatment" value={item.title || ''} onChange={(e) => handleChange(index, 'title', e.target.value)} className="admin-input" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '0.5rem' }}>
              <div>
                <label className="admin-label">Before Image</label>
                {item.beforeImage ? (
                  <div style={{ position: 'relative', marginTop: '0.5rem', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--admin-border)' }}>
                    <img src={item.beforeImage} alt="Before" style={{ width: '100%', height: '140px', objectFit: 'cover', display: 'block' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)', display: 'flex', alignItems: 'flex-end', padding: '1rem' }}>
                       <button onClick={() => handleChange(index, 'beforeImage', '')} className="btn-danger" style={{ width: '100%', padding: '0.4rem', fontSize: '0.8rem' }}>Remove</button>
                    </div>
                  </div>
                ) : (
                  <div className="upload-area" style={{ padding: '1rem', minHeight: '140px' }}>
                    <div style={{ fontSize: '1.5rem', color: 'var(--admin-primary)' }}>📸</div>
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ margin: '0', fontSize: '0.85rem', fontWeight: '600' }}>Upload Before</p>
                    </div>
                    <input type="file" onChange={(e) => handleImageUpload(index, 'beforeImage', e.target.files[0])} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }} />
                    <input type="text" placeholder="Or URL..." value={item.beforeImage || ''} onChange={(e) => handleChange(index, 'beforeImage', e.target.value)} className="admin-input" style={{ width: '100%', padding: '0.5rem', fontSize: '0.8rem' }} />
                  </div>
                )}
              </div>
              
              <div>
                <label className="admin-label">After Image</label>
                {item.afterImage ? (
                  <div style={{ position: 'relative', marginTop: '0.5rem', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--admin-border)' }}>
                    <img src={item.afterImage} alt="After" style={{ width: '100%', height: '140px', objectFit: 'cover', display: 'block' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)', display: 'flex', alignItems: 'flex-end', padding: '1rem' }}>
                       <button onClick={() => handleChange(index, 'afterImage', '')} className="btn-danger" style={{ width: '100%', padding: '0.4rem', fontSize: '0.8rem' }}>Remove</button>
                    </div>
                  </div>
                ) : (
                  <div className="upload-area" style={{ padding: '1rem', minHeight: '140px' }}>
                    <div style={{ fontSize: '1.5rem', color: 'var(--admin-secondary)' }}>✨</div>
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ margin: '0', fontSize: '0.85rem', fontWeight: '600' }}>Upload After</p>
                    </div>
                    <input type="file" onChange={(e) => handleImageUpload(index, 'afterImage', e.target.files[0])} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }} />
                    <input type="text" placeholder="Or URL..." value={item.afterImage || ''} onChange={(e) => handleChange(index, 'afterImage', e.target.value)} className="admin-input" style={{ width: '100%', padding: '0.5rem', fontSize: '0.8rem' }} />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        <div className="upload-area animate-slide-in" onClick={handleAdd} style={{ animationDelay: `${gallery.length * 0.05}s`, minHeight: '350px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
           <div style={{ fontSize: '3rem', color: 'var(--admin-primary)', marginBottom: '1rem' }}>+</div>
           <h3 style={{ margin: 0, color: 'var(--admin-text-main)' }}>Add New Case</h3>
           <p style={{ color: 'var(--admin-text-muted)', marginTop: '0.5rem' }}>Create a blank gallery entry</p>
        </div>
      </div>
    </div>
  );
}
