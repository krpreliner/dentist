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
    <div className="animate-fade-in">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">SEO Settings</h1>
          <p style={{ color: 'var(--admin-text-muted)', marginTop: '0.5rem', marginBottom: 0 }}>Optimize your website's search engine visibility.</p>
        </div>
      </div>

      {message && (
        <div className={`admin-toast ${message.includes('success') ? 'success' : 'error'}`} style={{ marginBottom: '1.5rem' }}>
          {message}
        </div>
      )}

      <div className="admin-card animate-slide-in">
        <form onSubmit={handleSave} style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
          <div className="admin-form-group" style={{ marginBottom: 0 }}>
            <label className="admin-label">Global Site Title</label>
            <input type="text" placeholder="e.g. Radiance Dentistry | Best Dental Clinic" name="title" value={data.title || ''} onChange={handleChange} className="admin-input" />
            <p style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)', marginTop: '0.5rem' }}>This title appears in browser tabs and search engine results.</p>
          </div>
          
          <div className="admin-form-group" style={{ marginBottom: 0 }}>
            <label className="admin-label">Meta Description</label>
            <textarea name="description" placeholder="A brief summary of your clinic..." value={data.description || ''} onChange={handleChange} className="admin-textarea" rows={3}></textarea>
            <p style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)', marginTop: '0.5rem' }}>Keep it between 150-160 characters for best SEO results.</p>
          </div>
          
          <div className="admin-form-group" style={{ marginBottom: 0 }}>
            <label className="admin-label">Keywords (comma separated)</label>
            <input type="text" placeholder="dentist, dental clinic, teeth whitening" name="keywords" value={data.keywords || ''} onChange={handleChange} className="admin-input" />
          </div>
          
          <div style={{ marginTop: '1rem', borderTop: '1px solid var(--admin-border)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? 'Saving...' : 'Save SEO Settings'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
