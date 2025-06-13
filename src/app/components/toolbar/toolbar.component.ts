import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { VolService } from '../../services/vol.service';

@Component({
  selector: 'app-toolbar',
  imports: [MatToolbarModule, MatButtonModule],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  constructor(private navigationHelper: Router, private flightDataService: VolService) { }

  toDecollages(): void {
    this.navigationHelper.navigateByUrl(`/decollages`);
    this.flightDataService.clear();
  }

  toAtterrissages(): void {
    this.navigationHelper.navigateByUrl(`/atterrissages`);
    this.flightDataService.clear();
  }
}
