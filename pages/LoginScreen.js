import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
} from "react-native";

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
    };
  }

  onLogin = () => {
    const userName = this.state.userName;
    if (userName.trim().length == 0) {
      alert("please enter User name to Login");
    } else {
      try {
        fetch("http://localhost:8080/api/v1/login", {
          method: "POST",
          body: JSON.stringify({ userName: userName }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            this.state.jwtToken = data.token;
            this.props.navigation.navigate("Movie", {
              token: this.state.jwtToken,
            });
            alert("Login sucessful ");
          });
      } catch (e) {
        console.log(e);
      }
    }
    this.setState({ userName: "" });
    return false;
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputTextBox}
            placeholder="User Name"
            clearButtonMode="always"
            keyboardType="default"
            underlineColorAndroid="transparent"
            onChangeText={(userName) => this.setState({ userName })}
            value={this.state.userName}
          />
        </View>
        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => this.onLogin()}
        >
          <Text style={styles.loginText}>Login</Text>
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
  loginText: {
    color: "white",
  },
});
// ...

export default LoginScreen;
