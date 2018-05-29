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

var onlyOnce = true;

/**
 * Function para configurar el mapa
 * 
 */
function loadMap() {
	// Instancia del mapa
	map = new google.maps.Map(document.getElementById(ELEMENT_MAP), mapOptions);
	
	map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(myLocation);
	
	map.controls[google.maps.ControlPosition.LEFT_TOP].push(logoPrevenT);
	// Instacian de marcadores al mapa
	mgr = new MarkerManager(map);
	
	if(usuarioFree){
		for(var i=1; i<=11; i++ ){
			listaDelitosManager[i] = new MarkerManager(map);
		}
	}else{
		$(".dgom-js-filter-sub-delitos-check").each(function(){
			var idTipo = $(this).data("delito");
			var isSubTipo = $(this).data("value");
			var isCheck = $(this).prop("checked");
			delitosSubDelitos[idTipo.toString()+isSubTipo.toString()]= new MarkerManager(map);;
		});
	}
	// autocomplete
	autoComplete();

	// Si el usuario esta de acuerdo obtendremos su ubicación
	loadLocationUser();

	// Carga listener para el mapa
	listenerLoaded();
	listenerClickMap();
	
	listenerMove();
	 
}

function freeFunction(evt){
	
	// 
	var distancia = 0.03;
	var primerPunto = {lat:(evt.lat + 0.03), lng:(evt.lng - 0.03)};
	var segundoPunto = {lat:(evt.lat + 0.03), lng:(evt.lng + 0.03)};
	var tercerPunto = {lat:(evt.lat - 0.03), lng:(evt.lng - 0.03)};
	var cuartoPunto = {lat:(evt.lat - 0.03), lng:(evt.lng + 0.03)};
	
	// Define the LatLng coordinates for the polygon's path.
	  var poligono = [
	    primerPunto,
	    segundoPunto,
	    cuartoPunto,
	    tercerPunto
	  ];
	  
	  var buenos_aires = new google.maps.LatLng((evt.lat + 0.03), (evt.lng - 0.03)); 
	  var distanciaDif = google.maps.geometry.spherical.computeDistanceBetween(posicionUsuario.getPosition(), buenos_aires);


	  var cityCircle = new google.maps.Circle({
		  strokeColor: "#00FF00",
		  strokeOpacity: 0.8,
		  strokeWeight: 2,
		  fillColor: "#00FF00",
		  fillOpacity: 0.0, 
	      map: map,
	      clickable: false,
	      center: posicionUsuario.getPosition(),
	      radius: 1000
	    });
	
	
}

/**
 * Muestra ubicación del usuario
 */
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
				    url: baseUrl+'images/maps/markers/my-location2.png',
				    // This marker is 20 pixels wide by 32 pixels high.
				    size: new google.maps.Size(38, 38),
				    // The origin for this image is (0, 0).
				    origin: new google.maps.Point(0, 0),
				    // The anchor for this image is the base of the flagpole at (0, 32).
				    anchor: new google.maps.Point(18, 18)
				  };
			
			if(!isLocatedUser){
				
				var markerPositionUser = new google.maps.Marker({
					map : map,
					//title : "Posición de usuario",
					position : pos,
					icon: image
				});
				
				isLocatedUser = true;
			}
			
			latitudUsuario = pos.lat;
			longitudUsuario = pos.lng;
			
			posicionUsuario = markerPositionUser;
			
			if(onlyOnce){
			
			setTimeout(function(){
				map.panTo(pos);
				//map.setZoom();
				setTimeout(function(){
					map.setZoom(7);
					setTimeout(function(){
						map.setZoom(9);
						setTimeout(function(){
							map.setZoom(11);
							setTimeout(function(){
								map.setZoom(13);
								setTimeout(function(){
									map.setZoom(15);
									setTimeout(function(){
										map.setZoom(18);
									}, 800);
								}, 800);
							}, 800);
						}, 800);
					}, 800);
				}, 800);
			}, 4000);
			onlyOnce = false;
			}else{
				map.panTo(pos);
			}
			
			if(usuarioFree){
				freeFunction(pos);
			}
			
			if(usuarioFree){
				stateZoom(18);
			}
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
			
			
		}
		
		toastrError("Para los usuarios gratuitos y no registrados se necesita conocer su ubicación para que pueda ver los delitos.", "toast-top-center");
		break;
	case error.POSITION_UNAVAILABLE:
		//x.innerHTML = "Location information is unavailable."
		toastrError("No se puede obtener su localización.", "toast-top-center");
		break;
	case error.TIMEOUT:
		toastrError("Tiempo de respuesta excedido.", "toast-top-center");
		//x.innerHTML = "The request to get user location timed out."
		break;
	case error.UNKNOWN_ERROR:
		toastrError("Error desconocido.", "toast-top-center");
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
	map.setZoom(18);
	verificarMarcadoresEscondidos(place.geometry.location);
}

/**
 * Function para cargar los marcadores al mapa
 */
function listenerLoaded() {
	// Listener para cuando carga el mapa
	google.maps.event.addListener(mgr, 'loaded', function() {
		//estados = loadLocationsAjax(urlEstados);
		//setupMarkers(estados);
		
		if(usuarioFree){
			
			listenerZoomChanged();
		}else{
			getLoadSubTipos();
			verificarTodosIni();
		}	
		
		
	});

}
/**
 * Listener para cuando se mueva el mapa
 */
function listenerMove(){
	
	google.maps.event.addListener(map, 'dragend', function() {
		//console.log("Las coordenadas son: "+map.getCenter());
	});
	
}

function verificarMarcadoresEscondidos(coordenadas){
	if(isMarkerHiden){
		addMarkerNewDelito(coordenadas);
	}
	
}

/**
 * Funcion que contiene el listener al dar click al mapa
 */
function listenerClickMap() {
	// Listener para el click al mapa
	google.maps.event.addListener(map, "click", function(event) {
		// Al dar click al mapa cerrara la info window
		iw.close();
		verificarMarcadoresEscondidos(event.latLng);
	});

}

/**
 * Agrega el marker
 */
function setMarkerAddDelito(){
	
	addMarkerNewDelito(map.getCenter());
}

/**
 * Agrega marker para capturar el nuevo delito
 */
function addMarkerNewDelito(pos){
	
	if(delitoGuardado){
		return;
	}
	
	if(markerAddDelito){
		removeMarkerNewDelito();
	}
	
	var image = {
		    url: baseUrl+'images/maps/markers/icon-reportar-delito.png',
		    // This marker is 20 pixels wide by 32 pixels high.
		    size: new google.maps.Size(41, 53),
		    // The origin for this image is (0, 0).
		    origin: new google.maps.Point(0, 0),
		    // The anchor for this image is the base of the flagpole at (0, 32).
		    anchor: new google.maps.Point(21, 52)
		  };
	
	markerAddDelito = new google.maps.Marker({
		map : map,
		title : "Agregar delito",
		draggable : true,
		position : pos,
		animation: google.maps.Animation.DROP,
		icon:image
	});
	
	listenerMarkerDragend(markerAddDelito);
	 showLatLongPos(markerAddDelito);
	 
	 setTimeout(function(){
		 iwNewDelito = new google.maps.InfoWindow();
			iwNewDelito.setContent("Arrastra o da click al lugar donde sucedio el delito");
			iwNewDelito.open(map, markerAddDelito);
		 
	 }, 500);
	 
	 
}

function removeListener(){
	markerAddDelito.draggable = false;
	delitoGuardado = true;
}

function infoWindowNewCreate(){
	iwNewDelito.setContent("Evento reportado con éxito<br>" +
			"¡Gracias por tu denuncia!");
}

/**
 * Elimina marker de captura el nuevo delito
 */
function removeMarkerNewDelito(){
	
	markerAddDelito.setMap(null);
	
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


function loadLocationsAjaxGET(url, idTipo) {
	resolvedChecked();

	var json = null;
	$.ajax({
		'url' : url,
		'data' : {lat:latitudUsuario,  log:longitudUsuario, estado:estadoSelect},
		'type' : 'POST',
		'dataType' : "json",
		'success' : function(data) {
			manageMarkersByDelitoCallBack(data, idTipo);
			
			if(typeof(data.ubicaciones)=="undefined"){
				//toastrInfo("No hay datos para este tipo de delito", "toast-bottom-center");
			}
		}
	});

}

/**
 * 
 */
function cargarDelitoPorTipo(idTipo){
	
	var url = baseUrl+"mapsServices/getDelitosByTipoDelitoAndTime/idTipoDelito/"+idTipo+"/time/"+selectedTimeFilter;
	loadLocationsAjaxGET(url, idTipo);
	
	//return loadLocationsAjaxGET(url);
	
}


/**
 * Listener para cambio de zoom del mapa
 */
function listenerZoomChanged() {

	google.maps.event.addListener(map, 'zoom_changed', function() {
		console.log("El nivel de zoom actual es: "+map.getZoom());
		if(usuarioFree){
		
			stateZoom(map.getZoom());
		}else{
			getLoadSubTipos();
		}	
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
		
		var markerConfig = new Marker();
		markerConfig.icon = locations.ubicaciones[key].id_tipo_delito;
		markerConfig.title = locations.ubicaciones[key].txt_nombre;
		markerConfig.typeDelito = locations.ubicaciones[key].id_tipo_delito;
		markerConfig.latitud = locations.ubicaciones[key].num_latitud;
		markerConfig.longitud = locations.ubicaciones[key].num_longitud;
		markerConfig.idNumDelito = locations.ubicaciones[key].id_num_delito;
		markerConfig.idEvento = locations.ubicaciones[key].id_evento;
		markerConfig.label = locations.ubicaciones[key].num_delitos;
		markerConfig.estado = locations.ubicaciones[key].id_estado;

		var marker = createMarker(markerConfig);
		markers.push(marker);
		//allmarkers.push(marker);
	}

	mgr.addMarkers(markers, locations.zoom[0], locations.zoom[1]);
	mgr.refresh();
}


function setupMarkersDelitos(locations, idTipoDelito) {

	var markers = [];

	for ( var key in locations.ubicaciones) {
		
		var markerConfig = new Marker();
		markerConfig.icon = locations.ubicaciones[key].id_tipo_delito;
		markerConfig.title = locations.ubicaciones[key].txt_nombre;
		markerConfig.typeDelito = locations.ubicaciones[key].id_tipo_delito;
		markerConfig.latitud = locations.ubicaciones[key].num_latitud;
		markerConfig.longitud = locations.ubicaciones[key].num_longitud;
		markerConfig.idNumDelito = locations.ubicaciones[key].id_num_delito;
		markerConfig.idEvento = locations.ubicaciones[key].id_evento;
		markerConfig.label = locations.ubicaciones[key].num_delitos;
		markerConfig.estado = locations.ubicaciones[key].id_estado;

		var marker = createMarker(markerConfig);
		
		if(usuarioFree){
			
			var distancia = google.maps.geometry.spherical.computeDistanceBetween(posicionUsuario.getPosition(), marker.getPosition());
			if(distancia<=1000){
				
				markers.push(marker);
				
			}
		}else{
			markers.push(marker);
		}
		
		
		//allmarkers.push(marker);
	}
	
	listaDelitosManager[idTipoDelito].addMarkers(markers, locations.zoom[0], locations.zoom[1]);
	listaDelitosManager[idTipoDelito].refresh();
}

function setupMarkersDelitosRefresh(locations, idTipoDelito) {

	for ( var key in locations.ubicaciones) {
		console.log("El tipo de delito es "+locations.ubicaciones[key].id_tipo_delito);
		var markerConfig = new Marker();
		markerConfig.icon = locations.ubicaciones[key].id_tipo_delito;
		markerConfig.title = locations.ubicaciones[key].txt_nombre;
		markerConfig.typeDelito = locations.ubicaciones[key].id_tipo_delito;
		markerConfig.latitud = locations.ubicaciones[key].num_latitud;
		markerConfig.longitud = locations.ubicaciones[key].num_longitud;
		markerConfig.idNumDelito = locations.ubicaciones[key].id_num_delito;
		markerConfig.idEvento = locations.ubicaciones[key].id_evento;
		markerConfig.label = locations.ubicaciones[key].num_delitos;
		markerConfig.estado = locations.ubicaciones[key].id_estado;

		var marker = createMarker(markerConfig);
		
		if(usuarioFree){
			
			var distancia = google.maps.geometry.spherical.computeDistanceBetween(posicionUsuario.getPosition(), marker.getPosition());
			
			if(distancia<=1000){
				
				
				return;
			}
		}
		
		listaDelitosManager[idTipoDelito].addMarker(marker, locations.zoom[0], locations.zoom[1]);
		listaDelitosManager[idTipoDelito].refresh();
		//allmarkers.push(marker);
	}
	
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

	var posicion = new google.maps.LatLng(markerObject.latitud,
			markerObject.longitud);
	var icon = getIconMarker(markerObject.typeDelito);
	var markerOptions = {
		position : posicion,
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
	
	if (marker.typeDelito != 0) {
		$.ajax({
			
			url : baseUrl+'mapsServices/getDelito',
			type : 'GET',
			dataType : "json",
			data : {
				idNumDelito : marker.idNumDelito,
				idEvento : marker.evento
			},
			success : function(response) {

				setupInfoWindow(marker, response);
				
			}
		});
	}

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
		content = setupContentInfoWindow(dataO, marker);
	}
	iw.setContent(content);
	
	iw.open(map, marker);
}

function loadMultimedia(dataO){
	var multimedia='';
	if(dataO.multimedia){
	
		for ( var key in dataO.multimedia) {
			
			multimedia+= '<li class="slide">'+	
							'<p>'+chooseTypeMultimedia(dataO.multimedia[key], dataO.id_evento, dataO.id_num_delito)+'</p>'+
						'</li>';
		}
		
		var multimediaHtml= '<div class="slidewrap2" style="display:none;">'+
		'<ul class="slider">'+multimedia+
		'</ul>'+
	'</div>';
		
	}

	return multimediaHtml;
}

function chooseTypeMultimedia(multimedia, idEvento, idNumEvento){
	var htmlMultimedia = "";
	switch (multimedia.id_tipo_multimedia) {
	case "1":
		htmlMultimedia = "<img src='"+baseUrl+"multimedia/delitos/"+idNumEvento.toString()+idEvento.toString()+"/"+multimedia.txt_archivo+"' />" ;
		break;
	case "2":
		htmlMultimedia = "<video width='320' height='240' controls>"+
							"<source src='"+baseUrl+"multimedia/delitos/"+idNumEvento.toString()+idEvento.toString()+"/"+multimedia.txt_archivo+"' type='video/mp4'>"+
							"Your browser does not support the video tag."+
						"</video>";
		break;
	case "3":
		htmlMultimedia = "<audio controls>"+
							"<source src='"+baseUrl+"multimedia/delitos/"+idNumEvento.toString()+idEvento.toString()+"/"+multimedia.txt_archivo+"' type='audio/mpeg'>"+
								"Your browser does not support the audio element."+
						"</audio>";
	break;
	}
	
	
	return htmlMultimedia;
}

function viewFiles(tab){
	var slider = $(".slidewrap2");
	if(slider.css("display")=="none"){
		slider.carousel({
			slider: ".slider",
			slide: ".slide",
			addNav: true,
			addPagination: false,
			speed: 300 
		});
		
		slider.css("display","block");
		
	}else{
		slider.css("display", "none");
	}
	
	if(tab.hasClass("dgom-ui-container-multimedia-on")){
		tab.removeClass("dgom-ui-container-multimedia-on");
	}else{
		tab.addClass("dgom-ui-container-multimedia-on");
	} 

	
}

function setupContentInfoWindow(dataO, marker) {
	
	var content;
	var multimedia = loadMultimedia(dataO);
	var fileButton='';
	
	if(dataO.multimedia.length>0){
		//fileButton = '<div><i class="icon wb-attach-file" aria-hidden="true" onclick="viewFiles();"> Multimedia</i></div>';
		fileButton = '<div class="dgom-ui-container-multimedia">'+
		'<div class="dgom-ui-tab-multimedia" onclick="viewFiles($(this))"><span></span></div>'+
		'<div class="dgom-ui-picture-multimedia">'+multimedia+'</div>'+
	'</div>';

	}
	
	layout = '<div id="iw-container">' +
					'<div class="iw-title">{tipoDelito} - <small>{subTipo}</small></div>' +
					fileButton+
					'<div class="pull-right iw-subTitle">{fecha} - {distancia} mts.</div>' +	
					'<div class="iw-content">' +
						'<div class="iw-subTitle">'+
							'<h5>Descripción</h5>'+
							'<p style="clear:both; word-wrap: break-word;">{descripcion}</p>' +
						
							'<h5>Dirección</h5>'+
							'<p>{direccion}</p>'+
							
							'<h5>Rerefencia:</h5>'+
							'<p>{referencia}</p>'+
						'</div>' +
					'</div>' +
				'</div>'+
				'<div class="iw-bottom">'+
				'{botones}'+
			'</div>';
	
	var texto;
	var referencia;
	
	var distancia = google.maps.geometry.spherical.computeDistanceBetween(posicionUsuario.getPosition(), marker.getPosition());
	
	if(dataO.txt_resumen.length==0){
		texto = "Sin descripción";
	}else{
		texto = dataO.txt_resumen;
	}
	
	if(dataO.txt_referencia==0 || dataO.txt_referencia=="null"){
		referencia = "Sin referencia";
	}else{
		referencia = dataO.txt_referencia;
	}
	
	botones = getHTMLInfoWindow(dataO);
	
	layout = layout.replace("{distancia}", Math.round(distancia));
	layout = layout.replace("{tipoDelito}", dataO.txt_nombre);
	layout = layout.replace("{subTipo}", dataO.txt_sub_tipo);
	layout = layout.replace("{fecha}", dataO.fecha);
	layout = layout.replace("{descripcion}", texto);
	layout = layout.replace("{direccion}", dataO.txt_descripcion_lugar);
	layout = layout.replace("{referencia}", referencia);
	layout = layout.replace("{botones}", botones);
	
	return layout;
}

function getHTMLInfoWindow(dataO){
	var boton = "";
	var footer ="<div class='row' style='margin-left:0px; margin-right:0px'><div class='col-md-4'><img src='"+baseUrl+"/images/resources/p_icon_criminal_sm.png'/><label class='labelCrimiVicti'>"+dataO.num_delincuentes+"</label></div>";
	footer+="<div class='col-md-4'><img src='"+baseUrl+"/images/resources/p_icon_victima_sm.png'/><label class='labelCrimiVicti'>"+dataO.num_victimas+"</label></div>";
	
	if(!dataO.isHisDelito){
		footer+="<div class='col-md-4'><img src='"+baseUrl+"/images/resources/p_icon_like_hand_sm.png' onClick='notGivePoint();' class='dgom-js-punto-delito' /><label class='labelCrimiVicti'>"+dataO.num_likes+"</label></div>";
	}else if(dataO.isHisDelito==-1){
		footer+="<div class='col-md-4'><img src='"+baseUrl+"/images/resources/p_icon_like_hand_sm.png' onClick='givedPoint();' class='dgom-js-punto-delito' /><label class='labelCrimiVicti'>"+dataO.num_likes+"</label></div>";
	}else{
		footer+="<div class='col-md-4'><img src='"+baseUrl+"/images/resources/p_icon_like_hand_sm.png' onClick='givePoint($(this));' class='dgom-js-punto-delito' data-delito='"+dataO.id_num_delito+"' data-evento='"+dataO.id_evento+"'/><label class='labelCrimiVicti'>"+dataO.num_likes+"</label></div>";
	}
	
	
	return footer;
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
	var urlImage = baseUrl+"images/maps/markers/" + image.nameImage;
	var size = new google.maps.Size(image.width, image.height);
	var puntoIni = new google.maps.Point(0, 0);
	var puntoFin = new google.maps.Point(21, 52);
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

		
		if (allmarkers[i].typeDelito == tipoDelito) {
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
//	if (numberZoom >= 8 && numberZoom <= 10) {
//		if (typeof (municipios) == "undefined") {
//			municipios = loadLocationsAjax(urlMunicipios);
//			setupMarkers(municipios);
//		}
//	} else
		if (numberZoom >= 11 && numberZoom <= 19) {
		if (typeof (delitos) == "undefined") {
//			delitos = loadLocationsAjax(urlDelitos);
//			setupMarkers(delitos);
			cargaDelitosFiltroSeleccionados();
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

function clearMarkersTipoDelito(idTipoDelito) {
	listaDelitosManager[idTipoDelito].clearMarkers();
}
/**
 * Oculta todos los marcadores
 */
function hideMarkers(){
	for(var i=1; i<=10; i++ ){
		listaDelitosManager[i].hide();
		
	}
	isMarkerHiden = true;
}

function showMarkers(){
	for(var i=1; i<=10; i++ ){
		listaDelitosManager[i].show();
	}
	isMarkerHiden = false;
}

function cargaDelitosFiltroSeleccionados(){

	$(".dgom-js-filter-delitos-check").each(function(){
		var idTipoDelito = $(this).data("value");
		
		var isChecked = $(this).prop("checked");
		console.log("El tipo de delito: "+idTipoDelito+" esta "+isChecked);
		manageMarkersByDelito(idTipoDelito, isChecked)
		
	});
	
}

function cargaSubDelitosFiltroSeleccionados(){
	
	$(".dgom-js-filter-delitos-check").each(function(){
		var idTipoDelito = $(this).data("value");
		
		var isChecked = $(this).prop("checked");
		manageMarkersByDelito(idTipoDelito, isChecked)
		
	});
	
}

function manageMarkersByDelito(idTipoDelito, isChecked){
	if(isChecked){
		 cargarDelitoPorTipo(idTipoDelito);
		//setupMarkersDelitos(delitos, idTipoDelito);
		 setOnSpinner();
		
	}else{
		if(listaDelitosManager[idTipoDelito].getMarkerCount(map.getZoom())>0){
			clearMarkersTipoDelito(idTipoDelito);
		}
		
	}
	
}

function manageMarkersByDelitoCallBack(delitosLoad, idTipoDelito){
	delitos = delitosLoad;
	setupMarkersDelitos(delitosLoad, idTipoDelito);
	setOffSpinner();
}

var contadoSpinnerOn = 0;
function setOnSpinner(){
	contadoSpinnerOn++;
	$("#dgom-js-loading-spinner").show();
	
}

function setOffSpinner(){
	contadoSpinnerOn--;
	if(contadoSpinnerOn==0){
		$("#dgom-js-loading-spinner").hide();
	}
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

/**
 * Cancela el reporte de un crimen
 */
function cancelAddDelito(){
	removeMarkerNewDelito();
	showMarkers();
}

/**
 * Agrega el nuevo marcador creado
 */
function addNewMarkerCreated(locations){
	/**
	 * @todo creo aqui esta el problema de que a veces no cargue
	 */
	var idTipoDelito = $(".dgom-js-selectTipoDelito").val();
	setupMarkersDelitosRefresh(locations, idTipoDelito );
}


/**
 * Subtipos
 * @param idTipoDelito
 * @param idSubTipo
 */
function clearMarkersTipoDelitoSubDelito(idTipoDelito, idSubTipo) {
	if(delitosSubDelitos[idTipoDelito.toString()+idSubTipo.toString()]){
		delitosSubDelitos[idTipoDelito.toString()+idSubTipo.toString()].clearMarkers();
		delete delitosSubDelitos[idTipoDelito.toString()+idSubTipo.toString()];
		
	}
	
}

function loadTipoSubtipo(idTipoDelito, subTipoDelito, isChecked){
	
	if(isChecked){
	
		delitosSubDelitos[idTipoDelito.toString()+subTipoDelito.toString()] = new MarkerManager(map);
		
		cargarDelitoPorSubTipo(idTipoDelito, subTipoDelito);
		
		 setOnSpinner();
		
	}else{
		
		if(delitosSubDelitos[idTipoDelito.toString()+subTipoDelito.toString()].getMarkerCount(map.getZoom())){
			clearMarkersTipoDelitoSubDelito(idTipoDelito, subTipoDelito);
		}
	}
	
}


function loadLocationsSubAjaxGET(url, idTipo, subTipo) {
	$.ajax({
		'url' : url,
		'data' : {estado:estadoSelect},
		'type' : 'POST',
		'dataType' : "json",
		'success' : function(data) {
			manageMarkersByDelitoCallBackSubTipo(data, idTipo, subTipo);
			
			if(typeof(data.ubicaciones)=="undefined"){
				//toastrInfo("No hay datos para este tipo de delito", "toast-bottom-center");
			}
		}
	});

}

/**
 * 
 */
function cargarDelitoPorSubTipo(idTipo, subTipo){
	
	var url = baseUrl+"mapsServices/getDelitosBySubTipoDelitoAndTime/idTipoDelito/"+idTipo+"/idSubTipo/"+subTipo+"/time/"+selectedTimeFilter;
	loadLocationsSubAjaxGET(url, idTipo, subTipo);
	
	//return loadLocationsAjaxGET(url);
	
}

function addNewMarkerSubCreated(locations){
	/**
	 * @todo creo aqui esta el problema de que a veces no cargue
	 */
	var idTipoDelito = $(".dgom-js-selectTipoDelito").val();
	setupMarkersSubDelitosRefresh(locations, idTipoDelito );
}

function setupMarkersSubDelitosRefresh(locations, idTipoDelito) {

	for ( var key in locations.ubicaciones) {
		console.log("El tipo de delito es "+locations.ubicaciones[key].id_tipo_delito);
		var markerConfig = new Marker();
		markerConfig.icon = locations.ubicaciones[key].id_tipo_delito;
		markerConfig.title = locations.ubicaciones[key].txt_nombre;
		markerConfig.typeDelito = locations.ubicaciones[key].id_tipo_delito;
		markerConfig.subTipo = locations.ubicaciones[key].id_sub_tipo_delito;
		markerConfig.latitud = locations.ubicaciones[key].num_latitud;
		markerConfig.longitud = locations.ubicaciones[key].num_longitud;
		markerConfig.idNumDelito = locations.ubicaciones[key].id_num_delito;
		markerConfig.idEvento = locations.ubicaciones[key].id_evento;
		markerConfig.label = locations.ubicaciones[key].num_delitos;
		markerConfig.estado = locations.ubicaciones[key].id_estado;

		var marker = createMarker(markerConfig);
		
			delitosSubDelitos[locations.ubicaciones[key].id_tipo_delito.toString()+locations.ubicaciones[key].id_sub_tipo_delito.toString()].addMarker(marker, locations.zoom[0], locations.zoom[1]);
			delitosSubDelitos[locations.ubicaciones[key].id_tipo_delito.toString()+locations.ubicaciones[key].id_sub_tipo_delito.toString()].refresh();
			delitosSubDelitos[locations.ubicaciones[key].id_tipo_delito.toString()+locations.ubicaciones[key].id_sub_tipo_delito.toString()].hide();
			
		
		
		//allmarkers.push(marker);
	}
	
}

function manageMarkersByDelitoCallBackSubTipo(delitosLoad, idTipoDelito, subTipo){
	setupMarkersDelitosSubDelitos(delitosLoad, idTipoDelito, subTipo);
	setOffSpinner();
}

function setupMarkersDelitosSubDelitos(locations, idTipoDelito, idSubTipo) {

	var markers = [];
	if(locations.ubicaciones){
		for ( var key in locations.ubicaciones) {
			
			var markerConfig = new Marker();
			markerConfig.icon = locations.ubicaciones[key].id_tipo_delito;
			markerConfig.title = locations.ubicaciones[key].txt_nombre;
			markerConfig.typeDelito = locations.ubicaciones[key].id_tipo_delito;
			markerConfig.latitud = locations.ubicaciones[key].num_latitud;
			markerConfig.longitud = locations.ubicaciones[key].num_longitud;
			markerConfig.idNumDelito = locations.ubicaciones[key].id_num_delito;
			markerConfig.idEvento = locations.ubicaciones[key].id_evento;
			markerConfig.label = locations.ubicaciones[key].num_delitos;
			markerConfig.estado = locations.ubicaciones[key].id_estado;
	
			var marker = createMarker(markerConfig);
						
			markers.push(marker);
			//allmarkers.push(marker);
		}
		
		delitosSubDelitos[idTipoDelito.toString()+idSubTipo.toString()].addMarkers(markers, locations.zoom[0], locations.zoom[1]);
		delitosSubDelitos[idTipoDelito.toString()+idSubTipo.toString()].refresh();
		
		if(isMarkerHiden){
			delitosSubDelitos[locations.ubicaciones[key].id_tipo_delito.toString()+locations.ubicaciones[key].id_sub_tipo_delito.toString()].hide();
		}
	}
	
}

function hideMarkersSub(){
	$(".dgom-js-filter-sub-delitos-check").each(function(){
		var idTipo = $(this).data("delito");
		var isSubTipo = $(this).data("value");
		if(delitosSubDelitos[idTipo.toString()+isSubTipo.toString()]){
			delitosSubDelitos[idTipo.toString()+isSubTipo.toString()].hide();
		}	

	});
	
	
	isMarkerHiden = true;
}

function showMarkersSub(){
	$(".dgom-js-filter-sub-delitos-check").each(function(){
		var idTipo = $(this).data("delito");
		var isSubTipo = $(this).data("value");
		if(delitosSubDelitos[idTipo.toString()+isSubTipo.toString()]){
			delitosSubDelitos[idTipo.toString()+isSubTipo.toString()].show();
		}	

	});
	isMarkerHiden = false;
}

/**
 * Cancela el reporte de un crimen
 */
function cancelAddDelitoSub(){
	removeMarkerNewDelito();
	showMarkersSub();
}


function notGivePoint(){
	
	toastrWarning("No puedes dar me gusta a eventos reportados por ti.", "toast-top-center");
	
}

function givedPoint(){
	toastrWarning("Ya haz dado like a este evento.", "toast-top-center");
}


function givePoint(element){
	
	var idDelito = element.data("delito");
	var idEvento = element.data("evento");
	var contador = element.next(".labelCrimiVicti").text();	
	$.ajax({
		url:baseUrl+'/mapsServices/givePoint/idNumDelito/'+idDelito+'/idEvento/'+idEvento,
		type:"GET",
		success:function(response){
			
			if(response=="isHisDelito"){
				toastrWarning("No puedes dar me gusta a eventos reportados por ti.", "toast-top-center");
			}else if(response=="usuarioLike"){
				toastrWarning("Ya haz dado like a este evento.", "toast-top-center");
			}else if(response=="error"){
				toastrError("Ya Ocurrido un error.", "toast-top-center");
			}else if(response=="success"){
				toastrSuccess("Gracias.", "toast-top-center");
				element.next(".labelCrimiVicti").text(parseInt(contador)+1);
			}
			
		},
		error: function(){
			alert("ocurrio un error");
		}
			
		
	});
	
}

/**
 * Fin de subtipos
 */
function getLoadSubTipos(){
	
	$(".dgom-js-filter-sub-delitos-check").each(function(){
		var idTipo = $(this).data("delito");
		var isSubTipo = $(this).data("value");
		var isCheck = $(this).prop("checked");
		
		loadTipoSubtipo(idTipo,isSubTipo, isCheck);
	});
	
}

$(document).ready(function(){
	
	$(".dgom-js-filter-time").on("click", function(){
		selectedTimeFilter = $(this).data("value");
		
		if(usuarioFree){
			for(var i =1; i<=10; i++){
				
				clearMarkersTipoDelito(i);
			}
			
			cargaDelitosFiltroSeleccionados();
		}else{
			
			
			
		}
	});
	
});

function verificarTodosIni(){
	
	var delitosChecks = $(".dgom-js-filter-delitos-check:checked").size();
	if(delitosChecks==0){
		$("#dgom-js-check-all").trigger("click");
	}
}

/**
 * Elimina la accion por defecto del elemento
 */
//document.getElementById("dgom-js-agregar-delito").addEventListener("click", function(event){
//    event.preventDefault()
//});

/**
 * Inicializa y carga en pantalla el mapa
 */
google.maps.event.addDomListener(window, 'load', loadMap);

