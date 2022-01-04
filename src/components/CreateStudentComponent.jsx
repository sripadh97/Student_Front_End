import React, { Component } from 'react';
import StudentService from '../services/StudentService';
import { useNavigate, useParams } from "react-router-dom";
import TextField from '@mui/material/TextField';
import emailValidator from '../util/emailValidater';
class CreateStudentComponent extends Component {
    constructor(props) {
        super(props)

       
        this.state = {
            id: this.props.id,
            firstName:'',
            lastName: '',
            emailId: '',
            error:{}
        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.saveOrUpdateStudent = this.saveOrUpdateStudent.bind(this);
    }
    componentDidMount() {

        if(this.state.id === '_add'){
            return
        }else{
            StudentService.getStudentById(this.state.id).then( (res) => {
                let student = res.data;
                this.setState({firstName: student.firstName,
                    lastName: student.lastName,
                    emailId: student.emailId                    
                });
            });
        }
    }
    saveOrUpdateStudent = (s) => {
        s.preventDefault();
        let error = {};
        let myStudent ={"First Name": this.state.firstName, "Last Name": this.state.lastName, email: this.state.emailId} 
        let student = {firstName: this.state.firstName, lastName: this.state.lastName, emailId: this.state.emailId};
        for(let key in myStudent){
            if(myStudent[key].trim()==="")
            error[key] = `${key} is required`
        }
        // email validate
        if(!emailValidator(myStudent.email)) error['email'] = "Invalid email";
        if(Object.keys(error).length ===0)
        {

            if(this.state.id === '_add'){
                StudentService.createStudent(student).then(res => {
                    this.props.navigate('/students');
                });
            }else {
                StudentService.updateStudent(student, this.state.id).then(res => {
                    this.props.navigate('/students');
                });
            }
        }    
        this.setState({error})
        
    }
    changeFirstNameHandler = (event) => {
        this.setState({firstName: event.target.value});
    }

    changeLastNameHandler = (event) => {
        this.setState({lastName: event.target.value});
    }

    changeEmailHandler = (event) => {
        this.setState({emailId: event.target.value});
    }

    cancel() {
        this.props.navigate('/students');
    }
    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Student</h3>
        }else{
            return <h3 className="text-center">Update Student</h3>
        }
    }
    
    render() {
        return (
            <div>
                <br></br>
                    <div className = "container">
                            <div className = "row"> 
                                <div className = "card col-md-6 offset-md-3 offset-md-3">
                                    {
                                        this.getTitle()
                                    }
                                    
                                    <div className="card-body">
                                        <form>
                                            <div className="form-group">
                                                <TextField
                                                    className="form-control"
                                                    required
                                                    id="outlined-required"
                                                    label="First Name"
                                                    value={this.state.firstName}
                                                    onChange={this.changeFirstNameHandler}
                                                    error={!!this.state.error["First Name"]}
                                                    helperText={this.state.error["First Name"]}
                                                />
                                            </div>
                                            <br/>
                                            <div className="form-group">
                                                <TextField
                                                    className="form-control"
                                                    required
                                                    id="outlined-required"
                                                    label="Last Name"
                                                    value={this.state.lastName}
                                                    onChange={this.changeLastNameHandler}
                                                    error={!!this.state.error["Last Name"]}
                                                    helperText={this.state.error["Last Name"]}
                                                />
                                            </div>
                                            <br/>
                                            <div className="form-group">
                                                <TextField
                                                    className="form-control"
                                                    required
                                                    id="outlined-required"
                                                    label="Email"
                                                    value={this.state.emailId}
                                                    onChange={this.changeEmailHandler}
                                                    error={!!this.state.error.email}
                                                    helperText={this.state.error.email}
                                                />
                                            </div>
                                            <br/>
                                            <button className="btn btn-success" onClick={this.saveOrUpdateStudent}>Submit</button>
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

const CreateStudent = ()=>{
    const navigate = useNavigate();
    const {id } = useParams();
    return <CreateStudentComponent navigate={navigate} id = {parseInt(id)===-1?'_add':id }/>
    
}
export default CreateStudent;