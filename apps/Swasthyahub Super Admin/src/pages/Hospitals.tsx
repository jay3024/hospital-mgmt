import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Hospital } from "@/types/api";
import {
  Plus,
  Edit,
  Trash2,
  Hospital as HospitalIcon,
  Search,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AddHospital, GetAllHospital, UpdateHospital, DeleteHospital } from "@/api";
import axios from "axios";

interface HospitalFormData {
  name: string;
  phone: string;
  email: string;
  licenseNumber: string;
  city: string;
  state: string;
  pinCode: string;
  contactNumber: string;
  addressLine1: string;
  addressLine2: string;
  status: string;
}

const Hospitals = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingHospital, setEditingHospital] = useState<Hospital | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    hospital: Hospital | null;
    isLoading: boolean;
  }>({
    isOpen: false,
    hospital: null,
    isLoading: false,
  });
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [totalHospitals, setTotalHospitals] = useState(0);
  
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<HospitalFormData>({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      licenseNumber: "",
      city: "",
      state: "",
      pinCode: "",
      contactNumber: "",
      addressLine1: "",
      addressLine2: "",
      status: "Active",
    },
  });

  // Fetch hospitals from API
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        setIsLoading(true);
        await refreshHospitalsList();
      } catch (error) {
        console.error('Error fetching hospitals:', error);
        toast({
          title: "Error",
          description: "Failed to fetch hospitals. Please try again.",
          variant: "destructive",
          duration: 3000,
        });
        // Set empty array on error
        setHospitals([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  const resetForm = () => {
    reset();
    setEditingHospital(null);
  };

  // Helper function to refresh hospitals list from API
  const refreshHospitalsList = async () => {
    try {
      const response = await axios.get(GetAllHospital);
      if (response.data && Array.isArray(response.data)) {
        const transformedHospitals = response.data.map((hospital: any) => ({
          id: hospital.id || hospital.hospitalId || Date.now(),
          name: hospital.name || hospital.hospitalName || '-',
          address: hospital.address || `${hospital.addressLine1 || ''}, ${hospital.addressLine2 || ''}, ${hospital.city || ''}, ${hospital.state || ''} - ${hospital.pinCode || ''}`,
          phone: hospital.phone || '',
          email: hospital.email || '',
          type: hospital.type || 'Private',
          established: hospital.established || '2024',
          totalBeds: hospital.totalBeds || 100,
          availableBeds: hospital.availableBeds || 50,
          status: hospital.status || 'Active',
          licenseNumber: hospital.licenseNumber || '',
          contactNumber: hospital.contactNumber || hospital.phone || '',
        }));
        setHospitals(transformedHospitals);
      }
    } catch (error) {
      console.error('Error refreshing hospitals list:', error);
    }
  };

  const onSubmit = async (data: HospitalFormData) => {
    try {
      if (editingHospital) {
        // Update existing hospital - match HospitalUpdateDto structure
        const updateData = {
          Id: editingHospital.id, // ID is already a number
          Name: data.name,
          Phone: data.phone,
          Email: data.email,
          LicenseNumber: data.licenseNumber,
          City: data.city,
          State: data.state,
          PinCode: data.pinCode,
          ContactNumber: data.contactNumber,
          AddressLine1: data.addressLine1,
          AddressLine2: data.addressLine2,
          Status: data.status,
        };
        
        const response = await axios.put(UpdateHospital, updateData);
        if (response.status === 200) {
          // Refresh the hospitals list from API
          await refreshHospitalsList();
          
          toast({
            title: "Hospital Updated",
            description: `${data.name} has been updated successfully.`,
            duration: 3000,
          });
        }
      } else {
        // Create new hospital - use original create DTO structure
        const response = await axios.post(AddHospital, data);
        if (response.status === 200) {
          // Refresh the hospitals list from API
          await refreshHospitalsList();
          
          toast({
            title: "Hospital Created",
            description: `${data.name} has been created successfully.`,
            duration: 3000,
          });
        }
      }
    } catch (error) {
      console.error('Error saving hospital:', error);
      toast({
        title: "Error",
        description: `Failed to ${editingHospital ? 'update' : 'create'} hospital. Please try again.`,
        variant: "destructive",
        duration: 3000,
      });
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (hospital: Hospital) => {
    setEditingHospital(hospital);
    // Parse the address back to individual components
    const addressParts = hospital.address.split(', ');
    
    setValue("name", hospital.name);
    setValue("phone", hospital.phone);
    setValue("email", hospital.email);
    setValue("licenseNumber", hospital.licenseNumber || ""); // Use actual license number if available
    setValue("city", addressParts[2] || "");
    setValue("state", addressParts[3]?.split(' - ')[0] || "");
    setValue("pinCode", addressParts[3]?.split(' - ')[1] || "");
    setValue("contactNumber", hospital.contactNumber || hospital.phone); // Use contact number if available
    setValue("addressLine1", addressParts[0] || "");
    setValue("addressLine2", addressParts[1] || "");
    setValue("status", hospital.status || "Active");
    
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (hospital: Hospital) => {
    setDeleteDialog({
      isOpen: true,
      hospital,
      isLoading: false,
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteDialog.hospital) return;

    setDeleteDialog(prev => ({ ...prev, isLoading: true }));

    try {
      // Call the delete API endpoint
      const response = await axios.delete(DeleteHospital(deleteDialog.hospital.id.toString()));
      if (response.status === 200) {
        // Refresh the hospitals list from API
        await refreshHospitalsList();
        
        toast({
          title: "Hospital Deleted",
          description: `${deleteDialog.hospital.name} has been deleted successfully.`,
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('Error deleting hospital:', error);
      toast({
        title: "Error",
        description: "Failed to delete hospital. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setDeleteDialog({
        isOpen: false,
        hospital: null,
        isLoading: false,
      });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({
      isOpen: false,
      hospital: null,
      isLoading: false,
    });
  };

  // Filter hospitals based on search term
  const filteredHospitals = hospitals.filter(
    (hospital) =>
      hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Update total count when filtered hospitals change
  React.useEffect(() => {
    setTotalHospitals(filteredHospitals.length);
  }, [filteredHospitals]);

  // Calculate pagination
  const totalPages = Math.ceil(totalHospitals / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedHospitals = filteredHospitals.slice(startIndex, endIndex);

  // Reset to first page when search term changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Reset to first page when page size changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [pageSize]);

  const getStatusBadge = (status: Hospital["status"]) => {
    return status === "Active" ? (
      <Badge className="bg-success text-success-foreground">Active</Badge>
    ) : (
      <Badge variant="secondary">Inactive</Badge>
    );
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground flex items-center space-x-2">
            <HospitalIcon className="h-6 w-6 md:h-8 md:w-8 text-primary" />
            <span>Hospitals Management</span>
          </h1>
          <p className="text-muted-foreground">
            Manage healthcare facilities across the network
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-gradient-primary hover:opacity-90 shadow-medical"
              onClick={resetForm}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Hospital
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-6xl w-[95vw] max-h-[95vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingHospital ? "Edit Hospital" : "Add New Hospital"}
              </DialogTitle>
              <DialogDescription>
                {editingHospital
                  ? "Update the hospital information below."
                  : "Fill in the details to add a new hospital to the network."}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="name">Hospital Name {!editingHospital && '*'}</Label>
                  <Input
                    id="name"
                    {...register("name", {
                      required: !editingHospital ? "Hospital name is required" : false,
                      minLength: {
                        value: 2,
                        message: "Hospital name must be at least 2 characters",
                      },
                    })}
                    placeholder="Enter hospital name"
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="licenseNumber">License Number {!editingHospital && '*'}</Label>
                  <Input
                    id="licenseNumber"
                    {...register("licenseNumber", {
                      required: !editingHospital ? "License number is required" : false,
                      minLength: {
                        value: 5,
                        message: "License number must be at least 5 characters",
                      },
                    })}
                    placeholder="Enter license number"
                  />
                  {errors.licenseNumber && (
                    <p className="text-sm text-destructive">{errors.licenseNumber.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone {!editingHospital && '*'}</Label>
                  <Input
                    id="phone"
                    {...register("phone", {
                      required: !editingHospital ? "Phone number is required" : false,
                      pattern: {
                        value: /^[\+]?[0-9\s\-\(\)]{10,15}$/,
                        message: "Please enter a valid phone number (10-15 digits)",
                      },
                    })}
                    placeholder="+91 9876543210"
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive">{errors.phone.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactNumber">Contact Number {!editingHospital && '*'}</Label>
                  <Input
                    id="contactNumber"
                    {...register("contactNumber", {
                      required: !editingHospital ? "Contact number is required" : false,
                      pattern: {
                        value: /^[\+]?[0-9\s\-\(\)]{10,15}$/,
                        message: "Please enter a valid contact number (10-15 digits)",
                      },
                    })}
                    placeholder="+91 9876543210"
                  />
                  {errors.contactNumber && (
                    <p className="text-sm text-destructive">{errors.contactNumber.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email {!editingHospital && '*'}</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email", {
                      required: !editingHospital ? "Email is required" : false,
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Please enter a valid email address",
                      },
                    })}
                    placeholder="admin@hospital.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City {!editingHospital && '*'}</Label>
                  <Input
                    id="city"
                    {...register("city", {
                      required: !editingHospital ? "City is required" : false,
                      minLength: {
                        value: 2,
                        message: "City must be at least 2 characters",
                      },
                    })}
                    placeholder="Enter city"
                  />
                  {errors.city && (
                    <p className="text-sm text-destructive">{errors.city.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State {!editingHospital && '*'}</Label>
                  <Input
                    id="state"
                    {...register("state", {
                      required: !editingHospital ? "State is required" : false,
                      minLength: {
                        value: 2,
                        message: "State must be at least 2 characters",
                      },
                    })}
                    placeholder="Enter state"
                  />
                  {errors.state && (
                    <p className="text-sm text-destructive">{errors.state.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pinCode">Pin Code {!editingHospital && '*'}</Label>
                  <Input
                    id="pinCode"
                    {...register("pinCode", {
                      required: !editingHospital ? "Pin code is required" : false,
                      pattern: {
                        value: /^[0-9]{6}$/,
                        message: "Please enter a valid 6-digit pin code",
                      },
                    })}
                    placeholder="123456"
                  />
                  {errors.pinCode && (
                    <p className="text-sm text-destructive">{errors.pinCode.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    onValueChange={(value) =>
                      setValue("status", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 lg:col-span-3">
                  <Label htmlFor="addressLine1">Address Line 1</Label>
                  <Input
                    id="addressLine1"
                    {...register("addressLine1")}
                    placeholder="Enter address line 1"
                  />
                </div>

                <div className="space-y-2 lg:col-span-3">
                  <Label htmlFor="addressLine2">Address Line 2</Label>
                  <Input
                    id="addressLine2"
                    {...register("addressLine2")}
                    placeholder="Enter address line 2"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-primary hover:opacity-90 w-full sm:w-auto"
                >
                  {isSubmitting 
                    ? "Saving..." 
                    : editingHospital 
                    ? "Update Hospital" 
                    : "Create Hospital"
                  }
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search hospitals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-9"
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="all">All Hospitals</TabsTrigger>
          <TabsTrigger value="approval">Approval Queue</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          {/* All Hospitals Table */}
      <Card className="shadow-card border-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">
            All Hospitals ({filteredHospitals.length})
            {totalHospitals > 0 && (
              <span className="text-sm font-normal text-muted-foreground ml-2">
                (Page {currentPage} of {totalPages})
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-6">
              <div className="text-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto mb-3"></div>
                <p className="text-muted-foreground text-sm">Loading hospitals...</p>
              </div>
            </div>
          ) : filteredHospitals.length === 0 ? (
            <div className="flex items-center justify-center py-6">
              <div className="text-center">
                <HospitalIcon className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground text-sm">No hospitals found</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {searchTerm ? "Try adjusting your search criteria" : "Add your first hospital to get started"}
                </p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <div className="min-w-full">
                <Table>
                  <TableHeader>
                    <TableRow className="h-10">
                      <TableHead className="py-2">Hospital</TableHead>
                      <TableHead className="py-2">Type</TableHead>
                      <TableHead className="py-2">Contact</TableHead>
                      <TableHead className="py-2">Beds</TableHead>
                      <TableHead className="py-2">Status</TableHead>
                      <TableHead className="text-right py-2">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedHospitals.map((hospital) => (
                      <TableRow key={hospital.id} className="h-12">
                        <TableCell className="py-2">
                          <div>
                            <p className="font-medium text-sm">{hospital.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {hospital.address}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="py-2">
                          <Badge variant="outline" className="text-xs">{hospital.type}</Badge>
                        </TableCell>
                        <TableCell className="py-2">
                          <div>
                            <p className="text-xs">{hospital.phone}</p>
                            <p className="text-xs text-muted-foreground">
                              {hospital.email}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="py-2">
                          <div>
                            <p className="font-medium text-sm">
                              {hospital.availableBeds}/{hospital.totalBeds}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Available/Total
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="py-2">{getStatusBadge(hospital.status)}</TableCell>
                        <TableCell className="text-right py-2">
                          <div className="space-x-1">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(hospital)}
                              className="h-7 w-7 p-0"
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteClick(hospital)}
                              className="text-destructive hover:text-destructive h-7 w-7 p-0"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </CardContent>
        
        {/* Pagination Controls */}
        {totalHospitals > 0 && (
          <div className="flex flex-col lg:flex-row items-center justify-between px-4 py-3 border-t space-y-3 lg:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1} to {Math.min(endIndex, totalHospitals)} of {totalHospitals} hospitals
              </div>
              
              {/* Page Size Dropdown */}
              <div className="flex items-center space-x-2">
                <Label htmlFor="pageSizeBottom" className="text-xs font-medium">
                  Per page:
                </Label>
                <Select
                  value={pageSize.toString()}
                  onValueChange={(value) => setPageSize(parseInt(value))}
                >
                  <SelectTrigger className="w-16 h-8 text-xs">
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
            
            {/* Pagination Tabs Navigation */}
            <div className="flex items-center space-x-1">
              {/* Previous Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1 || totalPages === 1}
                className="h-7 w-7 p-0"
              >
                ‹
              </Button>
              
              {/* Page Number Tabs */}
              <div className="flex items-center space-x-1">
                {/* Show first page if not in range */}
                {currentPage > 3 && totalPages > 5 && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(1)}
                      className="h-7 w-7 p-0 text-xs"
                    >
                      1
                    </Button>
                    {currentPage > 4 && (
                      <span className="text-muted-foreground px-1">...</span>
                    )}
                  </>
                )}
                
                {/* Main page numbers */}
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
                      onClick={() => setCurrentPage(pageNum)}
                      className={`h-7 w-7 p-0 text-xs ${
                        currentPage === pageNum 
                          ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                          : "hover:bg-muted"
                      }`}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
                
                {/* Show last page if not in range */}
                {currentPage < totalPages - 2 && totalPages > 5 && (
                  <>
                    {currentPage < totalPages - 3 && (
                      <span className="text-muted-foreground px-1">...</span>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(totalPages)}
                      className="h-7 w-7 p-0 text-xs"
                    >
                      {totalPages}
                    </Button>
                  </>
                )}
              </div>
              
              {/* Next Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages || totalPages === 1}
                className="h-7 w-7 p-0"
              >
                ›
              </Button>
            </div>
          </div>
        )}
      </Card>
        </TabsContent>
        
        <TabsContent value="approval" className="mt-4">
          {/* Approval Queue Table */}
          <Card className="shadow-card border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">
                Approval Queue Hospitals (0)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="text-center py-12">
                <HospitalIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No Hospitals Pending Approval</h3>
                <p className="text-muted-foreground">
                  Hospitals awaiting approval will appear here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={deleteDialog.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Hospital"
        description={`Are you sure you want to delete "${deleteDialog.hospital?.name}"? This action cannot be undone.`}
        type="warning"
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={deleteDialog.isLoading}
      />
    </div>
  );
};

export default Hospitals;
