import { Component, OnInit, OnDestroy } from '@angular/core';
import { Waypoint } from '../models/waypoint';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataStoreService } from '../services/data-store.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit, OnDestroy {

  constructor(private readonly storeService: DataStoreService) { }

  private fullWaypoints: Waypoint[] = [];
  private readonly pageSize = 20;
  private readonly destroy$ = new Subject();

  public pageNumber = new BehaviorSubject<number>(0);
  public totalPageCount = 1;
  public isLoading = true;
  public visibleWaypoints: Waypoint[] = [];
  public selectedWaypoint: Waypoint = null;

  public ngOnInit(): void {
    this.fullWaypoints = this.storeService.retrieve();
    this.storeService.clear();

    this.pageNumber
    .pipe(takeUntil(this.destroy$))
    .subscribe((currentPage: number) => {
      this.totalPageCount = Math.ceil(this.fullWaypoints.length / this.pageSize);
      
      const start = this.pageSize * currentPage;
      this.visibleWaypoints = this.fullWaypoints.slice(start, start + this.pageSize);
    });

    this.isLoading = false;
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
  }

  public incrementPage(): void {
    const currentPage = this.pageNumber.value;
    if (currentPage < (this.totalPageCount - 1)) {
      this.pageNumber.next(currentPage + 1);
    }
  }

  public decrementPage(): void {
    const currentPage = this.pageNumber.value;
    if (currentPage > 0) {
      this.pageNumber.next(currentPage - 1);
    }
  }

  public select(wpt: Waypoint): void {
    if (wpt === this.selectedWaypoint) {
      this.selectedWaypoint = null;
    } else {
      this.selectedWaypoint = wpt;
    }
  }

}
