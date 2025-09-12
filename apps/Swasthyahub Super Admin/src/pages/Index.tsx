import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Shield, ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-redirect to login after a short delay for better UX
    const timer = setTimeout(() => {
      navigate("/login");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-surface flex items-center justify-center p-4">
      <Card className="max-w-md w-full shadow-medical border-0 text-center">
        <CardContent className="p-6 md:p-8">
          {/* Logo */}
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold text-foreground">SwasthyaHub</h1>
              <p className="text-sm text-muted-foreground">Super Admin Panel</p>
            </div>
          </div>

          {/* Welcome Message */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-center space-x-2 text-primary">
              <Shield className="w-5 h-5" />
              <p className="font-medium">Healthcare Management System</p>
            </div>
            <p className="text-muted-foreground text-sm">
              Professional healthcare administration dashboard for managing hospitals, patients, and medical staff.
            </p>
          </div>

          {/* Action Button */}
          <Button 
            onClick={() => navigate("/login")}
            className="w-full bg-gradient-primary hover:opacity-90 shadow-medical transition-smooth"
          >
            Access Admin Panel
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>

          {/* Auto-redirect notice */}
          <p className="text-xs text-muted-foreground mt-4">
            Redirecting to login page...
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
