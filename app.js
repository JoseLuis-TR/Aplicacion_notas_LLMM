const READLINESYNC = require('readline-sync');
const fs = require("fs");
const insert = require("./insert");
const search = require("./search");
const modify = require("./modify");
const xml2js = require('xml2js');

// Esta función nos sirve para preguntar los datos para crear una nueva nota, los muestra al usuario y si este los confirma
// llama a la función anyadirNodo() que se encuentra en el archivo insert.js que se encarga de añadir la nueva nota.
function insertar(){
    console.log("\n════════════════════════════════════════════════════════════════")
    console.log("                    Insertar nueva nota")
    console.log("════════════════════════════════════════════════════════════════\n")

    let categoriasValidas = ["Nota","Lista","Recuerdo","Diario","Apuntes"]

    console.log("Escriba un titulo para la nueva nota")
    let titulo = READLINESYNC.question(">>> ")

    console.log("\nEscriba el contenido de la nota:")
    let texto = READLINESYNC.question(">>> ")

    console.log("\nEscoja la categoria de la nota:")
    catElegida = READLINESYNC.keyInSelect(categoriasValidas, '>>> ',{ guide: false, cancel: false });

    while(true){
        let opcionesSN = ["S","N"];
        console.log("\n≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡");
        console.log("\nTitulo ►► " + titulo);
        console.log("\n    Texto ⬎\n     " + texto + "\n");
        console.log("Categoria ►► " + categoriasValidas[catElegida]);
        console.log("\n≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡\n");
        console.log("\n¿Quieres crear una nota con estos datos?");
        opcion = READLINESYNC.keyInSelect(opcionesSN, '>>> ',{ guide: false, cancel: false });
        if(opcion == 0){
            insert.anyadirNodo(titulo,texto,categoriasValidas[catElegida]);
            return;
        } else {
            console.log("\nNo creaste ninguna nota.")
            console.log("≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡\n")
            return;
        }
    }
}

// Función que nos sirve para imprimir todas las notas almacenadas en el archivo XML.
function imprimir(){
    let parser = new xml2js.Parser();

    console.log("\n════════════════════════════════════════════════════════════════")
    console.log("                      Notas almacenadas")
    console.log("════════════════════════════════════════════════════════════════")

    // Se lee el archivo XML dentro de la variable data
    fs.readFile('./DATOSXML/notes.xml', "utf-8",function(err, data) {
        if (err) {
            throw err;
        }
        // Se convierte el archivo XML en un JSON
        parser.parseString(data, function (err, result) {
            if (err) {
                throw err;
            }
            
            // Se itera por el JSON con los datos del XML para mostrarlos por pantalla
            result.notas.nota.forEach(function (elem) 
            {
                console.log("\n≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡");
                console.log(`\nNota nº [${elem.id}]\n`);
                console.log(`    Titulo ►► ${elem.titulo}`);
                console.log(`\n    Texto ⬎\n    ${elem.texto}\n`);
                console.log(`Categoria ►► ${elem.categoria}`);
                console.log(`Fecha ►► ${elem.fecha}`);
            }
          );
        console.log("\n≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡\n");
        });
      });
}

// Función que nos sirve para seleccionar cual opción es la que deseamos ejecutar en el programa
function opciones(){
    console.log("\n╔════════════════════════════════════════════════════════════════════════╗")
    console.log("\n║  ヘ(￣ω￣ヘ)   Selecciona una de las posibles opciones   (ヘ￣ω￣)ヘ   ║\n")
    console.log("╚════════════════════════════════════════════════════════════════════════╝\n")

    const opcionesValidas = [' - Insertar nueva nota',' - Imprimir todas las notas almacenadas',' - Modificar una nota',' - Buscar una nota']

    let index = READLINESYNC.keyInSelect(opcionesValidas, '>>> ',{ guide: false, cancel: ' - Cerrar el programa' });
    
    return index
}

// Función que inicia el programa llamando a la función de opciones y dependiendo de la opción llama a la función que toque.
function inicioPrograma(){

    let opcionElegida = opciones()
    
    switch(opcionElegida){
        case 0:
            insertar()
            break;
        case 1:
            imprimir();
            break;
        case 2:
            modify.modificar()
            break;
        case 3:
            search.buscar()
            break;
        case -1:
            break;
    }
}

inicioPrograma()
                                                                                                                                                           
