import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './navigation/RootStack';
import { TransactionProvider } from './state/TransactionContext';

const App = () => {
  return (
    <TransactionProvider>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </TransactionProvider>
  );
};

export default App;
