
import React, { useState } from 'react';
import HealthCard from '../components/ui/HealthCard';
import HealthButton from '../components/ui/HealthButton';
import HealthInput from '../components/ui/HealthInput';
import { Brain, Heart, MessageCircle, Phone, Video, Book, Users, Calendar } from 'lucide-react';

const MentalHealthSupport = () => {
  const [moodScore, setMoodScore] = useState(5);

  const resources = [
    { title: 'Anxiety Management', type: 'Article', duration: '5 min read' },
    { title: 'Meditation Guide', type: 'Audio', duration: '10 min' },
    { title: 'Stress Relief Techniques', type: 'Video', duration: '15 min' },
    { title: 'Sleep Hygiene Tips', type: 'Article', duration: '8 min read' }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Mental Health Support</h1>
          <p className="text-muted-foreground">Your mental wellness companion</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Mood Tracker */}
            <HealthCard icon={<Heart size={24} />} header="Daily Mood Check">
              <div className="space-y-4">
                <p className="text-muted-foreground">How are you feeling today?</p>
                <div className="flex items-center space-x-4">
                  <span className="text-sm">Poor</span>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={moodScore}
                    onChange={(e) => setMoodScore(Number(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-sm">Excellent</span>
                </div>
                <div className="text-center">
                  <span className="text-2xl font-bold text-primary">{moodScore}/10</span>
                </div>
                <HealthInput
                  label="Notes (Optional)"
                  placeholder="How was your day?"
                  className="mt-4"
                />
                <HealthButton>Save Mood Entry</HealthButton>
              </div>
            </HealthCard>

            {/* Professional Help */}
            <HealthCard icon={<Brain size={24} />} header="Professional Support">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <HealthButton icon={<Video size={16} />} variant="success">
                  Video Therapy
                </HealthButton>
                <HealthButton icon={<Phone size={16} />} variant="secondary">
                  Crisis Hotline
                </HealthButton>
                <HealthButton icon={<MessageCircle size={16} />} variant="outline">
                  Chat Support
                </HealthButton>
                <HealthButton icon={<Calendar size={16} />} variant="outline">
                  Book Session
                </HealthButton>
              </div>
            </HealthCard>

            {/* Self-Help Resources */}
            <HealthCard icon={<Book size={24} />} header="Self-Help Resources">
              <div className="space-y-3">
                {resources.map((resource, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                    <div>
                      <h4 className="font-medium">{resource.title}</h4>
                      <p className="text-sm text-muted-foreground">{resource.type} • {resource.duration}</p>
                    </div>
                    <HealthButton size="sm" variant="outline">
                      Access
                    </HealthButton>
                  </div>
                ))}
              </div>
            </HealthCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <HealthCard icon={<Users size={24} />} header="Support Groups">
              <div className="space-y-3">
                <div className="p-3 border border-border rounded-lg">
                  <h4 className="font-medium">Anxiety Support</h4>
                  <p className="text-sm text-muted-foreground">Join weekly discussions</p>
                </div>
                <div className="p-3 border border-border rounded-lg">
                  <h4 className="font-medium">Depression Support</h4>
                  <p className="text-sm text-muted-foreground">Peer support group</p>
                </div>
                <HealthButton fullWidth variant="outline">
                  Browse All Groups
                </HealthButton>
              </div>
            </HealthCard>

            <HealthCard header="Emergency Contacts">
              <div className="space-y-3">
                <div className="text-center p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <h4 className="font-bold text-destructive">Crisis Hotline</h4>
                  <p className="text-lg font-mono">988</p>
                  <p className="text-sm text-muted-foreground">24/7 Support</p>
                </div>
                <HealthButton fullWidth variant="danger">
                  Emergency Help
                </HealthButton>
              </div>
            </HealthCard>

            <HealthCard header="Quick Actions">
              <div className="space-y-2">
                <HealthButton fullWidth variant="outline" size="sm">
                  Breathing Exercise
                </HealthButton>
                <HealthButton fullWidth variant="outline" size="sm">
                  Guided Meditation
                </HealthButton>
                <HealthButton fullWidth variant="outline" size="sm">
                  Relaxation Music
                </HealthButton>
              </div>
            </HealthCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentalHealthSupport;
