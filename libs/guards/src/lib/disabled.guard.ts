import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AwayDisableGuard implements CanActivate {
  canActivate() {
    return false;
  }
}
