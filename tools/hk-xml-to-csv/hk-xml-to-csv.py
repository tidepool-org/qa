#!/usr/bin/python
"""Converts an Apple Healthkit XML files to CSV.

This program takes as input an Apple Healthkit XML file, and writes out more
readable CSV files (in the current directory) based on Healthkit data types.
"""

import csv
import sys
import xml.sax

RECORD_TYPE_ATTR = 'type'

TYPE_TO_ATTR_MAP = {
    'HKQuantityTypeIdentifierDietaryCarbohydrates': [
        'type',
        'sourceName',
        'sourceVersion',
        'unit',
        'creationDate',
        'startDate',
        'endDate',
        'value'],
    'HKQuantityTypeIdentifierInsulinDelivery': [
        'type',
        'sourceName',
        'sourceVersion',
        'device',
        'unit',
        'creationDate',
        'startDate',
        'endDate',
        'value'],
    'HKQuantityTypeIdentifierBloodGlucose': [
        'type',
        'sourceName',
        'sourceVersion',
        'unit',
        'creationDate',
        'startDate',
        'endDate',
        'value',
        'device'],
    'HKQuantityTypeIdentifierDistanceWalkingRunning': [
        'type',
        'sourceName',
        'sourceVersion',
        'device',
        'unit',
        'creationDate',
        'startDate',
        'endDate',
        'value'],
    'HKQuantityTypeIdentifierStepCount': [
        'type',
        'sourceName',
        'sourceVersion',
        'device',
        'unit',
        'creationDate',
        'startDate',
        'endDate',
        'value'],
    'HKQuantityTypeIdentifierFlightsClimbed': [
        'type',
        'sourceName',
        'sourceVersion',
        'device',
        'unit',
        'creationDate',
        'startDate',
        'endDate',
        'value'],
}


class OutputFile(object):
    """
    Wrapper for the file and CSVWriter.
    """

    def __init__(self, attrs):
        metadata_type = attrs.getValue(RECORD_TYPE_ATTR)
        self.keys = TYPE_TO_ATTR_MAP.get(metadata_type)
        self.file = open(metadata_type + '.csv', 'w')
        self.writer = csv.DictWriter(
            self.file, fieldnames=self.keys, delimiter=';', lineterminator='\n')
        self.writer.writeheader()

    def writerow(self, attrs):
        """Writes a row in to the CSV file.

        Args:
            attrs (Attributes): Element attributes
        """
        row = {}
        for key in self.keys:
            value = attrs.get(key, '')
            row[key] = value.encode('utf-8', 'ignore')
        self.writer.writerow(row)

    def close(self):
        """Closes the file."""
        self.file.close()


class HealthKitHandler(xml.sax.ContentHandler):
    """SAX handler for parsing HealthKit XML files."""

    def __init__(self):
        xml.sax.ContentHandler.__init__(self)
        self.elements = []
        self.open_files = {}

    def startDocument(self):
        pass

    def endDocument(self):
        for csv_file in self.open_files.values():
            csv_file.close()

    def startElement(self, name, attrs):
        self.elements.append(name)
        xpath = '/'.join(self.elements)
        if xpath == 'HealthData/Record':
            if RECORD_TYPE_ATTR in attrs:
                metadata_type = attrs.getValue(RECORD_TYPE_ATTR)
                if metadata_type in TYPE_TO_ATTR_MAP:
                    csv_file = self.open_files.get(metadata_type)
                    if not csv_file:
                        csv_file = OutputFile(attrs)
                        self.open_files[metadata_type] = csv_file
                    csv_file.writerow(attrs)

    def endElement(self, name):
        self.elements.pop()


def main(argv):
    if len(argv) != 2:
        raise 'Invalid arguments'
    input_xml = argv[1]
    parser = xml.sax.make_parser()
    parser.setContentHandler(HealthKitHandler())
    parser.parse(open(input_xml, 'r'))


main(sys.argv)
