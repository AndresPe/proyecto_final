# PRACTICA [50ptos]

Una tienda virtual de películas le pide ayuda para filtrar unas películas de la base de datos, para hacer las pruebas le dieron 405 películas las cuales debe de manipular, le solicitaron:

1. [10ptos] Eliminar las películas que no tienen género o esta vació.
2. [10ptos] Listar las películas de comedia. Tener en cuenta que una película puede tener varios generos.
3. [10ptos] Listar las películas de acuerdo a la ubicación que se le envié como parámetro.
4. [10ptos] Buscar una película por nombre.
5. [10ptos] Listar las películas que esten entre dos años que reciba como parámetro.
6. Bonificación si lo sube al git

## NOTA:

La información que se retorne siempre debe mostrar un mensaje, los datos y la cantidad de datos afectados, eliminados o consultados.
{ datos: [], cantidad:0, mensaje:’’ }

## IMPORTANTE:

1. Tiempo máximo: 2 horas.
2. Comprimir el archivo con el nombre: [dllo-web] apellidos_nombres ejm: [dllo-web] cartagena_juanita
3. Enviar al correo saurrego@udem.edu.co el archivo comprimido con el asunto: [dllo-web] apellidos_nombres parcial

## AYUDA

1. ¿Como capturar parametros? /:nombreParam
   R.= req.params.nombreParam
2. ¿Como capturar un query? /miurl/?param1=valor1&param2?valor2
   R.= req.query
3. ¿Como obtener el body?
   R.= req.body
4. ¿Como saber si un string contiene una palabra?
   R.= mistring.includes("mibusqueda")
