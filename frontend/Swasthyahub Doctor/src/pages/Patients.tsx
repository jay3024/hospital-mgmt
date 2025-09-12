import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Plus, 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  FileText, 
  Heart,
  AlertTriangle,
  Eye
} from "lucide-react";

const Patients = () => {
  const patients = [
    {
      id: 1,
      name: "Sarah Johnson",
      age: 34,
      gender: "Female",
      phone: "+1 234-567-8901",
      email: "sarah.johnson@email.com",
      lastVisit: "2024-01-15",
      condition: "Hypertension",
      status: "Active",
      consultations: 8,
      nextAppointment: "2024-01-20"
    },
    {
      id: 2,
      name: "Michael Chen",
      age: 45,
      gender: "Male",
      phone: "+1 234-567-8902",
      email: "michael.chen@email.com",
      lastVisit: "2024-01-14",
      condition: "Diabetes Type 2",
      status: "Critical",
      consultations: 15,
      nextAppointment: "2024-01-18"
    },
    {
      id: 3,
      name: "Emma Wilson",
      age: 28,
      gender: "Female",
      phone: "+1 234-567-8903",
      email: "emma.wilson@email.com",
      lastVisit: "2024-01-13",
      condition: "Post-Surgery",
      status: "Recovering",
      consultations: 5,
      nextAppointment: "2024-01-22"
    },
    {
      id: 4,
      name: "Robert Davis",
      age: 52,
      gender: "Male",
      phone: "+1 234-567-8904",
      email: "robert.davis@email.com",
      lastVisit: "2024-01-12",
      condition: "Cardiology",
      status: "Stable",
      consultations: 12,
      nextAppointment: "2024-01-25"
    },
    {
      id: 5,
      name: "Lisa Martinez",
      age: 39,
      gender: "Female",
      phone: "+1 234-567-8905",
      email: "lisa.martinez@email.com",
      lastVisit: "2024-01-10",
      condition: "Routine Check-up",
      status: "Healthy",
      consultations: 3,
      nextAppointment: "2024-07-15"
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "critical": return "destructive";
      case "recovering": return "secondary";
      case "stable": return "outline";
      case "healthy": return "default";
      case "active": return "default";
      default: return "default";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "critical": return <AlertTriangle className="h-4 w-4" />;
      case "recovering": return <Heart className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Patients</h1>
            <p className="text-muted-foreground">Manage patient records and consultation history</p>
          </div>
          <Button className="bg-gradient-medical hover:shadow-medical">
            <Plus className="mr-2 h-4 w-4" />
            Add Patient
          </Button>
        </div>

        {/* Search and Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Card className="shadow-card">
              <CardContent className="pt-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search patients by name, phone, or condition..." className="pl-10" />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{patients.length}</div>
              <p className="text-xs text-muted-foreground">Active patients</p>
            </CardContent>
          </Card>
        </div>

        {/* Patients List */}
        <div className="space-y-4">
          {patients.map((patient) => (
            <Card key={patient.id} className="shadow-card hover:shadow-float transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-gradient-medical rounded-full flex items-center justify-center text-white font-semibold text-lg">
                        {patient.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <Badge className="mt-2" variant={getStatusColor(patient.status)}>
                        <span className="flex items-center gap-1">
                          {getStatusIcon(patient.status)}
                          {patient.status}
                        </span>
                      </Badge>
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className="text-xl font-semibold">{patient.name}</h3>
                        <p className="text-muted-foreground">
                          {patient.age} years old • {patient.gender}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{patient.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span className="truncate">{patient.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>Last visit: {patient.lastVisit}</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Primary Condition</p>
                          <p className="font-medium">{patient.condition}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Total Consultations</p>
                          <p className="font-medium">{patient.consultations}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Next Appointment</p>
                          <p className="font-medium">{patient.nextAppointment}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Button size="sm" className="bg-gradient-medical">
                      <Eye className="mr-2 h-4 w-4" />
                      View Records
                    </Button>
                    <Button size="sm" variant="outline">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule
                    </Button>
                    <Button size="sm" variant="ghost">
                      <FileText className="mr-2 h-4 w-4" />
                      History
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Consultation History Modal would go here */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Patient Categories</CardTitle>
            <CardDescription>Overview of patient status distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">3</div>
                <p className="text-sm text-muted-foreground">Healthy</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">1</div>
                <p className="text-sm text-muted-foreground">Stable</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">1</div>
                <p className="text-sm text-muted-foreground">Recovering</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">1</div>
                <p className="text-sm text-muted-foreground">Critical</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">5</div>
                <p className="text-sm text-muted-foreground">Total</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Patients;