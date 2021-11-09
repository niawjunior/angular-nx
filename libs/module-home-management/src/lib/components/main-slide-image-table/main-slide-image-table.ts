import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IDropParams } from '@recruit-supplier/shared';
import { IConfigMainSlideImagesTable } from '../../models';
import { ModuleHomeManagementFacade } from '../../module-home-management-facade';

@Component({
  selector: 'recruit-supplier-main-slide-image-table',
  templateUrl: './main-slide-image-table.html',
  styleUrls: ['./main-slide-image-table.scss'],
})
export class ModuleHomeManagementMainSlideImageTableComponent {
  constructor(private facade: ModuleHomeManagementFacade) {}

  @Input() configTable: IConfigMainSlideImagesTable =
    {} as IConfigMainSlideImagesTable;
  @Output() deleted = new EventEmitter<string>();
  @Output() priorityChanged = new EventEmitter<IDropParams>();
  @Output() edit = new EventEmitter<string>();

  fallbackImage = 'assets/images/default-image.png';

  onDelete(mainSlideImageId: string) {
    this.deleted.emit(mainSlideImageId);
  }

  onEdit(mainSlideImageId: string) {
    this.edit.emit(mainSlideImageId);
  }

  onPriorityChange(event: { previousIndex: number; currentIndex: number }) {
    this.priorityChanged.emit({
      fromId: this.configTable.mainSlideImages[event.previousIndex].id,
      newPriority:
        this.configTable.mainSlideImages[event.currentIndex].priority,
    });
    moveItemInArray(
      this.configTable.mainSlideImages,
      event.previousIndex,
      event.currentIndex
    );
  }

  openModal() {
    this.facade.onVisibleMainSlideImageSubject$.next({ isOpen: true });
  }

  closeModal() {
    this.facade.onVisibleMainSlideImageSubject$.next({ isOpen: false });
  }
}
