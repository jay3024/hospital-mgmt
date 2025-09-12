import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Layout } from "@/components/Layout";
import { 
  Plus, 
  Search, 
  Users, 
  Mail, 
  Phone, 
  Calendar,
  ArrowLeft,
  Edit,
  Trash2,
  Heart,
  User
} from "lucide-react";
import { Patient, samplePatients } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";

export default function Patients() {
  const [patients, setPatients] = useState<Patient[]>(samplePatients);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.bloodType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (patientId: string) => {
    setPatients(prev => prev.filter(p => p.id !== patientId));
    toast({
      title: "Patient Removed",
      description: "Patient has been successfully removed from the system.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-success text-success-foreground';
      case 'discharged':
        return 'bg-muted text-muted-foreground';
      case 'critical':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Layout>
      {/* Mobile Header - Only visible on small screens */}
      <header className="lg:hidden border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="outline" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <span className="text-xl font-bold gradient-primary bg-clip-text text-transparent">
                Swasthyahub Pro
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center">
              <Users className="mr-3 h-8 w-8 text-primary" />
              Patient Management
            </h1>
            <p className="text-muted-foreground">
              Manage patient records, medical history, and contact information
            </p>
          </div>
          
          <Button className="gradient-primary text-primary-foreground mt-4 md:mt-0">
            <Plus className="mr-2 h-4 w-4" />
            Add New Patient
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search patients by name, email, or blood type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Patients</p>
                  <p className="text-2xl font-bold">{patients.length}</p>
                </div>
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active</p>
                  <p className="text-2xl font-bold">
                    {patients.filter(p => p.status === 'active').length}
                  </p>
                </div>
                <div className="p-2 bg-success/10 rounded-lg">
                  <Heart className="h-6 w-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Critical</p>
                  <p className="text-2xl font-bold">
                    {patients.filter(p => p.status === 'critical').length}
                  </p>
                </div>
                <div className="p-2 bg-destructive/10 rounded-lg">
                  <Heart className="h-6 w-6 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Discharged</p>
                  <p className="text-2xl font-bold">
                    {patients.filter(p => p.status === 'discharged').length}
                  </p>
                </div>
                <div className="p-2 bg-muted/10 rounded-lg">
                  <User className="h-6 w-6 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Patients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPatients.map((patient) => (
            <Card key={patient.id} className="shadow-card hover:shadow-medical medical-transition">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{patient.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{patient.age} years • {patient.gender}</p>
                    </div>
                  </div>
                  
                  <Badge className={getStatusColor(patient.status)}>
                    {patient.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Mail className="mr-2 h-4 w-4" />
                    {patient.email}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Phone className="mr-2 h-4 w-4" />
                    {patient.phone}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-2 h-4 w-4" />
                    Admitted: {patient.admissionDate}
                  </div>
                </div>

                <div className="pt-3 border-t">
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <div>
                      <p className="text-xs text-muted-foreground">Blood Type</p>
                      <Badge variant="outline">{patient.bloodType}</Badge>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Emergency</p>
                      <p className="text-sm font-medium">{patient.emergencyContact}</p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2 pt-3">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="mr-2 h-3 w-3" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDelete(patient.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPatients.length === 0 && (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No patients found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? "No patients match your search criteria." : "Get started by adding your first patient."}
            </p>
            <Button className="gradient-primary text-primary-foreground">
              <Plus className="mr-2 h-4 w-4" />
              Add New Patient
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
}