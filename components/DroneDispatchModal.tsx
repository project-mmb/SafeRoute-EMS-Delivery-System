import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import DroneIcon from '@/components/icons/DroneIcon';

interface DroneDispatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  injuryType?: string;
}

const DroneDispatchModal: React.FC<DroneDispatchModalProps> = ({ isOpen, onClose, injuryType }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-primary/30 shadow-glow">
        <DialogHeader>
          <DialogTitle className="text-center font-display text-2xl text-gradient-primary">
            Drone Dispatched
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center py-8 space-y-6">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse" />
            <DroneIcon size={150} animated className="relative z-10" />
          </div>
          
          <div className="text-center space-y-3">
            <p className="text-xl font-medium text-foreground animate-fade-in-up">
              Hang tight, help is on the way!
            </p>
            {injuryType && (
              <p className="text-sm text-muted-foreground animate-fade-in-up delay-200">
                Responding to: <span className="text-primary font-medium">{injuryType}</span>
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground animate-fade-in-up delay-300">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span>Medical supplies en route</span>
          </div>

          <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
            <div className="h-full bg-gradient-primary animate-[pulse_1.5s_ease-in-out_infinite] w-3/4" />
          </div>
          
          <p className="text-xs text-muted-foreground">
            ETA: ~5-10 minutes depending on your location
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DroneDispatchModal;
