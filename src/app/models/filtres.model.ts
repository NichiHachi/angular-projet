import { IAeroport } from './aeroport.model';

export interface IFiltres {
  aeroport: IAeroport;
  debut: Date;
  fin: Date;
}
