
$ ( "#list" ).hide();

$( "#btn-list" ).click(function() {
  $ ( "#list" ).show();
  $ ( "#map" ).hide();  
});


$( "#btn-map" ).click(function() {
  $ ( "#map" ).show();
  $ ( "#list" ).hide();
});


$( "#btn-map" ).click(function() {
  $( this ).toggleClass( "btn-toggle-active" );
  $( "#btn-list" ).removeClass( "btn-toggle-active" )
});

$( "#btn-list" ).click(function() {
  $( this ).toggleClass( "btn-toggle-active" );
  $( "#btn-map" ).removeClass( "btn-toggle-active" )
});

