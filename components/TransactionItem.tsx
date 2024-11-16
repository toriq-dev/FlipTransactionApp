import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Transaction } from '../hooks/useFetchTransactions';

interface TransactionItemProps {
  transaction: Transaction;
  onPress: () => void;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, onPress }) => {
  // Determine the color based on the status
  const statusColor = transaction.status === 'SUCCESS' ? '#4CAF50' : '#FFC107';

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {/* Left status indicator */}
      <View style={[styles.statusIndicator, { backgroundColor: statusColor }]} />
      <View style={styles.bankInfo}>
        <Text style={styles.bankName}>
          {transaction.sender_bank.toUpperCase()} ➔ {transaction.beneficiary_bank.toUpperCase()}
        </Text>
        <Text style={styles.name}>{transaction.beneficiary_name}</Text>
        <Text style={styles.amountDate}>
          Rp{transaction.amount.toLocaleString()} • {formatDate(transaction.created_at)}
        </Text>
      </View>
      <View style={transaction.status === 'SUCCESS' ? styles.success : styles.pending}>
        <Text style={styles.statusText}>
          {transaction.status === 'SUCCESS' ? 'Berhasil' : 'Pengecekan'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingRight: 8,
    overflow: 'hidden', // Ensures no overflow
  },
  statusIndicator: {
    width: 8, // Width of the indicator
    height: '100%', // Full height of the container
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  bankInfo: {
    flex: 1,
    padding: 8, // Adds padding between the indicator and the text
  },
  bankName: {
    fontWeight: 'bold',
  },
  name: {
    color: '#333',
  },
  amountDate: {
    color: '#777',
  },
  success: {
    backgroundColor: 'green',
    height: 20,
    paddingHorizontal: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pending: {
    backgroundColor: 'orange',
    height: 20,
    paddingHorizontal: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    color: '#FFF',
    fontSize: 12,
  },
});
