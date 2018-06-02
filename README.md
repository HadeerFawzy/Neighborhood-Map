# Neighborhood-Map

** reference-map: https://github.com/fullstackreact/google-maps-react
** used Foursquare ajax request to get places images https://developer.foursquare.com/
## How to start
 - git clone the repo
 - cd neighborhood-map
 - npm start

## How to use
 - use the input field at the side menu to filter the shown markers 
 - click on any marker to get information about the place 

## How I built the project
 - npm install -g create-react-app

## Packages Used
 - import React, { Component } from 'react'
 - import escapeRegExp from 'escape-string-regexp'
 - import sortBy from 'sort-by'
 - import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'