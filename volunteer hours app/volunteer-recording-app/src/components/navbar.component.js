import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

    render() {
        return (
            <nav className='navbar navbar-dark bg-primary navbar-expand-lg'>
                <Link to='/' className='navbar-brand'>Volunteer Check in</Link>
                <div className='collapse navbar-collapse'>
                    <ul className='navbar-nav mr-auto'>
                        <li>
                            <Link to='/' className='nav-link'>Students</Link>
                        </li>
                        <li>
                            <Link to='/student' className='nav-link'>Create Student Entry</Link>
                        </li>
                        <li>
                            <Link to='/input' className='nav-link'>Create Hours Log</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }

}