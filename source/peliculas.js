var express = require("express");
var router = express.Router();

//---IMPORTACIÓN DE LAS 405 PELICULAS
var peliculas = require("./listado_peliculas");

//BUSCAR PELICULA DADO EL NOMBRE
router.get("/peliculas/:nombre", (request, response) => {
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
    respuesta.mensaje = "No se ha encontrado la pelicula"
    response.status().send(respuesta)
  } catch (error) {
    console.log(error);
    response.status(400).send(error)
  }
})

router.get("/peliculas", function(req, res) {
  try {
    //Impresión de las peliculas en consola
    // console.log(peliculas);
    console.log("Estoy en el get de peliculas");
    
    res.status(200).send({ mensaje: "Estoy en el get de peliculas" });
  } catch (error) {
    res.status(400).send({ mensaje: "Ha ocurrido un error!" });
  }
});

//ELIMINAR PELICULAS QUE NO TIENEN GENERO DEFINIDO
router.delete("/peliculas", function(request, response) {
  let respuesta = {}
  try {
    let newArray = peliculas.filter(element => element.genero != "" && element.genero != null)
    // console.log("array original");
    // console.log(peliculas.length);
    // console.log("array nuevo");
    // console.log(newArray.length);
    if (peliculas.length-newArray.length != 0) {
      respuesta.estado = true
      respuesta.cantidad = parseInt(peliculas.length)-parseInt(newArray.length)
      respuesta.mensaje = "Peliculas sin genero eliminadas exitosamente"
    } else {
      respuesta.estado = true
      respuesta.cantidad = 0
      respuesta.mensaje = "La lista ya se encontraba filtrada"
    }
    response.status(200).send(respuesta)
  } catch (error) {
    respuesta.estado = false
    respuesta.cantidad = 0
    respuesta.mensaje = "Ha ocurrido un error"
    respuesta.informacion = error
    console.log(error);
    response.status(400).send(respuesta)
  }
});

//CONSULTAR PELICULAS POR UBICACION
router.get("/peliculas/ubicacion/:ubicacion", (request, response) => {
  let respuesta = {}
  try {
    let ubicacion = request.params.ubicacion
    let newArray = peliculas.filter(element => element.ubicacion == ubicacion)
    if (newArray.length != 0) {
      respuesta.estado = true
      respuesta.datos = newArray
      respuesta.cantidad = newArray.length
      respuesta.mensaje = "Consulta realizada con éxito"
    } else {
      respuesta.estado = true
      respuesta.cantidad = 0
      respuesta.mensaje = "No se encontraron películas en la ubicación proporcionada"
    }
    response.status(200).send(respuesta)
  } catch (error) {
    respuesta.estado = false
    respuesta.mensaje = "Ha ocurrido un error"
    respuesta.error = error
    response.status(400).send(respuesta)
  }
});

//CONSULTAR PELICULAS ENTRE DOS AÑOS PASADOS POR PARAMETRO
router.get("/peliculas/anio/:anio1/:anio2", (request, response) => {
  let respuesta = {}
  try {
    let anio1 = parseInt(request.params.anio1) // SI NO PONGO EL PARSE E INGRESO LETRAS ME GENERA CONSULTA CORRECTAMENTE
    let anio2 = parseInt(request.params.anio2)
    let newArray = peliculas.filter(element => element.anio >= anio1 && element.anio <= anio2)
    if (newArray.length != 0) {
      respuesta.estado = true
      respuesta.datos = newArray
      respuesta.cantidad = newArray.length
      respuesta.mensaje = "Se realizó la consulta de forma exitosa"
    } else {
      respuesta.estado = true
      respuesta.cantidad = 0
      respuesta.mensaje = "No se encontraron peliculas del año "+anio1+" al "+anio2
    }
    response.status(200).send(respuesta)
  } catch (error) {
    respuesta.estado = false
    respuesta.mensaje = "Ha ocurrido un error al consultar"
    respuesta.datos = error
    response.status(400).send(respuesta)
  }
});

router.get("/peliculas/comedia", (request, response, next) => {
  // let newArray = {} //peliculas.filter(element => element.genero == "comedia")
  //   console.log(newArra);
  //   console.log("peliculas de comedia");
  //   console.log(newArray.length);
  //   response.status(200).send(newArray.length)
  response.statusCode(200).send("respuesta") //ME GENERA ERROR ASÍ EL ENDPOINT ESTE VACIO TOTALMENTE, ERROR "ERR_HTTP_INVALID_STATUS_CODE"
})

module.exports = router;
