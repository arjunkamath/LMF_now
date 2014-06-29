var http = require("http");
var cheerio = require("cheerio");
var fs = require("fs");
var htmlToText = require('html-to-text');

var fileName = 'antell_text.html';
var filePath = __dirname + '/' + fileName;

// Utility function that downloads a URL and invokes
// callback with the data.
function download(url, callback) {
  http.get(url, function(res) {
    var data = "";
    res.on('data', function (chunk) {
      data += chunk;
    });
    res.on("end", function() {
      callback(data);
    });
  }).on("error", function() {
    callback(null);
  });
}

var antell_main_url = 'http://www.antell.fi/piilotetut/antell-ravintola-lm-ericsson-kirkkonummi.html';
var antell_menu_url = 'http://www.antell.fi/lounaslistat/lounaslista.html?owner=128';

download(antell_menu_url, function(data){
  if(data) {
    fs.writeFile(filePath, data, function(err){
      if(err){
	console.log(err);
      }
      else
        htmlToText.fromFile((filePath), {
         // tables: ['#invoice', '.address']
        }, function(err, text) {
          if (err) return console.error(err);
            console.log(text);
      });
    });
  }
    //console.log(data);
    //var $ = cheerio.load(data);
    
  
  else
    console.log('Error');
});
