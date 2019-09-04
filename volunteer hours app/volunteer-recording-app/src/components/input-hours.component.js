import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

export default class InputHours extends Component {

    constructor(props) {
        super(props);

        this.onChangeFirstname = this.onChangeFirstname.bind(this);
        this.onChangeLastname = this.onChangeLastname.bind(this);
        this.onChangeHoursCompleted = this.onChangeHoursCompleted.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            firstname: '',
            lastname: '',
            hoursCompleted: 0,
            date: new Date(),
            students: []
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
    }

        onChangeFirstname(e) {
            this.setState({
                firstname: e.target.value
            });
        }

        onChangeLastname(e) {
            this.setState({
                lastname: e.target.value
            });
        }

        onChangeHoursCompleted(e) {
            this.setState({
                hoursCompleted: e.target.value
            });
        }

        onChangeDate(date) {
            this.setState({
                date: date
            });
        }

    onSubmit(e) {
        e.preventDefault();

        const hours = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            hoursCompleted: this.state.hoursCompleted,
            date: this.state.date
        }

        console.log(hours);

        axios.post('http://localhost:5000/hours/add', hours)
        .then(res => console.log(res.data));
    }

    render() {
        return (
            <div>
                <h3>Create New Hours Log</h3>
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
                    <div className='form-group'>
                        <label>Hours Completed: </label>
                        <input type='text'
                            required
                            className='form-control'
                            value={this.state.hoursCompleted}
                            onChange={this.onChangeHoursCompleted}
                        />
                    </div>
                    <div className='form-group'>
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>

                    <div className='form-group'>
                        <input type='submit' value='Create Hours Log' className='btn btn-primary' />
                    </div>
                </form>
            </div>
        );
    };

}