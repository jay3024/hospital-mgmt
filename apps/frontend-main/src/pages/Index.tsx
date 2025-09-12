import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import ThemeToggle from '../components/ThemeToggle';
import HealthButton from '../components/ui/HealthButton';
import { 
  Heart, 
  Stethoscope, 
  Calendar, 
  Video, 
  Activity, 
  Brain, 
  Pill, 
  Shield, 
  Clock, 
  Users, 
  Award,
  ArrowRight,
  CheckCircle,
  Star,
  Phone,
  Mail,
  MapPin,
  Play,
  ChevronDown,
  Menu,
  X,
  Zap,
  Sparkles,
  TrendingUp,
  Globe,
  Lock
} from 'lucide-react';

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-rotate features
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 4000);

    // Scroll listener for parallax effects
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const features = [
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Smart Appointments",
      description: "Book, reschedule, and manage appointments with ease",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Video className="w-8 h-8" />,
      title: "Virtual Consultations",
      description: "Connect with doctors from anywhere, anytime",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: "Health Tracking",
      description: "Monitor your vital signs and wellness journey",
      color: "from-green-500 to-emerald-500"
    }
  ];

  const stats = [
    { number: "50K+", label: "Happy Patients", icon: <Users className="w-6 h-6" />, delay: "0ms" },
    { number: "200+", label: "Expert Doctors", icon: <Stethoscope className="w-6 h-6" />, delay: "200ms" },
    { number: "24/7", label: "Support Available", icon: <Clock className="w-6 h-6" />, delay: "400ms" },
    { number: "99%", label: "Satisfaction Rate", icon: <Award className="w-6 h-6" />, delay: "600ms" }
  ];

  const services = [
    {
      icon: <Heart className="w-10 h-10 text-red-500" />,
      title: "Primary Care",
      description: "Comprehensive health checkups and preventive care",
      gradient: "from-red-500 to-pink-500"
    },
    {
      icon: <Brain className="w-10 h-10 text-purple-500" />,
      title: "Mental Health",
      description: "Professional counseling and therapy sessions",
      gradient: "from-purple-500 to-indigo-500"
    },
    {
      icon: <Pill className="w-10 h-10 text-blue-500" />,
      title: "Pharmacy",
      description: "Prescription management and medication delivery",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Shield className="w-10 h-10 text-green-500" />,
      title: "Emergency Care",
      description: "24/7 emergency medical support and guidance",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Patient",
      content: "SwasthyaHub transformed my healthcare experience. The virtual consultations are so convenient!",
      rating: 5,
      avatar: "SJ"
    },
    {
      name: "Dr. Michael Chen",
      role: "Cardiologist",
      content: "The platform makes it easy to connect with patients and provide quality care remotely.",
      rating: 5,
      avatar: "MC"
    },
    {
      name: "Emily Rodriguez",
      role: "Patient",
      content: "The health tracking features help me stay on top of my wellness goals every day.",
      rating: 5,
      avatar: "ER"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-x-hidden">
      {/* Floating Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-secondary/10 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-green-500/10 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-purple-500/10 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Logo size="md" />
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <nav className="flex items-center space-x-8">
                <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors font-medium">Features</a>
                <a href="#services" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors font-medium">Services</a>
                <a href="#testimonials" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors font-medium">Testimonials</a>
                <a href="#contact" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors font-medium">Contact</a>
              </nav>
              <ThemeToggle />
              <div className="flex items-center space-x-3">
                <Link to="/signin">
                  <HealthButton variant="outline" size="sm">
                    Sign In
                  </HealthButton>
                </Link>
                <Link to="/signup">
                  <HealthButton size="sm">
                    Get Started
                  </HealthButton>
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-4">
              <ThemeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-gray-200 dark:border-gray-700">
              <nav className="flex flex-col space-y-4 mt-4">
                <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors font-medium">Features</a>
                <a href="#services" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors font-medium">Services</a>
                <a href="#testimonials" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors font-medium">Testimonials</a>
                <a href="#contact" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors font-medium">Contact</a>
                <div className="flex flex-col space-y-2 pt-4">
                  <Link to="/signin">
                    <HealthButton variant="outline" size="sm" className="w-full">
                      Sign In
                    </HealthButton>
                  </Link>
                  <Link to="/signup">
                    <HealthButton size="sm" className="w-full">
                      Get Started
                    </HealthButton>
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className={`space-y-6 sm:space-y-8 transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-[-100px] opacity-0'}`}>
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium animate-pulse">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Your Health, Our Priority
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                  Modern Healthcare
                  <span className="block text-primary bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Made Simple
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                  Experience seamless healthcare with our comprehensive platform. 
                  Connect with expert doctors, track your wellness, and manage your health journey all in one place.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <HealthButton size="lg" className="group w-full sm:w-auto">
                    <Zap className="w-5 h-5 mr-2" />
                    Start Your Journey
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </HealthButton>
                </Link>
                <button className="flex items-center justify-center px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary transition-colors w-full sm:w-auto">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 border-2 border-white dark:border-gray-800" />
                  ))}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <div className="font-semibold">50,000+ patients</div>
                  <div>trust us with their health</div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <Lock className="w-4 h-4 text-green-500" />
                  <span>HIPAA Compliant</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <Globe className="w-4 h-4 text-blue-500" />
                  <span>Available 24/7</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <Shield className="w-4 h-4 text-purple-500" />
                  <span>Secure & Private</span>
                </div>
              </div>
            </div>

            <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-[100px] opacity-0'}`}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-3xl animate-pulse"></div>
                <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 shadow-2xl transform hover:scale-105 transition-transform duration-300">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="text-sm text-gray-500">SwasthyaHub Connect</div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <div className="font-semibold">Next Appointment</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Dr. Sarah Wilson - Today 2:30 PM</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 text-center">
                          <div className="text-2xl font-bold text-green-600">72</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Heart Rate</div>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-center">
                          <div className="text-2xl font-bold text-blue-600">120/80</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Blood Pressure</div>
                        </div>
                      </div>

                      {/* Live Activity */}
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-sm font-medium">Live Activity</span>
                          </div>
                          <TrendingUp className="w-4 h-4 text-green-500" />
                        </div>
                        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                          Your health metrics are being monitored
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-20 px-4 sm:px-6 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose SwasthyaHub?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Experience healthcare reimagined with cutting-edge technology and compassionate care
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`text-center p-6 sm:p-8 rounded-2xl transition-all duration-500 transform hover:scale-105 ${
                  activeFeature === index 
                    ? `bg-gradient-to-br ${feature.color} text-white shadow-2xl scale-105` 
                    : 'bg-gray-50 dark:bg-gray-700 hover:bg-primary/5'
                }`}
              >
                <div className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center ${
                  activeFeature === index 
                    ? 'bg-white/20' 
                    : 'bg-primary/10'
                }`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className={`${
                  activeFeature === index 
                    ? 'text-white/90' 
                    : 'text-gray-600 dark:text-gray-300'
                }`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-r from-primary to-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center text-white"
                style={{animationDelay: stat.delay}}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center animate-bounce" style={{animationDelay: stat.delay}}>
                    {stat.icon}
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-bold mb-2 animate-pulse">{stat.number}</div>
                <div className="text-white/80 text-sm sm:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 sm:py-20 px-4 sm:px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Comprehensive Healthcare Services
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From routine checkups to specialized care, we've got you covered
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br ${service.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 sm:py-20 px-4 sm:px-6 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Users Say
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Real stories from patients and healthcare professionals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 sm:p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-semibold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Transform Your Healthcare Experience?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8">
            Join thousands of patients who trust SwasthyaHub for their healthcare needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <HealthButton size="lg" className="group w-full sm:w-auto">
                <Sparkles className="w-5 h-5 mr-2" />
                Get Started Today
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </HealthButton>
            </Link>
            <Link to="/signin">
              <HealthButton variant="outline" size="lg" className="w-full sm:w-auto">
                Sign In
              </HealthButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Logo size="md" />
              <p className="text-gray-400">
                Transforming healthcare through technology and compassion.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                  <MapPin className="w-5 h-5" />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Appointments</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Video Consultations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Health Tracking</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pharmacy</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Emergency</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Feedback</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SwasthyaHub Connect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
