/**
 * @file markerManagerPrevent.js
 * @brief Control y configuración para el mapa
 * @note Se necesita importar antes el archivo markerTypeCrimeObject.js 
 * @author 2 Geeks one Monkey
 * @version 1.0
 * @section External External reference
 * 	- https://developers.google.com/maps/documentation/javascript/reference
 * 	- http://google-maps-utility-library-v3.googlecode.com/svn/trunk/markerclustererplus/docs/reference.html
 */

/**
 * Function para configurar el mapa
 * 
 */
function loadMap() {
	// Instancia del mapa
	map = new google.maps.Map(document.getElementById(ELEMENT_MAP), mapOptions);
	
	map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(myLocation);
	// Instacian de marcadores al mapa
	 mgr = new MarkerManager(map);
	// autocomplete
	autoComplete();

	// Si el usuario esta de acuerdo obtendremos su ubicación
	loadLocationUser();

	// Carga listener para el mapa
	//listenerLoaded();
	listenerClickMap();
}

$("#dgom-js-myLocation").on("click", function(e) {
	e.preventDefault();
	loadLocationUser();

});

/**
 * Funcion que pregunta al usuario que el sitio web tendra acceso a la localización 
 * del usuario
 */
function loadLocationUser() {

	// Try HTML5 geolocation.
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {

			var pos = {
				lat : position.coords.latitude,
				lng : position.coords.longitude
			};
			
			var image = {
				    url: 'images/maps/markers/my-location2.png',
				    // This marker is 20 pixels wide by 32 pixels high.
				    size: new google.maps.Size(38, 38),
				    // The origin for this image is (0, 0).
				    origin: new google.maps.Point(0, 0),
				    // The anchor for this image is the base of the flagpole at (0, 32).
				    anchor: new google.maps.Point(18, 18)
				  };

			var markerPositionUser = new google.maps.Marker({
				map : map,
				title : "Posición de usuario",
				position : pos,
				icon: image
			});
			map.setZoom(17);
			map.panTo(pos);

		}, errorHandler);

	} else {

		// Browser doesn't support Geolocation
		// handleLocationError(false, infoWindow, map.getCenter());
	}

}

/**
 * Manejador de errores en cuanto a la localización del usuario
 * @param error
 */
function errorHandler(error) {
	switch (error.code) {
	case error.PERMISSION_DENIED:
		if(hasPermission){
			hasPermission = false;
		}else{
			alert("Para poder utilizar esta función necesita darle permiso al sitio web para acceder a su localización");
			
		}
		break;
	case error.POSITION_UNAVAILABLE:
		//x.innerHTML = "Location information is unavailable."
		break;
	case error.TIMEOUT:
		//x.innerHTML = "The request to get user location timed out."
		break;
	case error.UNKNOWN_ERROR:
		//x.innerHTML = "An unknown error occurred."
		break;
	}
}


/**
 * Onclick en el boton searh
 */
buttonSearh.on("click", function(e) {
	e.preventDefault();

});

/**
 * Carga el input para autocompletar direcciones
 */
function autoComplete() {
	map.controls[google.maps.ControlPosition.TOP_CENTER].push(inputSearch);
	autocomplete.bindTo('bounds', map);
	listenerAutoCompletePlaceChanged();
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
	map.setZoom(14);
}

/**
 * Function para cargar los marcadores al mapa
 */
function listenerLoaded() {
	// Listener para cuando carga el mapa
	google.maps.event.addListener(mgr, 'loaded', function() {
		
		
		//setupMarkers(estados);
		listenerZoomChanged();
	});
	
}

/**
 * Funcion que contiene el listener al dar click al mapa
 */
function listenerClickMap() {
	// Listener para el click al mapa
	google.maps.event.addListener(map, "click", function(event) {
		// Al dar click al mapa cerrara la info window
		iw.close();
	});

}
/**
 * Peticion Ajax para obtener los datos de la base de datos
 * 
 * @param url
 * @returns
 */
function loadLocationsAjax(url) {
	resolvedChecked();

	var json = null;
	$.ajax({
		'async' : false,
		'global' : false,
		'url' : url,
		'data' : tipoDelitosFilter,
		'type' : 'POST',
		'dataType' : "json",
		'success' : function(data) {
			json = data;
		}
	});

	return json;
}
/**
 * Listener para cambio de zoom del mapa
 */
function listenerZoomChanged() {

	google.maps.event.addListener(map, 'zoom_changed', function() {
		console.log("Number zoom: " + map.getZoom());
		stateZoom(map.getZoom());

	});

}

/**
 * Configuracion de los markers
 * 
 * @param locations
 */
function setupMarkers(locations) {

	var markers = [];

	for ( var key in locations.ubicaciones) {
		console.log(locations.ubicaciones[key].d);
		var markerConfig = new Marker();
		markerConfig.icon = locations.ubicaciones[key].c;
		//markerConfig.title = locations.ubicaciones[key].txt_nombre;
		//$command->select ( "D.id_num_delito as a, D.id_evento as b, D.id_tipo_delito as c, LD.num_latitud as d, LD.num_longitud as e, LD.id_estado as f" );
		markerConfig.title = "Delito";
		markerConfig.typeDelito = locations.ubicaciones[key].c;
		markerConfig.latitud = locations.ubicaciones[key].d;
		markerConfig.longitud = locations.ubicaciones[key].e;
		markerConfig.idNumDelito = locations.ubicaciones[key].a;
		markerConfig.idEvento = locations.ubicaciones[key].b;
		markerConfig.label = locations.ubicaciones[key].num_delitos;
		markerConfig.estado = locations.ubicaciones[key].f;

		var marker = createMarker(markerConfig);
		markers.push(marker);
		allmarkers.push(marker);
	}

	mgr.addMarkers(markers, locations.zoom[0], locations.zoom[1]);
	mgr.refresh();
}

/**
 * Creacion de los marker
 * 
 * @param markerObject
 * @returns {MarkerWithLabel}
 */
function createMarker(markerObject) {
	if (typeof (markerObject.typeDelito) == "undefined") {
		markerObject.typeDelito = 0;
	}

	var icon = getIconMarker(markerObject.typeDelito);
	var markerOptions = {
		position : new google.maps.LatLng(markerObject.latitud,
				markerObject.longitud),
		title : markerObject.title,
		id : markerObject.idNumDelito + markerObject.idEvento,
		estado : markerObject.estado,
		evento : markerObject.idEvento,
		typeDelito : markerObject.typeDelito,
		idNumDelito : markerObject.idNumDelito,
		labelText : markerObject.label,
		labelContent : markerObject.label,
		labelAnchor : new google.maps.Point(-6, 21),
		labelClass : "labels", // the CSS class for the label
		labelInBackground : false,
		labelStyle : {
			color : "white",
			fontSize : "7pt"
		}
	};
	markerOptions.icon = icon.icon;

	var marker = new MarkerWithLabel(markerOptions);

	listenerMarkerClick(marker);
	listenerMarkerDblClick(marker);

	return marker;

}
/**
 * Listener para el click de los marker
 * 
 * @param marker
 */
function listenerMarkerClick(marker) {
	google.maps.event.addListener(marker, 'click', function() {
		loadDelito(marker);
	});

}
/**
 * Carga via Ajax un delito para la info window
 * 
 * @param marker
 */
function loadDelito(marker) {
	var dataO;
	if (marker.typeDelito != 0) {
		$.ajax({
			async : false,
			global : false,
			url : 'mapsServices/getDelito',
			type : 'GET',
			dataType : "json",
			data : {
				idNumDelito : marker.idNumDelito,
				idEvento : marker.evento
			},
			success : function(response) {

				dataO = response;
			}
		});
	}

	setupInfoWindow(marker, dataO);
}

/**
 * Configuración de la info window
 * 
 * @param marker
 * @param dataO
 */
function setupInfoWindow(marker, dataO) {
	var content;
	if (typeof (dataO) == "undefined") {
		content = marker.title + ":  " + marker.labelText + " delitos";

	} else {
		content = setupContentInfoWindow(dataO);
	}
	iw.setContent(content);
	iw.open(map, marker);

}

function setupContentInfoWindow(dataO) {
	var content;
	var multimedia = "";
	if (typeof (dataO) != "undefined" && dataO.txt_archivo != null) {
		multimedia = "<br><img src='images/imagen.png'/>";
	}

	content = dataO.txt_nombre + "<br>" + dataO.txt_resumen + "<br>"
			+ dataO.fch_delito + multimedia;
	return content;
}
/**
 * Listener para el doble click a un marcador
 * 
 * @param marker
 */
function listenerMarkerDblClick(marker) {
	google.maps.event.addListener(marker, 'dblclick', function() {
	});

}

/**
 * Configuracion de los iconos
 * 
 * @param type
 * @returns {___anonymous3834_3837}
 */
function getIconMarker(type) {

	var image = imagenIcon[type];
	var icon = false;
	var urlImage = "images/maps/markers/" + image.nameImage;
	var size = new google.maps.Size(image.width, image.height);
	var puntoIni = new google.maps.Point(0, 0);
	var puntoFin = new google.maps.Point(30, 55);
	var iconImage = new google.maps.MarkerImage(urlImage, size, puntoIni,
			puntoFin);

	icon = {
		icon : iconImage,
	};

	return icon;
}

/**
 * Remueve los markers
 * 
 * @param estado
 */
function removeMarkerEstado(estado) {
	for (var i = 0; i < allmarkers.length; i++) {
		if (allmarkers[i].estado == estado) {
			console.log("Encontrado");
			// Remove the marker from Map
			mgr.removeMarker(allmarkers[i]);

			// Remove the marker from array.
		}
	}
}
/**
 * Remueve los markers por tipo de delito
 * 
 * @param tipoDelito
 */
function removeMarkerTipoDelito(tipoDelito) {

	for (var i = 0; i < allmarkers.length; i++) {

		console.log(tipoDelito);
		console.log(allmarkers[i].typeDelito);
		if (allmarkers[i].typeDelito == tipoDelito) {
			console.log("Encontrado");
			// Remove the marker from Map
			mgr.removeMarker(allmarkers[i]);
			mgr.refresh();

			// Remove the marker from array.
		}
	}

}
/**
 * Metodo para cargar los puntos dependiendo el zoom Si el elemento ya se habia
 * cargado no lo cargara
 * 
 * @param numberZoom
 */
function stateZoom(numberZoom) {
	if (numberZoom >= 8 && numberZoom <= 10) {
		if (typeof (municipios) == "undefined") {
			municipios = loadLocationsAjax(urlMunicipios);
			setupMarkers(municipios);
		}
	} else if (numberZoom >= 11 && numberZoom <= 19) {
		if (typeof (delitos) == "undefined") {
			delitos = loadLocationsAjax(urlDelitos);
			setupMarkers(delitos);
		}
	}

}
/**
 * Obtenenemos del filtro lo que este seleccionado
 */
function resolvedChecked() {
	tipoDelitosFilter = $(".dgom-js-form-filter").serialize();
}
/**
 * Remueve todos los marcadores del mapa
 */
function clearMarkers() {
	mgr.clearMarkers();
}

/**
 * Inicializa y carga en pantalla el mapa
 */
google.maps.event.addDomListener(window, 'load', loadMap);
