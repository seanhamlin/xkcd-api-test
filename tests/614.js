/**
 * First XKCD JSON test.
 *
 * @see http://casperjs.readthedocs.org/en/latest/modules/tester.html
 */
casper.test.begin('614', 7, function suite(test) {

  casper.start(site + '/614/info.0.json?' + timestamp, function() {
    globalAPITests(this);

    // Ensure the JSON is valid.
    $json = JSON.parse(this.getPageContent());
    this.test.pass('JSON is valid');

    // Ensure the JSON is valid.
    this.test.assertEquals($json.num, 614, 'ID is correct');
    this.test.assertEquals($json.safe_title, "Woodpecker");
    img = $json.img;

    casper.thenOpen(img + '?' + timestamp, function() {
      globalImageTests(this);
    });
  });

  casper.run(function() {
    test.done();
  });

});
