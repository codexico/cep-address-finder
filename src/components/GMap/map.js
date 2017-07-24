/* global google */
function createMap(elementId) {
  return new Promise(function(resolve, reject) {
    const map = new google.maps.Map(
      document.getElementById(elementId), {
        zoom: 16
      }
    );
    resolve(map);
  });
}

function getCepLocation(geocoder, cep) {
  return new Promise(function(resolve, reject) {
    geocoder.geocode({'address': cep}, function(results, status) {
      if (status === 'OK') {
        resolve(results[0].geometry.location);
      } else {
        reject(status);
      }
    });
  });
}

function changeMapLocation(map, location) {
  return new Promise(function(resolve, reject) {
    map.panTo(location)
    resolve(map);
  });
}

function setMap(map, geocoder, cep) {
  return new Promise(function(resolve, reject) {
    getCepLocation(geocoder, cep).then((location) => {
      resolve(changeMapLocation(map, location));
    });
  });
}


export {
  createMap,
  setMap,
};
