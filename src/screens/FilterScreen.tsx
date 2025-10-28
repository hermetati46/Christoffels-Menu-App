import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Platform } from 'react-native';
import { FilterScreenProps, MenuItem } from '../types';
import { SafeAreaView } from 'react-native-safe-area-context';

type FilterType = 'All' | 'Starters' | 'Mains' | 'Desserts';

// Define colors
const APP_BACKGROUND = '#FBF8F1';
const PRIMARY_COLOR = '#B48A60';
const TEXT_DARK = '#3A3A3A';
const TEXT_LIGHT = '#595959';
const BORDER_COLOR = '#EAEAEA';
const CARD_BG = '#FFFFFF';
const CANCEL_COLOR = '#8A8A8A';

const FilterScreen = ({ navigation, route }: FilterScreenProps) => {
  const { menuItems } = route.params;
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');

  const filteredItems = useMemo(() => {
    if (activeFilter === 'All') return menuItems;
    return menuItems.filter(item => item.course === activeFilter);
  }, [menuItems, activeFilter]);

  const renderItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
      </View>
      <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.filterContainer}>
        {(['All', 'Starters', 'Mains', 'Desserts'] as FilterType[]).map(filter => (
          <TouchableOpacity
            key={filter}
            style={[styles.filterButton, activeFilter === filter && styles.activeFilterButton]}
            onPress={() => setActiveFilter(filter)}
          >
            <Text style={[styles.filterButtonText, activeFilter === filter && styles.activeFilterButtonText]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={filteredItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={<Text style={styles.emptyText}>No items for this course.</Text>}
      />
      <View style={styles.footer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Back To Dashboard</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: APP_BACKGROUND },
  filterContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  filterButton: { 
    paddingVertical: 10, 
    paddingHorizontal: 16, 
    borderRadius: 20, 
    backgroundColor: CARD_BG,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
  },
  activeFilterButton: { 
    backgroundColor: PRIMARY_COLOR,
    borderColor: PRIMARY_COLOR,
  },
  filterButtonText: { 
    fontSize: 14, 
    fontWeight: '600', 
    color: TEXT_LIGHT 
  },
  activeFilterButtonText: { color: '#FFFFFF' },
  listContainer: { 
    paddingBottom: 100, 
    paddingHorizontal: 16 
  },
  itemContainer: {
    backgroundColor: CARD_BG,
    borderRadius: 15,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  itemTextContainer: { flex: 1, marginRight: 10 },
  itemTitle: { 
    fontSize: 19, 
    fontWeight: '600', 
    color: TEXT_DARK 
  },
  itemDescription: { 
    fontSize: 14, 
    color: TEXT_LIGHT, 
    marginTop: 4,
    lineHeight: 20,
  },
  itemPrice: { 
    fontSize: 16, 
    fontWeight: '700', 
    color: TEXT_DARK 
  },
  footer: { 
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    right: 0, 
    paddingVertical: 12, 
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    borderTopWidth: 1, 
    borderTopColor: BORDER_COLOR, 
    backgroundColor: CARD_BG, 
    alignItems: 'center' 
  },
  backButton: { 
    backgroundColor: CANCEL_COLOR, 
    paddingVertical: 14, 
    paddingHorizontal: 30, 
    borderRadius: 30 
  },
  backButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  emptyText: { textAlign: 'center', marginTop: 50, fontSize: 16, color: TEXT_LIGHT },
});

export default FilterScreen;