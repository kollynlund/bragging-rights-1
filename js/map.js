/*

Imgur Client ID: 7ec855512bdc532
Imgur Client Secret: 2dccc7c94f2c1c71f87939784d12f2ada3b1c0b7

*/

/* -------------------------------------------------------------------------------------------------------------

                                                  TO DO:

    1. Build PHP (or any other backend language) script to deal with event adding and image upload via Imgur API
    2. Deal with zooming and panning for country map
    3. Implement location picker on modal window so that user can pick approximate lat/long values
    4. Reorganize map.js code
    5. Make sure all "Add Event" modal item selections reset on modal window close
    6. Implement state segmentation for countries on zoom (?)

   ------------------------------------------------------------------------------------------------------------- */




// The initial map layout variables
var width = document.getElementById('map-container').offsetWidth-20;
var height = width / 2;
var active;
var current_scale = 1;


// The initial map projection definition
var projection = d3.geo.mercator()
                 .translate([width/2, height/2])
                 .scale(800);


// The initial map path placeholder
var path = d3.geo.path()
           .projection(projection);


// Selecting the DOM element for the info display
var info_display = d3.select(".map-data-display");


// Setting up the zoom functionality
var zoom = d3.behavior.zoom()
          .scaleExtent([1,100])
          .on("zoom", redraw)
          ;


// Setting up the initial map container svg selection
var svg = d3.select("#map-container")
          .append("svg")
          .attr("width", width)
          .attr("height", height)
          .attr("id","main-map-container")
          .call(zoom)
          .append("g")
          ;


// Setting up the list display selection
var event_table = d3.select("#list-events");


// Setting up the search bar selections
var search_box = d3.select(".search-box");
var search_button = d3.select(".search-btn");


// Setting up the add event modal date selection functionality
var month_picklist = d3.select(".month-picklist")
                     .on("change", function() {
                      var month_picklist_selection = document.getElementsByClassName("month-picklist")[0].value;

                      var month_picklist_selected_item = d3.select(".month-picklist")
                                                         .selectAll(".month-option")
                                                         .filter(function() {return this.innerHTML == month_picklist_selection})
                                                         ;

                      if (!month_picklist_selected_item.empty()) {
                        var days_to_add = parseInt(month_picklist_selected_item.attr("days"));
                      }

                      if (days_to_add) {
                        var day_of_month_picklist = d3.select(".day-of-month-picklist");
                        day_of_month_picklist.selectAll("option").remove();
                        for (var i = 0; i < days_to_add; i++) {
                          day_of_month_picklist.append("option")
                          .html(i+1)
                          ;
                        }
                      }
                     })
                     ;


// Initial map drawing function (before any zooming or panning)
function ready(error, world, names, brdata) {
  var countries = topojson.object(world, world.objects.countries).geometries;
  var n = countries.length;

  countries.forEach( function(d) {
    d.name = names.filter(function(n) { return d.id == n.id; })[0].name;
    d.iso = names.filter(function(n) { return d.id == n.id; })[0].iso3;
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

  // Show/hide country/event info display
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

  // Zoom to country detail when clicked on
  .on("click", click)
  ;
  
  // Lay out event markers over map
  drawEvents(error, brdata);

  search_button.on("click", searchEvents);
  search_box.on("keydown", function() {
    if (d3.event.keyCode == 13) {
      searchEvents();
      search_box.classed({":active": false});
    }
  });
};


// Function for processing zoom and pan interactions
function redraw() {
  var t = d3.event.translate;
  current_scale = d3.event.scale;

  t[0] = Math.min(width / 2 * (current_scale - 1), Math.max(width / 2 * (1 - current_scale), t[0]));
  t[1] = Math.min(height / 2 * (current_scale - 1) + 230 * current_scale, Math.max(height / 2 * (1 - current_scale) - 230 * current_scale, t[1]));
  zoom.translate(t);
  svg.style("stroke-width", 1 / current_scale).attr("transform", "translate(" + t + ")scale(" + current_scale + ")");
  var events = svg.selectAll(".brevent");
  events
  .attr("r", width/100*(1 / current_scale))
  ;
};


// Function for drawing all event marker circles
function drawEvents(error, brdata, filter, is_search) {
  // Removes any previously drawn event markers
  d3.selectAll(".brevent").remove();
  d3.selectAll("tr.event-list-item").remove();

  // Processes any filtering from Search bar or Sort Map dropdown
  var event_data = brdata.Events;
  if (!is_search) {
    if (filter) {
      var filtered_data = [];
      for (var i = 0; i < brdata.Events.length; i++) {
        if (brdata.Events[i].Discipline == filter) {
          filtered_data.push(brdata.Events[i]);
        }
      }
      event_data = filtered_data;
    }
  }
  else {
    if (filter != '') {
      var search_criteria = new RegExp(filter, "i");
      var filtered_data = [];
      for (var i = 0; i < brdata.Events.length; i++) {
        if ( search_criteria.test(brdata.Events[i].Discipline)
          || search_criteria.test(brdata.Events[i].Name)
          || search_criteria.test(brdata.Events[i].Trick)
          || search_criteria.test(brdata.Events[i].Location)
          || search_criteria.test(brdata.Events[i]["Additional Information"])
          || search_criteria.test(brdata.Events[i].Date)
           ) {
          filtered_data.push(brdata.Events[i]);
        }
      }
      event_data = filtered_data;
    }
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
                    // Adding Bootstrap functionality for showing modal
                    .attr("type", "button")
                    .attr("data-toggle", "modal")
                    .attr("data-target", ".display-event-details-modal")
                    // Loading event data into modal when event is clicked
                    .on("click", showEventData) 
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
      .html('FILTER RESULTS <span class="caret"></span>');

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


// Function to process the Search Bar filtering functionality
function searchEvents() {
  // Get the contents of the search input to use as the search filter
  var search_filter = document.getElementById("search-input").value;

  // Wrapper for drawEvents to enable me to queue it and also pass the "filter" argument
  function drawNewEvents (error, brdata) {
    drawEvents(error, brdata, search_filter, true);
  }
  queue()
  .defer(d3.json, "data/brdata.json")
  .await(drawNewEvents)
  ;
  console.log(search_box.attr("class"));
}


// Function to load event data into event detail modal
function showEventData(d) {
  // Grab the modal
  var event_modal = d3.select(".event-details-modal-data-container");

  event_modal.select("ol.carousel-indicators")
  .selectAll("li")
  .remove()
  ;

  event_modal.select(".carousel-inner")
  .selectAll("div")
  .remove()
  ;

  // Modify the elements to add the event-specific data
  event_modal.select(".event-data-modal-discipline")
  .html(d.Discipline)
  ;
  event_modal.select("img.event-data-modal-discipline-graphic")
  .attr("src","img/svg/"+d.Discipline.toLowerCase()+".svg")
  ;

  event_modal.select(".event-data-modal-city")
  .html(d.City)
  ;
  event_modal.select(".event-data-modal-name")
  .html(d.Name)
  ;
  event_modal.select(".event-data-modal-country")
  .html(d.Country)
  ;
  event_modal.select(".event-data-modal-trick")
  .html(d.Trick)
  ;
  event_modal.select(".event-data-modal-date")
  .html(d.Date)
  ;
  event_modal.select(".event-data-modal-extra")
  .html(d["Additional Information"])
  ;


//  console.log(event_modal.select("ol.carousel-indicators"));
  event_modal.select("ol.carousel-indicators")
  .data(d.Pictures.split(","))
  .enter()
  .append("li")
  .attr("data-target", "#myCarousel")
  .attr("data-slide-to", function(d,i) {return i;})
  ;

  console.log(event_modal.select(".carousel-inner"), d.Pictures.split(","));
  console.log(event_modal.select(".carousel-inner")
              .data(d.Pictures.split(","))
              .enter()
  );

  event_modal.select(".carousel-inner")
  .data(d.Pictures.split(","))
  .enter()
  .insert("div");

  console.log(event_modal.select(".carousel-inner").selectAll("div"));


  /*
  .attr("class", "item")
  .insert("img")
  .attr("src", function(d,i) {return d;})
  .insert("div")
  .attr("class", "carousel-caption")
  .insert("p")
  .html("TEST TEST")
  ;
  */


  // Making the iframe embed the corresponding video
  event_modal.select("iframe.event-video")
  .attr("src",function() {
    if (d.Video.search("youtube") > 0) { 
      return d.Video.replace("watch?v=", "embed/").substr(0,41);
    }
    else {
      return "/errors/video_error.html";
    }
  })
  ;


};


function click(d) {
  function ready(error, brdata) {
    console.log(d);
    if (active === d) { 
      return reset();
    }

    active = d;

    var b = path.bounds(d);

    current_scale = .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height);

    svg
    .transition().duration(750).attr("transform",
        "translate(" + projection.translate() + ")"
        + "scale(" + current_scale + ")"
        + "translate(" + -(b[1][0] + b[0][0]) / 2 + "," + -(b[1][1] + b[0][1]) / 2 + ")")
    .style("stroke-width", 1 / current_scale)
    .selectAll(".brevent")
    .attr("r", width/100*(1 / current_scale))
    ;
  }

  queue()
  .defer(d3.json, "data/brdata.json")
  .await(ready)
  ;
}

function reset() {
  current_scale = 1;
  current_offset = [0,0];
  active = undefined;
  svg.transition().duration(750).attr("transform", "")
  .style("stroke-width", 1 / current_scale)
  .selectAll(".brevent")
  .attr("r", width/100*(1 / current_scale))
  ;
}





// Listener for the initial data load and map drawing
queue()
.defer(d3.json, "data/world-110m.json")
//.defer(d3.tsv, "data/world-country-names.tsv")
.defer(d3.tsv, "data/country-names.tsv")
.defer(d3.json, "data/brdata.json")
.await(ready)
;























/*
// Function to process country click drilling - with state divisions
function clickIn(d) {

  // Grabs the appropriate map .json file
  var file = "data/topojson files/"+d.iso+'/states.json';

  function ready(error, topology, brdata) {

    console.log(topology);

    d3.select("svg").remove();

    projection = d3.geo.mercator()
                 .translate([width/2, height/2])
                 .scale(100);

    path = d3.geo.path().projection(projection);

    svg = d3.select("#map-container")
              .append("svg")
              .attr("width", width)
              .attr("height", height)
              .attr("id","main-map-container")
              .call(d3.behavior.zoom()
              .scaleExtent([1,50])
              .on("zoom", redraw))
              .append("g")
              ;

    var yes = false;

    svg.selectAll("path")
    .data(topojson.object(topology, topology.objects.states).geometries)
    .enter().append("path")
    .attr("d", path)
    .style("fill", "#C1BFBF")
    .style("stroke", "#333")
    .attr("class", "states")
    ;

    drawEvents(error, brdata);
  }

  queue()
  .defer(d3.json, file)
  .defer(d3.json, "data/brdata.json")
  .await(ready)
  ;

};
*/
