const READLINESYNC = require('readline-sync');
const fs = require("fs");
const xml2js = require('xml2js');
const insert = require("./insert");

// Función que pregunta que es lo que se desea modificar, el id de la nota a modificar y el nuevo texto
function modificar()
{
    let modificaciones = ["Titulo","Texto"];
    console.log("\nSeleccione que es lo que desea modificar");
    modElegido = READLINESYNC.keyInSelect(modificaciones, '>>> ',{ guide: false, cancel: false });

    console.log(`\nEscribe el id de la nota a la que quieras modificar el ${modificaciones[modElegido].toLowerCase()}:`);
    let id = READLINESYNC.question(">>> ");

    console.log(`\nEscriba el nuevo ${modificaciones[modElegido].toLowerCase()} que desea colocar:`);
    let newMod = READLINESYNC.question(">>> ");

    realizarMod(modElegido,id,newMod);
}

// Función que se encarga de realizar la modifcación
function realizarMod(mod,id,newMod)
{
    let parser = new xml2js.Parser();
    let encontrado = false

    //Se lee el documento XML con las notas
    fs.readFile('./DATOSXML/notes.xml', function(err, data) {
        if (err) {
            throw err;
        }

        // Se convierte el documento XML en un JSON
        parser.parseString(data, function (err, result) {
            if (err) {
                throw err;
            }
            
            // Se recorre cada nota del JSON
            result.notas.nota.forEach(function (elem) {
            // Si el id de la nota es el que el usuario a escrito se realiza la modificación
            if(id == elem.id)
                {
                    // 0 significa que el usuario quiere modificar el titulo de la nota elegida
                    if(mod == 0){
                        encontrado = true;
                        elem.titulo = newMod;
                        elem.fecha = insert.obtFechaHoy();
                    }
                    
                    // Si no, lo que se modificará es el texto de la nota
                    else {
                        encontrado = true;
                        elem.texto = newMod;
                        elem.fecha = insert.obtFechaHoy();
                    };
                };
            });
            
            // El cambio que se haya realizado se escribe en el documento XML original
            var builder = new xml2js.Builder();
            var xml = builder.buildObject(result);
            fs.writeFile("./DATOSXML/notes.xml", xml, function(err, data) {
            if (err) console.log(err);});

        });

        // Nos sirve para avisar al usuario de si se ha realizado la modificación o no
        if(encontrado == false){
            console.log("\nNo has escrito un id correcto, vuelva a intentarlo.");
            console.log("≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡\n");
        } else {
            console.log("\nSe ha modificado correctamente la nota");
            console.log("≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡\n");
        }
      });
}

// Exportamos la función modificar para poder llamarla desde app.js
module.exports.modificar = modificar;