import { Component, OnInit, OnDestroy } from '@angular/core';
import { Vol } from '../../models/vol.model';
import { VolService } from '../../services/vol.service';
import { VolComponent } from '../vol/vol.component';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liste-vols',
  standalone: true,
  imports: [VolComponent, CommonModule],
  templateUrl: './liste-vols.component.html',
  styleUrls: ['./liste-vols.component.scss']
})
export class ListeVolsComponent implements OnInit, OnDestroy {

  vols: Vol[] = [];
  isDecollages: boolean = true;
  private subscriptionHandler = new Subscription();

  constructor(private flightDataService: VolService, private navigationTool: Router) { }

  ngOnInit() {
    this.isDecollages = this.navigationTool.url.includes('decollages');
    this.subscriptionHandler.add(
      this.flightDataService.vols.subscribe(flightCollection => {
        this.vols = flightCollection;
      })
    );
  }

  ngOnDestroy() {
    if (this.subscriptionHandler) {
      this.subscriptionHandler.unsubscribe();
    }
  }
}
