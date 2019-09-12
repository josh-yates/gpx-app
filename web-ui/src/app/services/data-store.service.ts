import { Injectable } from '@angular/core';
import { Waypoint } from '../models/waypoint';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {

  constructor() { }

  private waypointsStore: Waypoint[] = [];

  public store(waypoints: Waypoint[]): void {
    this.waypointsStore = waypoints;
  }

  public retrieve(): Waypoint[] {
    return this.waypointsStore;
  }

  public clear(): void {
    this.waypointsStore = [];
  }
}
