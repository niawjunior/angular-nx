import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IDropParams } from '@recruit-supplier/shared';
import { moveItemInArray } from '@angular/cdk/drag-drop';

import { IConfigImagesTable } from '../../models';
import { ModuleHomeManagementFacade } from '../../module-home-management-facade';

@Component({
  selector: 'recruit-supplier-popup-image-table',
  templateUrl: './popup-image-table.html',
  styleUrls: ['./popup-image-table.scss'],
})
export class ModuleHomeManagementPopupImageTableComponent {
  constructor(private facade: ModuleHomeManagementFacade) {}

  @Input() configTable: IConfigImagesTable = {} as IConfigImagesTable;
  @Output() deleted = new EventEmitter<string>();
  @Output() edit = new EventEmitter<string>();
  @Output() priorityChanged = new EventEmitter<IDropParams>();

  fallbackImage = 'assets/images/default-image.png';

  onDelete(imageId: string) {
    this.deleted.emit(imageId);
  }

  onEdit(imageId: string) {
    this.edit.emit(imageId);
  }

  onPriorityChange(event: { previousIndex: number; currentIndex: number }) {
    this.priorityChanged.emit({
      fromId: this.configTable.images[event.previousIndex].id,
      newPriority: this.configTable.images[event.currentIndex].priority,
    });
    moveItemInArray(
      this.configTable.images,
      event.previousIndex,
      event.currentIndex
    );
  }

  openModal() {
    this.facade.onVisiblePopupImageSubject$.next({ isOpen: true });
  }

  closeModal() {
    this.facade.onVisiblePopupImageSubject$.next({ isOpen: false });
  }
}
