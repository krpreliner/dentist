"use client";

import { useState, useEffect } from 'react';

export default function FaqsAdmin() {
  const [faqs, setFaqs] = useState([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/data/faqs')
      .then(res => res.json())
      .then(json => {
        if (Array.isArray(json)) setFaqs(json);
      })
      .catch(err => console.error(err));
  }, []);

  const saveFaqs = async (updatedFaqs) => {
    setSaving(true);
    setMessage('');
    try {
      const res = await fetch('/api/data/faqs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFaqs),
      });
      if (res.ok) setMessage('Saved successfully!');
      else setMessage('Failed to save.');
    } catch (err) {
      setMessage('Error saving data.');
    }
    setSaving(false);
  };

  const handleAdd = () => {
    const newFaqs = [...faqs, { question: '', answer: '' }];
    setFaqs(newFaqs);
  };

  const handleChange = (index, field, value) => {
    const newFaqs = [...faqs];
    newFaqs[index] = { ...newFaqs[index], [field]: value };
    setFaqs(newFaqs);
  };

  const handleDelete = (index) => {
    const newFaqs = faqs.filter((_, i) => i !== index);
    setFaqs(newFaqs);
    saveFaqs(newFaqs);
  };

  const handleSaveAll = () => {
    saveFaqs(faqs);
  };

  return (
    <div className="animate-fade-in">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Manage FAQs</h1>
          <p style={{ color: 'var(--admin-text-muted)', marginTop: '0.5rem', marginBottom: 0 }}>Update the frequently asked questions displayed on your site.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={handleAdd} className="btn-primary" style={{ background: 'white', color: 'var(--admin-primary)', border: '1px solid var(--admin-primary)', boxShadow: 'none' }}>
            + Add New FAQ
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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
        {faqs.map((faq, index) => (
          <div key={index} className="data-item-card animate-slide-in" style={{ animationDelay: `${index * 0.05}s`, display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
            <div style={{ flex: 1 }}>
              <div className="admin-form-group" style={{ marginBottom: '1rem' }}>
                <label className="admin-label">Question</label>
                <input type="text" placeholder="e.g. Does teeth whitening hurt?" value={faq.question} onChange={(e) => handleChange(index, 'question', e.target.value)} className="admin-input" style={{ fontWeight: '500' }} />
              </div>
              <div className="admin-form-group" style={{ marginBottom: 0 }}>
                <label className="admin-label">Answer</label>
                <textarea placeholder="Provide a detailed answer..." value={faq.answer} onChange={(e) => handleChange(index, 'answer', e.target.value)} className="admin-textarea" rows={3}></textarea>
              </div>
            </div>
            
            <div style={{ paddingTop: '1.8rem' }}>
              <button onClick={() => handleDelete(index)} className="btn-danger" style={{ padding: '0.5rem 1rem' }}>Delete</button>
            </div>
          </div>
        ))}

        <div className="upload-area animate-slide-in" onClick={handleAdd} style={{ animationDelay: `${faqs.length * 0.05}s`, minHeight: '150px', display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: '1rem' }}>
           <div style={{ fontSize: '2rem', color: 'var(--admin-primary)', marginBottom: '0.5rem' }}>+</div>
           <h3 style={{ margin: 0, color: 'var(--admin-text-main)' }}>Add New FAQ</h3>
        </div>
      </div>
    </div>
  );
}
