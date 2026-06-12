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

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Dashboard Overview</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {statCards.map((stat, index) => (
          <div key={index} className="admin-card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ backgroundColor: stat.color + '20', color: stat.color, padding: '1rem', borderRadius: '50%', fontSize: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {stat.icon}
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '2rem', color: 'var(--admin-primary)' }}>{stat.value}</h3>
              <p style={{ margin: 0, color: 'var(--admin-text-light)', fontSize: '0.9rem' }}>{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="admin-card">
        <h2 style={{ marginTop: 0, color: 'var(--admin-primary)' }}>Welcome to Radiance CMS</h2>
        <p style={{ color: 'var(--admin-text-light)' }}>
          Select a module from the sidebar to manage your website content. All changes made in the admin panel are saved instantly and reflected live on the website.
        </p>
      </div>
    </div>
  );
}
