import React, { Component } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            errorText:""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value,
            errorText: ""
        })
    }

    handleSubmit(event){
        axios.post("https://api.devcamp.space/sessions", 
         {
            client:{ 
                email: this.state.email,
                password: this.state.password
            }
         },
         { withCredentials: true }
        ).then(response => {
            if (response.data.status === "created") {
                this.props.handleSuccessfulLogin()
            } else {
                this.setState({
                    errorText:"Incorrect Username/Password"
                });
                this.props.handleUnsuccessfulLogin()
            }
        }).catch(error => {
            this.setState({
                errorText: "An error occurred"
            });
            this.props.handleUnsuccessfulLogin()
        });

        event.preventDefault();
    };

  render() {
    return ( 
     <div>        
        <h1>-- Hours Workng Title --</h1>

        <form onSubmit={this.handleSubmit}>
        <label for="email">Email</label>
                    <input 
                        type="email"
                        name="email"
                        placeholder="Enter your username"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                    <label for="password">Password</label>
                    <input 
                        type="password" 
                        name="password"
                        placeholder="Enter your password"
                        value={this.state.password} 
                        onChange={this.handleChange}
                    />

                    <div>
                        <NavLink to="/project_dashboard">
                            <button className="red-btn" type="submit">SIGN IN</button>
                        </NavLink>
                    </div>
        
        </form>
    </div>
    );
    }
}