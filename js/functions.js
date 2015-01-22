
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