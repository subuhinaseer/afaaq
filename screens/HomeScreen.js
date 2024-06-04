import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useLayoutEffect, useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {UserType} from '../UserContext';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import User from '../components/User';
import { API_URL } from '../constants';
const HomeScreen = () => {
  const navigation = useNavigation();
  const {userId, setUserId} = useContext(UserType);
  const [users, setUsers] = useState([]);
  const [myData, setMyData] = useState(false);
  const [myRole, setMyRole] = useState('');
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerLeft: () => (
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Swift Chat</Text>
      ),
      headerRight: () => (
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
          <Ionicons
            onPress={() => navigation.navigate('Chats')}
            name="chatbox-ellipses-outline"
            size={24}
            color="black"
          />
          <MaterialIcons
            onPress={() => navigation.navigate('Friends')}
            name="people-outline"
            size={24}
            color="black"
          />
        </View>
      ),
    });
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const user = await AsyncStorage.getItem('user');
      const myProfile = JSON.parse(user);
      setMyData(myProfile);
      setMyRole(myProfile.role);
      console.log('user', myProfile._id);
      // const decodedToken = jwt_decode(token);
      // const userId = decodedToken.userId;
      // setUserId(userId);

      axios
        .get(`${API_URL}/users`)
        .then(response => {
          setUsers(response.data);
        })
        .catch(error => {
          console.log('error retrieving users', error);
        });
    };

    fetchUsers();
  }, []);
  const logoutHandler = async () => {
    await AsyncStorage.removeItem('authToken');
    navigation.navigate('Login');
  };
  console.log('users', users);
  return (
    <View>
      <View style={{padding: 10}}>
        <Text style={{fontSize: 20, color: '#25194f', fontWeight: 'bold'}}>
          Hello {myRole == 'doctor' ? 'Doctor' : ''} {myData.name}
        </Text>
        <View style={{marginTop: 20}}>
          <Text style={{fontSize: 16, fontWeight: '500'}}>
            Contact {myRole == 'doctor' ? 'Patiens' : 'Doctors'}
          </Text>
          <View style={{marginTop:10,paddingHorizontal:5}}>
            {users.map(
              (item, index) =>
                item.role != myRole &&
                item._id != myData._id && <User key={index} item={item} email={myData.email} />,
            )}
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={logoutHandler}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
