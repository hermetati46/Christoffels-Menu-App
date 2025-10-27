import React, { useMemo } from 'react'; // Import useMemo
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Platform } from 'react-native';
import { HomeScreenProps, MenuItem } from '../types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import MenuItemCard from '../components/MenuItem';

interface HomeProps extends HomeScreenProps {
  menuItems: MenuItem[];
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
}

// A new component for rendering the stat cards
const StatsCard = ({ title, value }: { title: string, value: string }) => (
  <View style={styles.statsCard}>
    <Text style={styles.statsCardTitle}>{title}</Text>
    <Text style={styles.statsCardValue}>{value}</Text>
  </View>
);

const HomeScreen = ({ navigation, route, menuItems, setMenuItems }: HomeProps) => {
  React.useEffect(() => {
    if (route.params?.newItem) {
      setMenuItems((prevItems) => [...prevItems, route.params.newItem]);
    }
  }, [route.params?.newItem, setMenuItems]); // Added setMenuItems dependency

  const handleDelete = (id: string) => {
    if (Platform.OS === 'web') {
      const userConfirmed = window.confirm("Are you sure you want to delete this menu item?");
      if (userConfirmed) {
        setMenuItems(items => items.filter(item => item.id !== id));
      }
    } else {
      Alert.alert(
        "Delete Item",
        "Are you sure you want to delete this menu item?",
        [
          { text: "Cancel", style: "cancel" },
          { text: "OK", onPress: () => setMenuItems(items => items.filter(item => item.id !== id)) }
        ]
      );
    }
  };

  // Calculate stats using useMemo so it only runs when menuItems changes
  const stats = useMemo(() => {
    const courseStats = {
      Starters: { count: 0, totalPrice: 0 },
      Mains: { count: 0, totalPrice: 0 },
      Desserts: { count: 0, totalPrice: 0 },
    };

    // Calculate total count and price for each course
    menuItems.forEach(item => {
      if (courseStats[item.course]) {
        courseStats[item.course].count += 1;
        courseStats[item.course].totalPrice += item.price;
      }
    });

    // Helper to calculate average and format it
    const calculateAverage = (course: 'Starters' | 'Mains' | 'Desserts') => {
      const { count, totalPrice } = courseStats[course];
      return count > 0 ? (totalPrice / count).toFixed(2) : '0.00';
    };

    return {
      Starters: {
        count: courseStats.Starters.count,
        averagePrice: calculateAverage('Starters'),
      },
      Mains: {
        count: courseStats.Mains.count,
        averagePrice: calculateAverage('Mains'),
      },
      Desserts: {
        count: courseStats.Desserts.count,
        averagePrice: calculateAverage('Desserts'),
      },
    };
  }, [menuItems]);

  const renderItem = ({ item }: { item: MenuItem }) => (
    <MenuItemCard 
      item={item} 
      onDelete={handleDelete}
    />
  );

  // This component renders the new stats sections
  const renderListHeader = () => (
    <View>
      {/* Total Items Section */}
      <View style={styles.statsContainer}>
        <Text style={styles.statsHeader}>Total Items</Text>
        <View style={styles.statsRow}>
          <StatsCard title="Starters" value={`${stats.Starters.count} items`} />
          <StatsCard title="Mains" value={`${stats.Mains.count} items`} />
          <StatsCard title="Desserts" value={`${stats.Desserts.count} items`} />
        </View>
      </View>

      {/* Average Price Section */}
      <View style={styles.statsContainer}>
        <Text style={styles.statsHeader}>Average Price</Text>
        <View style={styles.statsRow}>
          <StatsCard title="Starters" value={`$${stats.Starters.averagePrice}`} />
          <StatsCard title="Mains" value={`$${stats.Mains.averagePrice}`} />
          <StatsCard title="Desserts" value={`$${stats.Desserts.averagePrice}`} />
        </View>
      </View>

      {/* Title for the menu list */}
      <Text style={styles.menuListHeader}>Menu Items</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Christoffel's Menu</Text>
      </View>
      <FlatList
        data={menuItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={renderListHeader} // Add the stats as a header to the list
        ListEmptyComponent={
          <View>
            {renderListHeader()} {/* Show header even when list is empty */}
            <Text style={styles.emptyText}>No menu items found. Add one!</Text>
          </View>
        }
      />
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddItem', { currentItemCount: menuItems.length })}>
          <Feather name="plus" size={20} color="#FFFFFF" />
          <Text style={styles.buttonText}>Add Item</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Filter', { menuItems })}>
          <Feather name="eye" size={20} color="#FFFFFF" />
          <Text style={styles.buttonText}>Guest View</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { paddingVertical: 20, paddingHorizontal: 16 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', color: '#343A40' },
  
  // --- New Stats Styles ---
  statsContainer: {
    marginBottom: 24,
  },
  statsHeader: {
    fontSize: 20,
    fontWeight: '600',
    color: '#495057', // Using a color from your screenshot's palette
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statsCard: {
    flex: 1, // Each card will take up equal space
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4, // Add slight spacing between cards
    alignItems: 'center',
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
  statsCardTitle: {
    fontSize: 14,
    color: '#6C757D',
    marginBottom: 4,
  },
  statsCardValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212529',
  },
  menuListHeader: {
    fontSize: 20,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 12,
    marginTop: 16, // Add space before the list starts
  },
  // --- End New Stats Styles ---

  listContainer: { 
    paddingBottom: 100, 
    paddingHorizontal: 16 
  },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 12, paddingBottom: 25, borderTopWidth: 1, borderTopColor: '#E9ECEF', backgroundColor: '#FFFFFF' },
  button: { 
    flexDirection: 'row', 
    backgroundColor: '#C19A6B', 
    paddingVertical: 12, 
    paddingHorizontal: 20, 
    borderRadius: 30, 
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }
    }),
  },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold', marginLeft: 8 },
  emptyText: { textAlign: 'center', marginTop: 30, fontSize: 16, color: '#6C757D' }, // Adjusted margin
});

export default HomeScreen;