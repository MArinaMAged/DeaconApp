import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useLogin } from '@/hooks/domain/login/uselogin';
import ErrorModal from '@/components/atoms/ErrorModal/ErrorModal';
import { useNavigation } from '@react-navigation/native';
// import { Icon } from 'react-native-vector-icons/Icon';
// import {Icon} from 'react-native-vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const LoginScreen = () => {
  const [isCodeMode, setIsCodeMode] = useState(true);
  const { useLoginQuery } = useLogin();
  const [data, setData]= useState({})
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const {navigate} =useNavigation()
  // const {   isLoading, isError, error, isSuccess} = useLoginQuery();
  //640268
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      username: '',
      password: '',
      code: ''
    }
  });
  const {isError, isLoading, isSuccess, error }= useLoginQuery(data);
  React.useEffect(() => {
    if (isError) {

      setErrorMessage(error?.message || 'An error occurred during login. Please try again.');
      setShowErrorModal(true);
    }else if(isSuccess){
    // navigate()
    }
  }, [isError, error, isSuccess]);

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
    setData({})
    setErrorMessage('');
  };
  const onSubmit = async({ username, password, code }:{ code:string; password:string; username:string;}) => {
    // try {
      setData({ userName: username, password, code });
    // } catch {
    //   setErrorMessage('Failed to process login request. Please try again.');
    //   setShowErrorModal(true);
    // }
  };
 

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.logoContainer}>
          <Icon color="black" name="music" size={40} />
          <Icon color="black" name="cross" size={40} />
        </View>

        <Text style={styles.title}>Welcome Little Deacon ❤️!</Text>

        <TouchableOpacity 
          onPress={() => setIsCodeMode(!isCodeMode)} 
          style={styles.toggleButton}
        >
          <Text style={styles.toggleText}>
            {isCodeMode ? 'Switch to Username & Password' : 'Switch to Code'}
          </Text>
        </TouchableOpacity>

        {!isCodeMode ? (
          <>
            <Controller
              control={control}
              name="username"
              render={({ field: { onChange, value } }) => (
                <View style={styles.inputContainer}>
                  <TextInput
                    onChangeText={onChange}
                    placeholder="Username"
                    placeholderTextColor="#9B6FB4"
                    style={styles.input}
                    value={value}
                  />
                </View>
              )}
              rules={{
                required: 'Please enter your username',
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
                  <TextInput
                    onChangeText={onChange}
                    placeholder="Password"
                    placeholderTextColor="#9B6FB4"
                    secureTextEntry
                    style={styles.input}
                    value={value}
                  />
                </View>
              )}
              rules={{
                required: 'Please enter your password',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              }}
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password.message}</Text>
            )}
          </>
        ) : (
          <>
            <Controller
              control={control}
              name="code"
              render={({ field: { onChange, value } }) => (
                <View style={styles.inputContainer}>
                  <TextInput
                    keyboardType="number-pad"
                    maxLength={6}
                    onChangeText={onChange}
                    placeholder={"Enter 6-digit code"}
                    placeholderTextColor="#9B6FB4"
                    style={[styles.input, styles.codeInput]}
                    value={value}
                  />
                </View>
              )}
              rules={{
                required: 'Please enter your code',
                pattern: {
                  value: /^\d{6}$/,
                  message: 'Code must be 6 digits'
                }
              }}
            />
            {errors.code && (
              <Text style={styles.errorText}>{errors.code.message}</Text>
            )}
          </>
        )}

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>{isLoading ? 'Logging in...' : 'Login'}</Text>
        </TouchableOpacity>

        <View style={styles.dotsContainer}>
          {[...Array(3)].map((_, i) => (
            <View key={i} style={styles.dot} />
          ))}
        </View>
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
    backgroundColor: '#F3E8FF',
    justifyContent: 'center',
    padding: 16
  },
  card: {
    backgroundColor: 'black',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5
  },
  logoContainer: {
    backgroundColor: '#9B6FB4',
    borderRadius: 30,
    padding: 16,
    marginBottom: 20,
    flexDirection:'row'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    // color: '#4A2D5B',
    color: '#9B6FB4',
    marginBottom: 24,
    textAlign: 'center'
  },
  toggleButton: {
    marginBottom: 16,
    padding: 8
  },
  toggleText: {
    color: '#9B6FB4',
    fontSize: 16,
    fontWeight: '500'
  },
  inputContainer: {
    backgroundColor: '#F3E8FF',
    borderRadius: 12,
    width: '100%',
    marginBottom: 8
  },
  input: {
    padding: 16,
    fontSize: 18,
    color: '#4A2D5B'
  },
  codeInput: {
    textAlign: 'center',
    letterSpacing: 4,
    fontSize: 24
  },
  button: {
    backgroundColor: '#9B6FB4',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    marginTop: 16
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center'
  },
  errorText: {
    color: '#E53E3E',
    marginTop: 4,
    marginBottom: 8,
    fontSize: 14
  },
  dotsContainer: {
    flexDirection: 'row',
    marginTop: 24,
    gap: 8
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#DCC1E8'
  }
});

export default LoginScreen;