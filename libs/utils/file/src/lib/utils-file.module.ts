import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileService } from './utils-file.service';

@NgModule({
  imports: [CommonModule],
  providers: [FileService],
})
export class UtilsFileModule {}
