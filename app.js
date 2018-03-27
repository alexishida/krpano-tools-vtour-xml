// https://github.com/Leonidas-from-XIV/node-xml2js


var fs = require('fs');

xml2js = require('xml2js');

var parser = new xml2js.Parser();
var builder = new xml2js.Builder();

fs.readFile(__dirname + '/tour.xml', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  parser.parseString(data, function (err, result) {

    //console.dir(JSON.stringify(result));
    /*
   var add_item = { '$':
     { name: 'spot2',
       style: 'skin_hotspotstyle',
       ath: '-65.438',
       atv: '-4.318',
       linkedscene: 'scene_2' } };

       result['krpano']['scene'][0]['hotspot'].push(add_item);*/

    //console.log(result['krpano']['scene'][0]['hotspot']);
    // console.log(Object.keys(result['krpano']['scene']).length);
    //var xml = builder.buildObject(result);
    // console.log(xml);


    /*
   result['krpano']['scene'].forEach(function(value, index, ar) {
     console.log(value['$']['title']);
   });
*/

var teste = { '$':
{ name: 'spot1',
  style: 'skin_hotspotstyle',
  ath: '-65.438',
  atv: '-4.318',
  linkedscene: 'scene_2' }};

    result['krpano']['scene'][0]['hotspot'].push(addLegenda(1,'Teste',teste['$'].ath,teste['$'].atv));
    console.log(result['krpano']['scene'][0]['hotspot']);


   var xml = builder.buildObject(result);
   console.log(xml);

  });
});

function addLegenda(id, texto,ath,atv) {
  atv = Number(atv) + 10;
  return {
    '$': {
      name: 'spot'+id+'-text',
      type: 'text',
      distorted: 'true',
      ath: ath,
      atv: atv,
      html: texto,
      css: 'font-family:Arial; font-weight: bolder; padding: 5px; font-size:20px; color:0xFFFFFF;',
      wordwrap: 'true',
      bg: 'true',
      bgcolor: '#000000',
      bgalpha: '0.6'
    }
  };
}



//var parsedXML = xml.parse('<?xml version="1.0" encoding="UTF-8"?>' +
//                    '<root>Root Element</root>');
//console.log(parsedXML);