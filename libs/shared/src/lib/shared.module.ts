import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// antd components module
import { AntdModule } from './antd.module';
import { EditorModule } from './components/editor/editor.module';
import {
  FormatDatePipe,
  MaxTextPipe,
  TransformBooleanPipe,
  FormatFileSizePipe,
  SafePipe,
  YoutubeId,
} from './pipes';
import { DigitOnlyInputDirective, DragPriorityDirective } from './directives';
const MODULES = [CommonModule, RouterModule, AntdModule, EditorModule];
const PIPES = [
  FormatDatePipe,
  TransformBooleanPipe,
  MaxTextPipe,
  FormatFileSizePipe,
  SafePipe,
  YoutubeId,
];
const DIRECTIVES = [DigitOnlyInputDirective, DragPriorityDirective];
@NgModule({
  declarations: [...PIPES, ...DIRECTIVES],
  imports: [...MODULES],
  providers: [...PIPES],
  exports: [...MODULES, ...PIPES, ...DIRECTIVES],
})
export class SharedModule {}
