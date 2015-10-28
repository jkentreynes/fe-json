'use strict';
var diff = require('deep-diff');
var json1 = require( './test.json');
var json2 = require( './test2.json');

(function () {
	require('colors')
var jsdiff = require('diff');

var diff = jsdiff.diffJson(json1, json2);

diff.forEach(function(part){
  // green for additions, red for deletions
  // grey for common parts
  var color = part.added ? 'green' :
    part.removed ? 'red' : 'grey';
  process.stderr.write(part.value[color]);
});
} )();