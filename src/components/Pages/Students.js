import React, {Component} from 'react';
import helpers from '../../utils/helpers.js';
// import { Cookies } from 'react-cookie';
import { Link } from 'react-router-dom';
// import { Route} from 'react-router-dom';
import Modal from 'react-responsive-modal';

export default class Students extends Component {
    constructor() {
        super()
        this.state = {
            students : [],
            student: {
                firstName: '',
                lastName: '',
                email: '',
                profilePicture: ''
            },
            displayUserModal: false
        }
        this.onStudentClick = this.onStudentClick.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
    }
    componentDidMount() {
        helpers.getStudents().then(res => {  
            this.setState({
                students: res
            });
            console.log(this.state.students);
        });
    }
    onStudentClick(event) {
        helpers.getStudent(event.currentTarget.dataset.id).then(res => {  
            this.setState({
                student: {
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    email: res.data.email,
                    profilePicture: res.data.profilePicture
                },
                displayUserModal: true
            });
        });
        // console.log('STATE:' , this.state.student);
    }
    onCloseModal = () => {
        this.setState({ displayUserModal: false });
    };
    render() {
        return(
            <div className="page" id="students">
                <h1 className="page-title">Students Directory</h1>
                <hr />
                <section className="directory" id="studentDirectory">
                    <Modal 
                        open={this.state.displayUserModal} 
                        onClose={this.onCloseModal} 
                        closeOnOverlayClick={true} 
                        closeIconSize={20}
                        // classNames={{
                        //     transitionEnter: 'modal-enter',
                        //     transitionEnterActive: 'modal-enter-active',
                        //     transitionExit: 'modal-exit-active',
                        //     transitionExitActive: 'modal-exit-active',
                        // }}
                        center>
                        <div className="studentPic"><img alt='' src={this.state.student.profilePicture}/></div>
                        <p>First Name: {this.state.student.firstName}</p>
                        <p>Last Name: {this.state.student.lastName}</p>
                        <p>Email: {this.state.student.email}</p>
                    </Modal>
                    { this.state.students === undefined ? 
                        <h2>No students found</h2> :
                        this.state.students.map((student, i) =>
                            // <Link key={i} to={`/home/students/${student._id}`} id={student._id} onClick={this.onStudentClick}> 
                                <div className="studentItem" key={i} data-id={student._id} onClick={this.onStudentClick}>
                                    <div className="studentPic" data-id={student._id} ><img alt='' data-id={student._id}src={student.profilePicture}/></div>
                                    <p data-id={student._id}>First Name: {student.firstName}</p>
                                    <p data-id={student._id}>Last Name: {student.lastName}</p>
                                    <p data-id={student._id}>Email: {student.email}</p>
                                </div>
                            // </Link>
                        )
                    }
                </section>
            </div>
        )
    }
}