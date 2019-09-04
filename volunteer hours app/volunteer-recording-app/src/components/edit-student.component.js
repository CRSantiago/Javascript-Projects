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

    componentDidMount() {
        axios.get('http://localhost:5000/students/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            students: response.data.map(student => student),
            firstname: response.data[0].firstname,
            lastname: response.data[0].lastname
          })
        }
      })

      axios.get('http://localhost:5000/students/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          firstname: response.data.firstname,
          lastname: response.data.lastname,
          school: response.data.school,
          club: response.data.club
        })   
      })
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

        axios.post('http://localhost:5000/students/update'+this.props.match.params.id, student)
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
                <h3>Edit Student </h3>
                <form onSubmit={this.onSubmit}>
                <div className='form-group'>
                        <label>First Name: </label>
                        <select ref='userInput'
                            required
                            className='form-control'
                            value={this.state.firstname}
                            onChange={this.onChangeFirstname}>
                            {
                                this.state.students.map((student) => {
                                    return <option key={student.firstname} value={student.firstname}> {student.firstname} </option>
                                })
                            }
                        </select>
                    </div>
                    <div className='form-group'>
                        <label>Last Name: </label>
                        <select ref='userInput'
                            required
                            className='form-control'
                            value={this.state.lastname}
                            onChange={this.onChangeLastname}>
                            {
                                this.state.students.map((student) => {
                                    return <option key={student.lastname} value={student.lastname}> {student.lastname} </option>
                                })
                            }
                        </select>
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
                    <input type="submit" value="Submit Student Changes" className="btn btn-primary" />
                </div>
                </form>
            </div>
         );
    }

}