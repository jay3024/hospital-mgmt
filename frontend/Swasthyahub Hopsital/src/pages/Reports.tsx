import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Layout } from "@/components/Layout";
import { 
  Plus, 
  Search, 
  TrendingUp, 
  FileText,
  Users,
  UserCheck,
  Building2,
  Calendar,
  ArrowLeft,
  Download,
  Eye,
  BarChart3
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Reports() {
  const [searchTerm, setSearchTerm] = useState("");
  const [reportType, setReportType] = useState("all");
  const [timeRange, setTimeRange] = useState("month");
  const { toast } = useToast();

  const reports = [
    {
      id: '1',
      title: 'Monthly Patient Admissions Report',
      type: 'patient',
      date: '2024-01-31',
      summary: 'Total admissions: 245 patients with 15% increase from previous month',
      details: 'Comprehensive analysis of patient admission trends, department-wise breakdowns, and seasonal patterns.'
    },
    {
      id: '2',
      title: 'Doctor Performance Analytics',
      type: 'doctor',
      date: '2024-01-31',
      summary: 'Average patient satisfaction: 4.8/5 with high efficiency ratings',
      details: 'Detailed performance metrics for all doctors including patient outcomes, consultation times, and feedback scores.'
    },
    {
      id: '3',
      title: 'Department Resource Utilization',
      type: 'department',
      date: '2024-01-31',
      summary: 'Cardiology: 92% utilization, Neurology: 78% utilization',
      details: 'Analysis of resource allocation, staff workload distribution, and equipment usage across departments.'
    },
    {
      id: '4',
      title: 'Financial Performance Summary',
      type: 'financial',
      date: '2024-01-31',
      summary: 'Revenue increased by 8% with improved cost efficiency',
      details: 'Monthly financial analysis including revenue trends, cost management, and profitability by department.'
    },
    {
      id: '5',
      title: 'Quality Metrics Dashboard',
      type: 'quality',
      date: '2024-01-31',
      summary: 'Patient safety incidents reduced by 22%',
      details: 'Quality indicators, safety metrics, and compliance reporting for hospital accreditation standards.'
    }
  ];

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = reportType === "all" || report.type === reportType;
    return matchesSearch && matchesType;
  });

  const handleGenerateReport = () => {
    toast({
      title: "Report Generation Started",
      description: "Your custom report is being generated. You'll be notified when it's ready.",
    });
  };

  const handleDownload = (reportId: string) => {
    toast({
      title: "Download Started",
      description: "Your report is being downloaded as PDF.",
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'patient':
        return Users;
      case 'doctor':
        return UserCheck;
      case 'department':
        return Building2;
      case 'financial':
        return TrendingUp;
      case 'quality':
        return BarChart3;
      default:
        return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'patient':
        return 'text-blue-600 bg-blue-50 dark:bg-blue-950';
      case 'doctor':
        return 'text-green-600 bg-green-50 dark:bg-green-950';
      case 'department':
        return 'text-purple-600 bg-purple-50 dark:bg-purple-950';
      case 'financial':
        return 'text-orange-600 bg-orange-50 dark:bg-orange-950';
      case 'quality':
        return 'text-pink-600 bg-pink-50 dark:bg-pink-950';
      default:
        return 'text-gray-600 bg-gray-50 dark:bg-gray-950';
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
              <TrendingUp className="mr-3 h-8 w-8 text-primary" />
              Reports & Analytics
            </h1>
            <p className="text-muted-foreground">
              Generate insights and analytics for better hospital management decisions
            </p>
          </div>
          
          <Button 
            onClick={handleGenerateReport}
            className="gradient-primary text-primary-foreground mt-4 md:mt-0"
          >
            <Plus className="mr-2 h-4 w-4" />
            Generate Custom Report
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={reportType} onValueChange={setReportType}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Report Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="patient">Patient Reports</SelectItem>
              <SelectItem value="doctor">Doctor Reports</SelectItem>
              <SelectItem value="department">Department Reports</SelectItem>
              <SelectItem value="financial">Financial Reports</SelectItem>
              <SelectItem value="quality">Quality Reports</SelectItem>
            </SelectContent>
          </Select>

          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Reports</p>
                  <p className="text-2xl font-bold">{reports.length}</p>
                </div>
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">This Month</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <div className="p-2 bg-secondary/10 rounded-lg">
                  <Calendar className="h-6 w-6 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Response</p>
                  <p className="text-2xl font-bold">2.5h</p>
                </div>
                <div className="p-2 bg-warning/10 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Automation</p>
                  <p className="text-2xl font-bold">87%</p>
                </div>
                <div className="p-2 bg-success/10 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reports List */}
        <div className="space-y-6">
          {filteredReports.map((report) => {
            const IconComponent = getTypeIcon(report.type);
            const colorClasses = getTypeColor(report.type);
            
            return (
              <Card key={report.id} className="shadow-card hover:shadow-medical medical-transition">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${colorClasses}`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{report.title}</CardTitle>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center">
                            <Calendar className="mr-1 h-3 w-3" />
                            {report.date}
                          </span>
                          <span className="capitalize">{report.type} Report</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Summary</p>
                    <p className="text-sm">{report.summary}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Details</p>
                    <p className="text-sm text-muted-foreground">{report.details}</p>
                  </div>

                  <div className="flex space-x-2 pt-3 border-t">
                    <Button variant="outline" size="sm">
                      <Eye className="mr-2 h-3 w-3" />
                      View Report
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDownload(report.id)}
                    >
                      <Download className="mr-2 h-3 w-3" />
                      Download PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredReports.length === 0 && (
          <div className="text-center py-12">
            <TrendingUp className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No reports found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? "No reports match your search criteria." : "Generate your first report to get started."}
            </p>
            <Button 
              onClick={handleGenerateReport}
              className="gradient-primary text-primary-foreground"
            >
              <Plus className="mr-2 h-4 w-4" />
              Generate Custom Report
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
}