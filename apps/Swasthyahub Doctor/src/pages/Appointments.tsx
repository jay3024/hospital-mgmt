import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Clock, 
  Search, 
  Plus, 
  Video, 
  Phone, 
  User, 
  MapPin,
  Filter
} from "lucide-react";

const Appointments = () => {
  const appointments = [
    {
      id: 1,
      time: "09:00 AM",
      date: "Today",
      patient: "Sarah Johnson",
      age: 34,
      type: "Consultation",
      status: "confirmed",
      location: "Room 101",
      phone: "+1 234-567-8901",
      reason: "Routine check-up and blood pressure monitoring"
    },
    {
      id: 2,
      time: "10:30 AM",
      date: "Today",
      patient: "Michael Chen",
      age: 45,
      type: "Follow-up",
      status: "in-progress",
      location: "Room 102",
      phone: "+1 234-567-8902",
      reason: "Diabetes management and medication review"
    },
    {
      id: 3,
      time: "11:15 AM",
      date: "Today",
      patient: "Emma Wilson",
      age: 28,
      type: "Video Call",
      status: "waiting",
      location: "Virtual",
      phone: "+1 234-567-8903",
      reason: "Post-surgery follow-up consultation"
    },
    {
      id: 4,
      time: "02:00 PM",
      date: "Today",
      patient: "Robert Davis",
      age: 52,
      type: "Consultation",
      status: "confirmed",
      location: "Room 103",
      phone: "+1 234-567-8904",
      reason: "Cardiology consultation for chest pain"
    },
    {
      id: 5,
      time: "09:30 AM",
      date: "Tomorrow",
      patient: "Lisa Martinez",
      age: 39,
      type: "Check-up",
      status: "confirmed",
      location: "Room 101",
      phone: "+1 234-567-8905",
      reason: "Annual physical examination"
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "default";
      case "in-progress": return "destructive";
      case "waiting": return "secondary";
      case "completed": return "outline";
      default: return "default";
    }
  };

  const todayAppointments = appointments.filter(apt => apt.date === "Today");
  const upcomingAppointments = appointments.filter(apt => apt.date !== "Today");

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Appointments</h1>
            <p className="text-muted-foreground">Manage your patient appointments and schedule</p>
          </div>
          <Button className="bg-gradient-medical hover:shadow-medical">
            <Plus className="mr-2 h-4 w-4" />
            New Appointment
          </Button>
        </div>

        {/* Search and Filter */}
        <Card className="shadow-card">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search patients..." className="pl-10" />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Appointments Tabs */}
        <Tabs defaultValue="today" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="today">Today ({todayAppointments.length})</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming ({upcomingAppointments.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-4">
            {todayAppointments.map((appointment) => (
              <Card key={appointment.id} className="shadow-card hover:shadow-float transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-gradient-medical rounded-full flex items-center justify-center text-white font-semibold">
                          {appointment.patient.split(' ').map(n => n[0]).join('')}
                        </div>
                        <Badge className="mt-2" variant={getStatusColor(appointment.status)}>
                          {appointment.status}
                        </Badge>
                      </div>
                      
                      <div className="flex-1 space-y-3">
                        <div>
                          <h3 className="text-lg font-semibold">{appointment.patient}</h3>
                          <p className="text-sm text-muted-foreground">Age: {appointment.age}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{appointment.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{appointment.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{appointment.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span>{appointment.type}</span>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm text-muted-foreground">Reason:</p>
                          <p className="text-sm">{appointment.reason}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      {appointment.type === "Video Call" ? (
                        <Button size="sm" className="bg-gradient-medical">
                          <Video className="mr-2 h-4 w-4" />
                          Join Call
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline">
                          <User className="mr-2 h-4 w-4" />
                          Check In
                        </Button>
                      )}
                      <Button size="sm" variant="ghost">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <Card key={appointment.id} className="shadow-card hover:shadow-float transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-gradient-medical rounded-full flex items-center justify-center text-white font-semibold">
                          {appointment.patient.split(' ').map(n => n[0]).join('')}
                        </div>
                        <Badge className="mt-2" variant={getStatusColor(appointment.status)}>
                          {appointment.status}
                        </Badge>
                      </div>
                      
                      <div className="flex-1 space-y-3">
                        <div>
                          <h3 className="text-lg font-semibold">{appointment.patient}</h3>
                          <p className="text-sm text-muted-foreground">Age: {appointment.age}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{appointment.date} at {appointment.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{appointment.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{appointment.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span>{appointment.type}</span>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm text-muted-foreground">Reason:</p>
                          <p className="text-sm">{appointment.reason}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <Button size="sm" variant="outline">
                        Reschedule
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

          <TabsContent value="completed">
            <Card className="shadow-card">
              <CardContent className="p-12 text-center">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No completed appointments today</h3>
                <p className="text-muted-foreground">Completed appointments will appear here</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Appointments;