import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import DashboardHeader from '../components/DashboardHeader.js';
import me from '../me.png';

const Home = (params) => (
  <div className="container">
  <DashboardHeader/>
    <div className="row">
      <div className="col-md-12">
        <div className="jumbotron" style={{background:'#cbe1f7'}}>
          <div>
            <img
              src={me}
              className="rounded-circle"
              height="100"
            />

          </div>
          <h2>{params.username}</h2>
          <h5>Free member</h5>
        </div>

      </div>
    </div>
  </div>
);

export default Home;
