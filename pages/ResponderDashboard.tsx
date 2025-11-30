import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DroneIcon from '@/components/icons/DroneIcon';
import DroneFlightAnimation from '@/components/DroneFlightAnimation';
import SurveillanceModal from '@/components/SurveillanceModal';
import { 
  LogOut, 
  RefreshCw, 
  Send, 
  Eye, 
  MapPin, 
  Clock, 
  User,
  AlertTriangle,
  CheckCircle,
  Loader2,
  Activity,
  Battery
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { DroneRequest, RequestStatus, injuryTypeLabels, injuryCategoryLabels, Drone } from '@/types';
import { mockDroneRequests, mockDrones, db } from '@/data/mockData';

const statusConfig: Record<RequestStatus, { label: string; color: string; icon: React.ReactNode }> = {
  pending: { 
    label: 'Pending', 
    color: 'bg-warning text-warning-foreground', 
    icon: <Clock className="w-3 h-3" /> 
  },
  dispatched: { 
    label: 'Dispatched', 
    color: 'bg-primary text-primary-foreground', 
    icon: <Send className="w-3 h-3" /> 
  },
  in_transit: { 
    label: 'In Transit', 
    color: 'bg-primary text-primary-foreground', 
    icon: <Activity className="w-3 h-3" /> 
  },
  delivered: { 
    label: 'Delivered', 
    color: 'bg-success text-success-foreground', 
    icon: <CheckCircle className="w-3 h-3" /> 
  },
  completed: { 
    label: 'Completed', 
    color: 'bg-success text-success-foreground', 
    icon: <CheckCircle className="w-3 h-3" /> 
  },
  cancelled: { 
    label: 'Cancelled', 
    color: 'bg-muted text-muted-foreground', 
    icon: <AlertTriangle className="w-3 h-3" /> 
  }
};

const ResponderDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [requests, setRequests] = useState<DroneRequest[]>(mockDroneRequests);
  const [drones, setDrones] = useState<Drone[]>(mockDrones);
  const [selectedRequest, setSelectedRequest] = useState<DroneRequest | null>(null);
  const [surveillanceOpen, setSurveillanceOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Sort requests: emergency first, then by creation time
  const sortedRequests = [...requests].sort((a, b) => {
    if (a.priority === 'emergency' && b.priority !== 'emergency') return -1;
    if (b.priority === 'emergency' && a.priority !== 'emergency') return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const pendingRequests = requests.filter(r => r.status === 'pending');
  const activeRequests = requests.filter(r => ['dispatched', 'in_transit'].includes(r.status));
  const availableDrones = drones.filter(d => d.status === 'available');

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // TODO: Replace with actual API call
    const freshRequests = await db.getRequests();
    setRequests(freshRequests);
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Data Refreshed",
        description: "Request list has been updated.",
      });
    }, 1000);
  };

  const handleDispatch = async (request: DroneRequest, droneId: string) => {
    // TODO: Replace with actual API call
    await db.updateRequestStatus(request.id, 'dispatched', droneId);
    
    setRequests(prev => prev.map(r => 
      r.id === request.id 
        ? { ...r, status: 'dispatched' as RequestStatus, droneId, dispatchTime: new Date(), progress: 0 }
        : r
    ));
    
    setDrones(prev => prev.map(d =>
      d.id === droneId ? { ...d, status: 'dispatched' as const } : d
    ));

    toast({
      title: "Drone Dispatched",
      description: `${droneId} dispatched to ${request.location}`,
    });
  };

  const handleSurveillance = (request: DroneRequest) => {
    setSelectedRequest(request);
    setSurveillanceOpen(true);
  };

  // Simulate progress updates for active requests
  useEffect(() => {
    const interval = setInterval(() => {
      setRequests(prev => prev.map(r => {
        if (r.status === 'in_transit' && r.progress !== undefined && r.progress < 100) {
          return { ...r, progress: Math.min(r.progress + 2, 100) };
        }
        if (r.status === 'dispatched' && r.progress !== undefined) {
          return { ...r, status: 'in_transit' as RequestStatus, progress: r.progress + 2 };
        }
        return r;
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <DroneIcon size={40} animated />
              <div>
                <h1 className="text-xl font-display font-bold text-gradient-primary">AeroReach</h1>
                <p className="text-xs text-muted-foreground">Dispatch Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/')}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card variant="gradient">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-display font-bold text-warning">{pendingRequests.length}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </CardContent>
          </Card>
          <Card variant="gradient">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-display font-bold text-primary">{activeRequests.length}</p>
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
            </CardContent>
          </Card>
          <Card variant="gradient">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-display font-bold text-success">{availableDrones.length}</p>
                <p className="text-sm text-muted-foreground">Drones Available</p>
              </div>
            </CardContent>
          </Card>
          <Card variant="gradient">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-display font-bold text-foreground">{requests.length}</p>
                <p className="text-sm text-muted-foreground">Total Today</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Request List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-display font-semibold">Drone Requests</h2>
              <Badge variant="outline" className="font-mono">
                {requests.length} total
              </Badge>
            </div>

            <div className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
              {sortedRequests.map((request) => (
                <Card 
                  key={request.id} 
                  variant={request.priority === 'emergency' ? 'emergency' : 'glow'}
                  className={`transition-all duration-300 ${
                    request.priority === 'emergency' ? 'animate-pulse-emergency' : ''
                  }`}
                >
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            request.priority === 'emergency' ? 'bg-destructive/20' : 'bg-primary/20'
                          }`}>
                            <User className={`w-5 h-5 ${
                              request.priority === 'emergency' ? 'text-destructive' : 'text-primary'
                            }`} />
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{request.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {request.age} years • {request.id}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {request.priority === 'emergency' && (
                            <Badge className="bg-destructive text-destructive-foreground animate-pulse">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              Emergency
                            </Badge>
                          )}
                          <Badge className={statusConfig[request.status].color}>
                            {statusConfig[request.status].icon}
                            <span className="ml-1">{statusConfig[request.status].label}</span>
                          </Badge>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Location</p>
                          <p className="text-sm text-foreground flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-primary" />
                            {request.location}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Injury</p>
                          <p className="text-sm text-foreground">
                            <span className="text-muted-foreground">{injuryCategoryLabels[request.injuryCategory]}: </span>
                            {injuryTypeLabels[request.injuryType]}
                          </p>
                        </div>
                      </div>

                      {/* Flight Progress (for active requests) */}
                      {(request.status === 'dispatched' || request.status === 'in_transit') && 
                       request.progress !== undefined && (
                        <DroneFlightAnimation 
                          progress={request.progress}
                          fromLabel="Dispatch"
                          toLabel={request.location.split(',')[0]}
                        />
                      )}

                      {/* Actions */}
                      <div className="flex items-center gap-2 pt-2 border-t border-border">
                        {request.status === 'pending' && (
                          <Select onValueChange={(droneId) => handleDispatch(request, droneId)}>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select drone..." />
                            </SelectTrigger>
                            <SelectContent>
                              {availableDrones.map((drone) => (
                                <SelectItem key={drone.id} value={drone.id}>
                                  <div className="flex items-center gap-2">
                                    <Battery className="w-3 h-3" />
                                    {drone.name} ({drone.batteryLevel}%)
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                        
                        {(request.status === 'dispatched' || request.status === 'in_transit') && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleSurveillance(request)}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Surveillance
                          </Button>
                        )}

                        <div className="ml-auto text-xs text-muted-foreground">
                          {new Date(request.createdAt).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Drone Fleet Status */}
          <div className="space-y-4">
            <h2 className="text-xl font-display font-semibold">Fleet Status</h2>
            <div className="space-y-3">
              {drones.map((drone) => (
                <Card key={drone.id} variant="gradient">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          drone.status === 'available' ? 'bg-success/20' :
                          drone.status === 'dispatched' ? 'bg-primary/20' :
                          drone.status === 'maintenance' ? 'bg-warning/20' :
                          'bg-muted'
                        }`}>
                          <DroneIcon size={20} />
                        </div>
                        <div>
                          <p className="font-medium text-sm text-foreground">{drone.name}</p>
                          <p className="text-xs text-muted-foreground capitalize">{drone.status}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-sm">
                          <Battery className={`w-4 h-4 ${
                            drone.batteryLevel > 50 ? 'text-success' :
                            drone.batteryLevel > 20 ? 'text-warning' :
                            'text-destructive'
                          }`} />
                          <span className="font-mono">{drone.batteryLevel}%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Surveillance Modal */}
      <SurveillanceModal
        isOpen={surveillanceOpen}
        onClose={() => setSurveillanceOpen(false)}
        requestId={selectedRequest?.id}
        location={selectedRequest?.location}
      />
    </div>
  );
};

export default ResponderDashboard;
