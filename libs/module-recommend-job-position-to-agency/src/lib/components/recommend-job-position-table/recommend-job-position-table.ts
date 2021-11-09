import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EPageRoute } from '@recruit-supplier/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { IConfigRecommendJobPositionTable } from '../../models';

@Component({
  selector: 'recruit-supplier-recommend-job-position-table',
  templateUrl: './recommend-job-position-table.html',
  styleUrls: ['./recommend-job-position-table.scss'],
})
export class ModuleRecommendJobPositionToAgencyRecommendJobPositionTableComponent {
  @Input()
  configTable: IConfigRecommendJobPositionTable = {} as IConfigRecommendJobPositionTable;
  @Input() agencyId = '';
  @Output() paramsChanged = new EventEmitter<NzTableQueryParams>();
  @Output() searched = new EventEmitter<string>();
  @Output() deleted = new EventEmitter<string>();

  get recommendJobPositionCreateUrl() {
    return `${EPageRoute.CREATE}`;
  }

  recommendJobPositionUpdateUrl(recommendJobPositionId: string) {
    return `${recommendJobPositionId}/${EPageRoute.UPDATE}`;
  }

  onQueryParamsChange(params: NzTableQueryParams) {
    this.paramsChanged.emit(params);
  }

  onSearch() {
    this.searched.emit(this.configTable.keyword.trim());
  }

  onDelete(masterInformationId: string) {
    this.deleted.emit(masterInformationId);
  }
}
