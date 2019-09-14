import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Waypoint } from '../models/waypoint';
import { CoordinateService } from './coordinate.service';
import { DMSDisplayPipe } from '../pipes/dms-display.pipe';

@Injectable({
  providedIn: 'root'
})
export class CsvGeneratorService {
  private dmsDisplayPipe: DMSDisplayPipe;

  constructor(private readonly coordinateService: CoordinateService) {
    this.dmsDisplayPipe = new DMSDisplayPipe(coordinateService);
   }

  public csvOutput = new Subject<string>();

  public generateCsv(waypoints: Waypoint[]): void {
    let csvString = "Name,Symbol,Latitude,Longitude,Latitude (deg), Longitude (deg),\r\n";

    csvString += waypoints.map(w => this.commafyWaypoint(w)).join('\r\n');

    this.csvOutput.next(csvString);
  }

  private getDMSString(degree: number): string{
    return this.dmsDisplayPipe.transform(degree).replace('°','deg');
  }

  private commafyWaypoint(w: Waypoint) {
    return `${w.name.replace(',','')},${w.symbol.replace(',','')},${this.getDMSString(w.latitude)},${this.getDMSString(w.longitude)},${w.latitude},${w.longitude}`;
  }
}
