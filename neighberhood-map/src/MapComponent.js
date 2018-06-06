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
    markersInfo: {},

    //marker coming from componentDidUpdate
    clickedItemMarker: {}
  };

  /*function to open infowindow of the clicked marker
    (built in function with the google-maps-react package)*/
  onMarkerClick = ((props, marker, e) =>{
    // console.log(props, marker, e)
    console.log(props)
    this.props.locations.map((location) =>
      props.name === location.title && this.searchVenuesIds(location)
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

  // function to search for the venue_id for every location (ajax request using lat&lng of every location)
  searchVenuesIds = ((locationItem) => {
    var url = 'https://api.foursquare.com/v2/venues//search?ll=' + locationItem.location.lat + ',' + locationItem.location.lng + '&oauth_token=PHZPF20MASML1KWVF3RCSDQXJQ0PBX1JAH4TKHR0VWYT4Y5P&v=20180602'
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          if(result.response.venues[0].id) {
            // locationItem.venue_id=result.response.venues[0].id
            this.callFoursquare(result.response.venues[0].id)
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

  /*ajax request use the venue id of the location to get the info of the location*/
  callFoursquare = ((markerId) => {
    console.log(markerId)
    var client_id="VKFETYJJE2JF0H41EWW1V12B4HRZ1QZ1MQSYLBBJXXD11QM2"
    var client_secret="PCFFTVIJQUFKZGKV00T15TNLO5GMULEO44L2AKH5RDMQRKFA"
    var url = 'https://api.foursquare.com/v2/venues/'+ markerId +'?client_id=' + client_id +'&client_secret=' + client_secret + '&v=20180602'

    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          // console.log(result)
          this.setState({
            clickedMarkerInfo: result.response.venue
          })
          
          console.log(this.state.clickedMarkerInfo, this.state.activeMarker, this.state.showingInfoWindow)
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

  componentDidUpdate (prevProps, prevState, snapshot) {
    // console.log(prevProps,this.props)
    if(prevProps !== this.props){
      this.setState({
        activeMarker: prevState.marker,
        showingInfoWindow: true
      })      
      this.searchVenuesIds(this.props.menuItemClicked)
    }
  }

  render() {
    const { locations, menuItemClicked, isClicked } = this.props
    
    return (
      <Map google={this.props.google}
           onClick={this.onMapClicked}
           initialCenter={{lat: 40.7281777, lng: -73.984377}} zoom={12}
           className={(this.props.mapSlide ? "slide mapWrapper" : "mapWrapper")}>
        {locations.map((location, index) => (
          <Marker key={index}
                  ref={"marker" + location.venue_id}
                  name={location.title}
                  position={{lat: location.location.lat, lng: location.location.lng}}
                  onClick={this.onMarkerClick}/>
        ))}
        
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              {this.state.clickedMarkerInfo !== null &&
                <div>
                  <h3 className="infoWindowTitle">{this.state.clickedMarkerInfo.name}</h3>
                  <div className="infoWindowStyle">
                    <p>Address: {this.state.clickedMarkerInfo.location.address}</p>
                    <img src={this.state.clickedMarkerInfo.bestPhoto.prefix + '300x300' + this.state.clickedMarkerInfo.bestPhoto.suffix}
                         alt={this.state.clickedMarkerInfo.name}/>
                  </div>
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
