const xml2js = require('xml2js');
const READLINESYNC = require('readline-sync');
const fs = require("fs");

// Función que se encarga de saber si el usuario quiere buscar por ID o por cadena de texto
function buscar(){

    console.log("\n════════════════════════════════════════════════════════════════");
    console.log("                      Buscar una nota");
    console.log("════════════════════════════════════════════════════════════════");

    let opcionesBusqueda = ["ID","Cadena de texto"];

    console.log("\n¿Deseas buscar por el ID de la nota o el contenido de la nota?");
    busquedaElegida = READLINESYNC.keyInSelect(opcionesBusqueda, '>>> ',{ guide: false, cancel: false });

    if(busquedaElegida == 0){
        busquedaID();
    } else {
        busquedaCadena();
    }
}

// Función que se usa en caso de que se quiera buscar por el ID de la nota
function busquedaID()
{
    let parser = new xml2js.Parser();
    let encontrado = false;

    console.log("\nEscriba el id de la nota que quieras buscar");
    let id = READLINESYNC.question(">>> ");

    // Se lee el documento XML
    fs.readFile('./DATOSXML/notes.xml', function(err, data) {

        // Se convierte el XML en JSON
        parser.parseString(data, function (err, result) {
            
            // Se recorren las notas y se imprime aquella que coincida con el ID que ha escogido el usuario
            result.notas.nota.forEach(function (elem) {
            if(id == elem.id)
                {
                encontrado = true;
                console.log("\n≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡");
                console.log(`\nNota nº [${elem.id}]\n`);
                console.log(`    Titulo ►► ${elem.titulo}`);
                console.log(`\n    Texto ⬎\n    ${elem.texto}\n`);
                console.log(`Categoria ►► ${elem.categoria}`);
                console.log(`Fecha ►► ${elem.fecha}\n`);
                };
            });
        });

        // Nos sirve para avisar al usuario de si se ha realizado la modificación o no
        if(encontrado == false){
            console.log("\nNo has escrito un id correcto, vuelva a intentarlo.");
            console.log("≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡\n");
        } else {
            console.log("≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡\n");
        }
      });
}

// Función que se usa en caso de que se quiera buscar por una cadena de texto
function busquedaCadena()
{
    let parser = new xml2js.Parser();
    let encontrado = false;

    // Nos aseguramos de que el usuario nos de una cadena de texto a buscar
    while(true)
    {    
        console.log("\nEscriba la cadena de texto de la nota que quieras buscar");
        var cadena = READLINESYNC.question(">>> ");
        if(cadena.length == 0){
            console.log("\nEscriba algo para buscar");
            continue;
        };
        break;
    };

    // Revisamos si el usuario quiere buscar la cadena de texto en el titulo o el texto
    let opcionesCadenas = ["Titulo","Texto"];
    console.log("\nSeleccione donde desea buscar");
    var seleccion = READLINESYNC.keyInSelect(opcionesCadenas, '>>> ',{ guide: false, cancel: false });

    // Se lee el documento XML
    fs.readFile('./DATOSXML/notes.xml', function(err, data) {
        
        // Se transforma en JSON
        parser.parseString(data, function (err, result) {
            
            // Se recorren todas las notas
            result.notas.nota.forEach(function (elem) {
            
            // Si se ha seleccionado el titulo entrará en este if
            if(seleccion == 0)
            {
                // Entrará en este if si el string escrito se encuentra en alguna parte del titulo de la nota
                if(JSON.stringify(elem.titulo).toLowerCase().includes(cadena.toLowerCase()))
                    {
                        encontrado = true;
                        console.log("\n≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡");
                        console.log(`\nNota nº [${elem.id}]\n`);
                        console.log(`    Titulo ►► ${elem.titulo}`);
                        console.log(`\n    Texto ⬎\n    ${elem.texto}\n`);
                        console.log(`Categoria ►► ${elem.categoria}`);
                        console.log(`Fecha ►► ${elem.fecha}\n`);
                    };
            } 
            
            // Si se ha seleccionado el texto entrara en este otro if
            else {

                // Entrará en este if si el string escrito se encuentra en alguna parte del texto de la nota
                if(JSON.stringify(elem.texto).toLowerCase().includes(cadena.toLowerCase()))
                    {
                        encontrado = true;
                        console.log("\n≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡");
                        console.log(`\nNota nº [${elem.id}]\n`);
                        console.log(`    Titulo ►► ${elem.titulo}`);
                        console.log(`\n    Texto ⬎\n    ${elem.texto}\n`);
                        console.log(`Categoria ►► ${elem.categoria}`);
                        console.log(`Fecha ►► ${elem.fecha}\n`);
                    };
            }
            });
        });

        // Nos sirve para avisar al usuario de si se ha realizado la modificación o no
        if(encontrado == false){
            console.log(`\nNo se ha encontrado ninguna nota que contenga la cadena ${cadena}.`);
            console.log("≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡\n");
        } else {
            console.log("≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡\n");
        }
      });
}

// Exportamos la función buscar para poder llamarla desde app.js
module.exports.buscar = buscar;