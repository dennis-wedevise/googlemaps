var map;
var uLocation;
var flagPosition;

var gmOptions = {
	enableHighAccuracy: true // Set true if you want to use GPS. Otherwise, use network.
};

var onSuccess = function(location) {
	console.log("onSuccess");
	uLocation = location.latLng;
	console.log(uLocation);
	
	var distance 	= plugin.google.maps.geometry.spherical.computeDistanceBetween(flagPosition, uLocation);
	var label 		= document.getElementById("label");
	label.innerText = "  " + distance.toFixed(0) + " m";
};

var onError = function(msg) {
	console.log("onError");
	alert(JSON.stringify(msg));
};


document.addEventListener("deviceready", function() 
{
	var div = document.getElementById("map_canvas");
	
	// Initialize the map view
	map = plugin.google.maps.Map.getMap(div, {
		'mapType': plugin.google.maps.MapTypeId.SATELLITE,
		'controls': {
			'compass': true,
			'myLocationButton': true,
			'myLocation': true, // (blue dot)
			'indoorPicker': false,
			'zoom': true
		},
		'gestures': {
			'scroll': true,
			'tilt': false,
			'rotate': false,
			'zoom': true
		},
		camera: {
			target: {
				lat: 51.2243265, 
				lng: 5.64024165
			},
			'tilt': 0,
			'zoom': 17,
			'bearing': 272
		},
		'preferences': {
			'zoom': {
				'minZoom': 16,
				'maxZoom': 20
			},
			'padding': {
				'left': 9,
				'top': 9,
				'bottom': 9,
				'right': 9
			}
		}
	});
	
	map.getMyLocation(gmOptions, onSuccess, onError);
	
	
	map.addTileOverlay({
		debug: false,  // draw debug infomation on tiles
		opacity: 0.6,
		getTile: function(x, y, zoom) {
			return "http://ibirdies.test.desky.nl/clients/ibirdies/themes/images/crossmoor/hole1/{z}/{x}/{y}.png".replace('{z}',zoom).replace('{x}',x).replace('{y}',y);
		}
	});

	
	/*						*/
	/* 		FLAG POINTER
	/*						*/
	map.addMarker({
		position: { 
			lat: 51.224543, 
			lng: 5.637994
		}
	}, 
	function(marker) {

		marker.setDisableAutoPan(true);
		
	});
	
	flagPosition = {"lat": 51.224543, "lng": 5.637994};
	
	
	
	
}, false);
