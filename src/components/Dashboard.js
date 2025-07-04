import React, { useState, useEffect } from 'react';
import { User, Building, Briefcase, Menu, X, Home, Search, BookmarkIcon, FileText, Settings, Bell, LogOut } from 'lucide-react';

const Dashboard = () => {
  const [user] = useState({ userType: 'jobseeker', firstName: 'Vusi', email: 'vusi@example.com' });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({
    totalApplications: 8,
    pendingApplications: 3,
    shortlistedApplications: 2,
    savedJobs: 5
  });

  // Notifications state
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'application',
      title: 'Application Update',
      message: 'TechCorp Inc. has reviewed your application for Senior Frontend Developer',
      timestamp: '2 hours ago',
      read: false,
      icon: '📝'
    },
    {
      id: 2,
      type: 'job_match',
      title: 'New Job Match',
      message: 'We found 3 new jobs that match your profile perfectly!',
      timestamp: '4 hours ago',
      read: false,
      icon: '🎯'
    },
    {
      id: 3,
      type: 'interview',
      title: 'Interview Scheduled',
      message: 'Design Studio Pro wants to schedule an interview for Frontend UI/UX Developer position',
      timestamp: '1 day ago',
      read: true,
      icon: '📅'
    },
    {
      id: 4,
      type: 'system',
      title: 'Profile Views',
      message: 'Your profile was viewed 12 times this week',
      timestamp: '2 days ago',
      read: true,
      icon: '👀'
    },
    {
      id: 5,
      type: 'job_alert',
      title: 'Job Alert',
      message: 'New React Developer positions posted in your area',
      timestamp: '3 days ago',
      read: true,
      icon: '🔔'
    }
  ]);

  const [showNotifications, setShowNotifications] = useState(false);

  const [recentApplications, setRecentApplications] = useState([
    {
      id: 1,
      jobTitle: 'Senior Frontend Developer',
      companyName: 'TechCorp Inc.',
      appliedDate: '2025-01-01',
      status: 'pending',
      location: 'Remote',
      logo: '🚀',
      salary: '$70,000 - $90,000',
      description: 'We are looking for an experienced Frontend Developer to join our team. You will work with React, TypeScript, and modern web technologies.',
      requirements: ['5+ years React experience', 'TypeScript proficiency', 'CSS/SCSS expertise'],
      benefits: ['Remote work', 'Health insurance', '401k matching']
    }
  ]);

  const [recommendedJobs, setRecommendedJobs] = useState([
    {
      id: 1,
      title: 'Senior React Developer',
      company: 'Tech Solutions',
      location: 'Remote',
      salary: '$70,000 - $90,000',
      type: 'Full-time',
      postedDate: '2025-01-02',
      logo: '⚛️',
      matchScore: 95,
      saved: false,
      description: 'Lead frontend development using React and modern JavaScript. Work with a talented team to build scalable web applications.',
      requirements: ['5+ years React experience', 'Leadership skills', 'API integration'],
      benefits: ['Stock options', 'Remote work', 'Learning budget']
    },
    {
      id: 2,
      title: 'Full Stack JavaScript Developer',
      company: 'InnovateCorp',
      location: 'San Francisco, CA',
      salary: '$80,000 - $110,000',
      type: 'Full-time',
      postedDate: '2025-01-03',
      logo: '🚀',
      matchScore: 88,
      saved: false,
      description: 'Join our dynamic team to build cutting-edge web applications using Node.js, React, and MongoDB.',
      requirements: ['3+ years JavaScript experience', 'Node.js proficiency', 'Database design skills'],
      benefits: ['Health insurance', 'Flexible hours', 'Tech stipend']
    },
    {
      id: 3,
      title: 'Frontend UI/UX Developer',
      company: 'Design Studio Pro',
      location: 'New York, NY',
      salary: '$65,000 - $85,000',
      type: 'Full-time',
      postedDate: '2025-01-03',
      logo: '🎨',
      matchScore: 82,
      saved: true,
      description: 'Create beautiful, responsive user interfaces with a focus on user experience and modern design principles.',
      requirements: ['Strong CSS/SCSS skills', 'Figma proficiency', 'Responsive design experience'],
      benefits: ['Creative freedom', 'Design tools budget', 'Hybrid work']
    },
    {
      id: 4,
      title: 'Backend Node.js Engineer',
      company: 'CloudTech Systems',
      location: 'Austin, TX',
      salary: '$75,000 - $95,000',
      type: 'Full-time',
      postedDate: '2025-01-04',
      logo: '☁️',
      matchScore: 78,
      saved: false,
      description: 'Build robust APIs and microservices using Node.js, Express, and cloud technologies.',
      requirements: ['4+ years Node.js experience', 'AWS/Azure knowledge', 'Microservices architecture'],
      benefits: ['Cloud certifications', 'Remote work', 'Performance bonuses']
    },
    {
      id: 5,
      title: 'React Native Mobile Developer',
      company: 'MobileFirst Inc',
      location: 'Remote',
      salary: '$70,000 - $90,000',
      type: 'Contract',
      postedDate: '2025-01-04',
      logo: '📱',
      matchScore: 85,
      saved: false,
      description: 'Develop cross-platform mobile applications using React Native for iOS and Android platforms.',
      requirements: ['React Native experience', 'Mobile app deployment', 'iOS/Android guidelines knowledge'],
      benefits: ['Flexible schedule', 'Latest devices', 'Remote work']
    },
    {
      id: 6,
      title: 'DevOps Engineer',
      company: 'ScaleUp Technologies',
      location: 'Seattle, WA',
      salary: '$85,000 - $115,000',
      type: 'Full-time',
      postedDate: '2025-01-05',
      logo: '⚙️',
      matchScore: 72,
      saved: false,
      description: 'Manage CI/CD pipelines, containerization, and cloud infrastructure to support development teams.',
      requirements: ['Docker/Kubernetes experience', 'CI/CD pipeline management', 'AWS/GCP knowledge'],
      benefits: ['Learning opportunities', 'Conference attendance', 'Stock options']
    },
    {
      id: 7,
      title: 'TypeScript Developer',
      company: 'Modern Web Co',
      location: 'Boston, MA',
      salary: '$68,000 - $88,000',
      type: 'Full-time',
      postedDate: '2025-01-05',
      logo: '🔷',
      matchScore: 90,
      saved: false,
      description: 'Work with TypeScript, React, and modern tooling to create type-safe, scalable web applications.',
      requirements: ['Strong TypeScript skills', 'React expertise', 'Testing frameworks knowledge'],
      benefits: ['Professional development', 'Mentorship program', 'Flexible PTO']
    }
  ]);

  const [showModal, setShowModal] = useState({ type: null, data: null });
  const [userProfile, setUserProfile] = useState({
    firstName: 'Vusi',
    lastName: 'Maketshemu',
    email: 'vusi@example.com',
    phone: '+27 (71) 762-2073',
    bio: 'Passionate frontend developer with experience building modern web applications.'
  });

  const [userCV, setUserCV] = useState({
    summary: 'Experienced Frontend Developer with expertise in React, JavaScript, and modern web technologies.'
  });

  // Navigation items
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'jobs', label: 'Browse Jobs', icon: Search },
    { id: 'applications', label: 'Applications', icon: FileText },
    { id: 'saved', label: 'Saved Jobs', icon: BookmarkIcon },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  // Handle logout functionality
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      // Clear any user session data
      try {
        // Show logout message
        alert('You have been logged out successfully!');
        
        // Redirect to login page - this will work in a real React Router environment
        // For demonstration purposes, we'll simulate the navigation
        console.log('Redirecting to: src/components/LoginPage.js');
        
        // In a real React Router setup, you would use:
        // navigate('/login') or navigate('/src/components/LoginPage.js')
        
        // For now, we'll show a message indicating where it would redirect
        alert('Redirecting to: src/components/LoginPage.js');
        
        // Optionally reload the page to simulate logout
        // window.location.reload();
        
      } catch (error) {
        console.error('Logout error:', error);
        alert('Logout completed. Redirecting to LoginPage...');
      }
    }
  };

  // Handle notifications
  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  const markNotificationAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (notificationId) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== notificationId)
    );
  };

  const clearAllNotifications = () => {
    if (window.confirm('Are you sure you want to clear all notifications?')) {
      setNotifications([]);
      setShowNotifications(false);
    }
  };

  // Get unread notification count
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleSaveJob = (jobId) => {
    setRecommendedJobs(prev => 
      prev.map(job => 
        job.id === jobId 
          ? { ...job, saved: !job.saved }
          : job
      )
    );
    
    const job = recommendedJobs.find(j => j.id === jobId);
    setStats(prev => ({
      ...prev,
      savedJobs: prev.savedJobs + (job?.saved ? -1 : 1)
    }));
    
    alert(job?.saved ? 'Job removed from saved!' : 'Job saved successfully!');
  };

  const handleApplyToJob = (job) => {
    const newApplication = {
      id: Date.now(),
      jobTitle: job.title,
      companyName: job.company,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'pending',
      location: job.location,
      logo: job.logo,
      salary: job.salary,
      description: job.description,
      requirements: job.requirements,
      benefits: job.benefits
    };

    setRecentApplications(prev => [newApplication, ...prev]);
    
    setStats(prev => ({
      ...prev,
      totalApplications: prev.totalApplications + 1,
      pendingApplications: prev.pendingApplications + 1
    }));

    alert(`Successfully applied to ${job.title} at ${job.company}!`);
  };

  const handleWithdrawApplication = (applicationId) => {
    const application = recentApplications.find(app => app.id === applicationId);
    if (application && window.confirm(`Are you sure you want to withdraw your application for ${application.jobTitle}?`)) {
      setRecentApplications(prev => prev.filter(app => app.id !== applicationId));
      
      setStats(prev => ({
        ...prev,
        totalApplications: prev.totalApplications - 1,
        pendingApplications: application.status === 'pending' ? prev.pendingApplications - 1 : prev.pendingApplications
      }));

      alert('Application withdrawn successfully.');
    }
  };

  const handleNavigation = (tabId) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
    
    // Handle different navigation actions
    switch (tabId) {
      case 'dashboard':
        // Already on dashboard
        break;
      case 'jobs':
        alert('Navigating to job browse page...');
        break;
      case 'applications':
        alert('Navigating to applications page...');
        break;
      case 'saved':
        alert('Navigating to saved jobs page...');
        break;
      case 'profile':
        setShowModal({ type: 'profile', data: null });
        break;
      case 'settings':
        alert('Navigating to settings page...');
        break;
      default:
        break;
    }
  };

  const closeModal = () => {
    setShowModal({ type: null, data: null });
  };

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showNotifications && !event.target.closest('.notifications-container')) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications]);

  // Modal Component
  const Modal = ({ children, title, onClose }) => (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      padding: '16px'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '24px',
        borderRadius: '16px',
        maxWidth: '500px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '600' }}>{title}</h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              padding: '4px',
              color: '#6b7280'
            }}
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );

  // Notifications Panel Component
  const NotificationsPanel = () => (
    <div className="notifications-container" style={{
      position: 'absolute',
      top: '100%',
      right: 0,
      width: '320px',
      maxHeight: '400px',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
      border: '1px solid #e5e7eb',
      zIndex: 1000,
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        padding: '16px',
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f9fafb'
      }}>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#374151' }}>
          Notifications {unreadCount > 0 && (
            <span style={{
              backgroundColor: '#ef4444',
              color: 'white',
              borderRadius: '10px',
              padding: '2px 6px',
              fontSize: '12px',
              fontWeight: '500',
              marginLeft: '8px'
            }}>
              {unreadCount}
            </span>
          )}
        </h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          {unreadCount > 0 && (
            <button
              onClick={markAllNotificationsAsRead}
              style={{
                background: 'none',
                border: 'none',
                color: '#25a858',
                fontSize: '12px',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              Mark all read
            </button>
          )}
          <button
            onClick={clearAllNotifications}
            style={{
              background: 'none',
              border: 'none',
              color: '#6b7280',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            Clear all
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
        {notifications.length === 0 ? (
          <div style={{
            padding: '40px 16px',
            textAlign: 'center',
            color: '#6b7280'
          }}>
            <Bell size={32} style={{ opacity: 0.3, marginBottom: '8px' }} />
            <p style={{ margin: 0, fontSize: '14px' }}>No notifications</p>
          </div>
        ) : (
          notifications.map(notification => (
            <div
              key={notification.id}
              style={{
                padding: '12px 16px',
                borderBottom: '1px solid #f3f4f6',
                backgroundColor: notification.read ? 'white' : '#f0f9ff',
                cursor: 'pointer',
                position: 'relative'
              }}
              onClick={() => markNotificationAsRead(notification.id)}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{
                  fontSize: '16px',
                  flexShrink: 0,
                  marginTop: '2px'
                }}>
                  {notification.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 style={{
                    margin: '0 0 4px 0',
                    fontSize: '14px',
                    fontWeight: notification.read ? '500' : '600',
                    color: '#374151',
                    lineHeight: '1.3'
                  }}>
                    {notification.title}
                  </h4>
                  <p style={{
                    margin: '0 0 4px 0',
                    fontSize: '13px',
                    color: '#6b7280',
                    lineHeight: '1.4'
                  }}>
                    {notification.message}
                  </p>
                  <span style={{
                    fontSize: '11px',
                    color: '#9ca3af'
                  }}>
                    {notification.timestamp}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNotification(notification.id);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#9ca3af',
                    cursor: 'pointer',
                    padding: '4px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    flexShrink: 0
                  }}
                >
                  ×
                </button>
              </div>
              {!notification.read && (
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '40px',
                  width: '6px',
                  height: '6px',
                  backgroundColor: '#3b82f6',
                  borderRadius: '50%'
                }} />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );

  // Profile Form
  const ProfileForm = () => {
    const [formData, setFormData] = useState(userProfile);

    const handleSubmit = (e) => {
      e.preventDefault();
      setUserProfile(formData);
      closeModal();
      alert('Profile updated successfully!');
    };

    return (
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              placeholder="First Name"
              value={formData.firstName}
              onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
              style={{
                flex: 1,
                padding: '12px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none'
              }}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
              style={{
                flex: 1,
                padding: '12px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none'
              }}
              required
            />
          </div>

          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            style={{
              padding: '12px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none'
            }}
            required
          />

          <input
            type="tel"
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            style={{
              padding: '12px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none'
            }}
          />

          <textarea
            placeholder="Bio"
            value={formData.bio}
            onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
            rows={4}
            style={{
              padding: '12px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none',
              resize: 'vertical',
              fontFamily: 'inherit'
            }}
          />

          <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
            <button
              type="submit"
              style={{
                flex: 1,
                padding: '12px',
                background: 'linear-gradient(135deg, #25a858 0%, #0c6e32 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Save Profile
            </button>
            <button
              type="button"
              onClick={closeModal}
              style={{
                padding: '12px 16px',
                backgroundColor: 'transparent',
                border: '2px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    );
  };

  // CV Form
  const CVForm = () => {
    const [formData, setFormData] = useState(userCV);

    const handleSubmit = (e) => {
      e.preventDefault();
      setUserCV(formData);
      closeModal();
      alert('CV updated successfully!');
    };

    return (
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>
              Professional Summary
            </label>
            <textarea
              placeholder="Brief summary of your professional background..."
              value={formData.summary}
              onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
              rows={4}
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                resize: 'vertical',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
            <button
              type="submit"
              style={{
                flex: 1,
                padding: '12px',
                background: 'linear-gradient(135deg, #25a858 0%, #0c6e32 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Save CV
            </button>
            <button
              type="button"
              onClick={closeModal}
              style={{
                padding: '12px 16px',
                backgroundColor: 'transparent',
                border: '2px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    );
  };

  // Job Details Modal Content
  const JobDetails = ({ job }) => (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          backgroundColor: '#f3f4f6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px'
        }}>
          {job.logo}
        </div>
        <div>
          <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: '600' }}>
            {job.jobTitle || job.title}
          </h3>
          <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>
            {job.companyName || job.company} • {job.location}
          </p>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <span style={{ color: '#059669', fontWeight: '600', fontSize: '16px' }}>
          {job.salary}
        </span>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600' }}>Description</h4>
        <p style={{ margin: 0, color: '#4b5563', lineHeight: '1.6' }}>
          {job.description}
        </p>
      </div>

      {job.requirements && (
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600' }}>Requirements</h4>
          <ul style={{ margin: 0, paddingLeft: '20px', color: '#4b5563' }}>
            {job.requirements.map((req, index) => (
              <li key={index} style={{ marginBottom: '4px' }}>{req}</li>
            ))}
          </ul>
        </div>
      )}

      {job.benefits && (
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600' }}>Benefits</h4>
          <ul style={{ margin: 0, paddingLeft: '20px', color: '#4b5563' }}>
            {job.benefits.map((benefit, index) => (
              <li key={index} style={{ marginBottom: '4px' }}>{benefit}</li>
            ))}
          </ul>
        </div>
      )}

      {!job.appliedDate && (
        <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
          <button
            onClick={() => {
              handleApplyToJob(job);
              closeModal();
            }}
            style={{
              flex: 1,
              padding: '12px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Apply Now
          </button>
          <button
            onClick={() => {
              handleSaveJob(job.id);
              closeModal();
            }}
            style={{
              padding: '12px 16px',
              backgroundColor: 'transparent',
              border: '2px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Save Job
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Enhanced Navigation */}
      <nav style={{
        background: 'linear-gradient(135deg, #25a858 0%, #0c6e32 100%)',
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
              width: '110px',
              height: '70px',
              background: 'transparent',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              padding: '4px'
            }}>
              {/* Your actual logo */}
              <img 
                src="https://example.com/white3.png"
                alt="KeyPoint Logo"
                style={{
                  width: '32px',
                  height: '32px',
                  objectFit: 'contain'
                }}
              />
            </div>
            <h1 style={{
              margin: 0,
              fontSize: '20px',
              fontWeight: '700',
              color: 'white',
              letterSpacing: '-0.5px'
            }}>
              KeyPoint
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            '@media (max-width: 768px)': {
              display: 'none'
            }
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
            <div style={{ position: 'relative' }}>
              <button
                onClick={handleNotificationClick}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px',
                  color: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}
              >
                <Bell size={16} />
                {unreadCount > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '-2px',
                    right: '-2px',
                    backgroundColor: '#ef4444',
                    color: 'white',
                    borderRadius: '50%',
                    width: '16px',
                    height: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    fontWeight: '600'
                  }}>
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>
              
              {showNotifications && <NotificationsPanel />}
            </div>

            {/* User Profile */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255,255,255,0.1)',
              padding: '6px 12px',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
            onClick={() => setShowModal({ type: 'profile', data: null })}>
              <User size={16} style={{ color: 'white' }} />
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
            background: 'linear-gradient(135deg, #25a858 0%, #0c6e32 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '8px'
          }}>
            Welcome back, {user.firstName}! 👋
          </h1>
          <p style={{ color: '#6b7280', fontSize: '16px', margin: '0 0 20px 0' }}>
            Track your applications and discover new opportunities
          </p>
          
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              onClick={() => handleNavigation('jobs')}
              style={{
                background: 'linear-gradient(135deg, #25a858 0%, #0c6e32 100%)',
                color: 'white',
                border: 'none',
                padding: '12px 16px',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                minHeight: '44px',
                flex: '1 1 auto'
              }}
            >
              🔍 Browse Jobs
            </button>
            <button
              onClick={() => setShowModal({ type: 'cv', data: null })}
              style={{
                backgroundColor: 'white',
                color: '#374151',
                border: '2px solid #e5e7eb',
                padding: '12px 16px',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                minHeight: '44px',
                flex: '1 1 auto'
              }}
            >
              📄 Update CV
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
            { title: 'Applications', value: stats.totalApplications, color: '#4facfe', action: 'applications' },
            { title: 'Pending', value: stats.pendingApplications, color: '#f093fb', action: 'applications' },
            { title: 'Shortlisted', value: stats.shortlistedApplications, color: '#43e97b', action: 'applications' },
            { title: 'Saved Jobs', value: stats.savedJobs, color: '#25a858', action: 'saved' }
          ].map((stat, index) => (
            <div key={index} style={{
              background: `linear-gradient(135deg, ${stat.color} 0%, ${stat.color}dd 100%)`,
              padding: '16px',
              borderRadius: '12px',
              color: 'white',
              cursor: 'pointer',
              minHeight: '80px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
            onClick={() => handleNavigation(stat.action)}>
              <h3 style={{ margin: '0 0 4px 0', fontSize: '12px', opacity: 0.9, lineHeight: '1.2' }}>{stat.title}</h3>
              <p style={{ margin: '0', fontSize: '24px', fontWeight: 'bold' }}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Recent Applications and Recommended Jobs */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
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
                onClick={() => handleNavigation('applications')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#25a858',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                View All
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {recentApplications.map(app => (
                <div key={app.id} style={{
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
                      backgroundColor: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      flexShrink: 0
                    }}>
                      {app.logo}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: '600', lineHeight: '1.2' }}>{app.jobTitle}</h3>
                      <p style={{ margin: 0, color: '#6b7280', fontSize: '13px', lineHeight: '1.3' }}>{app.companyName} • {app.location}</p>
                    </div>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '11px',
                      fontWeight: '500',
                      backgroundColor: app.status === 'pending' ? '#fef3c7' : '#d1fae5',
                      color: app.status === 'pending' ? '#d97706' : '#065f46',
                      whiteSpace: 'nowrap',
                      flexShrink: 0
                    }}>
                      {app.status}
                    </span>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => setShowModal({ type: 'jobDetails', data: app })}
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
                      View Details
                    </button>
                    {app.status === 'pending' && (
                      <button
                        onClick={() => handleWithdrawApplication(app.id)}
                        style={{
                          padding: '8px 12px',
                          fontSize: '12px',
                          backgroundColor: '#ef4444',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          minHeight: '32px',
                          flex: '1 1 auto'
                        }}
                      >
                        Withdraw
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Jobs */}
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>Recommended Jobs</h2>
              <button
                onClick={() => handleNavigation('jobs')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#25a858',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                View All
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {recommendedJobs.map(job => (
                <div key={job.id} style={{
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
                      backgroundColor: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      flexShrink: 0
                    }}>
                      {job.logo}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: '600', lineHeight: '1.2' }}>{job.title}</h3>
                      <p style={{ margin: 0, color: '#6b7280', fontSize: '13px', lineHeight: '1.3' }}>{job.company} • {job.location}</p>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{
                        padding: '2px 6px',
                        borderRadius: '8px',
                        fontSize: '10px',
                        fontWeight: '600',
                        backgroundColor: '#e0f2fe',
                        color: '#0369a1',
                        marginBottom: '4px'
                      }}>
                        {job.matchScore}% match
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => handleSaveJob(job.id)}
                      style={{
                        padding: '8px 12px',
                        fontSize: '12px',
                        backgroundColor: job.saved ? '#10b981' : 'transparent',
                        color: job.saved ? 'white' : '#374151',
                        border: `1px solid ${job.saved ? '#10b981' : '#d1d5db'}`,
                        borderRadius: '6px',
                        cursor: 'pointer',
                        minHeight: '32px',
                        flex: '1 1 auto'
                      }}
                    >
                      {job.saved ? '❤️ Saved' : '🤍 Save'}
                    </button>
                    <button
                      onClick={() => handleApplyToJob(job)}
                      style={{
                        padding: '8px 16px',
                        fontSize: '12px',
                        background: 'linear-gradient(135deg, #25a858 0%, #0c6e32 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        minHeight: '32px',
                        flex: '1 1 auto'
                      }}
                    >
                      Apply Now
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
        background: 'linear-gradient(135deg, #25a858 0%, #0c6e32 100%)',
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
          {/* Footer Top */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px'
          }}>
            {/* Company Info */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <Briefcase size={20} />
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>JobPortal</h3>
              </div>
              <p style={{ margin: 0, fontSize: '14px', opacity: 0.9, lineHeight: '1.5' }}>
                Your gateway to finding the perfect job. Connect with top employers and build your career.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>Quick Links</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {['Browse Jobs', 'Post a Job', 'About Us', 'Contact'].map((link) => (
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

            {/* Support */}
            <div>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>Support</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {['Help Center', 'Privacy Policy', 'Terms of Service', 'FAQ'].map((link) => (
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

            {/* Contact Info */}
            <div>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>Get in Touch</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', opacity: 0.9 }}>
                <div>📧 support@jobportal.com</div>
                <div>📞 +1 (555) 123-4567</div>
                <div>📍 123 Business Ave, City, State 12345</div>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
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
              © 2025 JobPortal. All rights reserved.
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              {['Twitter', 'LinkedIn', 'Facebook'].map((social) => (
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

      {/* Modals */}
      {showModal.type === 'jobDetails' && showModal.data && (
        <Modal 
          title="Job Details" 
          onClose={closeModal}
        >
          <JobDetails job={showModal.data} />
        </Modal>
      )}

      {showModal.type === 'profile' && (
        <Modal 
          title="Edit Profile" 
          onClose={closeModal}
        >
          <ProfileForm />
        </Modal>
      )}

      {showModal.type === 'cv' && (
        <Modal 
          title="Edit CV" 
          onClose={closeModal}
        >
          <CVForm />
        </Modal>
      )}
    </div>
  );
};

export default Dashboard;