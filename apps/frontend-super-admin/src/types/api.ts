// API response types

export interface Doctor {
  id: number;
  hospitalId: number;
  fullName: string;
  email: string;
  username: string | null;
  phoneNumber: string | null;
  gender: string | null;
  dateOfBirth: string;
  aadhaarNumber: string | null;
  registrationNumber: string | null;
  specialization: string | null;
  qualifications: string | null;
  yearsOfExperience: number;
  clinicAddress: string | null;
  addressLine1: string | null;
  addressLine2: string | null;
  city: string | null;
  state: string | null;
  pincode: string | null;
  emergencyContactName: string | null;
  emergencyContactNumber: string | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface Hospital {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  type: 'Government' | 'Private' | 'Trust';
  established: string;
  totalBeds: number;
  availableBeds: number;
  status: 'Active' | 'Inactive';
  licenseNumber?: string;
  contactNumber?: string;
}

export interface Patient {
  id: number;
  hospitalId: number;
  doctorId: number;
  fullName: string;
  email: string;
  phoneNumber: string | null;
  gender: string | null;
  dateOfBirth: string;
  aadhaarNumber: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  pincode: string | null;
  emergencyContactName: string | null;
  emergencyContactNumber: string | null;
  medicalHistory: string | null;
  currentCondition: string | null;
  admissionDate: string | null;
  dischargeDate: string | null;
  status: 'Admitted' | 'Discharged' | 'Critical' | 'Stable';
  assignedDoctor: string | null;
  createdAt: string;
  updatedAt: string | null;
}
