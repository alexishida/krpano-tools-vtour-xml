'use strict';

var fs = require('fs');
var xml2js = require('xml2js');
var utils = require('./libs/utils.js');


var opcao = process.argv[2].toUpperCase();
var local_arquivo = process.argv[3];

var tour_xml = utils.lerArquivo('./tour.xml');
var tour_array = utils.xml2Array(tour_xml);


if (opcao == 'I') {
    importarScenes();
} else if (opcao == 'E') {
    exportarScenes();
} else {
    console.log('Digite I - para importar e E - para exportar a lista');
}



function importarScenes() {

    var scenes_array = tour_array['krpano']['scene'];
    var scenes_json = JSON.parse(utils.lerArquivo('./scenes.json'));

    // Traduzindo o Carregando
    tour_array['krpano']['skin_settings'][0]['$']['loadingtext'] = "Carregando...";

    for (let i = 0; i <= Object.keys(scenes_json['scenes']).length - 1; i++) {
      tour_array['krpano']['scene'][i]['$']['title'] = scenes_json['scenes'][i]['title'];
      console.log(tour_array['krpano']['scene'][i]['$']['title']);
    }

    var tour_xml2 = utils.array2Xml(tour_array);
    utils.gravarArquivo(__dirname + '/tour_modificado.xml', tour_xml2);

}



function exportarScenes() {

    var scenes_array = tour_array['krpano']['scene'];

    var scenes_obj = {
        scenes: []
    };

    for (let i = 0; i <= Object.keys(scenes_array).length - 1; i++) {

        var scene = {};
        scene.name = scenes_array[i]['$']['name'];
        scene.title = scenes_array[i]['$']['title'];

        scenes_obj.scenes.push(scene);
    }

    console.log(scenes_obj);

    utils.gravarArquivo(__dirname + '/scenes.json', JSON.stringify(scenes_obj, null, 2));
}