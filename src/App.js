import React, { Component } from "react";
import Main from "./components/Main";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Container, Row, Col } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import Weather from "./components/Weather";
import Movies from "./components/Movies";


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lat: "",
      lon: "",
      cityName: "",
      mapShow: false,
      displayError: false,
      errorMsg: "",
      weatherData: [],
      movieData: [],
    };
  }

  InputHandler = (e) => {
    this.setState({
      cityName: e.target.value,
    });
  };

  submitHandler = (e) => {
    e.preventDefault();

    let locUrl = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONAPI_KEY}&q=${this.state.cityName}&format=json`;
    axios.get(locUrl)
      .then((response) => {
        let data = response.data[0];

        this.setState({
          cityName: data.display_name,
          lat: data.lat,
          lon: data.lon,
          mapShow: true,
          displayError: false,
          errorMsg: "",
        });
      })
      .then((lat,lon) => {
        let weathUrl = `${process.env.REACT_APP_BACKEND_URL}/weather/${lat}/${lon}`;
        axios.get(weathUrl).then((response) => {
          this.setState({
            weatherData: response.data,
          });
        });
      })
      .then((cityName) => {
        
        let movUrl = `${process.env.REACT_APP_BACKEND_URL}/movies/${cityName}`;
        axios.get(movUrl).then((response) => {
          this.setState({
            movieData: response.data,
          });
        });
      })
      .catch((error) => {
        this.setState({
          errorMsg: error,

          displayError: true,
        });
      });
  };

  render() {
    return (
      <div>
        <Container fluid>
          <Row>
            {this.state.displayError && (
              <Alert key={1} variant={"danger"}>
                Error In The Data
              </Alert>
            )}
          </Row>
          <Row>
            {" "}
            <div style={{ margin: "20px" }}>
              <Form onSubmit={(e) => this.submitHandler(e)}>
                <Form.Group
                  className="mb-3"
                  controlId="formBasicCity"
                  style={{ display: "flex" }}
                >
                  <Form.Control
                    onChange={(e) => {
                      this.InputHandler(e);
                    }}
                    type="text"
                    placeholder="Enter a City name ..."
                    style={{ width: "300px" }}
                  />
                  <Button variant="primary" type="submit">
                    Explore!
                  </Button>
                </Form.Group>
              </Form>
            </div>
          </Row>
          {this.state.mapShow && (
            <Row>
              <Col>
                <div style={{ padding: "20px" }}>
                  <Main
                    cityName={this.state.cityName}
                    lat={this.state.lat}
                    lon={this.state.lon}
                  />
                </div>
              </Col>
              <Col>
                {this.state.weatherData && (
                  <>
                    {this.state.weatherData.map((idx) => {
                      return (
                        <Weather
                          date={idx.date}
                          description={idx.description}
                        />
                      );
                    })}
                  </>
                )}
              </Col>
            </Row>
          )}

          <Row fluid style={{ margin: "20px" }}>

            {this.state.movieData && (

              <Col>
                <>
                  {this.state.movieData.map((each) => {

              
                    return (
                      <Movies
                        title={each.title}
                        overview={each.overview}
                        averageVotes={each.averageVotes}
                        vote_count={each.vote_count}
                        imageUrl={each.imageUrl}
                        popularity={each.popularity}
                        releasedOn={each.releasedOn}
                      />
                    );

                  })}
                </>
              </Col>
            
          )}
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;