import { SafeScreen } from "@/components/templates";
import { useNavigation } from "@react-navigation/native";
import React, { type FunctionComponent, useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  FlatList, 
  TouchableOpacity,
  StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface MaterialScreenProps {}

interface Material {
  id: string;
  pages: number;
  title: string;
  type: string;
}

const MaterialsScreen: FunctionComponent<MaterialScreenProps> = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  // Updated materials data to match the new design
  const materials: Material[] = [
    {
      id: '1',
      title: 'Annual Financial Report 2024',
      type: 'PDF Document',
      pages: 24,
    },
    {
      id: '2',
      title: 'Q4 Sales Report',
      type: 'PDF Document',
      pages: 15,
    },
    {
      id: '3',
      title: 'Marketing Strategy 2024',
      type: 'PDF Document',
      pages: 18,
    },
  ];

  const renderMaterialItem = ({ item }: { item: Material }) => (
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
        
        <TouchableOpacity style={styles.actionButton}>
          <Icon color="#fff" name="play" size={20} />
          <Text style={styles.buttonText}>Play Audio</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

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
  buttonText: {
    color: '#fff',
    fontWeight: '500',
    marginLeft: 8,
  },
});

export default MaterialsScreen;