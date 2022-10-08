import sys
import csv
import os
import json

FILENAME_IN  = 'Final_data_2019.csv'
FILENAME_OUT = '2019.json'

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
        date           = row[0]
        borough        = row[1]
        weekday        = int(row[2])
        year           = int(row[3])
        month          = int(row[4])
        day            = int(row[5])
        collision_date = row[6]
        temp           = float(row[7])
        dewp           = float(row[8])
        slp            = float(row[9])
        visib          = float(row[10])
        wdsp           = float(row[11])
        mxpsd          = float(row[12])
        gust           = float(row[13])
        max            = float(row[14])
        min            = float(row[15])
        prcp           = float(row[16])
        sndp           = float(row[17])
        fog            = int(row[18])
        cyc_kill       = int(row[19])
        cyc_injd       = int(row[20])
        moto_kill      = int(row[21])
        moto_injd      = int(row[22])
        peds_kill      = int(row[23])
        peds_injd      = int(row[24])
        pers_kill      = int(row[25])
        pers_injd      = int(row[26])
        num_cols       = int(row[27])

        row_data = json.dumps({
            "date":date,
            "borough":borough,
            "weekday":weekday,
            "year":year,
            "month":month,
            "day":day,
            "collision_date":collision_date,
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
            "cyc_kill":cyc_kill,
            "cyc_injd":cyc_injd,
            "moto_kill":moto_kill,
            "moto_injd":moto_injd,
            "peds_kill":peds_kill,
            "peds_injd":peds_injd,
            "pers_kill":pers_kill,
            "pers_injd":pers_injd,
            "num_cols":num_cols      
        }, sort_keys=False, indent=4)
        print(row_data)

        print(json.dumps({
            "date":date,
            "borough":borough,
            "weekday":weekday,
            "year":year,
            "month":month,
            "day":day,
            "collision_date":collision_date,
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
            "cyc_kill":cyc_kill,
            "cyc_injd":cyc_injd,
            "moto_kill":moto_kill,
            "moto_injd":moto_injd,
            "peds_kill":peds_kill,
            "peds_injd":peds_injd,
            "pers_kill":pers_kill,
            "pers_injd":pers_injd,
            "num_cols":num_cols   
        }, sort_keys=False, indent=4))
        
        writeToFile(row_data, FILENAME_OUT)


# Entry point
data = open_file(FILENAME_IN)
contents = collate_data(data)