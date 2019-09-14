import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Waypoint } from '../models/waypoint';

@Injectable({
  providedIn: 'root'
})
export class CsvGeneratorService {
  constructor() { }

  public csvOutput = new Subject<string>();

  public generateCsv(waypoints: Waypoint[]): void {
    let csvString = "Name,Latitude,Longitude\r\n";

    csvString += waypoints.map(w => `${w.name.replace(',','')},${w.latitude},${w.longitude}`).join('\r\n');

    this.csvOutput.next(csvString);
  }
}
