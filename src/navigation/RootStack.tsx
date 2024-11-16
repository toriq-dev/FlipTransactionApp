import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TransactionList } from '../screens/TransactionList';
import { TransactionDetail } from '../screens/TransactionDetail';
import { Transaction } from '../types/transaction';

export type RootStackParamList = {
  TransactionList: undefined;
  TransactionDetail: { transaction: Transaction };
};

const Stack = createStackNavigator<RootStackParamList>();

const RootStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TransactionList"
        component={TransactionList}
        options={{ title: 'Transaction List' }}
      />
      <Stack.Screen
        name="TransactionDetail"
        component={TransactionDetail}
        options={{ title: 'Transaction Detail' }}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
