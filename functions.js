var fs = require('fs');
var utils = require('utils');

casper.options.verbose = true;
casper.options.logLevel = casper.cli.get("logLevel") || 'debug';
casper.options.exitOnError = false; // Keep going on error.
casper.options.timeout = 10 * 60 * 1000; // 10 minutes.
// Uncomment if you need jQuery for your tests.
//casper.options.clientScripts.push('js/jquery-2.2.4.min.js');
casper.options.pageSettings = {
  javascriptEnabled: true,
  loadImages: true,
  loadPlugins: false,
  userAgent: 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.2 Safari/537.36'
};
casper.options.viewportSize = {
  width: 1280,
  height: 800
};

// Do not invoke tracking sites when using CasperJS.
casper.options.onResourceRequested = function(casper, requestData, request) {
  if (requestData.url.match(/google-analytics\.com/)) {
    casper.log('Request to GA. Aborting: ' + requestData.url, 'debug');
    request.abort();
  }
  if (requestData.url.match(/pingdom\.net/)) {
    casper.log('Request to Pingdom. Aborting: ' + requestData.url, 'debug');
    request.abort();
  }
  if (requestData.url.match(/nr-data\.net/)) {
    casper.log('Request to New Relic. Aborting: ' + requestData.url, 'debug');
    request.abort();
  }
  if (requestData.url.match(/doubleclick\.net/)) {
    casper.log('Request to Double Click. Aborting: ' + requestData.url, 'debug');
    request.abort();
  }
};

// HTML logging.
casper.on('open', function (location) {
  this.echo(location + ' opened');
});

// Catch JS errors on the page.
casper.on('page.error', function(msg, trace) {
  this.test.fail('JavaScript Error: ' + msg);
});

// Catch load errors for the page resources.
casper.on('resource.error', function(resourceError) {
  if (resourceError.url != "" &&
     !resourceError.url.match(/.*fonts\.net.*/) &&
     !resourceError.url.match(/.*pbs\.twimg\.com.*/) &&
     !resourceError.url.match(/.*twitter\.com.*/) &&
     !resourceError.url.match(/.*beacon\.krxd\.net.*/)
  ) {
    casper.log('Unable to load resource (#' + resourceError.id + 'URL:' + resourceError.url + ')', 'warning');
    casper.log('Error code: ' + resourceError.errorCode + '. Description: ' + resourceError.errorString, 'warning');
  }
});

// Screenshot fails.
casper.on('step.error', function(failure) {
  this.capture('fail.png');
});

var site = casper.cli.get("site");
var timestamp = casper.cli.get("timestamp") || 1;

/**
 * Global pages tests, that are able to run on all JSON responses.
 */
function globalImageTests(casp) {
  casp.test.assertHttpStatus(200);
  casp.test.assertMatch(casp.currentResponse.headers.get('Content-Type'), /image\/.+/);
}

/**
 * Global pages tests, that are able to run on all JSON responses.
 */
function globalAPITests(casp) {
  casp.test.assertHttpStatus(200);
  casp.test.assertEquals(casp.currentResponse.headers.get('Content-Type'), 'application/json; charset=utf-8');
}
