
$ ( "#list" ).hide();

$( "#btn-list" ).click(function() {
  $ ( "#list" ).show();
  $ ( "#map" ).hide();
  $ ( "#btn-list" ).removeClass( "active" );  
  $ ( "#btn-list" ).addClass( "btn-list-active" );
  $ ( "#btn-list" ).addClass( "btn-list-active" );  

});


$( "#btn-map" ).click(function() {
  $ ( "#map" ).show();
  $ ( "#list" ).hide();
  $ ( "#btn-map" ).addClass( "btn-map-active" );
  $ ( "#btn-list" ).removeClass( "btn-list-active" );    
});





