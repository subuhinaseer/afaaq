import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Platform,
} from 'react-native';
import io from 'socket.io-client';

export default function ChatScreen({route}) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const params = route?.params?.item;
  const email =params.email
const recipientEmail=  route?.params?.email;
  // Replace 'http://your-server-ip:8000' with your Socket.io server URL
  const socket = io(Platform.OS=='ios'? 'http://localhost:4000':'http://10.0.2.2:4000');
console.log(recipientEmail)
  useEffect(() => {
    socket.emit('register', email);
    // socket.emit('register', recipientEmail);

    // Listen for private messages from the server
    socket.on('privateMessage', (msg) => {
      console.log('Received private message:', msg); // Check console to verify message reception
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('privateMessage', { recipientEmail, message });
      setMessages((prevMessages) => [...prevMessages, { sender: email, message }]);
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{params.name}</Text>
      <FlatList
        data={messages}
        renderItem={({item}) => (
          <View style={{backgroundColor:"#fff",paddingHorizontal:20,paddingVertical:12,
          marginBottom:10,
          borderRadius:20}}>
            <Text style={styles.message}>{item.message}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message"
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  message: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 4,
    marginRight: 8,
  },
});
