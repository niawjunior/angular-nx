import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EPageRoute } from '@recruit-supplier/router';
import { IDropParams } from '@recruit-supplier/shared';
import { IConfigInternshipPageContentTable } from '../../models/config-table.model';
@Component({
  selector: 'recruit-supplier-internship-page-content-table',
  templateUrl: './internship-page-content-table.html',
  styleUrls: ['./internship-page-content-table.scss'],
})
export class ModuleInternshipPageContentInternshipPageContentTableComponent {
  @Input() configTable: IConfigInternshipPageContentTable =
    {} as IConfigInternshipPageContentTable;
  @Output() deleted = new EventEmitter<string>();
  @Output() priorityChanged = new EventEmitter<IDropParams>();

  internshipCreateUrl = EPageRoute.CREATE;
  internshipUpdateUrl(internshipContentId?: string) {
    return `${internshipContentId}/${EPageRoute.UPDATE}`;
  }

  onDelete(roleId?: string) {
    this.deleted.emit(roleId);
  }

  onPriorityChange(event: { previousIndex: number; currentIndex: number }) {
    this.priorityChanged.emit({
      fromId: this.configTable.internshipPageContents[event.previousIndex].id,
      newPriority:
        this.configTable.internshipPageContents[event.currentIndex].priority,
    });

    moveItemInArray(
      this.configTable?.internshipPageContents,
      event.previousIndex,
      event.currentIndex
    );
  }
}
