import { prefixImageUrl } from "@/services/instance";
import useAuth from "@/theme/hooks/useAuth";
import type { FunctionComponent } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import type { UserType } from "../Home/Home";

interface ProfileScreenProps {
    type?: UserType;
}

const ProfileScreen: FunctionComponent<ProfileScreenProps> = () => {
    const { user, logout } = useAuth();
    return (<View style={styles.container}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
            <View style={styles.imageContainer}>
                <Image
                    loadingIndicatorSource={<ActivityIndicator />}
                    source={{ uri: `${prefixImageUrl}${user?.profileImage}` ?? '' }}
                    style={styles.profileImage}
                    borderRadius={50} // Replace with your image path
                    // source={{uri:`http://46.202.190.180/backend/attachment/User/17/768-pdf.png`??''}} // Replace with your image path
                    resizeMode="cover"
                />
                <View style={styles.iconOverlay}>
                    <Icon color="#fff" name="account" size={20} />
                </View>
            </View>
            <Text style={styles.name}>{user?.name}</Text>
        </View>
        <ScrollView style={{ paddingHorizontal:5}}>
            {/* Info Cards */}
            <View style={styles.infoCard}>
                <Icon color="#9B6FB4" name="phone" size={24} />
                <View style={styles.infoContent}>
                    <Text style={styles.label}>Role</Text>
                    <Text style={styles.value}>{user?.roleName}</Text>
                </View>
            </View>

            <View style={styles.infoCard}>
                <Icon color="#9B6FB4" name="phone" size={24} />
                <View style={styles.infoContent}>
                    <Text style={styles.label}>Phone Number</Text>
                    <Text style={styles.value}>{user?.phoneNumber}</Text>
                </View>
            </View>

            <View style={styles.infoCard}>
                <Icon color="#9B6FB4" name="pound" size={24} />
                <View style={styles.infoContent}>
                    <Text style={styles.label}>Code</Text>
                    <Text style={styles.value}>{user?.userName}</Text>
                </View>
            </View>

            <View style={styles.infoCard}>
                <Icon color="#9B6FB4" name="mail" size={24} />
                <View style={styles.infoContent}>
                    <Text style={styles.label}>Email</Text>
                    <Text style={styles.value}>{user?.email}</Text>
                </View>
            </View>

            <View style={styles.infoCard}>
                <Icon color="#9B6FB4" name="map-marker" size={24} />
                <View style={styles.infoContent}>
                    <Text style={styles.label}>Address</Text>
                    <Text style={styles.value}>123 Church Street, Springfield, IL</Text>
                </View>
            </View>

            <View style={styles.infoCard}>
                <Icon color="#9B6FB4" name="percent" size={24} />
                <View style={styles.infoContent}>
                    <Text style={styles.label}>Attendance</Text>
                    <View style={styles.progressContainer}>
                        <View style={[styles.progressBar, { width: '85%' }]} />
                    </View>
                    <Text style={styles.value}>85%</Text>
                </View>
            </View>
        </ScrollView>

        {/* Logout Button */}
        <TouchableOpacity onPress={logout} style={styles.logoutButton}>
            <Icon color="#fff" name="logout" size={24} />
            <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
    </View>);
}

export default ProfileScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        padding: 20,
    },
    profileHeader: {
        alignItems: 'center',
        marginBottom: 30,
    },
    imageContainer: {
        position: 'relative',
        marginBottom: 10,
        // width:50,
        overflow: 'hidden',

        // backgroundColor:'#F3E8FF'
    },
    profileImage: {
        width: 100,
        overflow: 'hidden',
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#9B6FB4',
    },
    iconOverlay: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#9B6FB4',
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    name: {
        color: '#9B6FB4',
        fontSize: 24,
        fontWeight: 'bold',
    },
    infoCard: {
        flexDirection: 'row',
        // backgroundColor: 'rgba(155, 111, 180, 0.1)',
        backgroundColor: '#F3E8FF',
        padding: 15,
        borderRadius: 15,
        marginBottom: 15,
        alignItems: 'center',
    },
    infoContent: {
        marginLeft: 15,
        flex: 1,
    },
    label: {
        color: '#9B6FB4',
        fontSize: 16,
        fontWeight: '500',
    },
    value: {
        // color: '#9B6FB4',
        color: 'black',
        fontSize: 14,
        marginTop: 4,
    },
    progressContainer: {
        height: 6,
        backgroundColor: 'rgba(155, 111, 180, 0.2)',
        borderRadius: 3,
        marginTop: 8,
        marginBottom: 4,
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#9B6FB4',
        borderRadius: 3,
    },
    logoutButton: {
        backgroundColor: '#9B6FB4',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        borderRadius: 15,
        marginTop: 20,
    },
    logoutText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 10,
    },
});
