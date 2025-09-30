import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { FilterScreenProps, MenuItem } from '../types';
import { SafeAreaView } from 'react-native-safe-area-context'; // CORRECT IMPORT

type FilterType = 'All' | 'Starters' | 'Mains' | 'Desserts';

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
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Today's Menu</Text>
      </View>
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
  safeArea: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { paddingVertical: 20, paddingHorizontal: 16 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', color: '#343A40' },
  filterContainer: { flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 16, paddingHorizontal: 16 },
  filterButton: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, backgroundColor: '#E9ECEF' },
  activeFilterButton: { backgroundColor: '#C19A6B' },
  filterButtonText: { fontSize: 14, fontWeight: '600', color: '#495057' },
  activeFilterButtonText: { color: '#FFFFFF' },
  listContainer: { paddingBottom: 100, paddingHorizontal: 16 },
  itemContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  itemTextContainer: { flex: 1, marginRight: 10 },
  itemTitle: { fontSize: 18, fontWeight: '600', color: '#212529' },
  itemDescription: { fontSize: 14, color: '#6C757D', marginTop: 4 },
  itemPrice: { fontSize: 16, fontWeight: 'bold', color: '#212529' },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingVertical: 12, paddingBottom: 25, borderTopWidth: 1, borderTopColor: '#E9ECEF', backgroundColor: '#FFFFFF', alignItems: 'center' },
  backButton: { backgroundColor: '#6C757D', paddingVertical: 14, paddingHorizontal: 30, borderRadius: 30 },
  backButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  emptyText: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#6C757D' },
});

export default FilterScreen;








/*
import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { FilterScreenProps, MenuItem } from '../types';

type FilterType = 'All' | 'Starters' | 'Mains' | 'Desserts';

const FilterScreen = ({ navigation, route }: FilterScreenProps) => {
  const { menuItems } = route.params;
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');

  const filteredItems = useMemo(() => {
    if (activeFilter === 'All') {
      return menuItems;
    }
    return menuItems.filter(item => item.course === activeFilter);
  }, [menuItems, activeFilter]);

  const renderItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.itemContainer}>
      <View>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
      </View>
      <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Today's Menu</Text>
      </View>
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
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#EEE' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
  filterContainer: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#EEE' },
  filterButton: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20, backgroundColor: '#F0F0F0' },
  activeFilterButton: { backgroundColor: '#007BFF' },
  filterButtonText: { fontSize: 16, color: '#333' },
  activeFilterButtonText: { color: '#FFFFFF', fontWeight: 'bold' },
  listContainer: { paddingBottom: 100 },
  itemContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, backgroundColor: '#FAFAFA', borderBottomWidth: 1, borderBottomColor: '#F0F0F0', marginHorizontal: 10, marginTop: 10, borderRadius: 8 },
  itemTitle: { fontSize: 18, fontWeight: 'bold' },
  itemDescription: { fontSize: 14, color: '#888', marginTop: 4, maxWidth: '90%' },
  itemPrice: { fontSize: 16, fontWeight: '600' },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingVertical: 20, borderTopWidth: 1, borderTopColor: '#EEE', backgroundColor: '#FFF', alignItems: 'center' },
  backButton: { backgroundColor: '#6C757D', paddingVertical: 15, paddingHorizontal: 40, borderRadius: 8 },
  backButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  emptyText: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#888' },
});

export default FilterScreen;
*/