var express = require("express");
var router = express.Router();

//---IMPORTACIÓN DE LAS 405 PELICULAS
var peliculas = require("./listado_peliculas");

//BUSCAR PELICULA DADO EL NOMBRE
router.get("/peliculas/buscar-por-nombre/:nombre", (request, response) => {
  try {
    let nombre = request.params.nombre
    // console.log("este es el nombre: "+nombre);
    let respuesta = {}
    for (let index = 0; index < peliculas.length; index++) {
      if (peliculas[index].nombre == nombre) {
        respuesta.estado = true
        respuesta.mensaje = "Se encontró la pelicula exitosamente"
        respuesta.cantidad = 1
        respuesta.datos = peliculas[index]
        console.log(respuesta);
        response.status(200).send(respuesta)
      }
    }
    respuesta.estado = true
    respuesta.mensaje = "No se ha encontrado la pelicula"
    respuesta.cantidad = 0
    response.status(200).send(respuesta)
  } catch (error) {
    console.log(error);
    response.status(400).send(error)
  }
})

router.get("/peliculas", function(req, res) {
  try {
    //Impresión de las peliculas en consola
    console.log(peliculas);
    console.log("Estoy en el get de peliculas");
    
    res.status(200).send({ mensaje: "Estoy en el get de peliculas" });
  } catch (error) {
    res.status(400).send({ mensaje: "Ha ocurrido un error!" });
  }
});

//ELIMINAR PELICULAS QUE NO TIENEN GENERO DEFINIDO
router.delete("/peliculas/eliminar-sin-genero", function(request, response) {
  let respuesta = {}
  try {
    let newArray = peliculas.filter(element => element.genero != "" && element.genero != null)
    // console.log("array original");
    // console.log(peliculas.length);
    // console.log("array nuevo");
    // console.log(newArray.length);
    if (peliculas.length-newArray.length != 0) {
      respuesta.estado = true
      respuesta.mensaje = "Peliculas sin genero eliminadas exitosamente"
      respuesta.cantidad = parseInt(peliculas.length)-parseInt(newArray.length)
    } else {
      respuesta.estado = true
      respuesta.mensaje = "La lista ya se encontraba filtrada"
      respuesta.cantidad = 0
    }
    response.status(200).send(respuesta)
  } catch (error) {
    respuesta.estado = false
    respuesta.mensaje = "Ha ocurrido un error"
    respuesta.informacion = error
    console.log(error);
    response.status(400).send(respuesta)
  }
});

//CONSULTAR PELICULAS POR UBICACION
router.get("/peliculas/buscar-por-ubicacion/:ubicacion", (request, response) => {
  let respuesta = {}
  try {
    let ubicacion = request.params.ubicacion
    let newArray = peliculas.filter(element => element.ubicacion == ubicacion)
    if (newArray.length != 0) {
      respuesta.estado = true
      respuesta.mensaje = "Consulta realizada con éxito"
      respuesta.cantidad = newArray.length
      respuesta.datos = newArray
    } else {
      respuesta.estado = true
      respuesta.mensaje = "No se encontraron películas en la ubicación proporcionada"
      respuesta.cantidad = 0
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
router.get("/peliculas/buscar-por-anio/:anio1/:anio2", (request, response) => {
  let respuesta = {}
  try {
    let anio1 = parseInt(request.params.anio1) // SI NO PONGO EL PARSE E INGRESO LETRAS ME GENERA CONSULTA CORRECTAMENTE
    let anio2 = parseInt(request.params.anio2)
    let newArray = peliculas.filter(element => element.anio >= anio1 && element.anio <= anio2)
    if (newArray.length != 0) {
      respuesta.estado = true
      respuesta.mensaje = "Se realizó la consulta de forma exitosa"
      respuesta.cantidad = newArray.length
      respuesta.datos = newArray
    } else {
      respuesta.estado = true
      respuesta.mensaje = "No se encontraron peliculas del año "+anio1+" al "+anio2
      respuesta.cantidad = 0
    }
    response.status(200).send(respuesta)
  } catch (error) {
    respuesta.estado = false
    respuesta.mensaje = "Ha ocurrido un error al consultar"
    respuesta.datos = error
    response.status(400).send(respuesta)
  }
});

//LISTAR TODAS LAS PELICULAS QUE EN SUS GENEROS CONTENGAN COMEDIA
router.get("/peliculas/listar-por-comedia/", (request, response) => {
  let respuesta = {}
 try {
   // para obtener las peliculas de comedia usé el filter para traer todas las peliculas que encontrara
   // y de condicion use el includes que al me dice si la palabra "Comedia" existe en el genero
    let newArray = peliculas.filter(element => element.genero.includes("Comedia"))
    console.log(newArray);
    console.log(newArray.length);
    if (newArray.length != 0) {
      respuesta.estado = true
      respuesta.mensaje = "Películas de genero comedia consultadas con éxito"
      respuesta.cantidad = newArray.length
      respuesta.datos = newArray
    } else {
      respuesta.estado = true
      respuesta.mensaje = "No se encontraron películas de genero comedia"
      respuesta.cantidad = 0
    }
    response.status(200).send(respuesta)
  } catch (error) {
    respuesta.estado = false
    respuesta.mensaje = "Ha ocurrido un error al consultar"
    respuesta.datos = error
  }
});

module.exports = router;
