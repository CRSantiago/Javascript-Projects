import React, { Component } from 'react';
import axios from 'axios';

const Hours = props => (
    <tr>
        <td>{props.hours.firstname}</td>
        <td>{props.hours.lastname}</td>
        <td>{props.hours.hoursCompleted}</td>
        <td>{props.hours.date.substring(0,10)}</td>
    </tr>
)

export default class HoursList extends Component {

    constructor(props) {
        super(props);

        this.state = {hours: []}
    }

    componentDidMount() {
        axios.get('http://localhost:5000/hours/')
        .then(response => {
            this.setState({hours: response.data})
        })
    }

    hoursList(){
        return this.state.hours.map(currenthours => {
            return <Hours hours={currenthours}/>;
        })
    }

    render() {
        return (
          <div>
            <h3>Logged Hours Entry</h3>
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Hours Completed</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                { this.hoursList() }
              </tbody>
            </table>
          </div>
        )
      }

}