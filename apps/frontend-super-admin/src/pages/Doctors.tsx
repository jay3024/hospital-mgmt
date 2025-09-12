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
import { Doctor, Hospital } from "@/types/api";
import { UserCheck, Search, Filter, Stethoscope, Loader2, ChevronLeft, ChevronRight, X } from "lucide-react";
import { GetAllDoctor, GetAllHospital } from "@/api";

const Doctors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHospital, setSelectedHospital] = useState("all");
  const [selectedSpecialization, setSelectedSpecialization] = useState("all");
  const [hospitalSearchTerm, setHospitalSearchTerm] = useState("");
  const [specializationSearchTerm, setSpecializationSearchTerm] = useState("");
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingHospitals, setLoadingHospitals] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [errorHospitals, setErrorHospitals] = useState<string | null>(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch doctors data from API
  const fetchDoctors = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(GetAllDoctor);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch doctors: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      setDoctors(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch doctors');
      console.error('Error fetching doctors:', err);
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

  useEffect(() => {
    fetchDoctors();
    fetchHospitals();
  }, []);

  const getHospitalName = (hospitalId: number) => {
    const hospital = hospitals.find(h => h.id === hospitalId);
    return hospital?.name || "-";
  };

  const getAllSpecializations = () => {
    const specializations = [...new Set(doctors.map(d => d.specialization).filter(Boolean))];
    return specializations.sort();
  };

  const getFilteredHospitals = () => {
    if (!hospitalSearchTerm) return hospitals;
    return hospitals.filter(hospital => 
      hospital.name.toLowerCase().includes(hospitalSearchTerm.toLowerCase())
    );
  };

  const getFilteredSpecializations = () => {
    const specializations = getAllSpecializations();
    if (!specializationSearchTerm) return specializations;
    return specializations.filter(specialization => 
      specialization.toLowerCase().includes(specializationSearchTerm.toLowerCase())
    );
  };

  const filteredDoctors = doctors
    .filter(doctor => {
      const matchesSearch = 
        (doctor.fullName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (doctor.specialization?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (doctor.qualifications?.toLowerCase() || '').includes(searchTerm.toLowerCase());
      
      const matchesHospital = selectedHospital === "all" || doctor.hospitalId.toString() === selectedHospital;
      const matchesSpecialization = selectedSpecialization === "all" || doctor.specialization === selectedSpecialization;
      
      return matchesSearch && matchesHospital && matchesSpecialization;
    })
    .sort((a, b) => {
      // Sort by creation date (latest first)
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA;
    });

  // Pagination logic
  const totalFilteredDoctors = filteredDoctors.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedDoctors = filteredDoctors.slice(startIndex, endIndex);

  // Update total pages when filtered doctors change
  useEffect(() => {
    const newTotalPages = Math.ceil(totalFilteredDoctors / itemsPerPage);
    setTotalPages(newTotalPages);
    // Reset to first page if current page is greater than total pages
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(1);
    }
  }, [totalFilteredDoctors, itemsPerPage, currentPage]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedHospital, selectedSpecialization]);

  // Clear search terms when selections change
  useEffect(() => {
    if (selectedHospital !== "all") {
      setHospitalSearchTerm("");
    }
  }, [selectedHospital]);

  useEffect(() => {
    if (selectedSpecialization !== "all") {
      setSpecializationSearchTerm("");
    }
  }, [selectedSpecialization]);

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
    setHospitalSearchTerm(""); // Clear search when selection changes
  };

  const handleSpecializationChange = (value: string) => {
    setSelectedSpecialization(value);
    setSpecializationSearchTerm(""); // Clear search when selection changes
  };

  const getExperienceColor = (years: number) => {
    if (years >= 15) return "text-success";
    if (years >= 10) return "text-primary";
    if (years >= 5) return "text-accent";
    return "text-muted-foreground";
  };

  // Loading state
  if (loading || loadingHospitals) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground flex items-center space-x-2">
            <UserCheck className="h-6 w-6 md:h-8 md:w-8 text-success" />
            <span>Doctors Management</span>
          </h1>
          <p className="text-muted-foreground">View and manage all doctors across hospitals</p>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <span className="text-muted-foreground">Loading doctors...</span>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || errorHospitals) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground flex items-center space-x-2">
            <UserCheck className="h-6 w-6 md:h-8 md:w-8 text-success" />
            <span>Doctors Management</span>
          </h1>
          <p className="text-muted-foreground">View and manage all doctors across hospitals</p>
        </div>
        <Card className="shadow-card border-0">
          <CardContent className="p-12 text-center">
            <div className="text-destructive mb-4">
              <UserCheck className="h-12 w-12 mx-auto mb-2" />
              <h3 className="text-lg font-semibold">Error Loading Data</h3>
              <p className="text-muted-foreground mt-2">
                {error && `Doctors: ${error}`}
                {error && errorHospitals && <br />}
                {errorHospitals && `Hospitals: ${errorHospitals}`}
              </p>
            </div>
            <button 
              onClick={() => {
                fetchDoctors();
                fetchHospitals();
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
          <UserCheck className="h-6 w-6 md:h-8 md:w-8 text-success" />
          <span>Doctors Management</span>
        </h1>
        <p className="text-muted-foreground">View and manage all doctors across hospitals</p>
      </div>

      {/* Filters */}
      <Card className="shadow-card border-0">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search doctors..."
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
                   <SelectItem value="all" className="text-xs">All Hospitals</SelectItem>
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
            
             {/* Specialization Filter */}
             <Select value={selectedSpecialization} onValueChange={handleSpecializationChange}>
               <SelectTrigger className="h-9">
                 <SelectValue placeholder="Filter by specialization" />
               </SelectTrigger>
               <SelectContent className="max-h-60">
                 <div className="p-2 border-b">
                   <div className="relative">
                     <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                     <Input
                       placeholder="Search specializations..."
                       value={specializationSearchTerm}
                       onChange={(e) => setSpecializationSearchTerm(e.target.value)}
                       className="pl-7 pr-7 h-7 text-xs"
                       onClick={(e) => e.stopPropagation()}
                     />
                     {specializationSearchTerm && (
                       <button
                         onClick={(e) => {
                           e.stopPropagation();
                           setSpecializationSearchTerm("");
                         }}
                         className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground hover:text-foreground"
                       >
                         <X className="h-3 w-3" />
                       </button>
                     )}
                   </div>
                 </div>
                 <div className="max-h-48 overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#d1d5db #f3f4f6' }}>
                   <SelectItem value="all" className="text-xs">All Specializations</SelectItem>
                   {getFilteredSpecializations().map((specialization) => (
                     <SelectItem key={specialization} value={specialization} className="text-xs">
                       {specialization}
                     </SelectItem>
                   ))}
                   {getFilteredSpecializations().length === 0 && specializationSearchTerm && (
                     <div className="px-2 py-1 text-xs text-muted-foreground text-center">
                       No specializations found
                     </div>
                   )}
                 </div>
               </SelectContent>
             </Select>
          </div>
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <div className="grid gap-3 md:grid-cols-3">
        <Card className="shadow-card border-0">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-6 bg-success rounded"></div>
              <div>
                <p className="text-xs text-muted-foreground">Total Doctors</p>
                <p className="text-xl font-bold text-foreground">{doctors.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card border-0">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-6 bg-accent rounded"></div>
              <div>
                <p className="text-xs text-muted-foreground">Specializations</p>
                <p className="text-xl font-bold text-foreground">{getAllSpecializations().length}</p>
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
                <p className="text-xl font-bold text-foreground">{totalFilteredDoctors}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Doctors Table */}
      <Card className="shadow-card border-0">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <CardTitle className="text-lg">All Doctors ({totalFilteredDoctors})</CardTitle>
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
                  <TableHead className="py-2">Doctor</TableHead>
                  <TableHead className="py-2">Hospital</TableHead>
                  <TableHead className="py-2">Specialization</TableHead>
                  <TableHead className="py-2">Experience</TableHead>
                  <TableHead className="py-2">Qualification</TableHead>
                  <TableHead className="py-2">Contact</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedDoctors.map((doctor) => (
                  <TableRow key={doctor.id} className="h-12">
                    <TableCell className="py-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white font-medium text-sm">
                          {(doctor.fullName || '-').split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{doctor.fullName || '-'}</p>
                          <p className="text-xs text-muted-foreground flex items-center space-x-1">
                            <Stethoscope className="w-3 h-3" />
                            <span>Medical Professional</span>
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-2">
                      <p className="font-medium text-sm">{getHospitalName(doctor.hospitalId)}</p>
                    </TableCell>
                    <TableCell className="py-2">
                      <Badge variant="outline" className="font-medium text-xs">
                        {doctor.specialization || '-'}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-2">
                      <p className={`font-medium text-sm ${getExperienceColor(doctor.yearsOfExperience || 0)}`}>
                        {doctor.yearsOfExperience || 0} years
                      </p>
                    </TableCell>
                    <TableCell className="py-2">
                      <p className="text-xs">{doctor.qualifications || '-'}</p>
                    </TableCell>
                    <TableCell className="py-2">
                      <div>
                        <p className="text-xs">{doctor.phoneNumber || '-'}</p>
                        <p className="text-xs text-muted-foreground">{doctor.email || '-'}</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              </Table>
            </div>
          </div>
          
          {paginatedDoctors.length === 0 && (
            <div className="text-center py-8">
              <UserCheck className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">No doctors found matching your criteria</p>
            </div>
          )}
        </CardContent>
        
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to {Math.min(endIndex, totalFilteredDoctors)} of {totalFilteredDoctors} results
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

export default Doctors;