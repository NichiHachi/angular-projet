import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Passager } from '../../models/passager.model';
import { MatIcon } from '@angular/material/icon';
import { ClasseVolColorDirective } from '../classe-vol-color';
import { BagageSouteValidationDirective } from '../bagage-soute-validation';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-passager',
  standalone: true,
  imports: [CommonModule, MatIcon, ClasseVolColorDirective, BagageSouteValidationDirective, MatTooltipModule],
  templateUrl: './passager.component.html',
  styleUrls: ['./passager.component.scss']
})
export class PassagerComponent {
  @Input() passager!: Passager;
  @Input() afficherPhoto: boolean = false;
}
