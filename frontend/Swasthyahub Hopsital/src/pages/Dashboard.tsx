import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { 
  Users, 
  UserCheck, 
  Building2, 
  FileText, 
  TrendingUp,
  Activity,
  Calendar
} from "lucide-react";
import { sampleDoctors, samplePatients, sampleDepartments, sampleCaseFiles } from "@/lib/data";

export default function Dashboard() {
  const [currentTime] = useState(new Date().toLocaleString());

  const stats = [
    {
      title: "Total Patients",
      value: samplePatients.length,
      change: "+12%",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950",
    },
    {
      title: "Active Doctors",
      value: sampleDoctors.filter(d => d.status === 'active').length,
      change: "+3%",
      icon: UserCheck,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950",
    },
    {
      title: "Departments",
      value: sampleDepartments.length,
      change: "0%",
      icon: Building2,
      color: "text-purple-600", 
      bgColor: "bg-purple-50 dark:bg-purple-950",
    },
    {
      title: "Case Files",
      value: sampleCaseFiles.length,
      change: "+8%",
      icon: FileText,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-950",
    },
  ];

  const quickActions = [
    { title: "Add New Patient", href: "/patients", icon: Users },
    { title: "Schedule Appointment", href: "/appointments", icon: Calendar },
    { title: "View Reports", href: "/reports", icon: TrendingUp },
    { title: "Manage Doctors", href: "/doctors", icon: UserCheck },
  ];

  const recentActivities = [
    { activity: "New patient John Smith admitted to Cardiology", time: "5 min ago" },
    { activity: "Dr. Sarah Johnson completed surgery", time: "15 min ago" },
    { activity: "Emergency case resolved in ER", time: "30 min ago" },
    { activity: "Department meeting scheduled", time: "1 hour ago" },
  ];

  return (
    <Layout>
      {/* Mobile Header - Only visible on small screens */}
      <header className="lg:hidden border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold gradient-primary bg-clip-text text-transparent">
                Swasthyahub Pro
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Dr. Admin</h1>
          <p className="text-muted-foreground">
            Here's what's happening at your hospital today • {currentTime}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-card hover:shadow-medical medical-transition">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <div className="flex items-baseline space-x-2">
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <span className={`text-xs font-medium ${
                        stat.change.startsWith('+') ? 'text-success' : 'text-muted-foreground'
                      }`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common tasks and shortcuts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickActions.map((action, index) => (
                  <Link key={index} to={action.href}>
                    <Button variant="ghost" className="w-full justify-start" size="sm">
                      <action.icon className="mr-2 h-4 w-4" />
                      {action.title}
                    </Button>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="mr-2 h-5 w-5" />
                  Recent Activity
                </CardTitle>
                <CardDescription>
                  Latest updates and notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1">
                        <p className="text-sm">{item.activity}</p>
                        <p className="text-xs text-muted-foreground">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-6">Management Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link to="/doctors">
              <Card className="shadow-card hover:shadow-medical medical-transition cursor-pointer">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <UserCheck className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>Doctors</CardTitle>
                      <CardDescription>Manage doctor profiles and schedules</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{sampleDoctors.length}</p>
                  <p className="text-sm text-muted-foreground">Total doctors</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/patients">
              <Card className="shadow-card hover:shadow-medical medical-transition cursor-pointer">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-secondary/10 rounded-lg">
                      <Users className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <CardTitle>Patients</CardTitle>
                      <CardDescription>Patient records and medical history</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{samplePatients.length}</p>
                  <p className="text-sm text-muted-foreground">Active patients</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/departments">
              <Card className="shadow-card hover:shadow-medical medical-transition cursor-pointer">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-warning/10 rounded-lg">
                      <Building2 className="h-6 w-6 text-warning" />
                    </div>
                    <div>
                      <CardTitle>Departments</CardTitle>
                      <CardDescription>Hospital department management</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{sampleDepartments.length}</p>
                  <p className="text-sm text-muted-foreground">Active departments</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}