import React, { Component } from 'react';
import {GoogleApiWrapper} from 'google-maps-react';
import {ScriptCache} from './lib/ScriptCache';
import GoogleApi from './lib/GoogleApi';


class App extends Component {

  scriptCache = cache({
    google: 'https://maps.googleapis.com/maps/api/'
  })

  GoogleApi({
    apiKey: apiKey,
    libraries: []
  })

  /*when an operation needs to happen after the DOM is updated and the update queue is emptied*/
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
  }

  loadMap() {
    if (this.props && this.props.google) {
      // google is available
      const {google} = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      let zoom = 14;
      let lat = 37.774929;
      let lng = -122.419416;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom
      })
      this.map = new maps.Map(node, mapConfig);
    }
  }

  render() {
    return ( 
      <div className = "map"id = "map"></div>
    );
  }

}

export default App;