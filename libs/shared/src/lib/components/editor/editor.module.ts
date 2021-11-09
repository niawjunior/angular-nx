import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';

/**
 * Import component
 */
import { EditorComponent } from './editor.component';

@NgModule({
  imports: [QuillModule.forRoot(), FormsModule, ReactiveFormsModule],
  declarations: [EditorComponent],
  exports: [EditorComponent],
})
export class EditorModule {}
