import { Pipe, PipeTransform } from '@angular/core';
/*
 * Transform boolean
 * Usage:
 *   value | transformBoolean
 * Example:
 *   {{ T | transformBoolean }}
 *   formats to: true
 *
 *   {{ F | transformBoolean }}
 *   formats to: false
 */
@Pipe({
  name: 'transformBoolean',
})
export class TransformBooleanPipe implements PipeTransform {
  transform(value?: string): boolean {
    return value === 'T';
  }

  reverse(value?: boolean): string {
    if (value === true) {
      return 'T';
    }
    return 'F';
  }
}
