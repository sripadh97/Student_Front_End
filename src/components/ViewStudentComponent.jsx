import React, { Component } from 'react';
import StudentService from '../services/StudentService';
import { useNavigate } from "react-router-dom";
class ViewStudentComponent extends Component {
    constructor(props) {

    this.state = {
        id: props.match.params.id,
        student: {}
    }
}

componentDidMount() {
    StudentService.getStudentById(this.state.id).then( res => {
        this.setState({student: res.data});
    });
}
    render() {
        return (
            <div>
                <div className = "card col-md-6 offset-md-3">
                <h3 className = "text-center">View Student Details</h3>
                <div className = "card-body">
                    <div className = "row">
                        <label> Student First Name:</label>
                        <div>{ this.state.student.firstName }</div> 
                    </div>  
                    <div className = "row">
                        <label> Student Last Name:</label>
                        <div>{ this.state.student.lastName }</div> 
                    </div>
                    <div className = "row">
                        <label> Address:</label>
                        <div>{ this.state.student.address }</div> 
                    </div>
                    <div className = "row">
                        <label> Major:</label>
                        <div>{ this.state.student.major }</div> 
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}

const ViewStudent = ()=>{
    const navigate = useNavigate()
    return < ViewStudentComponent navigate={navigate}/> 
}
export default ViewStudent;