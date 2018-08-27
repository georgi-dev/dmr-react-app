import React, {
    Component
} from 'react';
import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Link,
    NavLink
} from "react-router-dom";
import DashboardHeader from '../components/DashboardHeader.js';
import logo from '../logo.svg';
import {
    Learn
} from '../components/Learn.js';
class Catalog extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                title: ''

            }
            this.changeView = this.changeView.bind(this);
        }
        changeView() {
            container.appendChild(title);
        }
        componentDidMount() {
            this.setState({
                'title': 'test title'
            })
            //ReactDOM.render(, document.getElementById('root'));
        }
        render() {
            return(
                  '<div className = \"container\">        
                      <div className=\"jumbotron\">
                       <h2>Courses</h2>
                       <br/>          
                       <ul style={{listStyle:'none'}}>
                          <li className=\"d-inline-block mr-4\">
                             <NavLink to=\"/learn\" style={{color:'#fff',verticalAlign:'middle',lineHeight:'50px'}}>
                                <div className=\"card\" style={{width: '250px'}}>
                                  <img className=\"card-img-top\" src={logo} alt=\"Card image cap\" style={{height: '25px'}}/>                
                                <div className=\"card-body\">
                                   <h3 className=\"card-title text-dark\">Научете HTML</h3>
                                   <p className=\"card-text\" style={{fontSize:'13px',wordWrap:'normal'}}>Научете най-същественото от HTML, най-важния език в разработването на web проложения.</p>
                                   <a href=\"#\" className=\"btn btn-primary\" style={{textDecoration:'none'}}>{this.props.html_percent}</a>                
                                </div>
                                </div>
                              </NavLink>   
                          </li>            
                          <li className=\"d-inline-block mr-4\">
                              <a href=\"#\" style={{textDecoration:'none'}}>
                                <div className=\"card\" style={{width: '250px'}}> 
                                <img className=\"card-img-top\" src={logo} alt=\"Card image cap\" style={{height: '25px'}}/> 
                                  <div className=\"card-body\">   
                                  <h3 className=\"card-title text-dark\">Научете CSS</h3>   
                                  <p className=\"card-text\" style={{fontSize:'13px',wordWrap:'normal'}}>  
                                  Научете се как да стилизирате и визуализирате подреден HTML код с помощта на CSS.</p>   
                                          <a href=\"#\" className=\"btn btn-primary\" style={{textDecoration:'none'}}>{this.props.css_percent}</a>       
                                </div>      
                                 </div>       
                              </a>        
                          </li>     
                       </ul>      
                      </div>    
                  </div>' 
              )  
        }
}

export default Catalog;

            
