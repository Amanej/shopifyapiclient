var app, express, server;

express = require('express');

app = express();

// jsonfile
var jsonfile = require('jsonfile');

// Would normally be passed
var settings = require('./settings.json');

app.get('/', function(req, res) {
  var _m = "<h1>shopify api</h1>";
  res.send(_m);
});

const Shopify = require('shopify-api-node');

const shopify = new Shopify({
  shopName: settings.shopname,
  apiKey: settings.apiKey,
  password: settings.password
});

app.get('/createListing', function(req,res) {
  // 'http://localhost:3020/createListing?title="Hei"&bodyHTML="<h1>Awesome</h1>"&vendor="Digible"&productType="crazy"'

  //console.log(req);
  //console.dir(req);
  console.dir(req.params);
  var params = req.params;
  console.dir(req.query);
  var query = req.query;


  var title = query.title;
  var _html = query.bodyHTML;
  var vendor = query.vendor;
  var productType = query.productType;
  var _images = [
    {"src":"https://upslgp.s3.amazonaws.com/areynolds15/VoronoiSpiralCenterpiece/Vase/images/Vase.jpg"},
    {"src":"https://upslgp.s3.amazonaws.com/areynolds15/VoronoiSpiralCenterpiece/Vase/images/Vase.jpg"}
  ];

  shopify.product.create({
    title: title,
    body_html: _html,
    vendor: vendor,
    product_type: productType,
    images: _images,
    variants: [{"option1":"first","price":"10.00","sku":123},{"option2":"second","price":"15.00","sku":123}]
  })
  .then(function(products) {
    console.dir(products);

    var file = 'products.json'
    var obj = products;

    jsonfile.writeFile(file, obj, function (err) {
      console.error(err)
    });
  })
  .catch(function(error) {
    console.error(error);

  });
});


server = app.listen(3020, function() {
  return console.log('Listening on port %d', server.address().port);
});
