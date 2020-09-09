import React, { useState, Component } from 'react';
// import {db} from '../firebase/config';
import firebase from '../firebase/config';
// import database from '@react-native-firebase/database';
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
import { Feather } from '@expo/vector-icons';

// const reference = database().ref('/groceries');

export default class MainScreen extends Component {
  constructor() {
    super();
    this.state = {
      uid: '',
      groceries: {},
      groceryList: '',
    };

    this.addNewGrocery = this.addNewGrocery.bind(this);
    this.removeGrocery = this.removeGrocery.bind(this);

  }

  //     db.ref('/groceries').on('value', querySnapShot => {

  componentDidMount() {
    firebase.database().ref('/groceries').on('value', querySnapShot => {
      let data = querySnapShot.val() ? querySnapShot.val() : {};

      let groceryItems = { ...data };
      this.setState({
        groceries: groceryItems,
      });
    });
  }

  //   addNewGrocery() {
//     db.ref('/groceries').push({
//       done: false,
//       groceryItem: this.state.groceryList,
//     });
//     // Alert.alert('Action!', 'A new To-do item was created');
//     this.setState({
//       groceryList: '',
//     });
//   }

  addNewGrocery() {
    firebase.database().ref('/groceries').push({
      done: false,
      groceryItem: this.state.groceryList,
    });
    this.setState({
      groceryList: '',
    });
  }

  removeGrocery(id) {
    firebase.database().ref(`/groceries/${id}`).remove();
  }

  signOut = () => {
    firebase.auth().signOut().then(() => {
      this.props.navigation.navigate('Login')
    })
      .catch(error => this.setState({ errorMessage: error.message }))
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

        {/* <View style={{marginTop: 50}}>
          <Button title="Clear Groceries" onPress={this.clearGroceries} color="red" />
        </View> */}

      </ScrollView>
    );

  }
}

const GroceryItem = ({ groceryItem: { groceryItem: name, done }, id }) => {
  const [doneState, setDone] = useState(done);



  const onRemove = () => {
    setDone(!doneState);
    firebase.database().ref(`/groceries/${id}`).remove();
  };

  const onCheck = () => {
    setDone(!doneState);
    firebase.database().ref('/groceries').update({
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
      <Text style={[styles.groceryText, { opacity: doneState ? 0.2 : 1 }]}>
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




//   render() {
//     this.state = {
//       displayName: firebase.auth().currentUser.displayName,
//       uid: firebase.auth().currentUser.uid
//     }
//     return (
//       <View style={styles.container}>
//         <Text style={styles.textStyle}>
//           Hello, {this.state.displayName}
//         </Text>

//         <Button
//           color="#3740FE"
//           title="Logout"
//           onPress={() => this.signOut()}
//         />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     display: "flex",
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 35,
//     backgroundColor: '#fff'
//   },
//   textStyle: {
//     fontSize: 15,
//     marginBottom: 20
//   }
// });