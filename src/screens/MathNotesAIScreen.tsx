import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Alert
} from 'react-native';
import { Send, Sparkles, RefreshCw, Camera, Image as ImageIcon } from 'lucide-react-native';
import { AIAssistantService, BOTS_CONFIG } from '../shared/services/aiAssistantService';
import { ChatMessage } from '../shared/types';

export const MathNotesAIScreen: React.FC = () => {
  const botConfig = BOTS_CONFIG['mathnotes_student_ai'];
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `### Welcome to MathNotes AI! ðŸ“\n\nI am your 24/7 conceptual mathematics mentor, calibrated for **STEM (Physics, Chemistry & Math) for Class 8th to 12th, IIT-JEE, NEET UG, and UPSC CSAT**.\n\nUse the **Camera ðŸ“¸** below to **Snap & Solve** any math problem, or ask me about proofs, derivations, or exam shortcuts!`,
      timestamp: new Date().toISOString(),
      suggestedFollowups: botConfig.starters
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const aiService = AIAssistantService.getInstance();

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    setInputText('');
    setIsLoading(true);

    const tempUserMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, tempUserMsg]);

    try {
      const response = await aiService.sendMessage('mathnotes_student_ai', text);
      setMessages(prev => [...prev, response]);
    } catch (error) {
      const errorMsg: ChatMessage = {
        id: `err_${Date.now()}`,
        role: 'assistant',
        content: `I encountered an issue connecting to the RAG knowledge base. Please try again!`,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCameraSnap = async () => {
    if (isLoading) return;

    Alert.alert(
      'ðŸ“¸ Snap & Solve (Camera Vision)',
      'Choose an option to capture your math textbook problem or handwritten doubt:',
      [
        {
          text: 'Snap with Camera',
          onPress: async () => {
            setIsLoading(true);
            const userPhotoMsg: ChatMessage = {
              id: `usr_cam_${Date.now()}`,
              role: 'user',
              content: 'ðŸ“¸ [Photo Captured: Definite Integral King\'s Property Problem]',
              timestamp: new Date().toISOString(),
              imageUri: 'https://mathnotes.courses/wp-content/uploads/sample_integral.png'
            };
            setMessages(prev => [...prev, userPhotoMsg]);

            try {
              const visionResponse = await aiService.solveVisionDoubt(
                'https://mathnotes.courses/wp-content/uploads/sample_integral.png',
                'IIT_JEE_ADVANCED'
              );
              setMessages(prev => [...prev, visionResponse]);
            } catch (err) {
              Alert.alert('Vision Processing Error', 'Could not process equation image. Please re-take in good lighting.');
            } finally {
              setIsLoading(false);
            }
          }
        },
        {
          text: 'Upload from Gallery',
          onPress: async () => {
            setIsLoading(true);
            const userPhotoMsg: ChatMessage = {
              id: `usr_gal_${Date.now()}`,
              role: 'user',
              content: 'ðŸ–¼ï¸ [Gallery Upload: JEE Advanced King\'s Property Problem]',
              timestamp: new Date().toISOString(),
              imageUri: 'https://mathnotes.courses/wp-content/uploads/sample_integral.png'
            };
            setMessages(prev => [...prev, userPhotoMsg]);

            try {
              const visionResponse = await aiService.solveVisionDoubt(
                'https://mathnotes.courses/wp-content/uploads/sample_integral.png',
                'IIT_JEE_ADVANCED'
              );
              setMessages(prev => [...prev, visionResponse]);
            } catch (err) {
              Alert.alert('Vision Error', 'Failed to parse image from gallery.');
            } finally {
              setIsLoading(false);
            }
          }
        },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  useEffect(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 150);
  }, [messages]);

  const renderMessageItem = ({ item }: { item: ChatMessage }) => {
    const isUser = item.role === 'user';
    return (
      <View style={[styles.messageWrapper, isUser ? styles.userWrapper : styles.assistantWrapper]}>
        {!isUser && (
          <View style={styles.botAvatar}>
            <Text style={styles.avatarEmoji}>ðŸ“</Text>
          </View>
        )}
        <View style={[styles.bubble, isUser ? styles.userBubble : styles.assistantBubble]}>
          {item.imageUri && (
            <View style={styles.imageThumbnailBanner}>
              <Camera color="#38BDF8" size={16} />
              <Text style={styles.imageThumbnailText}>Image Analyzed via Math OCR</Text>
            </View>
          )}

          <Text style={[styles.messageText, isUser ? styles.userText : styles.assistantText]}>
            {item.content}
          </Text>

          {item.suggestedFollowups && item.suggestedFollowups.length > 0 && (
            <View style={styles.followupsContainer}>
              <Text style={styles.followupHeader}>ðŸ’¡ Invariant Concept Follow-ups:</Text>
              {item.suggestedFollowups.map((suggestion, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={styles.suggestionChip}
                  onPress={() => handleSend(suggestion)}
                >
                  <Text style={styles.suggestionText}>{suggestion}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.headerIconBg}>
            <Sparkles color="#38BDF8" size={20} />
          </View>
          <View>
            <Text style={styles.headerTitle}>MathNotes AI</Text>
            <Text style={styles.headerSubtitle}>24/7 First-Principles Mentor & Vision Doubt Solver</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.resetBtn}
          onPress={() => setMessages([messages[0]])}
        >
          <RefreshCw color="#94A3B8" size={18} />
        </TouchableOpacity>
      </View>

      {/* Message Stream */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderMessageItem}
        contentContainerStyle={styles.listContent}
      />

      {/* Typing Indicator */}
      {isLoading && (
        <View style={styles.typingIndicator}>
          <ActivityIndicator size="small" color="#38BDF8" />
          <Text style={styles.typingText}>MathNotes AI is extracting OCR & deriving first principles...</Text>
        </View>
      )}

      {/* Input Bar with Camera Snap Button */}
      <View style={styles.inputContainer}>
        <TouchableOpacity
          style={styles.cameraButton}
          onPress={handleCameraSnap}
          disabled={isLoading}
        >
          <Camera color="#38BDF8" size={22} />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Ask a doubt or tap ðŸ“¸ to Snap & Solve..."
          placeholderTextColor="#64748B"
          value={inputText}
          onChangeText={setInputText}
          multiline
          maxLength={1000}
        />

        <TouchableOpacity
          style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
          onPress={() => handleSend()}
          disabled={!inputText.trim() || isLoading}
        >
          <Send color="#FFFFFF" size={18} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
    backgroundColor: '#0F172A',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerIconBg: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#F8FAFC',
    fontSize: 17,
    fontWeight: '700',
  },
  headerSubtitle: {
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 2,
  },
  resetBtn: {
    padding: 8,
  },
  listContent: {
    padding: 16,
    gap: 16,
    paddingBottom: 24,
  },
  messageWrapper: {
    flexDirection: 'row',
    gap: 10,
    maxWidth: '92%',
  },
  userWrapper: {
    alignSelf: 'flex-end',
  },
  assistantWrapper: {
    alignSelf: 'flex-start',
  },
  botAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  avatarEmoji: {
    fontSize: 18,
  },
  bubble: {
    borderRadius: 18,
    padding: 14,
  },
  userBubble: {
    backgroundColor: '#2563EB',
    borderBottomRightRadius: 4,
  },
  assistantBubble: {
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#334155',
    borderBottomLeftRadius: 4,
    flex: 1,
  },
  imageThumbnailBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 8,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
  },
  imageThumbnailText: {
    color: '#38BDF8',
    fontSize: 11,
    fontWeight: '700',
  },
  messageText: {
    fontSize: 14,
    lineHeight: 22,
  },
  userText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  assistantText: {
    color: '#E2E8F0',
  },
  followupsContainer: {
    marginTop: 12,
    gap: 8,
  },
  followupHeader: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '700',
  },
  suggestionChip: {
    backgroundColor: '#0F172A',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  suggestionText: {
    color: '#38BDF8',
    fontSize: 12,
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  typingText: {
    color: '#94A3B8',
    fontSize: 12,
    fontStyle: 'italic',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#1E293B',
    borderTopWidth: 1,
    borderTopColor: '#334155',
    gap: 10,
  },
  cameraButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
    borderWidth: 1,
    borderColor: '#38BDF8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#0F172A',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: '#F8FAFC',
    fontSize: 14,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: '#334155',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#334155',
    opacity: 0.5,
  },
});

