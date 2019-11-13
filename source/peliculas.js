var express = require("express");
var router = express.Router();

//---IMPORTACIÓN DE LAS 405 PELICULAS
var peliculas = require("./listado_peliculas");

router.get("/pelicula/:nombre", (request, response)=>{
  try {
    let nombre = request.params.nombre
    // console.log("este es el nombre: "+nombre);
    let respuesta = {}
    for (let index = 0; index < peliculas.length; index++) {
      if (peliculas[index].nombre == nombre) {
        respuesta.datos = peliculas[index]
        respuesta.cantidad = 1
        respuesta.mensaje = "Se encontró la pelicula exitosamente"
        console.log(respuesta);
        response.send(respuesta)
      }
    }
    respuesta.datos = "error"
    respuesta.cantidad = 0
    respuesta.mensaje = "la pelicula no existe"
    response.send(respuesta)
  } catch (error) {
    console.log(error);
    response.status(400).send(error)
  }
})

router.get("/peliculas", function(req, res, next) {
  try {
    //Impresión de las peliculas en consola
    // console.log(peliculas);
    console.log("Estoy en el get de peliculas");
    
    res.status(200).send({ mensaje: "Estoy en el get de peliculas" });
  } catch (error) {
    res.status(400).send({ mensaje: "Ha ocurrido un error!" });
  }
});

router.delete("/peliculas", function(req, res, next) {
  try {
    var newArrar = [] 
    let indexNewArray = 0;
    // console.log(peliculas[indexNewArray]);
    for (let index = 0; index < peliculas.length; index++) {
        if (peliculas[index].genero != "") {
            newArrar[indexNewArray] = peliculas[index]
            indexNewArray = indexNewArray + 1
        }
    }
  console.log("peliculas filtradas");
  console.log(newArray);
  response.status(200).send(newArrar)
  res.status(200).send({
    mensaje: "ESTOY EN EL ENDPOINT DE DELETE"
  });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      mensaje: "error"
    });
  }
  
  
  
});

module.exports = router;
