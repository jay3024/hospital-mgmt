import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Users, 
  Clock, 
  TrendingUp, 
  Phone, 
  Video,
  UserCheck,
  AlertTriangle,
  Zap
} from "lucide-react";

const Dashboard = () => {
  const todayAppointments = [
    { id: 1, time: "09:00", patient: "Sarah Johnson", type: "Consultation", status: "confirmed" },
    { id: 2, time: "10:30", patient: "Michael Chen", type: "Follow-up", status: "in-progress" },
    { id: 3, time: "11:15", patient: "Emma Wilson", type: "Check-up", status: "waiting" },
    { id: 4, time: "14:00", patient: "Robert Davis", type: "Video Call", status: "confirmed" },
    { id: 5, time: "15:30", patient: "Lisa Martinez", type: "Consultation", status: "confirmed" },
  ];

  const recentPatients = [
    { name: "Sarah Johnson", lastVisit: "Today", condition: "Hypertension" },
    { name: "Michael Chen", lastVisit: "Yesterday", condition: "Diabetes Type 2" },
    { name: "Emma Wilson", lastVisit: "2 days ago", condition: "Annual Check-up" },
    { name: "Robert Davis", lastVisit: "3 days ago", condition: "Cardiology" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "default";
      case "in-progress": return "destructive";
      case "waiting": return "secondary";
      default: return "default";
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, Dr. Smith. Here's your practice overview.</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Today</div>
            <div className="text-2xl font-bold text-foreground">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="group hover:shadow-float transition-all duration-300 card-enhanced">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Today's Appointments</CardTitle>
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-3xl font-bold text-primary mb-1">8</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-green-500" />
                +2 from yesterday
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-float transition-all duration-300 card-enhanced">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Patients</CardTitle>
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Users className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-3xl font-bold text-primary mb-1">1,247</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-green-500" />
                +12 this week
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-float transition-all duration-300 card-enhanced">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Wait Time</CardTitle>
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-3xl font-bold text-primary mb-1">12m</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-green-500" />
                -3m from last week
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-float transition-all duration-300 card-enhanced">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Patient Satisfaction</CardTitle>
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-3xl font-bold text-primary mb-1">4.8</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-green-500" />
                +0.2 from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's Appointments */}
          <Card className="border-0 bg-gradient-to-br from-card to-card/50">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                Today's Appointments
              </CardTitle>
              <CardDescription>Your schedule for today</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {todayAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/20 hover:bg-muted/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="text-sm font-semibold w-16 text-primary">{appointment.time}</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{appointment.patient}</p>
                      <p className="text-sm text-muted-foreground">{appointment.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getStatusColor(appointment.status)} className="text-xs">
                      {appointment.status}
                    </Badge>
                    {appointment.type === "Video Call" ? (
                      <Button size="sm" className="bg-gradient-medical h-8 w-8 p-0">
                        <Video className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                        <UserCheck className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Patients */}
          <Card className="border-0 bg-gradient-to-br from-card to-card/50">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                Recent Patients
              </CardTitle>
              <CardDescription>Recently seen patients</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentPatients.map((patient, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-muted/20 hover:bg-muted/40 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{patient.name}</p>
                    <p className="text-sm text-muted-foreground">{patient.condition}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-primary">{patient.lastVisit}</p>
                    <Button size="sm" variant="ghost" className="text-primary h-6 px-2 text-xs">
                      View Records
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="border-0 bg-gradient-to-br from-card to-card/50">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Zap className="h-4 w-4 text-primary" />
              </div>
              Quick Actions
            </CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button className="h-16 flex-col gap-2 bg-gradient-medical hover:shadow-medical group">
                <Calendar className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">New Appointment</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col gap-2 hover:bg-muted group">
                <Users className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">Add Patient</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col gap-2 hover:bg-muted group">
                <Video className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">Start Video Call</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col gap-2 hover:bg-muted group">
                <AlertTriangle className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">Emergency</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;