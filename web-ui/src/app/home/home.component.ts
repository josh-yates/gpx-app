import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor() { }

  public readonly acceptedExtensions = [
    '.xml',
    '.gpx'
  ];

  public selectedFile: File = null;

  public fileChange($event: Event): void {
    const fileInputElement = $event.target as HTMLInputElement;

    const isValidFile = fileInputElement.files.length && this.acceptedExtensions.indexOf(`.${(fileInputElement.files[0]).name}`) >= 0;

    this.selectedFile = isValidFile ? fileInputElement.files[0] : null;
  }

}
