"use client";

import React, { useEffect, useState } from 'react';
import { FaList, FaQuoteLeft, FaQuestionCircle, FaImage } from 'react-icons/fa';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    services: 0,
    testimonials: 0,
    faqs: 0,
    gallery: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [servicesRes, testimonialsRes, faqsRes, galleryRes] = await Promise.all([
          fetch('/api/data/services'),
          fetch('/api/data/testimonials'),
          fetch('/api/data/faqs'),
          fetch('/api/data/gallery')
        ]);

        const services = await servicesRes.json();
        const testimonials = await testimonialsRes.json();
        const faqs = await faqsRes.json();
        const gallery = await galleryRes.json();

        setStats({
          services: services.length || 0,
          testimonials: testimonials.length || 0,
          faqs: faqs.length || 0,
          gallery: gallery.length || 0
        });
      } catch (error) {
        console.error("Error fetching stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { title: 'Total Services', value: stats.services, icon: <FaList />, color: '#00a6a6' },
    { title: 'Testimonials', value: stats.testimonials, icon: <FaQuoteLeft />, color: '#f39c12' },
    { title: 'FAQs', value: stats.faqs, icon: <FaQuestionCircle />, color: '#9b59b6' },
    { title: 'Gallery Images', value: stats.gallery, icon: <FaImage />, color: '#e74c3c' },
  ];

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
      <div style={{ color: 'var(--admin-primary)', fontSize: '1.2rem', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ width: '24px', height: '24px', border: '3px solid', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
        Loading your dashboard...
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Welcome back, Dr. Ruchi 👋</h1>
          <p style={{ color: 'var(--admin-text-muted)', marginTop: '0.5rem', marginBottom: 0 }}>Here is an overview of your website's content.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        {statCards.map((stat, index) => (
          <div key={index} className="admin-stat-card animate-slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="admin-stat-icon-wrapper" style={{ backgroundColor: stat.color + '15', color: stat.color }}>
              {stat.icon}
            </div>
            <div>
              <h3 className="admin-stat-value">{stat.value}</h3>
              <p className="admin-stat-label">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="admin-card animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <h2 style={{ marginTop: 0, color: 'var(--admin-text-main)', fontSize: '1.25rem' }}>Quick Actions</h2>
        <p style={{ color: 'var(--admin-text-muted)', marginBottom: '1.5rem' }}>
          Select a module from the sidebar to manage your website content. All changes made in the admin panel are saved instantly and reflected live on the website.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a href="/admin/services" className="btn-primary" style={{ textDecoration: 'none' }}>+ Add Service</a>
          <a href="/admin/gallery" className="btn-primary" style={{ textDecoration: 'none', background: 'white', color: 'var(--admin-primary)', border: '1px solid var(--admin-primary)', boxShadow: 'none' }}>+ Upload Image</a>
        </div>
      </div>
    </div>
  );
}
