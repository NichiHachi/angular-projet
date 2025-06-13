import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Passager } from '../../models/passager.model';
import { PassagerComponent } from '../passager/passager.component';
import { PassagerService } from '../../services/passager.service';
import { VolService } from '../../services/vol.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-liste-passagers',
  standalone: true,
  imports: [CommonModule, PassagerComponent, MatSlideToggleModule, FormsModule],
  templateUrl: './liste-passagers.component.html',
  styleUrls: ['./liste-passagers.component.scss']
})
export class ListePassagersComponent {
  passagers: Passager[] = [];
  afficherPhotos = false;

  constructor(private travelerDataProvider: PassagerService, private flightDataManager: VolService) {
    this.flightDataManager.selectedVol$.subscribe(flightData => {
      flightData ? this.loadPassagers() : this.passagers = [];
    });
  }

  private loadPassagers(): void {
    this.flightDataManager.selectedVol$.subscribe(flightData => {
      if (flightData) {
        this.travelerDataProvider.getPassagers(flightData.icao).subscribe(retrievedPassagers => {
          this.passagers = retrievedPassagers;
        });
      }
    });
  }
}
