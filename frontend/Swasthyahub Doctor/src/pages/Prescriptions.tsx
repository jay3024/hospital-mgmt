import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Pill, 
  Search, 
  Plus, 
  Calendar, 
  User, 
  AlertTriangle,
  Check,
  Clock,
  FileText,
  Printer
} from "lucide-react";

const Prescriptions = () => {
  const prescriptions = [
    {
      id: 1,
      patientName: "Sarah Johnson",
      medication: "Lisinopril 10mg",
      dosage: "Once daily",
      quantity: 30,
      refills: 2,
      prescribedDate: "2024-01-15",
      status: "active",
      indication: "Hypertension",
      instructions: "Take with food in the morning"
    },
    {
      id: 2,
      patientName: "Michael Chen",
      medication: "Metformin 500mg",
      dosage: "Twice daily",
      quantity: 60,
      refills: 5,
      prescribedDate: "2024-01-14",
      status: "active",
      indication: "Type 2 Diabetes",
      instructions: "Take with meals"
    },
    {
      id: 3,
      patientName: "Emma Wilson",
      medication: "Amoxicillin 250mg",
      dosage: "Three times daily",
      quantity: 21,
      refills: 0,
      prescribedDate: "2024-01-13",
      status: "completed",
      indication: "Bacterial infection",
      instructions: "Complete full course"
    },
    {
      id: 4,
      patientName: "Robert Davis",
      medication: "Atorvastatin 20mg",
      dosage: "Once daily",
      quantity: 30,
      refills: 3,
      prescribedDate: "2024-01-12",
      status: "pending",
      indication: "High cholesterol",
      instructions: "Take in the evening"
    },
    {
      id: 5,
      patientName: "Lisa Martinez",
      medication: "Ibuprofen 400mg",
      dosage: "As needed",
      quantity: 20,
      refills: 1,
      prescribedDate: "2024-01-10",
      status: "active",
      indication: "Pain management",
      instructions: "Do not exceed 3 times daily"
    },
  ];

  const recentPrescriptions = prescriptions.slice(0, 3);
  const activePrescriptions = prescriptions.filter(p => p.status === "active");
  const pendingPrescriptions = prescriptions.filter(p => p.status === "pending");

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active": return "default";
      case "pending": return "secondary";
      case "completed": return "outline";
      case "expired": return "destructive";
      default: return "default";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "active": return <Check className="h-4 w-4" />;
      case "pending": return <Clock className="h-4 w-4" />;
      case "completed": return <Check className="h-4 w-4" />;
      default: return <Pill className="h-4 w-4" />;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Prescriptions</h1>
            <p className="text-muted-foreground">Manage patient prescriptions and medications</p>
          </div>
          <Button className="bg-gradient-medical hover:shadow-medical">
            <Plus className="mr-2 h-4 w-4" />
            New Prescription
          </Button>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Prescriptions</CardTitle>
              <Pill className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{activePrescriptions.length}</div>
              <p className="text-xs text-muted-foreground">Currently prescribed</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{pendingPrescriptions.length}</div>
              <p className="text-xs text-muted-foreground">Awaiting approval</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Week</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">8</div>
              <p className="text-xs text-muted-foreground">New prescriptions</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">2</div>
              <p className="text-xs text-muted-foreground">Drug interactions</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="shadow-card">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search prescriptions by patient name, medication, or indication..." className="pl-10" />
            </div>
          </CardContent>
        </Card>

        {/* Prescriptions Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All ({prescriptions.length})</TabsTrigger>
            <TabsTrigger value="active">Active ({activePrescriptions.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingPrescriptions.length})</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {prescriptions.map((prescription) => (
              <Card key={prescription.id} className="shadow-card hover:shadow-float transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-gradient-medical rounded-lg flex items-center justify-center text-white">
                        <Pill className="h-6 w-6" />
                      </div>
                      
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold">{prescription.medication}</h3>
                            <p className="text-muted-foreground">{prescription.patientName}</p>
                          </div>
                          <Badge variant={getStatusColor(prescription.status)}>
                            <span className="flex items-center gap-1">
                              {getStatusIcon(prescription.status)}
                              {prescription.status}
                            </span>
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Dosage</p>
                            <p className="font-medium">{prescription.dosage}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Quantity</p>
                            <p className="font-medium">{prescription.quantity}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Refills</p>
                            <p className="font-medium">{prescription.refills}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Prescribed</p>
                            <p className="font-medium">{prescription.prescribedDate}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Indication</p>
                            <p className="font-medium">{prescription.indication}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Instructions</p>
                            <p className="font-medium">{prescription.instructions}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <Button size="sm" className="bg-gradient-medical">
                        <FileText className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        <Printer className="mr-2 h-4 w-4" />
                        Print
                      </Button>
                      <Button size="sm" variant="ghost">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="active" className="space-y-4">
            {activePrescriptions.map((prescription) => (
              <Card key={prescription.id} className="shadow-card hover:shadow-float transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-gradient-medical rounded-lg flex items-center justify-center text-white">
                        <Pill className="h-6 w-6" />
                      </div>
                      
                      <div className="flex-1 space-y-3">
                        <div>
                          <h3 className="text-lg font-semibold">{prescription.medication}</h3>
                          <p className="text-muted-foreground">{prescription.patientName}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Dosage</p>
                            <p className="font-medium">{prescription.dosage}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Quantity</p>
                            <p className="font-medium">{prescription.quantity}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Refills</p>
                            <p className="font-medium">{prescription.refills}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Prescribed</p>
                            <p className="font-medium">{prescription.prescribedDate}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <Button size="sm" className="bg-gradient-medical">
                        <FileText className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        <Printer className="mr-2 h-4 w-4" />
                        Print
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            {pendingPrescriptions.map((prescription) => (
              <Card key={prescription.id} className="shadow-card hover:shadow-float transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center text-white">
                        <Clock className="h-6 w-6" />
                      </div>
                      
                      <div className="flex-1 space-y-3">
                        <div>
                          <h3 className="text-lg font-semibold">{prescription.medication}</h3>
                          <p className="text-muted-foreground">{prescription.patientName}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Dosage</p>
                            <p className="font-medium">{prescription.dosage}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Quantity</p>
                            <p className="font-medium">{prescription.quantity}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Refills</p>
                            <p className="font-medium">{prescription.refills}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Prescribed</p>
                            <p className="font-medium">{prescription.prescribedDate}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <Button size="sm" className="bg-gradient-medical">
                        <Check className="mr-2 h-4 w-4" />
                        Approve
                      </Button>
                      <Button size="sm" variant="outline">
                        Review
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="recent" className="space-y-4">
            {recentPrescriptions.map((prescription) => (
              <Card key={prescription.id} className="shadow-card hover:shadow-float transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-gradient-medical rounded-lg flex items-center justify-center text-white">
                        <Pill className="h-6 w-6" />
                      </div>
                      
                      <div className="flex-1 space-y-3">
                        <div>
                          <h3 className="text-lg font-semibold">{prescription.medication}</h3>
                          <p className="text-muted-foreground">{prescription.patientName}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Dosage</p>
                            <p className="font-medium">{prescription.dosage}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Quantity</p>
                            <p className="font-medium">{prescription.quantity}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Refills</p>
                            <p className="font-medium">{prescription.refills}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Prescribed</p>
                            <p className="font-medium">{prescription.prescribedDate}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <Button size="sm" className="bg-gradient-medical">
                        <FileText className="mr-2 h-4 w-4" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Printer className="mr-2 h-4 w-4" />
                        Print
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Prescriptions;