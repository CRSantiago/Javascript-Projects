import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/navbar.component';
import HoursList from './components/hours-list.component';
import InputHours from './components/input-hours.component';
import CreateStudent from './components/create-student.component';

function App() {
    return (
        <Router>
            <Navbar />
            <br />
            <div className='container'>
                <Route path="/" exact component={HoursList} />
            </div>
            <div className='container'>
                <Route path='/input' component={InputHours} />
            </div>
            <div className='container'>
                <Route path="/student" component={CreateStudent}/>
            </div>
        </Router>
          );
        }

export default App;
