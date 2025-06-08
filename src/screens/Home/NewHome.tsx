import { useGetClasses } from '@/hooks/domain/classes/getClasses/useGetClasses';
import { Paths } from '@/navigation/paths';
import type { ServantBottomTabParamList, StudentBottomTabParamList } from '@/navigation/types';
import useAuth from '@/theme/hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { use } from 'i18next';
import React from 'react';
import type { FunctionComponent } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export type UserType = 'Servant' | 'Student';
interface HomeScreenProps {
  type?: UserType;
}
type HomeScreenNavigationProp = StackNavigationProp<ServantBottomTabParamList | StudentBottomTabParamList, 'Home'>;

const HomeScreen: FunctionComponent<HomeScreenProps> = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { user } = useAuth();
  const { useGetClassesQuery } = useGetClasses();
  console.log(user?.roleName, 'user in home screen')
  const { isError, isLoading, isSuccess, error, data: response } = useGetClassesQuery({});

  console.log({ isError, isLoading, isSuccess, error, response }, '<<<<<')
  return (
    <ScrollView style={styles.container}>
      {/* Welcome Header */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>
          Welcome, Our Little Deacon 💜
        </Text>
      </View>

      {/* Main Content Container */}
      <View style={styles.content}>
        {/* Attendance Card */}
        {user?.roleName.toLocaleLowerCase() == 'servant' && <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconContainer}>
              <Icon color="#fff" name="account-group" size={24} />
            </View>
            <Text style={styles.cardTitle}>Attendance</Text>
            <Text style={styles.attendanceRate}>85% Present</Text>
          </View>

          {/* Session Item */}
          <TouchableOpacity style={styles.sessionItem}>
            <View style={styles.sessionLeft}>
              <Icon color="#9B6FB4" name="clock-outline" size={24} />
              <Text style={styles.sessionName}>Other Session</Text>
            </View>
            <Text style={styles.presentText}>Present</Text>
            <Icon color="#9B6FB4" name="chevron-right" size={24} />
          </TouchableOpacity>

          {/* Attendance Overview */}
          <View style={styles.overviewSection}>
            <Text style={styles.overviewTitle}>Attendance Overview</Text>
            <View style={styles.progressBar}>
              <View style={styles.progressFill} />
            </View>
          </View>

          {/* Handle Today's Session Button */}
          <TouchableOpacity
            onPress={() => navigation.navigate(Paths.Attendance)}
            style={styles.handleSessionButton}
          >
            <Text style={styles.handleSessionText}>Handle Today's Session Attendance</Text>
            <Icon color="#9B6FB4" name="chevron-right" size={24} />
          </TouchableOpacity>
        </View>}

        {/* Materials Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconContainer}>
              <Icon color="#fff" name="music" size={24} />
            </View>
            <Text style={styles.cardTitle}>Materials</Text>
            <Text style={styles.itemCount}>12 items</Text>
          </View>

          {/* Coptic Hymn Item */}
          <TouchableOpacity style={styles.materialItem}>
            <View style={styles.materialLeft}>
              <Icon color="#9B6FB4" name="music-note" size={24} />
              <View style={styles.materialDetails}>
                <Text style={styles.materialTitle}>Coptic Hymn - Week 3</Text>
                <Text style={styles.materialSubtitle}>Audio • 5:30 mins</Text>
              </View>
            </View>
            <Icon color="#9B6FB4" name="chevron-right" size={24} />
          </TouchableOpacity>

          {/* Lesson Notes Item */}
          <TouchableOpacity style={styles.materialItem}>
            <View style={styles.materialLeft}>
              <Icon color="#9B6FB4" name="file-document-outline" size={24} />
              <View style={styles.materialDetails}>
                <Text style={styles.materialTitle}>Lesson Notes - Week 3</Text>
                <Text style={styles.materialSubtitle}>PDF • 12 pages</Text>
              </View>
            </View>
            <Icon color="#9B6FB4" name="chevron-right" size={24} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate(Paths.Material)}
            style={styles.handleSessionButton}
          >
            <Text style={styles.handleSessionText}>GO TO MATERIALS</Text>
            <Icon color="#9B6FB4" name="chevron-right" size={24} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Navigation Footer */}
      {/* <View style={styles.footer}>
        <TouchableOpacity style={styles.footerTab}>
          <Icon color="#9B6FB4" name="home" size={24} />
          <Text style={styles.footerTabText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerTab}>
          <Icon color="#666" name="account" size={24} />
          <Text style={[styles.footerTabText, styles.inactiveTabText]}>Profile</Text>
        </TouchableOpacity>
      </View> */}
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#F8F0FF',
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    alignItems: 'center',
    paddingBottom: 20,
  },
  welcomeText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  content: {
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
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
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1,
    color: '#333',
  },
  attendanceRate: {
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
  },
  itemCount: {
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
  },
  sessionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  sessionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sessionName: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 12,
    color: '#333',
  },
  presentText: {
    color: '#333',
    fontWeight: '500',
    marginRight: 10,
  },
  overviewSection: {
    marginBottom: 16,
  },
  overviewTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    width: '85%',
    height: '100%',
    backgroundColor: '#9B6FB4',
    borderRadius: 4,
  },
  handleSessionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  handleSessionText: {
    color: '#9B6FB4',
    fontSize: 16,
    fontWeight: '500',
  },
  materialItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    justifyContent: 'space-between',
  },
  materialLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  materialDetails: {
    marginLeft: 12,
  },
  materialTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  materialSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  footer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  footerTab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  footerTabText: {
    marginTop: 4,
    fontSize: 12,
    color: '#9B6FB4',
  },
  inactiveTabText: {
    color: '#666',
  },
});