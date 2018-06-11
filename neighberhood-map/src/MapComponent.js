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

    isItemClicked: false
  };

  /*function to open infowindow of the clicked marker
    (built in function with the google-maps-react package)*/
  onMarkerClick = ((props, marker, e) =>{
    this.setState({
      isItemClicked: false
    })
    // console.log(props, marker, e)
    // console.log(props)
    this.props.locations.map((location) =>
      props.name === location.title && this.callFoursquare(location.venue)
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
    this.setState({
      isItemClicked: false
    })
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
  // used Foursquare ajax request to get places info https://developer.foursquare.com/
  callFoursquare = ((markerId) => {
    // console.log(markerId)
    var client_id="D51YERLV21DITGGVMM1CMPNDIBJKM4LMT5OTHR0YCQXTDITM"
    var client_secret="4HGOXHJK5R5NWSVA5ZQBAYCOB0XKIPFZZBM5D44FFIGRERWL"
    var url = 'https://api.foursquare.com/v2/venues/'+ markerId +'?client_id=' + client_id +'&client_secret=' + client_secret + '&v=20180611'

    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          // console.log(result)
          this.setState({
            clickedMarkerInfo: result.response.venue
          })          
          // console.log(this.state.clickedMarkerInfo, this.state.activeMarker, this.state.showingInfoWindow)
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
    if(prevProps !== this.props){
      this.setState({
        isItemClicked: true,
        activeMarker: prevState.marker,
        showingInfoWindow: true
      })    

      console.log(this.props.menuItemClicked, this.state.selectedPlace)
      this.props.menuItemClicked ? this.callFoursquare(this.props.menuItemClicked.venue) : ''
    }
  }

  render() {
    const { locations } = this.props
    
    return (
      <div>
        <Map role="application" aria-label="map to show all locations"
             google={this.props.google}
             onClick={this.onMapClicked}
             initialCenter={{lat: 40.7281777, lng: -73.984377}} zoom={12}
             className={(this.props.mapSlide ? "slide mapWrapper" : "mapWrapper")}>
          {locations.map((location, index) => (
            <Marker key={index}
                    ref={"marker" + location.venue}
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
                  <div>
                    <div className="infoWindowStyle">
                      <p>Address: {this.state.clickedMarkerInfo.location.address}</p>
                      { this.state.clickedMarkerInfo.bestPhoto ?
                        <img src={this.state.clickedMarkerInfo.bestPhoto.prefix + '300x300' + this.state.clickedMarkerInfo.bestPhoto.suffix}
                           alt={this.state.clickedMarkerInfo.name}/>
                        : 
                        <b>Oooops No Image founded !!!</b>   
                      }
                    </div>
                  </div>  
                }
              </div>
          </InfoWindow>
        </Map>
      </div>  
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDUbTRPYZCp2Af2RSRwRfFsL6iK1iHyRG0')
})(MapContainer)
