import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EPageRoute } from '@recruit-supplier/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';

import { IConfigRoleTable } from '../../models/config-table.model';

@Component({
  selector: 'recruit-supplier-role-table',
  templateUrl: './role-table.html',
  styleUrls: ['./role-table.scss'],
})
export class ModuleRoleRoleTableComponent {
  @Input() configTable: IConfigRoleTable = {} as IConfigRoleTable;
  @Output() paramsChanged = new EventEmitter<NzTableQueryParams>();
  @Output() searched = new EventEmitter<string>();
  @Output() deleted = new EventEmitter<string>();

  roleCreateUrl = EPageRoute.CREATE;

  onQueryParamsChange(params: NzTableQueryParams) {
    this.paramsChanged.emit(params);
  }

  onSearch() {
    this.searched.emit(this.configTable.keyword.trim());
  }

  roleUpdateUrl(roleId) {
    return `${roleId}/${EPageRoute.UPDATE}`;
  }

  onDelete(roleId: string) {
    this.deleted.emit(roleId);
  }
}
