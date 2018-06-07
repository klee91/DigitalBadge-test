import React, {Component} from 'react';
import helpers from '../utils/helpers.js';

export default class Teachers extends Component {
    constructor() {
        super()
        this.state = {
            teachers : []
        }
    }
    componentWillMount() {
        helpers.getTeachers().then(res => {  
            this.setState({
                teachers: res
            });
            console.log(this.state.teachers)
        });
    }
    render() {
        return(
            <div className="page" id="teachers">
                <h1 className="page-title">Teacher Directory</h1>
                <hr />
                <section className="directory" id="teacherDirectory">
                    <div className="container">
                    { this.state.teachers === undefined ? 
                        <h2>No Teachers found</h2>
                        : 
                        this.state.teachers.map((teacher, i) => 
                            <div className="teacherItem" key={i}>
                                <p>First Name: {teacher.firstName}</p>
                                <p>Last Name: {teacher.lastName}</p>
                                <p>Email: {teacher.email}</p>
                            </div>
                        )
                    }
                    </div>
                </section>
            </div>
        )
    }
}