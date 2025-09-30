import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  course: 'Starters' | 'Mains' | 'Desserts';
}

export type RootStackParamList = {
  Welcome: undefined;
  Home: { newItem?: MenuItem };
  AddItem: { currentItemCount: number };
  Filter: { menuItems: MenuItem[] };
};

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type AddItemScreenProps = NativeStackScreenProps<RootStackParamList, 'AddItem'>;
export type FilterScreenProps = NativeStackScreenProps<RootStackParamList, 'Filter'>;
export type WelcomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Welcome'>;