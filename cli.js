#!/usr/bin/env node
import minimist from 'minimist';
import moment from 'moment-timezone';
import fetch from 'node-fetch';

const [,, ...args] = process.argv
const args = require('minimist')(process.argv.slice(2));
const timezone = moment.tz.guess();

if(args.includes('-h')) {
	console.log('Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE'
    + '-h            Show this help message and exit.'
    + '-n, -s        Latitude: N positive; S negative.'
    + '-e, -w        Longitude: E positive; W negative.'
    + '-z            Time zone: uses tz.guess() from moment-timezone by default.'
    + '-d 0-6        Day to retrieve weather: 0 is today; defaults to 1.'
    + '-j            Echo pretty JSON from open-meteo API and exit.')
}

if(args.includes('-z')) {
	timezone = args.z
}

const days = args.d 

if (days == 0) {
  console.log("today.")
} else if (days > 1) {
  console.log("in " + days + " days.")
} else {
  console.log("tomorrow.")
}

const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + 'daily=precipitation_hours');


