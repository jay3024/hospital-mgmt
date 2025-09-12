import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Clock, 
  User,
  Video,
  MapPin
} from "lucide-react";
import { useState } from "react";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Mock appointment data
  const appointments = {
    "2024-01-15": [
      { time: "09:00", patient: "Sarah Johnson", type: "Consultation", duration: 30 },
      { time: "10:30", patient: "Michael Chen", type: "Follow-up", duration: 45 },
      { time: "14:00", patient: "Emma Wilson", type: "Video Call", duration: 30 },
    ],
    "2024-01-16": [
      { time: "09:30", patient: "Robert Davis", type: "Check-up", duration: 30 },
      { time: "11:00", patient: "Lisa Martinez", type: "Consultation", duration: 45 },
    ],
    "2024-01-17": [
      { time: "10:00", patient: "James Wilson", type: "Surgery", duration: 120 },
      { time: "15:00", patient: "Mary Brown", type: "Follow-up", duration: 30 },
    ],
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const days = getDaysInMonth(currentDate);
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const selectedDateKey = formatDate(selectedDate);
  const selectedDateAppointments = appointments[selectedDateKey] || [];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Calendar</h1>
            <p className="text-muted-foreground">View and manage your appointment schedule</p>
          </div>
          <Button className="bg-gradient-medical hover:shadow-medical">
            <Plus className="mr-2 h-4 w-4" />
            New Appointment
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar Grid */}
          <div className="lg:col-span-2">
            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5 text-primary" />
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateMonth('prev')}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateMonth('next')}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                      {day}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-1">
                  {days.map((date, index) => {
                    if (!date) {
                      return <div key={index} className="h-20 p-1"></div>;
                    }
                    
                    const dateKey = formatDate(date);
                    const dayAppointments = appointments[dateKey] || [];
                    const isSelected = formatDate(date) === formatDate(selectedDate);
                    const isToday = formatDate(date) === formatDate(new Date());
                    
                    return (
                      <div
                        key={index}
                        className={`h-20 p-1 border rounded-md cursor-pointer transition-all duration-200 ${
                          isSelected 
                            ? 'bg-primary text-primary-foreground border-primary' 
                            : isToday
                            ? 'bg-accent border-accent-foreground'
                            : 'hover:bg-muted/50'
                        }`}
                        onClick={() => setSelectedDate(date)}
                      >
                        <div className="h-full flex flex-col">
                          <div className={`text-sm font-medium ${isSelected ? 'text-white' : ''}`}>
                            {date.getDate()}
                          </div>
                          <div className="flex-1 space-y-1 overflow-hidden">
                            {dayAppointments.slice(0, 2).map((apt, i) => (
                              <div
                                key={i}
                                className={`text-xs p-1 rounded truncate ${
                                  isSelected 
                                    ? 'bg-white/20 text-white' 
                                    : 'bg-primary/10 text-primary'
                                }`}
                              >
                                {apt.time} {apt.patient.split(' ')[0]}
                              </div>
                            ))}
                            {dayAppointments.length > 2 && (
                              <div className={`text-xs ${isSelected ? 'text-white/80' : 'text-muted-foreground'}`}>
                                +{dayAppointments.length - 2} more
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Selected Date Details */}
          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>
                  {selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </CardTitle>
                <CardDescription>
                  {selectedDateAppointments.length} appointment{selectedDateAppointments.length !== 1 ? 's' : ''} scheduled
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedDateAppointments.length > 0 ? (
                  selectedDateAppointments.map((appointment, index) => (
                    <div key={index} className="p-3 rounded-lg bg-muted/30 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold">{appointment.patient}</h4>
                          <p className="text-sm text-muted-foreground">{appointment.type}</p>
                        </div>
                        <Badge variant="outline">{appointment.time}</Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{appointment.duration} min</span>
                        </div>
                        {appointment.type === "Video Call" ? (
                          <div className="flex items-center gap-1">
                            <Video className="h-4 w-4" />
                            <span>Virtual</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>Room 101</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                        {appointment.type === "Video Call" && (
                          <Button size="sm" className="bg-gradient-medical">
                            <Video className="mr-1 h-3 w-3" />
                            Join
                          </Button>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">No appointments scheduled</p>
                    <Button size="sm" className="mt-3 bg-gradient-medical">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Appointment
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">This Month</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Appointments</span>
                  <span className="font-semibold text-primary">47</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Video Consultations</span>
                  <span className="font-semibold text-primary">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Average Duration</span>
                  <span className="font-semibold text-primary">35 min</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Cancellation Rate</span>
                  <span className="font-semibold text-primary">3.2%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Calendar;