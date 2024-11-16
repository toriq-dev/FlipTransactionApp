import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/RootStack';
import { formatDate } from '../utils/formatDate';

type TransactionDetailRouteProp = RouteProp<RootStackParamList, 'TransactionDetail'>;

export const TransactionDetail = () => {
  const route = useRoute<TransactionDetailRouteProp>();
  const { transaction } = route.params;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.transactionId}>ID TRANSAKSI: #{transaction.id}</Text>
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.sectionTitle}>DETAIL TRANSAKSI</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.closeButton}>Tutup</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.bankText}>{transaction.sender_bank.toUpperCase()} ➔ {transaction.beneficiary_bank.toUpperCase()}</Text>
        <Text style={styles.beneficiaryName}>- {transaction.beneficiary_name}</Text>
        <Text style={styles.accountNumber}>{transaction.account_number}</Text>

        <View style={styles.row}>
          <Text style={styles.label}>NOMINAL</Text>
          <Text style={styles.value}>Rp{transaction.amount.toLocaleString()}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>BERITA TRANSFER</Text>
          <Text style={styles.value}>{transaction.remark}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>KODE UNIK</Text>
          <Text style={styles.value}>{transaction.unique_code}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>WAKTU DIBUAT</Text>
          <Text style={styles.value}>{formatDate(transaction.created_at)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFF',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  transactionId: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  closeButton: {
    color: 'orange',
    fontSize: 12,
  },
  content: {
    paddingVertical: 8,
  },
  bankText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  beneficiaryName: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  accountNumber: {
    color: '#666',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    color: '#333',
  },
});