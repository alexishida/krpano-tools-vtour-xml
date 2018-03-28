'use strict';

var fs = require('fs');
var xml2js = require('xml2js');

var parser = new xml2js.Parser();
var builder = new xml2js.Builder();

module.exports = {

    lerArquivo: function (path) {
        return fs.readFileSync(path, 'utf8');
    },
    gravarArquivo: function(path,conteudo) {

        fs.writeFile(path, conteudo, 'utf8', function (err) {
            if (err) {
                return console.log(err);
            }
            return "O arquivo foi gerado!";
        });

    },

    xml2Array: function (xml) {

        var error = null;
        var obj = null;
        parser.parseString(xml, function (innerError, innerObj) {

            error = innerError;
            obj = innerObj;
        });

        if (error) {

            throw error;
        }

        if (!error && !obj) {

            throw new Error('Ocorreu um erro ao converter xml para array!');
        }

        return obj;
    },
    array2Xml: function (dados) {
        return builder.buildObject(dados);
    }
};