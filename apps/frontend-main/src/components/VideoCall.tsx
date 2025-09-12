
import React, { useState } from 'react';
import { Video, VideoOff, Mic, MicOff, Phone, PhoneOff, Settings, Users, MessageSquare, MoreVertical } from 'lucide-react';
import HealthButton from './ui/HealthButton';
import HealthCard from './ui/HealthCard';

interface VideoCallProps {
  isDoctor?: boolean;
  patientName?: string;
  doctorName?: string;
  appointmentTime?: string;
  onEndCall?: () => void;
  className?: string;
}

const VideoCall: React.FC<VideoCallProps> = ({
  isDoctor = false,
  patientName = "John Doe",
  doctorName = "Dr. Sarah Johnson",
  appointmentTime = "2:30 PM",
  onEndCall,
  className = '',
}) => {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);

  return (
    <div className={`flex flex-col h-screen bg-gray-900 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gray-800 text-white">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <span className="text-sm font-medium">
              {isDoctor ? patientName.charAt(0) : doctorName.charAt(0)}
            </span>
          </div>
          <div>
            <h3 className="font-medium">
              {isDoctor ? `Consultation with ${patientName}` : `Dr. ${doctorName}`}
            </h3>
            <p className="text-sm text-gray-300">Started at {appointmentTime}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowParticipants(!showParticipants)}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Users className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Video Area */}
      <div className="flex-1 relative bg-gray-900">
        {/* Remote Video (Main) */}
        <div className="w-full h-full bg-gray-800 flex items-center justify-center relative">
          <div className="text-center">
            <div className="w-32 h-32 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl font-medium text-white">
                {isDoctor ? patientName.charAt(0) : doctorName.charAt(0)}
              </span>
            </div>
            <h3 className="text-xl font-medium text-white mb-2">
              {isDoctor ? patientName : doctorName}
            </h3>
            <p className="text-gray-400">
              {isVideoOn ? "Video is on" : "Video is off"}
            </p>
          </div>

          {/* Local Video (Picture-in-Picture) */}
          <div className="absolute top-4 right-4 w-48 h-36 bg-gray-700 rounded-lg overflow-hidden border-2 border-gray-600">
            <div className="w-full h-full flex items-center justify-center">
              {isVideoOn ? (
                <div className="text-center">
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-lg font-medium text-white">You</span>
                  </div>
                  <p className="text-xs text-gray-300">Your video</p>
                </div>
              ) : (
                <div className="text-center">
                  <VideoOff className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-400">Video off</p>
                </div>
              )}
            </div>
          </div>

          {/* Connection Status */}
          <div className="absolute top-4 left-4">
            <div className="flex items-center space-x-2 bg-black/50 px-3 py-2 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-white">Connected</span>
            </div>
          </div>
        </div>

        {/* Chat Sidebar */}
        {showChat && (
          <div className="absolute right-0 top-0 w-80 h-full bg-card border-l border-border">
            <div className="p-4 border-b border-border">
              <h3 className="font-medium">Chat</h3>
            </div>
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
              {/* Chat messages would go here */}
              <div className="text-sm text-muted-foreground text-center">
                No messages yet. Start the conversation!
              </div>
            </div>
            <div className="p-4 border-t border-border">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 border border-input rounded-lg bg-background"
                />
                <HealthButton size="sm">Send</HealthButton>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="p-6 bg-gray-800">
        <div className="flex items-center justify-center space-x-4">
          {/* Mute/Unmute */}
          <button
            onClick={() => setIsAudioOn(!isAudioOn)}
            className={`p-4 rounded-full transition-all duration-200 ${
              isAudioOn 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-red-500 hover:bg-red-600 text-white'
            }`}
          >
            {isAudioOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          </button>

          {/* Video On/Off */}
          <button
            onClick={() => setIsVideoOn(!isVideoOn)}
            className={`p-4 rounded-full transition-all duration-200 ${
              isVideoOn 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-red-500 hover:bg-red-600 text-white'
            }`}
          >
            {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
          </button>

          {/* End Call */}
          <button
            onClick={onEndCall}
            className="p-4 bg-red-500 hover:bg-red-600 rounded-full text-white transition-all duration-200 transform hover:scale-105"
          >
            <PhoneOff className="w-5 h-5" />
          </button>

          {/* Chat Toggle */}
          <button
            onClick={() => setShowChat(!showChat)}
            className={`p-4 rounded-full transition-all duration-200 ${
              showChat 
                ? 'bg-primary hover:bg-primary/90 text-white' 
                : 'bg-gray-700 hover:bg-gray-600 text-white'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
          </button>

          {/* Settings */}
          <button className="p-4 bg-gray-700 hover:bg-gray-600 rounded-full text-white transition-all duration-200">
            <Settings className="w-5 h-5" />
          </button>
        </div>

        {/* Call Duration */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-400">Call duration: 05:23</p>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
