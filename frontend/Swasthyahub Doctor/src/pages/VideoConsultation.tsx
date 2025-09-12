import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  Settings, 
  MessageSquare,
  Share,
  Circle,
  Users,
  Clock,
  Calendar
} from "lucide-react";
import { useState } from "react";

const VideoConsultation = () => {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isInCall, setIsInCall] = useState(false);

  const upcomingCalls = [
    {
      id: 1,
      time: "10:30 AM",
      patient: "Emma Wilson",
      duration: "30 min",
      type: "Follow-up",
      status: "upcoming"
    },
    {
      id: 2,
      time: "02:00 PM",
      patient: "John Smith",
      duration: "45 min",
      type: "Consultation",
      status: "upcoming"
    },
    {
      id: 3,
      time: "03:30 PM",
      patient: "Maria Garcia",
      duration: "30 min",
      type: "Check-up",
      status: "upcoming"
    },
  ];

  const recentCalls = [
    {
      id: 1,
      date: "Today",
      patient: "Sarah Johnson",
      duration: "35 min",
      status: "completed",
      notes: "Discussed medication adjustments"
    },
    {
      id: 2,
      date: "Yesterday",
      patient: "Michael Chen",
      duration: "25 min",
      status: "completed",
      notes: "Follow-up on diabetes management"
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Video Consultation</h1>
            <p className="text-muted-foreground">Secure video calls with your patients</p>
          </div>
          <Button className="bg-gradient-medical hover:shadow-medical">
            <Video className="mr-2 h-4 w-4" />
            Start New Call
          </Button>
        </div>

        {/* Video Call Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="shadow-card">
              <CardContent className="p-0">
                <div className="relative bg-gray-900 rounded-lg aspect-video overflow-hidden">
                  {isInCall ? (
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Users className="h-12 w-12" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Connected with Emma Wilson</h3>
                        <div className="flex items-center justify-center gap-2 text-sm">
                          <Clock className="h-4 w-4" />
                          <span>12:35</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-muted flex items-center justify-center">
                      <div className="text-center">
                        <Video className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Ready for Video Call</h3>
                        <p className="text-muted-foreground">Start a call with your patient</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Video Controls */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
                    <Button
                      size="sm"
                      variant={isVideoOn ? "default" : "destructive"}
                      className="rounded-full w-12 h-12"
                      onClick={() => setIsVideoOn(!isVideoOn)}
                    >
                      {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                    </Button>
                    
                    <Button
                      size="sm"
                      variant={isAudioOn ? "default" : "destructive"}
                      className="rounded-full w-12 h-12"
                      onClick={() => setIsAudioOn(!isAudioOn)}
                    >
                      {isAudioOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                    </Button>
                    
                    <Button
                      size="sm"
                      variant={isInCall ? "destructive" : "default"}
                      className="rounded-full w-12 h-12 bg-gradient-medical hover:shadow-medical"
                      onClick={() => setIsInCall(!isInCall)}
                    >
                      <Phone className="h-5 w-5" />
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full w-12 h-12"
                    >
                      <Settings className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  {/* Additional Controls */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button size="sm" variant="secondary" className="opacity-80">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Chat
                    </Button>
                    <Button size="sm" variant="secondary" className="opacity-80">
                      <Share className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                    <Button size="sm" variant="secondary" className="opacity-80">
                      <Circle className="mr-2 h-4 w-4" />
                      Record
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Call Information Panel */}
          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Current Patient</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-medical rounded-full flex items-center justify-center text-white font-semibold">
                    EW
                  </div>
                  <div>
                    <h4 className="font-semibold">Emma Wilson</h4>
                    <p className="text-sm text-muted-foreground">28 years old</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Appointment:</span>
                    <span>Follow-up</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span>30 minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Condition:</span>
                    <span>Post-Surgery</span>
                  </div>
                </div>
                
                <Button className="w-full bg-gradient-medical">
                  View Patient Records
                </Button>
              </CardContent>
            </Card>

            {/* Quick Notes */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Quick Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <textarea 
                  className="w-full h-24 p-3 text-sm border rounded-md resize-none"
                  placeholder="Add consultation notes..."
                />
                <Button size="sm" className="mt-2 w-full" variant="outline">
                  Save Notes
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Upcoming Calls */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Upcoming Video Calls
            </CardTitle>
            <CardDescription>Scheduled video consultations for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingCalls.map((call) => (
                <div key={call.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-medical rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {call.patient.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="font-semibold">{call.patient}</h4>
                      <p className="text-sm text-muted-foreground">{call.type} • {call.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="font-medium">{call.time}</p>
                      <Badge variant="secondary">{call.status}</Badge>
                    </div>
                    <Button size="sm" className="bg-gradient-medical">
                      <Video className="mr-2 h-4 w-4" />
                      Join
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Calls */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Recent Video Consultations</CardTitle>
            <CardDescription>Completed video calls and notes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCalls.map((call) => (
                <div key={call.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                      <Video className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{call.patient}</h4>
                      <p className="text-sm text-muted-foreground">{call.notes}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{call.date}</p>
                    <p className="text-sm text-muted-foreground">{call.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default VideoConsultation;