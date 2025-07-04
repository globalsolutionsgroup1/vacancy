// components/RegisterPage.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Building, Briefcase, Eye, EyeOff, Mail, Lock, Phone, MapPin } from 'lucide-react';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('jobseeker');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    email: '',
    phone: '',
    location: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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
    
    if (userType === 'jobseeker') {
      if (!formData.firstName.trim()) {
        newErrors.firstName = 'First name is required';
      }
      if (!formData.lastName.trim()) {
        newErrors.lastName = 'Last name is required';
      }
    } else {
      if (!formData.companyName.trim()) {
        newErrors.companyName = 'Company name is required';
      }
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store user data in localStorage (in real app, this would be handled by backend)
      const userData = {
        userType,
        email: formData.email,
        firstName: userType === 'jobseeker' ? formData.firstName : formData.companyName,
        lastName: userType === 'jobseeker' ? formData.lastName : '',
        phone: formData.phone,
        location: formData.location,
        isAuthenticated: true
      };
      
      localStorage.setItem('userData', JSON.stringify(userData));
      localStorage.setItem('userToken', 'mock-jwt-token-' + Date.now());
      
      // Show success message
      alert(`Account created successfully! Welcome ${userData.firstName}!`);
      
      // Navigate to appropriate dashboard
      if (userType === 'jobseeker') {
        navigate('/dashboard');
      } else {
        navigate('/company-dashboard');
      }
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle = (fieldName) => ({
    width: '100%',
    padding: '12px 12px 12px 44px',
    border: `2px solid ${errors[fieldName] ? '#ef4444' : '#e5e7eb'}`,
    borderRadius: '10px',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s ease'
  });

  const handleFocus = (e, fieldName) => {
    if (!errors[fieldName]) {
      e.target.style.borderColor = '#667eea';
    }
  };

  const handleBlur = (e, fieldName) => {
    if (!errors[fieldName]) {
      e.target.style.borderColor = '#e5e7eb';
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
        maxWidth: '500px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        maxHeight: '90vh',
        overflow: 'auto'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '60px',
            height: '60px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
            Create Account
          </h1>
          <p style={{ margin: 0, color: '#6b7280', fontSize: '16px' }}>
            Join JobPortal and start your journey
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

        {/* Registration Form */}
        <form onSubmit={handleRegister}>
          {/* Name Fields */}
          {userType === 'jobseeker' ? (
            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
              <div style={{ flex: 1 }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151'
                }}>
                  First Name
                </label>
                <div style={{ position: 'relative' }}>
                  <User 
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
                    type="text"
                    name="firstName"
                    placeholder="Enter first name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    style={inputStyle('firstName')}
                    onFocus={(e) => handleFocus(e, 'firstName')}
                    onBlur={(e) => handleBlur(e, 'firstName')}
                  />
                </div>
                {errors.firstName && (
                  <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#ef4444' }}>
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div style={{ flex: 1 }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151'
                }}>
                  Last Name
                </label>
                <div style={{ position: 'relative' }}>
                  <User 
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
                    type="text"
                    name="lastName"
                    placeholder="Enter last name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    style={inputStyle('lastName')}
                    onFocus={(e) => handleFocus(e, 'lastName')}
                    onBlur={(e) => handleBlur(e, 'lastName')}
                  />
                </div>
                {errors.lastName && (
                  <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#ef4444' }}>
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151'
              }}>
                Company Name
              </label>
              <div style={{ position: 'relative' }}>
                <Building 
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
                  type="text"
                  name="companyName"
                  placeholder="Enter company name"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  style={inputStyle('companyName')}
                  onFocus={(e) => handleFocus(e, 'companyName')}
                  onBlur={(e) => handleBlur(e, 'companyName')}
                />
              </div>
              {errors.companyName && (
                <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#ef4444' }}>
                  {errors.companyName}
                </p>
              )}
            </div>
          )}

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
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                style={inputStyle('email')}
                onFocus={(e) => handleFocus(e, 'email')}
                onBlur={(e) => handleBlur(e, 'email')}
              />
            </div>
            {errors.email && (
              <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#ef4444' }}>
                {errors.email}
              </p>
            )}
          </div>

          {/* Phone and Location */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
            <div style={{ flex: 1 }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151'
              }}>
                Phone Number
              </label>
              <div style={{ position: 'relative' }}>
                <Phone 
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
                  type="tel"
                  name="phone"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={handleInputChange}
                  style={inputStyle('phone')}
                  onFocus={(e) => handleFocus(e, 'phone')}
                  onBlur={(e) => handleBlur(e, 'phone')}
                />
              </div>
              {errors.phone && (
                <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#ef4444' }}>
                  {errors.phone}
                </p>
              )}
            </div>
            <div style={{ flex: 1 }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151'
              }}>
                Location
              </label>
              <div style={{ position: 'relative' }}>
                <MapPin 
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
                  type="text"
                  name="location"
                  placeholder="City, State"
                  value={formData.location}
                  onChange={handleInputChange}
                  style={inputStyle('location')}
                  onFocus={(e) => handleFocus(e, 'location')}
                  onBlur={(e) => handleBlur(e, 'location')}
                />
              </div>
              {errors.location && (
                <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#ef4444' }}>
                  {errors.location}
                </p>
              )}
            </div>
          </div>

          {/* Password Fields */}
          <div style={{ marginBottom: '20px' }}>
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
                placeholder="Create a strong password"
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
                onFocus={(e) => handleFocus(e, 'password')}
                onBlur={(e) => handleBlur(e, 'password')}
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
                  color: '#9ca3af'
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

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151'
            }}>
              Confirm Password
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
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '12px 44px 12px 44px',
                  border: `2px solid ${errors.confirmPassword ? '#ef4444' : '#e5e7eb'}`,
                  borderRadius: '10px',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s ease'
                }}
                onFocus={(e) => handleFocus(e, 'confirmPassword')}
                onBlur={(e) => handleBlur(e, 'confirmPassword')}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#9ca3af'
                }}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#ef4444' }}>
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Terms and Conditions */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              color: '#374151'
            }}>
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                style={{
                  marginTop: '2px',
                  accentColor: '#667eea'
                }}
              />
              <span>
                I agree to the{' '}
                <button
                  type="button"
                  onClick={() => alert('Terms and Conditions would open here')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#667eea',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    fontSize: '14px',
                    padding: 0
                  }}
                >
                  Terms and Conditions
                </button>
                {' '}and{' '}
                <button
                  type="button"
                  onClick={() => alert('Privacy Policy would open here')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#667eea',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    fontSize: '14px',
                    padding: 0
                  }}
                >
                  Privacy Policy
                </button>
              </span>
            </label>
            {errors.agreeToTerms && (
              <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#ef4444' }}>
                {errors.agreeToTerms}
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

          {/* Register Button */}
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
                Creating Account...
              </>
            ) : (
              `Create ${userType === 'jobseeker' ? 'Job Seeker' : 'Company'} Account`
            )}
          </button>
        </form>

        {/* Login Link */}
        <div style={{
          textAlign: 'center',
          marginTop: '24px',
          padding: '20px 0 0 0',
          borderTop: '1px solid #e5e7eb'
        }}>
          <p style={{ margin: '0', fontSize: '14px', color: '#6b7280' }}>
            Already have an account?{' '}
            <Link 
              to="/login"
              style={{
                color: '#667eea',
                textDecoration: 'none',
                fontWeight: '600'
              }}
              onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
              onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
            >
              Sign In
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

export default RegisterPage;