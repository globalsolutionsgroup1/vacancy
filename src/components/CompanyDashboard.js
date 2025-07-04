// components/CompanyDashboard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building, 
  Users, 
  Briefcase, 
  Eye, 
  Plus, 
  Search, 
  Filter,
  MoreHorizontal,
  Bell,
  LogOut,
  Menu,
  X,
  Calendar,
  TrendingUp,
  UserCheck,
  FileText
} from 'lucide-react';

const CompanyDashboard = () => {
  const navigate = useNavigate();
  const [user] = useState({ 
    userType: 'company', 
    firstName: 'TechCorp', 
    email: 'company@example.com' 
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [stats] = useState({
    totalJobs: 12,
    totalApplications: 145,
    activeJobs: 8,
    shortlistedCandidates: 23
  });

  const [jobs] = useState([
    {
      id: 1,
      title: 'Senior React Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      salary: '$70,000 - $90,000',
      postedDate: '2025-01-02',
      status: 'active',
      applications: 28,
      views: 156,
      shortlisted: 5
    },
    {
      id: 2,
      title: 'Product Manager',
      department: 'Product',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$90,000 - $120,000',
      postedDate: '2025-01-05',
      status: 'active',
      applications: 42,
      views: 234,
      shortlisted: 8
    },
    {
      id: 3,
      title: 'UX Designer',
      department: 'Design',
      location: 'New York, NY',
      type: 'Contract',
      salary: '$60,000 - $80,000',
      postedDate: '2025-01-03',
      status: 'paused',
      applications: 31,
      views: 187,
      shortlisted: 6
    }
  ]);

  const [recentApplications] = useState([
    {
      id: 1,
      candidateName: 'Sarah Johnson',
      jobTitle: 'Senior React Developer',
      appliedDate: '2025-01-06',
      status: 'pending',
      experience: '5 years',
      location: 'Remote'
    },
    {
      id: 2,
      candidateName: 'Michael Chen',
      jobTitle: 'Product Manager',
      appliedDate: '2025-01-06',
      status: 'shortlisted',
      experience: '7 years',
      location: 'San Francisco, CA'
    },
    {
      id: 3,
      candidateName: 'Emily Rodriguez',
      jobTitle: 'UX Designer',
      appliedDate: '2025-01-05',
      status: 'reviewing',
      experience: '4 years',
      location: 'New York, NY'
    }
  ]);

  // Navigation items for company
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Building },
    { id: 'jobs', label: 'Job Postings', icon: Briefcase },
    { id: 'candidates', label: 'Candidates', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'calendar', label: 'Interviews', icon: Calendar },
    { id: 'reports', label: 'Reports', icon: FileText }
  ];

  const [activeTab, setActiveTab] = useState('dashboard');

  // Handle logout functionality
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('userToken');
      localStorage.removeItem('userData');
      sessionStorage.clear();
      alert('You have been logged out successfully!');
      navigate('/login');
    }
  };

  const handleNavigation = (tabId) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
    
    switch (tabId) {
      case 'dashboard':
        break;
      case 'jobs':
        alert('Navigating to job postings management...');
        break;
      case 'candidates':
        alert('Navigating to candidate management...');
        break;
      case 'analytics':
        alert('Navigating to analytics dashboard...');
        break;
      case 'calendar':
        alert('Navigating to interview scheduler...');
        break;
      case 'reports':
        alert('Navigating to reports section...');
        break;
      default:
        break;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#10b981';
      case 'paused': return '#f59e0b';
      case 'closed': return '#ef4444';
      case 'pending': return '#f59e0b';
      case 'shortlisted': return '#10b981';
      case 'reviewing': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Enhanced Navigation */}
      <nav style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '0',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 16px'
        }}>
          {/* Logo and Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Building size={18} style={{ color: 'white' }} />
            </div>
            <h1 style={{
              margin: 0,
              fontSize: '18px',
              fontWeight: '700',
              color: 'white'
            }}>
              JobPortal Company
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  style={{
                    display: window.innerWidth < 768 ? 'none' : 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 12px',
                    backgroundColor: activeTab === item.id ? 'rgba(255,255,255,0.2)' : 'transparent',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    minHeight: '36px'
                  }}
                  onMouseEnter={(e) => {
                    if (activeTab !== item.id) {
                      e.target.style.backgroundColor = 'rgba(255,255,255,0.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== item.id) {
                      e.target.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <IconComponent size={16} />
                  <span style={{ display: window.innerWidth < 1024 ? 'none' : 'inline' }}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* User Menu and Mobile Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Notifications */}
            <button
              onClick={() => alert('Opening notifications...')}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                borderRadius: '8px',
                padding: '8px',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Bell size={16} />
            </button>

            {/* Company Profile */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255,255,255,0.1)',
              padding: '6px 12px',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
            onClick={() => alert('Opening company profile...')}>
              <Building size={16} style={{ color: 'white' }} />
              <span style={{ 
                color: 'white', 
                fontSize: '14px', 
                fontWeight: '500',
                display: window.innerWidth < 640 ? 'none' : 'inline'
              }}>
                {user.firstName}
              </span>
            </div>

            {/* Desktop Logout Button */}
            <button
              onClick={handleLogout}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                borderRadius: '8px',
                padding: '8px',
                color: 'white',
                cursor: 'pointer',
                display: window.innerWidth < 768 ? 'none' : 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title="Logout"
            >
              <LogOut size={16} />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                display: window.innerWidth >= 768 ? 'none' : 'flex',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                borderRadius: '8px',
                padding: '8px',
                color: 'white',
                cursor: 'pointer',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            padding: '16px',
            borderTop: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              maxWidth: '1200px',
              margin: '0 auto'
            }}>
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 16px',
                      backgroundColor: activeTab === item.id ? 'rgba(255,255,255,0.2)' : 'transparent',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      textAlign: 'left',
                      width: '100%'
                    }}
                  >
                    <IconComponent size={18} />
                    {item.label}
                  </button>
                );
              })}
              
              <div style={{
                borderTop: '1px solid rgba(255,255,255,0.1)',
                paddingTop: '8px',
                marginTop: '8px'
              }}>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleLogout();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    backgroundColor: 'transparent',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    textAlign: 'left',
                    width: '100%'
                  }}
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Dashboard Content */}
      <main style={{ padding: '20px 16px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '8px'
          }}>
            Company Dashboard
          </h1>
          <p style={{ color: '#6b7280', fontSize: '16px', margin: '0 0 20px 0' }}>
            Manage your job postings and track candidate applications
          </p>
          
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              onClick={() => alert('Opening job posting form...')}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                padding: '12px 16px',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                minHeight: '44px',
                flex: '1 1 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <Users size={16} />
              View Candidates
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '12px',
          marginBottom: '32px'
        }}>
          {[
            { title: 'Total Jobs', value: stats.totalJobs, color: '#4facfe', icon: Briefcase },
            { title: 'Applications', value: stats.totalApplications, color: '#f093fb', icon: FileText },
            { title: 'Active Jobs', value: stats.activeJobs, color: '#43e97b', icon: TrendingUp },
            { title: 'Shortlisted', value: stats.shortlistedCandidates, color: '#667eea', icon: UserCheck }
          ].map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} style={{
                background: `linear-gradient(135deg, ${stat.color} 0%, ${stat.color}dd 100%)`,
                padding: '16px',
                borderRadius: '12px',
                color: 'white',
                cursor: 'pointer',
                minHeight: '80px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                position: 'relative'
              }}
              onClick={() => alert(`Opening ${stat.title.toLowerCase()}...`)}>
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  opacity: 0.3
                }}>
                  <IconComponent size={20} />
                </div>
                <h3 style={{ margin: '0 0 4px 0', fontSize: '12px', opacity: 0.9, lineHeight: '1.2' }}>{stat.title}</h3>
                <p style={{ margin: '0', fontSize: '24px', fontWeight: 'bold' }}>{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Job Postings and Recent Applications */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          {/* Job Postings */}
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>Active Job Postings</h2>
              <button
                onClick={() => handleNavigation('jobs')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#667eea',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Manage All
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {jobs.map(job => (
                <div key={job.id} style={{
                  padding: '16px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  backgroundColor: '#f9fafb'
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      backgroundColor: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      flexShrink: 0,
                      border: '1px solid #e5e7eb'
                    }}>
                      <Briefcase size={16} style={{ color: '#667eea' }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                        <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '600', lineHeight: '1.2' }}>{job.title}</h3>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '11px',
                          fontWeight: '500',
                          backgroundColor: job.status === 'active' ? '#d1fae5' : '#fef3c7',
                          color: job.status === 'active' ? '#065f46' : '#d97706',
                          whiteSpace: 'nowrap',
                          flexShrink: 0
                        }}>
                          {job.status}
                        </span>
                      </div>
                      <p style={{ margin: '0 0 8px 0', color: '#6b7280', fontSize: '13px', lineHeight: '1.3' }}>
                        {job.department} • {job.location} • {job.type}
                      </p>
                      <p style={{ margin: '0 0 12px 0', color: '#059669', fontSize: '13px', fontWeight: '600' }}>
                        {job.salary}
                      </p>
                      
                      {/* Job Metrics */}
                      <div style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Users size={12} style={{ color: '#6b7280' }} />
                          <span style={{ fontSize: '12px', color: '#6b7280' }}>{job.applications} applications</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Eye size={12} style={{ color: '#6b7280' }} />
                          <span style={{ fontSize: '12px', color: '#6b7280' }}>{job.views} views</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <UserCheck size={12} style={{ color: '#6b7280' }} />
                          <span style={{ fontSize: '12px', color: '#6b7280' }}>{job.shortlisted} shortlisted</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => alert(`Viewing applications for ${job.title}...`)}
                      style={{
                        padding: '8px 12px',
                        fontSize: '12px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        minHeight: '32px',
                        flex: '1 1 auto'
                      }}
                    >
                      View Applications ({job.applications})
                    </button>
                    <button
                      onClick={() => alert(`Editing ${job.title}...`)}
                      style={{
                        padding: '8px 12px',
                        fontSize: '12px',
                        backgroundColor: 'transparent',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        minHeight: '32px',
                        flex: '1 1 auto'
                      }}
                    >
                      Edit Job
                    </button>
                    <button
                      onClick={() => alert(`More options for ${job.title}...`)}
                      style={{
                        padding: '8px',
                        fontSize: '12px',
                        backgroundColor: 'transparent',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        minHeight: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <MoreHorizontal size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Applications */}
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>Recent Applications</h2>
              <button
                onClick={() => handleNavigation('candidates')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#667eea',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                View All
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {recentApplications.map(application => (
                <div key={application.id} style={{
                  padding: '16px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  backgroundColor: '#f9fafb'
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '8px' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      backgroundColor: '#667eea',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      flexShrink: 0,
                      color: 'white',
                      fontWeight: '600'
                    }}>
                      {application.candidateName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                        <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '600', lineHeight: '1.2' }}>
                          {application.candidateName}
                        </h3>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '11px',
                          fontWeight: '500',
                          backgroundColor: application.status === 'shortlisted' ? '#d1fae5' : 
                                          application.status === 'reviewing' ? '#dbeafe' : '#fef3c7',
                          color: application.status === 'shortlisted' ? '#065f46' : 
                                 application.status === 'reviewing' ? '#1e40af' : '#d97706',
                          whiteSpace: 'nowrap',
                          flexShrink: 0
                        }}>
                          {application.status}
                        </span>
                      </div>
                      <p style={{ margin: '0 0 4px 0', color: '#6b7280', fontSize: '13px', lineHeight: '1.3' }}>
                        Applied for: {application.jobTitle}
                      </p>
                      <p style={{ margin: 0, color: '#6b7280', fontSize: '12px' }}>
                        {application.experience} experience • {application.location}
                      </p>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => alert(`Viewing ${application.candidateName}'s profile...`)}
                      style={{
                        padding: '8px 12px',
                        fontSize: '12px',
                        backgroundColor: 'transparent',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        minHeight: '32px',
                        flex: '1 1 auto'
                      }}
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => alert(`Shortlisting ${application.candidateName}...`)}
                      style={{
                        padding: '8px 12px',
                        fontSize: '12px',
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        minHeight: '32px',
                        flex: '1 1 auto'
                      }}
                    >
                      Shortlist
                    </button>
                    <button
                      onClick={() => alert(`Scheduling interview with ${application.candidateName}...`)}
                      style={{
                        padding: '8px 12px',
                        fontSize: '12px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        minHeight: '32px',
                        flex: '1 1 auto'
                      }}
                    >
                      Interview
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '24px 16px',
        marginTop: '40px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <Building size={20} />
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>JobPortal for Companies</h3>
              </div>
              <p style={{ margin: 0, fontSize: '14px', opacity: 0.9, lineHeight: '1.5' }}>
                Find the best talent for your company. Post jobs and manage applications efficiently.
              </p>
            </div>

            <div>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>Company Tools</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {['Post Jobs', 'Manage Candidates', 'Analytics', 'Interview Scheduler'].map((link) => (
                  <button
                    key={link}
                    onClick={() => alert(`Navigating to ${link}...`)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'white',
                      fontSize: '13px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      opacity: 0.8,
                      padding: '2px 0'
                    }}
                    onMouseEnter={(e) => e.target.style.opacity = '1'}
                    onMouseLeave={(e) => e.target.style.opacity = '0.8'}
                  >
                    {link}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>Support</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {['Help Center', 'Contact Support', 'Company Guide', 'API Documentation'].map((link) => (
                  <button
                    key={link}
                    onClick={() => alert(`Opening ${link}...`)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'white',
                      fontSize: '13px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      opacity: 0.8,
                      padding: '2px 0'
                    }}
                    onMouseEnter={(e) => e.target.style.opacity = '1'}
                    onMouseLeave={(e) => e.target.style.opacity = '0.8'}
                  >
                    {link}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>Contact</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', opacity: 0.9 }}>
                <div>📧 companies@jobportal.com</div>
                <div>📞 +1 (555) 987-6543</div>
                <div>📍 456 Corporate Blvd, Suite 100</div>
              </div>
            </div>
          </div>

          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.2)',
            paddingTop: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div style={{ fontSize: '13px', opacity: 0.8 }}>
              © 2025 JobPortal Company Solutions. All rights reserved.
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              {['LinkedIn', 'Twitter', 'Blog'].map((social) => (
                <button
                  key={social}
                  onClick={() => alert(`Opening ${social}...`)}
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '6px 12px',
                    color: 'white',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  {social}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CompanyDashboard;
                