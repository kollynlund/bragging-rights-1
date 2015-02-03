
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

// FIRST IMAGE UPLOAD
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




$( "#add-location-map-btn" ).click(function() { 
  $ ( "#map-modal" ).show();
  $ ( "#list-location-modal" ).hide();
 });

$( "#add-location-list-btn" ).click(function() { 
  $ ( "#list-location-modal" ).show();
  $ ( "#map-modal" ).hide();
 });


// RESIZING MAP WITH WINDOW
(function(){
  var attachEvent = document.attachEvent;
  var isIE = navigator.userAgent.match(/Trident/);
  console.log(isIE);
  var requestFrame = (function(){
    var raf = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame ||
        function(fn){ return window.setTimeout(fn, 20); };
    return function(fn){ return raf(fn); };
  })();
  
  var cancelFrame = (function(){
    var cancel = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame ||
           window.clearTimeout;
    return function(id){ return cancel(id); };
  })();
  
  function resizeListener(e){
    var win = e.target || e.srcElement;
    if (win.__resizeRAF__) cancelFrame(win.__resizeRAF__);
    win.__resizeRAF__ = requestFrame(function(){
      var trigger = win.__resizeTrigger__;
      trigger.__resizeListeners__.forEach(function(fn){
        fn.call(trigger, e);
      });
    });
  }
  
  function objectLoad(e){
    this.contentDocument.defaultView.__resizeTrigger__ = this.__resizeElement__;
    this.contentDocument.defaultView.addEventListener('resize', resizeListener);
  }
  
  window.addResizeListener = function(element, fn){
    if (!element.__resizeListeners__) {
      element.__resizeListeners__ = [];
      if (attachEvent) {
        element.__resizeTrigger__ = element;
        element.attachEvent('onresize', resizeListener);
      }
      else {
        if (getComputedStyle(element).position == 'static') element.style.position = 'relative';
        var obj = element.__resizeTrigger__ = document.createElement('object'); 
        obj.setAttribute('style', 'display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; pointer-events: none; z-index: -1;');
        obj.__resizeElement__ = element;
        obj.onload = objectLoad;
        obj.type = 'text/html';
        if (isIE) element.appendChild(obj);
        obj.data = 'about:blank';
        if (!isIE) element.appendChild(obj);
      }
    }
    element.__resizeListeners__.push(fn);
  };
  
  window.removeResizeListener = function(element, fn){
    element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1);
    if (!element.__resizeListeners__.length) {
      if (attachEvent) element.detachEvent('onresize', resizeListener);
      else {
        element.__resizeTrigger__.contentDocument.defaultView.removeEventListener('resize', resizeListener);
        element.__resizeTrigger__ = !element.removeChild(element.__resizeTrigger__);
      }
    }
  }
})();

addResizeListener(document.getElementById("map-container"), resizeMap);




