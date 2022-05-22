const fs = require("fs");
var xml2js = require('xml2js');

// Función para obtener la fecha en el formato que se necesita
function obtFechaHoy()
{
    let date_ob = new Date();

    let dia = date_ob.getDate();
    if(dia < 10){ dia = "0" + dia};

    let mes = date_ob.getMonth() + 1;
    if(mes < 10){ mes = "0" + mes};

    let anyo = date_ob.getFullYear();

    let hora = date_ob.getHours();
    if(hora < 10){ hora = "0" + hora};

    let minutos = date_ob.getMinutes();
    if(minutos < 10){ minutos = "0" + minutos};

    let fechaCompleta = `${dia}/${mes}/${anyo} -- ${hora}:${minutos}`;

    return fechaCompleta;
}

// Función para añadir la nueva nota a la base de datos
function anyadirNodo(tit,text,cat)
{
    // Se lee el documento XML con las notas
    fs.readFile("./DATOSXML/notes.xml", "utf-8", (err, data) => {
        if (err) {
            throw err;
        }
    
        // Se convierte el documento XML en un JSON
        xml2js.parseString(data, (err, result) => {
            if (err) {
                throw err;
            }
    
            // Se crea una constante con la información del nuevo nodo
            const nuevaNota = {
                id: parseInt(result.notas.nota.at(-1).id) + 1,
                titulo: tit,
                texto:text,
                fecha:obtFechaHoy(),
                categoria:cat
            };
            
            // Añade la nueva nota al JSON que se ha creado con las notas
            result.notas.nota.push(nuevaNota);
    
            // Convierte JSON a XML de nuevo
            const builder = new xml2js.Builder();
            const xml = builder.buildObject(result);
    
            // Escribe de nuevo la información del JSON al XML
            fs.writeFile("./DATOSXML/notes.xml", xml, (err) => {
                if (err) {
                    throw err;
                }
                console.log("\nSe ha creado correctamente una nueva nota.  (⌐■_■)");
                console.log("≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡\n")
            });
    
        });
    });
}

// Exportar funciones de este fichero a otros ficheros.
module.exports.anyadirNodo = anyadirNodo;
module.exports.obtFechaHoy = obtFechaHoy;