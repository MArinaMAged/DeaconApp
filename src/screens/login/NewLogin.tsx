import React, { useContext, useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { TextInput, Text, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useLogin } from '@/hooks/domain/login/uselogin';
import ErrorModal from '@/components/atoms/ErrorModal/ErrorModal';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import type { StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import type { AuthStackParamList } from '@/navigation/types';
import { AuthContext } from '@/hooks/AuthContext/AuthContext';

type LoginScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Login'>;

const LoginScreen = () => {
  const [activeTab, setActiveTab] = useState('code'); // 'username' or 'code'
  const { useLoginQuery } = useLogin();
  const [data, setData] = useState({});
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      username: '',
      password: '',
      code: ''
    }
  });

  const { isError, isLoading, isSuccess, error, data: response } = useLoginQuery(data);

  React.useEffect(() => {
    if (isSuccess) {
      setShowErrorModal(false);
      login(response);
      navigation.navigate('home');
    }

    if (isError) {
      setErrorMessage(error?.message || 'An error occurred during login. Please try again.');
      setShowErrorModal(true);
    }
  }, [isError, error, isSuccess]);

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
    setData({});
    setErrorMessage('');
  };

  const onSubmit = async ({ username, password, code }: {code:string; password:string; username:string;}) => {
    setData({ userName: username, password, code });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.content}>
        <View style={styles.logoContainer}>
                 {/* <Icon color="black" name="music" size={40} /> */}
                 <Icon color="black" name="cross-bolnisi" size={40} />
               </View>
        {/* <Text style={styles.welcomeText}>Welcome back! Please login to continue</Text> */}
         <Text style={styles.welcomeText}>Welcome Little Deacon ❤️!</Text>
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            onPress={() => setActiveTab('code')}
            style={[styles.tab, activeTab === 'code' && styles.activeTab]}
          >
            <Text style={[styles.tabText, activeTab === 'code' && styles.activeTabText]}>
              Code Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setActiveTab('username')}
            style={[styles.tab, activeTab === 'username' && styles.activeTab]}
          >
            <Text style={[styles.tabText, activeTab === 'username' && styles.activeTabText]}>
              Username/Password
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'username' ? (
          <>
            <Controller
              control={control}
              name="username"
              render={({ field: { onChange, value } }) => (
                <View style={styles.inputContainer}>
                  <Icon color="#666" name="account" size={24} style={styles.inputIcon} />
                  <TextInput
                    onChangeText={onChange}
                    placeholder="Username"
                    style={styles.input}
                    value={value}
                  />
                </View>
              )}
              rules={{
                required: 'Username is required',
                minLength: {
                  value: 3,
                  message: 'Username must be at least 3 characters'
                }
              }}
            />
            {errors.username && (
              <Text style={styles.errorText}>{errors.username.message}</Text>
            )}

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <View style={styles.inputContainer}>
                  <Icon color="#666" name="lock" size={24} style={styles.inputIcon} />
                  <TextInput
                    onChangeText={onChange}
                    placeholder="Password"
                    secureTextEntry={!showPassword}
                    style={styles.input}
                    value={value}
                  />
                  <TouchableOpacity 
                    onPress={togglePasswordVisibility}
                    style={styles.eyeIcon}
                  >
                    <Icon 
                      color="#666" 
                      name={showPassword ? "eye-off" : "eye"} 
                      size={24} 
                    />
                  </TouchableOpacity>
                </View>
              )}
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password.message}</Text>
            )}

            {/* <View style={styles.rememberContainer}>
              <TouchableOpacity style={styles.checkboxContainer}>
                <View style={styles.checkbox} />
                <Text style={styles.rememberText}>Remember me</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
              </TouchableOpacity>
            </View> */}
          </>
        ) : (
          <Controller
            control={control}
            name="code"
            render={({ field: { onChange, value } }) => (
              <View style={styles.inputContainer}>
                <Icon color="#666" name="key" size={24} style={styles.inputIcon} />
                <TextInput
                  keyboardType="number-pad"
                  maxLength={6}
                  onChangeText={onChange}
                  placeholder="Enter 6-digit code"
                  style={styles.input}
                  value={value}
                />
              </View>
            )}
            rules={{
              required: 'Code is required',
              pattern: {
                value: /^\d{6}$/,
                message: 'Code must be 6 digits'
              }
            }}
          />
        )}
        {errors.code && (
          <Text style={styles.errorText}>{errors.code.message}</Text>
        )}

        <TouchableOpacity
          disabled={isLoading}
          onPress={handleSubmit(onSubmit)}
          style={styles.loginButton}
        >
          <Text style={styles.loginButtonText}>
            {isLoading ? 'Logging in...' : 'Login'}
          </Text>
        </TouchableOpacity>

        {/* <View style={styles.footer}>
          <Text style={styles.supportText}>Need Help? Contact Support</Text>
          <Text style={styles.termsText}>
            By logging in, you agree to our{' '}
            <Text style={styles.termsLink}>Terms of Service</Text>
          </Text>
        </View> */}

        <ErrorModal
          errorMessage={errorMessage}
          onClose={handleCloseErrorModal}
          visible={showErrorModal}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    backgroundColor: 'white',
    // borderRadius: 24,
    // padding: 20,
    // marginHorizontal:10,
    // alignItems: 'center',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 8,
    // elevation: 5,
    marginTop: 60,
    // flex: 1,
    padding: 20,
  },
  logo: {
    fontSize: 36,
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 20,
    fontStyle: 'italic',
  },
  welcomeText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666',
    marginBottom: 30,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  tabText: {
    textAlign: 'center',
    color: '#666',
  },
  activeTabText: {
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
  },
  rememberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: 4,
    marginRight: 8,
  },
  rememberText: {
    color: '#666',
  },
  forgotPassword: {
    color: '#000',
  },
  loginButton: {
    backgroundColor: '#000',
    borderRadius: 8,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    marginTop: 'auto',
    alignItems: 'center',
  },
  supportText: {
    color: '#666',
    marginBottom: 8,
  },
  eyeIcon: {
    padding: 8,
  },
  termsText: {
    color: '#666',
    textAlign: 'center',
  },
  termsLink: {
    color: '#000',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 8,
  },
  logoContainer: {
    // backgroundColor: '#9B6FB4',
    borderRadius: 30,
    // padding: 16,
    justifyContent: 'center',
    width: '100%',
    marginBottom: 20,
    flexDirection:'row'
  },
});

export default LoginScreen;