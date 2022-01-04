import React, { Component } from 'react';
import { useNavigate } from "react-router-dom";
import { expireAuthCookie } from './../util/authHelper';

class Header extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
        }

        this.signOut = this.signOut.bind(this);
    }

    signOut(){
        expireAuthCookie();
        this.props.navigate("/signin");
    }

    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                        <div><a href="https://www.google.com" className="navbar-brand">Students Details</a></div>
                        <ul>
                            <li><button className="btn btn-small btn-outline-warning" onClick={this.signOut}>Sign Out</button></li>
                        </ul>
                    </nav>
                </header>
            </div>
        );
    }
}

const HeaderComponent = ()=>{
    const navigate = useNavigate();
    return <Header navigate={navigate}/>
    
}

export default HeaderComponent;