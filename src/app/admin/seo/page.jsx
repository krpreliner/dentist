"use client";

import { useState, useEffect } from 'react';

export default function SeoAdmin() {
  const [data, setData] = useState({ title: '', description: '', keywords: '' });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/data/seo')
      .then(res => res.json())
      .then(json => {
        if (json && Object.keys(json).length > 0) setData(json);
      })
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      const res = await fetch('/api/data/seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) setMessage('Saved successfully!');
      else setMessage('Failed to save.');
    } catch (err) {
      setMessage('Error saving data.');
    }
    setSaving(false);
  };

  return (
    <div className="admin-card">
      <h1 className="admin-page-header">SEO Settings</h1>
      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label>Global Site Title</label>
          <input type="text" name="title" value={data.title || ''} onChange={handleChange} className="admin-input" />
        </div>
        <div>
          <label>Meta Description</label>
          <textarea name="description" value={data.description || ''} onChange={handleChange} className="admin-input" rows={3}></textarea>
        </div>
        <div>
          <label>Keywords (comma separated)</label>
          <input type="text" name="keywords" value={data.keywords || ''} onChange={handleChange} className="admin-input" />
        </div>
        <button type="submit" className="btn-primary" disabled={saving}>
          {saving ? 'Saving...' : 'Save SEO Settings'}
        </button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}
