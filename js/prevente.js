// variables
  var btnStatus = false;
  var menuStatus = false;
  var btnDelito = false;
  
  

$(document).ready(function(){
	 $(".page-block").show();
  /*
  ############
  Inicializando Select2 de Estadisticas
  */
  $("#exampleEntidad").select2({
    placeholder: "Seleccione Entidad"
  });

  $("#exampleDelito").select2({
    placeholder: "Seleccione Delito"
  });

  $("#exampleAnio").select2({
    placeholder: "Seleccione Año"
  });

  /**/
  $(".dgom-js-login").on("click", function(){
    removeMenuOpen();
  });
  
  // Remover Menu Open
  function removeMenuOpen(){
    $(".page-block").hide();
    $(".menu").removeClass("menu--anim");
    $(".menu").removeClass("menu--open");

    menuStatus = false;
  }
  
  // Remover Statistics
  function removeStatistics(){

    $(".page-block").hide();
    $(".js-statistics-handle").text("Estadísticas");
    $(".statistics").removeClass("statistics--anim");
    $(".statistics").removeClass("statistics--open");

    btnStatus = false;
  }

  // Usuario normal - Click y oculta panel filtro de delitos cuando quiera ver subdelito y muestre modal de iniciar sesion
  $(".dgom-js-tipo-delito-modal").on("click",function(){
    removeMenuOpen();
  });

  // Menu lateral izquierda
  $(".menu__handle").on("click",function(){
      
    // mostar y ocultar barra lateral de filtros y fondo negro
    if (menuStatus == true) {
      removeMenuOpen();
    } else {
      $(".page-block").show();
      $(".menu").addClass("menu--anim");
      $(".menu").addClass("menu--open");

      menuStatus = true;
    }

  });
  
  // Estadísticas bottom
  $(".js-statistics-handle").on("click",function(){

    // cambiar texto de estadisticas y fondo negro
    if (btnStatus == true) {
      removeStatistics();
    } else {
      $(".page-block").show();
      $(this).text("Cerrar");
      $(".statistics").addClass("statistics--anim");
      $(".statistics").addClass("statistics--open");

      btnStatus = true;
    }

  });
  
  // Search options
  $(".options__handle").on("click",function(){
    $(this).parent().toggleClass("dgom-ui-search-options--open");      
  });

  // CheckBox - Motrar y Ocultar sub - menu
  $(".dgom-js-tipo-delito").on("click",function() {
    elems = $(this).data("f");
    element = document.getElementById("delito-" + elems);
    check = document.getElementById("tipoDelito_" + elems);

    if($(this).parent().hasClass("dgom-js-activo")){
      $(this).removeClass("dgom-ui-tipo-delito-rotate");
      $(this).parent().removeClass("dgom-js-activo");
      $(this).parent().removeClass("dgom-ui-col-left-filter-contend-group-int-active");
      // $(element).hide(300);
      // $(element).toggle("fast");
      $(element).slideUp("swing");

    } else{
      $(this).addClass("dgom-ui-tipo-delito-rotate");
      $(this).parent().addClass("dgom-js-activo");
      $(this).parent().addClass("dgom-ui-col-left-filter-contend-group-int-active");
      // $(element).show(300);
      $(element).slideDown("slow");
    }

  });

  
  // Panel Right - option 1
  // Btn para mostar con giro Form
  $("body").on("click", ".dgom-js-go-to-btn-form",function() {
	  $(this).parents(".dgom-ui-flip-panel2").addClass("dgom-ui-flipped");
    //$(".dgom-ui-flip-panel2").addClass("dgom-ui-flipped");
    // $(".dgom-ui-puntos-form").show();
    // $(".dgom-ui-puntos-grafica").hide();
  });
 
  // Btn para mostar con giro Description
  $("body").on("click",".dgom-js-go-to-btn-grafica",function() {
	 $(this).parents(".dgom-ui-flip-panel2").removeClass("dgom-ui-flipped");
    // $(".dgom-ui-puntos-form").hide();
    // $(".dgom-ui-puntos-grafica").show();
  });

  // Panel Right - option 2
  // Btn para mostar con giro Form
  $(".dgom-js-go-to-btn-feedback1").on("click",function() {
    $(".dgom-ui-flip-panel1").addClass("dgom-ui-flipped");
  });

  // Btn para mostar con giro Description
  $(".dgom-js-go-to-btn-description1").on("click",function() {
    $(".dgom-ui-flip-panel1").removeClass("dgom-ui-flipped");
  });


  // Panel Right - option 3
  // Btn para mostar con giro Form
  $(".dgom-js-go-to-btn-feedback3").on("click",function() {
    $(".dgom-ui-flip-panel3").addClass("dgom-ui-flipped");
  });

  // Btn para mostar con giro Description
  $(".dgom-js-go-to-btn-description3").on("click",function() {
    $(".dgom-ui-flip-panel3").removeClass("dgom-ui-flipped");
  });
    

  // Page negra
  $(".page-block").on("click", function(){
        removeMenuOpen();
        removeStatistics();
  });

  // Reportar delito por btn Reportar Crimen
  $("#dgom-js-agregar-delito").on("click", function(){
    reportarDelito();
  });
  
  // Reportar delito por btn cancelar
  $("#dgom-js-agregar-delito-int").on("click",function(){
	  
	 reportarDelito();
   
    resetForm();
    
    delitoGuardado = false;
  });

});

function setDateActual(){
	var date = new Date ;
	var year = date.getFullYear() ;
	var month = getMes(date.getMonth() + 1);
	var day = ("0" + date.getDate()).slice(-2);
	
	var hora =  ("0" + (date.getHours())).slice(-2);
	var minutos =  ("0" + date.getMinutes()).slice(-2);
	
	var actualDate = ""+day+"-"+month+"-"+year+" "+hora+":"+minutos;
	
	$(".dgom-js-date-delito").val(actualDate);
}

function resetForm(){
	
	$("#delito-form").trigger("reset");
	$(".dgom-js-selectTipoDelito").select2("val", "");
	$("#delito-form").data("formValidation").resetForm();
	setDateActual();
	
}

//Reportar delito
function reportarDelito(){
	firstStep = true;
	updateStep = false;
	
	$(".row.row-margin-top").remove();

  if (btnDelito == true) {
	  	 
    removeDelito();
  } else {
	 
	 $("#exampleWizardFormContainer").wizard("first"); 
    $("#dgom-js-agregar-delito").hide();
    $(".dgom-ui-panel-right").addClass("dgom-ui-panel-right--open");
    
    	setMarkerAddDelito();
    	
    btnDelito = true;
  }

}


// Remover reportar delito
function removeDelito(){
  $("#dgom-js-agregar-delito").show();
  $(".dgom-ui-panel-right").removeClass("dgom-ui-panel-right--open");
  if(usuarioFree){
	  cancelAddDelito();
  }else{
	  cancelAddDelitoSub();
  }
  btnDelito = false;
}


// Botones de opciones de search, agregando clase active
$(".dgom-js-search-options-col-int").on("click",function() {
  var btnActive = $(this).data("active");
  // alert("algo-" + btnActive);
  if($(".dgom-ui-search-btn" + btnActive).hasClass("dgom-ui-search-options-col-active")){
    $(".dgom-ui-search-options-col-int").removeClass("dgom-ui-search-options-col-active");
  } else{
    $(".dgom-ui-search-options-col-int").removeClass("dgom-ui-search-options-col-active");
    $(".dgom-ui-search-btn-" + btnActive).addClass("dgom-ui-search-options-col-active");
  }
});


// Filtros - Flip panel
// Btn para mostar entidades
$(".dgom-js-go-to-btn-entidades").on("click",function() {
  $(".dgom-ui-flip-panel-filtros").addClass("dgom-ui-flipped");
});
// Btn para mostar filtros
$(".dgom-js-go-to-btn-filtros").on("click",function() {
  $(".dgom-ui-flip-panel-filtros").removeClass("dgom-ui-flipped");
});


// Filtros - Check Box, seleccionar todo
$("#dgom-js-check-all").on("click",function() {

console.log("Alguien lo activa");

	var isChecked = $(this).prop("checked");
	docCookies.setItem("todosTipos", isChecked);
	
	$(".dgom-js-filter-delitos-check").removeClass("labelauty-middle");
	if(isChecked){
		$(".dgom-js-filter-delitos-check").each(function(){
			var idTipoDelito = $(this).data("value");
			var isCheck = $(this).prop('checked');
			 $(this).prop('checked', true);
			 
			 
				 checkSubTipos(idTipoDelito, true);
			 
			 
			// Verifica checked de filtros de los delitos
			 if(!isCheck){
        // dgom - quitar clase cuando checked abuelo
        
				 
			 }
			docCookies.setItem("tipoDelito"+idTipoDelito, true);
		});
	}else{
		$(".dgom-js-filter-delitos-check").each(function(){
			var idTipoDelito = $(this).data("value");
			 $(this).prop('checked', false);
			 checkSubTipos(idTipoDelito, false);
			 // dgom - quitar clase cuando checked abuelo
       
				 
			docCookies.setItem("tipoDelito"+idTipoDelito, false);
		});
	}
	
	

});

// Estadisticas - Generador de item
$(".dgom-js-panelFlip-generador").on("click",function() {

  $(".dgom-ui-grid-stack-item-new-content-col").slideUp( "slow", function(){

    $(".dgom-ui-panelFlip-generador").show("slow", function(){
      $(".dgom-ui-grid-new").show();
    });
    
  });

});

// Estadisticas - Generador de grafica y cancelar
$(".dgom-js-new-statics").on("click",function() {
	slideForm();
});

function slideForm(){
	  $(".dgom-js-panelFlip-generador").hide( "slow", function(){
		    $(".dgom-ui-grid-stack-item-new-content-col").slideDown("slow", function(){
		      $(".dgom-ui-grid-new").hide();
		    });
		  });
}


toastr.options.closeButton = true;
toastr.options.closeMethod = 'fadeOut';
toastr.options.closeDuration = 900;
toastr.options.closeEasing = 'swing';
function toastrError(text, position){
	toastr.options.positionClass= position;
	toastr.error(text);
	
}

function toastrInfo(text, position){
	toastr.options.positionClass= position;
	toastr.info(text);
}

function toastrSuccess(text, position){
	toastr.options.positionClass= position;
	toastr.success(text);
}

function toastrWarning(text, position){
	toastr.options.positionClass= position;
	toastr.warning(text);
}

function getMes(mes){
	
	switch (mes) {
    	case 1:
        	return "Ene";
        break;
    	case 2:
        	return "Feb";
        break;
    	case 3:
        	return "Mar";
        break;
   		 case 4:
        	return "Abr";
        break;
    	case 5:
        	return "May";
        break;
    	case 6:
        	return "Jun";
        break;
    	case 7:
        	return "Jul";
        break;
		case 8:
        	return "Ago";
        break;
    	case 9:
        	return "Sep";
        break;
    	case 10:
        	return "Oct";
        break;
   		 case 11:
        	return "Nov";
        break;
    	case 12:
			return "Dic";
		break;
	}
	
}