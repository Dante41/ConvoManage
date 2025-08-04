// Core Types for ConvoManage Platform

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export type UserRole = 'organizer' | 'speaker' | 'attendee';

export interface Conference {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  timezone: string;
  status: ConferenceStatus;
  is_paid: boolean;
  ticket_price?: number;
  max_attendees?: number;
  organizer_id: string;
  created_at: string;
  updated_at: string;
}

export type ConferenceStatus = 'draft' | 'published' | 'live' | 'completed' | 'cancelled';

export interface Session {
  id: string;
  conference_id: string;
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  speaker_id?: string;
  max_attendees?: number;
  meeting_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Registration {
  id: string;
  conference_id: string;
  user_id: string;
  status: RegistrationStatus;
  payment_status?: PaymentStatus;
  payment_intent_id?: string;
  registered_at: string;
}

export type RegistrationStatus = 'pending' | 'confirmed' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface Speaker {
  id: string;
  user_id: string;
  bio: string;
  expertise: string[];
  social_links?: Record<string, string>;
  created_at: string;
  updated_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  created_at: string;
}

export type NotificationType = 'conference_update' | 'session_reminder' | 'payment_confirmation' | 'general';