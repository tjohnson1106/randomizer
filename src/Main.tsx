import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Dimensions,
  Image
} from "react-native";
import axios from "axios";

const { height, width } = Dimensions.get("window");

export default class Main extends Component {
  state = {
    isLoading: true,
    images: []
  };

  loadWallpapers = () => {
    axios
      .get(
        "https://api.unsplash.com/photos/random?count=30&client_id=27e89aa468d4038618154ef61fa81d5dab06a5635c5550166cc636c27fa427c9"
      )
      .then(
        function(response) {
          console.log(response.data);
          this.setState({
            images: response.data,
            isLoading: false
          });
          // access set state
        }.bind(this)
      )
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

  renderItem = (image) => {
    return (
      <View style={{ height, width }}>
        <Image
          style={styles.renderImage}
          source={{ uri: image.urls.regular }}
          resizeMode="cover"
        />
      </View>
    );
  };

  render() {
    return this.state.isLoading ? (
      <View style={styles.root}>
        <ActivityIndicator size="large" color="grey" />
      </View>
    ) : (
      <View style={styles.loading}>
        <FlatList
          horizontal
          pagingEnabled
          data={this.state.images}
          renderItem={({ item }) => this.renderItem(item)}
          keyExtractor={(item) => item.id}
        />
      </View>
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
  },
  renderImage: {
    flex: 1,
    height: null,
    width: null
  }
});

export default Main;
