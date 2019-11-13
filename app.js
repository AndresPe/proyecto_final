var express = require("express");
var cors = require("cors");

var app = express();

app.use(cors());
app.use(express.json());

//Ruta del endpoint de peliculas
app.use("/api/v1/", require("./source/peliculas"));

//error
app.use(function(err, req, res, next) {
  res.status(404).send({ mensaje: "Endpoint no encontrado. :(" });
});

//run app
const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log(`Api corriendo en http://localhost:${port}/api/v1/`);
});
