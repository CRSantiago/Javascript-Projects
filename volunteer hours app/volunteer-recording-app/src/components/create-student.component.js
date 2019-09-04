import React, { Component } from 'react';
import axios from 'axios';

export default class CreateStudent extends Component {

    constructor(props) {
        super(props);

        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeSchool = this.onChangeSchool.bind(this);
        this.onChangeClub = this.onChangeClub.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            firstname:'',
            lastname:'',
            school:'',
            club:''
        }
    }

    onChangeFirstName(e) {
        this.setState({
            firstname: e.target.value
        });
    }

    onChangeLastName(e) {
        this.setState({
            lastname: e.target.value
        });
    }

    onChangeSchool(e) {
        this.setState({
            school: e.target.value
        });
    }

    onChangeClub(e) {
        this.setState({
            club: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const student = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            school: this.state.school,
            club: this.state.club
        }

        console.log(student);

        axios.post('http://localhost:5000/students/add', student)
        .then(res => console.log(res.data));

        this.setState({
            firstname:'',
            lastname:'',
            school:'',
            club:''
        })
    }

    render() {
        return (
            <div>
                <h3>Create Student </h3>
                <form onSubmit={this.onSubmit}>
                <div className="form-group"> 
                    <label>First Name: </label>
                    <input  type="text"
                        required
                        className="form-control"
                        value={this.state.firstname}
                        onChange={this.onChangeFirstName}
                        />
                </div>
                <div className="form-group"> 
                    <label>Last Name: </label>
                    <input  type="text"
                        required
                        className="form-control"
                        value={this.state.lastname}
                        onChange={this.onChangeLastName}
                        />
                </div>
                <div className="form-group"> 
                    <label>School: </label>
                    <input  type="text"
                        required
                        className="form-control"
                        value={this.state.school}
                        onChange={this.onChangeSchool}
                        />
                </div>
                <div className="form-group"> 
                    <label>Club: </label>
                    <input  type="text"
                        required
                        className="form-control"
                        value={this.state.club}
                        onChange={this.onChangeClub}
                        />
                </div>
                <div className="form-group">
                    <input type="submit" value="Create Student" className="btn btn-primary" />
                </div>
                </form>
            </div>
         );
    }

}