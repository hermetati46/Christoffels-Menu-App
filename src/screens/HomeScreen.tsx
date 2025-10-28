import React, { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Platform } from 'react-native';
import { HomeScreenProps, MenuItem } from '../types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import MenuItemCard from '../components/MenuItem';

interface HomeProps extends HomeScreenProps {
  menuItems: MenuItem[];
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
}

const StatsCard = ({ title, value }: { title: string, value: string }) => (
  <View style={styles.statsCard}>
    <Text style={styles.statsCardTitle}>{title}</Text>
    <Text style={styles.statsCardValue}>{value}</Text>
  </View>
);

const APP_BACKGROUND = '#FBF8F1'; // Define warm background
const PRIMARY_COLOR = '#B48A60'; // Main brand color
const TEXT_DARK = '#3A3A3A';
const TEXT_LIGHT = '#595959';
const BORDER_COLOR = '#EAEAEA';
const CARD_BG = '#FFFFFF';

const HomeScreen = ({ navigation, route, menuItems, setMenuItems }: HomeProps) => {
  React.useEffect(() => {
    if (route.params?.newItem) {
      setMenuItems((prevItems) => [...prevItems, route.params.newItem]);
    }
  }, [route.params?.newItem, setMenuItems]);

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

  const stats = useMemo(() => {
    const courseStats = {
      Starters: { count: 0, totalPrice: 0 },
      Mains: { count: 0, totalPrice: 0 },
      Desserts: { count: 0, totalPrice: 0 },
    };

    menuItems.forEach(item => {
      if (courseStats[item.course]) {
        courseStats[item.course].count += 1;
        courseStats[item.course].totalPrice += item.price;
      }
    });

    const calculateAverage = (course: 'Starters' | 'Mains' | 'Desserts') => {
      const { count, totalPrice } = courseStats[course];
      return count > 0 ? (totalPrice / count).toFixed(2) : '0.00';
    };

    return {
      Starters: { count: courseStats.Starters.count, averagePrice: calculateAverage('Starters') },
      Mains: { count: courseStats.Mains.count, averagePrice: calculateAverage('Mains') },
      Desserts: { count: courseStats.Desserts.count, averagePrice: calculateAverage('Desserts') },
    };
  }, [menuItems]);

  const renderItem = ({ item }: { item: MenuItem }) => (
    <MenuItemCard 
      item={item} 
      onDelete={handleDelete}
    />
  );

  const renderListHeader = () => (
    <View>
      <View style={styles.statsContainer}>
        <Text style={styles.statsHeader}>Total Items</Text>
        <View style={styles.statsRow}>
          <StatsCard title="Starters" value={`${stats.Starters.count} items`} />
          <StatsCard title="Mains" value={`${stats.Mains.count} items`} />
          <StatsCard title="Desserts" value={`${stats.Desserts.count} items`} />
        </View>
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.statsHeader}>Average Price</Text>
        <View style={styles.statsRow}>
          <StatsCard title="Starters" value={`$${stats.Starters.averagePrice}`} />
          <StatsCard title="Mains" value={`$${stats.Mains.averagePrice}`} />
          <StatsCard title="Desserts" value={`$${stats.Desserts.averagePrice}`} />
        </View>
      </View>

      <Text style={styles.menuListHeader}>Menu Items</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={menuItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={renderListHeader}
        ListEmptyComponent={
          <View>
            {renderListHeader()}
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
  safeArea: { flex: 1, backgroundColor: APP_BACKGROUND },
  statsContainer: {
    marginBottom: 24,
  },
  statsHeader: {
    fontSize: 22,
    fontWeight: '600',
    color: TEXT_DARK,
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: -5, // Counteract card margin
  },
  statsCard: {
    flex: 1,
    backgroundColor: CARD_BG,
    borderRadius: 15,
    padding: 16,
    marginHorizontal: 5,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
      }
    }),
  },
  statsCardTitle: {
    fontSize: 14,
    color: TEXT_LIGHT,
    marginBottom: 6,
    fontWeight: '500',
  },
  statsCardValue: {
    fontSize: 21,
    fontWeight: '600',
    color: TEXT_DARK,
  },
  menuListHeader: {
    fontSize: 22,
    fontWeight: '600',
    color: TEXT_DARK,
    marginBottom: 12,
    marginTop: 16,
  },
  listContainer: { 
    paddingBottom: 100, 
    paddingHorizontal: 16 
  },
  footer: { 
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    right: 0, 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    paddingVertical: 12, 
    paddingBottom: Platform.OS === 'ios' ? 34 : 20, // Better safe area handling for bottom
    borderTopWidth: 1, 
    borderTopColor: BORDER_COLOR, 
    backgroundColor: CARD_BG 
  },
  button: { 
    flexDirection: 'row', 
    backgroundColor: PRIMARY_COLOR, 
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
  emptyText: { textAlign: 'center', marginTop: 30, fontSize: 16, color: TEXT_LIGHT },
});

export default HomeScreen;