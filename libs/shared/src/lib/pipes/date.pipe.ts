import { Pipe, PipeTransform } from '@angular/core';
import { format } from 'date-fns';
/*
 * Format date
 * Usage:
 *   value | formatDate
 * Example:
 *   {{ 2021-06-27T04:36:34.585Z | formatDate }}
 *   formats to: 27/06/2021
 *
 * Example With argument:
 *   {{ 2021-06-27T04:36:34.585Z | formatDate: 'dd-MM-yyy' }}
 *   formats to: 27-06-2021
 */
@Pipe({
  name: 'formatDate',
})
export class FormatDatePipe implements PipeTransform {
  transform(value?: string | Date, dateFormat = 'dd/MM/yyyy'): string {
    if (!value) return '';
    return format(new Date(value), dateFormat);
  }
}
