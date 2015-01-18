// The initial map width/height layouts
var width = document.getElementById('map-container').offsetWidth-20;
var height = width / 2;

// The initial map projection definition
var projection = d3.geo.mercator()
                 .translate([width/2, height/2])
                 .scale(1000);

// The initial map path placeholder
var path = d3.geo.path()
           .projection(projection);

// Selecting the DOM element for the info display
var info_display = d3.select(".map-data-display");

// Setting up the initial map container svg selection
var svg = d3.select("#map-container")
          .append("svg")
          .attr("width", width)
          .attr("height", height)
          .attr("id","main-map-container")
          .call(d3.behavior.zoom()
          .scaleExtent([1,200])
          .on("zoom", redraw))
          .append("g")
          ;

// Initial map drawing function (before any zooming or panning)
function ready(error, world, names, brdata) {
  var countries = topojson.object(world, world.objects.countries).geometries;
  var n = countries.length;

  countries.forEach( function(d) { 
    d.name = names.filter(function(n) { return d.id == n.id; })[0].name; 
  });

  var country = svg.selectAll(".country").data(countries);

  country
  .enter()
  .insert("path")
  .attr("class", "country")    
  .attr("title", function(d) { return d.name; })
  .attr("d", path)
  .style("fill", "#C1BFBF")
  .style("stroke", "#333")
  ;

  //Show/hide country/event info display
  country
  .on("mousemove", function(d) {
    var mouse = d3.mouse(svg.node()).map( function(d) { return parseInt(d); } );

    info_display
    .html('<div class="col-sm-12 map-data-item country-name">'+d.name+'</div>')
    ;
  })
    
  .on("mouseout",  function() {
    info_display
    .html('<div class="col-sm-12 map-data-item country-name">&nbsp;</div>')
    ;
  })
  /*
  .on("click", clickIn)
  */
  ;
      
  drawEvents(error, brdata);
};


// Function for processing zoom and pan interactions
function redraw() {
  var t = d3.event.translate;
  var s = d3.event.scale; 
  var h = height / 3;
  
  t[0] = Math.min(0, Math.max(width * (1 - s), t[0]));
  t[1] = Math.min(height / 2 * (s - 1) + h * s, Math.max(height / 2 * (1 - s) - h * s, t[1]));

  svg.attr("transform", "translate(" + t + ")scale(" + s + ")").style("stroke-width", 1 / s);
  var events = svg.selectAll(".brevent");
  events
  .attr("r", width/100*(1 / s))
  ;
};


// Function for drawing all event marker circles
function drawEvents(error, brdata) {
  var events = svg.selectAll(".brevents").data(brdata.Events);
  var map_width = document.getElementById("main-map-container").offsetWidth;

  events
  .enter()
  .insert("circle")
  .attr("class", "brevent")    
  .attr("title", function(d,i) { return d.Name; })
  .attr("cx", function(d,i) { return projection([d.Longitude,d.Latitude])[0];})
  .attr("cy", function(d,i) { return projection([d.Longitude,d.Latitude])[1];})
  .attr("r", map_width/100)
  .style("fill", "#ffcb27")
  .style("stroke", "#333")
  ;


  events
  .on("mousemove", function(d,i) {
    var mouse = d3.mouse(svg.node()).map( function(d) { return parseInt(d); } );

    info_display
    .attr("style", "left:"+(mouse[0])+"px;top:"+(mouse[1])+"px")
    .html('<div class="col-sm-4 map-data-item event-name">Name: '+d.Name+'</div><div class="col-sm-4 map-data-item event-date">Date: '+d.Date+'</div><div class="col-sm-4 map-data-item event-discipline">Discipline: '+d.Discipline+'</div>')
    ;
  })
  .on("mouseout",  function(d,i) {
    info_display
    .html('<div class="col-sm-12 map-data-item country-name">&nbsp;</div>')
    ;
  })
  ;
};

// Function to process country click drilling
function clickIn(d) {
  /*
  console.log('clickedIN: '+d.name);
  */

  // Grabs the appropriate map .json file
  var file = "data/"+d.name.replace(" ","_").toLowerCase()+'.json';

  function ready(error, topology) {

    d3.select("svg").remove();

    var projection = d3.geo.albers();

    var path = d3.geo.path().projection(projection);

    var svg = d3.select("#map").append("svg");

    var g = svg.append("g")
            .attr("id", "innerMap");

      g.selectAll("path")
      .data(topojson.feature(topology, topology.features.subunits).features)
      .enter().append("path")
      .attr("d", path)
      .attr("class", "states")
      ;
  }

  queue()
  .defer(d3.json, file)
  .await(ready)
  ;

};

// Listener for the initial data load and map drawing
queue()
.defer(d3.json, "data/world-110m.json")
.defer(d3.tsv, "data/world-country-names.tsv")
.defer(d3.json, "data/brdata.json")
.await(ready)
;


