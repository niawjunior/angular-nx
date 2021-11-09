import { Pipe, PipeTransform } from '@angular/core';
/*
 * Format text length
 * Usage:
 *   value | maxText
 * Example:
 *   {{ test | maxText }}
 *   formats to: test because default text length is 10
 *
 * Example With argument:
 *   {{ https://upload.wikimedia.org/wikipedia/commons/a/a3/June_odd-eyed-cat.jpg | maxText: '20':'...' }}
 *   formats to: "https://upload.wikim..."
 */
@Pipe({
  name: 'maxText',
})
export class MaxTextPipe implements PipeTransform {
  transform(value: string, maxText = 20, suffix = '...'): string {
    if (!value) return '';
    return value.slice(0, maxText) + suffix;
  }
}
