import sys
import csv
import os
import json

FILENAME_IN  = '2020.csv'
FILENAME_OUT = '2020.json'

def open_file(file_in, skip_header=True):
    print(f'Opening file {file_in}')
    data = ''
    try:
        with open(file_in, encoding='utf-8-sig', mode='r') as file:
            reader = csv.reader(file)
            if skip_header is True:
                # if skip_header is true, then skip to the next line
                next(reader, None)
            # make each row in the input file into a tuple and add
            # this to a list to be returned.
            data = [tuple(row) for row in reader]
    # handle file not found errors with a nice error message
    except FileNotFoundError:
        print('File {} does not exist.'.format(file_in))
        sys.exit(1)
    except:  # generic catch all error message
        print(
            'Trying to open {} failed.  No further information was available'
            .format(file_in))
        sys.exit(1)
    # return the data variable (the file contents)
    return data

def writeToFile(logData, fileName, openOption="a"):
  file = open(fileName, openOption)
  file.write(json.dumps(json.loads(logData), indent=4)) 
  file.close()  

def collate_data(data_in):
    for row in data_in:
        day = row[0]
        collision_date = row[1]
        neighborhood = row[2]
        lat = row[3]
        long = row[4]
        num_collisions = row[5]
        cyclists_killed = row[6]
        cyclists_injured = row[7]
        motorists_killed = row[8]
        motorists_injured = row[9]
        peds_killed = row[10]
        peds_injured = row[11]
        persons_killed = row[12]
        persons_injured = row[13]

        row_data = json.dumps({
            "day":day,
            "year":year,
            "mo":mo,
            "da":da,
            "collision_date":collision_date,
            "neighborhood":neighborhood,
            "lat":lat,
            "long":long,
            "temp":temp,
            "dewp":dewp,
            "slp":slp,
            "visib":visib,
            "wdsp":wdsp,
            "mxpsd":mxpsd,
            "gust":gust,
            "max":max,
            "min":min,
            "prcp":prcp,
            "sndp":sndp,
            "fog":fog,
            "cyclists_killed":cyclists_killed,
            "cyclists_injured":cyclists_injured,
            "motorists_killed":motorists_killed,
            "motorists_injured":motorists_injured,
            "peds_killed":peds_killed,
            "peds_injured":peds_injured,
            "persons_killed":persons_killed,
            "persons_injured":persons_injured,
            "num_collisions":num_collisions          
        }, sort_keys=True, indent=4)
        print(row_data)

        print(json.dumps({
            "day":day,
            "year":year,
            "mo":mo,
            "da":da,
            "collision_date":collision_date,
            "neighborhood":neighborhood,
            "lat":lat,
            "long":long,
            "temp":temp,
            "dewp":dewp,
            "slp":slp,
            "visib":visib,
            "wdsp":wdsp,
            "mxpsd":mxpsd,
            "gust":gust,
            "max":max,
            "min":min,
            "prcp":prcp,
            "sndp":sndp,
            "fog":fog,
            "cyclists_killed":cyclists_killed,
            "cyclists_injured":cyclists_injured,
            "motorists_killed":motorists_killed,
            "motorists_injured":motorists_injured,
            "peds_killed":peds_killed,
            "peds_injured":peds_injured,
            "persons_killed":persons_killed,
            "persons_injured":persons_injured,
            "num_collisions":num_collisions   
        }, sort_keys=True, indent=4))
        writeToFile(row_data, FILENAME_OUT)


# Entry point
data = open_file(FILENAME_IN)
contents = collate_data(data)