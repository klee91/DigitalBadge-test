import React, {Component} from 'react';
import helpers from '../../utils/helpers';

export default class Student extends Component {
    constructor(props) {
        super(props);
        this.state = {
            student: {}
        }
    }
    componentDidMount() {
        const { match: { params } } = this.props;
        helpers.getStudent(params.id).then(res => {  
            this.setState({
                student: res
            });
            console.log(this.state.student);
        });
    }
    render() {
        return(
            <div>Student View</div>
        )
    }
}

