import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { useFetchTransactions } from '../hooks/useFetchTransactions';
import { TransactionItem } from '../components/TransactionItem';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../App'; // Import the RootStackParamList

export const TransactionList = () => {
  const { transactions } = useFetchTransactions();
  const [filteredTransactions] = useState(transactions);

  const navigation = useNavigation<NavigationProp<RootStackParamList, 'TransactionList'>>();

  return (
    <View>
      <FlatList
        data={transactions}
        renderItem={({ item }) => (
          <TransactionItem
            transaction={item}
            onPress={() => navigation.navigate('TransactionDetail', { transaction: item })}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default TransactionList;
