import { SafeScreen } from "@/components/templates";
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

interface AttendanceScreenProps {
    
}
 
const AttendanceScreen: FunctionComponent<AttendanceScreenProps> = () => {
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();
  
    // Sample student data
    const students = [
      { id: '1', name: 'John Doe', image: '' },
      { id: '2', name: 'Jane Smith', image: '' },
      { id: '3', name: 'Michael Johnson', image: '' },
      { id: '4', name: 'Sarah Wilson', image: '' },
    ];
  
    const toggleSelection = (studentId) => {
      if (selectedStudents.includes(studentId)) {
        setSelectedStudents(selectedStudents.filter(id => id !== studentId));
      } else {
        setSelectedStudents([...selectedStudents, studentId]);
      }
    };
  
    const renderStudentItem = ({ item }) => (
      <TouchableOpacity 
        onPress={() => toggleSelection(item.id)}
        style={styles.studentItem}
      >
        <View style={styles.studentInfo}>
          <Image 
            source={item.image}
            style={styles.studentImage}
          />
          <Text style={styles.studentName}>{item.name}</Text>
        </View>
        {!selectedStudents.includes(item.id)?<View style={[
          styles.checkbox,
        ]} /> :<View style={[
            styles.checkbox,styles.checkboxSelected
          ]} ><Icon color="black" name="check" size={20} /></View>}
      </TouchableOpacity>
    );
  
    return (
      <SafeScreen>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
      <View style={styles.iconBackContainer}>
        </View>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
          <Icon color="#9B6FB4" name="arrow-left-circle" onPress={()=>navigation.goBack()} size={24}/>
            <View style={styles.iconContainer}>
              <Icon color="#fff" name="account-group" size={24} />
            </View>
            <Text style={styles.title}>Attendance</Text>
          </View>
          <Text style={styles.selectedCount}>
            {selectedStudents.length} selected
          </Text>
        </View>
  
        </View>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Icon color="#9B6FB4" name="magnify" size={24} />
          <TextInput
            onChangeText={setSearchQuery}
            placeholder="Search students..."
            placeholderTextColor="#9B6FB4"
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
        />
      </View>
      </SafeScreen>
    );
}
 
export default AttendanceScreen;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F0FF',
  },
  headerContainer:{
    backgroundColor: '#000',
    // padding: 20,
    flexDirection: 'column',
    // justifyContent: 'space-between',
    // alignItems: 'center',
  },
  header: {
    backgroundColor: '#000',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    marginLeft:10,
  },
  iconBackContainer: {
    // margin:10,
    // width:10,
    alignItems:'center',
    borderRadius: 12,
    // marginRight: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#9B6FB4',
  },
  selectedCount: {
    color: '#fff',
    fontSize: 16,
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
  studentItem: {
    backgroundColor: '#000',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  studentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  studentImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  studentName: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '500',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#9B6FB4',
  },
  checkboxSelected: {
    backgroundColor: '#9B6FB4',
  },
});

// export default AttendanceScreen;