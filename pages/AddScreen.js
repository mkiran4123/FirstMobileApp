import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
} from "react-native";

class AddScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      MovieName: "",
      rating: "",
      jwtToken: "",
    };
  }

  onSave = () => {
    const movieTitle = this.state.MovieName;
    const movieRating = this.state.rating;
    const onetoken = this.props.route.params.token;

    if (movieTitle.trim().length == 0) {
      alert("Enter a valid title");
      return false;
    } else if (
      movieRating.trim().length == 0 ||
      parseInt(movieRating) < 1 ||
      parseInt(movieRating) > 5
    ) {
      alert("Enter a valid rating");
      return false;
    } else {
      try {
        fetch("http://localhost:8080/api/v1/films/check", {
          method: "POST",
          body: JSON.stringify({
            name: movieTitle,
          }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + onetoken,
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            if (data.count > 0) {
              alert("Movie already rated");
            } else {
              fetch("http://localhost:8080/api/v1/films", {
                method: "POST",
                body: JSON.stringify({ name: movieTitle, rating: movieRating }),
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + onetoken,
                },
              }).then((resp) => {
                setTimeout(function () {
                  if (resp.status == 200) {
                    alert("Movie Rated successfully");
                  } else {
                    alert(
                      "Error occured while Rating Movie " +
                        resp.status +
                        " " +
                        resp.statusText
                    );
                  }
                }, 0);
              });
            }
          });
      } catch (e) {
        console.log(e);
      }
      this.setState({ MovieName: "", rating: "" });
      return false;
    }
  };
  onModify = () => {
    const movieTitle = this.state.MovieName;
    const movieRating = this.state.rating;
    const onetoken = this.props.route.params.token;

    if (movieTitle.trim().length == 0) {
      alert("Enter a valid title");
      return false;
    } else if (movieRating.trim().length == 0) {
      alert("Rating cannot be empty");
    } else if (parseInt(movieRating) < 1 || parseInt(movieRating) > 5) {
      alert("Enter a valid rating");
      return false;
    } else {
      try {
        fetch("http://localhost:8080/api/v1/films/check", {
          method: "POST",
          body: JSON.stringify({
            name: movieTitle,
          }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + onetoken,
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            if (data.count < 1) {
              alert("Can't update, Movie-Rating not added");
            } else {
              fetch("http://localhost:8080/api/v1/films", {
                method: "PUT",
                body: JSON.stringify({
                  name: movieTitle,
                  rating: movieRating,
                }),
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + onetoken,
                },
              }).then((resp) => {
                setTimeout(function () {
                  if (resp.status == 200) {
                    alert("Movie Rated Updated Successfully");
                  } else {
                    alert(
                      "Error occured while Rating Movie " +
                        resp.status +
                        " " +
                        resp.statusText
                    );
                  }
                }, 0);
              });
            }
          });
      } catch (e) {
        console.log(e);
      }
      this.setState({ MovieName: "", rating: "" });
      return false;
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}></View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputTextBox}
            placeholder="Movie Name"
            clearButtonMode="always"
            keyboardType="default"
            underlineColorAndroid="transparent"
            onChangeText={(text) => this.setState({ MovieName: text })}
            value={this.state.MovieName}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputTextBox}
            placeholder="Rate 1 to 5"
            clearButtonMode="always"
            keyboardType="default"
            underlineColorAndroid="transparent"
            onChangeText={(rating) => this.setState({ rating: rating })}
            value={this.state.rating}
          />
        </View>
        <View style={styles.rowsetup}>
          <TouchableHighlight
            style={[styles.buttonContainer, styles.saveButton]}
            onPress={() => this.onSave()}
          >
            <Text style={styles.loginText}>Add</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.buttonContainer, styles.modifyButton]}
            onPress={() => this.onModify()}
          >
            <Text style={styles.loginText}>Update</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.container}></View>
        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => {
            this.props.navigation.navigate("Display");
          }}
        >
          <Text style={styles.loginText}>Next</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DCDCDC",
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderBottomWidth: 1,
    width: 250,
    height: 35,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#000000",
    marginBottom: 20,
  },
  inputTextBox: {
    height: 45,
    marginLeft: 25,
    marginRight: 25,
    borderBottomColor: "#FFFFFF",
    flex: 1,
  },
  buttonContainer: {
    height: 35,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 80,
    borderRadius: 20,
    backgroundColor: "black",
  },
  saveButton: {
    alignContent: "flex-start",
    marginRight: 45,
  },
  modifyButton: {
    alignContent: "flex-end",
    marginLeft: 45,
  },
  loginText: {
    color: "white",
  },
  table: {
    borderWidth: 3,
    borderColor: "#c8e1ff",
    width: "60%",
  },
  rowsetup: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  head: {
    height: 40,
    backgroundColor: "#f1f8ff",
  },
  text: {
    width: "100%",
    margin: 6,
  },
});

export default AddScreen;
