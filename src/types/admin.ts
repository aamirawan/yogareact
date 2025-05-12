export interface StaticPage {
    _id?: string;
    title: string;
    slug: string;
    content: string;
    metaTitle?: string;
    metaDescription?: string;
    lastUpdated?: Date;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface BlogPost {
    _id?: string;
    title: string;
    slug: string;
    content: string;
    author: string;
    coverImage: string;
    tags: string[];
    type: 'blog' | 'video';
    videoUrl?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface SubscriptionPackage {
    _id?: string;
    id?: string;
    name: string;
    description?: string;
    durationDays: number;
    price: number;
    freeTrialClasses: number;
    groupClasses: number; // 0 for unlimited, specific number for limited
    oneOnOneSessions: number; // Number of allowed sessions
    type: 'group' | 'one-on-one';
    features: string[];
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }

  export interface Teacher {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    focus: string[];
    health_concerns: string[];
    session_type: string[];
    profile_photo: string;
    specialization: string;
    experience: number;
    bio: string;
    is_verified: number;  // 0 = pending/rejected, 1 = approved
  }