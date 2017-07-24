/* global google */
function addMarker(map, location = map.getCenter().toJSON()) {
  return new google.maps.Marker({
    position: location,
    map: map
  });
}

function removeMarker(marker) {
  marker.setMap(null);
}

function removeAllMarkers(markers = []) {
  markers.map(marker => removeMarker(marker));
}

function setMarker(map) {
  return new Promise(function(resolve, reject) {
      resolve({map, marker: addMarker(map)});
  });
}

function changeMarker(map, markers) {
  return new Promise(function(resolve, reject) {
    removeAllMarkers(markers);
    resolve(setMarker(map));
  });
}

export {
  setMarker,
  changeMarker,
};
