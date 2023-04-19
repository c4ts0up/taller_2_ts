import { series } from './data.js';
console.log(series);
var seriesTable = document.getElementById("tablaSeries");
var temporadasPromedio = document.getElementById("temporadasPromedio");
var descripcionSerie = document.getElementById("descripcionSerie");
/**
 * Ejecución de funciones
 */
mostrarSeries(series);
getTemporadasPromedio(series);
/**
 * Da el código HTML para imprimir las series
 * @param series lista de Serie
 */
function mostrarSeries(series) {
    var tbodySerie = document.createElement("tbody");
    // encabezados
    var encabezados = document.createElement("tr");
    encabezados.innerHTML = "<th>#</th>\n    <th>Name</th>\n    <th>Channel</th>\n    <th>Seasons</th>";
    tbodySerie.appendChild(encabezados);
    var _loop_1 = function (serie) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td><b>".concat(serie.id, "</b></td>\n        <td><a>").concat(serie.nombre, "</a></td>\n        <td>").concat(serie.canal, "</td>\n        <td>").concat(serie.numero_temporadas, "</td>");
        // when the column of serie.nombre is clicked on, it shows the description of the serie
        trElement.addEventListener("click", function () {
            getDescripcionSerie(serie);
        });
        tbodySerie.appendChild(trElement);
    };
    for (var _i = 0, series_1 = series; _i < series_1.length; _i++) {
        var serie = series_1[_i];
        _loop_1(serie);
    }
    seriesTable.appendChild(tbodySerie);
}
/**
 * Consigue el promedio de temporadas para todas las series
 * @param series
 */
function getTemporadasPromedio(series) {
    var promedio = 0;
    for (var _i = 0, series_2 = series; _i < series_2.length; _i++) {
        var serie = series_2[_i];
        promedio += serie.numero_temporadas;
    }
    promedio /= series.length;
    // parte de HTML
    var pElement = document.createElement("p");
    pElement.innerHTML = "Seasons average: ".concat(promedio.toFixed(0));
    temporadasPromedio.appendChild(pElement);
}
/**
 * Da el Bootstrap Card para la serie especificadad
 * @param serie Serie a mostrar
 */
function getDescripcionSerie(serie) {
    // limpiar
    descripcionSerie.innerHTML = "";
    var cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    // imagen de la serie
    var imagen = document.createElement("img");
    imagen.classList.add("card-img-top");
    imagen.src = serie.foto;
    imagen.setAttribute("alt", "Foto de la serie \"".concat(serie.nombre, "\""));
    // cuerpo
    var cuerpo = document.createElement("div");
    cuerpo.classList.add("card-body");
    // descripcion de la serie
    var descripcion = document.createElement("p");
    descripcion.classList.add("card-text");
    descripcion.innerHTML = "".concat(serie.descripcion);
    // vinculo
    var vinculo = document.createElement("p");
    vinculo.classList.add("card-text");
    vinculo.innerHTML = "<a href=".concat(serie.link, ">").concat(serie.link, "</a>");
    cuerpo.appendChild(descripcion);
    cuerpo.appendChild(vinculo);
    cardDiv.appendChild(imagen);
    cardDiv.appendChild(cuerpo);
    descripcionSerie.appendChild(cardDiv);
}
