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
}

if(args.z) {
	timezone = args.z;
}

const days = args.d 

if (days == 0) {
  console.log("today.")
} else if (days > 1) {
  console.log("in " + days + " days.")
} else {
  console.log("tomorrow.")
}

var latitude = 0;
if(args.n) {
	latitude = args.n;
	if(args.s){
		latitude = args.s;
	}
}

var longitude = 0;
if(args.e) {
	longitude = args.e;
	if(args.w){
		longitude = args.w;
	}
}

const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + 'daily=precipitation_hours');
const data = await response.json();

if(args.j) {
	console.log(data);
}
