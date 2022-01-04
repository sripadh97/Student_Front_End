import { Component } from "react";
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import AuthService from './../../services/AuthService';

class Signin extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            error:{}
        }

        this.signin = this.signin.bind(this);
        this.signUp = this.signUp.bind(this);
    }

    signin(e){
        e.preventDefault();        
        let user ={username: this.state.email, password: this.state.password}; 
        let err= {};
        for(let key in user){
            if(user[key].trim()==="") {
                err[key] = `${key} is required`;
            }            
        }
        this.setState({
            error: err
        });
        if(Object.keys(err).length ===0){
            AuthService.signIn(user).then(res=>{
                if(res){
                    this.props.navigate('/students');
                } else {
                    alert("wrong credential");
                }
            });            
        }
    }

    signUp(){
        this.props.navigate("/signup");
    }

    render(){
        return (
            <div>
                <br></br>
                <div className = "container">
                    <div className = "row"> 
                        <div className = "card col-md-6 offset-md-3 offset-md-3">
                            <h2>Sign In</h2>                                    
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <TextField
                                            className="form-control"
                                            label="Username or Email"
                                            value={this.state.email}
                                            onChange={(e)=>{
                                                this.setState({
                                                    email: e.target.value
                                                });
                                            }}
                                            error={!!this.state.error["username"]}
                                            helperText={this.state.error["username"]}
                                        />
                                    </div>
                                    <br/>
                                    <div className="form-group">
                                        <TextField
                                            type="password"
                                            className="form-control"
                                            label="Password"
                                            value={this.state.password}
                                            onChange={(e)=>{
                                                this.setState({
                                                    password: e.target.value
                                                });
                                            }}
                                            error={!!this.state.error["password"]}
                                            helperText={this.state.error["password"]}
                                        />
                                    </div>
                                    <br/>
                                    <button className="btn btn-primary" onClick={this.signUp.bind(this)} style={{marginRight: "20px"}}>SignUp</button>
                                    <button className="btn btn-success" onClick={this.signin}>Signin</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>                
            </div>
        );
    }
}

const SigninComponent = ()=>{
    const navigate = useNavigate();
    return <Signin navigate={navigate}/>
    
}
export default SigninComponent;