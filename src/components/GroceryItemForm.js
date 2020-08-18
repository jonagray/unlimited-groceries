import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

const GroceryItemForm = ({ onSubmit, initialValues }) => {

  const [title, setTitle] = useState(initialValues.title);
  const [category, setCategory] = useState(initialValues.category);

  return (
    <View>
      <Text style={styles.label}>Enter Title:</Text>
      <TextInput style={styles.input} value={title} onChangeText={(text) => setTitle(text)}/>
      <Text style={styles.label}>Enter Category:</Text>
      <TextInput style={styles.input} value={category} onChangeText={(category) => setCategory(category)}/>
      <Button 
        title="Save Grocery Item"
        onPress={() => onSubmit(title, category)}
        // onPress={() => {
        //   addBlogPost(title, category, () => {
        //     navigation.navigate('Index');
        //   });
        // }}
      />
    </View>
  );
  
};

GroceryItemForm.defaultProps = {
  initialValues: {
    title: '',
    category: ''
  }
};

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 15,
    padding: 5,
    margin: 5
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
    marginLeft: 5
  }
});

export default GroceryItemForm;