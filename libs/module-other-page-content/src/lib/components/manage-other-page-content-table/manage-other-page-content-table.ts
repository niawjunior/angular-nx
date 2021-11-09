import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EPageRoute } from '@recruit-supplier/router';
import { IDropParams } from '@recruit-supplier/shared';
import { NzModalService } from 'ng-zorro-antd/modal';
import { IConfigManageOtherPageContent } from '../../models';

@Component({
  selector: 'recruit-supplier-manage-other-page-content-table',
  templateUrl: './manage-other-page-content-table.html',
  styleUrls: ['./manage-other-page-content-table.scss'],
})
export class ModuleOtherPageContentManageOtherPageContentTableComponent {
  @Input() configTable: IConfigManageOtherPageContent =
    {} as IConfigManageOtherPageContent;
  @Output() deleted = new EventEmitter<string>();
  @Output() priorityChanged = new EventEmitter<IDropParams>();
  @Output() edit = new EventEmitter<string>();
  @Input() otherPageContentId!: string;

  get manageOtherPageContentCreateUrl() {
    return `${EPageRoute.CREATE}`;
  }

  manageOtherPageContentUpdateUrl(manageOtherPageContentId: string) {
    return `${manageOtherPageContentId}/${EPageRoute.UPDATE}`;
  }

  constructor(private modal: NzModalService) {}

  onDelete(manageOtherPageContentId: string) {
    this.deleted.emit(manageOtherPageContentId);
  }

  onEdit(manageOtherPageContentId: string) {
    this.edit.emit(manageOtherPageContentId);
  }

  onPriorityChange(event: { previousIndex: number; currentIndex: number }) {
    this.priorityChanged.emit({
      fromId: this.configTable.manageOtherPageContents[event.previousIndex].id,
      newPriority:
        this.configTable.manageOtherPageContents[event.currentIndex].priority,
    });
    moveItemInArray(
      this.configTable.manageOtherPageContents,
      event.previousIndex,
      event.currentIndex
    );
  }

  onDisplayContent(content: string) {
    this.modal.success({
      nzIconType: '',
      nzClosable: false,
      nzWidth: 700,
      nzTitle: 'ตัวอย่างคำบรรยาย',
      nzContent: content,
    });
  }
}
