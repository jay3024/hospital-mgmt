import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const CustomSidebarTrigger = () => {
  const { toggleSidebar, isMobile } = useSidebar();
  
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleSidebar}
      className={`text-muted-foreground hover:text-foreground transition-colors ${
        isMobile ? 'h-10 w-10' : 'h-8 w-8'
      }`}
    >
      <Menu className={`${isMobile ? 'h-5 w-5' : 'h-4 w-4'}`} />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
};

const DashboardLayout = () => {
  const isMobile = useIsMobile();
  
  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="h-14 border-b border-border bg-card shadow-sm flex items-center justify-between px-4 sticky top-0 z-10">
            <div className="flex items-center space-x-3">
              <CustomSidebarTrigger />
              <h1 className="text-lg font-semibold text-foreground hidden sm:block">
                SwasthyaHub Admin
              </h1>
            </div>
          </header>
          
          {/* Main Content */}
          <main className="flex-1 p-4 md:p-6 overflow-auto">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;