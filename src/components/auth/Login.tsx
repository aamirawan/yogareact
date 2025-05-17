import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import yogaImage from '../../assets/images/17.png';
import loginLogo from '../../assets/images/loginlogo.png';

const LoginPage: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMethod, setLoginMethod] = useState<'phone' | 'email'>('phone');
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  // Check for verification message in URL
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const verificationMessage = params.get('message');
    if (verificationMessage) {
      setMessage(verificationMessage);
    }
  }, []);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL.replace(/\/api$/, '')}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store token and role using AuthContext
      login(data.token, data.user.role);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Redirect to the page they tried to visit or their dashboard
      if (from === '/') {
        switch (data.user.role) {
          case 'student':
            //navigate('/student/classes');
            navigate('/');
            break;
          case 'teacher':
            navigate('/teacher/profile');
            break;
          case 'admin':
            navigate('/admin/pages');
            break;
          default:
            navigate('/');
        }
      } else {
        navigate(from);
      }
    } catch (error: any) {
      setError(error.message || 'Login failed. Please check your credentials.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) {
      setError('Please enter a phone number');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Add country code to phone number
      const formattedPhone = `+91${phone}`;
      console.log('Sending OTP to:', formattedPhone);
      
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL.replace(/\/api$/, '')}/api/otp/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: formattedPhone }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to send OTP');
      }
      
      setOtpSent(true);
      setMessage('OTP sent to your phone');
    } catch (error: any) {
      setError(error.message || 'Failed to send OTP');
      console.error('OTP error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Registration form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [registrationRole, setRegistrationRole] = useState('student');

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) {
      setError('Please enter the OTP');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Add country code to phone number
      const formattedPhone = `+91${phone}`;
      console.log('Verifying OTP for:', formattedPhone);
      
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL.replace(/\/api$/, '')}/api/otp/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: formattedPhone, otp: parseInt(otp) }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Invalid OTP');
      }
      
      // Check if user is new or existing based on backend response
      if (data.isNewUser) {
        // User is new - Show registration form
        setMessage(data.message || 'Phone verified. Please complete your registration.');
        setShowRegistrationForm(true);
      } else {
        // User exists - Login flow
        setMessage(data.message || 'Login successful! Redirecting...');
        
        // Store token and user details
        login(data.token, data.user.role);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Redirect to appropriate page based on user role
        setTimeout(() => {
          switch (data.user.role) {
            case 'student':
              //navigate('/student/classes');
              navigate('/');
              break;
            case 'teacher':
              navigate('/teacher/profile');
              break;
            case 'admin':
              navigate('/admin/pages');
              break;
            default:
              navigate('/');
          }
        }, 1500);
      }
    } catch (error: any) {
      setError(error.message || 'Failed to verify OTP');
      console.error('OTP verification error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneLogin = (e: React.FormEvent) => {
    handleSendOtp(e);
  };

  // Handle user registration after OTP verification
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!firstName || !lastName || !regEmail) {
      setError('All fields are required');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const formattedPhone = `+91${phone}`;
      
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL.replace(/\/api$/, '')}/api/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: regEmail,
          phone_no: formattedPhone,
          password: '', // Empty password for phone-based registration
          role: registrationRole,
          preferences: {
            focus: [],
            healthConcerns: [],
            sessionType: []
          }
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      
      setMessage('Registration successful! Please login again.');
      
      // Reset form and state
      setShowRegistrationForm(false);
      setOtpSent(false);
      setPhone('');
      setOtp('');
      
      // Redirect to login page after a delay
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error: any) {
      setError(error.message || 'Failed to register');
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    if (loginMethod === 'email') {
      handleEmailLogin(e);
    } else {
      handlePhoneLogin(e);
    }
  };

  const handleGoogleLogin = () => {
    // Implement Google login functionality
    console.log('Google login clicked');
    // This would typically redirect to your backend's Google OAuth endpoint
  };
  
  const handleFacebookLogin = () => {
    // Implement Facebook login functionality
    console.log('Facebook login clicked');
  };
  
  const switchToEmail = () => {
    setLoginMethod('email');
  };

  return (
    <div className="flex h-screen font-sans">
      {/* Left side - Yoga Image (full-height, edge-to-edge) */}
      <div className="hidden md:block md:w-1/2 h-full">
        <img 
          src={yogaImage} 
          alt="Woman stretching with plants" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Right side - Login Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 md:px-12 lg:px-16">
        <div className="w-full max-w-md">
          {/* Yoga/stretch icon */}
          <div className="flex justify-center mb-6">
            <Link to="/">
              <img src={loginLogo} alt="Logo" className="w-15 h-15 mr-25" />
            </Link>
          </div>
          
          {/* Welcome text */}
          <h1 className="text-2xl font-bold text-center mb-1">Welcome to <span className="font-bold">Elevate</span></h1>
          <p className="text-center text-gray-600 mb-8">Create your account to continue.</p>
          
          {message && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded" role="alert">
              <p>{message}</p>
            </div>
          )}
          
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded" role="alert">
              <p>{error}</p>
            </div>
          )}
          
          {loginMethod === 'phone' ? (
            showRegistrationForm ? (
              // Registration form after OTP verification
              <form onSubmit={handleRegister} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input 
                      type="text" 
                      id="firstName" 
                      name="firstName" 
                      value={firstName} 
                      onChange={(e) => setFirstName(e.target.value)} 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black" 
                      placeholder="Enter your first name" 
                      required 
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input 
                      type="text" 
                      id="lastName" 
                      name="lastName" 
                      value={lastName} 
                      onChange={(e) => setLastName(e.target.value)} 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black" 
                      placeholder="Enter your last name" 
                      required 
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="regEmail" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      id="regEmail" 
                      name="regEmail" 
                      value={regEmail} 
                      onChange={(e) => setRegEmail(e.target.value)} 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black" 
                      placeholder="Enter your email" 
                      required 
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">I am a</label>
                    <select
                      id="role"
                      name="role"
                      value={registrationRole}
                      onChange={(e) => setRegistrationRole(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                      required
                    >
                      <option value="student">Student</option>
                      <option value="teacher">Teacher</option>
                    </select>
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : 'Complete Registration'}
                </button>
                
                <div className="text-center mt-4">
                  <button 
                    type="button" 
                    onClick={() => {
                      setShowRegistrationForm(false);
                      setOtpSent(false);
                      setPhone('');
                      setOtp('');
                    }} 
                    className="text-sm text-black hover:text-gray-700 underline"
                  >
                    Cancel registration
                  </button>
                </div>
              </form>
            ) : (
              // Phone login/OTP verification form
              <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp} className="space-y-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <div className="flex">
                    {/* Country code as a separate element */}
                    <div className="flex items-center justify-center px-4 py-3 bg-gray-50 border border-r-0 border-gray-200 rounded-l-md text-gray-400">
                      +91
                    </div>
                    {/* Phone input field */}
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)} 
                      className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-r-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black" 
                      placeholder="Enter your number" 
                      required 
                      disabled={otpSent}
                    />
                  </div>
                </div>
                
                {otpSent && (
                  <div>
                    <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">Enter OTP</label>
                    <input 
                      type="text" 
                      id="otp" 
                      name="otp" 
                      value={otp} 
                      onChange={(e) => setOtp(e.target.value)} 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black" 
                      placeholder="Enter OTP sent to your phone" 
                      required 
                      maxLength={6}
                    />
                  </div>
                )}
                
                <button 
                  type="submit" 
                  className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : otpSent ? 'Verify OTP' : 'Continue'}
                </button>
                
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">OR</span>
                  </div>
                </div>
                
                <button 
                  type="button" 
                  onClick={switchToEmail}
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black mb-3"
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="currentColor"/>
                  </svg>
                  Continue with Email
                </button>
                
                <button 
                  type="button" 
                  onClick={handleFacebookLogin}
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black mb-3"
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 16.84 5.44 20.87 10 21.8V15H8V12H10V9.5C10 7.57 11.57 6 13.5 6H16V9H14C13.45 9 13 9.45 13 10V12H16V15H13V21.95C18.05 21.45 22 17.19 22 12Z" fill="#1877F2"/>
                  </svg>
                  Continue with Facebook
                </button>
                
                <button 
                  type="button" 
                  onClick={handleGoogleLogin}
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.766 12.2764C23.766 11.4607 23.6999 10.6406 23.5588 9.83807H12.24V14.4591H18.7217C18.4528 15.9494 17.5885 17.2678 16.323 18.1056V21.1039H20.19C22.4608 19.0139 23.766 15.9274 23.766 12.2764Z" fill="#4285F4"/>
                    <path d="M12.2401 24.0008C15.4766 24.0008 18.2059 22.9382 20.1945 21.1039L16.3276 18.1055C15.2517 18.8375 13.8627 19.252 12.2445 19.252C9.11388 19.252 6.45946 17.1399 5.50705 14.3003H1.5166V17.3912C3.55371 21.4434 7.7029 24.0008 12.2401 24.0008Z" fill="#34A853"/>
                    <path d="M5.50253 14.3003C4.99987 12.8099 4.99987 11.1961 5.50253 9.70575V6.61481H1.51649C-0.18551 10.0056 -0.18551 14.0004 1.51649 17.3912L5.50253 14.3003Z" fill="#FBBC04"/>
                    <path d="M12.2401 4.74966C13.9509 4.7232 15.6044 5.36697 16.8434 6.54867L20.2695 3.12262C18.1001 1.0855 15.2208 -0.034466 12.2401 0.000808666C7.7029 0.000808666 3.55371 2.55822 1.5166 6.61481L5.50264 9.70575C6.45064 6.86173 9.10947 4.74966 12.2401 4.74966Z" fill="#EA4335"/>
                  </svg>
                  Continue with Google
                </button>
              </form>
            )
          ) : (
            <form onSubmit={handleEmailLogin} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black" 
                    placeholder="Enter your email" 
                    required 
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <a href="/forgot-password" className="text-sm text-black hover:text-gray-700">Forgot password?</a>
                  </div>
                  <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black" 
                    placeholder="Enter your password" 
                    required 
                  />
                </div>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
              
              <div className="text-center mt-4">
                <button 
                  type="button" 
                  onClick={() => setLoginMethod('phone')} 
                  className="text-sm text-black hover:text-gray-700 underline"
                >
                  Back to phone login
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;