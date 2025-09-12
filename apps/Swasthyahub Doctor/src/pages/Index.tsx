import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ArrowRight, Shield, Users, Calendar, Video, FileText, Stethoscope, Star, CheckCircle, Zap } from "lucide-react";
import heroImage from "@/assets/medical-hero.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Stethoscope className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary">Swasthyahub Plus</h1>
          </div>
          <div className="flex gap-4 items-center">
            <ThemeToggle />
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/register">
              <Button className="bg-gradient-medical hover:shadow-medical">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5"></div>
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  <Zap className="h-4 w-4" />
                  Next-Gen Healthcare Platform
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                  Transform Your Medical Practice with{" "}
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Swasthyahub Plus
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl">
                  The all-in-one platform that empowers healthcare professionals with intelligent scheduling, 
                  seamless patient management, and advanced telemedicine capabilities.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button size="lg" className="bg-gradient-medical hover:shadow-medical font-semibold px-8 h-12">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="h-12 px-8">
                    Doctor Login
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>14-day free trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>HIPAA compliant</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 bg-card rounded-2xl shadow-2xl p-8 border">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-muted-foreground ml-4">Dashboard Preview</span>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="h-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded"></div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-16 bg-muted rounded-lg"></div>
                      <div className="h-16 bg-muted rounded-lg"></div>
                      <div className="h-16 bg-muted rounded-lg"></div>
                    </div>
                    <div className="h-32 bg-muted rounded-lg"></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-20 bg-muted rounded-lg"></div>
                      <div className="h-20 bg-muted rounded-lg"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-accent rounded-full animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Star className="h-4 w-4" />
              Trusted by 10,000+ Healthcare Professionals
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Everything You Need to Run Your Practice
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From appointment scheduling to patient management, our comprehensive platform 
              streamlines every aspect of your medical practice.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-float transition-all duration-300 card-enhanced">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Smart Scheduling</h3>
                <p className="text-muted-foreground leading-relaxed">
                  AI-powered appointment scheduling with automated reminders, conflict detection, and optimal time slot recommendations.
                </p>
              </CardContent>
            </Card>
            
            <Card className="group hover:shadow-float transition-all duration-300 card-enhanced">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Patient Management</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Comprehensive patient records with medical history, treatment plans, and real-time health monitoring.
                </p>
              </CardContent>
            </Card>
            
            <Card className="group hover:shadow-float transition-all duration-300 card-enhanced">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Video className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Telemedicine</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Secure HD video consultations with screen sharing, digital whiteboard, and integrated patient records.
                </p>
              </CardContent>
            </Card>
            
            <Card className="group hover:shadow-float transition-all duration-300 card-enhanced">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Digital Prescriptions</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Electronic prescriptions with drug interaction checks, dosage calculations, and pharmacy integration.
                </p>
              </CardContent>
            </Card>
            
            <Card className="group hover:shadow-float transition-all duration-300 card-enhanced">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">HIPAA Compliant</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Bank-level security with end-to-end encryption, audit trails, and full HIPAA compliance certification.
                </p>
              </CardContent>
            </Card>
            
            <Card className="group hover:shadow-float transition-all duration-300 card-enhanced">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Stethoscope className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Clinical Tools</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Integrated medical calculators, reference databases, and diagnostic tools for enhanced clinical decision-making.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-accent">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Practice?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of healthcare professionals who trust Swasthyahub Plus for their daily operations. 
              Start your free trial today and experience the future of medical practice management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link to="/register">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold px-8 h-12">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 h-12 px-8">
                  Schedule Demo
                </Button>
              </Link>
            </div>
            <div className="flex items-center justify-center gap-8 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>No setup fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Stethoscope className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold text-primary">Swasthyahub Plus</span>
              </div>
              <p className="text-muted-foreground">
                The modern healthcare platform that empowers medical professionals with intelligent tools and seamless workflows.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold">Product</h3>
              <div className="space-y-2 text-muted-foreground">
                <div>Appointments</div>
                <div>Patient Management</div>
                <div>Telemedicine</div>
                <div>Prescriptions</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold">Support</h3>
              <div className="space-y-2 text-muted-foreground">
                <div>Help Center</div>
                <div>Documentation</div>
                <div>API Reference</div>
                <div>Contact Us</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold">Legal</h3>
              <div className="space-y-2 text-muted-foreground">
                <div>Privacy Policy</div>
                <div>Terms of Service</div>
                <div>HIPAA Compliance</div>
                <div>Security</div>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Swasthyahub Plus. All rights reserved. HIPAA compliant and secure.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;