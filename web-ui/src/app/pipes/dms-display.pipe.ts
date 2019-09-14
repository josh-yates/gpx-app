import { Pipe, PipeTransform } from '@angular/core';
import { CoordinateService } from '../services/coordinate.service';

@Pipe({
  name: 'dmsDisplay'
})
export class DMSDisplayPipe implements PipeTransform {
  constructor(private readonly coordinateService: CoordinateService) { }

  transform(value: any, ...args: any[]): string {
    const val = value as number;
    const dmsCoord = this.coordinateService.toDMS(val);

    return `${dmsCoord.degrees}° ${dmsCoord.minutes}' ${dmsCoord.seconds.toFixed(2)}''`;
  }

}
