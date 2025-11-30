import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import DroneIcon from '@/components/icons/DroneIcon';
import DroneDispatchModal from '@/components/DroneDispatchModal';
import { ArrowLeft, MapPin, User, Calendar, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  InjuryCategory, 
  InjuryType, 
  injuryCategoryLabels, 
  injuryTypeLabels,
  injuriesByCategory,
  requiresDroneDispatch
} from '@/types';
import { db } from '@/data/mockData';

const UserRequest = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDispatchModal, setShowDispatchModal] = useState(false);
  const [selectedInjuryType, setSelectedInjuryType] = useState<InjuryType | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    location: '',
    injuryCategory: '' as InjuryCategory | '',
    injuryType: '' as InjuryType | '',
    description: ''
  });

  const handleCategoryChange = (value: InjuryCategory) => {
    setFormData({ 
      ...formData, 
      injuryCategory: value,
      injuryType: '' // Reset injury type when category changes
    });
  };

  const handleInjuryTypeChange = (value: InjuryType) => {
    setFormData({ ...formData, injuryType: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.age || !formData.location || !formData.injuryCategory || !formData.injuryType) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create the request in database
      await db.createRequest({
        name: formData.name,
        age: parseInt(formData.age),
        location: formData.location,
        injuryCategory: formData.injuryCategory as InjuryCategory,
        injuryType: formData.injuryType as InjuryType,
        injuryDescription: formData.description,
        status: 'pending',
        priority: requiresDroneDispatch(formData.injuryType as InjuryType) ? 'emergency' : 'normal'
      });

      // Check if this injury type requires immediate drone dispatch
      if (requiresDroneDispatch(formData.injuryType as InjuryType)) {
        setSelectedInjuryType(formData.injuryType as InjuryType);
        setShowDispatchModal(true);
      } else {
        toast({
          title: "Request Submitted",
          description: "Your request has been received. A responder will review it shortly.",
        });
        navigate('/');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const availableInjuryTypes = formData.injuryCategory 
    ? injuriesByCategory[formData.injuryCategory as InjuryCategory] 
    : [];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden py-8">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 max-w-2xl">
        {/* Back button */}
        <Button 
          variant="ghost" 
          className="mb-6"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <Card variant="glow" className="animate-scale-in">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              <DroneIcon size={80} animated />
            </div>
            <CardTitle className="text-3xl text-gradient-primary">Request Assistance</CardTitle>
            <CardDescription className="text-base">
              Fill in the details below to request emergency medical drone assistance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-display font-semibold text-foreground flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Personal Information
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Age *</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="age"
                        type="number"
                        placeholder="Enter age"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        className="pl-10"
                        min="0"
                        max="150"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-4">
                <h3 className="text-lg font-display font-semibold text-foreground flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Location
                </h3>
                <div className="space-y-2">
                  <Label htmlFor="location">Current Location *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Textarea
                      id="location"
                      placeholder="Enter your address or describe your location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="pl-10 min-h-[80px]"
                    />
                  </div>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      // TODO: Implement geolocation
                      toast({
                        title: "Location Services",
                        description: "GPS location feature coming soon.",
                      });
                    }}
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Use My Current Location
                  </Button>
                </div>
              </div>

              {/* Injury Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-display font-semibold text-foreground flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-primary" />
                  Injury Information
                </h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Injury Category *</Label>
                    <Select 
                      value={formData.injuryCategory} 
                      onValueChange={handleCategoryChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {(Object.keys(injuryCategoryLabels) as InjuryCategory[]).map((category) => (
                          <SelectItem key={category} value={category}>
                            {injuryCategoryLabels[category]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.injuryCategory && (
                    <div className="space-y-2 animate-fade-in-up">
                      <Label htmlFor="injuryType">Type of Injury *</Label>
                      <Select 
                        value={formData.injuryType} 
                        onValueChange={handleInjuryTypeChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select injury type" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableInjuryTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {injuryTypeLabels[type]}
                              {requiresDroneDispatch(type) && (
                                <span className="ml-2 text-xs text-destructive">• Critical</span>
                              )}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="description">Additional Details (Optional)</Label>
                    <Textarea
                      id="description"
                      placeholder="Provide any additional information about the situation..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
              </div>

              {/* Critical injury warning */}
              {formData.injuryType && requiresDroneDispatch(formData.injuryType as InjuryType) && (
                <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg animate-fade-in-up">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-destructive">Critical Injury Detected</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        This injury type qualifies for immediate drone dispatch. A medical drone 
                        will be sent to your location upon submission.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <Button 
                type="submit" 
                variant="hero" 
                size="xl"
                className="w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting Request...' : 'Submit Request'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Dispatch Modal */}
      <DroneDispatchModal
        isOpen={showDispatchModal}
        onClose={() => {
          setShowDispatchModal(false);
          navigate('/emergency', { 
            state: { 
              injuryType: selectedInjuryType,
              location: formData.location 
            } 
          });
        }}
        injuryType={selectedInjuryType ? injuryTypeLabels[selectedInjuryType] : undefined}
      />
    </div>
  );
};

export default UserRequest;
