import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { XmlParserService } from '../services/xml-parser.service';
import { DataExtractorService } from '../services/data-extractor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(
    private readonly xmlService: XmlParserService,
    private readonly dataService: DataExtractorService,
    private readonly router: Router) { }

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
    const xmlFileString = this.fileReader.result as string;
    const xmlDOM = this.xmlService.textToXmlDOM(xmlFileString);

    const waypointEls = xmlDOM.getElementsByTagName('wpt');
    const waypoints = this.dataService.getWaypointsFromElements(waypointEls);

    console.log(waypoints.map(w => w.name));
    this.router.navigateByUrl('/results');
    this.isLoading = false;
  }
}
