import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export function Layout({ children, className }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        {/* Sidebar - Hidden on mobile, visible on lg+ */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:z-50">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r bg-card/50 backdrop-blur-sm px-6 pb-4">
            <Sidebar />
          </div>
        </div>

        {/* Main content */}
        <div className="lg:pl-64 flex-1 flex flex-col">
          <main className={cn("flex-1", className)}>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
