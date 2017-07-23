/* global google */
import React, { Component } from 'react';

import GMap from './GMap';
import Marker from './Marker';

function geocodeAddress(geocoder, cep) {
    const promise = new Promise(function(resolve, reject) {
        geocoder.geocode({'address': cep}, function(results, status) {
            if (status === 'OK') {
                resolve(results[0].geometry.location);
            } else {
                reject(status);
            }
        });
    });
    return promise;
}

function firstMap(map, cep, location) {
    map.setCenter(location);
    return {
        currentCep: cep,
        map: map,
        marker: Marker(map, location)
    };
}

function initMap(elementId, geocoder, cep) {
    const map = new google.maps.Map(
        document.getElementById(elementId), {
            zoom: 16
        }
    );
    const promise = new Promise(function(resolve, reject) {
        geocodeAddress(geocoder, cep).then((location) => {
            resolve(firstMap(map, cep, location));
        });
    });
    return promise;
}

function changeLocation(map, marker, geocoder, cep) {
    const promise = new Promise(function(resolve, reject) {
        geocodeAddress(geocoder, cep).then((location) => {
            // these functions dont return
            map.panTo(location);
            marker.setPosition(location);
            resolve({
                currentCep: cep,
                map: map,
                marker: marker
            })
        });
    });

    return promise;
}

function buildMap(gmap, elementId, cep) {
    let m = gmap;

    const promise = new Promise(function(resolve, reject) {
        // valid cep or new cep
        if (cep && cep !== m.currentCep) {
            m.geocoder = m.geocoder || new google.maps.Geocoder();

            if (!m.map) {
                resolve(initMap(elementId, m.geocoder, cep));
            } else {
                resolve(changeLocation(m.map, m.marker, m.geocoder, cep));
            }
        } else {
            resolve(m);
        }
    });
    return promise;
}

class GMapContainer extends Component {
    constructor(props) {
        super(props);
        this.gmap = {
            elementId: this.props.elementId,
            map: null,
            marker: null,
            currentCep: null,
            geocoder: null
        };
    }

    componentDidMount = () => {
        buildMap(this.gmap, this.gmap.elementId, this.props.cep)
        .then((m) => {
            this.gmap.map = m.map;
            this.gmap.marker = m.marker;
            this.gmap.currentCep = m.currentCep;
        });
    }

    render() {
        return (
            <GMap
                gmapId={this.gmap.elementId}
            />
        );
    }
}

export default GMapContainer;
