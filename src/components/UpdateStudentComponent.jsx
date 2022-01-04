import React, { Component } from 'react';
import StudentService from '../services/StudentService';
import { useNavigate } from "react-router-dom";
class UpdateStudentComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            firstName:'',
            lastName: '',
            major: '',
            address: ''
        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changemajorHandler = this.changemajorHandler.bind(this);
        this.changeaddressHandler = this.changeaddressHandler.bind(this);
        this.updateStudent = this.updateStudent.bind(this);
    }

    componentDidMount() {
        StudentService.getStudentById(this.state.id).then( (res) => {
            let student = res.data;
            this.setState({firstName: student.firstName,
                lastName: student.lastName,
                address: student.address,
                major: student.major
            });
        });
    }
    updateStudent = (s) => {
        s.preventDefault();
        let student = {firstName: this.state.firstName, lastName: this.state.lastname, major: this.state.major, address: this.state.address};
        console.log('student => '+ JSON.stringify(student));
        StudentService.updateStudent(student, this.state.id).then(res => {
            this.props.history.push('/students');
        });

    }

    changeFirstNameHandler = (event) => {
        this.setState({firstName: event.target.value});
    }

    changeLastNameHandler = (event) => {
        this.setState({lastName: event.target.value});
    }

    changemajorHandler = (event) => {
        this.setState({major: event.target.value});
    }
    changeaddressHandler = (event) => {
        this.setState({address: event.target.value});
    }

    cancel() {
        this.props.navigate('/students');
    }
    render() {
        return (
            <div>
                    <div className = "container">
                            <div className = "row"> 
                                <div className = "card col-md-6 offset-md-3 offset-md-3">
                                    <h3 className="text-center">Update Student</h3>
                                    <div className="card-body">
                                        <form>
                                            <div className="form-group">
                                                <label>First Name</label>
                                                <input placeholder="First Name" name="firstName" className="form-control" 
                                                value={this.state.firstName} onChange={this.changeFirstNameHandler}/>
                                            </div>
                                            <div className="form-group">
                                                <label>Last Name</label>
                                                <input placeholder="Last Name" name="lastName" className="form-control" 
                                                value={this.state.lastName} onChange={this.changeLastNameHandler}/>
                                            </div>
                                            <div className="form-group">
                                                <label>major</label>
                                                <input placeholder="major" name="major" className="form-control" 
                                                value={this.state.major} onChange={this.changemajorHandler}/>
                                            </div>
                                            <div className="form-group">
                                                <label>Address</label>
                                                <input placeholder="Address" name="address" className="form-control" 
                                                value={this.state.address} onChange={this.changeaddressHandler}/>
                                            </div>

                                            <button className="btn btn-success" onClick={this.updateStudent}>Save</button>
                                            <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>

                                        </form>
                                    </div>

                                </div>
                    </div>

                            </div>                
            </div>
        );
    }
}

const UpdateStudent = ()=>{
    const navigate = useNavigate();
    return <UpdateStudentComponent navigate={navigate}/>
}
export default UpdateStudent;