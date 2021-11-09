import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IDropParams } from '@recruit-supplier/shared';
import { IConfigCorporateCultureTable } from '../../models';
import { ModuleHomeManagementFacade } from '../../module-home-management-facade';

@Component({
  selector: 'recruit-supplier-corporate-culture-table',
  templateUrl: './corporate-culture-table.html',
  styleUrls: ['./corporate-culture-table.scss'],
})
export class ModuleHomeManagementCorporateCultureTableComponent
  implements OnInit
{
  constructor(private facade: ModuleHomeManagementFacade) {}

  @Input() configTable: IConfigCorporateCultureTable =
    {} as IConfigCorporateCultureTable;
  @Output() deleted = new EventEmitter<string>();
  @Output() edit = new EventEmitter<string>();
  @Output() priorityChanged = new EventEmitter<IDropParams>();

  fallbackImage = 'assets/images/default-image.png';

  ngOnInit() {
    const tag = document.createElement('script');

    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
  }

  onDelete(corporateCultureId: string) {
    this.deleted.emit(corporateCultureId);
  }

  onEdit(corporateCultureId: string) {
    this.edit.emit(corporateCultureId);
  }

  onPriorityChange(event: { previousIndex: number; currentIndex: number }) {
    this.priorityChanged.emit({
      fromId: this.configTable.corporateCultures[event.previousIndex].id,
      newPriority:
        this.configTable.corporateCultures[event.currentIndex].priority,
    });
    moveItemInArray(
      this.configTable.corporateCultures,
      event.previousIndex,
      event.currentIndex
    );
  }

  openModal() {
    this.facade.onVisibleCorporateCultureSubject$.next({ isOpen: true });
  }

  closeModal() {
    this.facade.onVisibleCorporateCultureSubject$.next({ isOpen: false });
  }
}
