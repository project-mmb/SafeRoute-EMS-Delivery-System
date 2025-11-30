import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Video, VideoOff, Maximize2, Volume2, VolumeX } from 'lucide-react';

interface SurveillanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  requestId?: string;
  location?: string;
}

const SurveillanceModal: React.FC<SurveillanceModalProps> = ({ 
  isOpen, 
  onClose, 
  requestId,
  location 
}) => {
  const [isMuted, setIsMuted] = React.useState(true);
  const [isStreaming, setIsStreaming] = React.useState(true);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl bg-card border-primary/30">
        <DialogHeader>
          <DialogTitle className="font-display text-xl text-gradient-primary flex items-center gap-2">
            <Video className="w-5 h-5 text-primary" />
            Live Surveillance Feed
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Video feed placeholder */}
          <div className="relative aspect-video bg-secondary rounded-lg overflow-hidden">
            {/* Simulated video feed */}
            <div className="absolute inset-0 bg-gradient-to-br from-secondary via-card to-secondary">
              {/* Scan line effect */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-full h-1 bg-primary/30 animate-scan-line" />
              </div>
              
              {/* Grid overlay */}
              <div 
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `
                    linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
                    linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)
                  `,
                  backgroundSize: '50px 50px'
                }}
              />

              {/* Center crosshair */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 border-2 border-primary/50 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                </div>
              </div>

              {/* Feed info overlay */}
              <div className="absolute top-4 left-4 flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${isStreaming ? 'bg-destructive animate-pulse' : 'bg-muted'}`} />
                  <span className="text-xs font-mono text-foreground/80">
                    {isStreaming ? 'LIVE' : 'OFFLINE'}
                  </span>
                </div>
                <span className="text-xs font-mono text-muted-foreground">
                  Request: {requestId || 'N/A'}
                </span>
                <span className="text-xs font-mono text-muted-foreground">
                  Location: {location || 'Acquiring...'}
                </span>
              </div>

              {/* Timestamp */}
              <div className="absolute top-4 right-4 text-xs font-mono text-foreground/80">
                {new Date().toLocaleTimeString()}
              </div>

              {/* No feed message */}
              {!isStreaming && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                  <div className="text-center space-y-2">
                    <VideoOff className="w-12 h-12 mx-auto text-muted-foreground" />
                    <p className="text-muted-foreground">Feed unavailable</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsStreaming(!isStreaming)}
              >
                {isStreaming ? <VideoOff className="w-4 h-4 mr-1" /> : <Video className="w-4 h-4 mr-1" />}
                {isStreaming ? 'Stop' : 'Start'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <VolumeX className="w-4 h-4 mr-1" /> : <Volume2 className="w-4 h-4 mr-1" />}
                {isMuted ? 'Unmute' : 'Mute'}
              </Button>
            </div>
            <Button variant="outline" size="sm">
              <Maximize2 className="w-4 h-4 mr-1" />
              Fullscreen
            </Button>
          </div>

          {/* Status info */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-secondary/50 rounded-lg">
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Altitude</p>
              <p className="font-mono text-lg text-primary">120m</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Battery</p>
              <p className="font-mono text-lg text-success">87%</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Signal</p>
              <p className="font-mono text-lg text-primary">Strong</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SurveillanceModal;
