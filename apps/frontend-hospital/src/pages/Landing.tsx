import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import heroImage from "@/assets/hero-dashboard.jpg";
import { 
  Stethoscope, 
  Users, 
  FileText, 
  Calendar, 
  Shield, 
  Activity,
  Heart,
  UserCheck,
  Building2,
  ArrowRight,
  Phone,
  Mail,
  MapPin
} from "lucide-react";

export default function Landing() {
  const features = [
    {
      icon: Users,
      title: "Patient Management",
      description: "Comprehensive patient records, medical history, and appointment scheduling."
    },
    {
      icon: UserCheck,
      title: "Doctor Management", 
      description: "Manage doctor profiles, schedules, and track performance metrics."
    },
    {
      icon: Building2,
      title: "Department Organization",
      description: "Organize departments, allocate resources, and monitor operations."
    },
    {
      icon: FileText,
      title: "Medical Records",
      description: "Secure digital storage of patient records and case files."
    },
    {
      icon: Calendar,
      title: "Appointment System",
      description: "Smart scheduling system for appointments and procedures."
    },
    {
      icon: Activity,
      title: "Analytics & Reports",
      description: "Comprehensive reporting and analytics for better decision making."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Stethoscope className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
                Swasthyahub Pro
              </span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-muted-foreground hover:text-primary medical-transition">
                Features
              </a>
              <a href="#about" className="text-muted-foreground hover:text-primary medical-transition">
                About
              </a>
              <a href="#contact" className="text-muted-foreground hover:text-primary medical-transition">
                Contact
              </a>
              <ThemeToggle />
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/register">
                <Button className="gradient-primary text-primary-foreground">Get Started</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex justify-start mb-6 lg:hidden">
                <div className="p-4 bg-primary/10 rounded-full shadow-glow">
                  <Heart className="h-16 w-16 text-primary" />
                </div>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Professional 
                <span className="gradient-hero bg-clip-text text-transparent"> Hospital Management </span>
                Made Simple
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8">
                Streamline your healthcare operations with our comprehensive hospital management system. 
                Manage patients, doctors, departments, and medical records all in one place.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button size="lg" className="gradient-primary text-primary-foreground shadow-medical">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button size="lg" variant="outline">
                    View Demo
                  </Button>
                </Link>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 blur-2xl rounded-3xl"></div>
                <img 
                  src={heroImage} 
                  alt="Hospital Management Dashboard Interface"
                  className="relative w-full h-auto rounded-2xl shadow-medical"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Everything You Need for
              <span className="text-primary"> Healthcare Management</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive platform provides all the tools you need to run a modern healthcare facility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-card hover:shadow-medical medical-transition">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Trusted by Healthcare Professionals Worldwide
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              Swasthyahub Pro is designed by healthcare professionals for healthcare professionals. 
              Our platform combines cutting-edge technology with deep understanding of healthcare workflows 
              to deliver a solution that truly works in real-world medical environments.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">500+</div>
                <p className="text-muted-foreground">Hospitals Using Our Platform</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">50K+</div>
                <p className="text-muted-foreground">Healthcare Professionals</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">1M+</div>
                <p className="text-muted-foreground">Patients Managed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Get in Touch</h2>
            <p className="text-lg text-muted-foreground mb-12">
              Ready to transform your healthcare management? Contact our team for a personalized demo.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="flex items-center justify-center space-x-3">
                <Phone className="h-5 w-5 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Mail className="h-5 w-5 text-primary" />
                <span>hello@swasthyahub.com</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Healthcare District, Medical City</span>
              </div>
            </div>
            
            <Link to="/register">
              <Button size="lg" className="gradient-primary text-primary-foreground shadow-medical">
                Start Your Free Trial Today
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-card">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Stethoscope className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Swasthyahub Pro</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <span>© 2024 Swasthyahub Pro. All rights reserved.</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}