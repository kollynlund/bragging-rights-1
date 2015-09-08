#!/bin/sh
for path in /Users/TannerBindrup/Desktop/GeoJSON\ \&\ TopoJSON/GeoJSON/countries/*/; do
	dirname=$dirname",$path"
	thecountry=`expr "$dirname" : '.*\(.*/.*/\)'`
	numchars=`expr ${#thecountry} - 2`
	thecountry=${thecountry:1:numchars}
	mkdir "/Users/TannerBindrup/Desktop/GeoJSON & TopoJSON/TopoJSON/countries/$thecountry"
	topojson -o "/Users/TannerBindrup/Desktop/GeoJSON & TopoJSON/TopoJSON/countries/$thecountry/geodata.json" -p admin -p name "/Users/TannerBindrup/Desktop/GeoJSON & TopoJSON/GeoJSON/countries/$thecountry/geodata.json"
done