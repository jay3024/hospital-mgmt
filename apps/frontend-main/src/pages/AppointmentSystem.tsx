
import React, { useState } from 'react';
import HealthCard from '../components/ui/HealthCard';
import HealthButton from '../components/ui/HealthButton';
import HealthInput from '../components/ui/HealthInput';
import HealthTable from '../components/ui/HealthTable';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Video, 
  Plus, 
  Search,
  Filter,
  MapPin,
  Stethoscope,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Star,
  TrendingUp
} from 'lucide-react';

const AppointmentSystem = () => {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [appointments] = useState([
    {
      id: 1,
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      date: '2024-01-15',
      time: '10:00 AM',
      type: 'Video Call',
      status: 'Confirmed',
      rating: 4.8,
      experience: '15 years'
    },
    {
      id: 2,
      doctor: 'Dr. Michael Chen',
      specialty: 'Dermatologist',
      date: '2024-01-18',
      time: '2:30 PM',
      type: 'In-Person',
      status: 'Pending',
      rating: 4.9,
      experience: '12 years'
    },
    {
      id: 3,
      doctor: 'Dr. Emily Rodriguez',
      specialty: 'Neurologist',
      date: '2024-01-20',
      time: '11:00 AM',
      type: 'Video Call',
      status: 'Confirmed',
      rating: 4.7,
      experience: '18 years'
    }
  ]);

  const [doctors] = useState([
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      rating: 4.8,
      experience: '15 years',
      availableSlots: 8,
      image: 'SJ'
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Dermatologist',
      rating: 4.9,
      experience: '12 years',
      availableSlots: 5,
      image: 'MC'
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      specialty: 'Neurologist',
      rating: 4.7,
      experience: '18 years',
      availableSlots: 12,
      image: 'ER'
    }
  ]);

  const specialties = [
    'Cardiology', 'Dermatology', 'Neurology', 'Orthopedics', 
    'Pediatrics', 'Psychiatry', 'Oncology', 'Endocrinology'
  ];

  const columns = [
    { key: 'doctor', label: 'Doctor' },
    { key: 'specialty', label: 'Specialty' },
    { key: 'date', label: 'Date' },
    { key: 'time', label: 'Time' },
    { key: 'type', label: 'Type' },
    { key: 'status', label: 'Status' }
  ];

  const stats = [
    { label: 'Upcoming', value: '3', color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Completed', value: '12', color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Cancelled', value: '1', color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Total', value: '16', color: 'text-gray-600', bg: 'bg-gray-50' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Appointment System
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Schedule and manage your healthcare appointments
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <HealthButton
                onClick={() => setShowBookingForm(!showBookingForm)}
                icon={<Plus size={20} />}
                className="group relative overflow-hidden"
              >
                <span className="relative z-10">Book Appointment</span>
                <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </HealthButton>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <HealthCard key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className={`w-12 h-12 ${stat.bg} rounded-full flex items-center justify-center mx-auto mb-3`}>
                <Calendar className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
            </HealthCard>
          ))}
        </div>

        {/* Booking Form */}
        {showBookingForm && (
          <HealthCard className="mb-8 shadow-xl border-0">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Book New Appointment</h2>
              <button
                onClick={() => setShowBookingForm(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Form */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <HealthInput
                    label="Doctor"
                    placeholder="Select doctor"
                    icon={<User size={20} />}
                    className="transition-all duration-300 focus-within:scale-[1.02]"
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Specialty
                    </label>
                    <select 
                      value={selectedSpecialty}
                      onChange={(e) => setSelectedSpecialty(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Select specialty</option>
                      {specialties.map((specialty) => (
                        <option key={specialty} value={specialty}>{specialty}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <HealthInput
                    label="Date"
                    type="date"
                    icon={<Calendar size={20} />}
                    className="transition-all duration-300 focus-within:scale-[1.02]"
                  />
                  <HealthInput
                    label="Time"
                    type="time"
                    icon={<Clock size={20} />}
                    className="transition-all duration-300 focus-within:scale-[1.02]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Appointment Type
                    </label>
                    <select className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300">
                      <option value="video">Video Call</option>
                      <option value="phone">Phone Call</option>
                      <option value="in-person">In-Person</option>
                    </select>
                  </div>
                  <HealthInput
                    label="Phone Number"
                    placeholder="Your phone number"
                    icon={<Phone size={20} />}
                    className="transition-all duration-300 focus-within:scale-[1.02]"
                  />
                </div>

                <div className="flex gap-4">
                  <HealthButton className="flex-1 group relative overflow-hidden">
                    <span className="relative z-10">Book Appointment</span>
                    <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  </HealthButton>
                  <HealthButton 
                    variant="outline" 
                    onClick={() => setShowBookingForm(false)}
                    className="flex-1"
                  >
                    Cancel
                  </HealthButton>
                </div>
              </div>

              {/* Available Doctors */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Available Doctors</h3>
                <div className="space-y-3">
                  {doctors.map((doctor) => (
                    <div key={doctor.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-all duration-300 cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-semibold">
                          {doctor.image}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white">{doctor.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{doctor.specialty}</p>
                          <div className="flex items-center space-x-4 mt-1">
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">{doctor.rating}</span>
                            </div>
                            <span className="text-sm text-gray-500">{doctor.experience}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-green-600">{doctor.availableSlots} slots</div>
                          <div className="text-xs text-gray-500">available</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </HealthCard>
        )}

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search appointments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
            />
          </div>
          <HealthButton variant="outline" icon={<Filter size={20} />}>
            Filter
          </HealthButton>
        </div>

        {/* Appointments Table */}
        <HealthCard className="shadow-lg border-0">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Your Appointments</h2>
            <div className="flex gap-2">
              <HealthButton variant="outline" size="sm" icon={<Calendar size={16} />}>
                Calendar View
              </HealthButton>
              <HealthButton variant="outline" size="sm" icon={<Video size={16} />}>
                Join Call
              </HealthButton>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <HealthTable
              data={appointments}
              columns={columns}
              searchable={true}
              pagination={true}
            />
          </div>
        </HealthCard>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <HealthCard className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Schedule Follow-up</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Book your next appointment</p>
          </HealthCard>

          <HealthCard className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Video className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Virtual Visit</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Start video consultation</p>
          </HealthCard>

          <HealthCard className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <MapPin className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Find Location</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Get directions to clinic</p>
          </HealthCard>

          <HealthCard className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Health History</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">View past appointments</p>
          </HealthCard>
        </div>
      </div>
    </div>
  );
};

export default AppointmentSystem;
