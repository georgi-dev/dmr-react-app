import React, { Component } from 'react';
//import logo from '../logo.svg';
//import './Header.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
//import Frame from 'react-frame-component';
import Parser from 'html-react-parser';


export class AllLessonsContent extends Component {
  constructor(props){
    super(props);
  }
  render() {
      //const lessonContent = '';


        return ( <div style={{    padding: '10px 21px'}}>
          {Parser(this.props.exerciseBody)}
          </div>);
      
      //alert(this.lessonContent);





  }
}
