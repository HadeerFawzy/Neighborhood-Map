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

    //markers array
    markersInfo: {}
  };

  /*function to open infowindow of the clicked marker
    (built in function with the google-maps-react package)*/
  onMarkerClick = ((props, marker, e) =>{
    // console.log(props, marker, e)

    this.props.locations.map((location) =>
      props.name === location.title && this.callFoursquare(location.venue_id)
    )
    //set the state with the new marker and it's data
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    })
  });

  /*function to close all infowindows whenever click on the map
    (built in function with the google-maps-react package)*/
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

  /*ajax request use the venue id of the location to get the info of the location*/
  callFoursquare = ((markerId) => {
    console.log(markerId)
    var client_id="1MFBDET2ZLPYLJJZI00BDXQBVUUW02MN50LEKV4E1QMHVYDG"
    var client_secret="P1AGYT3EOZ4QRRWH3PN5AR25FBMJ3HFNCTCJLMECNKZOHCBV"
    var url = 'https://api.foursquare.com/v2/venues/'+ markerId +'?client_id=' + client_id +'&client_secret=' + client_secret + '&v=20180602'

    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
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

  menuItemClicked = () => {
    var menuItemClickedId =this.props.menuItemClickedId
    // var onMarkerClick = this.onMarkerClick.bind(this)

    this.props.locations.map((location) => {
      menuItemClickedId === location.venue_id && this.callFoursquare(location.venue_id)
    })
  }



  render() {
    const { locations, menuItemClickedId } = this.props
    this.menuItemClicked()

    return (
      <Map google={this.props.google}
           onClick={this.onMapClicked}
           initialCenter={{lat: 40.7281777, lng: -73.984377}} zoom={12}
           className={(this.props.mapSlide ? "slide mapWrapper" : "mapWrapper")}>
        {locations.map((location, index) => (
          <Marker key={index}
                  ref={"marker"+location.venue_id}
                  name={location.title}
                  position={{lat: location.location.lat, lng: location.location.lng}}
                  onClick={this.onMarkerClick}/>
        ))}
        
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDUbTRPYZCp2Af2RSRwRfFsL6iK1iHyRG0')
})(MapContainer)
