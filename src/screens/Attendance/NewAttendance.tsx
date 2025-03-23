import { SafeScreen } from "@/components/templates";
import { prefixImageUrl } from "@/services/instance";
import useAuth from "@/theme/hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import type { FunctionComponent } from "react";
import React, { useState } from 'react';
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

interface AttendanceScreenProps {}

interface Student {
  id: string;
  image: string;
  name: string;
  studentId: string;
}
 
const AttendanceScreen: FunctionComponent<AttendanceScreenProps> = () => {
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();
  const { user, logout } = useAuth();
console.log(user?.profileImage)
  // Sample student data
  const students: Student[] = [
    { id: '1', name: 'Sarah Johnson', studentId: '2024001', image: user?.profileImage },
    { id: '2', name: 'David Chen', studentId: '2024002', image: user?.profileImage },
  ];
  
  const toggleSelection = (studentId: string) => {
    if (selectedStudents.includes(studentId)) {
      setSelectedStudents(selectedStudents.filter(id => id !== studentId));
    } else {
      setSelectedStudents([...selectedStudents, studentId]);
    }
  };
  
  const renderStudentItem = ({ item }: { item: Student }) => (
    <TouchableOpacity 
      onPress={() => toggleSelection(item.id)}
      style={styles.studentItem}
    >
      <View style={styles.studentInfo}>
        <Image 
          source={{ uri: `${prefixImageUrl}${item.image}` }}
          style={styles.studentImage}
        />
        <View style={styles.studentDetails}>
          <Text style={styles.studentName}>{item.name}</Text>
          <Text style={styles.studentId}>Code : {item.studentId}</Text>
        </View>
      </View>
      {selectedStudents.includes(item.id)?<View style={[
        styles.checkbox
      ]} />:<View style={[
        styles.checkboxSelected
      ]} ><Icon color="white" name="check" size={20} /></View>}
    </TouchableOpacity>
  );
  
  return (
    <SafeScreen>
      <View style={styles.container}>
        <View style={{flexDirection:'row',alignItems:'center', marginBottom:10}}>
        <Icon color="black" name="arrow-left" onPress={()=>navigation.goBack()} size={24} style={{}}/>
            
        <Text style={styles.headerTitle}>Attendance Records</Text>
        </View>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Icon color="#777" name="magnify" size={24} style={styles.searchIcon} />
          <TextInput
            onChangeText={setSearchQuery}
            placeholder="Search students..."
            placeholderTextColor="#777"
            style={styles.searchInput}
            value={searchQuery}
          />
        </View>
        
        {/* Student List */}
        <FlatList
          contentContainerStyle={styles.listContainer}
          data={students}
          keyExtractor={item => item.id}
          renderItem={renderStudentItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeScreen>
  );
}
 
export default AttendanceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
    padding: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 10,
    textAlign: 'center',
    alignContent:'center',
    flex:1
  },
  searchContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1a1a1a',
  },
  listContainer: {
    paddingBottom: 20,
  },
  studentItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  studentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  studentImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    backgroundColor: '#e1e1e1',
  },
  studentDetails: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  studentId: {
    fontSize: 14,
    color: '#777',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#d1d1d1',
    backgroundColor: '#fff',
  },
  checkboxSelected: {
    // backgroundColor: '#4a7dff',
    // borderColor: '#4a7dff',
    backgroundColor: '#9B6FB4',
    borderColor: '#333',
  },
});