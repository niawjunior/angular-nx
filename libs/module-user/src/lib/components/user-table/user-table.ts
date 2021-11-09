import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EPageRoute } from '@recruit-supplier/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { IConfigUserTable } from '../../models';

@Component({
  selector: 'recruit-supplier-user-table',
  templateUrl: './user-table.html',
  styleUrls: ['./user-table.scss'],
})
export class ModuleUserUserTableComponent {
  @Input() configTable: IConfigUserTable = {} as IConfigUserTable;
  @Output() paramsChanged = new EventEmitter<NzTableQueryParams>();
  @Output() searched = new EventEmitter<string>();
  @Output() deleted = new EventEmitter<string>();
  @Output() typeChanged = new EventEmitter<string>();

  userCreateUrl = EPageRoute.CREATE;

  onQueryParamsChange(params: NzTableQueryParams) {
    this.paramsChanged.emit(params);
  }

  onSearch() {
    this.searched.emit(this.configTable.keyword.trim());
  }

  userUpdateUrl(userId) {
    return `${userId}/${EPageRoute.UPDATE}`;
  }

  onDelete(userId: string) {
    this.deleted.emit(userId);
  }

  onTypeChange(selectedType) {
    this.typeChanged.emit(selectedType);
  }
}
