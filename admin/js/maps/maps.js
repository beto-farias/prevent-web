/**
 * @file variablesIniMapa.js
 * @author Humberto Antonio Marquez
 * @copyright 2 Geeks one Monkey S.C.
 */

/**
 * Id del elemento HTML que contendra el mapa
 * 
 * @var String ELEMENT_MAP
 */
var ELEMENT_MAP = 'map';

/**
 * Latitud inicial del mapa (México)
 * 
 * @var Double LATITUD
 */
var LATITUD_MX = 23.6266557;

/**
 * Longitud inicial del mapa (México)
 * 
 * @var Double LONGITUD
 */
var LONGITUD_MX = -102.5377501;

/**
 * Zoom para el mapa
 * 
 * @var Integer ZOOM
 */
var ZOOM = 18;

/**
 * Tipo de mapa
 * 
 * @var String MAP_TYPE
 */
var MAP_TYPE = "roadmap";

/**
 * Minimo de zoom
 * 
 * @var Integer MIN_ZOOM
 */
var MIN_ZOOM = 5;

/**
 * Maximo para el zoom del mapa
 * 
 * @var Integer MAX_ZOOM
 */
var MAX_ZOOM = 19;
/**
 * Configuración inicial del mapa
 * 
 * @var array options
 */
var mapOptions = {
	center : new google.maps.LatLng(latitud, longitud),
	mapTypeId : MAP_TYPE,
	zoom : ZOOM,
	minZoom : MIN_ZOOM,
	// maxZoom : MAX_ZOOM,
	mapTypeControl : false,
	mapTypeControlOptions : {
		style : google.maps.MapTypeControlStyle.DROPDOWN_MENU,
		mapTypeIds : [ google.maps.MapTypeId.ROADMAP,
				google.maps.MapTypeId.TERRAIN, google.maps.MapTypeId.SATELLITE, ]
	}
};

/**
 * Variable que almacenara al mapa
 */
var map;

/**
 * Obtenemos el elemento del logo
 */
var logoPrevenT = (document.getElementById("dgom-js-logo-prevenT"));

/**
 * Agregamos el buscador
 */
var inputSearch = (document.getElementById("dgom-js-search"));
var input = (document.getElementById("dgom-js-pac-input"));
var autocomplete = new google.maps.places.Autocomplete(input);

/**
 * traducciones del tipo de localizaci&#243;n
 * 
 * @var array a_locations_type
 */
var a_locations_type = new Array('APPROXIMATE', 'GEOMETRIC_CENTER',
		'RANGE_INTERPOLATED', 'ROOFTOP');
a_locations_type[a_locations_type[0]] = [ 'El resultado devuelto es aproximado.' ];
a_locations_type[a_locations_type[1]] = [ 'El resultado devuelto es el centro geom&#233;trico de un resultado como una l&#237;nea (por ejemplo, una calle) o un pol&#237;gono (una regi&#243;n).' ];
a_locations_type[a_locations_type[2]] = [ 'El resultado devuelto refleja una aproximaci&#243;n (normalmente en una carretera) interpolada entre dos puntos precisos (por ejemplo, intersecciones). Normalmente, los resultados interpolados se devuelven cuando los c&#243;digos geogr&#225;ficos de la parte superior no est&#225;n disponibles para una direcci&#243;n postal.' ];
a_locations_type[a_locations_type[3]] = [ 'El resultado devuelto refleja un c&#243;digo geogr&#225;fico preciso.' ];

/**
 * traducciones del estatus de la geocodificaci&#243;n
 * 
 * @var array a_geocode_status
 */
var a_geocode_status = new Array('ERROR', 'INVALID_REQUEST', 'OK',
		'OVER_QUERY_LIMIT', 'REQUEST_DENIED', 'UNKNOWN_ERROR', 'ZERO_RESULTS');
a_geocode_status[a_geocode_status[0]] = [ 'Se ha producido un error al establecer la comunicaci&#243;n con los servidores de Google.' ];
a_geocode_status[a_geocode_status[1]] = [ 'La solicitud GeocoderRequest no es v&#225;lida.' ];
a_geocode_status[a_geocode_status[2]] = [ 'Indica que la respuesta contiene un valor GeocoderResponse v&#225;lido.' ];
a_geocode_status[a_geocode_status[3]] = [ 'La p&#225;gina web ha superado el l&#237;mite de solicitudes en un per&#237;odo de tiempo demasiado breve.' ];
a_geocode_status[a_geocode_status[4]] = [ 'No se permite que la p&#225;gina web utilice el geocoder.' ];
a_geocode_status[a_geocode_status[5]] = [ 'No se pudo procesar una solicitud de codificaci&#243;n geogr&#225;fica debido a un error del servidor. Puede que la solicitud se realice correctamente si lo intentas de nuevo.' ];
a_geocode_status[a_geocode_status[6]] = [ 'No se ha encontrado ning&#250;n resultado para esta solicitud GeocoderRequest.' ];

var marker;

var geocoder = new google.maps.Geocoder();

function loadMap(){
	// Instancia del mapa
	map = new google.maps.Map(document.getElementById(ELEMENT_MAP), mapOptions);
	
	map.controls[google.maps.ControlPosition.LEFT_TOP].push(logoPrevenT);
	autoComplete();
	listenerClickMap();
}

function addMarker(){
	marker = new google.maps.Marker({
	    position: map.getCenter(),
	    map: map,
	    draggable: true,
	  });
	
	listenerMarkerDragend(marker);
}

function showLatLongPos(marcador) {

	// preparar la info de la posici&#243;n latitud y longitud
	var location = marcador.getPosition().toUrlValue(10);

	var latlngStr = location.split(",", 2);
	var lat_mx = parseFloat(latlngStr[0]);
	var lng_mx = parseFloat(latlngStr[1]);
	var latLong_mx = new google.maps.LatLng(lat_mx, lng_mx);
	// obtener la Geo-Codificaci&#243;n Inversa, o sea, la direcci&#243;n
	// humanamente legible
	// introduciendo un dato latLong
	geocoder
			.geocode(
					{
						'latLng' : latLong_mx,
						'region' : 'MX'
					},
					function(results) {
						var location_type_mx = results[0].geometry.location_type
						
						for ( var i = 0; i < results[0].address_components.length; i++) {

							var type = results[0].address_components[i];
							

							if(type.types[0] =="country"){
							 	$(".dgom-js-country").val(type.long_name);	
							}
							
							if(type.types[0] =="administrative_area_level_1"){
								$(".dgom-js-administrative_area_level_1").val(type.long_name);
							}
							
							if(type.types[0] =="administrative_area_level_2"){
								$(".dgom-js-locality").val(type.long_name);
							}
							
							if(type.types[0] =="sublocality_level_1"){
								$(".dgom-js-sublocality").val(type.long_name);
							}
							
							if(type.types[0] =="route"){
								$(".dgom-js-route").val(type.long_name);
							}
							
							if(type.types[0]=="street_number"){
								$(".dgom-js-street-number").val(type.long_name);
							}
							
						}
						$(".dgom-js-direccion").val(results[0].formatted_address);

					});
	$(".dgom-js-latitud").val(lat_mx);
	$(".dgom-js-longitud").val(lng_mx);
}
/**
 * Listener para poder arrastrar el marcador
 * @param marcador
 */
function listenerMarkerDragend(marcador){
	
	google.maps.event.addListener(marcador, "dragend", function() {

		showLatLongPos(marcador);

	});
	
}

function autoComplete() {
	map.controls[google.maps.ControlPosition.TOP_CENTER].push(inputSearch);
	autocomplete.bindTo('bounds', map);
	listenerAutoCompletePlaceChanged();
}

/**
 * Funcion que contiene el listener al dar click al mapa
 */
function listenerClickMap() {
	// Listener para el click al mapa
	google.maps.event.addListener(map, "click", function(event) {
		marker.setPosition(event.latLng);
		showLatLongPos(marker)
	});

}
/**
 * Listener del auto completar. Espera a que el elemento a autocompletar cambie
 * y posiciona el mapa en el centro del lugar encontrado
 */
function listenerAutoCompletePlaceChanged() {
	google.maps.event.addListener(autocomplete, 'place_changed', function() {
		putLocationPlace();
	});

}

function putLocationPlace() {
	var place = autocomplete.getPlace();
	if (typeof (place.geometry) == "undefined") {

		return;
	}
	map.setCenter(place.geometry.location);
	map.setZoom(18);
	
	marker.setPosition(place.geometry.location);
	showLatLongPos(marker);
}

loadMap();
addMarker();