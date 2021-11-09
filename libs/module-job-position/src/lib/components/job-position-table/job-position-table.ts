import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EPageRoute } from '@recruit-supplier/router';
import { IDropParams } from '@recruit-supplier/shared';
import { NzTableQueryParams } from 'ng-zorro-antd/table';

import { IConfigJobPositionTable } from '../../models/config-table.model';

@Component({
  selector: 'recruit-supplier-job-position-table',
  templateUrl: './job-position-table.html',
  styleUrls: ['./job-position-table.scss'],
})
export class JobPositionTableComponent {
  @Input() configTable: IConfigJobPositionTable = {} as IConfigJobPositionTable;
  @Output() paramsChanged = new EventEmitter<NzTableQueryParams>();
  @Output() searched = new EventEmitter<string>();
  @Output() deleted = new EventEmitter<string>();
  @Output() statusChanged = new EventEmitter<boolean>();
  @Output() priorityChanged = new EventEmitter<IDropParams>();

  jobPositionCreateUrl = EPageRoute.CREATE;

  onQueryParamsChange(params: NzTableQueryParams) {
    this.paramsChanged.emit(params);
  }

  onSearch() {
    this.searched.emit(this.configTable.keyword.trim());
  }

  onDelete(jobPositionId: string) {
    this.deleted.emit(jobPositionId);
  }

  onStatusChange() {
    this.statusChanged.emit(this.configTable.isOpen);
  }

  onPriorityChange(event) {
    this.priorityChanged.emit({
      fromId: this.configTable.jobPositions[event.previousIndex].id,
      newPriority: this.configTable.jobPositions[event.currentIndex].priority,
    });
    moveItemInArray(
      this.configTable.jobPositions,
      event.previousIndex,
      event.currentIndex
    );
  }

  jobPositionUpdateUrl(jobPositionId: string) {
    return `${jobPositionId}/${EPageRoute.UPDATE}`;
  }
}
