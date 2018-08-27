import React from "react";
import { BrowserRouter as Router, Route, Link , Redirect  } from "react-router-dom";
import DashboardHeader from '../components/DashboardHeader.js';
import me from '../me.png';
import '../styles/sign_up.css';

class Login extends React.Component{

  constructor(props){
    super(props)
    this.login = this.login.bind(this);
    this.state = {
                  loginEmail: '',
                  loginPassword: ''
    }
  }

  login(e){
    e.preventDefault();

    fetch('http://dmr-app.localhost/auth/login',{
        method:'POST'
        ,
        body: JSON.stringify(
        {
          email : this.state.loginEmail,
          password : this.state.loginPassword
        })
      }).then(response => response.json())
      .then((data) => {
        console.log(data);
        if (data.success === "true") {
          alert("Login completed");
          //return <Redirect to='/home' />
          localStorage.setItem('username', data.username)

          window.location.href = 'http://localhost:3000/home';
        }
        else{
          return <Redirect to='/sign_up' />


        }
      })
      .catch(function(err){
          console.log(err);
        });

        console.log(this.state.loginEmail);
        console.log(this.state.loginPassword);
  }

  render(){
      return(
        <div className="container">
        <div className="row">
        <div className="col-md-4 col-md-offset-4">
        <div className="form-body">
            <ul className="nav nav-tabs final-login">
                <li className="active"><a data-toggle="tab" href="#sectionA">Sign In</a></li>
                <li><a data-toggle="tab" href="#sectionB">Join us!</a></li>
            </ul>
            <div className="tab-content">
                <div id="sectionA" className="tab-pane fade in active">
                <div className="innter-form">
                  <form className="sa-innate-form" method="post">
                  <label>Email Address</label>
                  <input
                  type="text"
                  name="email"
                  onChange = {(e) => this.setState({ loginEmail: e.target.value })}
                  />
                  <label>Password</label>
                  <input type="password" name="password"
                  onChange = {(e) => this.setState({ loginPassword: e.target.value })}
                  />
                  <button onClick={this.login}>Sign In</button>
                  <a href="">Forgot Password?</a>
                  </form>
                    </div>
                    <div className="social-login">
                    <p>- - - - - - - - - - - - - Sign In With - - - - - - - - - - - - - </p>
                <ul>
                    <li><a href=""><i className="fa fa-facebook"></i> Facebook</a></li>
                    <li><a href=""><i className="fa fa-google-plus"></i> Google+</a></li>
                    <li><a href=""><i className="fa fa-twitter"></i> Twitter</a></li>
                    </ul>
                    </div>
                    <div className="clearfix"></div>
                </div>
                <div id="sectionB" className="tab-pane fade">
              <div className="innter-form">
                    <form className="sa-innate-form" method="post">
                    <label>Name</label>
                    <input type="text" name="username"/>
                    <label>Email Address</label>
                    <input type="text" name="username"/>
                    <label>Password</label>
                    <input type="password" name="password"/>
                    <button type="submit">Join now</button>
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


export default Login;
