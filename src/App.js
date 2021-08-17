import React, { Component } from 'react';
import axios from 'axios';
import Main from './components/Main';
import Weather from './components/Weather';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Col, Row } from 'react-bootstrap';
import Header from './components/Header';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: '0.0',
      lon: '0.0',
      cityName: '',
      showData: false,
      showAlert: false,
      errorMsg: '',
      weather: [],
    };
  }
  getInput = (e) => {
    this.setState({ cityName: e.target.value });
  };
  submitHan = (e) => {
    e.preventDefault();
    let apiUrl = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONAPI_KEY}&q=${e.target.searchText.value}&format=json`;
    axios
      .get(apiUrl)
      .then((responseData) => {
        this.setState({
          cityName: responseData.data[0].display_name,
          lat: responseData.data[0].lat,
          lon: responseData.data[0].lon,
          showData: true,
        });
        this.getWeather(responseData.data[0].lat, responseData.data[0].lon);
        document.getElementById('form').reset();
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          showAlert: true,
          showData: false,
          errorMsg: error,
        });
      });
  };

  getWeather = (lat, lon) => {
    //send a request to api endpoint >> recive a response
    let url = `${process.env.REACT_APP_BACKEND_URL}/weather?lat=${lat}&lon=${lon}&city_name=${this.state.cityName}`;
    axios.get(url).then((response) => {
      this.setState({
        weather: response.data,
        showData: true,
      });
    });
  };

  render() {
    return (
      <>
        <Header submitHan={this.submitHan} />
        <Container fluid>
          <Row>
            <Col>
              {this.state.showAlert && alert(this.state.errorMsg)}
              {this.state.showData && (
                <Main
                  cityName={this.state.cityName}
                  lat={this.state.lat}
                  lon={this.state.lon}
                  imgsrc={`${process.env.REACT_APP_IMG_URL}&center=${this.state.lat},${this.state.lon}&zoom=1-18`}
                />
              )}
            </Col>
            <Col>
              {this.state.showData &&
                this.state.weather.map(
                  (
                    item,
                    index // {1.2.3}
                  ) => <Weather key={index} weather={item} />
                )}
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default App;
