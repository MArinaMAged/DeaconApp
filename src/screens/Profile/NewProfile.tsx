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
    console.log({user})
    return (
        <View style={styles.container}>
            {/* Profile Header with Avatar and Name */}
            <View style={styles.profileHeader}>
                <View style={styles.avatarContainer}>
                    <View style={styles.avatar}>
                        {user?.profileImage ? (
                            <Image
                                resizeMode="cover"
                                source={{ uri: `${prefixImageUrl}${user.profileImage}` }}
                                style={styles.avatarImage}
                            />
                        ) : (
                            <Icon color="#ccc" name="account" size={40} />
                        )}
                    </View>
                </View>
                <Text style={styles.userName}>{user?.userName}</Text>
            </View>

            {/* Info Cards */}
            <ScrollView style={styles.scrollContainer}>
                <InfoCard 
                    icon="account-outline" 
                    label="Role" 
                    value={user?.roleName || "empty"} 
                />
                
                <InfoCard 
                    icon="phone-outline" 
                    label="Phone Number" 
                    value={user?.phoneNumber || "empty"} 
                />
                
                <InfoCard 
                    icon="pound" 
                    label="Code" 
                    value={user?.code || "empty"} 
                />
                
                <InfoCard 
                    icon="email-outline" 
                    label="Email" 
                    value={user?.email || "empty"} 
                />
                
                <InfoCard 
                    icon="map-marker-outline" 
                    label="Address" 
                    value={user?.address || "empty"} 
                />
            </ScrollView>

            {/* Sign Out Button */}
            <TouchableOpacity onPress={logout} style={styles.signOutButton}>
                <Icon color="#fff" name="logout" size={20} />
                <Text style={styles.signOutText}>Sign Out</Text>
            </TouchableOpacity>

            {/* Bottom Navigation */}
            {/* <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem}>
                    <Icon color="#888" name="home" size={24} />
                    <Text style={styles.navText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
                    <Icon color="#000" name="account" size={24} />
                    <Text style={styles.activeNavText}>Profile</Text>
                </TouchableOpacity>
            </View> */}
        </View>
    );
};

// Reusable component for info cards
const InfoCard = ({ icon, label, value }) => (
    <View style={styles.card}>
        <View style={styles.iconContainer}>
            <Icon color="#666" name={icon} size={24} />
        </View>
        <View style={styles.cardContent}>
            <Text style={styles.cardLabel}>{label}</Text>
            <Text style={styles.cardValue}>{value}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    profileHeader: {
        alignItems: 'center',
        paddingVertical: 30,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    avatarContainer: {
        marginBottom: 15,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    avatarImage: {
        width: '100%',
        height: '100%',
    },
    userName: {
        fontSize: 22,
        fontWeight: '600',
        color: '#333',
    },
    scrollContainer: {
        flex: 1,
        padding: 16,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    iconContainer: {
        width: 40,
        alignItems: 'center',
    },
    cardContent: {
        flex: 1,
        marginLeft: 10,
    },
    cardLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    cardValue: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    signOutButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        margin: 16,
        padding: 15,
        borderRadius: 8,
    },
    signOutText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 8,
    },
    bottomNav: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        backgroundColor: '#fff',
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 12,
    },
    activeNavItem: {
        borderTopWidth: 2,
        borderTopColor: '#000',
    },
    navText: {
        fontSize: 12,
        color: '#888',
        marginTop: 4,
    },
    activeNavText: {
        fontSize: 12,
        color: '#000',
        fontWeight: '500',
        marginTop: 4,
    }
});

export default ProfileScreen;