import { Component, Input } from '@angular/core';
import { Vol } from '../../models/vol.model';
import { MatIcon } from '@angular/material/icon';
import { COMPAGNIES } from '../../constants/compagnie.constant';
import { CommonModule } from '@angular/common';
import { VolService } from '../../services/vol.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vol',
  standalone: true,
  imports: [MatIcon, CommonModule],
  templateUrl: './vol.component.html',
  styleUrls: ['./vol.component.scss']
})
export class VolComponent {
  @Input() vol: Vol | null = null;
  isAtterrissage: boolean = false;

  constructor(private flightDataProvider: VolService, private navigationService: Router) {
    this.isAtterrissage = this.navigationService.url.includes('atterrissages');
  }

  get compagnieLogo(): string | null {
    if (!this.vol) return null;
    switch (this.vol.compagnie) {
      case COMPAGNIES.AFR:
        return 'assets/Air France.png';
      case COMPAGNIES.HOP:
        return 'assets/Air France Hop.png';
      case COMPAGNIES.TVF:
        return 'assets/Transavia France.png';
      default:
        return null;
    }
  }

  selectVol(): void {
    if (this.vol) {
      this.flightDataProvider.selectVol(this.vol);
    }
  }

  isSelected(): boolean {
    if (!this.vol) return false;
    return this.flightDataProvider.isSelected(this.vol);
  }
}
