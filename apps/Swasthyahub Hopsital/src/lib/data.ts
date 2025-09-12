// Sample data for Swasthyahub Pro

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  department: string;
  email: string;
  phone: string;
  experience: number;
  status: 'active' | 'inactive';
  avatar?: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  email: string;
  phone: string;
  address: string;
  bloodType: string;
  emergencyContact: string;
  emergencyPhone: string;
  status: 'active' | 'discharged' | 'critical';
  admissionDate: string;
  avatar?: string;
}

export interface Department {
  id: string;
  name: string;
  head: string;
  totalDoctors: number;
  totalPatients: number;
  description: string;
  status: 'active' | 'inactive';
}

export interface CaseFile {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  diagnosis: string;
  symptoms: string;
  treatment: string;
  date: string;
  status: 'ongoing' | 'resolved' | 'followup';
}

export interface Report {
  id: string;
  title: string;
  type: 'doctor' | 'patient' | 'department';
  date: string;
  summary: string;
  details: string;
}

// Sample doctors data
export const sampleDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiology',
    department: 'Cardiology',
    email: 'sarah.johnson@swasthyahub.com',
    phone: '+1 555-0123',
    experience: 12,
    status: 'active',
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialization: 'Neurology',
    department: 'Neurology',
    email: 'michael.chen@swasthyahub.com',
    phone: '+1 555-0124',
    experience: 8,
    status: 'active',
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialization: 'Pediatrics',
    department: 'Pediatrics',
    email: 'emily.rodriguez@swasthyahub.com',
    phone: '+1 555-0125',
    experience: 15,
    status: 'active',
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    specialization: 'Orthopedics',
    department: 'Orthopedics',
    email: 'james.wilson@swasthyahub.com',
    phone: '+1 555-0126',
    experience: 10,
    status: 'active',
  },
];

// Sample patients data
export const samplePatients: Patient[] = [
  {
    id: '1',
    name: 'John Smith',
    age: 45,
    gender: 'male',
    email: 'john.smith@email.com',
    phone: '+1 555-1001',
    address: '123 Main St, City, State 12345',
    bloodType: 'A+',
    emergencyContact: 'Jane Smith',
    emergencyPhone: '+1 555-1002',
    status: 'active',
    admissionDate: '2024-01-15',
  },
  {
    id: '2',
    name: 'Maria Garcia',
    age: 32,
    gender: 'female',
    email: 'maria.garcia@email.com',
    phone: '+1 555-1003',
    address: '456 Oak Ave, City, State 12345',
    bloodType: 'B+',
    emergencyContact: 'Carlos Garcia',
    emergencyPhone: '+1 555-1004',
    status: 'active',
    admissionDate: '2024-01-18',
  },
  {
    id: '3',
    name: 'Robert Johnson',
    age: 67,
    gender: 'male',
    email: 'robert.johnson@email.com',
    phone: '+1 555-1005',
    address: '789 Pine Rd, City, State 12345',
    bloodType: 'O-',
    emergencyContact: 'Linda Johnson',
    emergencyPhone: '+1 555-1006',
    status: 'critical',
    admissionDate: '2024-01-20',
  },
];

// Sample departments data
export const sampleDepartments: Department[] = [
  {
    id: '1',
    name: 'Cardiology',
    head: 'Dr. Sarah Johnson',
    totalDoctors: 8,
    totalPatients: 24,
    description: 'Specialized care for heart and cardiovascular conditions',
    status: 'active',
  },
  {
    id: '2',
    name: 'Neurology',
    head: 'Dr. Michael Chen',
    totalDoctors: 6,
    totalPatients: 18,
    description: 'Treatment of neurological disorders and brain conditions',
    status: 'active',
  },
  {
    id: '3',
    name: 'Pediatrics',
    head: 'Dr. Emily Rodriguez',
    totalDoctors: 12,
    totalPatients: 45,
    description: 'Comprehensive healthcare for infants, children, and adolescents',
    status: 'active',
  },
  {
    id: '4',
    name: 'Orthopedics',
    head: 'Dr. James Wilson',
    totalDoctors: 10,
    totalPatients: 32,
    description: 'Treatment of musculoskeletal system disorders',
    status: 'active',
  },
  {
    id: '5',
    name: 'Emergency Medicine',
    head: 'Dr. Lisa Anderson',
    totalDoctors: 15,
    totalPatients: 67,
    description: '24/7 emergency medical care and trauma treatment',
    status: 'active',
  },
];

// Sample case files data
export const sampleCaseFiles: CaseFile[] = [
  {
    id: '1',
    patientId: '1',
    patientName: 'John Smith',
    doctorId: '1',
    doctorName: 'Dr. Sarah Johnson',
    diagnosis: 'Hypertension',
    symptoms: 'High blood pressure, headaches, dizziness',
    treatment: 'ACE inhibitors, lifestyle modifications',
    date: '2024-01-15',
    status: 'ongoing',
  },
  {
    id: '2',
    patientId: '2',
    patientName: 'Maria Garcia',
    doctorId: '3',
    doctorName: 'Dr. Emily Rodriguez',
    diagnosis: 'Migraine',
    symptoms: 'Severe headache, nausea, light sensitivity',
    treatment: 'Pain medication, rest, trigger avoidance',
    date: '2024-01-18',
    status: 'followup',
  },
  {
    id: '3',
    patientId: '3',
    patientName: 'Robert Johnson',
    doctorId: '2',
    doctorName: 'Dr. Michael Chen',
    diagnosis: 'Stroke Recovery',
    symptoms: 'Motor function impairment, speech difficulty',
    treatment: 'Physical therapy, speech therapy, medication',
    date: '2024-01-20',
    status: 'ongoing',
  },
];