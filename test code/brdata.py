import csv
import json
import os

csvfile = open('brdata.csv', 'r')
jsonfile = open('brdata.json', 'w')
jsonfile.write('{"Events":[\n')

fieldnames = ("Name","Country","City","Discipline","Trick","Date","Pictures","Video","Additional Information","Latitude","Longitude")
reader = csv.DictReader( csvfile, fieldnames)
for row in reader:
    json.dump(row, jsonfile)
    jsonfile.write(',\n')
jsonfile.seek(-2, os.SEEK_END)
jsonfile.truncate()
jsonfile.write(']\n}')
jsonfile.close()