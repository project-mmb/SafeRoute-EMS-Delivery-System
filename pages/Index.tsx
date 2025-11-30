import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DroneIcon from '@/components/icons/DroneIcon';
import { User, Radio, AlertTriangle } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <main className="relative z-10 container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-screen">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-16 animate-fade-in-up">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-primary/15 rounded-full blur-3xl animate-pulse scale-150" />
            <DroneIcon size={180} animated className="relative z-10" />
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-wider text-gradient-primary mb-4">
            AeroReach
          </h1>
          <p className="text-lg text-muted-foreground text-center max-w-md">
            Emergency Medical Services powered by advanced drone dispatch technology
          </p>
        </div>

        {/* Cards Section */}
        <div className="grid md:grid-cols-2 gap-8 w-full max-w-3xl mb-8 animate-fade-in-up delay-200">
          {/* User Card */}
          <Card variant="glow" className="group hover:scale-[1.02] transition-transform duration-300">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <User className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">User Portal</CardTitle>
              <CardDescription>
                Request emergency medical drone assistance
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center pb-6">
              <Button 
                variant="hero" 
                size="lg"
                onClick={() => navigate('/user/login')}
                className="w-full max-w-xs"
              >
                User Login
              </Button>
            </CardContent>
          </Card>

          {/* Responder Card */}
          <Card variant="glow" className="group hover:scale-[1.02] transition-transform duration-300">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Radio className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Responder Portal</CardTitle>
              <CardDescription>
                Dispatch and manage emergency drone fleet
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center pb-6">
              <Button 
                variant="hero" 
                size="lg"
                onClick={() => navigate('/responder/login')}
                className="w-full max-w-xs"
              >
                Responder Login
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Bar */}
        <div 
          className="w-full max-w-3xl animate-fade-in-up delay-300 cursor-pointer group"
          onClick={() => navigate('/emergency')}
        >
          <div className="bg-gradient-emergency rounded-xl p-6 shadow-emergency hover:shadow-[0_0_60px_hsl(270_70%_55%_/_0.5)] transition-all duration-300 group-hover:scale-[1.01]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-background/20 flex items-center justify-center animate-pulse">
                  <AlertTriangle className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-accent-foreground">
                    EMERGENCY
                  </h3>
                  <p className="text-sm text-accent-foreground/80">
                    Immediate assistance - Priority dispatch
                  </p>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="border-accent-foreground/30 text-accent-foreground hover:bg-accent-foreground/10 hover:text-accent-foreground"
              >
                Request Now
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-muted-foreground animate-fade-in-up delay-400">
          <p>© 2024 AeroReach. Saving lives through innovation.</p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
