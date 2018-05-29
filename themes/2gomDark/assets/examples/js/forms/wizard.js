var firstStep = true;
  var updateStep = false;
/*!
 * remark v1.0.6 (http://getbootstrapadmin.com/remark)
 * Copyright 2015 amazingsurge
 * Licensed under the Themeforest Standard Licenses
 */
(function(document, window, $) {
  'use strict';

  var Site = window.Site;
  var isClose = false;
  
  $(document).ready(function($) {
    Site.run();
  });


  // Example Wizard Form Container
  // -----------------------------
  // http://formvalidation.io/api/#is-valid-container

  $("#delito-select").select2({
    placeholder: "Seleccione delito"
  });
  $("#subdelito-select").select2({
    placeholder: "Seleccione sub-delito"
  });

  (function() {
	  
	  // $("#select2").select2({placeholder:'Seleccionar tipo', allowClear:true });
	  
    var select2SubDelito = document.getElementById('subdelito-select');
    var fechaDelito = document.getElementsByName('WrkEventos[fch_evento]');

    var defaults = $.components.getDefaults("wizard");
    var options = $.extend(true, {}, defaults, {
      onInit: function() {
    	  $(".panel-footer-bottom").css("display", "none");
    	  
        $('#delito-form')
        .formValidation({
          framework: 'bootstrap',
          locale: 'es_ES',
          fields: {
            WrkEventos_txt_descripcion: {
              validators: {
                notEmpty: {
                  message: 'Descripción es obligatorio'
                }
              }
            },
            select2SubDelito: {
              validators: {
                notEmpty: {
                  message: 'El delito is required'
                }
              }
            },
            fechaDelito: {
              validators: {
                notEmpty: {
                  message: 'El sub delito is not valid'
                }
              }
            },/*
            cvv: {
              validators: {
                notEmpty: {
                  message: 'The CVV number is required'
                }
              }
            } */
          }
        });
      },
      validator: function() {
        var fv = $('#delito-form').data('formValidation');

        var $this = $(this);
        
        // Validate the container
        fv.validateContainer($this);

        var isValidStep = fv.isValidContainer($this);
        if (isValidStep === false || isValidStep === null) {
          return false;
        }

        
        if(firstStep){
        	guardarDelitoFunction();
        }
        
        if(updateStep){
        	updateDelito();
        }
        
        return true;
      },
      
      onFinish: function() {
        // $('#delito-form').submit();
      },
     
      onBeforeChange: function(from, to){
    	  
    	  if(from.index==0 && to.index==1){
    		  firstStep = false;
    		  //guardarDelitoFunction();
    		  //$(".panel-footer-bottom").css("display", "none");
    	  }
    	  
    	  if(from.index==1 && to.index==0){
    		  
    	  }
    	  
    	  if(from.index==2 && to.index==1){
    		  firstStep = false;
    		  
    		  //$(".panel-footer-bottom").css("display", "none");
    	  }
    	  
    	  if(from.index==1 && to.index==2){
    		  firstStep = false;
    		  updateStep = true;
    		  //$(".panel-footer-bottom").css("display", "none");
    	  }
      },
      
      onAfterChange: function(from, to){
    	  
    	  $("#delito-form").data("formValidation").resetForm();
      },
     
      
      // buttonsAppendTo: '.panel-body'
      buttonsAppendTo: '.panel-footer-bottom'
    });

    $("#exampleWizardFormContainer").wizard(options);
    
  })();

 

})(document, window, jQuery);
