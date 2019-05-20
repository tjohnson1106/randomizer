import React, { Component } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import axios from "axios";

class Main extends Component {
  state = {
    isLoading: false
  };

  loadWallpapers = () => {
    axios
      .get(
        "https://api.unsplash.com/photos/random?count=30&client_id=27e89aa468d4038618154ef61fa81d5dab06a5635c5550166cc636c27fa427c9"
      )
      .then(function(response) {
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      })
      .finally(function() {
        console.log("request completed");
      });
  };

  componentDidMount() {
    this.loadWallpapers();
  }

  render() {
    return this.state.isLoading ? (
      <View style={styles.root}>
        <ActivityIndicator size="large" color="grey" />
      </View>
    ) : (
      <View style={styles.loading} />
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center"
  },
  loading: {
    flex: 1,
    backgroundColor: "black"
  }
});

export default Main;
