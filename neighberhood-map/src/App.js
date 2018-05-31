import React, { Component } from 'react';
import Map from './Map.js'
import Menu from './Menu.js'
import './App.css';

class App extends Component {
  
  render() {
    const style = {
      width: '100%',
      height: '100%'
    }

    return (
      <div className="app">
        <div>
          <Map
            google={this.props.google}
            style={style}
            initialCenter={{
              lat: 40.854885,
              lng: -88.081807
            }}
            zoom={15}
            onClick={this.onMapClicked}
          />
        </div>
      </div>
    )
  }
}

export default App;