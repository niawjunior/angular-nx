import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IDropParams } from '@recruit-supplier/shared';
import { IConfigAnnouncementTable } from '../../models';
import { ModuleHomeManagementFacade } from '../../module-home-management-facade';

@Component({
  selector: 'recruit-supplier-announcement-table',
  templateUrl: './announcement-table.html',
  styleUrls: ['./announcement-table.scss'],
})
export class ModuleHomeManagementAnnouncementTableComponent {
  @Input() configTable: IConfigAnnouncementTable =
    {} as IConfigAnnouncementTable;
  @Output() deleted = new EventEmitter<string>();
  @Output() priorityChanged = new EventEmitter<IDropParams>();
  @Output() edit = new EventEmitter<string>();

  constructor(private facade: ModuleHomeManagementFacade) {}

  onDelete(announcementId: string) {
    this.deleted.emit(announcementId);
  }

  onEdit(announcementId: string) {
    this.edit.emit(announcementId);
  }

  onPriorityChange(event: { previousIndex: number; currentIndex: number }) {
    this.priorityChanged.emit({
      fromId: this.configTable.announcements[event.previousIndex].id,
      newPriority: this.configTable.announcements[event.currentIndex].priority,
    });
    moveItemInArray(
      this.configTable.announcements,
      event.previousIndex,
      event.currentIndex
    );
  }

  openModal() {
    this.facade.onVisibleAnnouncementSubject$.next({ isOpen: true });
  }

  closeModal() {
    this.facade.onVisibleAnnouncementSubject$.next({ isOpen: false });
  }
}
