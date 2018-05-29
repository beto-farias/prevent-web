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
	mapTypeControl : false,
	mapTypeControlOptions : {
		style : google.maps.MapTypeControlStyle.DROPDOWN_MENU,
		mapTypeIds : [ google.maps.MapTypeId.ROADMAP,
				google.maps.MapTypeId.TERRAIN, google.maps.MapTypeId.SATELLITE, ]
	}
};

var map;
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

/**
 * Variable para marker manager
 * 
 * @var MarkerManager Marker
 */
var mgr;

var listaDelitosManager=[];

var isMarkerHiden= false;

var markerAddDelito

var geocoder = new google.maps.Geocoder();

var isLocatedUser = false;
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

/**
 * Direccion url para cargar los pines agrupados por estado
 * @var string urlEstados
 */
var urlEstados = baseUrl+"mapsServices/getEstadosPais";
/**
 * Direccion url para cargar los pines agrupados por municipio
 * @var string urlMunicipios
 */
var urlMunicipios = baseUrl+"mapsServices/getMunicipiosEstado";
/**
 * Direccion url para cargar los pines de delitos
 * @var string urlDelitos
 */
var urlDelitos = baseUrl+"mapsServices/getDelitos";

var tipoDelitosFilter = {};
var prefijo = "icon-crimen-";
var sufijo = "";
var extensionImage = ".png";
var imagenIcon = {
	0 : {
		nameImage : prefijo + "agrupado" + sufijo + extensionImage,
		width : 43,
		height : 55,
	},
	1 : { // Secuestro
		nameImage : prefijo + "secuestro" + sufijo + extensionImage,
		width : 43,
		height : 55,
	},
	2 : { // Homicidio
		nameImage : prefijo + "homicidio" + sufijo + extensionImage,
		width : 43,
		height : 55,
	},
	3 : { // Desapariciones
		nameImage : prefijo +"desapariciones" + sufijo + extensionImage,
		width : 43,
		height : 55,
	},
	4 : { // Robo
		nameImage : prefijo + "robo" + sufijo + extensionImage,
		width : 43,
		height : 55,
	},
	5 : { // Delitos sexuales
		nameImage : prefijo + "sexual" + sufijo + extensionImage,
		width : 43,
		height : 55,
	},
	6 : { // Extorsión
		nameImage : prefijo + "extorsion" + sufijo + extensionImage,
		width : 43,
		height : 55,
	},
	7 : { // Mercado negro
		nameImage : prefijo + "mercado-negro" + sufijo + extensionImage,
		width : 43,
		height : 55,
	},
	8 : { // Enfrentamientos
		nameImage : prefijo + "enfrentamiento" + sufijo + extensionImage,
		width : 43,
		height : 55,
	},
	9 : { // Delitos ciberneticos
		nameImage : prefijo + "ciberneticos" + sufijo + extensionImage,
		width : 43,
		height : 55,
	},
	10 : { // Asesinato
		nameImage : prefijo + "movimientos-sociales" + sufijo + extensionImage,
		width : 43,
		height : 55,
	},
	11 : { // Sociales
		nameImage : prefijo + "movimientos-sociales" + sufijo + extensionImage,
		width : 43,
		height : 55,
	}

};

var iw =  new InfoBubble({
    maxWidth: 350,
    minWidth: 350,
    minHeight: 270,
    maxHeight:270,
    padding: 0,
    backgroundClassName: 'parentContainer',
    backgroundColor: '#86C8CF',
    borderColor: '#86C8CF',
    disableAutoPan: true,
    closeImage: baseUrl+'/images/resources/close.png', 
   
});


var inputSearch = (document.getElementById("dgom-js-search"));
var input = (document.getElementById("dgom-js-pac-input"));
var buttonSearh = $("#dgom-js-searh-button");
var autocomplete = new google.maps.places.Autocomplete(input);
var myLocation = (document.getElementById("dgom-js-myLocation"));
var logoPrevenT = (document.getElementById("dgom-js-logo-prevenT"));
var hasPermission = true;
var isLoad = false;
var selectedTimeFilter = 5;
var iwNewDelito;
var delitoGuardado = false;
var latitudUsuario;
var longitudUsuario;
var estadoSelect = -1;
var posicionUsuario;
var delitosSubDelitos=[];
