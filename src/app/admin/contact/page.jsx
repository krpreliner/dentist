"use client";

import { useState, useEffect } from 'react';

export default function ContactAdmin() {
  const [data, setData] = useState({ phone: '', email: '', address: '', officeHours: '' });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/data/contact')
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
      const res = await fetch('/api/data/contact', {
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
          <h1 className="admin-page-title">Contact Information</h1>
          <p style={{ color: 'var(--admin-text-muted)', marginTop: '0.5rem', marginBottom: 0 }}>Manage clinic contact details and operating hours.</p>
        </div>
      </div>

      {message && (
        <div className={`admin-toast ${message.includes('success') ? 'success' : 'error'}`} style={{ marginBottom: '1.5rem' }}>
          {message}
        </div>
      )}

      <div className="admin-card animate-slide-in">
        <form onSubmit={handleSave} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div className="admin-form-group">
            <label className="admin-label">Phone Number</label>
            <input type="text" placeholder="+91 1234567890" name="phone" value={data.phone || ''} onChange={handleChange} className="admin-input" />
          </div>
          
          <div className="admin-form-group">
            <label className="admin-label">Email Address</label>
            <input type="email" placeholder="contact@radiancedentistry.com" name="email" value={data.email || ''} onChange={handleChange} className="admin-input" />
          </div>
          
          <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
            <label className="admin-label">Office Address</label>
            <textarea name="address" placeholder="Full address details..." value={data.address || ''} onChange={handleChange} className="admin-textarea" rows={3}></textarea>
          </div>
          
          <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
            <label className="admin-label">Office Hours</label>
            <textarea name="officeHours" placeholder="E.g. Mon-Fri: 9AM - 8PM" value={data.officeHours || ''} onChange={handleChange} className="admin-textarea" rows={3}></textarea>
          </div>
          
          <div style={{ gridColumn: '1 / -1', marginTop: '1rem', borderTop: '1px solid var(--admin-border)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? 'Saving...' : 'Save Contact Info'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
