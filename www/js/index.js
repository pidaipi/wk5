
var app = {
    initialize: function() {
        this.bindEvents(); //"this" can also be replaced with "app"
    },
   
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        navigator.geolocation.getCurrentPosition(this.onSuccess, this.onError);
    },

    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },

    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    getInfo: function(){
        document.getElementById("deviceName").innerHTML
        = device.name;
        document.getElementById("version").innerHTML
        = device.phonegap;
        document.getElementById("mobilePlatform").innerHTML
        = device.platform;
        document.getElementById("platformVersion").innerHTML
        = device.version;
        document.getElementById("uuid").innerHTML
        = device.uuid;
    },

    onSuccess: function(position) {
        var geo = document.getElementById('geo');
        var getG = document.getElementById('getGeo');

        // geo.innerHTML = 'geo data maybe:'
        var geoElement = document.getElementById('geolocationData');

        $(getG).on('click', function(e) {
            e.preventDefault();

            geoElement.innerHTML = 'Latitude: ' + position.coords.latitude + '<br />' +
           'Longitude: ' + position.coords.longitude + '<br />' +
           'Altitude: ' + position.coords.altitude + '<br />' +
           'Accuracy: ' + position.coords.accuracy + '<br />' +
           'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '<br />' +
           'Heading: ' + position.coords.heading + '<br />' +
           'Speed: ' + position.coords.speed + '<br />' +
           'Timestamp: ' + position.timestamp + '<br />';
        });
    },
// Run if we face an error
// obtaining the position data
    onError: function(error) {
        var errString = '';
   
        if(error.code) {
       // If we have, handle it by case
            switch(error.code) {
                case 1: // PERMISSION_DENIED
                errString =
                'Unable to obtain the location information ' +
                'because the device does not have permission '+
                'to the use that service.';
                break;
                case 2: // POSITION_UNAVAILABLE
                errString =
                'Unable to obtain the location information ' +
                'because the device location could not ' +
                'be determined.';
                break;
                case 3: // TIMEOUT
                errString =
                'Unable to obtain the location within the ' +
                'specified time allocation.';
                break;
                default: // UNKOWN_ERROR
                errString =
                'Unable to obtain the location of the ' +
                'device due to an unknown error.';
                break;
            }
        }
       // Handle any errors we may face
        var element = document.getElementById('geolocationData');
        element.innerHTML = errString;
        var geo = document.getElementById('geo');
        geo.innerHTML = 'no geo'
    },
};
