#!/usr/bin/env node
import minimist from 'minimist';
import moment from 'moment-timezone';
import fetch from 'node-fetch';

const args = minimist(process.argv.slice(2));
var timezone = moment.tz.guess();

if(args.h) {
	console.log('Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE\n'
    + '-h            Show this help message and exit.\n'
    + '-n, -s        Latitude: N positive; S negative.\n'
    + '-e, -w        Longitude: E positive; W negative.\n'
    + '-z            Time zone: uses tz.guess() from moment-timezone by default.\n'
    + '-d 0-6        Day to retrieve weather: 0 is today; defaults to 1.\n'
    + '-j            Echo pretty JSON from open-meteo API and exit.\n')
    process.exit(0);
}

if(args.z) {
	timezone = args.z;
}

var latitude = 0;
if(args.n) {
	latitude = args.n;
} else if(args.s){
	latitude = -(args.s);
} else {
	console.log("Latitude must be in range");
	process.exit(0);
}

var longitude = 0;
if(args.e) {
	longitude = args.e;
} else if(args.w){
	longitude = -(args.w);
} else {
	console.log("Longitude must be in range");
	process.exit(0);
}

const days = args.d;
const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&daily=precipitation_hours&timezone=' + timezone);
const data = await response.json();


if(data.daily.precipitation_hours[days] != 0) {
	console.log("You might need your galoshes");
} else {
	console.log("You will not need your galoshes");
}

if (days == 0) {
  console.log("today.")
} else if (days > 1) {
  console.log("in " + days + " days.")
} else {
  console.log("tomorrow.")
}

if(args.j) {
	console.log(data);
	process.exit(0);
}
