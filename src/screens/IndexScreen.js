import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import { Context } from '../context/GroceryContext';
import { Feather } from '@expo/vector-icons';

const IndexScreen = ({ navigation }) => {
  const { state, deleteGroceryItem, getGroceries } = useContext(Context);

  useEffect(() => {
    getGroceries();

    const listener = navigation.addListener('didFocus', () => {
      getGroceries();
    });

    return () => {
      listener.remove();
    };

  }, []);
  
  return <View>
    <FlatList
      data={state}
      keyExtractor={(groceryItem) =>groceryItem.title}
      // line below - item is equivalent to our individual blog post objects
      renderItem={({ item }) => {
        return (
        <TouchableOpacity onPress={() => navigation.navigate('Show', { id: item.id })}>
          <View style={styles.row}>
            <Text style={styles.title}>{item.title} - {item.id}</Text>
            <TouchableOpacity onPress={() => deleteGroceryItem(item.id)}>
              <Feather style={styles.icon} name="trash" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        );
      }}
    />
  </View>
};

IndexScreen.navigationOptions = ({ navigation }) => {
    return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate('Create')}>
        <Feather name="plus" size={30} />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderColor: 'gray'
  },
  title: {
    fontSize: 18
  },
  icon: {
    fontSize: 24
  }
});

export default IndexScreen;