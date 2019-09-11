import { Injectable } from '@angular/core';
import { Waypoint } from '../models/waypoint';

@Injectable({
  providedIn: 'root'
})
export class DataExtractorService {

  constructor() { }

  public getWaypoint(element: Element): Waypoint {
    const lat = element.getAttribute('lat');
    const long = element.getAttribute('lon');
    const nameElements = element.getElementsByTagName('name');

    return {
      latitude: lat === null ? null : Number(lat),
      longitude: long === null ? null : Number(long),
      name: nameElements.length ? nameElements[0].textContent : ''
    } as Waypoint;
  }
}
