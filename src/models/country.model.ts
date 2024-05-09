import { IFlagsDetails } from './flagsDetails.model';
import { INameDetails } from './nameDetails.model';

export interface ICountry {
  id: string;
  name: INameDetails;
  capital: string[];
  region: string;
  subRegion: string;
  population: number;
  flags: IFlagsDetails;
}
