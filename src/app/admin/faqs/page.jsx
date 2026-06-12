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
    newFaqs[index][field] = value;
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
    <div className="admin-card">
      <h1 className="admin-page-header">Manage FAQs</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {faqs.map((faq, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '4px' }}>
            <div style={{ marginBottom: '0.5rem' }}>
              <label>Question</label>
              <input type="text" value={faq.question} onChange={(e) => handleChange(index, 'question', e.target.value)} className="admin-input" />
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
              <label>Answer</label>
              <textarea value={faq.answer} onChange={(e) => handleChange(index, 'answer', e.target.value)} className="admin-input" rows={3}></textarea>
            </div>
            <button onClick={() => handleDelete(index)} style={{ background: 'red', color: 'white', border: 'none', padding: '0.5rem', cursor: 'pointer' }}>Delete</button>
          </div>
        ))}
        <button onClick={handleAdd} style={{ padding: '0.5rem', cursor: 'pointer' }}>+ Add FAQ</button>
        <button onClick={handleSaveAll} className="btn-primary" disabled={saving}>
          {saving ? 'Saving...' : 'Save All FAQs'}
        </button>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}
