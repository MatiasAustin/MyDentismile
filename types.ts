import { LucideIcon } from "lucide-react";

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  imageUrl: string;
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  mapUrl: string;
  imageUrl: string;
  hours: string;
}

export interface Testimonial {
  id: string;
  name: string;
  treatment: string;
  content: string;
  rating: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
}

export type PageView = 'home' | 'services' | 'about' | 'locations' | 'contact';