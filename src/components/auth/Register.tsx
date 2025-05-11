import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/quiz.css';

// TypeScript interfaces
interface UserPreferences {
  focus: string[];
  sessionType: string[];
  healthConcerns: string[];
  languages: string[];
}

interface UserData {
  first_name: string | undefined;
  last_name: string | undefined;
  email: string | undefined;
  phone_no: string | undefined;
  password: string | undefined;
  role: string | undefined;
  preferences: UserPreferences;
}

interface ApiResponse {
  success: boolean;
  token?: string;
  message?: string;
  is_verified?: boolean;
}

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState<string>('step1');
  const [selectedFocus, setSelectedFocus] = useState<string[]>([]);
  const [selectedSessionType, setSelectedSessionType] = useState<string[]>([]);
  const [selectedHealthConcerns, setSelectedHealthConcerns] = useState<string[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>('student');
  const [selectedLanguages, setSelectedLanguages] = useState<{ english: boolean; hindi: boolean; both: boolean }>({
    english: false,
    hindi: false,
    both: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleNext = (nextStep: string) => {
    setActiveStep(nextStep);
  };

  const handleBack = (prevStep: string) => {
    setActiveStep(prevStep);
  };

  const handleFocusSelection = (value: string) => {
    if (selectedFocus.includes(value)) {
      setSelectedFocus(selectedFocus.filter((item) => item !== value));
    } else {
      setSelectedFocus([...selectedFocus, value]);
    }
  };

  const handleSessionTypeSelection = (value: string) => {
    if (selectedSessionType.includes(value)) {
      setSelectedSessionType(selectedSessionType.filter((item) => item !== value));
    } else {
      setSelectedSessionType([...selectedSessionType, value]);
    }
  };

  const handleHealthConcernsSelection = (value: string) => {
    if (selectedHealthConcerns.includes(value)) {
      setSelectedHealthConcerns(selectedHealthConcerns.filter((item) => item !== value));
    } else {
      setSelectedHealthConcerns([...selectedHealthConcerns, value]);
    }
  };

  const handleLanguageSelection = (language: 'english' | 'hindi' | 'both') => {
    setSelectedLanguages((prev) => ({ ...prev, [language]: !prev[language] }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    // Get form values with proper TypeScript typing
    const form = formRef.current;
    if (!form) return;
  
    const firstName = form.querySelector<HTMLInputElement>('input[name="customer[first_name]"]')?.value;
    const lastName = form.querySelector<HTMLInputElement>('input[name="customer[last_name]"]')?.value;
    const email = form.querySelector<HTMLInputElement>('input[name="customer[email]"]')?.value;
    const phone = form.querySelector<HTMLInputElement>('input[name="customer[phone]"]')?.value;
    const password = form.querySelector<HTMLInputElement>('input[name="customer[password]"]')?.value;
  
    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !password) {
      setError('Please fill in all required fields');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    const userData: UserData = {
      first_name: firstName,
      last_name: lastName,
      email,
      phone_no: phone,
      password,
      role: selectedRole,
      preferences: {
        focus: selectedFocus,
        healthConcerns: selectedHealthConcerns,
        languages: Object.entries(selectedLanguages)
          .filter(([_, value]) => value)
          .map(([key]) => key),
        sessionType: selectedSessionType
      }
    };
console.log(userData);
    setIsLoading(true);
    setError(null);

    try {
      // Check if API URL is configured
      const apiUrl = import.meta.env.VITE_BACKEND_API_URL.replace(/\/api$/, '')
      console.log(apiUrl)
      if (!apiUrl) {
        throw new Error('API URL is not configured');
      }

      const response = await fetch(`${apiUrl}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data: ApiResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      if (data.success) {
        navigate('/account/login');
        return;
      }else{
        setError('Registration failed');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Registration failed');
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main role="main" id="MainContent">
      <div className="register-page">
        <div className="register-page-inner">
          <div data-register-form="">
            <form method="post" action="/account" id="create_customer" acceptCharset="UTF-8" data-login-with-shop-sign-up="true" data-cptcha="true" data-hcaptcha-bound="true" ref={formRef} onSubmit={handleSubmit}>
              <input type="hidden" name="form_type" value="create_customer" />
              <input type="hidden" name="utf8" value="✓" />

              <div className="quiz-logo">
                <a href="/">
                  <img src="//theelevateyoga.com/cdn/shop/t/2/assets/icon-logo.png?v=21660638028715533551731525303" alt="Elevate Icon" />
                </a>
              </div>
              <div className={`quiz-container ${activeStep === 'step1' ? 'active' : ''}`} id="step1">
                <div id="quiz-form-step1" className="steps-same">
                  <div className="quiz-container-left">
                    <div className="quiz-container-left-content">
                      <h1>Let’s personalize your practice.</h1>
                      <p>Help us create a routine that fits your needs by answering 3 quick questions.</p>
                      <div className="nav-buttons">
                        <button type="button" className="sf__btn sf__btn-primary btn-next" id="next1" onClick={() => handleNext('step2')}>
                          Let’s do it
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="quiz-container-right">
                    <div className="quiz-container-right-image">
                      <img src="//theelevateyoga.com/cdn/shop/t/2/assets/intro-devices.png?v=177003872670799069851729096834" alt="Elevate Image" />
                    </div>
                  </div>
                </div>
              </div>
              <div className={`quiz-container ${activeStep === 'step2' ? 'active' : ''}`} id="step2">
                <div id="quiz-form-step2" className="steps-same">
                  <div className="quiz-container-left">
                    <div className="quiz-container-left-content">
                      <h1>What would you like to focus on?</h1>
                      <p>Pick as many as you'd like.</p>
                      <div className="nav-buttons">
                        <button type="button" className="btn-back" id="back1" onClick={() => handleBack('step1')}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="7" height="10" viewBox="0 0 7 10" fill="none">
                            <path d="M5 10L0 5L5 0L6.0625 1.0625L2.125 5L6.0625 8.9375L5 10Z" fill="#191919"></path>
                          </svg>
                        </button>
                        <button type="button" className="sf__btn sf__btn-primary btn-next" id="next2" onClick={() => handleNext('step3')}>
                          Continue
                        </button>
                        <button type="button" className="sf__btn sf__btn-primary btn-skip" id="skip2" onClick={() => handleNext('step3')}>
                          Skip
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="quiz-container-right second-step">
                    <div className="quiz-container-right-options">
                      <div className="options-container stepone" id="teacher-options">
                        {[
                          { value: 'sleep', src: '//theelevateyoga.com/cdn/shop/t/2/assets/sleep.svg?v=101554482212583267261729099797', alt: 'Sleep', label: 'Sleep' },
                          { value: 'core', src: '//theelevateyoga.com/cdn/shop/t/2/assets/core.svg?v=168668573063186685691729099787', alt: 'Core', label: 'Core' },
                          { value: 'strength', src: '//theelevateyoga.com/cdn/shop/t/2/assets/strength.svg?v=125854340139009467031729099792', alt: 'Strength', label: 'Strength' },
                          { value: 'flexibility', src: '//theelevateyoga.com/cdn/shop/t/2/assets/stretch.svg?v=5630108750637234071729099739', alt: 'Flexibility', label: 'Flexibility' },
                          { value: 'calm', src: '//theelevateyoga.com/cdn/shop/t/2/assets/calm.svg?v=158668240129774360641729099774', alt: 'calm', label: 'Calm' },
                          { value: 'workouts', src: '//theelevateyoga.com/cdn/shop/t/2/assets/workouts.svg?v=54614852741646040921729099779', alt: 'Workout', label: 'Workout' },
                          { value: 'The Basics ', src: '//theelevateyoga.com/cdn/shop/t/2/assets/basics.svg?v=170392195268859458331729099745', alt: 'Flexibility', label: 'The Basics' },
                          { value: 'prenatal', src: '//theelevateyoga.com/cdn/shop/t/2/assets/prenatal.svg?v=2899423685723250471729099730', alt: 'Flexibility', label: 'Prenatal' },
                          { value: 'postnatal', src: '//theelevateyoga.com/cdn/shop/t/2/assets/postnatal.svg?v=106947633270846448151729099753', alt: 'Flexibility', label: 'Postnatal' },
                          { value: 'Back Care', src: '//theelevateyoga.com/cdn/shop/t/2/assets/back.svg?v=150374377690669371341729099722', alt: 'Flexibility', label: 'Back Care' },
                          { value: 'energy', src: '//theelevateyoga.com/cdn/shop/t/2/assets/energy.svg?v=90424147775125934611729099716', alt: 'Flexibility', label: 'Energy' },
                          { value: 'women Health', src: '//theelevateyoga.com/cdn/shop/t/2/assets/women.svg?v=123606748713848417561729101023', alt: 'Flexibility', label: "Women's Health" },
                          { value: 'Emotional Health and Recovery', src: '//theelevateyoga.com/cdn/shop/t/2/assets/emotional.svg?v=160512993568825247801729099701', alt: 'Flexibility', label: 'Emotional Health and Recovery' },
                          { value: 'Physical Health and Recovery', src: '//theelevateyoga.com/cdn/shop/t/2/assets/physical.svg?v=104149327725479620541729099696', alt: 'Flexibility', label: 'Physical Health and Recovery' },
                          { value: 'Focus and Productivity', src: '//theelevateyoga.com/cdn/shop/t/2/assets/productivity.svg?v=25708650344679805641729099709', alt: 'Flexibility', label: 'Focus and Productivity' },
                          { value: 'family', src: '//theelevateyoga.com/cdn/shop/t/2/assets/family.svg?v=3923285787868623141729099634', alt: 'Flexibility', label: 'Family' },
                          { value: 'travel', src: '//theelevateyoga.com/cdn/shop/t/2/assets/travel.svg?v=44959931504166159031729099644', alt: 'Flexibility', label: 'Travel' },
                          { value: 'advAdvanced Practice and Teachersanced', src: '//theelevateyoga.com/cdn/shop/t/2/assets/advanced.svg?v=142279936010957783591729099629', alt: 'Flexibility', label: 'Advanced Practice and Teachers' },
                        ].map((item) => (
                          <div
                            key={item.value}
                            className={`option-card ${selectedFocus.includes(item.value) ? 'selected' : ''}`}
                            data-value={item.value}
                            onClick={() => handleFocusSelection(item.value)}
                          >
                            <img src={item.src} alt={item.alt} /> <span>{item.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`quiz-container ${activeStep === 'step3' ? 'active' : ''}`} id="step3">
                <div id="quiz-form-step3" className="steps-same">
                  <div className="quiz-container-left">
                    <div className="quiz-container-left-content">
                      <h1>Preferred Yoga Session Type</h1>
                      <p>Choose all that apply and we’ll help you find your match.</p>
                      <div className="nav-buttons">
                        <button type="button" className="btn-back" id="back2" onClick={() => handleBack('step2')}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="7" height="10" viewBox="0 0 7 10" fill="none">
                            <path d="M5 10L0 5L5 0L6.0625 1.0625L2.125 5L6.0625 8.9375L5 10Z" fill="#191919"></path>
                          </svg>
                        </button>
                        <button type="button" className="sf__btn sf__btn-primary btn-next" id="next3" onClick={() => handleNext('step4')}>
                          Continue
                        </button>
                        <button type="button" className="sf__btn sf__btn-primary btn-skip" id="skip3" onClick={() => handleNext('step4')}>
                          Skip
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="quiz-container-right second-step third">
                    <div className="quiz-container-right-options">
                      <div className="teacher-container steptwo" id="teacher-selection">
                        <div className="teacher-container-inner">
                          {[
                            { value: 'Personalized Session', src: '//theelevateyoga.com/cdn/shop/t/2/assets/Elevate-Yoga-For-Weight-Loss.webp?v=65835507707455322711732017950', alt: 'Yoga Classes', label: 'Personalized Session' },
                            { value: 'Group Classes', src: '//theelevateyoga.com/cdn/shop/t/2/assets/Elevate-Yoga-For-Weight-Loss.webp?v=65835507707455322711732017950', alt: 'Yoga Classes', label: 'Group Classes' },
                            { value: 'Either', src: '//theelevateyoga.com/cdn/shop/t/2/assets/Elevate-Yoga-For-Weight-Loss.webp?v=65835507707455322711732017950', alt: 'Yoga Classes', label: 'Either' },
                          ].map((item) => (
                            <button
                              key={item.value}
                              type="button"
                              className={`onboarding__personality-style-info card-picker ${selectedSessionType.includes(item.value) ? 'is-selected' : ''}`}
                              data-value={item.value}
                              onClick={() => handleSessionTypeSelection(item.value)}
                            >
                              <div className="onboarding__personality-image-container">
                                <img src={item.src} alt={item.alt} />
                              </div>
                              <div className="onboarding__personality-detail">
                                <h3 className="onboarding__personality-info-name">{item.label}</h3>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`quiz-container ${activeStep === 'step4' ? 'active' : ''}`} id="step4">
                <div id="quiz-form-step4" className="steps-same">
                  <div className="quiz-container-left fourth">
                    <div className="quiz-container-left-content">
                      <h1>Do you have specific health concerns or goals?</h1>
                      <p>Move the slider to your best estimate for each practice.</p>
                      <div className="nav-buttons">
                        <button type="button" className="btn-back" id="back3" onClick={() => handleBack('step3')}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="7" height="10" viewBox="0 0 7 10" fill="none">
                            <path d="M5 10L0 5L5 0L6.0625 1.0625L2.125 5L6.0625 8.9375L5 10Z" fill="#191919"></path>
                          </svg>
                        </button>
                        <button type="button" className="sf__btn sf__btn-primary btn-next" id="next4" onClick={() => handleNext('step5-top')}>
                          Continue
                        </button>
                        <button type="button" className="sf__btn sf__btn-primary btn-skip" id="skip4" onClick={() => handleNext('step5')}>
                          Skip
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="quiz-container-right second-step fourth">
                    <div className="quiz-container-right-options">
                      <div className="teacher-container stepthree" id="teacher-selection">
                        <div className="teacher-container-inner">
                          {[
                            { value: 'PCOS/PCOD', src: '//theelevateyoga.com/cdn/shop/t/2/assets/Elevate-Yoga-For-Weight-Loss.webp?v=65835507707455322711732017950', alt: 'Yoga Classes', label: 'PCOS/PCOD' },
                            { value: 'Anxiety/Depression', src: '//theelevateyoga.com/cdn/shop/t/2/assets/Elevate-Yoga-For-Weight-Loss.webp?v=65835507707455322711732017950', alt: 'Yoga Classes', label: 'Anxiety/Depression' },
                            { value: 'Back pain or joint issues', src: '//theelevateyoga.com/cdn/shop/t/2/assets/Elevate-Yoga-For-Weight-Loss.webp?v=65835507707455322711732017950', alt: 'Yoga Classes', label: 'Back Pain or Joint Issues' },
                            { value: 'Weight Management', src: '//theelevateyoga.com/cdn/shop/t/2/assets/Elevate-Yoga-For-Weight-Loss.webp?v=65835507707455322711732017950', alt: 'Yoga Classes', label: 'Weight Management' },
                            { value: 'Sleep issues/insomnia', src: '//theelevateyoga.com/cdn/shop/t/2/assets/Elevate-Yoga-For-Weight-Loss.webp?v=65835507707455322711732017950', alt: 'Yoga Classes', label: 'Sleep Issues/Insomnia' },
                            { value: 'Other (please specify):', src: '//theelevateyoga.com/cdn/shop/t/2/assets/Elevate-Yoga-For-Weight-Loss.webp?v=65835507707455322711732017950', alt: 'Yoga Classes', label: 'Other (please specify):' },
                          ].map((item) => (
                            <button
                              key={item.value}
                              type="button"
                              className={`onboarding__personality-style-info card-picker ${selectedHealthConcerns.includes(item.value) ? 'is-selected' : ''}`}
                              data-value={item.value}
                              onClick={() => handleHealthConcernsSelection(item.value)}
                            >
                              <div className="onboarding__personality-image-container">
                                <img src={item.src} alt={item.alt} />
                              </div>
                              <div className="onboarding__personality-detail">
                                <h3 className="onboarding__personality-info-name">{item.label}</h3>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`quiz-container ${activeStep === 'step5-top' ? 'active' : ''}`} id="step5-top">
                <div id="quiz-form-step6" className="steps-same">
                  <div className="quiz-container-left fourth">
                    <div className="quiz-container-left-content">
                      <h1>Language?</h1>
                      <p>Move the slider to your best estimate for each practice.</p>
                      <div className="nav-buttons">
                        <button type="button" className="btn-back" id="back4" onClick={() => handleBack('step4')}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="7" height="10" viewBox="0 0 7 10" fill="none">
                            <path d="M5 10L0 5L5 0L6.0625 1.0625L2.125 5L6.0625 8.9375L5 10Z" fill="#191919"></path>
                          </svg>
                        </button>
                        <button type="button" className="sf__btn sf__btn-primary btn-next" id="next5" onClick={() => handleNext('step5')}>
                          Continue
                        </button>
                        <button type="button" className="sf__btn sf__btn-primary btn-skip" id="skip5" onClick={() => handleNext('step5')}>
                          Skip
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="quiz-container-right second-step sixth">
                    <div className="quiz-container-right-options">
                      <div className="language-container">
                        <div className="form-group">
                          <input type="checkbox" id="english" checked={selectedLanguages.english} onChange={() => handleLanguageSelection('english')} />
                          <label htmlFor="english">English</label>
                        </div>
                        <div className="form-group">
                          <input type="checkbox" id="hindi" checked={selectedLanguages.hindi} onChange={() => handleLanguageSelection('hindi')} />
                          <label htmlFor="hindi">Hindi</label>
                        </div>
                        <div className="form-group">
                          <input type="checkbox" id="both" checked={selectedLanguages.both} onChange={() => handleLanguageSelection('both')} />
                          <label htmlFor="both">Both</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`quiz-container ${activeStep === 'step5' ? 'active' : ''}`} id="step5">
                <div id="quiz-form-step5" className="steps-same">
                  <div className="quiz-container-left">
                    <div className="quiz-container-left-content">
                      <h1>Let’s get started</h1>
                      <p>Create an account to join our community</p>
                      <div className="quiz-register-form">
                        {error && <div className="error-message text-red-500">{error}</div>}
                        <input type="hidden" name="return_to" value="/pages/all-teachers" />
                        <input type="text" name="customer[first_name]" placeholder="First Name" className="form-control" />
                        <input type="text" name="customer[last_name]" placeholder="Last Name" className="form-control" />
                        <input type="email" name="customer[email]" placeholder="Email" className="form-control" />
                        <input type="tel" id="phone" name="customer[phone]" placeholder="Enter your phone number" className="form-control" pattern="\\+?\\d{1,3}?[-.\\s]?\\(?\\d{1,4}?\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}" required />
                        <input type="password" name="customer[password]" placeholder="Password" className="form-control" />
                        <select
                          name="customer[role]"
                          value={selectedRole}
                          onChange={(e) => setSelectedRole(e.target.value)}
                          className="form-control"
                        >
                          <option value="student">Student</option>
                          <option value="teacher">Teacher</option>
                        </select>
                        <div className="mt-3 text-color-secondary">Sign up for early Sale access plus tailored new arrivals, trends and promotions. To opt out, click unsubscribe in our emails.</div>
                        <div className="form-login-buttons">
                          <button className="mt-6 mb-3 w-full sf__btn sf__btn-primary">Register</button>
                          <a className="w-full mt-[12xpx] sf__btn sf__btn-secondary" href="/account/login">Log In</a>
                        </div>
                      </div>
                      <div className="nav-buttons">
                        <button type="button" className="btn-back" id="back5" onClick={() => handleBack('step5-top')}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="7" height="10" viewBox="0 0 7 10" fill="none">
                            <path d="M5 10L0 5L5 0L6.0625 1.0625L2.125 5L6.0625 8.9375L5 10Z" fill="#191919"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="quiz-container-right second-step five">
                    <div className="quiz-container-right-options">
                      <img className="desktop-img" src="//theelevateyoga.com/cdn/shop/t/2/assets/register-form-desktop.png?v=26267980035392569241733155049" alt="Yoga Register" />
                      <img className="mobile-img" src="//theelevateyoga.com/cdn/shop/t/2/assets/register-form-mobile.png?v=184273096529285157441733156466" alt="Yoga Register" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-captcha" data-sitekey="f06e6c50-85a8-45c8-87d0-21a2b65856fe" data-size="invisible">
                <iframe
                  aria-hidden="true"
                  style={{ display: 'none' }}
                  data-hcaptcha-widget-id="2higb6cmzcps"
                  data-hcaptcha-response=""
                  src="https://newassets.hcaptcha.com/captcha/v1/14dbe0f1619b8014e2630bcdde727e7785a80dee/static/hcaptcha.html#frame=checkbox-invisible"
                ></iframe>
                <textarea id="h-captcha-response-2higb6cmzcps" name="h-captcha-response" style={{ display: 'none' }}></textarea>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div id="cart-drawer-container">
        <div>
          <div id="shopify-section-cart-drawer" className="shopify-section">
            <div style={{ '--tw-bg-opacity': '0' }} className="scd__wrapper touch-none hidden transition-colors duration-300 bg-black fixed z-[100] inset-0">
              <div
                className="scd__content transition-transform duration-300 translate-x-0 translate-x-full ml-auto min-h-full md:w-[450px] bg-white z-50"
                style={{ '--al-thickness': '3px', '--al-color': 'gray', '--al-start-duration': '1000ms', '--al-finish-duration': '300ms' }}
              >
                <button className="scd__close p-2 cursor-pointer absolute">
                  <svg className="w-[24px] h-[24px]" fill="currentColor" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                    <path d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"></path>
                  </svg>
                </button>
                <div className="flex flex-col h-full">
                  <div className="scd__header mx-6 py-4 md:pt-6">
                    <h3 className="text-2xl font-medium">Shopping Cart</h3>
                  </div>
                  <div className="scd__body sf__custom_scroll overscroll-contain px-6 pb-4 flex flex-col flex-grow">
                    <form action="/cart" method="post" id="cart-drawer-form" className="checkout-form novalidate">
                      <div className="scd-empty-msg">Your cart is currently empty.</div>
                    </form>
                  </div>
                  <div className="scd__footer py-4 px-6">
                    <div className="scd__footer-actions">
                      <button data-open="note" className="sf__tooltip-item sf__tooltip-top">
                        <svg className="w-[20px] h-[20px]" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19">
                          <path fill="currentColor" d="M17.3672 2.21875c.4453.44531.668.98437.668 1.61719 0 .60937-.2227 1.13672-.668 1.58203L4.99219 17.793l-4.007815.457H.878906c-.257812 0-.46875-.0938-.632812-.2812-.164063-.1876-.234375-.4102-.210938-.668l.457032-4.0078L12.8672.917969C13.3125.472656 13.8398.25 14.4492.25c.6328 0 1.1719.222656 1.6172.667969l1.3008 1.300781zM4.46484 16.7383l9.28126-9.28127-2.918-2.91797-9.28122 9.28124-.35157 3.2695 3.26953-.3515zM16.5938 4.60938c.2109-.21094.3164-.46875.3164-.77344 0-.32813-.1055-.59766-.3164-.8086l-1.336-1.33593c-.2109-.21094-.4805-.31641-.8086-.31641-.3047 0-.5625.10547-.7734.31641l-2.0391 2.03906 2.918 2.91797 2.0391-2.03906z"></path>
                        </svg>
                        <span>Note</span> <span className="sf__tooltip-content text-[12px]">Add note for seller</span>
                      </button>
                      <button data-open="shipping" className="sf__tooltip-item sf__tooltip-top">
                        <svg className="w-[22px] h-[22px]" fill="currentColor" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                          <path d="M280 192c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8H40c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h240zm352 192h-24V275.9c0-16.8-6.8-33.3-18.8-45.2l-83.9-83.9c-11.8-12-28.3-18.8-45.2-18.8H416V78.6c0-25.7-22.2-46.6-49.4-46.6H113.4C86.2 32 64 52.9 64 78.6V96H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h240c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8H96V78.6c0-8.1 7.8-14.6 17.4-14.6h253.2c9.6 0 17.4 6.5 17.4 14.6V384H207.6C193 364.7 170 352 144 352c-18.1 0-34.6 6.2-48 16.4V288H64v144c0 44.2 35.8 80 80 80s80-35.8 80-80c0-5.5-.6-10.8-1.6-16h195.2c-1.1 5.2-1.6 10.5-1.6 16 0 44.2 35.8 80 80 80s80-35.8 80-80c0-5.5-.6-10.8-1.6-16H632c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8zm-488 96c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm272-320h44.1c8.4 0 16.7 3.4 22.6 9.4l83.9 83.9c8.8 1.1 1.9 1.8 2.8H416V160zm80 320c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm80-96h-16.4C545 364.7 522 352 496 352s-49 12.7-63.6 32H416v-96h160v96zM256 248v-16c0-4.4-3.6-8-8-8H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h240c4.4 0 8-3.6 8-8z"></path>
                        </svg>
                        <span>Shipping</span> <span className="sf__tooltip-content text-[12px]">Estimate shipping rates</span>
                      </button>
                    </div>
                    <div className="scd__addon" id="scd-note">
                      <div className="scd__addon-title font-medium">
                        <svg className="w-[20px] h-[20px]" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19">
                          <path fill="currentColor" d="M17.3672 2.21875c.4453.44531.668.98437.668 1.61719 0 .60937-.2227 1.13672-.668 1.58203L4.99219 17.793l-4.007815.457H.878906c-.257812 0-.46875-.0938-.632812-.2812-.164063-.1876-.234375-.4102-.210938-.668l457032-4.0078L12.8672.917969C13.3125.472656 13.8398.25 14.4492.25c.6328 0 1.1719.222656 1.6172.667969l1.3008 1.300781zM4.46484 16.7383l9.28126-9.28127-2.918-2.91797-9.28122 9.28124-.35157 3.2695 3.26953-.3515zM16.5938 4.60938c.2109-.21094.3164-.46875.3164-.77344 0-.32813-.1055-.59766-.3164-.8086l-1.336-1.33593c-.2109-.21094-.4805-.31641-.8086-.31641-.3047 0-.5625.10547-.7734.31641l-2.0391 2.03906 2.918 2.91797 2.0391-2.03906z"></path>
                        </svg>
                        <span>Add note for seller</span>
                      </div>
                      <div className="scd__addon-content">
                        <textarea name="note" className="form-control form=cart-drawer-form rows=3 placeholder=Special instructions for seller"></textarea>
                      </div>
                      <div className="scd__addon-actions flex flex-col">
                        <button className="sf__btn sf__btn-primary btn-save" data-action="note">
                          Save
                        </button>
                        <button className="sf__btn sf__btn-plain btn-cancel" data-action="note">
                          Cancel
                        </button>
                      </div>
                    </div>
                    <div className="scd__addon" id="scd-shipping">
                      <div className="scd__addon-title font-medium">
                        <svg className="w-[22px]" fill="currentColor" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                          <path d="M280 192c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8H40c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h240zm352 192h-24V275.9c0-16.8-6.8-33.3-18.8-45.2l-83.9-83.9c-11.8-12-28.3-18.8-45.2-18.8H416V78.6c0-25.7-22.2-46.6-49.4-46.6H113.4C86.2 32 64 52.9 64 78.6V96H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h240c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8H96V78.6c0-8.1 7.8-14.6 17.4-14.6h253.2c9.6 0 17.4 6.5 17.4 14.6V384H207.6C193 364.7 170 352 144 352c-18.1 0-34.6 6.2-48 16.4V288H64v144c0 44.2 35.8 80 80 80s80-35.8 80-80c0-5.5-.6-10.8-1.6-16h195.2c-1.1 5.2-1.6 10.5-1.6 16 0 44.2 35.8 80 80 80s80-35.8 80-80c0-5.5-.6-10.8-1.6-16H632c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8zm-488 96c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm272-320h44.1c8.4 0 16.7 3.4 22.6 9.4l83.9 83.9c8.8 1.1 1.9 1.8 2.8H416V160zm80 320c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm80-96h-16.4C545 364.7 522 352 496 352s-49 12.7-63.6 32H416v-96h160v96zM256 248v-16c0-4.4-3.6-8-8-8H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h240c4.4 0 8-3.6 8-8z"></path>
                        </svg>
                        <span>Estimate shipping rates</span>
                      </div>
                      <div className="scd__addon-content">
                        <div data-address="root">
                          <div className="hidden">
                            <label htmlFor="AddressFirstName">First Name</label> <input type="text" id="AddressFirstName" name="address[first_name]" value="" />
                          </div>
                          <div className="hidden">
                            <label htmlFor="AddressLastName">Last Name</label> <input type="text" id="AddressLastName" name="address[last_name]" value="" />
                          </div>
                          <div className="hidden">
                            <label htmlFor="AddressCompany">Company</label> <input type="text" id="AddressCompany" name="address[company]" value="" />
                          </div>
                          <div className="hidden">
                            <label htmlFor="AddressAddress1">Address</label> <input type="text" id="AddressAddress1" name="address[address1]" value="" />
                          </div>
                          <div className="hidden">
                            <label htmlFor="AddressAddress2">Apartment, suite, etc.</label> <input type="text" id="AddressAddress2" name="address[address2]" value="" />
                          </div>
                          <div className="hidden">
                            <label htmlFor="AddressCity">City</label> <input type="text" id="AddressCity" name="address[city]" value="" />
                          </div>
                          <div className="form-group">
                            <label htmlFor="AddressCountry">Country</label> <select id="AddressCountry" className="form-control" name="address[country]" data-default="US"></select>
                          </div>
                          <div className="form-group">
                            <label htmlFor="AddressProvince">Province</label> <select id="AddressProvince" className="form-control" name="address[province]" data-default=""></select>
                          </div>
                          <div className="form-group">
                            <label htmlFor="AddressZip">Postal/Zip Code</label> <input type="text" className="form-control" id="AddressZip" name="address[zip]" value="" autocapitalize="characters" />
                          </div>
                          <div className="hidden">
                            <label htmlFor="AddressPhone">Phone</label> <input type="tel" id="AddressPhone" name="address[phone]" value="" />
                          </div>
                        </div>
                      </div>
                      <div className="scd__addon-actions flex flex-col" data-show-delivery-days="false">
                        <button className="sf__btn sf__btn-primary btn-calc relative" data-action="shipping">
                          <span className="shipping-calc-spinner inset-0 absolute items-center justify-center">
                            <svg className="animate-spin w-[20px] h-[20px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          </span>
                          <span className="shipping-calc-text">Calculate shipping rates</span>
                        </button>
                        <button className="sf__btn sf__btn-plain btn-cancel" data-action="shipping">
                          Cancel
                        </button>
                      </div>
                      <div className="scd__addon-message py-5"></div>
                    </div>
                    <div className="scd__summary mb-4 pt-4" data-cart-summary="">
                      <div data-discounts="">
                        <ul className="scd-cart__discounts" role="list" data-discounts-list=""></ul>
                      </div>
                      <div className="scd__subtotal flex justify-between" data-cart-subtotal="">
                        <span className="font-medium">Subtotal</span> <span className="scd__subtotal-price font-medium sf-currency" data-cart-subtotal-price="">$0.00</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <button type="submit" form="cart-drawer-form" className="sf__btn sf__btn-primary w-full scd__checkout relative" name="checkout">
                        <span>Check out</span>
                        <svg className="animate-spin w-[18px] h-[18px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </button>
                      <a className="underline mt-2" href="/cart">
                        View Cart
                      </a>
                    </div>
                  </div>
                  <div className="scd__overlay inset-0"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RegistrationForm;