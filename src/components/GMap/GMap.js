/* global google */
import React, { Component } from 'react';

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

function initMarker(map, location) {
    return new google.maps.Marker({
        position: location,
        map: map
    });
}

function firstMap(map, cep, location) {
    map.setCenter(location);
    return {
        currentCep: cep,
        map: map,
        marker: initMarker(map, location)
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

class GMap extends Component {
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

    render() {
        buildMap(this.gmap, this.gmap.elementId, this.props.cep)
        .then((m) => {
            this.gmap.map = m.map;
            this.gmap.marker = m.marker;
            this.gmap.currentCep = m.currentCep;
        });
        return (
            <div
            id={this.gmap.elementId}
            style={{height:"400px", width:"400px"}}
            >
            </div>
        );
    }
}

export default GMap;
