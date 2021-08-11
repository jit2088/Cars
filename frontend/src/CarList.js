import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class CarList extends Component {

  constructor(props) {
    super(props);
    this.state = {cars: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('api/cars')
      .then(response => response.json())
      .then(data => this.setState({cars: data, isLoading: false}));
  }

  async remove(id) {
    await fetch(`/api/car/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      console.log("Remove Done!");
      let updatedCars = [...this.state.cars].filter(i => i._id !== id);
      this.setState({cars: updatedCars});
    });
  }

  render() {
    const {cars, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const carList = cars.map(car => {
      return <tr key={car._id}>
        <td style={{whiteSpace: 'nowrap'}}>{car.make}</td>
        <td>{car.model}</td>
        <td>{car.year}</td>
        <td>{car.color}</td>
        <td><a href={car.status}>{car.status}</a></td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/cars/" + car._id}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(car._id)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/cars/new">Add Cars</Button>
          </div>
          <h3>Cars List</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="20%">Make</th>
                <th width="20%">Model</th>
                <th width="10%">Year</th>
                <th width="20%">Color</th>
                <th width="10%">Status</th>
                <th width="20%">Actions</th>
              </tr>
            </thead>
            <tbody>
            {carList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default CarList;