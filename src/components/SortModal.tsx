import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Button } from 'react-native';

interface SortModalProps {
  visible: boolean;
  onClose: () => void;
  onSort: (type: string, label: string) => void;
}

export const SortModal: React.FC<SortModalProps> = ({ visible, onClose, onSort }) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Urutkan</Text>
          <TouchableOpacity onPress={() => onSort('name-asc', 'Nama A-Z')}>
            <Text style={styles.option}>Nama A-Z</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onSort('name-desc', 'Nama Z-A')}>
            <Text style={styles.option}>Nama Z-A</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onSort('date-newest', 'Tanggal Terbaru')}>
            <Text style={styles.option}>Tanggal Terbaru</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onSort('date-oldest', 'Tanggal Terlama')}>
            <Text style={styles.option}>Tanggal Terlama</Text>
          </TouchableOpacity>
          <Button title="Tutup" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    width: '80%',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    marginBottom: 16,
  },
  option: {
    padding: 8,
    fontSize: 14,
  },
});
