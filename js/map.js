// The initial map width/height layouts
var width = document.getElementById('map-container').offsetWidth-20;
var height = width / 2;
var current_scale = 1;

// The initial map projection definition
var projection = d3.geo.mercator()
                 .translate([width/2, height/2])
                 .scale(1000);

// The initial map path placeholder
var path = d3.geo.path()
           .projection(projection);

// Selecting the DOM element for the info display
var info_display = d3.select(".map-data-display");


console.log("***",d3.select("#list-events"));

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

console.log("###",d3.select("#map-container")); 

// Setting up the list display selection
var event_table = d3.select("#list-events");



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

  .on("click", clickIn)

  ;
      
  drawEvents(error, brdata);
};


// Function to process country click drilling
function clickIn(d) {
  /*
  console.log('clickedIN: '+d.name);
  */

  // Grabs the appropriate map .json file
  var file = "data/"+d.name.replace(" ","_").toLowerCase()+'.json';

  function ready(error, topology, brdata) {

    d3.select("svg").remove();

    projection = d3.geo.albers()
                 .translate([width/2, height/2])
                 .scale(800);

    path = d3.geo.path().projection(projection);

    svg = d3.select("#map-container")
              .append("svg")
              .attr("width", width)
              .attr("height", height)
              .attr("id","main-map-container")
              .call(d3.behavior.zoom()
              .scaleExtent([1,200])
              .on("zoom", redraw))
              .append("g")
              ;

    svg.selectAll("path")
    .data(topojson.object(topology, topology.objects.subunits).geometries)
    .enter().append("path")
    .attr("d", path)
    .attr("class", "states")
    ;
  }

  queue()
  .defer(d3.json, file)
  .defer(d3.json, "data/brdata.json")
  .await(ready)
  ;

};


// Function for processing zoom and pan interactions
function redraw() {
  var t = d3.event.translate;
  current_scale = d3.event.scale;
  var h = height / 3;
  
  t[0] = Math.min(0, Math.max(width * (1 - current_scale), t[0]));
  t[1] = Math.min(height / 2 * (current_scale - 1) + h * current_scale, Math.max(height / 2 * (1 - current_scale) - h * current_scale, t[1]));

  svg.attr("transform", "translate(" + t + ")scale(" + current_scale + ")").style("stroke-width", 1 / current_scale);
  var events = svg.selectAll(".brevent");
  events
  .attr("r", width/100*(1 / current_scale))
  ;
};


// Function for drawing all event marker circles
function drawEvents(error, brdata, filter) {
  // Removes any previously drawn event markers
  d3.selectAll(".brevent").remove();
  d3.selectAll("tr.event-list-item").remove();

  // Processes any filtering from "Sort Map" dropdown
  var event_data = brdata.Events;
  if (filter) {
    var filtered_data = [];
    for (var i = 0; i < brdata.Events.length; i++) {
      if (brdata.Events[i].Discipline == filter) {
        filtered_data.push(brdata.Events[i]);
      }
    }
    event_data = filtered_data;
  }

  // Grabs the element to append map event markers to
  var map_events = svg.selectAll(".brevents").data(event_data);

  // Grabs the element to append table event markers to
  var table_events = event_table.selectAll(".list-events").data(event_data);

  // Grabs map container width to initially size markers
  var map_width = document.getElementById("main-map-container").offsetWidth;

  // Adds markers with necessary attributes
  map_events
  .enter()
  .insert("circle")
  .attr("class", "brevent")
  .attr("title", function(d,i) { return d.Name; })
  .attr("cx", function(d,i) { return projection([d.Longitude,d.Latitude])[0];})
  .attr("cy", function(d,i) { return projection([d.Longitude,d.Latitude])[1];})
  // Dealing with map scaling on redraw
  .attr("r", map_width/100*(1/current_scale))
  .style("fill", "#ffcb27")
  .style("stroke", "#333")
  // Adding Bootstrap functionality for showing modal
  .attr("type", "button")
  .attr("data-toggle", "modal")
  .attr("data-target", ".display-event-details-modal")
  // Loading event data into modal when event is clicked
  .on("click", showEventData) 
  ;

  // Adds a table row for each event
  var table_event = table_events
                    .enter()
                    .insert("tr")
                    .attr("class", "event-list-item")
                    ;

  // Adds a td for each piece of event data
  table_event.insert("td").attr("data-th", "Rider").html(function(d) {return d.Name;});
  table_event.insert("td").attr("data-th", "Date").html(function(d) {return d.Date;});
  table_event.insert("td").attr("data-th", "Trick").html(function(d) {return d.Trick;});
  table_event.insert("td").attr("data-th", "Discipline").html(function(d) {return d.Discipline;});
  table_event.insert("td").attr("data-th", "Location").html(function(d) {return d.City;});
  ;

  // Changing top of map event display when mouse hovers over event marker
  map_events
  .on("mousemove", function(d,i) {
    var mouse = d3.mouse(svg.node()).map( function(d) { return parseInt(d); } );

    info_display
    .attr("style", "left:"+(mouse[0])+"px;top:"+(mouse[1])+"px")
    .html('<div class="col-sm-4 map-data-item event-name">Name: '+d.Name+'</div><div class="col-sm-4 map-data-item event-date">Date: '+d.Date+'</div><div class="col-sm-4 map-data-item event-discipline">Discipline: '+d.Discipline+'</div>')
    ;
  })
  // Reverting to blank in top of map event display when mouse moves off of event marker
  .on("mouseout",  function(d,i) {
    info_display
    .html('<div class="col-sm-12 map-data-item country-name">&nbsp;</div>')
    ;
  })
  ;

  // Getting a list of unique disciplines
  var disciplines = [];
  for (var i = 0; i < brdata.Events.length; i++) {
    disciplines.push(brdata.Events[i].Discipline);
  }
  disciplines = disciplines.filter(function(elem, pos) {
    return disciplines.indexOf(elem) == pos;
  }).filter(Boolean).sort(); 

  // Appending unique disciplines to the dropdown list
  d3.select("#sort-map-list")
  .selectAll("li")
  .data(disciplines)
  .enter()
  .insert("li")
  .insert("a")
  .attr("href", "#")
  .attr("class", "map-sort-picklist-item")
  .html( function(d) {return d;} )
  .on("click", function(d) {
    // Setting the dropdown list text to the appropriate discipline
    d3.selectAll("#sort-map-dropdown-button")
    .html(d + ' <span class="caret"></span>');

    // Grabbing only the appropriate events
    filterEvents(d);
  })
  ;

  // Adding the divider at the bottom of the dropdown and the "(show all)" option
  if (d3.select("#sort-map-list").select("li.divider").empty()) {
    var the_picklist = d3.select("#sort-map-list");

    the_picklist
    .insert("li")
    .attr("class", "divider")
    ;

    the_picklist
    .insert("li")
    .insert("a")
    .attr("href", "#")
    .attr("class", "map-sort-picklist-all")
    .html("(show all)")
    .on("click", function() {
      // Setting the dropdown list text to the appropriate discipline
      d3.select("#sort-map-dropdown-button")
      .html('Sort Map <span class="caret"></span>');

      // Grabbing all events
      filterEvents();
    })
    ;
  }

};


// Function to process the "Sort Map" dropdown filtering functionality
function filterEvents(filter) {
  // Wrapper for drawEvents to enable me to queue it and also pass the "filter" argument
  function drawNewEvents (error, brdata) {
    drawEvents(error, brdata, filter);
  }
  queue()
  .defer(d3.json, "data/brdata.json")
  .await(drawNewEvents)
  ;
}


// Function to load event data into event detail modal
function showEventData(d) {
  // Grab the modal
  var event_modal = d3.select(".event-details-modal-data-container");

  // Modify the elements to add the event-specific data
  event_modal.select(".event-data-modal-discipline")
  .html(d.Discipline);
  event_modal.select(".event-data-modal-city")
  .html(d.City);
  event_modal.select(".event-data-modal-name")
  .html(d.Name);
  event_modal.select(".event-data-modal-country")
  .html(d.Country);
  event_modal.select(".event-data-modal-trick")
  .html(d.Trick);
  event_modal.select(".event-data-modal-video")
  .html(d.Video);
  event_modal.select(".event-data-modal-pictures")
  .html(d.Pictures);
  event_modal.select(".event-data-modal-date")
  .html(d.Date);
  event_modal.select(".event-data-modal-extra")
  .html(d["Additional Information"])
  ;
};


// Listener for the initial data load and map drawing
queue()
.defer(d3.json, "data/world-110m.json")
.defer(d3.tsv, "data/world-country-names.tsv")
.defer(d3.json, "data/brdata.json")
.await(ready)
;
