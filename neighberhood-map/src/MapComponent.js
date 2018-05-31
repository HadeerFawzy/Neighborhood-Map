import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {

  render() {
    const { locations } = this.props
    return (
      <Map google={this.props.google} initialCenter={{lat: 40.7281777, lng: -73.984377}} zoom={13}>
        {locations.map((location, index) => (
          <Marker key={index} 
                  onClick={this.onMarkerClick} 
                  name={location.title}  
                  position={{lat: location.location.lat, lng: location.location.lng}}/>
        ))}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDUbTRPYZCp2Af2RSRwRfFsL6iK1iHyRG0')
})(MapContainer)