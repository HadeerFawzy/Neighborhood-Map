import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import MapComponent from './MapComponent.js';
import Menu from './Menu.js';
import './App.css';

class App extends Component {
  
  state = {
    locations: [
      {title: 'Park Ave Penthouse', location: {lat: 40.7713024, lng: -73.9632393}},
      {title: 'Chelsea Loft', location: {lat: 40.7444883, lng: -73.9949465}},
      {title: 'Union Square Open Floor Plan', location: {lat: 40.7347062, lng: -73.9895759}},
      {title: 'East Village Hip Studio', location: {lat: 40.7281777, lng: -73.984377}},
      {title: 'TriBeCa Artsy Bachelor Pad', location: {lat: 40.7195264, lng: -74.0089934}},
      {title: 'Chinatown Homey Space', location: {lat: 40.7180628, lng: -73.9961237}}
    ],
    // variable to slide the map with the menu toggling
    mapSlide: false
  }

  // calculateBounds(locations){
  //   var bounds = new this.props.google.maps.LatLngBounds();
  //   for (var i = 0; i < this.state.locations.length; i++) {
  //     bounds.extend(this.state.locations[i]);
  //   }
  //   return bounds;
  // }

  mapSlide = () => {
    this.setState({
      mapSlide: !this.state.mapSlide
    })
  }

  render() {
    return (
      <div className="app">
        <Menu locations={this.state.locations}
              mapSlide = {this.mapSlide}/>
        <MapComponent
          google={this.props.google}
          locations={this.state.locations}
          mapSlide = {this.state.mapSlide}
        />
      </div>
    )
  }
}

export default App;