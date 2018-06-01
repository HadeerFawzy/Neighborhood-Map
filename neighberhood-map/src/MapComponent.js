import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {

  state = {
    // variable to toggle the infoWindow
    showingInfoWindow: false,
    // object to hold the opened marker
    activeMarker: {},
    //object to hold the opened marker data
    selectedPlace: {},
  };

  onMarkerClick = (props, marker, e) =>
    //set the state with the new marker and it's data
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = (props) => {
    // on click on the map, close all the info window, and clear the activeMarker object
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  render() {
    const { locations } = this.props

    return (
      <Map google={this.props.google} 
           onClick={this.onMapClicked} 
           initialCenter={{lat: 40.7281777, lng: -73.984377}} zoom={12}
           className={(this.props.mapSlide ? "slide mapWrapper" : "mapWrapper")}>
        {locations.map((location, index) => (
          <Marker key={index} 
                  onClick={this.onMarkerClick} 
                  name={location.title}  
                  position={{lat: location.location.lat, lng: location.location.lng}}
                  onClick={this.onMarkerClick}/>     
        ))}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h3>{this.state.selectedPlace.name}</h3>
            </div>
        </InfoWindow> 
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDUbTRPYZCp2Af2RSRwRfFsL6iK1iHyRG0')
})(MapContainer)