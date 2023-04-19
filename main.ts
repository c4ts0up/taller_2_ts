import {series} from './data.js';
import {Serie} from './serie';

console.log(series);

let seriesTable: HTMLElement = document.getElementById("tablaSeries")!;
let temporadasPromedio: HTMLElement = document.getElementById("temporadasPromedio")!;
let descripcionSerie: HTMLElement = document.getElementById("descripcionSerie")!;


/**
 * Ejecución de funciones
 */
mostrarSeries(series);
getTemporadasPromedio(series);


/**
 * Da el código HTML para imprimir las series
 * @param series lista de Serie
 */
function mostrarSeries(series: Serie[]): void {
    let tbodySerie = document.createElement("tbody");
    
    // encabezados
    let encabezados: HTMLElement = document.createElement("tr")
    encabezados.innerHTML = `<th>#</th>
    <th>Name</th>
    <th>Channel</th>
    <th>Seasons</th>`;

    tbodySerie.appendChild(encabezados);

    for (let serie of series) {
        let trElement: HTMLElement = document.createElement("tr");

        trElement.innerHTML = `<td><b>${serie.id}</b></td>
        <td><a>${serie.nombre}</a></td>
        <td>${serie.canal}</td>
        <td>${serie.numero_temporadas}</td>`

        // TODO: no logré poner el hipervínculo sin que desapareciera de inmediato la tarjeta de descripción
        // when the column of serie.nombre is clicked on, it shows the description of the serie
        trElement.addEventListener("click", () => {
            getDescripcionSerie(serie);
        });

        tbodySerie.appendChild(trElement);
    }

    seriesTable.appendChild(tbodySerie);
}


/**
 * Consigue el promedio de temporadas para todas las series
 * @param series 
 */
function getTemporadasPromedio(series: Serie[]): void {
    let promedio: number = 0;
    for (let serie of series) {
        promedio += serie.numero_temporadas;
    }
    promedio /= series.length;

    // parte de HTML
    let pElement = document.createElement("p")
    pElement.innerHTML = `Seasons average: ${promedio.toFixed(0)}`;

    temporadasPromedio.appendChild(pElement);
}


/**
 * Da el Bootstrap Card para la serie especificadad
 * @param serie Serie a mostrar
 */
function getDescripcionSerie(serie: Serie): void {
    // limpiar
    descripcionSerie.innerHTML = "";

    let cardDiv = document.createElement("div");
    cardDiv.classList.add("card");

    // TODO: las imágenes no cargaban con URLs a imgur. A pesar de que es una mala práctica, descargué las imágenes y cambié data.ts para que las imágenes vinculadas fueran las descargadas; funcionó.
    // imagen de la serie
    let imagen = document.createElement("img");
    imagen.classList.add("card-img-top");
    imagen.src = serie.foto;
    imagen.setAttribute("alt", `Foto de la serie "${serie.nombre}"`);

    // cuerpo
    let cuerpo: HTMLElement = document.createElement("div");
    cuerpo.classList.add("card-body");

    // descripcion de la serie
    let descripcion: HTMLElement = document.createElement("p");
    descripcion.classList.add("card-text");
    descripcion.innerHTML = `${serie.descripcion}`;

    // vinculo
    let vinculo: HTMLElement = document.createElement("p");
    vinculo.classList.add("card-text");
    vinculo.innerHTML = `<a href=${serie.link}>${serie.link}</a>`;

    cuerpo.appendChild(descripcion);
    cuerpo.appendChild(vinculo);

    cardDiv.appendChild(imagen);
    cardDiv.appendChild(cuerpo);

    descripcionSerie.appendChild(cardDiv);
}