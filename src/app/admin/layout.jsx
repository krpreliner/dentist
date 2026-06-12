"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FaHome, FaList, FaQuoteLeft, FaQuestionCircle, FaImage, FaMapMarkerAlt, FaSearch, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import './admin.css';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Don't show layout on login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <FaHome /> },
    { name: 'Services', path: '/admin/services', icon: <FaList /> },
    { name: 'Gallery', path: '/admin/gallery', icon: <FaImage /> },
    { name: 'Testimonials', path: '/admin/testimonials', icon: <FaQuoteLeft /> },
    { name: 'FAQs', path: '/admin/faqs', icon: <FaQuestionCircle /> },
    { name: 'Contact Info', path: '/admin/contact', icon: <FaMapMarkerAlt /> },
    { name: 'SEO Settings', path: '/admin/seo', icon: <FaSearch /> },
  ];

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  return (
    <div className="admin-layout">
      {/* Mobile Header */}
      <div className="admin-mobile-header">
        <div className="admin-logo">🦷 Radiance CMS</div>
        <button className="admin-menu-btn" onClick={() => setSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-header">
          <div className="admin-logo">🦷 Radiance CMS</div>
        </div>
        
        <nav className="admin-nav">
          <ul>
            {navItems.map((item) => (
              <li key={item.path}>
                <Link 
                  href={item.path} 
                  className={`admin-nav-link ${pathname === item.path ? 'active' : ''}`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="admin-nav-icon">{item.icon}</span>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="admin-sidebar-footer">
          <button className="admin-logout-btn" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main">
        {children}
      </main>
      
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && <div className="admin-overlay" onClick={() => setSidebarOpen(false)}></div>}
    </div>
  );
}
