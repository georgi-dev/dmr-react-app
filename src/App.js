import React from 'react';
import { BrowserRouter as Router, Route, Link , Switch} from "react-router-dom";
import Home from './components/Home.js';
// import Header from './components/Header.js';
import Learn from '../components/Learn.js';
import Catalog from './components/Catalog.js';
import Error from './components/Error.js';
import Root from './components/Root.js';
import Registration from './components/Registration.js';
import Login from './components/Login.js';
import SyllabusHtmlCourse from './components/SyllabusHtmlCourse.js';

import Header from './components/DashboardHeader.js';

import logo from './logo.svg';
import './App.css';

class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      html_percent:'',
      css_percent:''

    }
  }

  componentDidMount(){
    fetch('http://dmr-app.localhost/users/get_lessons_percent_status',{
      method:'POST',
      body: JSON.stringify(
      {
        username : localStorage.getItem('username')
      })
    })
    .then(response => response.json())
      .then((data) => {
        console.log(data[0].html_percent);
        this.setState({
          html_percent:data[0].html_percent,
          css_percent:data[0].css_percent
        })
      })
      .catch(function(err){
          console.log(err);
        });


  }


  render() {
    return (
      <Router>
        <div>

          <Root>
          <Route path="/" component={Home} exact/>
            <Route path="/home" render={({match})=>(
          <Home username={localStorage.getItem('username')}/>)
        }/>
            <Route path="/catalog" render={({match})=>(
          <Catalog html_percent={this.state.html_percent} css_percent={this.state.css_percent}/>)}/>
            <Route path="/learn/html-syllabus" component={SyllabusHtmlCourse}/>

            <Route path="/learn/learn-html/lesson/introduction-html" render={({match})=>(
              <Learn test="test" syllabusId="1" subSyllabusId="1" countLessons="16" lesson="Научете HTML: Елементи и структура"/>)
            }/>
            <Route path="/learn/learn-html/lesson/tables" render={({match})=>(
              <Learn test="test" syllabusId="2" subSyllabusId="1" countLessons="13" lesson="Научете HTML: Таблици"/>)
            }/>
            <Route path="/learn"  exact/>
            <Route path="/sign_up" component={Registration}/>
            <Route path="/login" component={Login}/>
          </Root>
      {/* <Route component={Error}/>*/}
        </div>
      </Router>
    );
  }
}

export default App;
