import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import Home from './components/Home';
import  Analytics from './components/Analytics';

import "@fortawesome/fontawesome-free/css/all.min.css";
import "../src/assets/css/argon-dashboard-react.min.css";

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/Analytics' component={Analytics} />
      </Layout>
    );
  }
}
