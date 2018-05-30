import React, { Component } from 'react';
// import { Route } from 'react-router-dom'
import {GoogleApiWrapper} from 'google-maps-react';
import {ScriptCache} from './lib/ScriptCache';
import GoogleApi from './lib/GoogleApi';
import GoogleApiComponent from './lib/GoogleApiComponent';
import Map from './Map.js'
import './App.css';

class App extends Component {
  
  render() {
    /*styles for map*/
    const style = {
      width: '100vw',
      height: '100vh'
    }

    /*if map still loading*/
    if (!this.props.loaded) {
      return <div>Loading...</div>
    }
    
    return (
      <div className="app">
        <div style={style}>
          <Map google={this.props.google}/>
        </div>
      </div>
    )
  }
}

export default GoogleApiComponent({
  apiKey: AIzaSyDUbTRPYZCp2Af2RSRwRfFsL6iK1iHyRG0
})(App)

