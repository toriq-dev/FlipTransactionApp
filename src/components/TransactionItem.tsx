import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { formatDate } from '../utils/formatDate';
import { Transaction } from '../types/transaction';

interface TransactionItemProps {
  transaction: Transaction;
  onPress: () => void;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, onPress }) => {
  const statusColor = transaction.status === 'SUCCESS' ? '#59b385' : '#fc614a';

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
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
        <Text style={transaction.status === 'SUCCESS' ? styles.statusText : styles.statusTextPending}>
          {transaction.status === 'SUCCESS' ? 'Berhasil' : 'Pengecekan'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export const MemoizedTransactionItem = React.memo(TransactionItem);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingRight: 8,
    overflow: 'hidden',
  },
  statusIndicator: {
    width: 8,
    height: '100%',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  bankInfo: {
    flex: 1,
    padding: 8,
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
    backgroundColor: '#59b385',
    height: 20,
    paddingHorizontal: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pending: {
    backgroundColor: '#fff',
    height: 20,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fc614a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    color: '#FFF',
    fontSize: 12,
  },
  statusTextPending: {
    color: '#000',
    fontSize: 12,
  },
});
