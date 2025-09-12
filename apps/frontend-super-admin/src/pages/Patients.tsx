import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Patient, Hospital, Doctor } from "@/types/api";
import { Users, Search, Filter, Loader2, ChevronLeft, ChevronRight, X } from "lucide-react";
import { GetAllPatients, GetAllHospital, GetAllDoctor } from "@/api";

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHospital, setSelectedHospital] = useState("all");
  const [selectedDoctor, setSelectedDoctor] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [patients, setPatients] = useState<Patient[]>([]);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingHospitals, setLoadingHospitals] = useState(true);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [errorHospitals, setErrorHospitals] = useState<string | null>(null);
  const [errorDoctors, setErrorDoctors] = useState<string | null>(null);
  
  // Search terms for dropdowns
  const [hospitalSearchTerm, setHospitalSearchTerm] = useState("");
  const [doctorSearchTerm, setDoctorSearchTerm] = useState("");
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch patients data from API
  const fetchPatients = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let payload;
      
      if (selectedHospital === "not-linked") {
        // Scenario 3: Not linked patients
        payload = {
          hospitalId: 0,
          showAll: false
        };
      } else if (selectedHospital === "all") {
        // Scenario 1: All linked patients (any hospital)
        payload = {
          hospitalId: 0,
          showAll: true
        };
      } else {
        // Scenario 2: Linked patients by specific hospital
        payload = {
          hospitalId: parseInt(selectedHospital),
          showAll: true
        };
      }
      
      const response = await fetch(GetAllPatients, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch patients: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      setPatients(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch patients');
      console.error('Error fetching patients:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch hospitals data from API
  const fetchHospitals = async () => {
    try {
      setLoadingHospitals(true);
      setErrorHospitals(null);
      const response = await fetch(GetAllHospital);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch hospitals: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      setHospitals(data);
    } catch (err) {
      setErrorHospitals(err instanceof Error ? err.message : 'Failed to fetch hospitals');
      console.error('Error fetching hospitals:', err);
    } finally {
      setLoadingHospitals(false);
    }
  };

  // Fetch doctors data from API
  const fetchDoctors = async () => {
    try {
      setLoadingDoctors(true);
      setErrorDoctors(null);
      const response = await fetch(GetAllDoctor);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch doctors: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      setDoctors(data);
    } catch (err) {
      setErrorDoctors(err instanceof Error ? err.message : 'Failed to fetch doctors');
      console.error('Error fetching doctors:', err);
    } finally {
      setLoadingDoctors(false);
    }
  };

  useEffect(() => {
    fetchHospitals();
    fetchDoctors();
  }, []);

  // Fetch patients when filters change
  useEffect(() => {
    if (hospitals.length > 0 && doctors.length > 0) {
      fetchPatients();
    }
  }, [selectedHospital, selectedDoctor, hospitals.length, doctors.length]);

  const getHospitalName = (hospitalId: number) => {
    if (hospitalId === 0) {
      return "-";
    }
    const hospital = hospitals.find(h => h.id === hospitalId);
    return hospital?.name || "-";
  };

  const getDoctorName = (doctorId: number) => {
    const doctor = doctors.find(d => d.id === doctorId);
    return doctor?.fullName || "-";
  };

  // Filter functions for dropdowns
  const getFilteredHospitals = () => {
    if (!hospitalSearchTerm) return hospitals;
    return hospitals.filter(hospital => 
      hospital.name.toLowerCase().includes(hospitalSearchTerm.toLowerCase())
    );
  };

  const getFilteredDoctors = () => {
    if (!doctorSearchTerm) return doctors;
    return doctors.filter(doctor => 
      doctor.fullName.toLowerCase().includes(doctorSearchTerm.toLowerCase())
    );
  };

  const filteredPatients = patients
    .filter(patient => {
      const matchesSearch = 
        (patient.fullName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (patient.currentCondition?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (patient.assignedDoctor?.toLowerCase() || '').includes(searchTerm.toLowerCase());
      
      const matchesStatus = selectedStatus === "all" || patient.status === selectedStatus;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      // Sort by creation date (latest first)
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA;
    });

  // Pagination logic
  const totalFilteredPatients = filteredPatients.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedPatients = filteredPatients.slice(startIndex, endIndex);

  // Update total pages when filtered patients change
  useEffect(() => {
    const newTotalPages = Math.ceil(totalFilteredPatients / itemsPerPage);
    setTotalPages(newTotalPages);
    // Reset to first page if current page is greater than total pages
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(1);
    }
  }, [totalFilteredPatients, itemsPerPage, currentPage]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedStatus]);

  // Pagination handlers
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  const handleHospitalChange = (value: string) => {
    setSelectedHospital(value);
    setHospitalSearchTerm("");
  };

  const handleDoctorChange = (value: string) => {
    setSelectedDoctor(value);
    setDoctorSearchTerm("");
  };

  const getStatusBadge = (status: Patient['status']) => {
    switch (status) {
      case 'Admitted':
        return <Badge className="bg-primary text-primary-foreground text-xs">Admitted</Badge>;
      case 'Critical':
        return <Badge className="bg-destructive text-destructive-foreground text-xs">Critical</Badge>;
      case 'Discharged':
        return <Badge className="bg-success text-success-foreground text-xs">Discharged</Badge>;
      case 'Stable':
        return <Badge className="bg-accent text-accent-foreground text-xs">Stable</Badge>;
      default:
        return <Badge variant="secondary" className="text-xs">{status}</Badge>;
    }
  };

  const getGenderIcon = (gender: string | null) => {
    if (!gender) return '🧑';
    return gender === 'Male' ? '👨' : gender === 'Female' ? '👩' : '🧑';
  };

  // Loading state
  if (loading || loadingHospitals || loadingDoctors) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground flex items-center space-x-2">
            <Users className="h-6 w-6 md:h-8 md:w-8 text-accent" />
            <span>Patients Management</span>
          </h1>
          <p className="text-muted-foreground">View and manage all patients across hospitals</p>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <span className="text-muted-foreground">Loading patients...</span>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || errorHospitals || errorDoctors) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground flex items-center space-x-2">
            <Users className="h-6 w-6 md:h-8 md:w-8 text-accent" />
            <span>Patients Management</span>
          </h1>
          <p className="text-muted-foreground">View and manage all patients across hospitals</p>
        </div>
        <Card className="shadow-card border-0">
          <CardContent className="p-12 text-center">
            <div className="text-destructive mb-4">
              <Users className="h-12 w-12 mx-auto mb-2" />
              <h3 className="text-lg font-semibold">Error Loading Data</h3>
              <p className="text-muted-foreground mt-2">
                {error && `Patients: ${error}`}
                {error && (errorHospitals || errorDoctors) && <br />}
                {errorHospitals && `Hospitals: ${errorHospitals}`}
                {errorHospitals && errorDoctors && <br />}
                {errorDoctors && `Doctors: ${errorDoctors}`}
              </p>
            </div>
            <button 
              onClick={() => {
                fetchPatients();
                fetchHospitals();
                fetchDoctors();
              }}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Try Again
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground flex items-center space-x-2">
          <Users className="h-6 w-6 md:h-8 md:w-8 text-accent" />
          <span>Patients Management</span>
        </h1>
        <p className="text-muted-foreground">View and manage all patients across hospitals</p>
      </div>

      {/* Filters */}
      <Card className="shadow-card border-0">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-9"
              />
            </div>
            
            {/* Hospital Filter */}
            <Select value={selectedHospital} onValueChange={handleHospitalChange}>
              <SelectTrigger className="h-9">
                <SelectValue placeholder="Filter by hospital" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                <div className="p-2 border-b">
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                    <Input
                      placeholder="Search hospitals..."
                      value={hospitalSearchTerm}
                      onChange={(e) => setHospitalSearchTerm(e.target.value)}
                      className="pl-7 pr-7 h-7 text-xs"
                      onClick={(e) => e.stopPropagation()}
                    />
                    {hospitalSearchTerm && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setHospitalSearchTerm("");
                        }}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                </div>
                <div className="max-h-48 overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#d1d5db #f3f4f6' }}>
                  <SelectItem value="all" className="text-xs">All Linked Patients</SelectItem>
                  <SelectItem value="not-linked" className="text-xs text-orange-500">Not Linked to Any Hospital</SelectItem>
                  {getFilteredHospitals().map((hospital) => (
                    <SelectItem key={hospital.id} value={hospital.id.toString()} className="text-xs">
                      {hospital.name}
                    </SelectItem>
                  ))}
                  {getFilteredHospitals().length === 0 && hospitalSearchTerm && (
                    <div className="px-2 py-1 text-xs text-muted-foreground text-center">
                      No hospitals found
                    </div>
                  )}
                </div>
              </SelectContent>
            </Select>
            
            {/* Doctor Filter */}
            <Select value={selectedDoctor} onValueChange={handleDoctorChange}>
              <SelectTrigger className="h-9">
                <SelectValue placeholder="Filter by doctor" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                <div className="p-2 border-b">
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                    <Input
                      placeholder="Search doctors..."
                      value={doctorSearchTerm}
                      onChange={(e) => setDoctorSearchTerm(e.target.value)}
                      className="pl-7 pr-7 h-7 text-xs"
                      onClick={(e) => e.stopPropagation()}
                    />
                    {doctorSearchTerm && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDoctorSearchTerm("");
                        }}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                </div>
                <div className="max-h-48 overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#d1d5db #f3f4f6' }}>
                  <SelectItem value="all" className="text-xs">All Doctors</SelectItem>
                  {getFilteredDoctors().map((doctor) => (
                    <SelectItem key={doctor.id} value={doctor.id.toString()} className="text-xs">
                      {doctor.fullName}
                    </SelectItem>
                  ))}
                  {getFilteredDoctors().length === 0 && doctorSearchTerm && (
                    <div className="px-2 py-1 text-xs text-muted-foreground text-center">
                      No doctors found
                    </div>
                  )}
                </div>
              </SelectContent>
            </Select>
            
            {/* Status Filter */}
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="h-9">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Admitted">Admitted</SelectItem>
                <SelectItem value="Discharged">Discharged</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
                <SelectItem value="Stable">Stable</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <div className="grid gap-3 md:grid-cols-4">
        <Card className="shadow-card border-0">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-6 bg-primary rounded"></div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {selectedHospital === "not-linked" ? "Not Linked" : "Total Patients"}
                </p>
                <p className="text-xl font-bold text-foreground">{patients.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card border-0">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-6 bg-success rounded"></div>
              <div>
                <p className="text-xs text-muted-foreground">Admitted</p>
                <p className="text-xl font-bold text-foreground">
                  {patients.filter(p => p.status === 'Admitted').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card border-0">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-6 bg-destructive rounded"></div>
              <div>
                <p className="text-xs text-muted-foreground">Critical</p>
                <p className="text-xl font-bold text-foreground">
                  {patients.filter(p => p.status === 'Critical').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card border-0">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-6 bg-warning rounded"></div>
              <div>
                <p className="text-xs text-muted-foreground">Filtered Results</p>
                <p className="text-xl font-bold text-foreground">{totalFilteredPatients}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Patients Table */}
      <Card className="shadow-card border-0">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <CardTitle className="text-lg">
              {selectedHospital === "not-linked" 
                ? `Not Linked Patients (${totalFilteredPatients})`
                : selectedHospital === "all"
                ? `All Linked Patients (${totalFilteredPatients})`
                : `Hospital Patients (${totalFilteredPatients})`
              }
            </CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Show:</span>
              <Select value={itemsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
                <SelectTrigger className="w-20 h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto -mx-4 md:mx-0">
            <div className="min-w-full px-4 md:px-0">
              <Table>
              <TableHeader>
                <TableRow className="h-10">
                  <TableHead className="py-2">Patient</TableHead>
                  <TableHead className="py-2">Hospital</TableHead>
                  <TableHead className="py-2">Doctor</TableHead>
                  <TableHead className="py-2">Condition</TableHead>
                  <TableHead className="py-2">Status</TableHead>
                  <TableHead className="py-2">Admission Date</TableHead>
                  <TableHead className="py-2">Contact</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedPatients.map((patient) => (
                  <TableRow key={patient.id} className="h-12">
                    <TableCell className="py-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white font-medium text-sm">
                          {getGenderIcon(patient.gender)}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{patient.fullName || '-'}</p>
                          <p className="text-xs text-muted-foreground">
                            {patient.gender || '-'} • {patient.dateOfBirth ? new Date(patient.dateOfBirth).toLocaleDateString() : '-'}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-2">
                      <p className="font-medium text-sm">{getHospitalName(patient.hospitalId)}</p>
                    </TableCell>
                    <TableCell className="py-2">
                      <p className="font-medium text-sm">{getDoctorName(patient.doctorId)}</p>
                    </TableCell>
                    <TableCell className="py-2">
                      <p className="text-xs">{patient.currentCondition || '-'}</p>
                    </TableCell>
                    <TableCell className="py-2">
                      {getStatusBadge(patient.status)}
                    </TableCell>
                    <TableCell className="py-2">
                      <p className="text-xs">
                        {patient.admissionDate ? new Date(patient.admissionDate).toLocaleDateString() : '-'}
                      </p>
                    </TableCell>
                    <TableCell className="py-2">
                      <div>
                        <p className="text-xs">{patient.phoneNumber || '-'}</p>
                        <p className="text-xs text-muted-foreground">{patient.email || '-'}</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              </Table>
            </div>
          </div>
          
          {paginatedPatients.length === 0 && (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">
                {selectedHospital === "not-linked" 
                  ? "No unlinked patients found"
                  : selectedHospital === "all"
                  ? "No linked patients found"
                  : "No patients found for this hospital"
                }
              </p>
            </div>
          )}
        </CardContent>
        
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to {Math.min(endIndex, totalFilteredPatients)} of {totalFilteredPatients} results
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="h-8 w-8 p-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(pageNum)}
                      className="h-8 w-8 p-0"
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="h-8 w-8 p-0"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Patients;