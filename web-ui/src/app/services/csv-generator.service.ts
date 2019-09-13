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
    this.csvOutput.next('hello\r\n');
  }
}
