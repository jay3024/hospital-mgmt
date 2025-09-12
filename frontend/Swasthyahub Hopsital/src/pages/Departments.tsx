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
  Building2, 
  Users,
  UserCheck,
  ArrowLeft,
  Edit,
  Trash2,
  Activity
} from "lucide-react";
import { Department, sampleDepartments } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";

export default function Departments() {
  const [departments, setDepartments] = useState<Department[]>(sampleDepartments);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.head.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (deptId: string) => {
    setDepartments(prev => prev.filter(d => d.id !== deptId));
    toast({
      title: "Department Removed",
      description: "Department has been successfully removed from the system.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-success text-success-foreground';
      case 'inactive':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const totalDoctors = departments.reduce((sum, dept) => sum + dept.totalDoctors, 0);
  const totalPatients = departments.reduce((sum, dept) => sum + dept.totalPatients, 0);

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
              <Building2 className="mr-3 h-8 w-8 text-primary" />
              Department Management
            </h1>
            <p className="text-muted-foreground">
              Manage hospital departments, staff allocation, and departmental operations
            </p>
          </div>
          
          <Button className="gradient-primary text-primary-foreground mt-4 md:mt-0">
            <Plus className="mr-2 h-4 w-4" />
            Add New Department
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search departments by name, head, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Departments</p>
                  <p className="text-2xl font-bold">{departments.length}</p>
                </div>
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Doctors</p>
                  <p className="text-2xl font-bold">{totalDoctors}</p>
                </div>
                <div className="p-2 bg-secondary/10 rounded-lg">
                  <UserCheck className="h-6 w-6 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Patients</p>
                  <p className="text-2xl font-bold">{totalPatients}</p>
                </div>
                <div className="p-2 bg-warning/10 rounded-lg">
                  <Users className="h-6 w-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDepartments.map((department) => (
            <Card key={department.id} className="shadow-card hover:shadow-medical medical-transition">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-warning" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{department.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">Head: {department.head}</p>
                    </div>
                  </div>
                  
                  <Badge className={getStatusColor(department.status)}>
                    {department.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {department.description}
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                      <UserCheck className="h-4 w-4 text-primary mr-1" />
                    </div>
                    <p className="text-2xl font-bold">{department.totalDoctors}</p>
                    <p className="text-xs text-muted-foreground">Doctors</p>
                  </div>
                  
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                      <Users className="h-4 w-4 text-secondary mr-1" />
                    </div>
                    <p className="text-2xl font-bold">{department.totalPatients}</p>
                    <p className="text-xs text-muted-foreground">Patients</p>
                  </div>
                </div>

                <div className="flex items-center text-sm text-muted-foreground">
                  <Activity className="mr-2 h-4 w-4" />
                  Workload: {department.totalPatients > 30 ? 'High' : department.totalPatients > 15 ? 'Medium' : 'Low'}
                </div>

                <div className="flex space-x-2 pt-3 border-t">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="mr-2 h-3 w-3" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDelete(department.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDepartments.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No departments found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? "No departments match your search criteria." : "Get started by adding your first department."}
            </p>
            <Button className="gradient-primary text-primary-foreground">
              <Plus className="mr-2 h-4 w-4" />
              Add New Department
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
}