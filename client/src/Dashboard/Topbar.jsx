import React, { useState } from 'react';
import Themes from './Themes';
import Searchbar from './Searchbar';

const api = {
  key: "d933136c5d5fd441b856c7e1e8952f32",
  base: "https://api.openweathermap.org/data/2.5/",
};

function Topbar({ sendDataToParent }) {
  const [search, setSearch] = useState('');

  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        // Add any further logic here
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  };

  return (
    <div>
      <div className="topbar d-flex align-items-center">
        <Themes />
        <div className="search-bar flex-grow-1">
          <div className="position-relative search-bar-box">
            <span className="position-absolute top-50 search-show translate-middle-y">
              <i className="bx bx-search"></i>
            </span>
            <span className="position-absolute top-50 search-close translate-middle-y">
              <i className="bx bx-x"></i>
            </span>
            <input
              type="text"
              placeholder="Search by location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={searchPressed}>Search</button>
          </div>
        </div> 
        <div className="top-menu ms-auto" style={{opacity:1}}>
          {/*<ul className="navbar-nav align-items-left">
            <li className="nav-item mobile-search-icon">
              <div className="d-flex align-items-right">
                <input
                  type="text"
                  placeholder="Search by location..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button onClick={searchPressed}>Search</button>
              </div>
            </li>
  </ul>*/}
        </div>
        <div className="user-box dropdown">
          <a
            className="d-flex align-items-right nav-link dropdown-toggle dropdown-toggle-nocaret"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img src="assets/images/avatars/avatar-1.png" className="user-img" alt="user avatar" />
            <div className="user-info ps-3">
              <p className="user-name mb-0">RoseMary.W.M</p>
              <p className="designattion mb-0">Web Designer</p>
            </div>
          </a>
          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <a className="dropdown-item" href="javascript:;">
                <i className="bx bx-user"></i>
                <span>Profile</span>
              </a>
            </li>
            <li>
              <div className="dropdown-divider mb-0"></div>
            </li>
            <li>
              <a className="dropdown-item" href="/">
                <i className="bx bx-log-out-circle"></i>
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
