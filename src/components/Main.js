import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
export class Main extends Component {
  render() {
    const { cityName, lat, lon, imgsrc } = this.props;
    return (
      <>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant='top' src={imgsrc} alt={cityName} />
          <Card.Body>
            <Card.Title>{cityName}</Card.Title>
            <Card.Text>The Lat :{lat}</Card.Text>
            <Card.Text>The Lon :{lon}</Card.Text>
          </Card.Body>
        </Card>
      </>
    );
  }
}
export default Main;
