#!/usr/bin/python

import csv
import sys
import xml.sax

RECORD_TYPE_ATTR = 'type'

TYPE_TO_ATTR_MAP = {
  'HKQuantityTypeIdentifierDietaryCarbohydrates': [
    'type', 'sourceName', 'sourceVersion', 'unit', 'creationDate', 'startDate', 'endDate', 'value'],
  'HKQuantityTypeIdentifierInsulinDelivery': [
    'type', 'sourceName', 'sourceVersion', 'device', 'unit', 'creationDate', 'startDate', 'endDate',  'value'],
  'HKQuantityTypeIdentifierBloodGlucose': [
    'type', 'sourceName', 'sourceVersion', 'unit', 'creationDate', 'startDate', 'endDate', 'value', 'device'],
  'HKQuantityTypeIdentifierDistanceWalkingRunning': [
    'type', 'sourceName', 'sourceVersion', 'device', 'unit', 'creationDate', 'startDate', 'endDate', 'value'],
  'HKQuantityTypeIdentifierStepCount': [
    'type', 'sourceName', 'sourceVersion', 'device', 'unit', 'creationDate', 'startDate', 'endDate', 'value']
}


class OutputFile(object):
  """
  Wrapper for the file and CSVWriter.
  """

  def __init__(self, attrs):
    metadataType = attrs.getValue(RECORD_TYPE_ATTR)
    self.keys = TYPE_TO_ATTR_MAP.get(metadataType)
    self.file = open(metadataType + '.csv', 'w')
    self.writer = csv.DictWriter(self.file, fieldnames=self.keys, delimiter=',')
    self.writer.writeheader()

  def writerow(self, attrs):
    """Writes a row in to the CSV file.
    
    Args:
      attrs (Attributes): Element attributes
    """
    d = {}
    for key in self.keys:
      value = attrs.get(key, '')
      d[key] = value.encode('utf-8', 'ignore')
    self.writer.writerow(d)

  def close(self):
    self.file.close()


class HealthKitHandler(xml.sax.ContentHandler):
  """SAX handler for parsing HealthKit XML files."""

  def startDocument(self):
    self.elements = []
    self.open_files = {}

  def endDocument(self):
    for file in self.open_files.values():
      file.close()

  def startElement(self, name, attrs):
    self.elements.append(name)
    xpath = '/'.join(self.elements)
    if xpath == 'HealthData/Record':
      if attrs.has_key(RECORD_TYPE_ATTR):
        metadataType = attrs.getValue(RECORD_TYPE_ATTR)
        if metadataType in TYPE_TO_ATTR_MAP:
          file = self.open_files.get(metadataType)
          if not file:
            file = OutputFile(attrs)
            self.open_files[metadataType] = file
          file.writerow(attrs)

  def endElement(self, name):
    self.elements.pop()

def main(argv):
  if len(argv) != 2:
    raise 'Invalid arguments'
  input = argv[1]
  parser = xml.sax.make_parser()
  parser.setContentHandler(HealthKitHandler())
  parser.parse(open(input, 'r'))

main(sys.argv)
