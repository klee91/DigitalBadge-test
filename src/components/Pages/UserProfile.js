import React, { Component } from 'react';
import Student from '../Items/Student';

export default class UserProfile extends Component {
    render() {
        return (
            <Route path="/home/students/:studentid" component={Student} />
        )
    }
}