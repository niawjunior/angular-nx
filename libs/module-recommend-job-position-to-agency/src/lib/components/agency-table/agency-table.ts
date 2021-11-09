import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EPageRoute } from '@recruit-supplier/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { IConfigAgencyTable } from '../../models';

@Component({
  selector: 'recruit-supplier-agency-table',
  templateUrl: './agency-table.html',
  styleUrls: ['./agency-table.scss'],
})
export class ModuleRecommendJobPositionToAgencyAgencyTableComponent {
  @Input() configTable: IConfigAgencyTable = {} as IConfigAgencyTable;
  @Output() paramsChanged = new EventEmitter<NzTableQueryParams>();
  @Output() searched = new EventEmitter<string>();

  onQueryParamsChange(params: NzTableQueryParams) {
    this.paramsChanged.emit(params);
  }

  onSearch() {
    this.searched.emit(this.configTable.keyword.trim());
  }

  recommendJobPositionUrl(agencyId: string) {
    return `${agencyId}/${EPageRoute.RECOMMEND_JOB_POSITION}`;
  }
}
