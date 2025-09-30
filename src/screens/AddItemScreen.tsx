import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { AddItemScreenProps, MenuItem } from '../types';
import { SafeAreaView } from 'react-native-safe-area-context';

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
        <Text style={styles.headerTitle}>Add New Item</Text>
        <Text style={styles.label}>Dish Name</Text>
        <TextInput style={styles.input} placeholder="e.g., Bruschetta" value={name} onChangeText={setName} />
        
        <Text style={styles.label}>Description</Text>
        <TextInput style={styles.input} placeholder="e.g., Grilled bread with tomatoes" value={description} onChangeText={setDescription} />

        <Text style={styles.label}>Price</Text>
        <TextInput style={styles.input} placeholder="e.g., 8.50" value={price} onChangeText={setPrice} keyboardType="numeric" />
        
        <Text style={styles.label}>Course</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={course} onValueChange={(itemValue) => setCourse(itemValue)} style={styles.picker}>
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
  safeArea: { flex: 1, backgroundColor: '#F8F9FA' },
  container: { flexGrow: 1, padding: 16 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 24, color: '#343A40' },
  label: { fontSize: 16, color: '#6C757D', marginBottom: 8 },
  input: { backgroundColor: '#FFFFFF', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 8, fontSize: 16, marginBottom: 16, borderWidth: 1, borderColor: '#DEE2E6' },
  pickerContainer: { borderWidth: 1, borderColor: '#DEE2E6', borderRadius: 8, backgroundColor: '#FFFFFF', marginBottom: 24 },
  picker: { height: 50 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  button: { paddingVertical: 16, borderRadius: 30, flex: 1, marginHorizontal: 8, alignItems: 'center' },
  saveButton: { backgroundColor: '#28A745' },
  cancelButton: { backgroundColor: '#6C757D' },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});

export default AddItemScreen;








/*
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { AddItemScreenProps, MenuItem } from '../types';

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

    // Navigate back to Home and pass the new item as a parameter
    navigation.navigate('Home', { newItem });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Add New Item</Text>
        <TextInput
          style={styles.input}
          placeholder="Dish Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
        <TextInput
          style={styles.input}
          placeholder="Price"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
        <Text style={styles.pickerLabel}>Select Course</Text>
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
          <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  container: { flex: 1, padding: 20 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#CCC', padding: 15, borderRadius: 8, marginBottom: 15, fontSize: 16 },
  pickerLabel: { fontSize: 16, color: '#555', marginBottom: 5, marginLeft: 5 },
  pickerContainer: { borderWidth: 1, borderColor: '#CCC', borderRadius: 8, marginBottom: 20 },
  picker: { height: 50 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 },
  button: { paddingVertical: 15, paddingHorizontal: 40, borderRadius: 8 },
  saveButton: { backgroundColor: '#28A745' },
  cancelButton: { backgroundColor: '#DC3545' },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});

export default AddItemScreen;
*/