import { Routes } from '@angular/router';
import { ViewAirFranceComponent } from './components/view-airfrance/view-airfrance.component';

export const routes: Routes = [
  {
    path: 'decollages', component: ViewAirFranceComponent
  },
  {
    path: 'atterrissages', component: ViewAirFranceComponent
  },
  {
    path: '**', redirectTo: 'decollages'
  }
];
