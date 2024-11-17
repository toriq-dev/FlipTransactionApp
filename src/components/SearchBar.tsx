import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSortPress: () => void;
  sortText: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChangeText, onSortPress, sortText }) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Icon name="search" size={20} color="#777" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Cari nama, bank, atau nominal"
          value={value}
          onChangeText={onChangeText}
        />
      </View>
      <TouchableOpacity style={styles.sortButton} onPress={onSortPress}>
        <Text style={styles.sortText}>{sortText}</Text>
        <Icon name="chevron-down" size={16} color="#fc614a" style={styles.arrowIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 16,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  arrowIcon: {
    marginLeft: 4,
  },
  input: {
    flex: 1,
    height: 40,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  sortText: {
    color: '#fc614a',
    fontWeight: 'bold',
    marginRight: 4,
    fontSize: 12,
  },
});
