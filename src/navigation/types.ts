import type { StackScreenProps } from '@react-navigation/stack';
import type { Paths } from '@/navigation/paths';
import type { UserType } from '@/screens/Home/Home';
// import type { UserType } from '@/hooks/AuthContext/AuthContext';

export type RootStackParamList = {
  [Paths.Startup]: undefined;
  [Paths.Example]: undefined;
  [Paths.Auth]: undefined;
  // [Paths.Login]: undefined;
  [Paths.Home]: {type?: UserType};
  [Paths.Profile]:{type?: UserType};
  [Paths.Attendance]:{date?:Date};
  [Paths.Material]:undefined;
};
// export type RootStackParamList = {
//   Auth: undefined;
//   ServantApp: undefined;
//   StudentApp: undefined;
//   Startup: undefined;
// };


export type RootScreenProps<
  S extends keyof RootStackParamList = keyof RootStackParamList,
> = StackScreenProps<RootStackParamList, S>;

export type AuthStackParamList = {
  Login: undefined;
};

export type ServantBottomTabParamList = {
  Attendance: {date?:Date};
  Home: {title?:string; type:UserType };
  Material:undefined;
  Profile: {title?:string; type:UserType };
  // Add more servant-specific screens
};

export type StudentBottomTabParamList = {
  Home: {title?:string; type:UserType };
  Profile: {title?:string; type:UserType };
  // Add more student-specific screens
};