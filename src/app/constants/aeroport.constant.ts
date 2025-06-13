import { IAeroport } from "../models/aeroport.model";

/**
 * Liste des principaux aéroports français et leur code ICAO
 * https://airportcodes.io/en/country/france/
 */
export const AEROPORTS: IAeroport[] = [
  {
    icao: 'LFOA',
    nom: 'Avord (BA 702) Air Base',
    ville: 'Avord'
  },
  {
    icao: 'LFBD',
    nom: 'Bordeaux-Mérignac Airport',
    ville: 'Bordeaux'
  },
  {
    icao: 'LFPG',
    nom: 'Paris-Charles de Gaulle Airport',
    ville: 'Paris'
  },
  {
    icao: 'LFSB',
    nom: 'EuroAirport Basel-Mulhouse-Freiburg Airport',
    ville: 'Bâle/Mulhouse'
  },
  {
    icao: 'LFLL',
    nom: 'Lyon Saint-Exupéry Airport',
    ville: 'Lyon'
  },
  {
    icao: 'LFML',
    nom: 'Marseille Provence Airport',
    ville: 'Marseille'
  },
  {
    icao: 'LFMN',
    nom: 'Nice-Côte d\'Azur Airport',
    ville: 'Nice'
  },
  {
    icao: 'LFPO',
    nom: 'Paris-Orly Airport',
    ville: 'Paris'
  },
  {
    icao: 'LFBO',
    nom: 'Toulouse-Blagnac Airport',
    ville: 'Toulouse/Blagnac'
  }
]
