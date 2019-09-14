import { Injectable } from '@angular/core';
import { DMSCoordinate } from '../models/dms-coordinate';

@Injectable({
  providedIn: 'root'
})
export class CoordinateService {

  constructor() { }

  public toDMS(coordinate: number): DMSCoordinate {
    const absCoords = Math.abs(coordinate);
    let degrees = Math.floor(absCoords);
    const minutes = Math.floor((absCoords - degrees) * 60);
    const seconds = (absCoords - degrees - (minutes / 60)) * 3600;

    if (coordinate < 0) {
      degrees *= -1;
    }

    return {
      degrees: degrees,
      minutes: minutes,
      seconds: seconds
    } as DMSCoordinate;
  }
}
