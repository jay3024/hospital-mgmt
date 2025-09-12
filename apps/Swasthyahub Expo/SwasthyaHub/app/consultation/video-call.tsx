import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  MessageCircle,
  FileText,
  Settings
} from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const { width, height } = Dimensions.get('window');

export default function VideoCallScreen() {
  const { colors } = useTheme();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [showChat, setShowChat] = useState(false);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Doctor Video View */}
      <View style={[styles.doctorVideo, { backgroundColor: colors.surface }]}>
        <View style={styles.videoPlaceholder}>
          <Text style={[styles.videoText, { color: colors.text }]}>
            Dr. Sarah Johnson
          </Text>
          <Text style={[styles.videoSubtext, { color: colors.textSecondary }]}>
            Cardiologist
          </Text>
        </View>
      </View>

      {/* Patient Video View (Picture-in-Picture) */}
      <View style={[styles.patientVideo, { backgroundColor: colors.accent }]}>
        <View style={styles.pipPlaceholder}>
          <Text style={[styles.pipText, { color: colors.text }]}>You</Text>
        </View>
      </View>

      {/* Call Controls */}
      <View style={[styles.controls, { backgroundColor: colors.surface }]}>
        <TouchableOpacity
          style={[
            styles.controlButton,
            isMuted && { backgroundColor: colors.error + '20' }
          ]}
          onPress={() => setIsMuted(!isMuted)}
        >
          {isMuted ? (
            <MicOff size={24} color={colors.error} />
          ) : (
            <Mic size={24} color={colors.text} />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.controlButton,
            isVideoOff && { backgroundColor: colors.error + '20' }
          ]}
          onPress={() => setIsVideoOff(!isVideoOff)}
        >
          {isVideoOff ? (
            <VideoOff size={24} color={colors.error} />
          ) : (
            <Video size={24} color={colors.text} />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.controlButton]}
          onPress={() => setShowChat(!showChat)}
        >
          <MessageCircle size={24} color={colors.text} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton}>
          <FileText size={24} color={colors.text} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton}>
          <Settings size={24} color={colors.text} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.endCallButton, { backgroundColor: colors.error }]}
        >
          <Phone size={24} color={colors.secondary} />
        </TouchableOpacity>
      </View>

      {/* Chat Sidebar */}
      {showChat && (
        <View style={[styles.chatSidebar, { backgroundColor: colors.surface }]}>
          <Text style={[styles.chatTitle, { color: colors.text }]}>Chat</Text>
          <View style={styles.chatMessages}>
            <Text style={[styles.chatMessage, { color: colors.textSecondary }]}>
              Chat messages would appear here...
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  doctorVideo: {
    flex: 1,
    margin: 16,
    marginTop: 60,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoPlaceholder: {
    alignItems: 'center',
  },
  videoText: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  videoSubtext: {
    fontSize: 16,
  },
  patientVideo: {
    position: 'absolute',
    top: 80,
    right: 16,
    width: 120,
    height: 160,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pipPlaceholder: {
    alignItems: 'center',
  },
  pipText: {
    fontSize: 14,
    fontWeight: '600',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  controlButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
  },
  endCallButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatSidebar: {
    position: 'absolute',
    right: 0,
    top: 60,
    bottom: 100,
    width: width * 0.4,
    padding: 16,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  chatTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  chatMessages: {
    flex: 1,
  },
  chatMessage: {
    fontSize: 14,
  },
});