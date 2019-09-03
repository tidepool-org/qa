"use strict";
require('env2')('.env'); // optionally store your environment variables in .env
const seleniumServer = require("selenium-server");
const chromedriver = require("chromedriver");
const PKG = require('./package.json'); // so we can get the version of the project


var globalVariables = require("./data/globalTestVariables.js");

module.exports = {
	//"globals_path": "config/globals.js",
    "src_folders": ["./tests"],
    "output_folder": "./reports",
    "custom_commands_path": "./commands",
    "page_objects_path": "./pages",
    "selenium" : {
        "start_process": true,
        "server_path": seleniumServer.path,
        "host": "127.0.0.1",
        "port": 4444,
        "cli_args": {
            "webdriver.chrome.driver" : chromedriver.path
        }
    },
    "test_settings": {
        "default": {
            "globals": globalVariables,
            "screenshots": {
                "enabled": true,
                "on_failure": true,
                "on_error": true,
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
        "debug": {
            "captureScreens": true,
            "randomSeed": '20170128T15.49.01.796'
            }
        }
};
