import { Smile, Sparkles, Anchor, Syringe, Sun, Layers, Bandage, RefreshCw } from "lucide-react";
import { Service, Branch, Testimonial, TeamMember } from "./types";

// Static Images from Unsplash - High Availability IDs
export const IMAGES = {
  hero: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Modern Clinic
  interior: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Waiting Room
  tool: "https://images.unsplash.com/photo-1609840114035-1c29046a8af3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Blue Tools
  kids: "https://images.unsplash.com/photo-1616391182219-e080b4d1043a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Kid Smile
  whitening: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Bright Smile
  braces: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Dental Model
  xray: "https://images.unsplash.com/photo-1516669922262-520d2a831e5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Xray
  veneer: "https://images.unsplash.com/photo-1600170311833-c2cf5280ce49?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" // Veneer Close up
};

export const SERVICES: Service[] = [
  {
    id: 'scaling',
    title: 'SCALING GIGI',
    description: 'Pembersihan karang gigi menyeluruh untuk kesehatan gusi maksimal dan nafas segar.',
    icon: Sparkles,
    imageUrl: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" // Patient Checkup (Stable)
  },
  {
    id: 'restorasi',
    title: 'RESTORASI GIGI',
    description: 'Solusi estetika untuk memperbaiki noda hitam, struktur gigi rusak, atau bentuk tidak sempurna.',
    icon: RefreshCw,
    imageUrl: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" // Jaw Model (Stable)
  },
  {
    id: 'cabut',
    title: 'CABUT GIGI',
    description: 'Prosedur pencabutan gigi bungsu atau gigi bermasalah dengan teknik minim rasa sakit.',
    icon: Syringe,
    imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" // Surgery View (Stable)
  },
  {
    id: 'behel',
    title: 'BEHEL GIGI',
    description: 'Rapikan susunan gigi Anda dengan perawatan kawat gigi konvensional maupun estetik.',
    icon: Smile,
    imageUrl: "https://images.unsplash.com/photo-1571772996211-2f02c9727629?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" // Braces (Stable)
  },
  {
    id: 'whitening',
    title: 'WHITENING',
    description: 'Putihkan gigi secara instan dan aman dengan teknologi penyinaran terkini untuk senyum cerah.',
    icon: Sun,
    imageUrl: IMAGES.whitening
  },
  {
    id: 'implant',
    title: 'IMPLAN GIGI',
    description: 'Solusi permanen pengganti gigi hilang yang paling natural dan kuat.',
    icon: Anchor,
    imageUrl: "https://images.unsplash.com/photo-1445527697940-617d00387222?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" // Xray/Implant (Stable)
  },
  {
    id: 'tambal',
    title: 'TAMBAL GIGI',
    description: 'Perbaikan gigi berlubang menggunakan bahan komposit berkualitas tinggi agar kembali utuh.',
    icon: Bandage,
    imageUrl: "https://images.unsplash.com/photo-1629909615184-74f495363b67?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" // Chair View (Stable)
  },
  {
    id: 'veneer',
    title: 'VENEER',
    description: 'Lapisan tipis porselen untuk menyempurnakan bentuk, warna, dan tampilan senyum Anda.',
    icon: Layers,
    imageUrl: IMAGES.veneer
  }
];

export const BRANCHES: Branch[] = [
  {
    id: 'jaksel',
    name: 'MyDentismile Jakarta Selatan',
    address: 'Jl. Senopati No. 45, Kebayoran Baru',
    phone: '+62 812-3456-7890',
    mapUrl: '#',
    imageUrl: IMAGES.interior,
    hours: 'Senin - Sabtu: 09.00 - 20.00'
  },
  {
    id: 'bekasi',
    name: 'MyDentismile Bekasi',
    address: 'Grand Galaxy City, Ruko RGA No. 22',
    phone: '+62 812-9876-5432',
    mapUrl: '#',
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    hours: 'Setiap Hari: 10.00 - 21.00'
  },
  {
    id: 'tangerang',
    name: 'MyDentismile BSD',
    address: 'Ruko Sorrento Junction, Gading Serpong',
    phone: '+62 811-2233-4455',
    mapUrl: '#',
    imageUrl: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    hours: 'Senin - Minggu: 09.00 - 20.00'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah Wijaya',
    treatment: 'Whitening',
    content: 'Pelayanannya sangat ramah, dokternya informatif banget. Hasil bleachingnya juga natural. Sangat puas!',
    rating: 5
  },
  {
    id: 't2',
    name: 'Budi Santoso',
    treatment: 'Implan Gigi',
    content: 'Awalnya takut mau pasang implan, tapi dokter bikin tenang. Prosesnya cepat dan penyembuhannya bagus.',
    rating: 5
  },
  {
    id: 't3',
    name: 'Jessica Tan',
    treatment: 'Kawat Gigi',
    content: 'Kliniknya bersih banget, aesthetic, dan nyaman. Progress behel saya juga cepet banget kelihatannya.',
    rating: 5
  }
];

export const TEAM: TeamMember[] = [
  {
    id: 'doc1',
    name: 'drg. Amanda Putri',
    role: 'Spesialis Orthodonti',
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'doc2',
    name: 'drg. Reza Pratama',
    role: 'Spesialis Bedah Mulut',
    imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'doc3',
    name: 'drg. Sinta Dewi',
    role: 'Dokter Gigi Umum',
    imageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
];