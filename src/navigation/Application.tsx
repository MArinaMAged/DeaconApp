import type { AuthStackParamList, RootStackParamList, ServantBottomTabParamList, StudentBottomTabParamList } from '@/navigation/types';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useTheme } from '@/theme';
import { Paths } from '@/navigation/paths';

// import { Login, Startup } from '@/screens';
import React from 'react';

import { 
  Attendance,
  Login, 
  Material, 
  ServantHome,
  ServantProfile,
  StudentHome,
  StudentProfile
} from '@/screens';

import { storage } from '@/App';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Dimensions } from 'react-native';
import { responsiveStyles } from '@/Helpers';
import useAuth from '@/theme/hooks/useAuth';

// const Stack = createStackNavigator<RootStackParamList>();
const Stack = createStackNavigator<RootStackParamList>();
const AuthStack = createStackNavigator<AuthStackParamList>();
const ServantTab = createBottomTabNavigator<ServantBottomTabParamList>();
const StudentTab = createBottomTabNavigator<StudentBottomTabParamList>();

const renderTabIcon = (route: { name: string }, _: boolean, color: string) => {
  let iconName = "home";
  // let iconType = IconType.Octicons;
  let size = 30;
  switch (route.name) {
    case Paths.Home:
      iconName = "home";
      // iconType = IconType.Octicons;
      size = responsiveStyles.scaleSize(28);
      break;
    case Paths.Profile:
      iconName = "account";
      size = responsiveStyles.scaleSize(30);
      break;
    default:
      iconName = "home";
      // iconType = IconType.Octicons;
      size = responsiveStyles.scaleSize(28);

      break;
  }
  return <Icon color={color} name={iconName} size={size} />;
};
const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen component={Login} name="Login" />
  </AuthStack.Navigator>
);
const ServantBottomTabs = () => (
  <ServantTab.Navigator screenOptions={(route)=>({ headerShown: false ,  tabBarActiveTintColor: 'black',
    tabBarInactiveTintColor: 'grey', tabBarIcon: ({ focused, color }) => renderTabIcon(route?.route, focused, color),  
    //tabBarActiveTintColor: '#4A2D5B'
  tabBarStyle: {
    // backgroundColor: isDarkMode ? palette.black : palette.lightGray,
    backgroundColor: 'white',
    height:
      Dimensions.get("screen").height < 600
        ? responsiveStyles.height(12)
        : responsiveStyles.height(9),
    paddingVertical: responsiveStyles.height(2),
  },
  tabBarLabelStyle: {
    marginBottom: responsiveStyles.height(2),
    fontWeight: "400",
    fontSize: responsiveStyles.fontSize(12),
  },})}
  >
     <>
    <ServantTab.Screen 
      component={ServantHome} 
      name={'Home'}
      options={{
        title: 'Home',
        // type: 'Servant',
        // Add your tab icon here
      }}
    />
    <ServantTab.Screen 
      component={ServantProfile} 
      name={'Profile'}
      options={{
        title: 'Profile',
        // type: 'Servant',
        // Add your tab icon here
      }}
    />
    </>
  </ServantTab.Navigator>
);

const StudentBottomTabs = () => (
  <StudentTab.Navigator >
    <StudentTab.Screen 
      component={StudentHome} 
      name={Paths.Home}
      options={{
        title: 'Home',
        type: 'Student',
        // Add your tab icon here
      }}
    />
    <StudentTab.Screen 
      component={StudentProfile} 
      name={Paths.Profile}

      options={{
        title: 'Profile',
        type: 'Student',
        // Add your tab icon here
      }}
    />
  </StudentTab.Navigator>
);

// function ApplicationNavigator() {
//   const { variant, navigationTheme } = useTheme();

//   return (
//     <SafeAreaProvider>
//       <NavigationContainer theme={navigationTheme}>
//         <Stack.Navigator key={variant} screenOptions={{ headerShown: false }}>
//           <Stack.Screen component={Login} name={Paths.Login} />
//           <Stack.Screen component={Startup} name={Paths.Startup} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </SafeAreaProvider>
//   );
// }

function ApplicationNavigator() {
  const { variant, navigationTheme } = useTheme();
  const { user } = useAuth();
const userStore=storage?.getString('@user_data')? JSON.parse(storage?.getString('@user_data')??''): ''

  const isAuthenticated =user?.access_token || userStore?.access_token ?true:false
  const isServant =user?.roleName === 'Servant' || userStore?.roleName  === 'Servant'?true:false
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator 
          key={variant} 
          screenOptions={{ headerShown: false }}
        >
          {!isAuthenticated ? (
            // Auth Stack
            <Stack.Screen 
              component={AuthNavigator} 
              name={Paths.Auth} 
            />
          ) : (
            // App Stacks
            <>
              <Stack.Screen 
                  component={isServant?ServantBottomTabs:StudentBottomTabs}
                  initialParams={{ type: user?.roleName ||  storage?.getString('@user_data')?.user?.roleName }} 
                  name={Paths.Home}
                />
                  <ServantTab.Screen 
                    component={Attendance} 
                    name={Paths.Attendance}
                    options={{
                      title: 'Attendance',
                      // type: 'Servant',
                      // Add your tab icon here
                    }}
                  />
                  <ServantTab.Screen 
                    component={Material} 
                    name="Material"
                    options={{
                      title: 'Material',
                      // type: 'Servant',
                      // Add your tab icon here
                    }}
                  />
              {/* {user?.roleName === 'Servant' ? (
                <Stack.Screen 
                  component={ServantBottomTabs} 
                  name={Paths.Home}
                />
              ) : (
                <Stack.Screen 
                  component={StudentBottomTabs}
                  name={Paths.Home}
                />
              )} */}
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default ApplicationNavigator;
