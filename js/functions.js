
// SHOW/HIDE MAP WHEN BUTTON CLICKED

$ ( "#list" ).hide();

$( "#btn-list" ).click(function() {
  $ ( "#list" ).show();
  $ ( "#map" ).hide();  
});


$( "#btn-map" ).click(function() {
  $ ( "#map" ).show();
  $ ( "#list" ).hide();
});


// TOGGLE STYLES FOR MAP/LIST BUTTONS

$( "#btn-map" ).click(function() {
  $( this ).addClass( "btn-toggle-active" );
  $( "#btn-list" ).removeClass( "btn-toggle-active" )
});

$( "#btn-list" ).click(function() {
  $( this ).addClass( "btn-toggle-active" );
  $( "#btn-map" ).removeClass( "btn-toggle-active" )
});

// TOGGLE STYLES FOR MAP TOOLS

$( ".fa-search-minus" ).click(function() {
  $( this ).addClass( "btn-toggle-active" );
  $( ".fa-search-plus" ).removeClass( "btn-toggle-active" )
  $( ".glyphicon-move" ).removeClass( "btn-toggle-active" )
  $( "#map-container:hover" ).css( "cursor", "-webkit-zoom-out" )
});

$( ".fa-search-plus" ).click(function() {
  $( this ).addClass( "btn-toggle-active" );
  $( ".fa-search-minus" ).removeClass( "btn-toggle-active" )
  $( ".glyphicon-move" ).removeClass( "btn-toggle-active" )
  $( "#map-container:hover" ).css( "cursor", "-webkit-zoom-in" )

});

$( ".glyphicon-move" ).click(function() {
  $( this ).addClass( "btn-toggle-active" );
  $( ".fa-search-plus" ).removeClass( "btn-toggle-active" )
  $( ".fa-search-minus" ).removeClass( "btn-toggle-active" )
  $( "#map-container:hover" ).css( "cursor", "move" )

});

// IMAGE UPLOAD

$(document).on('change', '.btn-file :file', function() {
  var input = $(this),
      numFiles = input.get(0).files ? input.get(0).files.length : 1,
      label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
  input.trigger('fileselect', [numFiles, label]);
});

$(document).ready( function() {
    $('.btn-file :file').on('fileselect', function(event, numFiles, label) {
        
        var input = $(this).parents('.input-group').find(':text'),
            log = numFiles > 1 ? numFiles + ' files selected' : label;
        
        if( input.length ) {
            input.val(log);
        } else {
            if( log ) alert(log);
        }
        
    });
});

$(document).ready( function() { 
  if ($("#map").css("display") == "none" ){
    $ ( "#list" ).show();
  }
});

$(document).ready( function() {  
  if ($("#map").css("display") == "block" ){
    $ ( "#list" ).hide();
  }
});

$(window).resize(function(){ 
  if ($("#map").css("display") == "none" ){
    $ ( "#list" ).show();
  }
});  

$(window).resize(function(){ 
  if ($("#map").css("display") == "block" ){
    $ ( "#list" ).hide();
  }
});  








