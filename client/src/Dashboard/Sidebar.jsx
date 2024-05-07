// React Component
import React, { useState } from 'react';
import Themes from './Themes';
import CurrentWeather from './CurrentWeather';
import axios from 'axios';

function Sidebar() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/search?term=${searchTerm}`);
      // Handle the response data from the backend
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-primary">
      <div className="sidebar-wrapper" data-simplebar="true">
        <div className="sidebar-header">
          <Themes></Themes>
          <div>
            <img src="assets/images/logo-icon.png" className="logo-icon" alt="logo icon" />
          </div>
          <div>
            <h4 className="logo-text">Weather Forecast</h4>
          </div>
          <div className="">
            <i className=""></i>
          </div>
        </div>
        <ul className="metismenu" id="menu">
          <li>
            <a href="/home" className="">
              <div className="parent-icon">
                <i className="bx bx-home"></i>
              </div>
              <div className="menu-title">Dashboard</div>
            </a>
            <ul>
              <li>
                <a href="/Updates">
                  <i className="bx bx-right-arrow-alt"></i>News Update
                </a>
              </li>
              <li>
                <a href="/insights">
                  <i className="bx bx-right-arrow-alt"></i>Sector Specific Insights
                </a>
              </li>
              <li>
                <a href="/forecasts">
                  <i className="bx bx-right-arrow-alt"></i>5-Day 3-Hr Forecast
                </a>
              </li>
              <li>
                <a href="/feedback">
                  <i className="bx bx-right-arrow-alt"></i>Feedback
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="/FAQ's">
              <div className="parent-icon">
                <i className="bx bx-help-circle"></i>
              </div>
              <div className="menu-title">FAQ</div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;