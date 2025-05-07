import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { SubscriptionPlan, RazorpayOptions, RazorpayPaymentResponse } from '../../types/student';
import { useNavigate } from 'react-router-dom';

const Subscription = () => {
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPlan, setCurrentPlan] = useState<SubscriptionPlan | null>(null);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/account/login');
      return;
    }
    fetchSubscriptionPlans();
    fetchCurrentSubscription();
  }, [navigate]);

  const fetchSubscriptionPlans = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL.replace(/\/api$/, '')}/api/students/packages`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.status === 401) {
        navigate('/account/login');
        return;
      }
      if (!response.ok) throw new Error('Failed to fetch subscription plans');
      const { data } = await response.json();
      setPlans(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const fetchCurrentSubscription = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL.replace(/\/api$/, '')}/api/students/my-orders`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.status === 401) {
        navigate('/account/login');
        return;
      }
      if (!response.ok) throw new Error('Failed to fetch current subscription');
      const { data } = await response.json();
      setCurrentPlan(data.length > 0 ? data[0] : null);
    } catch (err) {
      console.error('Error fetching current subscription:', err);
      setCurrentPlan(null);
    }
  };

  const handleSubscribe = async (planId: string) => {
    try {
      console.log('user', user);
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_BACKEND_API_URL.replace(/\/api$/, '')}/api/students/create/order`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ packageId: planId, couponCode })
      });

      if (res.status === 401) {
        navigate('/account/login');
        return;
      }

      const { orderId, amount, key, currency } = await res.json();

      const options: RazorpayOptions = {
        key,
        amount,
        currency,
        name: "ElevateYoga",
        description: "Subscription Payment",
        order_id: orderId,
        handler: async function (response: RazorpayPaymentResponse) {
          const verifyRes = await fetch(`${import.meta.env.VITE_BACKEND_API_URL.replace(/\/api$/, '')}/api/students/payment/verify`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(response),
          });

          if (verifyRes.ok) {
            alert("Payment successful!");
            window.location.reload();
          } else {
            alert("Payment verification failed");
          }
        },
        prefill: {
          name: user?.first_name && user?.last_name 
            ? `${user.first_name} ${user.last_name}` 
            : "Your Name",
          email: user?.email || "user@example.com",
          contact: user?.phone_no || "",
        },
        theme: {
          color: "#0077B6",
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      setError('Payment failed. Please try again.');
    }
  };

  const handleApplyCoupon = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL.replace(/\/api$/, '')}/api/coupons/validate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: couponCode }),
      });

      if (response.status === 401) {
        navigate('/account/login');
        return;
      }
      if (!response.ok) throw new Error('Invalid coupon code');

      const { discount } = await response.json();
      setPlans(prevPlans =>
        prevPlans.map(plan => ({
          ...plan,
          price: plan.price * (1 - discount)
        }))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid coupon code');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Choose Your Plan</h2>
        <p className="mt-2 text-gray-600">
          Select the perfect plan for your yoga journey
        </p>
      </div>

      {/* Coupon Input */}
      <div className="max-w-md mx-auto flex gap-2">
        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Enter coupon code"
          className="flex-1 border rounded-lg px-4 py-2"
        />
        <button
          onClick={handleApplyCoupon}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Apply
        </button>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative bg-white rounded-lg shadow-lg overflow-hidden ${currentPlan?.id === plan.id ? 'ring-2 ring-indigo-600' : ''
              }`}
          >
            {currentPlan?.id === plan.id && (
              <div className="absolute top-0 right-0 bg-indigo-600 text-white px-3 py-1 text-sm">
                Current Plan
              </div>
            )}
            <div className="p-6">
              <h3 className="text-2xl font-bold">{plan.name}</h3>
              {plan.description && (
                <p className="mt-2 text-gray-600">{plan.description}</p>
              )}
              <div className="mt-4">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-gray-600">/{plan.durationDays} days</span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-600">Free Trials:</span>
                  <span className="ml-2 font-medium">{plan.freeTrialClasses}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Group Classes:</span>
                  <span className="ml-2 font-medium">{plan.groupClasses}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">1-on-1 Sessions:</span>
                  <span className="ml-2 font-medium">{plan.oneOnOneSessions}</span>
                </div>
              </div>
              <ul className="mt-6 space-y-4">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleSubscribe(plan.id)}
                disabled={currentPlan?.id === plan.id}
                className={`mt-8 w-full py-3 px-4 rounded-lg font-medium ${currentPlan?.id === plan.id
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
              >
                {currentPlan?.id === plan.id ? 'Current Plan' : 'Choose Plan'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Current Plan Details */}
      {currentPlan ? (
        <div className="mt-12 bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-4">Current Plan Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <p className="text-gray-600">Plan</p>
              <p className="font-medium">{currentPlan.name}</p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-600">Next Billing Date</p>
              <p className="font-medium">
                {new Date(new Date().getTime() + currentPlan.durationDays * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-600">Status</p>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Active
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-12 bg-white rounded-lg shadow p-6 text-center">
          <div className="max-w-md mx-auto">
            <h3 className="text-xl font-semibold mb-4">No Active Subscription</h3>
            <p className="text-gray-600 mb-4">
              You don't have an active subscription yet. Choose a plan above to get started with your yoga journey!
            </p>
            <div className="flex items-center justify-center space-x-2 text-indigo-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <span>Select a plan to begin</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subscription;