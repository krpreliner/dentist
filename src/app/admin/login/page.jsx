"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push('/admin');
        router.refresh(); // Force refresh to apply middleware bypass
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8FAFC', padding: '1rem', backgroundImage: 'radial-gradient(circle at top right, rgba(14, 165, 233, 0.1), transparent 40%), radial-gradient(circle at bottom left, rgba(20, 184, 166, 0.1), transparent 40%)' }}>
      <div className="animate-slide-in" style={{ backgroundColor: '#ffffff', padding: '3.5rem 2.5rem', borderRadius: '1.5rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)', width: '100%', maxWidth: '420px', border: '1px solid rgba(226, 232, 240, 0.8)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ width: '64px', height: '64px', background: 'linear-gradient(135deg, #0EA5E9, #14B8A6)', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '0 auto 1.5rem', color: 'white', boxShadow: '0 10px 15px -3px rgba(14, 165, 233, 0.2)' }}>
            🦷
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0F172A', margin: '0 0 0.5rem 0', letterSpacing: '-0.5px' }}>Welcome Back</h1>
          <p style={{ color: '#64748B', margin: 0, fontSize: '0.95rem' }}>Sign in to Radiance CMS</p>
        </div>

        {error && (
          <div className="animate-fade-in" style={{ backgroundColor: '#FEF2F2', color: '#EF4444', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid #FEE2E2' }}>
            <span style={{ fontWeight: 'bold' }}>!</span> {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#0F172A', fontSize: '0.9rem' }}>Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value.trim().toLowerCase())}
              required
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck="false"
              style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: '0.5rem', border: '1px solid #E2E8F0', outline: 'none', transition: 'all 0.2s', backgroundColor: '#F8FAFC', color: '#0F172A' }}
              placeholder="Enter your username"
              onFocus={(e) => { e.target.style.borderColor = '#0EA5E9'; e.target.style.backgroundColor = '#ffffff'; e.target.style.boxShadow = '0 0 0 3px rgba(14, 165, 233, 0.1)'; }}
              onBlur={(e) => { e.target.style.borderColor = '#E2E8F0'; e.target.style.backgroundColor = '#F8FAFC'; e.target.style.boxShadow = 'none'; }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#0F172A', fontSize: '0.9rem' }}>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: '0.5rem', border: '1px solid #E2E8F0', outline: 'none', transition: 'all 0.2s', backgroundColor: '#F8FAFC', color: '#0F172A' }}
              placeholder="Enter your password"
              onFocus={(e) => { e.target.style.borderColor = '#0EA5E9'; e.target.style.backgroundColor = '#ffffff'; e.target.style.boxShadow = '0 0 0 3px rgba(14, 165, 233, 0.1)'; }}
              onBlur={(e) => { e.target.style.borderColor = '#E2E8F0'; e.target.style.backgroundColor = '#F8FAFC'; e.target.style.boxShadow = 'none'; }}
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              width: '100%', 
              marginTop: '0.5rem', 
              padding: '0.875rem', 
              background: 'linear-gradient(135deg, #0EA5E9, #14B8A6)', 
              color: 'white', 
              border: 'none', 
              borderRadius: '0.5rem', 
              fontWeight: '600', 
              fontSize: '1rem', 
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              transition: 'all 0.3s',
              boxShadow: '0 4px 10px rgba(14, 165, 233, 0.2)'
            }}
            onMouseOver={(e) => { if(!loading) e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 6px 15px rgba(14, 165, 233, 0.3)'; }}
            onMouseOut={(e) => { if(!loading) e.target.style.transform = 'none'; e.target.style.boxShadow = '0 4px 10px rgba(14, 165, 233, 0.2)'; }}
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
