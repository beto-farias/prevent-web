var map = null;
var marker = null;
var geocoder = null;
var infowindow = null;
// posicion predeterminada
var ini_lat = 23.634501;
var ini_lng = -102.552784;

// traducciones del tipo de localizaci&#243;n
var a_locations_type = new Array('APPROXIMATE', 'GEOMETRIC_CENTER',
		'RANGE_INTERPOLATED', 'ROOFTOP');
a_locations_type[a_locations_type[0]] = [ 'El resultado devuelto es aproximado.' ];
a_locations_type[a_locations_type[1]] = [ 'El resultado devuelto es el centro geom&#233;trico de un resultado como una l&#237;nea (por ejemplo, una calle) o un pol&#237;gono (una regi&#243;n).' ];
a_locations_type[a_locations_type[2]] = [ 'El resultado devuelto refleja una aproximaci&#243;n (normalmente en una carretera) interpolada entre dos puntos precisos (por ejemplo, intersecciones). Normalmente, los resultados interpolados se devuelven cuando los c&#243;digos geogr&#225;ficos de la parte superior no est&#225;n disponibles para una direcci&#243;n postal.' ];
a_locations_type[a_locations_type[3]] = [ 'El resultado devuelto refleja un c&#243;digo geogr&#225;fico preciso.' ];

// traducciones del estatus de la geocodificaci&#243;n
var a_geocode_status = new Array('ERROR', 'INVALID_REQUEST', 'OK',
		'OVER_QUERY_LIMIT', 'REQUEST_DENIED', 'UNKNOWN_ERROR', 'ZERO_RESULTS');
a_geocode_status[a_geocode_status[0]] = [ 'Se ha producido un error al establecer la comunicaci&#243;n con los servidores de Google.' ];
a_geocode_status[a_geocode_status[1]] = [ 'La solicitud GeocoderRequest no es v&#225;lida.' ];
a_geocode_status[a_geocode_status[2]] = [ 'Indica que la respuesta contiene un valor GeocoderResponse v&#225;lido.' ];
a_geocode_status[a_geocode_status[3]] = [ 'La p&#225;gina web ha superado el l&#237;mite de solicitudes en un per&#237;odo de tiempo demasiado breve.' ];
a_geocode_status[a_geocode_status[4]] = [ 'No se permite que la p&#225;gina web utilice el geocoder.' ];
a_geocode_status[a_geocode_status[5]] = [ 'No se pudo procesar una solicitud de codificaci&#243;n geogr&#225;fica debido a un error del servidor. Puede que la solicitud se realice correctamente si lo intentas de nuevo.' ];
a_geocode_status[a_geocode_status[6]] = [ 'No se ha encontrado ning&#250;n resultado para esta solicitud GeocoderRequest.' ];

// funciones para nuestro mapa
function initGMaps() {
	// crear los objetos necesarios, primero el mapa
	map = new google.maps.Map(document.getElementById("map_canvas"), {
		'zoom' : 5,
		'center' : new google.maps.LatLng(ini_lat, ini_lng),
		'mapTypeId' : google.maps.MapTypeId.ROADMAP,
		'scaleControl' : true,
		'scrollwheel' : false
	});

	  
	// autocompletar
	var input = /** @type {HTMLInputElement} */
	(document.getElementById('pac'));

	var inputSearch = (document.getElementById('searchButton'));

	map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
	map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputSearch);

	var autocomplete = new google.maps.places.Autocomplete(input);
	autocomplete.bindTo('bounds', map);

	google.maps.event.addListener(autocomplete, 'place_changed', function() {

		showAddress($("#pac").val());

	});

	// el marcador (pin)
	marker = new google.maps.Marker( {
		map : map,
		position : new google.maps.LatLng(ini_lat, ini_lng),
		draggable : true,
		visible : false
	});
	// la ventana de info (globo)
	infowindow = new google.maps.InfoWindow();
	// el geocodificador
	geocoder = new google.maps.Geocoder();
	// crear los eventos para acciones del mouse sobre el marcador (pin)
	google.maps.event.addListener(marker, "dragend", function() {

		showLatLongPos();

	});
	google.maps.event.addListener(marker, "click", function() {
		showLatLongPos();

	});

	google.maps.event.addListener(map, 'click', function(event){
	   
	   marker.setPosition(event.latLng);
	   marker.setVisible(true);
	   showLatLongPos();

	});
	
}

function showAddress(address) {
	if (geocoder) {

		// obtener la Geo-Codificaci&#243;n Forward,
		// introduciendo un dato string (address)
		geocoder.geocode( {
			'address' : address,
			'region' : 'MX'
		}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				if (results[0]) {
					// preparar la info de la posici&#243;n latitud y longitud
				var input = results[0].geometry.location.toUrlValue();

				$("#addressTrue").val(results[0].formatted_address);
				var latlngStr = input.split(",", 2);
				var lat_mx = parseFloat(latlngStr[0]);
				var lng_mx = parseFloat(latlngStr[1]);
				var latLong_mx = new google.maps.LatLng(lat_mx, lng_mx);

				// centrar el mapa en la posici&#243;n encontrada
				map.setZoom(15);
				map.setCenter(latLong_mx);
				marker.setPosition(latLong_mx);
				marker.setVisible(true);

				//
				google.maps.event.trigger(marker, 'click');

				// llenar con la info de la codificaci&#243;n inversa, o sea, la
				// direcci&#243;n humanamente legible
				var location_type_mx = results[0].geometry.location_type

				infowindow.setContent('<b>' + results[0].formatted_address
						+ '</b>' + '<br/><br/><i style="color: #777;">'
						+ a_locations_type[location_type_mx] + '</i>');
				infowindow.open(map, marker);
			} else {
				alert(a_geocode_status[status]);
			}
		} else {
			alert(a_geocode_status[status]);
		}
	}	);
	} // endif
}

function showLatLongPos() {

	// preparar la info de la posici&#243;n latitud y longitud
	var location = marker.getPosition().toUrlValue(10);

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
							
						}

						infowindow.setContent('<b>'
								+ results[0].formatted_address + '</b>'
								+ '<br/><br/><i style="color: #777;">'
								+ a_locations_type[location_type_mx] + '</i>');
						infowindow.open(map, marker);
					});
	// llenar los campos de texto con los valores latitud y longitud
	// respectivamente
	$(".dgom-js-latitud").val(lat_mx);
	$(".dgom-js-longitud").val(lng_mx);
}

// cargar el mapa autom&#225;ticamente cuando se carga la p&#225;gina
// es el equivalente a poner body onload="initGMaps();">
google.maps.event.addDomListener(window, 'load', initGMaps);
/*
 * $(document).ready(function(){ $('#searchButton').click(function(e){
 * e.preventDefault(); }); });
 */