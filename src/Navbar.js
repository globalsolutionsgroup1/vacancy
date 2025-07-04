// src/components/Navbar.js - Navigation Bar Component
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const getNavigationItems = () => {
    if (user?.userType === 'company') {
      return [
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Jobs', href: '/jobs' },
        { name: 'Applications', href: '/applications' },
        { name: 'Profile', href: '/profile' }
      ];
    } else {
      return [
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Browse Jobs', href: '/browse-jobs' },
        { name: 'My Applications', href: '/my-applications' },
        { name: 'Saved Jobs', href: '/saved-jobs' },
        { name: 'Profile', href: '/profile' }
      ];
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <nav style={{
      backgroundColor: 'white',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      borderBottom: '1px solid #e5e7eb'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '4rem'
        }}>
          {/* Logo */}
          <div style={{
            display: 'flex',
            alignItems: 'center'
          }}>
            <span style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#2563eb'
            }}>
              📋 Keypoint
            </span>
          </div>

          {/* Desktop Navigation */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem'
          }}>
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                style={{
                  textDecoration: 'none',
                  color: '#374151',
                  fontWeight: '500',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.375rem',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#f3f4f6';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                }}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* User Menu */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem',
                backgroundColor: 'transparent',
                border: 'none',
                borderRadius: '0.375rem',
                cursor: 'pointer'
              }}
            >
              <div style={{
                width: '2rem',
                height: '2rem',
                backgroundColor: '#e5e7eb',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#374151'
              }}>
                {user?.userType === 'company' 
                  ? user?.companyName?.charAt(0)?.toUpperCase() || 'C'
                  : `${user?.firstName?.charAt(0) || ''}${user?.lastName?.charAt(0) || ''}`
                }
              </div>
              <span style={{
                fontSize: '0.875rem',
                color: '#374151',
                fontWeight: '500'
              }}>
                {user?.userType === 'company' 
                  ? user?.companyName 
                  : `${user?.firstName || ''} ${user?.lastName || ''}`
                }
              </span>
              <span style={{ fontSize: '0.75rem' }}>▼</span>
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div style={{
                position: 'absolute',
                right: 0,
                top: '100%',
                marginTop: '0.5rem',
                width: '12rem',
                backgroundColor: 'white',
                borderRadius: '0.5rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb',
                zIndex: 50
              }}>
                <div style={{ padding: '0.5rem' }}>
                  <div style={{
                    padding: '0.5rem',
                    borderBottom: '1px solid #e5e7eb',
                    marginBottom: '0.5rem'
                  }}>
                    <div style={{
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: '#111827'
                    }}>
                      {user?.email}
                    </div>
                    <div style={{
                      fontSize: '0.75rem',
                      color: '#6b7280',
                      textTransform: 'capitalize'
                    }}>
                      {user?.userType}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      // Navigate to settings
                    }}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '0.5rem',
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderRadius: '0.25rem',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      color: '#374151'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#f3f4f6';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                    }}
                  >
                    ⚙️ Settings
                  </button>
                  
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleLogout();
                    }}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '0.5rem',
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderRadius: '0.25rem',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      color: '#dc2626'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#fef2f2';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                    }}
                  >
                    🚪 Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 40
          }}
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;