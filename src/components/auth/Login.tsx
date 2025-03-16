import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <main role="main" id="MainContent">
      <div className="text-center pt-10 sf__page-header section__header">
        <h1 className="section__heading">Log In</h1>
        <nav className="sf-breadcrumb w-full " role="navigation" aria-label="breadcrumbs">
          <div className="container">
            <div className="flex -mx-4 items-center justify-center">
              <a href="/" className="bread-crumb__item" title="Back to the home page">
                Home
              </a>
              <span aria-hidden="true" className="sf__breadcrumb-separator py-2">
                <svg className="w-[12px] h-[12px]" fill="currentColor" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
                  <path d="M17.525 36.465l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L205.947 256 10.454 451.494c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l211.051-211.05c4.686-4.686 4.686-12.284 0-16.971L34.495 36.465c-4.686-4.687-12.284-4.687-16.97 0z"></path>
                </svg>
              </span>
              <span className="sf__breabcrumb-page-title p-4">Account</span>
            </div>
          </div>
        </nav>
      </div>
      <div className="sf-customer__forms pb-7 md:pb-15 md:w-11/12 lg:w-3/4 xl:w-2/3 2xl:w-1/2 md:flex mx-auto">
        <div className="sf-customer__login mx-4 lg:mx-10 md:w-1/2">
          <h3 className="text-2xl font-medium mb:3 md:mb-6">Log In</h3>
          <form method="post" action="/account/recover" acceptCharset="UTF-8">
            <input type="hidden" name="form_type" value="recover_customer_password" />
            <input type="hidden" name="utf8" value="✓" />
          </form>
          <div data-login-form="" className="flex flex-col-reverse">
            <form method="post" onSubmit={handleLogin} id="customer_login" acceptCharset="UTF-8" data-login-with-shop-sign-in="true">
              <input type="hidden" name="form_type" value="customer_login" />
              <input type="hidden" name="utf8" value="✓" />
              <input type="hidden" name="return_to" value="" />
              <input type="email" name="customer[email]" placeholder="Email" className="form-control" onChange={(e) => setEmail(e.target.value)} value={email} />
              <input type="password" name="customer[password]" placeholder="Password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
              <a className="underline block my-3 sf-customer__reset-password-btn">Forgot your password?</a>
              <button className="sf__btn sf__btn-primary mt-4  mb-3 w-full" type="submit">
                Sign In
              </button>
              <div className="h-captcha" data-sitekey="f06e6c50-85a8-45c8-87d0-21a2b65856fe" data-size="invisible">
                <iframe aria-hidden="true" style={{ display: 'none' }} data-hcaptcha-widget-id="24dvk4oc5s1n" data-hcaptcha-response="" src="https://newassets.hcaptcha.com/captcha/v1/14dbe0f1619b8014e2630bcdde727e7785a80dee/static/hcaptcha.html#frame=checkbox-invisible"></iframe>
                <textarea id="h-captcha-response-24dvk4oc5s1n" name="h-captcha-response" style={{ display: 'none' }}></textarea>
              </div>
            </form>
          </div>
        </div>
        <div className="sf-customer__reset-password hidden mx-4 lg:mx-10 md:w-1/2">
          <h3 className="text-2xl font-medium">Reset your password</h3>
          <p className="mt-4 mb-2 text-color-secondary">We will send you an email to reset your password.</p>
          <div data-recover-form="">
            <form method="post" action="/account/recover" acceptCharset="UTF-8">
              <input type="hidden" name="form_type" value="recover_customer_password" />
              <input type="hidden" name="utf8" value="✓" />
              <input className="form-control" type="email" name="email" placeholder="Email" spellCheck="false" autoComplete="off" autoCapitalize="none" />
              <div className="flex mt-2">
                <button type="submit" className="sf__btn sf__btn-primary block w-40">
                  Submit
                </button>
                <button type="button" data-recover-toggle="" className="sf__btn-secondary sf-customer__cancel-reset block w-40 ml-4">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="mx-4 lg:mx-10 md:w-1/2 mt-12 md:mt-0">
          <h3 className="text-2xl font-medium mb-6">New Customer</h3>
          <p className="mb-6 text-color-secondary">
            Sign up for early Sale access plus tailored new arrivals, trends and promotions. To opt out, click unsubscribe in our emails.
          </p>
          <a className="sf__btn sf__btn-primary" href="/account/register">
            Register
          </a>
        </div>
      </div>
      <div id="cart-drawer-container">
        <div>
          <div id="shopify-section-cart-drawer" className="shopify-section">
            {/* ... (rest of the cart drawer HTML) ... */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;