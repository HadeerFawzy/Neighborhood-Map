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
    initialLocations: [
      {title: 'Park Ave Penthouse',location: {lat: 40.7713024, lng: -73.9632393},venue: '4da74283fa8ca9942859f0ed'},
      {title: 'Chelsea Loft', location: {lat: 40.7444883, lng: -73.9949465}, venue: '4e3b11853151eaa7c4399f41'},
      {title: 'Union Square Open Floor Plan', location: {lat: 40.7347062, lng: -73.9895759}, venue: '4e5cd74eb99390f45c02672d'},
      {title: 'East Village Hip Studio', location: {lat: 40.7281777, lng: -73.984377}, venue: '4b720ca7f964a5201d6c2de3'},
      {title: 'TriBeCa Artsy Bachelor Pad', location: {lat: 40.7195264, lng: -74.0089934}, venue: '4bbb9dbded7776b0e1ad3e51'},
      {title: 'Chinatown Homey Space', location: {lat: 40.7180628, lng: -73.9961237}, venue: '4f52680fe4b0639bb9363366'}
    ],

    // variable to slide the map with the menu toggling
    mapSlide: false,

    //array use for filtering the initial array (swap)
    locations: [],

    //
    menuItemClicked: '',

    //clickItemMarker
    clickedItemMarker: {},

    // variable to toggle the infoWindow
    isClicked: false,

    showingInfoWindow: false,

    marker: ''

  }

  /*run right after the component is added to the DOM*/
  componentDidMount (){
    this.setState({locations: this.state.initialLocations })
  }

  // update the locations
  updateLocations = (locations) => {
    this.setState({locations: locations })
  }

  /*this function take the query from the input at the menu.js
    and filter the locations array according to that query
    reference help: https://codepen.io/pjmtokyo/pen/ZGVjVV*/
  filterLocations = (query) => {
    const newQuery = new RegExp(escapeRegExp(query), 'i')
    var filteredLocations = this.state.initialLocations;
    filteredLocations = filteredLocations.filter(function(location){
      return location.title.toLowerCase().search(
        newQuery) !== -1;
    });
    this.updateLocations(filteredLocations)
  }

  /* function used to toggle map sliding whenever side menu opened or closed
     used to add and remove class from the map*/
  mapSlide = () => {
    this.setState({
      mapSlide: !this.state.mapSlide
    })
  }

  menuItemClicked= (location, index) => {
    // console.log(location, index)
    this.setState({menuItemClicked: location })
    this.setState({isClicked: 'true' })
    this.checkMarker(location, index)
  }

  checkMarker(location){
    let marker = "this.refs.marker" + location.venue;
    this.setState({
      isClicked:true,
      marker: marker,
      showingInfoWindow: true
    })
    // this.searchVenuesIds(location)
  }

  render() {
    /*sort by property in that array of object*/
    this.state.locations.sort(sortBy('title'))

    return (
      <div className="app">
        <Menu locations={this.state.locations}
              mapSlide = {this.mapSlide}
              updateLocations={this.filterLocations}
              menuItemClicked={this.menuItemClicked}
              />
        <MapComponent
          google={this.props.google}
          locations={this.state.locations}
          mapSlide = {this.state.mapSlide}

          menuItemClicked={this.state.menuItemClicked}
          isClicked={this.state.isClicked}
          showingInfoWindow={this.state.showingInfoWindow}
          marker={this.state.marker}
        />
      </div>
    )
  }
}

export default App;


