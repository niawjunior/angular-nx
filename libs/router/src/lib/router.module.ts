import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterService } from './router.service';

@NgModule({
  imports: [CommonModule],
  providers: [RouterService],
})
export class RouterModule {}