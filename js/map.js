// The SVG container
/*
var width  = 960,
    height = 550;
*/

var color = d3.scale.category10();

var projection = d3.geo.mercator()
                .translate([1000, 500])
                .scale(1900);

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select("#map").append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .call(d3.behavior.zoom()
    .on("zoom", redraw))
    .append("g");


function redraw() {
    svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}

var tooltip = d3.select("#map-container").append("div")
    .attr("class", "tooltip");

queue()
    .defer(d3.json, "data/world-110m.json")
    .defer(d3.tsv, "data/world-country-names.tsv")
    .defer(d3.json, "data/brdata.json")
    .await(ready);

function ready(error, world, names, brdata) {
  var countries = topojson.object(world, world.objects.countries).geometries,
      neighbors = topojson.neighbors(world, countries),
      i = -1,
      n = countries.length;

  countries.forEach( function(d) { 
    d.name = names.filter(function(n) { return d.id == n.id; })[0].name; 
  });

  var country = svg.selectAll(".country").data(countries);

  console.log("country: \n", country);

  country
   .enter()
    .insert("path")
    .attr("class", "country")    
      .attr("title", function(d,i) { return d.name; })
      .attr("d", path)
      .style("fill", /* function(d, i) { return color(d.color = d3.max(neighbors[i], function(n) { return countries[n].color; }) + 1 | 0); } */ "green")
      .style("stroke", "blue");

    //Show/hide tooltip
    country
      .on("mousemove", function(d,i) {
        var mouse = d3.mouse(svg.node()).map( function(d) { return parseInt(d); } );

        tooltip
          .classed("hidden", false)
          .attr("style", "left:"+(mouse[0])+"px;top:"+(mouse[1])+"px")
          .html(d.name)
      })
      .on("mouseout",  function(d,i) {
        tooltip.classed("hidden", true)
      })
      /*.on("click", clickIn)*/;


/*
      //render the points
      brdata.Events.forEach(function(d) {
        var x = 0;
        var y = 0;
        if (d.Longitude != '') { 
          x = projection([d.Longitude,d.Latitude])[0];
          y = projection([d.Longitude,d.Latitude])[1];
        }


      svg.append("svg:circle")
          .attr("class","brevent")
          .attr("cx", x)
          .attr("cy", y)
          .attr("r", 4)
          .style("fill", "blue")
          .style("stroke", "yellow");

/*
      var name = d.Name;
      svg.append("svg:text")
          .attr("x", x+4)
          .attr("y", y+1)
          .text(name);


      });
*/

      var events = svg.selectAll(".brevents").data(brdata.Events);

      console.log("country: \n", events);

      events
       .enter()
        .insert("circle")
        .attr("class", "brevent")    
          .attr("title", function(d,i) { return d.Name; })
          .attr("cx", function(d,i) { return projection([d.Longitude,d.Latitude])[0];})
          .attr("cy", function(d,i) { return projection([d.Longitude,d.Latitude])[1];})
          .attr("r", 4)
          .style("fill", "blue")
          .style("stroke", "yellow");


      events
      .on("mousemove", function(d,i) {
        var mouse = d3.mouse(svg.node()).map( function(d) { return parseInt(d); } );

        tooltip
          .classed("hidden", false)
          .attr("style", "left:"+(mouse[0])+"px;top:"+(mouse[1])+"px")
          .html(d.Discipline+" -</br>"+d.Name+": "+d.Trick)
      })
      .on("mouseout",  function(d,i) {
        tooltip.classed("hidden", true)
      })

}

function clickIn(d) {

    console.log('clickedIN: '+d.name);

    var file = "data/"+d.name.replace(" ","_").toLowerCase()+'.json';


    queue()
      .defer(d3.json, file)
      /*
      .defer(d3.json, "data/test-centroids.json")
      */
      .await(ready);

    function ready(error, topology) {
  
      d3.select("svg").remove();

      var radius = d3.scale.sqrt()
      .domain([0, 1e6])
      .range([0, 10]);

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
/*
      g.selectAll(".symbol")
          .data(centroid.features.sort(function(a, b) { return b.properties.population - a.properties.population; }))
        .enter().append("path")
          .attr("class", "symbol")
          .attr("d", path.pointRadius(function(d) { return radius(d.properties.population); }));
*/

    }

}