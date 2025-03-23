import { SafeScreen } from "@/components/templates";
import { useNavigation } from "@react-navigation/native";
import  React, {type FunctionComponent ,useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  FlatList, 
  TouchableOpacity, 
  Image 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface MaterialScreenProps {
    
}
 
// const MaterialScreen: FunctionComponent<MaterialScreenProps> = () => {
//     return (  <SafeScreen>
//         <Text>marina</Text>
//     </SafeScreen>);
// }
 


const MaterialsScreen: FunctionComponent<MaterialScreenProps>  = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  // Sample materials data
  const materials = [
    {
      id: '1',
      title: 'Amazing Grace',
    //   image: require('./path-to-amazing-grace.jpg'),
    },
    {
      id: '2',
      title: 'How Great Thou Art',
    //   image: require('./path-to-how-great.jpg'),
    },
    {
      id: '3',
      title: 'Holy, Holy, Holy',
    //   image: require('./path-to-holy.jpg'),
    },
    {
      id: '4',
      title: 'It Is Well',
    //   image: require('./path-to-it-is-well.jpg'),
    },
  ];

  const renderMaterialItem = ({ item }) => (
    <TouchableOpacity style={styles.materialItem}>
      <View style={styles.itemContent}>
        <Image 
          source={item.image}
          style={styles.materialImage}
        />
        <Text style={styles.materialTitle}>{item.title}</Text>
      </View>
      
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Icon color="#9B6FB4" name="file-document-outline" size={20} />
          <Text style={styles.buttonText}>View Score</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionButton, styles.playButton]}>
          <Icon color="#fff" name="play" size={20} />
          <Text style={styles.playButtonText}>Play</Text>
        </TouchableOpacity>

        <Icon color="#9B6FB4" name="chevron-right" size={24} />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeScreen>
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
            <Icon color="#9B6FB4" name="arrow-left-circle" onPress={()=>navigation.goBack()} size={24}/>
          <View style={styles.iconContainer}>
            <Icon color="#fff" name="music" size={24} />
            {/* <Icon color="#fff" name="book" size={24} /> */}
          </View>
          <Text style={styles.title}>Materials</Text>
        </View>
      </View>

      {/* Search Bar */}
      {/* <View style={styles.searchContainer}> */}

      <View style={styles.searchContainer}>
        <Icon color="#9B6FB4" name="magnify" size={24} />
        <TextInput
          onChangeText={setSearchQuery}
          placeholder="Search materials..."
          placeholderTextColor="#9B6FB4"
          style={styles.searchInput}
          value={searchQuery}
        />
      </View>
      {/* </View> */}

      {/* Materials List */}
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={materials}
        keyExtractor={item => item.id}
        renderItem={renderMaterialItem}
      />
    </View>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F0FF',
  },
  header: {
    backgroundColor: '#000',
    padding: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: '#9B6FB4',
    padding: 8,
    borderRadius: 12,
    marginRight: 12,
    marginLeft: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#9B6FB4',
  },
  searchContainer: {
    backgroundColor: '#F8F0FF',
    margin: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#000',
  },
  listContainer: {
    padding: 16,
  },
  materialItem: {
    backgroundColor: '#000',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  materialImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 12,
  },
  materialTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '500',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F0FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: '#9B6FB4',
    marginLeft: 8,
    fontWeight: '500',
  },
  playButton: {
    backgroundColor: '#9B6FB4',
    marginLeft: 12,
  },
  playButtonText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: '500',
  },
});

export default MaterialsScreen;