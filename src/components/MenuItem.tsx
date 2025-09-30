import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'; // Import Platform
import { Feather } from '@expo/vector-icons';
import { MenuItem } from '../types';

interface MenuItemCardProps {
  item: MenuItem;
  onDelete: (id: string) => void;
}

const MenuItemCard = ({ item, onDelete }: MenuItemCardProps) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.topRow}>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.deleteButton}>
          <Feather name="trash-2" size={22} color="#DC3545" />
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
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,

    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
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
    marginBottom: 8,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    flex: 1,
  },
  itemCourse: {
    fontSize: 14,
    color: '#FFFFFF',
    backgroundColor: '#C19A6B',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    overflow: 'hidden',
    fontWeight: '500',
    marginRight: 10,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212529',
  },
  itemDescription: {
    fontSize: 14,
    color: '#6C757D',
  },
  deleteButton: {
    paddingLeft: 10,
  },
});

export default MenuItemCard;



/*
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { MenuItem } from '../types';

// Define the props that this component will accept
interface MenuItemCardProps {
  item: MenuItem;
  onDelete: (id: string) => void; // A function to call when the delete icon is pressed
}

const MenuItemCard = ({ item, onDelete }: MenuItemCardProps) => {
  return (
    <View style={styles.itemContainer}>
      {/* Top Row: Dish Name and Delete Icon 
      <View style={styles.topRow}>
        <Text style={styles.itemTitle}>{item.name}</Text>
        {/* The TouchableOpacity now correctly calls the onDelete function passed in via props 
        <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.deleteButton}>
          <Feather name="trash-2" size={22} color="#DC3545" />
        </TouchableOpacity>
      </View>
      
      {/* Middle Row: Course and Price 
      <View style={styles.middleRow}>
        <Text style={styles.itemCourse}>{item.course}</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
      </View>

      {/* Bottom: Description 
      <Text style={styles.itemDescription}>{item.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
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
    marginBottom: 8,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    flex: 1,
  },
  itemCourse: {
    fontSize: 14,
    color: '#FFFFFF',
    backgroundColor: '#C19A6B',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    overflow: 'hidden',
    fontWeight: '500',
    marginRight: 10,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212529',
  },
  itemDescription: {
    fontSize: 14,
    color: '#6C757D',
  },
  deleteButton: {
    paddingLeft: 10,
  },
});

export default MenuItemCard;
*/