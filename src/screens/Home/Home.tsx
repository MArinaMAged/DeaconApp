import type { ServantBottomTabParamList, StudentBottomTabParamList } from '@/navigation/types';
import useAuth from '@/theme/hooks/useAuth';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import React, {useState} from 'react'
import type { FunctionComponent } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Calendar } from "react-native-calendars";


export type UserType = 'Servant' | 'Student';
interface HomeScreenProps {
 type?: UserType;   
}
 type HomeScreenNavigationProp = StackNavigationProp<ServantBottomTabParamList| StudentBottomTabParamList, 'Home'>;
 
const HomeScreen: FunctionComponent<HomeScreenProps> = ({ type = '' }) => {
const navigation = useNavigation<HomeScreenNavigationProp>();
const route = useRoute<HomeScreenNavigationProp>();
const [selectedDate, setSelectedDate] = useState(new Date());
const [isCalendarVisible, setCalendarVisible] = useState(false);

const { user } = useAuth();

const handleDateSelected = (date: Date) => {
  setSelectedDate(new Date(date));
  // setResetPage(true);
  // setPage(1);
  // setTimeout(() => {
  //   console.log({ timeOutPage: page });
  //   fetchHistoryStorage(page);
  //   setResetPage(false);
  // }, 1000);
};

const handleHeaderSelected = () => {
  setCalendarVisible(true);
};

const handleDayPress = (day: { dateString: string }) => {
  setSelectedDate(new Date(day?.dateString));
  setCalendarVisible(false);
};

const formatDate = (date: Date) => {
  const d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) {month = "0" + month;}
  if (day.length < 2) {day = "0" + day;}

  return [year, month, day].join("-");
};
    return (
        <ScrollView style={styles.container}>
          {/* Welcome Header */}
          <View style={styles.header}>
            <Text style={styles.welcomeText}>
              Welcome, Our Little Deacon ❤️
            </Text>
            {/* <Text style={styles.subText}>
              Access your materials and track attendance
            </Text> */}
          </View>
    
          {/* Main Content Container */}
          <View style={styles.content}>
               {/* Attendance Card */}
               {user?.roleName=== 'Servant'&&<View style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.iconContainer}>
                  <Icon color="#fff" name="account-group" size={24} />
                </View>
                <Text style={styles.cardTitle}>Attendance</Text>
                <Text style={styles.itemCount}>85% Present</Text>
              </View>
    
              {/* Attendance Items */}
              <View style={styles.itemContainer}>
                <View style={styles.itemLeft}>
                  <Icon color="#9B6FB4" name="clock-outline" size={24} />
                  <View style={styles.itemTextContainer}>
                    <Text style={styles.itemTitle}>Last Session</Text>
                    {/* <Text style={styles.itemSubtext}>March 15, 2024</Text> */}
                  </View>
                </View>
                <Text style={styles.presentText}>Present</Text>
                <Icon color="#9B6FB4" name="calendar" onPress={handleHeaderSelected}  size={24}/>
              </View>
    
              <View style={styles.itemContainer}>
                <View style={styles.itemLeft}>
                  <Icon color="#9B6FB4" name="clock-outline" size={24} />
                  <View style={styles.itemTextContainer}>
                    <Text style={styles.itemTitle}>Next Session</Text>
                    {/* <Text style={styles.itemSubtext}>March 22, 2024</Text> */}
                  </View>
                </View>
                <Text style={styles.upcomingText}>Upcoming</Text>
                <Icon color="#9B6FB4" name="calendar" size={24} />
              </View>
    
              {/* Progress Bar */}
              <View style={styles.progressContainer}>
                <Text style={styles.progressTitle}>Attendance Overview</Text>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: '85%' }]} />
                </View>
              </View>
    
              <TouchableOpacity style={styles.viewAllButton}>
                <Text style={styles.viewAllText}>Handle Today`s Session Attendance</Text>
                <Icon color="#9B6FB4" name="arrow-right" size={20} />
              </TouchableOpacity>
            </View>}

            {/* Materials Card */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.iconContainer}>
                  <Icon color="#fff" name="book" size={24} />
                </View>
                <Text style={styles.cardTitle}>Materials</Text>
                <Text style={styles.itemCount}>12 items</Text>
              </View>
    
              {/* Material Items */}
              <TouchableOpacity style={styles.itemContainer}>
                <View style={styles.itemLeft}>
                  <Icon color="#9B6FB4" name="music-note" size={24} />
                  <View style={styles.itemTextContainer}>
                    <Text style={styles.itemTitle}>Coptic Hymn - Week 3</Text>
                    <Text style={styles.itemSubtext}>Audio • 5:30 mins</Text>
                  </View>
                </View>
                <Icon color="#9B6FB4" name="chevron-right" size={24} />
              </TouchableOpacity>
    
              <TouchableOpacity style={styles.itemContainer}>
                <View style={styles.itemLeft}>
                  <Icon color="#9B6FB4" name="file-pdf-box" size={24} />
                  <View style={styles.itemTextContainer}>
                    <Text style={styles.itemTitle}>Lesson Notes - Week 3</Text>
                    <Text style={styles.itemSubtext}>PDF • 12 pages</Text>
                  </View>
                </View>
                <Icon color="#9B6FB4" name="chevron-right" size={24} />
              </TouchableOpacity>
    
              <TouchableOpacity style={styles.viewAllButton}>
                <Text style={styles.viewAllText}>View All Materials</Text>
                <Icon color="#9B6FB4" name="arrow-right" size={20} />
              </TouchableOpacity>
            </View>
    
         
          </View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={isCalendarVisible}
            >
              <View style={styles.modalContainer}>
                <View style={styles.calendarContainer}>
                  <Calendar
                    markedDates={{
                      [formatDate(selectedDate)]: {
                        selected: true,
                        marked: true,
                        selectedColor: "#9B6FB4",
                      },
                    }}
                    onDayPress={handleDayPress}
                  />
                  <Button
                    onPress={() => setCalendarVisible(false)}
                    title="Done"
                  />
                </View>
              </View>
            </Modal>
        </ScrollView>
      );
}
 
export default HomeScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#F8F0FF',
    backgroundColor: 'black',
padding:10
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  calendarContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  header: {
    backgroundColor: '#000',
    padding: 20,
    paddingTop: 40,
    borderRadius: 20,
    // borderBottomRightRadius: 20,
  },
  welcomeText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#9B6FB4',
    marginBottom: 8,
  },
  subText: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
  },
  content: {
    padding: 16,
    backgroundColor:'#F8F0FF'
  },
  card: {
    backgroundColor: '#000',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    backgroundColor: '#9B6FB4',
    padding: 8,
    borderRadius: 12,
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#9B6FB4',
    flex: 1,
  },
  itemCount: {
    color: '#fff',
    opacity: 0.8,
  },
  itemContainer: {
    backgroundColor: '#F8F0FF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  itemTextContainer: {
    marginLeft: 12,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  itemSubtext: {
    fontSize: 14,
    color: '#666',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  viewAllText: {
    color: '#9B6FB4',
    marginRight: 8,
    fontSize: 16,
  },
  progressContainer: {
    marginTop: 8,
    marginBottom: 16,
  },
  progressTitle: {
    color: '#fff',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#F8F0FF',
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#9B6FB4',
    borderRadius: 4,
  },
  presentText: {
    color: '#9B6FB4',
    fontWeight: '500',
  },
  upcomingText: {
    color: '#666',
    fontWeight: '500',
  },
  emoji: {
    fontSize: 20,
  },
});

