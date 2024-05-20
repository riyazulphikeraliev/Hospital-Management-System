import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'railwayTime'
})
export class RailwayTimePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    
    const parts = value.split(':');
    let hours = parseInt(parts[0]);
    const minutes = parseInt(parts[1]);

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (00:00)

    return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
  }
}
