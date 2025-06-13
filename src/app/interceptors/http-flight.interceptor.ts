import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Observable, of } from "rxjs";
import { IVolDto } from "../models/vol.model";
import { AEROPORTS } from "../constants/aeroport.constant";
import { COMPAGNIES } from "../constants/compagnie.constant";

/**
 * Petit Hack puisque l'API de récupération des vols n'est pas forcément efficace à 100%
 * Nous mettons en place un intercepteur qui va générer aléatoirement des vols Air France Groupe.
 * Dans les faits, la requête http est bien émise depuis le service vol.service
 * mais la requête est interceptée ici, puis on détecte si l'on souhaite générer des vols de départs ou d'arrivées
 * et enfin on renvoie une réponse http, comme le ferait une requête http en succès
 * qui contient notre liste de vols.
 */
export const httpCalculInterceptor: HttpInterceptorFn = (req, next) => {
    console.log(req);
    if (req.url.includes("/flights/departure")) {
        console.log('Loaded from mock : ' + req.url);

        const icao = req.url.split('airport=')[1].split('&')[0];
        return of(new HttpResponse({ status: 200, body: generateVols("departure", icao) }));
    } else if (req.url.includes("/flights/arrival")) {
        console.log('Loaded from mock : ' + req.url);

        const icao = req.url.split('airport=')[1].split('&')[0];
        return of(new HttpResponse({ status: 200, body: generateVols("arrival", icao) }));
    }

    console.log('Loaded from http call :' + req.url);
    return next(req);
};

function generateVols(type: "departure" | "arrival", icao: string): IVolDto[] {
    let vols: IVolDto[] = [];
    const nbVols = Math.floor(Math.random() * 20) + 1;
    for (let i = 0; i < nbVols; i++) {
        const icaoBis = AEROPORTS[(AEROPORTS.findIndex((aeroport$) => aeroport$.icao === icao) + (Math.floor(Math.random() * (AEROPORTS.length - 1)) + 1)) % AEROPORTS.length].icao;
        // pour notre génération aléatoire, on néglige tous les paramètres inutiles à ce TD
        vols.push({
            icao24: randomString(6),
            callsign: Object.keys(COMPAGNIES)[Math.floor(Math.random() * Object.keys(COMPAGNIES).length)] + randomString(3),
            estDepartureAirport: type === "departure" ? icao : icaoBis,
            estArrivalAirport: type === "departure" ? icaoBis : icao
        } as IVolDto);
    }
    return vols;
}

function randomString(length: number) {
    var randomChars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}
