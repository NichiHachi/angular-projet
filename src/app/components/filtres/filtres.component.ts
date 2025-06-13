import { Component, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import { MAT_DATE_RANGE_SELECTION_STRATEGY } from '@angular/material/datepicker';
import { AEROPORTS } from './../../constants/aeroport.constant';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { IAeroport } from '../../models/aeroport.model';
import { ThreeDayRangeSelectionStrategy } from '../../date-adapter';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import {MatCommonModule} from '@angular/material/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { VolService } from '../../services/vol.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-filtres',
    templateUrl: './filtres.component.html',
    styleUrls: ['./filtres.component.scss'],
    imports: [MatIconModule, MatButtonModule, MatInputModule,
        MatFormFieldModule, MatSelectModule, MatDatepickerModule, MatCommonModule, CommonModule, FormsModule],
    providers: [
        provideNativeDateAdapter(),
        { provide: LOCALE_ID, useValue: 'fr' },
        { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
        {
            provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
            useClass: ThreeDayRangeSelectionStrategy,
        },
    ],
    encapsulation: ViewEncapsulation.None
})
export class FiltresComponent {

  /**
   * La liste des aéroports disponibles est une constante,
   * on n'utilise que les principaux aéroports français pour l'instant
   */
  aeroports: IAeroport[] = AEROPORTS;
  isDecollages: boolean = true;

  constructor(private volService: VolService, private router: Router) {
        this.isDecollages = this.router.url.includes('decollages');
   }

  choosenAeroport: IAeroport | null = null;
  dateDebut: Date | null = null;
  dateFin: Date | null = null;
  appliquerFiltres(): void {

    if (this.choosenAeroport && this.dateDebut && this.dateFin) {
      const debutTimestamp = this.dateDebut.getTime() / 1000;
      const finTimestamp = this.dateFin.getTime() / 1000;

      if( this.isDecollages) {
      this.volService.getVolsDepart(this.choosenAeroport.icao, debutTimestamp, finTimestamp)
        .subscribe(vols => {
          this.volService.updateCurrentVols(vols);
        });
    }
    else {
        this.volService.getVolsArrivee(this.choosenAeroport.icao, debutTimestamp, finTimestamp)
          .subscribe(vols => {
            this.volService.updateCurrentVols(vols);
          });
        }
    }
  }
}
