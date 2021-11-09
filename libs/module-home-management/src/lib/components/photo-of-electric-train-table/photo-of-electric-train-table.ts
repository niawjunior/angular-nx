import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IDropParams } from '@recruit-supplier/shared';
import { IConfigPhotoOfElectricTrainTable } from '../../models';
import { ModuleHomeManagementFacade } from '../../module-home-management-facade';

@Component({
  selector: 'recruit-supplier-photo-of-electric-train-table',
  templateUrl: './photo-of-electric-train-table.html',
  styleUrls: ['./photo-of-electric-train-table.scss'],
})
export class ModuleHomeManagementPhotoOfElectricTrainTableComponent {
  constructor(private facade: ModuleHomeManagementFacade) {}

  @Input() configTable: IConfigPhotoOfElectricTrainTable = {} as IConfigPhotoOfElectricTrainTable;
  @Output() deleted = new EventEmitter<string>();
  @Output() edit = new EventEmitter<string>();
  @Output() priorityChanged = new EventEmitter<IDropParams>();

  fallbackImage = 'assets/images/default-image.png';

  onDelete(photoOfElectricTrainId: string) {
    this.deleted.emit(photoOfElectricTrainId);
  }

  onEdit(photoOfElectricTrainId: string) {
    this.edit.emit(photoOfElectricTrainId);
  }

  onPriorityChange(event: { previousIndex: number; currentIndex: number }) {
    this.priorityChanged.emit({
      fromId: this.configTable.photoOfElectricTrains[event.previousIndex].id,
      newPriority: this.configTable.photoOfElectricTrains[event.currentIndex].priority,
    });
    moveItemInArray(
      this.configTable.photoOfElectricTrains,
      event.previousIndex,
      event.currentIndex
    );
  }

  openModal() {
    this.facade.onVisiblePhotoOfElectricTrainSubject$.next({ isOpen: true });
  }

  closeModal() {
    this.facade.onVisiblePhotoOfElectricTrainSubject$.next({ isOpen: false });
  }
}
