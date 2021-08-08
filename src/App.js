import React, { Component } from 'react';
import axios from 'axios';
import Main from './components/Main';
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

  render() {
    return (
      <>
        <h1>City Explorer</h1>
        <form id='form' onSubmit={(e) => this.submitHan(e)}>
          <input
            name='searchText'
            type='text'
            placeholder='Search By City Name'
          />
          <input type='submit' value='Search' />
        </form>
        {this.state.showAlert && alert(this.state.errorMsg)  }
        {this.state.showData && (
          <Main
            cityName={this.state.cityName}
            lat={this.state.lat}
            lon={this.state.lon}
            imgsrc={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONAPI_KEY}&center=${this.state.lat},${this.state.lon}&zoom=1-18`}
          />
        )}
      </>
    );
  }
}

export default App;
