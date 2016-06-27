/**
 * First XKCD JSON test.
 *
 * @see http://casperjs.readthedocs.org/en/latest/modules/tester.html
 */
casper.test.begin('Current comic', 7, function suite(test) {

  casper.start(site + '/info.0.json?' + timestamp, function() {
    globalAPITests(this);

    // Ensure the JSON is valid.
    $json = JSON.parse(this.getPageContent());
    this.test.pass('JSON is valid');

    // Ensure the JSON is valid.
    this.test.assert($json.num >= 1698, "ID is greater than the minimum");
    this.test.assertMatch($json.safe_title, /.+/, "Title is not blank");
    img = $json.img;

    casper.thenOpen(img + '?' + timestamp, function() {
      globalImageTests(this);
    });
  });

  casper.run(function() {
    test.done();
  });

});
