import { Pipe, PipeTransform } from '@angular/core';
import getVideoId from 'get-video-id';
/*
 * Get Youtube ID
 * Usage:
 *   youtube url | youtubeId
 * Example:
 *   {{ https://www.youtube.com/watch?v=e0JinzWSz2E | youtubeId }}
 *   youtube id is 'e0JinzWSz2E'
 *
 */
@Pipe({
  name: 'youtubeId',
})
export class YoutubeId implements PipeTransform {
  transform(url: string): string {
    return getVideoId(url).id;
  }
}
