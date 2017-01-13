#!/bin/bash

# This script will backup all of the completed ghost inspector (GI) tests on staging.
# This could be improved by first querying all the suites on GI, and then looping
# through all of them. Also, these tests are hard coded to save in backup folder on
# your local machine, called backups. This could be further improved by writing the
# backups to a folder that has the date. Right now, I simply run this script and then
# create and move to a folder with the name of <YYYY-MM-DD>

# this will backup the suite: Active Tests on Staging (Blip Page Routing Tests)
curl "https://api.ghostinspector.com/v1/suites/57644a18ba0a45c74873ab58/export/selenium-html/?apiKey=${GHOSTINSPECTOR_API_KEY}" -o backups/Active-Tests-on-Staging-Blip-Page-Routing-Tests.zip

# this will backup the suite: Active Tests on Staging (Blip Stories)
curl "https://api.ghostinspector.com/v1/suites/56feaa3819d90d942760f86f/export/selenium-html/?apiKey=${GHOSTINSPECTOR_API_KEY}" -o backups/Active-Tests-on-Staging-Blip-Stories.zip

# this will backup the suite: Active Tests on Staging (Blip User Experience Tests)
curl "https://api.ghostinspector.com/v1/suites/55bfa8f168b7fc6e0cb30d31/export/selenium-html/?apiKey=${GHOSTINSPECTOR_API_KEY}" -o backups/Active-Tests-on-Staging-Blip-User-Experience-Tests.zip
