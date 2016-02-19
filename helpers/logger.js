/**
 * API RESTful for OSSEC
 * Copyright (C) 2015-2016 Wazuh, Inc.All rights reserved.
 * Wazuh.com
 *
 * This program is a free software; you can redistribute it
 * and/or modify it under the terms of the GNU General Public
 * License (version 2) as published by the FSF - Free Software
 * Foundation.
 */

var moment = require('moment');
var config = require('../config.js');

var tag = config.logs_tag;
var LEVEL_DISABLED = 0;
var LEVEL_INFO = 1;
var LEVEL_WARNING = 2;
var LEVEL_ERROR = 3;
var LEVEL_DEBUG = 4;

var logger_level = LEVEL_INFO;
switch(config.logs) {
    case "INFO", "info":
        logger_level = LEVEL_INFO;
        break;
    case "WARNING", "warning":
        logger_level = LEVEL_WARNING;
        break;
    case "ERROR", "error":
        logger_level = LEVEL_ERROR;
        break;
    case "DEBUG", "debug":
        logger_level = LEVEL_DEBUG;
        break;
    case "DISABLED", "disabled":
        logger_level = LEVEL_DISABLED;
        break;
    default:
        logger_level = LEVEL_INFO;
}

function header(){
    return tag + " " + moment().format('YYYY-MM-DD HH:mm:ss') + ": ";
}

exports.logCommand = function(cmd, error, stdout, stderr) {
    var head = header() + "CMD -";

    if(logger_level >= LEVEL_DEBUG)
        console.log(head + cmd);

    if (logger_level >= LEVEL_ERROR){
        if(error != null)
            console.error(head + " error:" + error);

        if(stderr != "")
            console.error(head + " stderr:" + stderr);
    }
    if(logger_level >= LEVEL_DEBUG)
        console.log(head + " stdout:" + stdout);
}

exports.log = function(message) {
    if(logger_level >= LEVEL_INFO)
        console.log(header() + message);
}