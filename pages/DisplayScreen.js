import React from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import { Table, Row, Rows } from "react-native-table-component";

class DisplayScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: "",
      tableData: [],
      filmdata: [],
      tableHead: [],
    };
  }
  onDisplay = () => {
    var tableHead = [];
    var tableData = [];
    var filmdata = [];

    try {
      fetch("http://localhost:8080/api/v1/films", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((results) => {
          results.forEach((data) => {
            filmdata.push(data.name);
            filmdata.push(data.rating);
            tableData.push(filmdata);
            filmdata = [];
          });
          if (this.state.tableData.length >= 0) {
            tableHead = ["Movie Name", "Rating"];
          } else {
            tableHead = ["No data to display in the movie list"];
          }
          this.setState({ tableHead, tableHead });
          this.setState({ tableData: tableData });
        });
    } catch (e) {
      console.log(e);
    }
  };
  ShowHideComponent = () => {
    if (this.state.show == false) {
      this.setState({ show: true });
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => {
            this.onDisplay();
            this.ShowHideComponent();
          }}
        >
          <Text style={styles.loginText}>View</Text>
        </TouchableHighlight>
        {this.state.show ? (
          <Table style={styles.table}>
            <Row
              data={this.state.tableHead}
              style={styles.head}
              textStyle={styles.tableText}
            />
            <Rows
              data={this.state.tableData}
              style={styles.row}
              textStyle={styles.text}
            />
          </Table>
        ) : null}
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
  table: {
    borderColor: "black",
    width: "80%",
  },
  head: {
    height: 30,
    paddingLeft: 15,
    alignContent: "center",
    backgroundColor: "black",
    margin: 6,
    width: "auto",
  },
  row: {
    height: 30,
    paddingLeft: 15,
    alignContent: "center",
    backgroundColor: "#A9A9A9",
    margin: 6,
    width: "auto",
  },
  text: {
    color: "black",
    alignContent: "center",
    justifyContent: "center",
    margin: 6,
    textAlign: "center",
  },
  tableText: {
    color: "white",
    alignContent: "center",
    justifyContent: "center",
    margin: 6,
    textAlign: "center",
  },
  loginText: {
    color: "white",
  },
});

export default DisplayScreen;
