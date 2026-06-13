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
    newData[index][field] = value;
    setGallery(newData);
  };

  const handleImageUpload = async (index, field, file) => {
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
        // ImgBB returns the URL in data.data.url
        handleChange(index, field, data.data.url);
      } else {
        alert(`Upload failed: ${data.error?.message || 'Unknown error'}`);
      }
    } catch (err) {
      console.error(err);
      alert('Upload error');
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
    <div className="admin-card">
      <h1 className="admin-page-header">Manage Before/After Gallery</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {gallery.map((item, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '4px' }}>
            <div style={{ marginBottom: '0.5rem' }}>
              <label>Case Title / Description</label>
              <input type="text" value={item.title || ''} onChange={(e) => handleChange(index, 'title', e.target.value)} className="admin-input" />
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
              <div style={{ flex: 1 }}>
                <label>Before Image</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {item.beforeImage && (
                    <div style={{ position: 'relative' }}>
                      <img src={item.beforeImage} alt="Before" style={{ width: '100%', maxHeight: '150px', objectFit: 'contain', background: '#f5f5f5', borderRadius: '4px' }} />
                      <button onClick={() => handleChange(index, 'beforeImage', '')} style={{ position: 'absolute', top: '4px', right: '4px', background: 'red', color: 'white', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>✕</button>
                    </div>
                  )}
                  <input type="text" placeholder="Or Paste Before Image URL..." value={item.beforeImage || ''} onChange={(e) => handleChange(index, 'beforeImage', e.target.value)} className="admin-input" />
                  <input type="file" onChange={(e) => handleImageUpload(index, 'beforeImage', e.target.files[0])} />
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <label>After Image</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {item.afterImage && (
                    <div style={{ position: 'relative' }}>
                      <img src={item.afterImage} alt="After" style={{ width: '100%', maxHeight: '150px', objectFit: 'contain', background: '#f5f5f5', borderRadius: '4px' }} />
                      <button onClick={() => handleChange(index, 'afterImage', '')} style={{ position: 'absolute', top: '4px', right: '4px', background: 'red', color: 'white', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>✕</button>
                    </div>
                  )}
                  <input type="text" placeholder="Or Paste After Image URL..." value={item.afterImage || ''} onChange={(e) => handleChange(index, 'afterImage', e.target.value)} className="admin-input" />
                  <input type="file" onChange={(e) => handleImageUpload(index, 'afterImage', e.target.files[0])} />
                </div>
              </div>
            </div>
            <button onClick={() => handleDelete(index)} style={{ background: 'red', color: 'white', border: 'none', padding: '0.5rem', cursor: 'pointer', marginTop: '0.5rem' }}>Delete Case</button>
          </div>
        ))}
        <button onClick={handleAdd} style={{ padding: '0.5rem', cursor: 'pointer' }}>+ Add Gallery Case</button>
        <button onClick={handleSaveAll} className="btn-primary" disabled={saving}>
          {saving ? 'Saving...' : 'Save All Gallery Cases'}
        </button>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}
