export interface Student {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    dateJoined: string;
    subscriptionStatus: SubscriptionStatus;
    currentPlan?: SubscriptionPlan;
    trialUsage: TrialUsage;
  }
  
  export interface SubscriptionPlan {
    id: string;
    name: string;
    description?: string;
    durationDays: number;
    price: number;
    freeTrialClasses: number;
    groupClasses: number;
    oneOnOneSessions: number;
    features: string[];
    isActive: boolean;
    createdAt?: string;
    updatedAt?: string;
  }
  
  export type SubscriptionStatus = 'trial' | 'active' | 'expired' | 'cancelled';
  
  export interface TrialUsage {
    groupSessionsAttended: number;
    oneOnOneSessionsBooked: number;
    trialStartDate: string;
    trialEndDate: string;
  }
  
  export interface ClassBooking {
    id: string;
    studentId: string;
    classId: string;
    teacherId: string;
    date: string;
    startTime: string;
    endTime: string;
    status: BookingStatus;
    type: 'group' | 'one-on-one';
  }
  
  export type BookingStatus = 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  
  export interface TeacherReview {
    id: string;
    studentId: string;
    teacherId: string;
    classId: string;
    rating: number;
    comment: string;
    createdAt: string;
  }
  
  export interface Coupon {
    id: string;
    code: string;
    discountPercentage: number;
    validUntil: string;
    isApplied: boolean;
  }
  
  export interface TimeSlot {
    id: string;
    teacherId: string;
    session_date: string;
    start_time: string;
    end_time: string;
    isAvailable: boolean;
  }
  
  export interface Teacher {
    id: string;
    first_name: string;
    last_name: string;
    certifications: string[];
    rating: number;
    totalReviews: number;
    profile_photo: string;
  }
  
  export interface RazorpayPaymentResponse {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }
  
  export interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    order_id: string;
    handler: (response: RazorpayPaymentResponse) => void;
    prefill: {
      name: string;
      email: string;
      contact?: string;
    };
    theme: {
      color: string;
    };
  }
  
  declare global {
    interface Window {
      Razorpay: new (options: RazorpayOptions) => {
        open: () => void;
      };
    }
  }