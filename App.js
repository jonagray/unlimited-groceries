import React, {useState} from 'react';
import {
  StyleSheet,
  Alert,
  View,
  Text,
  Button,
  ScrollView,
  TextInput,
  ActivityIndicator,
  FlatList,
  TouchableOpacity
} from 'react-native';
import CheckBox from 'react-native-check-box';
import {db} from './src/firebase/config';
import { Feather } from '@expo/vector-icons';

// import styles from './styles';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      groceries: {},
      groceryList: '',
    };

    this.addNewGrocery = this.addNewGrocery.bind(this);
    // this.deleteGrocery = this.deleteGrocery.bind(this);
    this.clearGroceries = this.clearGroceries.bind(this);
    this.removeGrocery = this.removeGrocery.bind(this);

  }

  componentDidMount() {
    db.ref('/groceries').on('value', querySnapShot => {
      let data = querySnapShot.val() ? querySnapShot.val() : {};

      let groceryItems = {...data};
      this.setState({
        groceries: groceryItems,
      });
    });
  }

  addNewGrocery() {
    db.ref('/groceries').push({
      done: false,
      groceryItem: this.state.groceryList,
    });
    // Alert.alert('Action!', 'A new To-do item was created');
    this.setState({
      groceryList: '',
    });
  }

  removeGrocery(id) {
    db.ref(`/groceries/${id}`).remove();
  }

  clearGroceries() {
    db.ref('/groceries').remove();
  }

  render() {
    let groceryKeys = Object.keys(this.state.groceries);

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyle}>


        <TextInput
          placeholder="Add New Grocery"
          value={this.state.groceryList}
          style={styles.textInput}
          onChangeText={e => {
            this.setState({
              groceryList: e,
            });
          }}
          onSubmitEditing={this.addNewGrocery}
        />


        <View>
          {groceryKeys.length > 0 ? (
            groceryKeys.map(key => (
              <GroceryItem
                key={key}
                id={key}
                groceryItem={this.state.groceries[key]}
              />
            ))
          ) : (
            <Text>No Grocery Items</Text>
          )}
          
        </View>

                {/* <Button
          title="Add New Grocery Item"
          onPress={this.addNewGrocery}
          color="lightgreen"
        /> */}

        <View style={{marginTop: 50}}>
          <Button title="Clear Groceries" onPress={this.clearGroceries} color="red" />
        </View>

      </ScrollView>
    );

  }
}

const GroceryItem = ({groceryItem: {groceryItem: name, done}, id}) => {
  const [doneState, setDone] = useState(done);



  const onRemove = () => {
    setDone(!doneState);
    db.ref(`/groceries/${id}`).remove();
  };

  const onCheck = () => {
    setDone(!doneState);
    db.ref('/groceries').update({
      [id]: {
        groceryItem: name,
        done: !doneState,
      },
    });
  };

  return (
    <View style={styles.groceryItem}>
      <CheckBox
        checkBoxColor="skyblue"
        onClick={onCheck}
        isChecked={doneState}
        // disabled={!doneState}
      />
      <Text style={[styles.groceryText, {opacity: doneState ? 0.2 : 1}]}>
        {name}
      </Text>

      <TouchableOpacity onPress={() => onRemove()}>
        <Feather style={styles.icon} name="trash" />
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainerStyle: {
    alignItems: 'center',
  },

  textInput: {
    borderWidth: 1,
    borderColor: '#afafaf',
    width: '80%',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 20,
    fontSize: 20,
    marginTop: 75
  },
  groceryItem: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
  },
  groceryText: {
    borderColor: '#afafaf',
    paddingHorizontal: 5,
    paddingVertical: 7,
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    minWidth: '50%',
    textAlign: 'center',
  },
  icon: {
    fontSize: 24,
    paddingLeft: 70
  }
});

export default App;