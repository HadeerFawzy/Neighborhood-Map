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
    //clicked markerInfo
    clickedMarkerInfo: null,
  };

  /*run right after the component is added to the DOM*/
  componentDidMount (){
    this.setState({
        showingInfoWindow: false,
        activeMarker: null,
        clickedMarkerInfo: null
    })
  }


  onMarkerClick = ((props, marker, e) =>{
    this.props.locations.map((location) => {
      props.name === location.title && this.callFoursquare(location.venue_id)
    })

    // const ajaxRespond = this.callFoursquare(e)
    //set the state with the new marker and it's data
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    })
  });

  onMapClicked = (props) => {
    // on click on the map, close all the info window, and clear the activeMarker object
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
        clickedMarkerInfo: null
      })
    }
  };

  callFoursquare = ((markerId) => {
    // console.log(markerId)
    var client_id="1MFBDET2ZLPYLJJZI00BDXQBVUUW02MN50LEKV4E1QMHVYDG"
    var client_secret="P1AGYT3EOZ4QRRWH3PN5AR25FBMJ3HFNCTCJLMECNKZOHCBV"
    var url = 'https://api.foursquare.com/v2/venues/'+ markerId +'?client_id=' + client_id +'&client_secret=' + client_secret + '&v=20180602'

    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          // console.log(result.response.venue)
          this.setState({
            clickedMarkerInfo: result.response.venue
          })
          // console.log(this.state.clickedMarkerInfo)
          this.setState({
            isLoaded: true,
            items: result.items
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          // console.log(error)
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  })

  render() {
    const { locations } = this.props
    // {console.log(this.state.showingInfoWindow)}
    return (
      <Map google={this.props.google} 
           onClick={this.onMapClicked} 
           initialCenter={{lat: 40.7281777, lng: -73.984377}} zoom={12}
           className={(this.props.mapSlide ? "slide mapWrapper" : "mapWrapper")}>
        {locations.map((location, index) => (
          <Marker key={index} 
                  name={location.title}  
                  position={{lat: location.location.lat, lng: location.location.lng}}
                  onClick={this.onMarkerClick}/>     
        ))}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h3 className="infoWindowTitle">{this.state.selectedPlace.name}</h3>
              {this.state.clickedMarkerInfo !== null && 
                <div className="infoWindowStyle">
                  <p>Address: {this.state.clickedMarkerInfo.location.address}</p>
                  <img src={this.state.clickedMarkerInfo.bestPhoto.prefix + '300x300' + this.state.clickedMarkerInfo.bestPhoto.suffix} 
                       alt={this.state.clickedMarkerInfo.name}/>
                </div>
              }
            </div>
        </InfoWindow> 
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDUbTRPYZCp2Af2RSRwRfFsL6iK1iHyRG0')
})(MapContainer)