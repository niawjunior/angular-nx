import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { IDropParams } from '../models/drag-priority.model';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[rs-drag-priority]',
})
export class DragPriorityDirective {
  @Output() priorityChanged = new EventEmitter<IDropParams>();
  @Input() currentId = '';
  @Input() currentPriority: number;

  @HostBinding('style.color') color: string;
  @HostBinding('style.background-color') backgroundColor: string;
  @HostBinding('style.cursor') cursor: string;
  @HostBinding('draggable') draggable: string;

  constructor() {
    this.cursor = 'move';
    this.draggable = 'true';
  }

  @HostListener('dragstart', ['$event'])
  onDragstart(event: DragEvent) {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.dropEffect = 'move';

    event.dataTransfer.setData('fromId', this.currentId);
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    this.backgroundColor = 'transparent';
    const fromId = event.dataTransfer.getData('fromId');
    this.priorityChanged.emit({
      fromId,
      newPriority: this.currentPriority,
    });
  }

  @HostListener('dragover', ['$event'])
  onDragover(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault();
    this.backgroundColor = '#595c97';
  }

  @HostListener('dragleave', ['$event'])
  onDragleave() {
    this.backgroundColor = 'transparent';
  }
}
