import { SafeScreen } from "@/components/templates";
import { useNavigation } from "@react-navigation/native";
import React, { type FunctionComponent, useState, useEffect } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  FlatList, 
  TouchableOpacity,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TrackPlayer, { 
  useTrackPlayerEvents,
  Event, 
  State,
  useProgress,
  usePlaybackState
} from 'react-native-track-player';
import Slider from '@react-native-community/slider';

interface MaterialScreenProps {}

interface Material {
  audioUrl?: string;
  id: string;
  pages: number;
  title: string;
  type: string;
}

// Setup TrackPlayer
const setupPlayer = async () => {
  try {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      stopWithApp: true,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_STOP,
        TrackPlayer.CAPABILITY_SEEK_TO
      ]
    });
  } catch (error) {
    console.log('Error setting up player:', error);
  }
};

const MaterialsScreen: FunctionComponent<MaterialScreenProps> = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTrack, setActiveTrack] = useState<string | null>(null);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  
  const navigation = useNavigation();
  const playbackState = usePlaybackState();
  const progress = useProgress();
  
  // Materials data with audio URLs
  const materials: Material[] = [
    {
      id: '1',
      title: 'Annual Financial Report 2024',
      type: 'PDF Document',
      pages: 24,
      // audioUrl: 'https://example.com/audio/financial-report.mp3'
    },
    {
      id: '2',
      title: 'Q4 Sales Report',
      type: 'PDF Document',
      pages: 15,
      // audioUrl: 'https://example.com/audio/sales-report.mp3'
    },
    {
      id: '3',
      title: 'Marketing Strategy 2024',
      type: 'PDF Document',
      pages: 18,
      // audioUrl: 'https://example.com/audio/marketing-strategy.mp3'
    },
  ];

  // Initialize track player
  useEffect(() => {
    setupPlayer().then(() => {
      setIsPlayerReady(true);
    });
    
    return () => {
      TrackPlayer.destroy();
    };
  }, []);

  // Track player events
  useTrackPlayerEvents([Event.PlaybackTrackChanged, Event.PlaybackState], async (event) => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack !== null) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      if (track) {
        setActiveTrack(track.id);
      }
    }
    
    if (event.type === Event.PlaybackState && 
       (event.state === State.Stopped || event.state === State.None)) {
      setIsPlayerVisible(false);
      setActiveTrack(null);
    }
  });

  // Play audio function
  const playAudio = async (material: Material) => {
    if (!isPlayerReady) {return;}
    
    try {
      if (activeTrack === material.id) {
        // Toggle play/pause if it's the current track
        const currentState = await TrackPlayer.getState();
        await (currentState === State.Playing ? TrackPlayer.pause() : TrackPlayer.play());
      } else {
        // Reset and play new track
        await TrackPlayer.reset();
        await TrackPlayer.add({
          id: material.id,
          url: material.audioUrl || '',
          title: material.title,
          artist: 'Narrator',
        });
        setActiveTrack(material.id);
        setIsPlayerVisible(true);
        await TrackPlayer.play();
      }
    } catch (error) {
      console.log('Playback error:', error);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSliderChange = async (value: number) => {
    await TrackPlayer.seekTo(value);
  };

  const renderMaterialItem = ({ item }: { item: Material }) => {
    const isPlaying = activeTrack === item.id && playbackState === State.Playing;
    
    return (
      <View style={styles.materialCard}>
        <View style={styles.materialHeader}>
          <View style={styles.iconContainer}>
            <Icon color="#E94B3C" name="file-pdf-box" size={24} />
          </View>
          <View style={styles.materialInfo}>
            <Text style={styles.materialTitle}>{item.title}</Text>
            <Text style={styles.materialMeta}>{item.type} • {item.pages} pages</Text>
          </View>
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Icon color="#fff" name="file-pdf-box" size={20} />
            <Text style={styles.buttonText}>View PDF</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={() => playAudio(item)}
            style={[
              styles.actionButton, 
              activeTrack === item.id ? styles.activeButton : {}
            ]}
          >
            {activeTrack === item.id && playbackState === State.Buffering ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Icon 
                color="#fff" 
                name={isPlaying ? "pause" : "play"} 
                size={20} 
              />
            )}
            <Text style={styles.buttonText}>
              {isPlaying ? "Pause Audio" : "Play Audio"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeScreen>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon color="#000" name="arrow-left" size={24} />
            </TouchableOpacity>
          </View>
          <Text style={styles.headerTitle}>Materials</Text>
          <TouchableOpacity style={styles.headerRight}>
            <Icon color="#000" name="dots-vertical" size={24} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Icon color="#888" name="magnify" size={24} />
          <TextInput
            onChangeText={setSearchQuery}
            placeholder="Search materials..."
            placeholderTextColor="#888"
            style={styles.searchInput}
            value={searchQuery}
          />
        </View>

        {/* Materials List */}
        <FlatList
          contentContainerStyle={styles.listContainer}
          data={materials}
          keyExtractor={item => item.id}
          renderItem={renderMaterialItem}
          showsVerticalScrollIndicator={false}
        />

        {/* Audio Player */}
        {isPlayerVisible && activeTrack && (
          <View style={styles.playerContainer}>
            <View style={styles.playerInfo}>
              <Text numberOfLines={1} style={styles.playerTitle}>
                {materials.find(m => m.id === activeTrack)?.title || ''}
              </Text>
            </View>
            
            <View style={styles.progressContainer}>
              <Text style={styles.timeText}>{formatTime(progress.position)}</Text>
              <Slider
                maximumTrackTintColor="#ddd"
                maximumValue={progress.duration > 0 ? progress.duration : 100}
                minimumTrackTintColor="#000"
                minimumValue={0}
                onSlidingComplete={handleSliderChange}
                style={styles.progressBar}
                thumbTintColor="#000"
                value={progress.position}
              />
              <Text style={styles.timeText}>{formatTime(progress.duration)}</Text>
            </View>
            
            <View style={styles.controlsContainer}>
              <TouchableOpacity 
                onPress={() => TrackPlayer.skipToPrevious()}
                style={styles.controlButton}
              >
                <Icon color="#000" name="rewind" size={28} />
              </TouchableOpacity>
              
              <TouchableOpacity 
                onPress={() => {
                  if (playbackState === State.Playing) {
                    TrackPlayer.pause();
                  } else {
                    TrackPlayer.play();
                  }
                }}
                style={[styles.controlButton, styles.playPauseButton]}
              >
                <Icon 
                  color="#fff" 
                  name={playbackState === State.Playing ? "pause" : "play"} 
                  size={28} 
                />
              </TouchableOpacity>
              
              <TouchableOpacity 
                onPress={() => TrackPlayer.skipToNext()}
                style={styles.controlButton}
              >
                <Icon color="#000" name="fast-forward" size={28} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  headerLeft: {
    width: 40,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    flex: 1,
  },
  headerRight: {
    width: 40,
    alignItems: 'flex-end',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#eee',
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#000',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 100, // Extra space for player
  },
  materialCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  materialHeader: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  iconContainer: {
    marginRight: 12,
  },
  materialInfo: {
    flex: 1,
  },
  materialTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  materialMeta: {
    fontSize: 14,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    padding: 12,
    borderRadius: 8,
  },
  activeButton: {
    backgroundColor: '#333',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '500',
    marginLeft: 8,
  },
  playerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  playerInfo: {
    marginBottom: 8,
  },
  playerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  timeText: {
    fontSize: 12,
    color: '#666',
    width: 40,
  },
  progressBar: {
    flex: 1,
    height: 20,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlButton: {
    padding: 8,
    marginHorizontal: 16,
  },
  playPauseButton: {
    backgroundColor: '#000',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MaterialsScreen;