import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EPageRoute } from '@recruit-supplier/router';
import { IDropParams } from '@recruit-supplier/shared';
import { IConfigWelfarePageContentTable } from '../../models/config-table.model';
@Component({
  selector: 'recruit-supplier-welfare-page-content-table',
  templateUrl: './welfare-page-content-table.html',
  styleUrls: ['./welfare-page-content-table.scss'],
})
export class ModuleWelfarePageContentWelfarePageContentTableComponent {
  @Input() configTable: IConfigWelfarePageContentTable =
    {} as IConfigWelfarePageContentTable;
  @Output() deleted = new EventEmitter<string>();
  @Output() priorityChanged = new EventEmitter<IDropParams>();

  welfareCreateUrl = EPageRoute.CREATE;
  fallbackImage = 'assets/images/default-image.png';
  welfareUpdateUrl(welfareContentId: string) {
    return `${welfareContentId}/${EPageRoute.UPDATE}`;
  }

  onDelete(roleId: string) {
    this.deleted.emit(roleId);
  }

  onPriorityChange(event: { previousIndex: number; currentIndex: number }) {
    this.priorityChanged.emit({
      fromId: this.configTable.welfarePageContents[event.previousIndex].id,
      newPriority:
        this.configTable.welfarePageContents[event.currentIndex].priority,
    });

    moveItemInArray(
      this.configTable?.welfarePageContents,
      event.previousIndex,
      event.currentIndex
    );
  }
}
