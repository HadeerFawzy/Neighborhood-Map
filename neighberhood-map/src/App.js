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
      {title: 'Park Ave Penthouse', location: {lat: 40.7713024, lng: -73.9632393}},
      {title: 'Chelsea Loft', location: {lat: 40.7444883, lng: -73.9949465}},
      {title: 'Union Square Open Floor Plan', location: {lat: 40.7347062, lng: -73.9895759}},
      {title: 'East Village Hip Studio', location: {lat: 40.7281777, lng: -73.984377}},
      {title: 'TriBeCa Artsy Bachelor Pad', location: {lat: 40.7195264, lng: -74.0089934}},
      {title: 'Chinatown Homey Space', location: {lat: 40.7180628, lng: -73.9961237}}
    ],

    // variable to slide the map with the menu toggling
    mapSlide: false,

    //array use for filtering the initial array (swap)
    locations: [],

    //
    menuItemClickedId: '',

    //clickItemMarker
    clickedItemMarker: {},

    // variable to toggle the infoWindow
    isClicked: false,

    showingInfoWindow: false
  }

  /*run right after the component is added to the DOM*/
  componentDidMount (){
    this.setState({locations: this.state.initialLocations })
    this.searchVenuesIds(this.state.initialLocations)
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

  // function to search for the venue_id for every location (ajax request using lat&lng of every location)
  searchVenuesIds = ((locations) => {
    locations.map((locationItem) => {
      var url = 'https://api.foursquare.com/v2/venues//search?ll=' + locationItem.location.lat + ',' + locationItem.location.lng + '&oauth_token=PHZPF20MASML1KWVF3RCSDQXJQ0PBX1JAH4TKHR0VWYT4Y5P&v=20180602'
      fetch(url)
        .then(res => res.json())
        .then(
          (result) => {
            // console.log(result.response.venues[0].id)
            if(result.response.venues[0].id) {
              locationItem.venue_id=result.response.venues[0].id
              // console.log(locationItem)
            }
            this.setState({
              isLoaded: true,
              items: result.items
            });
          },
          (error) => {
            console.log(error)
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    })
  })

  /* function used to toggle map sliding whenever side menu opened or closed
     used to add and remove class from the map*/
  mapSlide = () => {
    this.setState({
      mapSlide: !this.state.mapSlide
    })
  }

  menuItemClicked= (locationid) => {
    this.setState({menuItemClickedId: locationid })
    let marker = locationid;

    this.setState({
        isClicked:true,
        marker: marker,
        showingInfoWindow: true
    })
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
          marker={this.state.marker}
          isClicked={this.state.isClicked}
          showingInfoWindow={this.state.showingInfoWindow}
          google={this.props.google}
          locations={this.state.locations}
          mapSlide = {this.state.mapSlide}
          menuItemClickedId={this.state.menuItemClickedId}
        />
      </div>
    )
  }
}

export default App;