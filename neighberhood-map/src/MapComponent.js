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

  onMarkerClick = (props, marker, e) =>{
    // const ajaxRespond = this.callFoursquare(marker)
    //set the state with the new marker and it's data
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    })
  };

  onMapClicked = (props) => {
    // on click on the map, close all the info window, and clear the activeMarker object
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  // callFoursquare = ((marker) => {
  //   console.log(marker.venue_id)

  //   var client_id="1MFBDET2ZLPYLJJZI00BDXQBVUUW02MN50LEKV4E1QMHVYDG"
  //   var client_secret="P1AGYT3EOZ4QRRWH3PN5AR25FBMJ3HFNCTCJLMECNKZOHCBV"
  //   var url = 'https://api.foursquare.com/v2/venues/'+ marker.venue_id +'?client_id=' + client_id +'&client_secret=' + client_secret + '&v=20170707'

  //   fetch()
  //     .then(res => res.json())
  //     .then(
  //       (result) => {
  //         console.log(result)
  //         this.setState({
  //           isLoaded: true,
  //           items: result.items
  //         });
  //       },
  //       // Note: it's important to handle errors here
  //       // instead of a catch() block so that we don't swallow
  //       // exceptions from actual bugs in components.
  //       (error) => {
  //         console.log(error)
  //         this.setState({
  //           isLoaded: true,
  //           error
  //         });
  //       }
  //     )
  // })

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