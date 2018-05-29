/**
 * Control y configuración para el mapa 
 * @autor 2 Geeks one Monkey
 * @link https://developers.google.com/maps/documentation/javascript/reference documentación de Google Maps Api
 * @link http://google-maps-utility-library-v3.googlecode.com/svn/trunk/markerclustererplus/docs/reference.html Clustered
 * @version 1.0
 */

/**
 * Id del elemento que contendra el mapa
 * @var ELEMENT_MAP String
 */
var ELEMENT_MAP = 'gmap';

/**
 * Latitud inicial del mapa (México)
 * @var LATITUD Double
 */
var LATITUD = 23.6266557;

/**
 * Longitud inicial del mapa (México)
 * @var LONGITUD Double
 */
var LONGITUD = -102.5377501;

/**
 * Zoom para el mapa
 * @var ZOOM Integer
 */
var ZOOM = 5;

/**
 * Tipo de mapa
 * @var MAP_TYPE Integer
 */
var MAP_TYPE = "roadmap";

/**
 * Minimo de zoom
 * @var MIN_ZOOM Integer
 */
var MIN_ZOOM = 5;

/**
 * Configuración inicial del mapa
 * 
 * @var options
 * @type {google.maps.Map}
 */
var options = {
	center : new google.maps.LatLng(LATITUD, LONGITUD), // Centro del mapa
	mapTypeId : MAP_TYPE,								// Tipo de mapa
	zoom: ZOOM,											// Zoom inicial para el mapa
	minZoom: MIN_ZOOM,									// Zoom minimo para el mapa
	mapTypeControl: true,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
      mapTypeIds: [
        google.maps.MapTypeId.ROADMAP,
        google.maps.MapTypeId.TERRAIN,
        google.maps.MapTypeId.SATELLITE,
      ]
    }
}

/**
 * Url de donde cargara las coordenadas
 * @var url String 
 */
var url = "../preventServices/getLugaresDelitos";

/**
 * Path de las imagenes (Markers)
 * @var baseImagenes String
 */
var baseImagenes = "../../images/markers/";


/**
 * variable auxiliar para cargar todas las coordenadas
 * @var json JSON
 */
var json = null;

/**
 * Objeto MarkerClusterer.
 * @var mc Map
 */
var mc = null;

/**
 * Variable para asignar el mapa.
 * @var map google.maps.Map
 */
var map = null;

/**
 * Variable que obtendra la conversion de las coordenadas al mapa Google
 * @var marcadores array
 */
var marcadores = [];

/**
 * Carga los puntos desde una dirección
 */
function loadPuntos() {
	json = (function() {
		var json = null;
		$.ajax({
			'async' : false,
			'global' : false,
			'url' : url,
			'dataType' : "json",
			'success' : function(data) {
				json = data;
			}
		});
		return json;
	})();
}

var mcOptions = {
	styles : [ {
		height : 32,
		textColor : "white",
		url : baseImagenes + "blue_rounded32.png",
		width : 32,

	}, ],
	maxZoom : 50,
	gridSize: 70
	
}

var mcr = [];
/**
 * Cargamos los puntos al mapa. (Esta funcion debe ejecutarse antes de colocar
 * los marcadores al mapa)
 */
function toggleMarkerClusterer() {
	// mc.addMarkers(marcadores);
	mcr[0] = new MarkerClusterer(map, marcadores, mcOptions);
	mcr[1] = new MarkerClusterer(map, marcadores, mcOptions);
}

/**
 * Colocamos los marcadores
 * 
 */
function setMakers() {
	for ( var index in json) {
		var details = json[index];
		marcadores[index] = new google.maps.Marker({
			title : details.name,
			position : new google.maps.LatLng(details.location[0],
					details.location[1]),
			clickable : false,
			draggable : true,
			flat : true
		});
	}

}

/**
 * Recargamos los markers
 * 
 */
function reloadMarkers() {
	mc.clearMarkers();
	marcadores = [];
	setMakers();
	toggleMarkerClusterer();
}

/**
 * Inicializmos el mapa
 */
function initialize() {
	map = new google.maps.Map(document.getElementById(ELEMENT_MAP), options);
	loadPuntos();
	setMakers();
	toggleMarkerClusterer();
}



// Se inicializa el map
google.maps.event.addDomListener(window, 'load', initialize);
