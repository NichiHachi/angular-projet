import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IPassagerDto, Passager } from '../models/passager.model';

@Injectable({
  providedIn: 'root'
})
export class PassagerService {

  constructor(private http: HttpClient) { }

  getPassagers(icao: string): Observable<Passager[]> {
    const url = `https://randomuser.me/api?results=20&inc=name,email,picture&seed=a44c5a090d78d9a4`;

    return this.http.get<{ results: IPassagerDto[] }>(url).pipe(
      map(response => {
        return response.results.map(dto => new Passager(dto));
      })
    );
  }
}
