import logo from './logo.svg';
import './App.css';
import { lazy, Suspense } from 'react';

import { Link, Navigate, Route, BrowserRouter as Router, Routes, Switch } from "react-router-dom";
import CurrenttWeather from './Dashboard/CurrentWeather';
import Topbar from './Dashboard/Topbar';
import Chatbox from './Dashboard/Chatbox';
import Calender from './Dashboard/ Calendar;';
import Searchbar from './Dashboard/Searchbar';
import Filemanager from './Dashboard/Filemanager';
import ToDoList from './Dashboard/NewsUpdates';
import Themes from './Dashboard/Themes';
import Signin from './Dashboard/Signin';
import Feedback from './Dashboard/Feedback';
import  Forecasts from './Dashboard/Realtime';
import FrequentQs from './Dashboard/FrequentQs';
import Signup from './Dashboard/Signup';
import Forgotpass from './Dashboard/Forgotpass';
import Sidebar from './Dashboard/Sidebar';
import SectorInsights from './Dashboard/SectorInsights';
import NewsUpdates from './Dashboard/NewsUpdates';
import AlertMessage from './Dashboard/AlertMessage';
import WeatherVisualization, {LineChart}from './Dashboard/LineChart';






function App() {
  return (
    <Router>
      <Routes>
      <Route path="/home" element={<CurrenttWeather />} />
      <Route path="/Topbar" elemeNewsUpdatesnt={<Topbar />} />
      <Route path="/chatbox" element={<Chatbox />} />
      <Route path="/calender" element={<Calender />} />
      <Route path="/searchbar" element={<Searchbar />} />
      <Route path="/files" element={<Filemanager />} />
      <Route path="/insights" element={<SectorInsights />} />
      <Route path="/Updates" element={<NewsUpdates />} />
      <Route path="/theme" element={<Themes />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/forecasts" element={<Forecasts />} />
      <Route path="/FAQ's" element={<FrequentQs />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgotpass" element={<Forgotpass />} />
      <Route path="/alertmessage" element={<AlertMessage/>} />
      <Route path="/weather-visualization.css" element={<WeatherVisualization/>} />
    
      <Route path="/" element={<Signin />} />


      





        


        {/* Add more routes here if needed */}
      </Routes>
    </Router>
  );
}

export default App;
