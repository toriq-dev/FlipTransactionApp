import React from 'react';
import { View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const TransactionList = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Button title="Back" onPress={() => navigation.goBack()} />
    </View>
  );
};