'use strict';

var fs = require('fs');
var xml2js = require('xml2js');
var utils = require('./libs/utils.js');



var tour_xml = utils.lerArquivo('./tour.xml');
var tour_array = utils.xml2Array(tour_xml);

var scenes_array = tour_array['krpano']['scene'];

// Traduzindo o Carregando
tour_array['krpano']['skin_settings'][0]['$']['loadingtext'] = "Carregando...";


for (let x = 0; x <= Object.keys(scenes_array).length - 1; x++) {
    if (Object.keys(tour_array['krpano']['scene'][x]['hotspot']).length > 0) {

        console.log(Object.keys(tour_array['krpano']['scene'][x]['hotspot']).length);

        for (let y = 0; y <= Object.keys(tour_array['krpano']['scene'][x]['hotspot']).length - 1; y++) {

            console.log(tour_array['krpano']['scene'][x]['hotspot'][y]['$']['name']);

            if (tour_array['krpano']['scene'][x]['hotspot'][y]['$']['linkedscene'] != null) {

                var hotspot = tour_array['krpano']['scene'][x]['hotspot'][y]['$'];

                // Retorna o titulo de um texto
                var texto_hotspot = returnSceneTitle(hotspot['linkedscene']);

                // Verifica se já existe
                var existe_hotspot = existeHotspotText(x, hotspot['name'] + '-text');

                if (!existe_hotspot.existe) {
                    tour_array['krpano']['scene'][x]['hotspot'].push(addHotspotText(hotspot['name'], texto_hotspot, hotspot['ath'], hotspot['atv']));
                }
                /*
                // Se existir ele atualiza
                else {
                    console.log(tour_array['krpano']['scene'][x]['hotspot'][existe_hotspot.id]);
                    tour_array['krpano']['scene'][x]['hotspot'][existe_hotspot.id]['$']
                }*/
            }




        }

    }
}

var tour_xml2 = utils.array2Xml(tour_array);
utils.gravarArquivo(__dirname + '/tour_modificado.xml', tour_xml2);


function returnSceneTitle(name_scene) {
    for (let i = 0; i <= Object.keys(scenes_array).length - 1; i++) {
        if (tour_array['krpano']['scene'][i]['$']['name'] == name_scene) {
            return tour_array['krpano']['scene'][i]['$']['title'];
        }
    }
}


function addHotspotText(name_hotspot, texto, ath, atv) {
    atv = Number(atv) + 10;
    return {
        '$': {
            name: name_hotspot + '-text',
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

function existeHotspotText(scene_id, name_hotspot_text) {

    var retorno = {
        existe: false,
        id: -1
    };

    for (let i = 0; i <= Object.keys(tour_array['krpano']['scene'][scene_id]['hotspot']).length - 1; i++) {
        if (tour_array['krpano']['scene'][scene_id]['hotspot'][i]['$']['name'] == name_hotspot_text) {
            retorno.existe = true;
            retorno.id = i;
            return retorno;
        }
    }

    return retorno;
}