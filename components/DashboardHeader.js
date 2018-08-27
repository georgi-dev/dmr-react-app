// import React, { Component } from 'react';
import React from "react";
import logo from '../logo.svg';
import me from '../me.png';
//import './Header.css';
import {Learn} from '../components/Learn.js';

// import {Dashboard} from '../components/Dashboard.js';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, NavLink , Redirect} from "react-router-dom";


class DashboardHeader extends React.Component {

  constructor(props){
    super(props);
    this.toggleProfileTab = this.toggleProfileTab.bind(this);
    this.logOut = this.logOut.bind(this);

    this.state = {
      is_show_profile_panel: 'false',
      isLoggedIn : 'false'
    }
  }

  componentDidMount(){

    const username = localStorage.getItem('username');
    fetch('http://dmr-app.localhost/auth/is_user_available',{
        method:'POST'
        ,
        body: JSON.stringify(
        {
          username : username

        })
      }).then(response => response.json())
      .then((data) => {
        console.log(data);
        if (data.result === "true") {
          //alert("Login completed");
          this.setState({isLoggedIn: "true"});
          //this.state.is_show_profile_panel = "true";
          //return <Redirect to='/home' />



        }
        else{
          alert("Erorrr");



        }
      })
      .catch(function(err){
          console.log(err);
        });
  }

  logOut(){
    localStorage.removeItem('profile');
    this.setState({isLoggedIn: "false"});
    this.setState({is_show_profile_panel: "false"});
    localStorage.removeItem('username');
    window.location.href="http://localhost:3000/login";
  }

  toggleProfileTab(){

    this.setState({ is_show_profile_panel: this.state.is_show_profile_panel === 'false' ? 'true' : 'false' })
     console.log(this.state.is_show_profile_panel);
  }

  render() {
    const styles = {
      header:{
        //textAlign:'center',
        background: this.props.learn_page_header ? '#000' :'#123456',
        color:'#fff'
      },
      profileTabDiv:{
        textAlign:'left',
        position:'absolute',
        left:'130px',
        background:'#fff',
        color:'#000',
        zIndex:1000,
        ul:{
          listStyle:'none',
          padding:'10px',
          width: '180px'
        }
      }
    }
    let profileTab =``;

    let profileImg = ``;
    {this.state.isLoggedIn === "true" ?
                profileImg =   <img
                                       src={me}
                                       className="App-logo rounded-circle"
                                       alt="logo"
                                       width="25px"
                                       height="25px"
                                       onClick={this.toggleProfileTab}
                                       style={{textAlign:'left'}}
                                     />
                                     : profileImg = <div>
                                                       <NavLink to="/login" className="btn btn-primary">Log in</NavLink>
                                                       <NavLink to="/sign_up" className="btn btn-default">Sign up</NavLink>
                                                  </div>}


    this.state.is_show_profile_panel == "true"?
       profileTab =


                        <div style={styles.profileTabDiv}>
                         <ul style={styles.profileTabDiv.ul}>
                           <li><a href="#" >My Profile</a></li>
                           <li><a href="#" >Account settings</a></li>
                           <li><a href="#" >Help</a></li>
                           <li><a href="#" onClick={this.logOut}>Log out</a></li>
                         </ul>
                        </div>

    :
       null
    return (

      <div className="header" style={styles.header}>
      <ul className="row" style={{listStyle:'none'}}>
        <li className="col-md-4" style={{display:'inline-block'}}>
          <div>
            <img
             src={logo}
             className="App-logo"
             alt="logo"
             width="50px"
             height="50px"
             style={{textAlign:'left'}}
           />
          </div>
        </li>
        {this.props.learn_page_header ?
          <li className="col-md-4" style={{textAlign:'center',display:'inline-block'}}>
            <NavLink to="/home" style={{color:'#fff',verticalAlign:'middle',lineHeight:'50px'}}>{this.props.learn_page_header}</NavLink>
          </li>



          :

            <div className="col-md-4">
            <li className="col-md-3" style={{display:'inline-block'}}>
              <NavLink to="/home" style={{color:'#fff',verticalAlign:'middle',lineHeight:'50px'}}>Home</NavLink>
            </li>
            <li className="col-md-1" style={{display:'inline-block'}}>
              <NavLink to="/catalog" style={{color:'#fff',verticalAlign:'middle',lineHeight:'50px'}}>Catalog</NavLink>

            </li>
          </div>


        }
        <li className="col-md-4" style={{display:'inline-block'}}>
          <div style={{textAlign:'center',lineHeight:'50px',position:'relative'}}>


          {profileImg}

           {profileTab}
          </div>

        </li>

      </ul>


      </div>
    );
  }
}
export default DashboardHeader;
