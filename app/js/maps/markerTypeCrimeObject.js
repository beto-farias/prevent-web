/**
 * @file markerTypeCrimeObject.js
 * @brief Objeto con la configuración del mapa 
 * @copyright 2 Geeks one Monkey
 * @version 1.0
 */

function MarkersObject(map) {
		this.idTipo = 0;
		this.nombre = "";
		this.ico_1 = "";
		this.descripcion = "";
		this.numDelitos = 0;
		
		this.locations_1 = [];
		this.markers_1 	= [];

		this.locations_2 = [];
		this.markers_2 = [];
		
		this.locations_3 = [];
		this.markers_3 = [];

		this.actualMarkers = this.markers_1;

		this.visible = false;
		this.map = map;

		/**
		 * Function para remover los marcadores relacionados al objeto
		 */
		this.clearMarkers = function() {
			for (i = 0; i < this.actualMarkers.length; i++) {
				this.actualMarkers[i].setMap(null);
			}
			console.log("clear markers"+this.actualMarker);
		};

		/**
		 * Agregar marcadores al mapa
		 */
		this.addMarkers = function() {
			for (i = 0; i < this.actualMarkers.length; i++) {
				this.actualMarkers[i].setMap(this.map);
			}
			console.log(" addMarkers"+this.actualMarker);
		};
		
		this.zoomIn = function(){
			console.log("zoomIn");
			this.clearMarkers();
			this.actualMarkers = this.markers_2;
			this.addMarkers();
			
		}
}

function Marker(){
	this.place;
	this.icon;
	this.title;
	this.typeDelito;
	this.latitud;
	this.longitud;
	this.idNumDelito;
	this.idEvento;
	this.lable;
	this.estado;
}
