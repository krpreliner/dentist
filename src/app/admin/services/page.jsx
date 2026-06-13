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
    newData[index][field] = value;
    setServices(newData);
  };

  const handleImageUpload = async (index, file) => {
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file); // ImgBB requires the field to be named "image"

    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    if (!apiKey) {
      alert('ImgBB API Key is missing. Please add NEXT_PUBLIC_IMGBB_API_KEY to Vercel.');
      return;
    }

    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      
      if (data.success) {
        handleChange(index, 'image', data.data.url);
      } else {
        alert(`Upload failed: ${data.error?.message || 'Unknown error'}`);
      }
    } catch (err) {
      console.error(err);
      alert('Upload error');
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
    <div className="admin-card">
      <h1 className="admin-page-header">Manage Services</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {services.map((item, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '4px' }}>
            <div style={{ marginBottom: '0.5rem' }}>
              <label>Service Title</label>
              <input type="text" value={item.title || ''} onChange={(e) => handleChange(index, 'title', e.target.value)} className="admin-input" />
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
              <label>Description</label>
              <textarea value={item.description || ''} onChange={(e) => handleChange(index, 'description', e.target.value)} className="admin-input" rows={3}></textarea>
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
              <label>Service Image</label>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                {item.image && (
                  <div style={{ position: 'relative' }}>
                    <img src={item.image} alt={item.title} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px' }} />
                    <button onClick={() => handleChange(index, 'image', '')} style={{ position: 'absolute', top: '-8px', right: '-8px', background: 'red', color: 'white', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>✕</button>
                  </div>
                )}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <input type="text" placeholder="Or Paste Image URL directly..." value={item.image || ''} onChange={(e) => handleChange(index, 'image', e.target.value)} className="admin-input" style={{ flex: 1 }} />
                    <span style={{ fontSize: '0.8rem', color: '#666' }}>OR</span>
                    <input type="file" onChange={(e) => handleImageUpload(index, e.target.files[0])} style={{ flex: 1 }} />
                  </div>
                </div>
              </div>
            </div>
            <button onClick={() => handleDelete(index)} style={{ background: 'red', color: 'white', border: 'none', padding: '0.5rem', cursor: 'pointer' }}>Delete</button>
          </div>
        ))}
        <button onClick={handleAdd} style={{ padding: '0.5rem', cursor: 'pointer' }}>+ Add Service</button>
        <button onClick={handleSaveAll} className="btn-primary" disabled={saving}>
          {saving ? 'Saving...' : 'Save All Services'}
        </button>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}
