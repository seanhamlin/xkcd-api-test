/**
 * First XKCD JSON test.
 *
 * @see http://casperjs.readthedocs.org/en/latest/modules/tester.html
 */
casper.test.begin('Broken', 1, function suite(test) {

  casper.start(site + '/0/info.0.json?' + timestamp, function() {
    this.test.assertHttpStatus(404);
  });

  casper.run(function() {
    test.done();
  });

});
