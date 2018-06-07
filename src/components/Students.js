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
            <div className="page" id="students">
                <h1 className="page-title">Students Directory</h1>
                <hr />
                <section className="directory" id="studentDirectory">
                    { this.state.students === undefined ? 
                        <h2>No students found</h2>
                        :
                        this.state.students.map((student, i) => 
                            <div className="studentItem" key={i}>
                                <p>First Name: {student.firstName}</p>
                                <p>Last Name: {student.lastName}</p>
                                <p>Email: {student.email}</p>
                            </div>
                        )
                    }
                </section>
            </div>
        )
    }
}

export default Students;