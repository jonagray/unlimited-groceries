import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Context } from '../context/GroceryContext';
import BlogPostForm from '../components/GroceryItemForm';

const EditScreen = ({ navigation }) => {
  const id = navigation.getParam('id');
  const { state, editGroceryItem } = useContext(Context);

  const groceryItem = state.find((groceryItem) => groceryItem.id === id);

  return (
    <GroceryItemForm
    initialValues={{ title: groceryItem.title, category: groceryItem.category }}
      onSubmit={(title, category) => {
        editBlogPost(id, title, category, () => navigation.pop());
      }}
    />
  );
};

const styles = StyleSheet.create({});

export default EditScreen;