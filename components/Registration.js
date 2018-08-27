import React from "react";
import { BrowserRouter as Router, Route, Link , Redirect  } from "react-router-dom";
import DashboardHeader from '../components/DashboardHeader.js';
import me from '../me.png';
import '../styles/sign_up.css';

class Registration extends React.Component{

  constructor(props){
    super(props)
    this.registration = this.registration.bind(this);
    //this.login = this.login.bind(this);
    this.state = {

                  registrationEmail:'',
                  registrationPassword:'',
                  registrationUsername:'',
                  isLoggedIn: "false"
    }
  }

  registration(e){
    e.preventDefault();
    fetch('http://dmr-app.localhost/auth/registration',{
      method:'POST'
      ,
      body: JSON.stringify(
      {
        username: this.state.registrationUsername,
        email : this.state.registrationEmail,
        password : this.state.registrationPassword
      })
    }).then(response => response.json())
    .then((data) => {
      console.log(data);
      if (data.success === "true") {
       this.setState({isLoggedIn: "true"});
       console.log(this.state.isLoggedIn);
       if(this.state.isLoggedIn == "true"){
           alert("Registration completed");
           //return (<Redirect to="/login" />);
           window.location.href = 'http://localhost:3000/login';
       }else{
           return (<div>Login Please</div>);
       }
      }
    })
    .catch(function(err){
        console.log(err);
      });


      console.log(this.state.registrationPassword);
  }



  render(){





      return(
        <div className="container">
        <div className="row">
        <div className="col-md-4 col-md-offset-4">
        <div className="form-body">
            <ul className="nav nav-tabs final-login">

                <li><a data-toggle="tab" href="#sectionB">Join us!</a></li>
            </ul>
            <div className="tab-content">

                <div id="sectionB" className="tab-pane active">
        			<div className="innter-form">
                    <form className="sa-innate-form" method="post">
                    <label>Username</label>
                    <input type="text" name="username"
                    onChange = {(e) => this.setState({ registrationUsername: e.target.value })}

                    />
                    <label>Email Address</label>
                    <input type="text" name="registration_email"
                    onChange = {(e) => this.setState({ registrationEmail: e.target.value })}

                    />
                    <label>Password</label>
                    <input type="password" name="password"
                    onChange = {(e) => this.setState({ registrationPassword: e.target.value })}

                    />
                    <button onClick={this.registration}>Join now</button>
                    <p>By clicking Join now, you agree to hifriends''s User Agreement, Privacy Policy, and Cookie Policy.</p>
                    </form>
                    </div>
                    <div className="social-login">
                    <p>- - - - - - - - - - - - - Register With - - - - - - - - - - - - - </p>
        			<ul>
                    <li><a href=""><i className="fa fa-facebook"></i> Facebook</a></li>
                    <li><a href=""><i className="fa fa-google-plus"></i> Google+</a></li>
                    <li><a href=""><i className="fa fa-twitter"></i> Twitter</a></li>
                    </ul>
                    </div>
                </div>
            </div>
            </div>
            </div>
          </div>
        </div>
    )
  }

}


export default Registration;
