#!/bin/bash

# This script will run all of the completed and APPROVED Ghost Inspector (GI)
# tests on production.

# NOTE: The immediate option is used, so that no results are
# returned. The results are not needed, because all of the test information
# is available in GI. Further, if any of the tests fail,
# the normal notifications set up in GI will happen (i.e., an email and
# slack notification).

# This will run the suite: Active Tests on Production (Blip Existing User
# Experience and Page Routing Tests)
curl "https://api.ghostinspector.com/v1/suites/576419339022199f1828d539/execute/?apiKey=${GHOSTINSPECTOR_API_KEY}&immediate=1"
