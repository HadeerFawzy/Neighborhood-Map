import React, { Component } from 'react';
// import {ScriptCache} from './lib/ScriptCache';
// import GoogleApi from './lib/GoogleApi';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {
  render() {
    return (
      <Map google={this.props.google} zoom={14}>

        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />

        
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDUbTRPYZCp2Af2RSRwRfFsL6iK1iHyRG0')
})(MapContainer)