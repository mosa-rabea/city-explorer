import React, { Component } from 'react';

export class Main extends Component {
  render() {
        const {cityName,lat,lon,imgsrc} = this.props
    return (
      <>
        <h1>{cityName}</h1>
        <h2>{lat}</h2>
        <h2>{lon}</h2>
        <img src = {imgsrc} alt={cityName}/>
      </>
    );
  }
}

export default Main;
