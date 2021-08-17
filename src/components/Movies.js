import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';

class Movies extends Component {
  render() {
    const {
      imageUrl,
      title,
      overview,
      averageVotes,
      vote_count,
      popularity,
      releasedOn,
    } = this.props;
    return (
      <div>
        <Card style={{ width: '30rem', marginBottom: '10px' }}>
          <Card.Img variant='top' src={imageUrl} alt='Map' />

          <Card.Body>
            <Card.Title>{title}</Card.Title>
          </Card.Body>
          <ListGroup className='list-group-flush'>
            <ListGroupItem>Over View: {overview}</ListGroupItem>
            <ListGroupItem>Avg Votes: {averageVotes}</ListGroupItem>
            <ListGroupItem>Total Votes: {vote_count}</ListGroupItem>
            <ListGroupItem>Popularity: {popularity}</ListGroupItem>
            <ListGroupItem>Released: {releasedOn}</ListGroupItem>
          </ListGroup>
        </Card>
      </div>
    );
  }
}

export default Movies;
