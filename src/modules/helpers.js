import 'whatwg-fetch';

function isValidCepFormat(v) {
    return /\d{5}-\d{3}/.test(v);
}

function formatCepValue(v) {
    // remove all except digits and "-"
    v = v.replace(/[^0-9-]/g, '');

    // only digits, except the 6th char
    if (v.length !== 6 && !v.charAt(v.length - 1).match(/\d/)) {
        v = v.substring(0, v.length - 1);
    }

    // apply mask
    if (/^\d{6}/.test(v)) {
        v = v.substring(0, 5) + "-" + v.substring(5);
    }

    return v;
}

function getJson(url) {
    return fetch(url).then(function(response) {
        return response.json();
    }).then(function(json) {
        return json;
    }).catch(function(err) {
    	// Error
    });
}

export { isValidCepFormat, formatCepValue, getJson };
