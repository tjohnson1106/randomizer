import React, { Component } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";

class Main extends Component {
  state = {};
  render() {
    return (
      <View style={styles.root}>
        <ActivityIndicator size="large" color="grey" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "centerz"
  }
});

export default Main;
