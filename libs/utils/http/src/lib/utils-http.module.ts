import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestService } from './request.service';

@NgModule({
  imports: [CommonModule],
  providers: [RequestService],
})
export class UtilsHttpModule {}
