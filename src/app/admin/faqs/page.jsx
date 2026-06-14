"use client";

import { useState, useEffect } from 'react';

export default function FaqsAdmin() {
  const [faqs, setFaqs] = useState([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [isDirty, setIsDirty] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  useEffect(() => {
    fetch(`/api/data/faqs?t=${Date.now()}`)
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
      if (res.ok) {
        setMessage('Saved successfully!');
        setIsDirty(false);
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Failed to save.');
      }
    } catch (err) {
      setMessage('Error saving data.');
    }
    setSaving(false);
  };

  const handleAdd = () => {
    const newFaqs = [...faqs, { question: '', answer: '' }];
    setFaqs(newFaqs);
    setIsDirty(true);
  };

  const handleChange = (index, field, value) => {
    const newFaqs = [...faqs];
    newFaqs[index] = { ...newFaqs[index], [field]: value };
    setFaqs(newFaqs);
    setIsDirty(true);
  };

  const confirmDelete = () => {
    if (deleteIndex === null) return;
    const newFaqs = faqs.filter((_, i) => i !== deleteIndex);
    setFaqs(newFaqs);
    saveFaqs(newFaqs);
    setDeleteIndex(null);
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
        <div className="admin-btn-group">
          <button onClick={handleAdd} className="btn-secondary">
            + Add New FAQ
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
            <p style={{ color: '#64748B', marginBottom: '1.5rem', lineHeight: '1.5' }}>Are you sure you want to delete this FAQ? This action cannot be undone unless you refresh without saving.</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button onClick={() => setDeleteIndex(null)} className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>Cancel</button>
              <button onClick={confirmDelete} className="btn-primary" style={{ background: '#EF4444', padding: '0.5rem 1rem', border: 'none', boxShadow: 'none' }}>Delete FAQ</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
        {faqs.map((faq, index) => (
          <div key={index} className="data-item-card animate-slide-in" style={{ animationDelay: `${index * 0.05}s` }}>
            <div style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 10 }}>
              <button onClick={() => setDeleteIndex(index)} className="btn-danger" style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem' }}>Delete</button>
            </div>
            
            <div style={{ marginTop: '1.5rem' }}>
              <div className="admin-form-group" style={{ marginBottom: '1rem' }}>
                <label className="admin-label">Question</label>
                <input type="text" placeholder="e.g. Does teeth whitening hurt?" value={faq.question} onChange={(e) => handleChange(index, 'question', e.target.value)} className="admin-input" style={{ fontWeight: '500' }} />
              </div>
              <div className="admin-form-group" style={{ marginBottom: 0 }}>
                <label className="admin-label">Answer</label>
                <textarea placeholder="Provide a detailed answer..." value={faq.answer} onChange={(e) => handleChange(index, 'answer', e.target.value)} className="admin-textarea" rows={3}></textarea>
              </div>
            </div>
          </div>
        ))}

        <div className="upload-area animate-slide-in" onClick={handleAdd} style={{ animationDelay: `${faqs.length * 0.05}s`, minHeight: '150px', display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: '1rem', background: 'transparent' }}>
           <div style={{ fontSize: '2rem', color: 'var(--admin-primary)', marginBottom: '0.5rem' }}>+</div>
           <h3 style={{ margin: 0, color: 'var(--admin-text-main)', fontSize: '1.1rem' }}>Add New FAQ</h3>
        </div>
      </div>
    </div>
  );
}
