import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList, MenuItem } from '../types';

import WelcomeScreen from '../screens/WelcomeScreen';
import HomeScreen from '../screens/HomeScreen';
import AddItemScreen from '../screens/AddItemScreen';
import FilterScreen from '../screens/FilterScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const initialMenuItems: MenuItem[] = [
  { id: '1', name: 'Bruschetta', description: 'Grilled bread with tomatoes, garlic, and olive oil.', price: 8.50, course: 'Starters' },
  { id: '2', name: 'Spaghetti Carbonara', description: 'Pasta with eggs, cheese, pancetta, and pepper.', price: 15.00, course: 'Mains' },
  { id: '3', name: 'Tiramisu', description: 'Coffee-flavoured Italian dessert.', price: 7.00, course: 'Desserts' },
];

const AppNavigator = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);

  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Home">
        {(props) => (
          <HomeScreen
            {...props}
            menuItems={menuItems}
            setMenuItems={setMenuItems}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="AddItem" component={AddItemScreen} />
      <Stack.Screen name="Filter" component={FilterScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;








/*
import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList, MenuItem } from '../types';

import WelcomeScreen from '../screens/WelcomeScreen';
import HomeScreen from '../screens/HomeScreen';
import AddItemScreen from '../screens/AddItemScreen';
import FilterScreen from '../screens/FilterScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const initialMenuItems: MenuItem[] = [
  { id: '1', name: 'Bruschetta', description: 'Grilled bread with tomatoes, garlic, and olive oil.', price: 8.50, course: 'Starters' },
  { id: '2', name: 'Spaghetti Carbonara', description: 'Pasta with eggs, cheese, pancetta, and pepper.', price: 15.00, course: 'Mains' },
  { id: '3', name: 'Tiramisu', description: 'Coffee-flavoured Italian dessert.', price: 7.00, course: 'Desserts' },
];

const AppNavigator = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);

  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Home">
        {(props) => (
          <HomeScreen
            {...props}
            menuItems={menuItems}
            setMenuItems={setMenuItems}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="AddItem" component={AddItemScreen} />
      <Stack.Screen name="Filter" component={FilterScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
*/