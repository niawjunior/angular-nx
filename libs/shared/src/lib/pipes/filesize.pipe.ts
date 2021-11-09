import { Pipe, PipeTransform } from '@angular/core';
import * as filesize from 'filesize';
/*
 * Format file size
 * Usage:
 *   value | fileSize
 * Example:
 *   {{ 159224 | fileSize }}
 *   formats to: 27/06/2021
 *
 */
@Pipe({
  name: 'fileSize',
})
export class FormatFileSizePipe implements PipeTransform {
  transform(value: string | number): string {
    if (!value) return '';
    return filesize(Number(value)).trim();
  }
}
