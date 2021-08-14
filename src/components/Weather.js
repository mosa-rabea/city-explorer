import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import ListGroupItem from "react-bootstrap/ListGroupItem";

class Weather extends Component {
  render() {
      const {weather}=this.props

    return (
      <>
        <Card  className="shadow mb-2 mt-4" style={{ width: "30rem" }}>
            <ListGroupItem>{weather.date}<br/>{weather.description}</ListGroupItem>
        </Card>
      </>
    );
  }
}

export default Weather;