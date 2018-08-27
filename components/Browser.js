import React, { Component } from 'react';
//import logo from '../logo.svg';
//import './Header.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Frame from 'react-frame-component';
import Parser from 'html-react-parser';


export class Browser extends Component {

  render() {

    return (<Frame width="100%" height="100%">{Parser(this.props.fromEditor)}</Frame>);




  }
}
