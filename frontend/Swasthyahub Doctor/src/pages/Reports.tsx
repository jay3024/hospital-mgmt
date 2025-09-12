import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Download, 
  Eye, 
  Calendar, 
  User, 
  Activity,
  Heart,
  TestTube,
  Stethoscope,
  Pill
} from "lucide-react";

const Reports = () => {
  const patientReports = [
    {
      id: 1,
      patientName: "Sarah Johnson",
      reportType: "Blood Test",
      date: "2024-01-15",
      status: "Available",
      doctor: "Dr. Smith",
      category: "Laboratory",
      critical: false
    },
    {
      id: 2,
      patientName: "Michael Chen",
      reportType: "ECG Report",
      date: "2024-01-14",
      status: "Available",
      doctor: "Dr. Johnson",
      category: "Cardiology",
      critical: true
    },
    {
      id: 3,
      patientName: "Emma Wilson",
      reportType: "X-Ray Chest",
      date: "2024-01-13",
      status: "Pending",
      doctor: "Dr. Wilson",
      category: "Radiology",
      critical: false
    },
    {
      id: 4,
      patientName: "Robert Davis",
      reportType: "Echocardiogram",
      date: "2024-01-12",
      status: "Available",
      doctor: "Dr. Brown",
      category: "Cardiology",
      critical: false
    },
    {
      id: 5,
      patientName: "Lisa Martinez",
      reportType: "Complete Blood Count",
      date: "2024-01-10",
      status: "Available",
      doctor: "Dr. Smith",
      category: "Laboratory",
      critical: false
    },
  ];

  const practiceReports = [
    {
      id: 1,
      title: "Monthly Patient Statistics",
      description: "Comprehensive overview of patient visits and demographics",
      date: "2024-01-01",
      type: "Statistical",
      size: "2.4 MB"
    },
    {
      id: 2,
      title: "Revenue Analysis Q4 2023",
      description: "Financial performance and billing analysis",
      date: "2023-12-31",
      type: "Financial",
      size: "1.8 MB"
    },
    {
      id: 3,
      title: "Appointment Efficiency Report",
      description: "Analysis of scheduling patterns and wait times",
      date: "2024-01-05",
      type: "Operational",
      size: "1.2 MB"
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "available": return "default";
      case "pending": return "secondary";
      case "critical": return "destructive";
      default: return "default";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "laboratory": return <TestTube className="h-4 w-4" />;
      case "cardiology": return <Heart className="h-4 w-4" />;
      case "radiology": return <Activity className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Reports</h1>
            <p className="text-muted-foreground">Patient reports, test results, and practice analytics</p>
          </div>
          <Button className="bg-gradient-medical hover:shadow-medical">
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">3</div>
              <p className="text-xs text-muted-foreground">Awaiting review</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Critical Results</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">1</div>
              <p className="text-xs text-muted-foreground">Requires attention</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Week</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">12</div>
              <p className="text-xs text-muted-foreground">Reports generated</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lab Tests</CardTitle>
              <TestTube className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">8</div>
              <p className="text-xs text-muted-foreground">Results available</p>
            </CardContent>
          </Card>
        </div>

        {/* Reports Tabs */}
        <Tabs defaultValue="patient" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="patient">Patient Reports</TabsTrigger>
            <TabsTrigger value="practice">Practice Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="patient" className="space-y-4">
            {patientReports.map((report) => (
              <Card key={report.id} className="shadow-card hover:shadow-float transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-gradient-medical rounded-lg flex items-center justify-center text-white">
                        {getCategoryIcon(report.category)}
                      </div>
                      
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold">{report.reportType}</h3>
                          {report.critical && (
                            <Badge variant="destructive" className="text-xs">
                              Critical
                            </Badge>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span>{report.patientName}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{report.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Stethoscope className="h-4 w-4" />
                            <span>{report.doctor}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Badge variant={getStatusColor(report.status)}>
                            {report.status}
                          </Badge>
                          <Badge variant="outline">
                            {report.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-gradient-medical">
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="practice" className="space-y-4">
            {practiceReports.map((report) => (
              <Card key={report.id} className="shadow-card hover:shadow-float transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-gradient-medical rounded-lg flex items-center justify-center text-white">
                        <FileText className="h-5 w-5" />
                      </div>
                      
                      <div className="flex-1 space-y-2">
                        <h3 className="text-lg font-semibold">{report.title}</h3>
                        <p className="text-muted-foreground">{report.description}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{report.date}</span>
                          </div>
                          <Badge variant="outline">
                            {report.type}
                          </Badge>
                          <span>{report.size}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-gradient-medical">
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Download
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

export default Reports;