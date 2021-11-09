import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EPageRoute } from '@recruit-supplier/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { IConfigMasterInformationTable } from '../../models/config.table';

@Component({
  selector: 'recruit-supplier-master-information-table',
  templateUrl: './master-information-table.html',
  styleUrls: ['./master-information-table.scss'],
})
export class ModuleMasterInformationMasterInformationTableComponent {
  @Input()
  configTable: IConfigMasterInformationTable = {} as IConfigMasterInformationTable;

  @Output() paramsChanged = new EventEmitter<NzTableQueryParams>();
  @Output() searched = new EventEmitter<string>();
  @Output() deleted = new EventEmitter<string>();
  @Output() typeChanged = new EventEmitter<string>();
  @Output() companyChanged = new EventEmitter<string>();

  masterInformationCreateUrl = EPageRoute.CREATE;

  onQueryParamsChange(params: NzTableQueryParams) {
    this.paramsChanged.emit(params);
  }

  onSearch() {
    this.searched.emit(this.configTable.keyword.trim());
  }

  onDelete(masterInformationId: string) {
    this.deleted.emit(masterInformationId);
  }

  onTypeChange() {
    this.typeChanged.emit(this.configTable.selectedType);
  }

  onCompanyChange() {
    this.companyChanged.emit(this.configTable.selectedCompany);
  }

  masterInformationUpdateUrl(masterInformationId: string) {
    return `${masterInformationId}/${EPageRoute.UPDATE}`;
  }
}
