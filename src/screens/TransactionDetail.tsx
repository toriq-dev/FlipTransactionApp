import React, { useCallback, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/RootStack';
import { formatDate } from '../utils/formatDate';
import Clipboard from '@react-native-clipboard/clipboard';
import Icon from 'react-native-vector-icons/Ionicons';

type TransactionDetailRouteProp = RouteProp<RootStackParamList, 'TransactionDetail'>;

export const TransactionDetail = () => {
  const { params: { transaction } } = useRoute<TransactionDetailRouteProp>();
  const navigation = useNavigation();

  const handleCopyToClipboard = () => {
    Clipboard.setString(transaction.id);
    Alert.alert('Berhasil', 'ID Transaksi telah disalin ke clipboard.');
  };

  const headerLeft = useCallback(() => (
    <TouchableOpacity style={styles.customBackButton} onPress={() => navigation.goBack()}>
      <Icon name="arrow-back" size={20} color="#fc614a" />
    </TouchableOpacity>
  ), [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft,
    });
  }, [navigation, headerLeft]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.transactionId}>ID TRANSAKSI: #{transaction.id}</Text>
        <TouchableOpacity onPress={handleCopyToClipboard}>
          <Icon name="copy-outline" size={20} color="#fc614a" />
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      <View style={styles.detailContainer}>
        <Text style={styles.sectionTitle}>DETAIL TRANSAKSI</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.closeButton}>Tutup</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      <View style={styles.content}>
        <Text style={styles.bankText}>
          {transaction.sender_bank.toUpperCase()} ➔ {transaction.beneficiary_bank.toUpperCase()}
        </Text>

        <View style={styles.row}>
          <View style={styles.rowContent}>
            <Text style={styles.label}>- {transaction.beneficiary_name}</Text>
            <Text style={styles.value}>{transaction.account_number}</Text>
          </View>
          <View style={styles.rowContent}>
            <Text style={styles.label}>NOMINAL</Text>
            <Text style={styles.value}>Rp{transaction.amount.toLocaleString()}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.rowContent}>
            <Text style={styles.label}>BERITA TRANSFER</Text>
            <Text style={styles.value}>{transaction.remark}</Text>
          </View>
          <View style={styles.rowContent}>
            <Text style={styles.label}>KODE UNIK</Text>
            <Text style={styles.value}>{transaction.unique_code}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.rowContent}>
            <Text style={styles.label}>WAKTU DIBUAT</Text>
            <Text style={styles.value}>{formatDate(transaction.created_at)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#FFF',
    flex: 1,
  },
  customBackButton: {
    marginLeft: 10,
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
    color: '#fc614a',
    fontWeight: 'bold',
    fontSize: 14,
  },
  content: {
    paddingVertical: 8,
  },
  bankText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  rowContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 8,
  },
});

export default TransactionDetail;
