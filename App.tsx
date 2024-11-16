import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TransactionList } from './screens/TransactionList';
import { TransactionDetail } from './screens/TransactionDetail';
import { Transaction } from './hooks/useFetchTransactions';

export type RootStackParamList = {
  TransactionList: undefined;
  TransactionDetail: { transaction: Transaction };
};
const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TransactionList">
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
    </NavigationContainer>
  );
};

export default App;
