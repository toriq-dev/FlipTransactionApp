import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useFetchTransactions } from '../hooks/useFetchTransactions';
import { MemoizedTransactionItem } from '../components/TransactionItem';
import { SearchBar } from '../components/SearchBar';
import { SortModal } from '../components/SortModal';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/RootStack';
import { filterTransactions } from '../usecases/filterTransactions';
import { sortTransactions } from '../usecases/sortTransactions';

export const TransactionList = () => {
  const { transactions } = useFetchTransactions();
  const [filteredTransactions, setFilteredTransactions] = useState(transactions);
  const [searchText, setSearchText] = useState('');
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState('Urutkan');
  const navigation = useNavigation<NavigationProp<RootStackParamList, 'TransactionList'>>();

  useEffect(() => {
    setFilteredTransactions(transactions);
  }, [transactions]);

  const handleSearch = (text: string) => {
    setSearchText(text);
    const filtered = filterTransactions(transactions, text);
    setFilteredTransactions(filtered);
  };

  const handleSort = (type: string, label: string) => {
    const sorted = sortTransactions(filteredTransactions, type);
    setFilteredTransactions(sorted);
    setSelectedSort(label);
    setSortModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <SearchBar
        value={searchText}
        onChangeText={handleSearch}
        onSortPress={() => setSortModalVisible(true)}
        sortText={selectedSort}
      />

      <SortModal
        visible={sortModalVisible}
        onClose={() => setSortModalVisible(false)}
        onSort={handleSort}
      />

      <FlatList
        data={filteredTransactions}
        renderItem={({ item }) => (
          <MemoizedTransactionItem
            transaction={item}
            onPress={() => navigation.navigate('TransactionDetail', { transaction: item })}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      padding: 12,
      flex: 1,
    },
});

