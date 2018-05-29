/**
 * @file variablesIniMapa.js
 * @brief Variables y constantes para la inicialización del mapa  
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
var LATITUD = 23.6266557;

/**
 * Longitud inicial del mapa (México)
 * 
 * @var Double LONGITUD
 */
var LONGITUD = -102.5377501;

/**
 * Zoom para el mapa
 * 
 * @var Integer ZOOM
 */
var ZOOM = 5;

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
	center : new google.maps.LatLng(LATITUD, LONGITUD),
	mapTypeId : MAP_TYPE,
	zoom : ZOOM,
	minZoom : MIN_ZOOM,
	// maxZoom : MAX_ZOOM,
	mapTypeControl : true,
	mapTypeControlOptions : {
		style : google.maps.MapTypeControlStyle.DROPDOWN_MENU,
		mapTypeIds : [ google.maps.MapTypeId.ROADMAP,
				google.maps.MapTypeId.TERRAIN, google.maps.MapTypeId.SATELLITE, ]
	}
};

/**
 * Variable para marker manager
 * 
 * @var MarkerManager Marker
 */
var mgr;

/**
 * Marcadores
 * 
 * @var array allMakers
 */
var allmarkers = [];

var icons = {};

var estados;
var municipios;
var delitos;
var urlEstados = "mapsServices/getEstadosPais";
var urlMunicipios = "mapsServices/getMunicipiosEstado";
var urlDelitos = "mapsServices/getDelitos";
var urlAllDelitos = "mapsServices/getAllDelitosMin";
var tipoDelitosFilter = {};
var prefijo="icon_pin-";
var sufijo = "-x32"
var extensionImage = ".png";	
var imagenIcon = {
	0 : {
		nameImage : prefijo+"agrupado"+sufijo+extensionImage,
		width: 43,
		height: 55,
	},
	1 : { // Secuestro
		nameImage : prefijo+"secuestro"+sufijo+extensionImage,
		width: 43,
		height: 55,
	},
	2 : { // Homicidio
		nameImage : prefijo+"homicidio"+sufijo+extensionImage,
		width: 43,
		height: 55,
	},
	3 : { // Desapariciones
		nameImage : "desa"+extensionImage,
		width: 43,
		height: 55,
	},
	4 : { // Robo
		nameImage : prefijo+"robo"+sufijo+extensionImage,
		width: 43,
		height: 55,
	},
	5 : { // Delitos sexuales
		nameImage : prefijo+"sexual"+sufijo+extensionImage,
		width: 43,
		height: 55,
	},
	6 : { // Extorsión
		nameImage : prefijo+"extorsion"+sufijo+extensionImage,
		width: 43,
		height: 55,
	},
	7 : { // Mercado negro
		nameImage : prefijo+"mercadoNegro"+sufijo+extensionImage,
		width: 43,
		height: 55,
	},
	8 : { // Enfrentamientos
		nameImage : prefijo+"enfrentamientos"+sufijo+extensionImage,
		width: 43,
		height: 55,
	},
	9 : { // Delitos ciberneticos
		nameImage : prefijo+"ciberneticos"+sufijo+extensionImage,
		width: 43,
		height: 55,
	},
	10 : { // Asesinato
		nameImage : prefijo+"asesinato"+sufijo+extensionImage,
		width: 43,
		height: 55,
	}

};

var iw = new google.maps.InfoWindow();
var inputSearch = (document.getElementById("dgom-js-search"));
var input =(document.getElementById("dgom-js-pac-input")) ;
var buttonSearh = $("#dgom-js-searh-button");
var autocomplete = new google.maps.places.Autocomplete(input);
var myLocation = (document.getElementById("dgom-js-myLocation"));
var hasPermission = true;
