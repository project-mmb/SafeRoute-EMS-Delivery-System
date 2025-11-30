import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DroneIcon from '@/components/icons/DroneIcon';
import DroneFlightAnimation from '@/components/DroneFlightAnimation';
import { ArrowLeft, MapPin, Clock, Heart, Phone, CheckCircle } from 'lucide-react';
import { InjuryType, injuryTypeLabels } from '@/types';
import { emergencyTips } from '@/data/mockData';

const Emergency = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [eta, setEta] = useState(8);
  const [progress, setProgress] = useState(0);
  
  const injuryType = (location.state?.injuryType as InjuryType) || 'other';
  const userLocation = location.state?.location || 'Location being acquired...';
  const tips = emergencyTips[injuryType] || emergencyTips.other;

  // Simulate drone progress
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 300);

    const etaInterval = setInterval(() => {
      setEta((prev) => {
        if (prev <= 0) {
          clearInterval(etaInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 60000); // Decrease ETA every minute

    return () => {
      clearInterval(progressInterval);
      clearInterval(etaInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Emergency pulsing background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent animate-pulse" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Home
          </Button>
          <div className="flex items-center gap-2 text-destructive">
            <div className="w-3 h-3 rounded-full bg-destructive animate-pulse" />
            <span className="font-display font-bold">EMERGENCY ACTIVE</span>
          </div>
        </div>

        {/* Main content */}
        <div className="space-y-6">
          {/* Status card */}
          <Card variant="emergency" className="animate-scale-in">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/30 rounded-full blur-2xl animate-pulse" />
                  <DroneIcon size={120} animated className="relative z-10" />
                </div>
                
                <div>
                  <h1 className="text-3xl font-display font-bold text-gradient-primary mb-2">
                    Help is on the way!
                  </h1>
                  <p className="text-muted-foreground">
                    Medical drone dispatched for: {injuryTypeLabels[injuryType]}
                  </p>
                </div>

                {/* ETA */}
                <div className="flex items-center gap-6 p-4 bg-secondary/50 rounded-xl">
                  <div className="text-center">
                    <Clock className="w-8 h-8 text-primary mx-auto mb-1" />
                    <p className="text-3xl font-display font-bold text-foreground">{eta}</p>
                    <p className="text-xs text-muted-foreground">Minutes ETA</p>
                  </div>
                  <div className="w-px h-12 bg-border" />
                  <div className="text-center">
                    <MapPin className="w-8 h-8 text-primary mx-auto mb-1" />
                    <p className="text-sm font-medium text-foreground line-clamp-2 max-w-[150px]">
                      {userLocation}
                    </p>
                    <p className="text-xs text-muted-foreground">Your Location</p>
                  </div>
                </div>

                {/* Flight animation */}
                <div className="w-full">
                  <DroneFlightAnimation 
                    progress={progress} 
                    fromLabel="Dispatch Center"
                    toLabel="Your Location"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tips card */}
          <Card variant="glow" className="animate-fade-in-up delay-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Heart className="w-5 h-5 text-destructive" />
                While You Wait - Important Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {tips.map((tip, index) => (
                  <li 
                    key={index} 
                    className="flex items-start gap-3 animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Emergency contact */}
          <Card variant="gradient" className="animate-fade-in-up delay-300">
            <CardContent className="py-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-destructive/20 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-destructive" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Need immediate human assistance?</p>
                    <p className="text-sm text-muted-foreground">Call emergency services directly</p>
                  </div>
                </div>
                <Button variant="destructive" size="lg">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Emergency: 911
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Status updates */}
          <Card variant="gradient" className="animate-fade-in-up delay-400">
            <CardHeader>
              <CardTitle className="text-lg">Status Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full bg-success mt-1.5" />
                  <div>
                    <p className="font-medium text-foreground">Request received</p>
                    <p className="text-xs text-muted-foreground">Just now</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full bg-success mt-1.5" />
                  <div>
                    <p className="font-medium text-foreground">Drone dispatched</p>
                    <p className="text-xs text-muted-foreground">Just now</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full bg-primary animate-pulse mt-1.5" />
                  <div>
                    <p className="font-medium text-foreground">En route to your location</p>
                    <p className="text-xs text-muted-foreground">In progress</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full bg-muted mt-1.5" />
                  <div>
                    <p className="font-medium text-muted-foreground">Delivery</p>
                    <p className="text-xs text-muted-foreground">Pending</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Emergency;
