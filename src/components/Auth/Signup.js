import { Component } from "react";
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import AuthService from "../../services/AuthService";
import emailValidator from "../../util/emailValidater";

class SignUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            error:{}
        }

        this.signup = this.signup.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    signup(e){
        e.preventDefault();        
        let user ={username: this.state.username, email: this.state.email, password: this.state.password}; 
        let err= {};
        for(let key in user){
            if(user[key].trim()==="") {
                err[key] = `${key} is required`;
            }            
        }
        // email validate
        if(!emailValidator(user.email)) err['email'] = "Invalid email";
        this.setState({
            error: err
        });
        if(Object.keys(err).length ===0){
            AuthService.signUp(user).then(res=>{
                if(res){
                    this.props.navigate('/signin');
                } else {
                    alert("wrong input");
                }
            });
        }
    }

    cancel() {
        this.props.navigate('/signin');
    }

    render(){
        return (
            <div>
                <br></br>
                <div className = "container">
                    <div className = "row"> 
                        <div className = "card col-md-6 offset-md-3 offset-md-3">
                            <h2>Register</h2>                                    
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <TextField
                                            className="form-control"
                                            label="Username"
                                            value={this.state.username}
                                            onChange={(e)=>{
                                                this.setState({
                                                    username: e.target.value
                                                });
                                            }}
                                            error={!!this.state.error["username"]}
                                            helperText={this.state.error["username"]}
                                        />
                                    </div>
                                    <br/>
                                    <div className="form-group">
                                        <TextField
                                            className="form-control"
                                            label="Email"
                                            type="email"
                                            value={this.state.email}
                                            onChange={(e)=>{
                                                this.setState({
                                                    email: e.target.value
                                                });
                                            }}
                                            error={!!this.state.error["email"]}
                                            helperText={this.state.error["email"]}
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
                                    <button className="btn btn-primary" onClick={this.cancel.bind(this)} style={{marginRight: "20px"}}>Cancel</button>
                                    <button className="btn btn-success" type="submit" onClick={this.signup}>Register</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>                
            </div>
        );
    }
}

const SignUpComponent = ()=>{
    const navigate = useNavigate();
    return <SignUp navigate={navigate}/>
    
}
export default SignUpComponent;