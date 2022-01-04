import React, { Component } from 'react';
import StudentService from '../services/StudentService';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
class ListStudentComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            students: [],
            inintStudents: [],
            deleted_students:[],
            isSortFirstName: false,
            isSortLastName: false,
            sortFirstNameDirect: 1, // is 1 inc, -1 dec
            sortLastNameDirect: 1 // is 1 inc, -1 dec
        }
        this.addStudent = this.addStudent.bind(this);
        this.editStudent = this.editStudent.bind(this);
        this.deleteStudent = this.deleteStudent.bind(this);
        this.sortStudentByFirstName = this.sortStudentByFirstName.bind(this);
        this.sortStudentByLastName = this.sortStudentByLastName.bind(this);
        this.searchByName = this.searchByName.bind(this);
    }

    deleteStudent() {
        for(let index= 0;index<this.state.deleted_students.length ;index++)
        {
            StudentService.deleteStudent(this.state.deleted_students[index]).then( res => {
                this.setState({students: this.state.students.filter(student => !this.state.deleted_students.includes(student.id) )});
                if(parseInt(index)+1===this.state.deleted_students.length)
                {
                    this.setState({deleted_students:[]});
                }
            }).catch((error)=>{
                console.log("error from the delete api: ",error);
            }); 
        }     
    }
    addStudentToDeleted(id){
        this.setState({deleted_students:[...this.state.deleted_students , id]})
    }
    removeStudentFromDeleted(id){
        this.setState({deleted_students: this.state.deleted_students.filter(student_id => student_id !== id)})
    }
    viewStudent(id){
        this.props.navigate(`/view-student/${id}`)
    }

    editStudent(id) {
        this.props.navigate(`/add-student/${id}`);
    }
    sortStudentByFirstName(e) {   
        let students = this.state.students;
        let direct = this.state.sortFirstNameDirect;
        students.sort (function(a, b) {
            if ( a.firstName < b.firstName ){
                return direct * -1;
            }
            if ( a.firstName > b.firstName ){
                return direct * 1;
            }
            return 0;
            
        });
        this.setState({
            students: students,
            isSortFirstName: true,
            isSortLastName: false,
            sortFirstNameDirect: (this.state.sortFirstNameDirect * -1)
        })
   }
    sortStudentByLastName(e) {
        let students = this.state.students;
        let direct = this.state.sortLastNameDirect;
        students.sort (function(a, b) {
            if ( a.lastName < b.lastName ){
                return direct * -1;
            }
            if ( a.lastName > b.lastName ){
                return direct * 1;
            }
            return 0;
        });         
        this.setState({
            students: students,
            isSortLastName: true,
            isSortFirstName: false,
            sortLastNameDirect: (this.state.sortLastNameDirect * -1)
        })           
    }
    searchByName(e) {
        let name = e.target.value.trim();
        let students = this.state.inintStudents;
        if(name === ""){
            this.setState({
                students: students
            })
            return false;
        } 
        students = students.filter (function(el) {
            return el.firstName.includes(name) || el.lastName.includes(name) ;
        })
        this.setState({
            students: students
        })
    }
    componentDidMount(){
        StudentService.getStudents().then((res) => { 
            if (res.status === 200){
                this.setState({ 
                    students: res.data,
                    inintStudents: res.data
                });
            } else {
                this.props.navigate("/signin");
            }            
        });
    }
    componentDidUpdate()
    {
        console.log("state: ",this.state);
    }
    addStudent() {
        this.props.navigate('/add-student/-1');
    }
    render() {
        return (
            <div>
                <div className="row"><h2 className = "text-center">Students List</h2>
                <TextField
                    className="form-control"
                    id="outlined-required"
                    label="Search by name"
                    onChange={(e) => this.searchByName(e)}
                /></div>
                
                <div className = "row">
                    <button className = "btn btn-primary" onClick={this.addStudent}> Add Student</button>
                </div>
                <div className = "row">
                    <table className = "table table-striped table-bordered">

                        <thead>
                            <tr>
                                <th>Student First Name 
                                    <button className={"btn btn-sort " + (this.state.isSortFirstName ? "active": "")} 
                                            onClick={(e)=>this.sortStudentByFirstName(e)}>
                                            {this.state.sortFirstNameDirect > 0 ? "▼" : "▲"}
                                        </button> 
                                    </th>
                                <th>Student Last Name  
                                    <button className={"btn btn-sort " + (this.state.isSortLastName ? "active": "")} 
                                        onClick={(e)=>this.sortStudentByLastName(e)}>
                                            {this.state.sortLastNameDirect > 0 ? "▼" : "▲"}
                                    </button>
                                </th>
                                <th>Student Email ID</th>
                                <th>Actions</th>
                            </tr>

                        </thead>

                        <tbody>
                            {
                                this.state.students.map(
                                    student =>
                                    <tr key = {student.id}>
                                        <td>{ student.firstName}</td>
                                        <td>{ student.lastName}</td>
                                        <td>{ student.emailId}</td>
                                        <td>
                                            <Button variant="contained" onClick = { () => this.editStudent(student.id)} className="btn-btn-info">Update</Button>
                                            <FormControlLabel
                                                style={{marginLeft:"10px"}}
                                                label=""
                                                control={ 
                                                    <Checkbox
                                                        onChange={(event)=>{
                                                            if(event.target.checked){
                                                                this.addStudentToDeleted(student.id)
                                                            }
                                                            else
                                                            {
                                                                this.removeStudentFromDeleted(student.id)
                                                            }
                                                        }}
                                                    />}
                                                />                
                                        </td>                                  
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    </div>
                    <Button color="error" variant="contained" style = {{float:"right" , marginRight:0}}onClick = { async() => {
                        await this.deleteStudent()
                    }} className="btn-btn-danger">Delete Records</Button>
            </div>
        );
    }
}

const StudentsList = ()=>{
    const navigate = useNavigate()
    return <ListStudentComponent navigate={navigate}/>
}
export default StudentsList;