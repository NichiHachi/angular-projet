import { Component, OnInit } from '@angular/core';
import { FiltresComponent } from '../filtres/filtres.component';
import { ListeVolsComponent } from '../liste-vols/liste-vols.component';
import { ListePassagersComponent } from '../liste-passagers/liste-passagers.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-airfrance',
  standalone: true,
  imports: [FiltresComponent, ListeVolsComponent, ListePassagersComponent],
  templateUrl: './view-airfrance.component.html',
  styleUrls: ['./view-airfrance.component.scss']
})
export class ViewAirFranceComponent implements OnInit {
  isAtterrissage: boolean = false;
  isDecollage: boolean = true;

  constructor(private routerNavigation: Router) { }

  ngOnInit(): void {
    this.isAtterrissage = this.routerNavigation.url.includes('atterrissages');
    this.isDecollage = this.routerNavigation.url.includes('decollages');
  }
}
