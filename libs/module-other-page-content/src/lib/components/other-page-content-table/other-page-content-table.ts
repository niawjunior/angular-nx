import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EPageRoute } from '@recruit-supplier/router';
import { IConfigOtherPageContent } from '../../models';

@Component({
  selector: 'recruit-supplier-other-page-content-table',
  templateUrl: './other-page-content-table.html',
  styleUrls: ['./other-page-content-table.scss'],
})
export class ModuleOtherPageContentOtherPageContentTableComponent {
  @Input() configTable: IConfigOtherPageContent = {} as IConfigOtherPageContent;
  @Output() deleted = new EventEmitter<string>();

  get otherPageContentCreateUrl() {
    return `${EPageRoute.CREATE}`;
  }

  otherPageContentUpdateUrl(otherPageContentId: string) {
    return `${otherPageContentId}/${EPageRoute.MANGE_OTHER_PAGE_CONTENT}`;
  }

  onDelete(manageOtherPageContentId: string) {
    this.deleted.emit(manageOtherPageContentId);
  }
}
