import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const User = ({item,email}) => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity onPress={()=>navigation.navigate('Chat',{item:item,email})} style={{padding:20,backgroundColor:'#fefefe',marginBottom:10}}>
      <Text style={{fontSize:16,fontWeight:'500'}}> {item.name}</Text>
    </TouchableOpacity>
  )
}

export default User

const styles = StyleSheet.create({})