import React, { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Context } from '../context/GroceryContext';
import GroceryItemForm from '../components/GroceryItemForm';
const CreateScreen = ({ navigation }) => {
  const { addGroceryItem } = useContext(Context);

  return <GroceryItemForm onSubmit={(title, category) => {
    addGroceryItem(title, category, () => navigation.navigate('Index'));
  }} />
};

const styles = StyleSheet.create({
  
});

export default CreateScreen;