"use strict";

var globalVariables = require("./data/globalTestVariables.js");

module.exports = {
    "src_folders": ["./tests"],
    "output_folder": "./reports",
    "custom_commands_path": "./commands",
    "page_objects_path": "./pages",
    "selenium" : {
        "start_process": true,
        "server_path": "./node_modules/selenium-server-standalone-jar/jar/selenium-server-standalone-2.53.1.jar",
        "host": "127.0.0.1",
        "port": 4444,
        "cli_args": {
            "webdriver.chrome.driver" : "./node_modules/chromedriver/bin/chromedriver"
        }
    },
    "test_settings": {
        "default": {
            "globals": globalVariables,
            "captureScreens": false,
            "screenshots": {
                "enabled": true,
                "on_failure": true,
                "path": "./screenshots/failed/" + globalVariables.timeTestStarted
            },
            "desiredCapabilities": {
                "browserName": "chrome",
                "javascriptEnabled": true,
                "acceptSslCerts": true
            }
        },
        "captureScreens": {
            "captureScreens": true
        },
    }
};
