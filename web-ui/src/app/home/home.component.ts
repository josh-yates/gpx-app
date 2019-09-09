import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor() { }

  public fileChange($event: Event): void {
    const fileInputElement = $event.target as HTMLInputElement;

    console.log(fileInputElement.files);
  }

}
