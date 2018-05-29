$(document).ready(function() {

	$(".dgom-ui-check-delito").on("change", function() {
		clearMarkers();
		allmarkers = [];
		
		estados = loadLocationsAjax(urlEstados);
		municipios = loadLocationsAjax(urlMunicipios);
		delitos = loadLocationsAjax(urlDelitos);

		clearMarkers();
		
		setupMarkers(estados);
		setupMarkers(municipios);
		setupMarkers(delitos);
		
	});
	

});