import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';

interface SortModalProps {
  visible: boolean;
  onClose: () => void;
  onSort: (type: string, label: string) => void;
}

const SORT_OPTIONS = [
  { type: 'name-asc', label: 'Nama A-Z' },
  { type: 'name-desc', label: 'Nama Z-A' },
  { type: 'date-newest', label: 'Tanggal Terbaru' },
  { type: 'date-oldest', label: 'Tanggal Terlama' },
];

export const SortModal: React.FC<SortModalProps> = ({ visible, onClose, onSort }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Urutkan</Text>
          {SORT_OPTIONS.map((option) => (
            <TouchableOpacity key={option.type} onPress={() => onSort(option.type, option.label)}>
              <Text style={styles.option}>{option.label}</Text>
            </TouchableOpacity>
          ))}
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

export default SortModal;
