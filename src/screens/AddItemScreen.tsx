import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { AddItemScreenProps, MenuItem } from '../types';
import { SafeAreaView } from 'react-native-safe-area-context';

// Define colors
const APP_BACKGROUND = '#FBF8F1';
const TEXT_DARK = '#3A3A3A';
const TEXT_LIGHT = '#595959';
const BORDER_COLOR = '#EAEAEA';
const CARD_BG = '#FFFFFF';
const SAVE_COLOR = '#5CB85C';
const CANCEL_COLOR = '#8A8A8A';

const AddItemScreen = ({ navigation, route }: AddItemScreenProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [course, setCourse] = useState<'Starters' | 'Mains' | 'Desserts'>('Starters');

  const handleSave = () => {
    if (!name || !description || !price) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    const priceValue = parseFloat(price);
    if (isNaN(priceValue) || priceValue <= 0) {
      Alert.alert("Error", "Please enter a valid price.");
      return;
    }

    const newItem: MenuItem = {
      id: `item-${route.params.currentItemCount + 1}-${Date.now()}`,
      name,
      description,
      price: priceValue,
      course,
    };

    navigation.navigate('Home', { newItem });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Dish Name</Text>
        <TextInput style={styles.input} placeholder="e.g., Bruschetta" value={name} onChangeText={setName} placeholderTextColor="#999" />
        
        <Text style={styles.label}>Description</Text>
        <TextInput style={[styles.input, styles.multilineInput]} placeholder="e.g., Grilled bread with tomatoes" value={description} onChangeText={setDescription} placeholderTextColor="#999" multiline />

        <Text style={styles.label}>Price</Text>
        <TextInput style={styles.input} placeholder="e.g., 8.50" value={price} onChangeText={setPrice} keyboardType="numeric" placeholderTextColor="#999" />
        
        <Text style={styles.label}>Course</Text>
        <View style={styles.pickerContainer}>
          <Picker 
            selectedValue={course} 
            onValueChange={(itemValue) => setCourse(itemValue)} 
            style={styles.picker}
          >
            <Picker.Item label="Starters" value="Starters" />
            <Picker.Item label="Mains" value="Mains" />
            <Picker.Item label="Desserts" value="Desserts" />
          </Picker>
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
            <Text style={styles.buttonText}>Save Item</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: APP_BACKGROUND },
  container: { flexGrow: 1, padding: 20 },
  label: { 
    fontSize: 16, 
    color: TEXT_LIGHT, 
    marginBottom: 10,
    fontWeight: '600',
  },
  input: { 
    backgroundColor: CARD_BG, 
    paddingHorizontal: 15, 
    paddingVertical: 15, 
    borderRadius: 10, 
    fontSize: 16, 
    marginBottom: 20, 
    borderWidth: 1, 
    borderColor: BORDER_COLOR,
    color: TEXT_DARK,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top', // for Android
  },
  pickerContainer: { 
    borderWidth: 1, 
    borderColor: BORDER_COLOR, 
    borderRadius: 10, 
    backgroundColor: CARD_BG, 
    marginBottom: 24,
    justifyContent: 'center',
  },
  picker: { 
    height: Platform.OS === 'ios' ? 180 : 50, // iOS needs a taller picker
    width: '100%',
  },
  buttonContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 30 
  },
  button: { 
    paddingVertical: 16, 
    borderRadius: 30, 
    flex: 1, 
    marginHorizontal: 5, 
    alignItems: 'center' 
  },
  saveButton: { backgroundColor: SAVE_COLOR },
  cancelButton: { backgroundColor: CANCEL_COLOR },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});

export default AddItemScreen;