import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { MenuItem } from '../types';

interface MenuItemCardProps {
  item: MenuItem;
  onDelete: (id: string) => void;
}

// Define colors for consistency
const TEXT_DARK = '#3A3A3A';
const TEXT_LIGHT = '#595959';
const ACCENT_BG = '#D4B996';
const ACCENT_TEXT = '#5D4037';
const CARD_BG = '#FFFFFF';
const DELETE_COLOR = '#D9534F';

const MenuItemCard = ({ item, onDelete }: MenuItemCardProps) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.topRow}>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.deleteButton}>
          <Feather name="trash-2" size={22} color={DELETE_COLOR} />
        </TouchableOpacity>
      </View>
      <View style={styles.middleRow}>
        <Text style={styles.itemCourse}>{item.course}</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
      </View>
      <Text style={styles.itemDescription}>{item.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: CARD_BG,
    borderRadius: 15,
    padding: 16,
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 10,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
      }
    }),
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  middleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemTitle: {
    fontSize: 19,
    fontWeight: '600',
    color: TEXT_DARK,
    flex: 1, // Allow title to wrap
    marginRight: 8,
  },
  itemCourse: {
    fontSize: 13,
    color: ACCENT_TEXT,
    backgroundColor: ACCENT_BG,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 7,
    overflow: 'hidden',
    fontWeight: '600',
    marginRight: 10,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: TEXT_DARK,
  },
  itemDescription: {
    fontSize: 14,
    color: TEXT_LIGHT,
    lineHeight: 20, // Improve readability
  },
  deleteButton: {
    paddingLeft: 10, // Increase tap area
  },
});

export default MenuItemCard;