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
  FileText, 
  User,
  UserCheck,
  Calendar,
  ArrowLeft,
  Edit,
  Trash2,
  Eye,
  Clock
} from "lucide-react";
import { CaseFile, sampleCaseFiles } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";

export default function CaseFiles() {
  const [caseFiles, setCaseFiles] = useState<CaseFile[]>(sampleCaseFiles);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const filteredCaseFiles = caseFiles.filter(caseFile =>
    caseFile.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    caseFile.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    caseFile.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (caseId: string) => {
    setCaseFiles(prev => prev.filter(c => c.id !== caseId));
    toast({
      title: "Case File Removed",
      description: "Case file has been successfully removed from the system.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing':
        return 'bg-primary text-primary-foreground';
      case 'resolved':
        return 'bg-success text-success-foreground';
      case 'followup':
        return 'bg-warning text-warning-foreground';
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
              <FileText className="mr-3 h-8 w-8 text-primary" />
              Case Files Management
            </h1>
            <p className="text-muted-foreground">
              Manage patient case files, medical diagnoses, and treatment records
            </p>
          </div>
          
          <Button className="gradient-primary text-primary-foreground mt-4 md:mt-0">
            <Plus className="mr-2 h-4 w-4" />
            Create New Case
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by patient, doctor, or diagnosis..."
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
                  <p className="text-sm font-medium text-muted-foreground">Total Cases</p>
                  <p className="text-2xl font-bold">{caseFiles.length}</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Ongoing</p>
                  <p className="text-2xl font-bold">
                    {caseFiles.filter(c => c.status === 'ongoing').length}
                  </p>
                </div>
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Resolved</p>
                  <p className="text-2xl font-bold">
                    {caseFiles.filter(c => c.status === 'resolved').length}
                  </p>
                </div>
                <div className="p-2 bg-success/10 rounded-lg">
                  <FileText className="h-6 w-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Follow-up</p>
                  <p className="text-2xl font-bold">
                    {caseFiles.filter(c => c.status === 'followup').length}
                  </p>
                </div>
                <div className="p-2 bg-warning/10 rounded-lg">
                  <Calendar className="h-6 w-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Case Files Grid */}
        <div className="space-y-6">
          {filteredCaseFiles.map((caseFile) => (
            <Card key={caseFile.id} className="shadow-card hover:shadow-medical medical-transition">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Case #{caseFile.id}</CardTitle>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center">
                          <Calendar className="mr-1 h-3 w-3" />
                          {caseFile.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <Badge className={getStatusColor(caseFile.status)}>
                    {caseFile.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Patient</p>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-secondary" />
                        <span className="font-medium">{caseFile.patientName}</span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Attending Doctor</p>
                      <div className="flex items-center space-x-2">
                        <UserCheck className="h-4 w-4 text-primary" />
                        <span className="font-medium">{caseFile.doctorName}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Diagnosis</p>
                      <Badge variant="outline" className="font-medium">
                        {caseFile.diagnosis}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-3 border-t">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Symptoms</p>
                    <p className="text-sm">{caseFile.symptoms}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Treatment</p>
                    <p className="text-sm">{caseFile.treatment}</p>
                  </div>
                </div>

                <div className="flex space-x-2 pt-3 border-t">
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-3 w-3" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-3 w-3" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDelete(caseFile.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCaseFiles.length === 0 && (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No case files found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? "No case files match your search criteria." : "Get started by creating your first case file."}
            </p>
            <Button className="gradient-primary text-primary-foreground">
              <Plus className="mr-2 h-4 w-4" />
              Create New Case
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
}