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
    <div className="admin-card">
      <h1 className="admin-page-header">Contact Information</h1>
      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label>Phone Number</label>
          <input type="text" name="phone" value={data.phone || ''} onChange={handleChange} className="admin-input" />
        </div>
        <div>
          <label>Email Address</label>
          <input type="email" name="email" value={data.email || ''} onChange={handleChange} className="admin-input" />
        </div>
        <div>
          <label>Address</label>
          <textarea name="address" value={data.address || ''} onChange={handleChange} className="admin-input" rows={3}></textarea>
        </div>
        <div>
          <label>Office Hours</label>
          <textarea name="officeHours" value={data.officeHours || ''} onChange={handleChange} className="admin-input" rows={3}></textarea>
        </div>
        <button type="submit" className="btn-primary" disabled={saving}>
          {saving ? 'Saving...' : 'Save Contact Info'}
        </button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}
