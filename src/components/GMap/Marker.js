/* global google */
const Marker = (map, location) => {
    return new google.maps.Marker({
        position: location,
        map: map
    });
};

export default Marker;
