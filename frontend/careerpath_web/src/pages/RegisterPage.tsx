import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './AuthPages.css';

interface SectionOption {
  value: string;
  label: string;
}

const SECTIONS: { [key: string]: SectionOption[] } = {
  BSCS: [
    { value: '1A', label: '1A' },
    { value: '1B', label: '1B' },
    { value: '1C', label: '1C' },
    { value: '1D', label: '1D' },
    { value: '2A', label: '2A' },
    { value: '2B', label: '2B' },
    { value: '2C', label: '2C' },
    { value: '2D', label: '2D' },
    { value: '3A', label: '3A' },
    { value: '3B', label: '3B' },
    { value: '3C', label: '3C' },
    { value: '3D', label: '3D' },
    { value: '3E', label: '3E' },
    { value: '4A', label: '4A' },
    { value: '4B', label: '4B' },
    { value: '4C', label: '4C' },
  ],
  BSIT: [
    { value: '1A', label: '1A' },
    { value: '1B', label: '1B' },
    { value: '1C', label: '1C' },
    { value: '1D', label: '1D' },
    { value: '1E', label: '1E' },
    { value: '2A', label: '2A' },
    { value: '2B', label: '2B' },
    { value: '2C', label: '2C' },
    { value: '2D', label: '2D' },
    { value: '2E', label: '2E' },
    { value: '3A', label: '3A' },
    { value: '3B', label: '3B' },
    { value: '3C', label: '3C' },
    { value: '3D', label: '3D' },
    { value: '3E', label: '3E' },
    { value: '4A', label: '4A' },
    { value: '4B', label: '4B' },
    { value: '4C', label: '4C' },
    { value: '4D', label: '4D' },
  ],
};

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    program: 'BSCS',
    section: '',
    studentNumber: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');

  // Get available sections based on selected program
  const availableSections = useMemo(() => {
    return SECTIONS[formData.program] || [];
  }, [formData.program]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!formData.email.toLowerCase().endsWith('@cvsu.edu.ph')) {
      newErrors.email = 'Email must be a valid CvSU email (@cvsu.edu.ph)';
    }

    // Program validation
    if (!formData.program) {
      newErrors.program = 'Program is required';
    }

    // Section validation
    if (!formData.section) {
      newErrors.section = 'Section is required';
    }

    // Student Number validation
    if (!formData.studentNumber.trim()) {
      newErrors.studentNumber = 'Student number is required';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          program: formData.program,
          section: formData.section,
          studentNumber: formData.studentNumber,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Check if backend returned field-specific errors
        if (data.error) {
          setGeneralError(data.error);
        } else {
          setGeneralError('Registration failed. Please try again.');
        }
        return;
      }

      // Registration successful
      navigate('/');
    } catch (err) {
      setGeneralError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      window.dispatchEvent(new Event('auth-changed'));
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card auth-card-large">
        <div className="auth-header">
          <h1>Create Account</h1>
          <p>Join CareerPath and start your journey</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {generalError && <div className="auth-error">{generalError}</div>}

          {/* Name */}
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Juan Dela Cruz"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span className="form-error">{errors.name}</span>}
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">CvSU Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="your.email@cvsu.edu.ph"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>

          {/* Program */}
          <div className="form-group">
            <label htmlFor="program">Program</label>
            <select
              id="program"
              name="program"
              value={formData.program}
              onChange={handleChange}
            >
              <option value="BSCS">Bachelor of Science in Computer Science (BSCS)</option>
              <option value="BSIT">Bachelor of Science in Information Technology (BSIT)</option>
            </select>
            {errors.program && <span className="form-error">{errors.program}</span>}
          </div>

          {/* Section */}
          <div className="form-group">
            <label htmlFor="section">Section</label>
            <select
              id="section"
              name="section"
              value={formData.section}
              onChange={handleChange}
            >
              <option value="">Select your section</option>
              {availableSections.map((sec) => (
                <option key={sec.value} value={sec.value}>
                  {sec.label}
                </option>
              ))}
            </select>
            {errors.section && <span className="form-error">{errors.section}</span>}
          </div>

          {/* Student Number */}
          <div className="form-group">
            <label htmlFor="studentNumber">Student Number</label>
            <input
              id="studentNumber"
              type="text"
              name="studentNumber"
              placeholder="202100001"
              value={formData.studentNumber}
              onChange={handleChange}
            />
            {errors.studentNumber && <span className="form-error">{errors.studentNumber}</span>}
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Create a strong password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <span className="form-error">{errors.password}</span>}
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <span className="form-error">{errors.confirmPassword}</span>}
          </div>

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="auth-link">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
