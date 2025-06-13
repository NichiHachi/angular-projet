import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { IVolDto, Vol } from './../models/vol.model';

@Injectable({
  providedIn: 'root'
})
export class VolService {

  private volsSubject = new BehaviorSubject<Vol[]>([]);
  vols = this.volsSubject.asObservable();

  private selectedVolSubject = new BehaviorSubject<Vol | null>(null);
  selectedVol$ = this.selectedVolSubject.asObservable();



  constructor(private http: HttpClient) { }

  /**
   * Récupération de la liste des vols en départ d'un aéroport donné en paramètre et selon un intervalle de temps donné.
   * Open Sky REST API
   * https://openskynetwork.github.io/opensky-api/rest.html#departures-by-airport
   */
  getVolsDepart(code: string, debut: number, fin: number): Observable<Vol[]> {
    return this.http.get<any>(`https://opensky-network.org/api/flights/departure?airport=${code}&begin=${debut}&end=${fin}`).pipe(
      map((response) => response
        .map((dto: IVolDto) => new Vol(dto))
    ));
  }

  getVolsArrivee(code: string, debut: number, fin: number): Observable<Vol[]> {
    return this.http.get<any>(`https://opensky-network.org/api/flights/arrival?airport=${code}&begin=${debut}&end=${fin}`).pipe(
      map((response) => response
        .map((dto: IVolDto) => new Vol(dto))
    ));
  }

  updateCurrentVols(vols: Vol[]): void {
    this.volsSubject.next(vols);
  }

  selectVol(vol: Vol): void {
    this.selectedVolSubject.next(vol);
  }
  

  isSelected(vol: Vol): boolean {
    return this.selectedVolSubject.value ? this.selectedVolSubject.value.icao === vol.icao : false;
  }

  clear(): void {
    this.selectedVolSubject.next(null);
    this.volsSubject.next([]);
  }
}
