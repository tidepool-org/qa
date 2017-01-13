#!/bin/bash

# This script will run all of the completed ghost inspector (GI) tests
# on staging, the immediate option is used, so that no results are
# returned.
#
# NOTE: the results are not needed, because all of the test information
# is available in ghostinspector. Further, if any of the tests fail,
# the normal notifications set up in GI will happen (i.e., an email and
# slack notification)

# This will run the suite: Active Tests on Staging (Blip Page Routing Tests)
curl "https://api.ghostinspector.com/v1/suites/57644a18ba0a45c74873ab58/execute/?apiKey=${GHOSTINSPECTOR_API_KEY}&immediate=1"

# This will run the suite: Active Tests on Staging (Blip Stories)
curl "https://api.ghostinspector.com/v1/suites/56feaa3819d90d942760f86f/execute/?apiKey=${GHOSTINSPECTOR_API_KEY}&immediate=1"

# This will run the suite: Active Tests on Staging (Blip User Experience Tests)
curl "https://api.ghostinspector.com/v1/suites/55bfa8f168b7fc6e0cb30d31/execute/?apiKey=${GHOSTINSPECTOR_API_KEY}&immediate=1"
