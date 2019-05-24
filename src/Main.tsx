import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Dimensions,
  Image,
  Animated,
  TouchableWithoutFeedback,
  TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const { height, width } = Dimensions.get("window");

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      images: [],
      scale: new Animated.Value(1),
      isImageFocused: false
    };

    this.scale = {
      transform: [
        {
          scale: this.state.scale
        }
      ]
    };

    this.actionBarY = this.state.scale.interpolate({
      inputRange: [0.9, 1],
      outputRange: [0, -80]
    });
  }

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

  showsControls = () => {
    this.setState(
      (state) => ({
        isImageFocused: !state.isImageFocused
      }),
      () => {
        if (this.state.isImageFocused) {
          Animated.spring(this.state.scale, {
            toValue: 0.9
          }).start();
        } else {
          Animated.spring(this.state.scale, {
            toValue: 1
          }).start();
        }
      }
    );
  };

  renderItem = ({ item }) => {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.renderContainer}>
          <ActivityIndicator size="large" color="grey" />
        </View>
        <TouchableWithoutFeedback onPress={() => this.showsControls(item)}>
          <Animated.View style={[{ height, width }, this.scale]}>
            <Image
              style={styles.renderImage}
              source={{ uri: item.urls.regular }}
              resizeMode="cover"
            />
          </Animated.View>
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: this.actionBarY,
            height: 80,
            backgroundColor: "black",
            flexDirection: "row",
            justifyContent: "space-around"
          }}
        >
          <View style={styles.iconContainer}>
            <TouchableOpacity activeOpacity={0.5} onPress={this.loadWallpapers()}>
              <Ionicons name="ios-refresh" color="white" size={40} />
            </TouchableOpacity>
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity activeOpacity={0.5} onPress={() => alert("load images")}>
              <Ionicons name="ios-share" color="white" size={40} />
            </TouchableOpacity>
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity activeOpacity={0.5} onPress={this.saveToCameraRoll()}>
              <Ionicons name="ios-save" color="white" size={40} />
            </TouchableOpacity>
          </View>
        </Animated.View>
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
          scrollEnabled={!this.state.isImageFocused}
          horizontal
          pagingEnabled
          data={this.state.images}
          renderItem={this.renderItem}
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
  renderContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center"
  },
  renderImage: {
    flex: 1,
    height: null,
    width: null
  },
  iconContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Main;
