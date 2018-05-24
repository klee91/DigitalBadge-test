import React, {Component} from 'react';
import helpers from '../utils/helpers.js';

class Students extends Component {
    constructor() {
        super()
        this.state = {
            students : []
        }
    }
    componentDidMount() {
        helpers.getStudents().then(res => {  
            this.setState({
                students: res
            });
            console.log(this.state.students)
        });
    }
    render() {
        return(
            <div>
                <h1>Students:</h1>
                <div>
                    { this.state.students.length !== undefined ? 
                        this.state.students.map((student, i) => 
                            <div className="studentWrapper" key={i}>
                                <p>First Name: {student.firstName}</p>
                                <p>Last Name: {student.lastName}</p>
                                <p>Email: {student.email}</p>
                            </div>
                        ) : console.log('no students')
                    }
                </div>
            </div>
        )
    }
}

export default Students;