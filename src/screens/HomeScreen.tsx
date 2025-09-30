import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Platform } from 'react-native'; // Import Platform
import { HomeScreenProps, MenuItem } from '../types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import MenuItemCard from '../components/MenuItem';

interface HomeProps extends HomeScreenProps {
  menuItems: MenuItem[];
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
}

const HomeScreen = ({ navigation, route, menuItems, setMenuItems }: HomeProps) => {
  React.useEffect(() => {
    if (route.params?.newItem) {
      setMenuItems((prevItems) => [...prevItems, route.params.newItem]);
    }
  }, [route.params?.newItem]);

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

  const renderItem = ({ item }: { item: MenuItem }) => (
    <MenuItemCard 
      item={item} 
      onDelete={handleDelete}
    />
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
        ListEmptyComponent={<Text style={styles.emptyText}>No menu items found. Add one!</Text>}
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
  listContainer: { paddingBottom: 100, paddingHorizontal: 16 },
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
  emptyText: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#6C757D' },
});

export default HomeScreen;







/*
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { HomeScreenProps, MenuItem } from '../types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

interface HomeProps extends HomeScreenProps {
  menuItems: MenuItem[];
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
}

const HomeScreen = ({ navigation, route, menuItems, setMenuItems }: HomeProps) => {
  React.useEffect(() => {
    if (route.params?.newItem) {
      setMenuItems((prevItems) => [...prevItems, route.params.newItem]);
    }
  }, [route.params?.newItem]);

  const handleDelete = (id: string) => {
    Alert.alert(
      "Delete Item",
      "Are you sure you want to delete this menu item?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => setMenuItems(items => items.filter(item => item.id !== id)) }
      ]
    );
  };

  // The renderItem function is updated with the new structure
  const renderItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.itemContainer}>
      {/* Top Row: Dish Name and Delete Icon */
/*      <View style={styles.topRow}>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
          <Feather name="trash-2" size={22} color="#DC3545" />
        </TouchableOpacity>
      </View>
      
      {/* Middle Row: Course and Price */
/*      <View style={styles.middleRow}>
        <Text style={styles.itemCourse}>{item.course}</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
      </View>

      {/* Bottom: Description */
/*      <Text style={styles.itemDescription}>{item.description}</Text>
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
        ListEmptyComponent={<Text style={styles.emptyText}>No menu items found. Add one!</Text>}
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
  listContainer: { paddingBottom: 100, paddingHorizontal: 16 },
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
    flex: 1, // Allow title to take available space
  },
  itemCourse: {
    fontSize: 14,
    color: '#FFFFFF',
    backgroundColor: '#B49C6C',
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
    paddingLeft: 10, // Add padding to increase tap area
  },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 12, paddingBottom: 25, borderTopWidth: 1, borderTopColor: '#E9ECEF', backgroundColor: '#FFFFFF' },
  button: { flexDirection: 'row', backgroundColor: '#C19A6B', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 30, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold', marginLeft: 8 },
  emptyText: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#6C757D' },
});

export default HomeScreen;
*/





/*
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { HomeScreenProps, MenuItem } from '../types';
import { SafeAreaView } from 'react-native-safe-area-context'; // CORRECT IMPORT
import { Feather } from '@expo/vector-icons';

interface HomeProps extends HomeScreenProps {
  menuItems: MenuItem[];
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
}

const HomeScreen = ({ navigation, route, menuItems, setMenuItems }: HomeProps) => {
  React.useEffect(() => {
    if (route.params?.newItem) {
      setMenuItems((prevItems) => [...prevItems, route.params.newItem]);
    }
  }, [route.params?.newItem]);

  const handleDelete = (id: string) => {
    Alert.alert(
      "Delete Item",
      "Are you sure you want to delete this menu item?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => setMenuItems(items => items.filter(item => item.id !== id)) }
      ]
    );
  };

  const renderItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <View style={styles.itemDetailsRow}>
          <Text style={styles.itemCourse}>{item.course}</Text>
          <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
        <Feather name="trash-2" size={22} color="#DC3545" />
      </TouchableOpacity>
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
        ListEmptyComponent={<Text style={styles.emptyText}>No menu items found. Add one!</Text>}
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
  listContainer: { paddingBottom: 100, paddingHorizontal: 16 },
  itemContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  itemTextContainer: { flex: 1, marginRight: 10 },
  itemTitle: { fontSize: 18, fontWeight: '600', color: '#212529' },
  itemDescription: { fontSize: 14, color: '#6C757D', marginVertical: 4 },
  itemDetailsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  itemCourse: { fontSize: 14, color: '#FFFFFF', backgroundColor: '#B49C6C', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8, overflow: 'hidden', fontWeight: '500' },
  itemPrice: { fontSize: 16, fontWeight: 'bold', color: '#212529' },
  deleteButton: { padding: 8 },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 12, paddingBottom: 25, borderTopWidth: 1, borderTopColor: '#E9ECEF', backgroundColor: '#FFFFFF' },
  button: { flexDirection: 'row', backgroundColor: '#C19A6B', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 30, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold', marginLeft: 8 },
  emptyText: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#6C757D' },
});

export default HomeScreen;
*/







/*
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Alert } from 'react-native';
import { HomeScreenProps, MenuItem } from '../types';

// We receive menuItems and setMenuItems as props from the navigator
interface HomeProps extends HomeScreenProps {
  menuItems: MenuItem[];
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
}

const HomeScreen = ({ navigation, route, menuItems, setMenuItems }: HomeProps) => {
  // Effect to add a new item when navigating back from the AddItemScreen
  React.useEffect(() => {
    if (route.params?.newItem) {
      setMenuItems((prevItems) => [...prevItems, route.params.newItem]);
    }
  }, [route.params?.newItem]);

  const handleDelete = (id: string) => {
    Alert.alert(
      "Delete Item",
      "Are you sure you want to delete this menu item?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => setMenuItems(items => items.filter(item => item.id !== id)) }
      ]
    );
  };

  const renderItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <Text style={styles.itemCourse}>{item.course}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
      </View>
      <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>🗑️</Text>
      </TouchableOpacity>
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
        ListEmptyComponent={<Text style={styles.emptyText}>No menu items found. Add one!</Text>}
      />
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddItem', { currentItemCount: menuItems.length })}>
          <Text style={styles.buttonText}>Add Item</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Filter', { menuItems })}>
          <Text style={styles.buttonText}>Filter (Guest View)</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#EEE' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
  listContainer: { paddingBottom: 100 },
  itemContainer: { flexDirection: 'row', padding: 15, borderBottomWidth: 1, borderBottomColor: '#F0F0F0', alignItems: 'center', backgroundColor: '#FAFAFA', marginHorizontal: 10, marginTop: 10, borderRadius: 8 },
  itemTextContainer: { flex: 1 },
  itemTitle: { fontSize: 18, fontWeight: 'bold' },
  itemCourse: { fontSize: 14, color: '#666', fontStyle: 'italic', marginVertical: 4 },
  itemDescription: { fontSize: 14, color: '#888' },
  itemPrice: { fontSize: 16, fontWeight: '600', color: '#333', marginTop: 5 },
  deleteButton: { padding: 10 },
  deleteButtonText: { fontSize: 24 },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 15, borderTopWidth: 1, borderTopColor: '#EEE', backgroundColor: '#FFF' },
  button: { backgroundColor: '#007BFF', paddingVertical: 15, paddingHorizontal: 30, borderRadius: 8 },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  emptyText: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#888' },
});

export default HomeScreen;
*/