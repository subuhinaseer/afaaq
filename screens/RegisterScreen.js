import {
  Alert,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('')
  const [image, setImage] = useState('');
  const navigation = useNavigation();

  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
      role: role,
    };

    axios
      .post('http://localhost:8000/register', user)
      .then(response => {
        console.log(response);
        Alert.alert(
          'Registration successful',
          'You have been registered successfully',
        );
        setName('');
        setEmail('');
        setPassword('');
        setImage('');
      })
      .catch(error => {
        Alert.alert(
          'Registration Error',
          'An error occurred while registering',
        );
        console.log('Registration failed', error);
      });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        alignItems: 'center',
      }}>
      <KeyboardAvoidingView>
        <View
          style={{
            marginTop: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: '#4A55A2', fontSize: 17, fontWeight: '600'}}>
            Register
          </Text>

          <Text style={{fontSize: 17, fontWeight: '600', marginTop: 15}}>
            Register To your Account
          </Text>
        </View>

        <View style={{marginTop: 50}}>
          <View style={{marginTop: 10}}>
            <Text style={{fontSize: 18, fontWeight: '600', color: 'gray'}}>
              Name
            </Text>

            <TextInput
              value={name}
              onChangeText={text => setName(text)}
              style={{
                fontSize: email ? 18 : 18,
                borderBottomColor: 'gray',
                borderBottomWidth: 1,
                marginVertical: 10,
                width: 300,
              }}
              placeholderTextColor={'black'}
              placeholder="Enter your name"
            />
          </View>

          <View>
            <Text style={{fontSize: 18, fontWeight: '600', color: 'gray'}}>
              Email
            </Text>

            <TextInput
              value={email}
              onChangeText={text => setEmail(text)}
              style={{
                fontSize: email ? 18 : 18,
                borderBottomColor: 'gray',
                borderBottomWidth: 1,
                marginVertical: 10,
                width: 300,
              }}
              placeholderTextColor={'black'}
              placeholder="Enter Your Email"
            />
          </View>

          <View style={{marginTop: 10}}>
            <Text style={{fontSize: 18, fontWeight: '600', color: 'gray'}}>
              Password
            </Text>

            <TextInput
              value={password}
              onChangeText={text => setPassword(text)}
              secureTextEntry={true}
              style={{
                fontSize: email ? 18 : 18,
                borderBottomColor: 'gray',
                borderBottomWidth: 1,
                marginVertical: 10,
                width: 300,
              }}
              placeholderTextColor={'black'}
              placeholder="Password"
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text style={{fontSize: 18, fontWeight: '600', color: 'gray'}}>
              Role
            </Text>
            <View style={{flexDirection: 'row', marginVertical: 10,marginTop:15}}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: 20,
                }}
                onPress={() => setRole('doctor')}>
                <View
                  style={{
                    height: 20,
                    width: 20,
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: 'gray',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 10,
                  }}>
                  {role === 'doctor' && (
                    <View
                      style={{
                        height: 10,
                        width: 10,
                        borderRadius: 5,
                        backgroundColor: 'gray',
                      }}
                    />
                  )}
                </View>
                <Text>Doctor</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onPress={() => setRole('patient')}>
                <View
                  style={{
                    height: 20,
                    width: 20,
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: 'gray',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 10,
                  }}>
                  {role === 'patient' && (
                    <View
                      style={{
                        height: 10,
                        width: 10,
                        borderRadius: 5,
                        backgroundColor: 'gray',
                      }}
                    />
                  )}
                </View>
                <Text>Patient</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* <View style={{ marginTop: 10 }}>
                        <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
                            Image
                        </Text>

                        <TextInput
                            value={image}
                            onChangeText={(text) => setImage(text)}
                            style={{
                                fontSize: email ? 18 : 18,
                                borderBottomColor: "gray",
                                borderBottomWidth: 1,
                                marginVertical: 10,
                                width: 300,
                            }}
                            placeholderTextColor={"black"}
                            placeholder="Image"
                        />
                    </View> */}

          <TouchableOpacity
            onPress={handleRegister}
            style={{
              width: 200,
              backgroundColor: '#4A55A2',
              padding: 15,
              marginTop: 40,
              marginLeft: 'auto',
              marginRight: 'auto',
              borderRadius: 6,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Register
            </Text>
          </TouchableOpacity>

          <Pressable onPress={() => navigation.goBack()} style={{marginTop: 6}}>
            <Text style={{textAlign: 'center', color: 'gray', fontSize: 16}}>
              Already Have an account? Sign in
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};
export default RegisterScreen;

const styles = StyleSheet.create({});
