// components/LoginPage.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Building, Briefcase, Eye, EyeOff, Mail, Lock } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('jobseeker');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock authentication - In real app, validate with backend
      const mockUsers = {
        jobseeker: { email: 'vusi@example.com', password: 'password123' },
        company: { email: 'company@example.com', password: 'password123' }
      };
      
      const mockUser = mockUsers[userType];
      
      if (formData.email === mockUser.email && formData.password === mockUser.password) {
        // Store user data in localStorage
        const userData = {
          userType,
          email: formData.email,
          firstName: userType === 'jobseeker' ? 'Vusi' : 'TechCorp',
          isAuthenticated: true
        };
        
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('userToken', 'mock-jwt-token-' + Date.now());
        
        // Navigate to appropriate dashboard
        if (userType === 'jobseeker') {
          navigate('/dashboard');
        } else {
          navigate('/company-dashboard');
        }
      } else {
        setErrors({ submit: 'Invalid email or password' });
      }
    } catch (error) {
      setErrors({ submit: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #25a858 0%, #0c6e32 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '40px',
        width: '100%',
        maxWidth: '450px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '60px',
            height: '60px',
            background: 'linear-gradient(135deg, #25a858 0%, #0c6e32 100%)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px'
          }}>
            <Briefcase size={28} style={{ color: 'white' }} />
          </div>
          <h1 style={{
            margin: '0 0 8px 0',
            fontSize: '28px',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Welcome Back
          </h1>
          <p style={{ margin: 0, color: '#6b7280', fontSize: '16px' }}>
            Sign in to your JobPortal account
          </p>
        </div>

        {/* User Type Selection */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '24px',
          padding: '4px',
          backgroundColor: '#f3f4f6',
          borderRadius: '12px'
        }}>
          <button
            type="button"
            onClick={() => setUserType('jobseeker')}
            style={{
              flex: 1,
              padding: '12px',
              backgroundColor: userType === 'jobseeker' ? 'white' : 'transparent',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              color: userType === 'jobseeker' ? '#374151' : '#6b7280',
              boxShadow: userType === 'jobseeker' ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <User size={16} />
            Job Seeker
          </button>
          <button
            type="button"
            onClick={() => setUserType('company')}
            style={{
              flex: 1,
              padding: '12px',
              backgroundColor: userType === 'company' ? 'white' : 'transparent',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              color: userType === 'company' ? '#374151' : '#6b7280',
              boxShadow: userType === 'company' ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <Building size={16} />
            Company
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          {/* Email Field */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151'
            }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail 
                size={18} 
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9ca3af'
                }}
              />
              <input
                type="email"
                name="email"
                placeholder={userType === 'jobseeker' ? 'vusi@example.com' : 'company@example.com'}
                value={formData.email}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '12px 12px 12px 44px',
                  border: `2px solid ${errors.email ? '#ef4444' : '#e5e7eb'}`,
                  borderRadius: '10px',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s ease'
                }}
                onFocus={(e) => {
                  if (!errors.email) {
                    e.target.style.borderColor = '#667eea';
                  }
                }}
                onBlur={(e) => {
                  if (!errors.email) {
                    e.target.style.borderColor = '#e5e7eb';
                  }
                }}
              />
            </div>
            {errors.email && (
              <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#ef4444' }}>
                {errors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151'
            }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock 
                size={18} 
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9ca3af'
                }}
              />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '12px 44px 12px 44px',
                  border: `2px solid ${errors.password ? '#ef4444' : '#e5e7eb'}`,
                  borderRadius: '10px',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s ease'
                }}
                onFocus={(e) => {
                  if (!errors.password) {
                    e.target.style.borderColor = '#667eea';
                  }
                }}
                onBlur={(e) => {
                  if (!errors.password) {
                    e.target.style.borderColor = '#e5e7eb';
                  }
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#9ca3af',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#ef4444' }}>
                {errors.password}
              </p>
            )}
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div style={{
              padding: '12px',
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '8px',
              marginBottom: '20px'
            }}>
              <p style={{ margin: 0, fontSize: '14px', color: '#dc2626' }}>
                {errors.submit}
              </p>
            </div>
          )}

          {/* Demo Credentials */}
          <div style={{
            padding: '12px',
            backgroundColor: '#f0f9ff',
            border: '1px solid #bae6fd',
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            <p style={{ margin: '0 0 8px 0', fontSize: '12px', fontWeight: '600', color: '#0369a1' }}>
              Demo Credentials:
            </p>
            <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#0369a1' }}>
              Job Seeker: vusi@example.com / password123
            </p>
            <p style={{ margin: 0, fontSize: '11px', color: '#0369a1' }}>
              Company: company@example.com / password123
            </p>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '14px',
              background: isLoading 
                ? 'linear-gradient(135deg, #9ca3af 0%, #9ca3af 100%)'
                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.2s ease'
            }}
          >
            {isLoading ? (
              <>
                <div style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid #ffffff40',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
                Signing In...
              </>
            ) : (
              `Sign In as ${userType === 'jobseeker' ? 'Job Seeker' : 'Company'}`
            )}
          </button>
        </form>

        {/* Register Link */}
        <div style={{
          textAlign: 'center',
          marginTop: '24px',
          padding: '20px 0 0 0',
          borderTop: '1px solid #e5e7eb'
        }}>
          <p style={{ margin: '0', fontSize: '14px', color: '#6b7280' }}>
            Don't have an account?{' '}
            <Link 
              to="/register"
              style={{
                color: '#667eea',
                textDecoration: 'none',
                fontWeight: '600'
              }}
              onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
              onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>

      {/* CSS Animation */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default LoginPage;