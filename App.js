import React, { Component } from 'react';

import { ActivityIndicator, Alert, FlatList, Text, StyleSheet, View, TextInput } from 'react-native';

export default class App extends Component {

  constructor(props) {

    super(props);

    this.state = {
      isLoading: true,
      text: '',
      data: []
    }

    this.arrayholder = [];
  }

  componentDidMount() {

    return fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson);
        this.setState({
          isLoading: false,
          data: responseJson,
        }, () => {

          this.arrayholder = responseJson;
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  GetFlatListItem(name) {
    Alert.alert(name);
  }

  searchData(text) {
    const newData = this.arrayholder.filter(item => {
      const itemData = item.name.toUpperCase().replace(/ /g, '');
      const textData = text.toUpperCase().replace(/ /g, '');
      //  const itemDataArray = itemData.split('');
      //  const textDataArray = textData.split('');
      // // console.log(itemDataArray.indexOf(textDataArray) > -1
      // const contains = itemDataArray.some(element => {
      //   return textDataArray.indexOf(element) !== -1;
      // });
      // return contains;
      return itemData.indexOf(textData) > -1;
    });
  
    this.setState({
      data: newData,
      text: text
      })
    }

    itemSeparator = () => {
      return (
        <View
          style={{
            height: .5,
            width: "100%",
            backgroundColor: "#000",
          }}
        />
      );
    }

    render() {
      if (this.state.isLoading) {
        return (
          <View style={{flex: 1, paddingTop: 20}}>
            <ActivityIndicator />
          </View>
        );
      }
   
      return (
   
        <View style={styles.MainContainer}>
   
        <TextInput 
         style={styles.textInput}
         onChangeText={(text) => this.searchData(text)}
         value={this.state.text}
         underlineColorAndroid='transparent'
         placeholder="Search Here" />

        <FlatList
          data={this.state.data}
          keyExtractor={ (item, index) => index.toString() }
          ItemSeparatorComponent={this.itemSeparator}
          renderItem={({ item }) => <Text style={styles.row}
          onPress={this.GetFlatListItem.bind(this, item.name)} >{item.name}</Text>}
          style={{ marginTop: 10 }} />

      </View>
    );
  }
}

const styles = StyleSheet.create({

  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    margin: 5,

  },

  row: {
    fontSize: 18,
    padding: 12
  },

  textInput: {

    textAlign: 'center',
    height: 80,
    borderWidth: 1,
    borderColor: '#009688',
    borderRadius: 8,
    backgroundColor: "#FFFF"

  }
});