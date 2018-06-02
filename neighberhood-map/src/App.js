import React, { Component } from 'react';
/*this package to escape the regex from the input filter*/
import escapeRegExp from 'escape-string-regexp'
/*this package to sort the contacts by name alphabitcally*/
import sortBy from 'sort-by'
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
    mapSlide: false,
    filteredLocations: []
  }

  updateLocations = (locations) => {
    this.setState({locations: locations })
  }

  /*this function take the query from the input at the menu.js 
    and filter the locations array according to that query*/
  filterLocations = (query) => {
    console.log(query)
    const match = new RegExp(escapeRegExp(query), 'i')

    this.state.filteredLocations =  this.state.locations.filter((location) => match.test(location.title))
    this.updateLocations(this.state.filteredLocations)
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
    this.state.locations.sort(sortBy('name'))
    return (
      <div className="app">
        <Menu locations={this.state.locations}
              mapSlide = {this.mapSlide}
              updateLocations={this.filterLocations}/>
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