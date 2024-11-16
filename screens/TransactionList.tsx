import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { useFetchTransactions } from '../hooks/useFetchTransactions';
import { TransactionItem } from '../components/TransactionItem';
import { SearchBar } from '../components/SearchBar';
import { SortModal } from '../components/SortModal';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';

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
    const filtered = transactions.filter((transaction) => {
      const nameMatch = transaction.beneficiary_name
        .toLowerCase()
        .includes(text.toLowerCase());
      const senderBankMatch = transaction.sender_bank
        .toLowerCase()
        .includes(text.toLowerCase());
      const beneficiaryBankMatch = transaction.beneficiary_bank
        .toLowerCase()
        .includes(text.toLowerCase());
      const amountMatch = transaction.amount.toString().includes(text);

      return nameMatch || senderBankMatch || beneficiaryBankMatch || amountMatch;
    });
    setFilteredTransactions(filtered);
  };

  const handleSort = (type: string, label: string) => {
    const sorted = [...filteredTransactions].sort((a, b) => {
      if (type === 'name-asc') {
        return a.beneficiary_name.localeCompare(b.beneficiary_name);
      }
      if (type === 'name-desc') {
        return b.beneficiary_name.localeCompare(a.beneficiary_name);
      }
      if (type === 'date-newest') {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
      if (type === 'date-oldest') {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      }
      return 0;
    });

    setFilteredTransactions(sorted);
    setSelectedSort(label);
    setSortModalVisible(false);
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
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
