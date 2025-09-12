import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  GraduationCap, 
  Award,
  Calendar,
  Settings,
  Shield,
  Camera
} from "lucide-react";

const Profile = () => {
  const profileData = {
    name: "Dr. John Smith",
    email: "john.smith@hospital.com",
    phone: "+1 (555) 123-4567",
    specialty: "Cardiology",
    hospital: "City General Hospital",
    address: "123 Medical Center Dr, Suite 200",
    city: "New York, NY 10001",
    licenseNumber: "MD123456789",
    experience: "15 years",
    education: "Harvard Medical School",
    bio: "Experienced cardiologist with over 15 years of practice in interventional cardiology and heart disease management."
  };

  const achievements = [
    { title: "Board Certified Cardiologist", year: "2010" },
    { title: "Fellowship in Interventional Cardiology", year: "2009" },
    { title: "American Heart Association Award", year: "2020" },
    { title: "Best Doctor Award 2023", year: "2023" }
  ];

  const statistics = [
    { label: "Total Patients", value: "1,247" },
    { label: "Surgeries Performed", value: "324" },
    { label: "Years of Practice", value: "15" },
    { label: "Patient Satisfaction", value: "4.9/5" }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Profile</h1>
            <p className="text-muted-foreground">Manage your professional information and settings</p>
          </div>
          <Button className="bg-gradient-medical hover:shadow-medical">
            <Settings className="mr-2 h-4 w-4" />
            Account Settings
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Overview */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="shadow-card">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-medical rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                      JS
                    </div>
                    <Button 
                      size="sm" 
                      className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-white shadow-md hover:bg-gray-50"
                      variant="outline"
                    >
                      <Camera className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                  <h2 className="text-xl font-bold">{profileData.name}</h2>
                  <p className="text-muted-foreground mb-2">{profileData.specialty}</p>
                  <Badge className="mb-4" variant="secondary">
                    {profileData.hospital}
                  </Badge>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <MapPin className="h-4 w-4" />
                    <span>New York, NY</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Statistics */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Career Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {statistics.map((stat, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                    <span className="font-semibold text-primary">{stat.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="personal" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="professional">Professional</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="space-y-6">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details and contact information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input id="name" defaultValue={profileData.name} className="pl-10" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input id="email" type="email" defaultValue={profileData.email} className="pl-10" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input id="phone" defaultValue={profileData.phone} className="pl-10" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="specialty">Medical Specialty</Label>
                        <Select defaultValue={profileData.specialty.toLowerCase()}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cardiology">Cardiology</SelectItem>
                            <SelectItem value="dermatology">Dermatology</SelectItem>
                            <SelectItem value="neurology">Neurology</SelectItem>
                            <SelectItem value="orthopedics">Orthopedics</SelectItem>
                            <SelectItem value="pediatrics">Pediatrics</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Textarea 
                          id="address" 
                          defaultValue={`${profileData.address}\n${profileData.city}`}
                          className="pl-10 min-h-[80px]"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Professional Bio</Label>
                      <Textarea 
                        id="bio" 
                        defaultValue={profileData.bio}
                        className="min-h-[100px]"
                        placeholder="Write a brief professional bio..."
                      />
                    </div>

                    <Button className="bg-gradient-medical hover:shadow-medical">
                      Save Changes
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="professional" className="space-y-6">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Professional Details</CardTitle>
                    <CardDescription>Medical credentials and professional information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="hospital">Hospital/Clinic</Label>
                        <div className="relative">
                          <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input id="hospital" defaultValue={profileData.hospital} className="pl-10" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="license">Medical License Number</Label>
                        <div className="relative">
                          <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input id="license" defaultValue={profileData.licenseNumber} className="pl-10" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="education">Medical School</Label>
                        <div className="relative">
                          <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input id="education" defaultValue={profileData.education} className="pl-10" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="experience">Years of Experience</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input id="experience" defaultValue={profileData.experience} className="pl-10" />
                        </div>
                      </div>
                    </div>

                    <Button className="bg-gradient-medical hover:shadow-medical">
                      Update Professional Info
                    </Button>
                  </CardContent>
                </Card>

                {/* Achievements */}
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      Achievements & Certifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {achievements.map((achievement, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                          <div>
                            <h4 className="font-semibold">{achievement.title}</h4>
                            <p className="text-sm text-muted-foreground">Achieved in {achievement.year}</p>
                          </div>
                          <Badge variant="outline">{achievement.year}</Badge>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      <Award className="mr-2 h-4 w-4" />
                      Add Achievement
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="space-y-6">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>Manage your account security and privacy</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Change Password</h4>
                        <div className="space-y-3">
                          <Input type="password" placeholder="Current password" />
                          <Input type="password" placeholder="New password" />
                          <Input type="password" placeholder="Confirm new password" />
                        </div>
                        <Button className="mt-3 bg-gradient-medical hover:shadow-medical">
                          Update Password
                        </Button>
                      </div>

                      <div className="border-t pt-6">
                        <h4 className="font-semibold mb-4">Two-Factor Authentication</h4>
                        <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                          <div>
                            <p className="font-medium">SMS Authentication</p>
                            <p className="text-sm text-muted-foreground">Receive codes via SMS</p>
                          </div>
                          <Button variant="outline">Enable</Button>
                        </div>
                      </div>

                      <div className="border-t pt-6">
                        <h4 className="font-semibold mb-4">Account Actions</h4>
                        <div className="space-y-3">
                          <Button variant="outline" className="w-full justify-start">
                            Export Account Data
                          </Button>
                          <Button variant="destructive" className="w-full justify-start">
                            Delete Account
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;