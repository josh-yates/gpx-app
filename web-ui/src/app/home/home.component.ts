import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

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

  public isLoading = false;
  public selectedFile: File = null;
  private readonly fileReader = new FileReader();

  public fileChange($event: Event): void {
    const fileInputElement = $event.target as HTMLInputElement;

    const isValidFile = fileInputElement.files.length &&
     this.acceptedExtensions.indexOf(`.${(fileInputElement.files[0]).name.split('.').pop()}`) >= 0;

    this.selectedFile = isValidFile ? fileInputElement.files[0] : null;
  }

  public submit(): void {
    if (!this.selectedFile) {
      return;
    }

    this.isLoading = true;

    this.fileReader.removeEventListener('loadend', () => this.onFileLoadEnd());
    this.fileReader.addEventListener('loadend', () => this.onFileLoadEnd());

    this.fileReader.readAsText(this.selectedFile);
  }

  private onFileLoadEnd(): void {
    this.isLoading = false;
    const xmlFile = this.fileReader.result;
    console.log(xmlFile);
  }
}
