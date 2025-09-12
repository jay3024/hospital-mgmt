
import React from 'react';
import HealthCard from '../components/ui/HealthCard';
import VideoCall from '../components/VideoCall';
import HealthButton from '../components/ui/HealthButton';
import { FileText, Camera, Mic, MicOff, VideoIcon, Phone, MessageSquare } from 'lucide-react';

const DoctorPatientConsultation = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Doctor-Patient Consultation</h1>
          <p className="text-muted-foreground">Secure video consultation platform</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Call Section */}
          <div className="lg:col-span-2">
            <HealthCard>
              <VideoCall />
            </HealthCard>
          </div>

          {/* Consultation Tools */}
          <div className="space-y-6">
            <HealthCard header="Consultation Tools">
              <div className="space-y-3">
                <HealthButton fullWidth variant="outline" icon={<FileText size={16} />}>
                  Medical Records
                </HealthButton>
                <HealthButton fullWidth variant="outline" icon={<Camera size={16} />}>
                  Prescription Pad
                </HealthButton>
                <HealthButton fullWidth variant="outline" icon={<MessageSquare size={16} />}>
                  Chat
                </HealthButton>
              </div>
            </HealthCard>

            <HealthCard header="Call Controls">
              <div className="grid grid-cols-2 gap-3">
                <HealthButton variant="success" icon={<Mic size={16} />}>
                  Mute
                </HealthButton>
                <HealthButton variant="success" icon={<VideoIcon size={16} />}>
                  Video
                </HealthButton>
                <HealthButton variant="warning" icon={<Phone size={16} />}>
                  Hold
                </HealthButton>
                <HealthButton variant="danger" icon={<Phone size={16} />}>
                  End Call
                </HealthButton>
              </div>
            </HealthCard>

            <HealthCard header="Patient Information">
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium">Name:</span> John Doe
                </div>
                <div>
                  <span className="font-medium">Age:</span> 35
                </div>
                <div>
                  <span className="font-medium">Condition:</span> Follow-up
                </div>
                <div>
                  <span className="font-medium">Last Visit:</span> Dec 15, 2023
                </div>
              </div>
            </HealthCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorPatientConsultation;
