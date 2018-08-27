import React from 'react';

import ReactDOM from 'react-dom';

import DashboardHeader from './DashboardHeader.js';

class Root extends React.Component {



  render(){
    return(
      <div>
        <div>
        {  /*<DashboardHeader/>*/}
        </div>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }


}
export default Root;
