import React, { Component } from 'react';
import { Table } from 'reactstrap';

export default class App extends Component {
   constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <Table>
        <thead>
          <tr>
            <th>różne</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
          </tr>
        </tbody>
      </Table>
    );
  }
}
