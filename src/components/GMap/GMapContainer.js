/* global google */
import React, { Component } from 'react';

import { createMap, setMap } from './map';
import { setMarker, changeMarker } from './marker';

import GMap from './GMap';

function initMap(elementId, geocoder, cep) {
  return createMap(elementId)
    .then(map => setMap(map, geocoder, cep))
    .then(map => setMarker(map));
}

function updateMap(map, geocoder, markers, cep) {
  return setMap(map, geocoder, cep)
    .then(map => changeMarker(map, markers));
}

class GMapContainer extends Component {
  constructor(props) {
    super(props);
    const geocoder = new google.maps.Geocoder();
    this.state = {
      markers: [],
      geocoder,
      map: null
    };
  }

  updateState = (map, marker) => {
    const newState = Object.assign({}, this.state, {map, markers: [marker]});
    this.setState(newState);
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.cep !== nextProps.cep) {
      const {map, geocoder, markers} = this.state;
      updateMap(map, geocoder, markers, nextProps.cep)
        .then(({map, marker}) => this.updateState(map, marker));
    }
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    return this.props !== nextProps;
  }

  componentDidMount = () => {
    initMap(this.props.elementId, this.state.geocoder, this.props.cep)
      .then(({map, marker}) => this.updateState(map, marker));
  }

  render() {
    return (
      <GMap
        gmapId={this.props.elementId}
        />
    );
  }
}

export default GMapContainer;
