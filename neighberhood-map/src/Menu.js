import React, { Component } from 'react';
import MenuIcon from './menuIcon.png';

class Menu extends Component {

  state = {
    MenuVisibility: true,
    query: ''
  }

  /*update the query var according to the input value*/
  updateQuery = (query) => {
    this.setState({query: query})
    this.props.updateLocations(query)
  }

  /*track menu toggling and set state variable*/
  toggleMenu = () => {
    this.setState({MenuVisibility: !this.state.MenuVisibility})

    /*inform the map that menu toggled so it slide back and forth*/
    this.props.mapSlide()
  }

  render() {
    const { locations } = this.props
    return ( 
      /* to test the query content >> {JSON.stringify(this.state)} */
      <div>
        <div className={(this.state.MenuVisibility ? "visible menuWrapper" : "menuWrapper")}> 
          <input type="text" 
                 name="search location" 
                 placeholder="Search Places" 
                 className="searchInput"
                 value={this.state.query}
                 onChange ={(event) => {
                  this.updateQuery(event.target.value)
                 }}
                />
          <ul className="placesList" aria-label="navigation" name="locations">
            {locations.map((location, index) => (
              <li key={index}
                  id={index}
                  onClick={this.props.menuItemClicked.bind(null, location, index)}> 
                {location.title} 
              </li>   
            ))}
          </ul>
        </div>
          
        <div onClick={this.toggleMenu} className={(this.state.MenuVisibility ? "menuVisible menuToggleIcon" : "menuToggleIcon")}>
          <img src={MenuIcon} alt="burger menu icon to toggle the menu"/>
        </div>       
      </div>  
    );
  }

}

export default Menu;