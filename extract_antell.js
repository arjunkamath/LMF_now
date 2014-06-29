var http = require("http");

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
  console.log(data);
});
