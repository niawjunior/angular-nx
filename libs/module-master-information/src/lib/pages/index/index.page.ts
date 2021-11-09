import { Component, OnDestroy, OnInit } from '@angular/core';
import { IConfigMasterInformationTable } from '../../models/config.table';
import { EDefaultData } from '@recruit-supplier/app-config';
import { GlobalService } from '@recruit-supplier/global-store';
import { ModuleMasterInformationFacade } from '../../module-master-information-facade';
import { NzModalService } from 'ng-zorro-antd/modal';
import { IBreadcrumb } from '@recruit-supplier/shared';
import { EPageRoute } from '@recruit-supplier/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';

const initialConfigTable: IConfigMasterInformationTable = {
  masterInformationTypes: [],
  masterInformationCompanies: [],
  selectedType: '',
  selectedCompany: '',
  masterInformations: [],
  isLoading: false,
  currentPage: 1,
  pageSize: EDefaultData.PAGE_SIZE,
  total: 0,
  keyword: '',
};

@Component({
  selector: 'recruit-supplier-module-master-information-index-page',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class ModuleMasterInformationIndexPageComponent
  implements OnInit, OnDestroy
{
  configTable = initialConfigTable;

  constructor(
    private facade: ModuleMasterInformationFacade,
    private globalService: GlobalService,
    private modal: NzModalService
  ) {}

  ngOnInit() {
    const breadcrumbs: IBreadcrumb[] = [
      {
        name: 'ข้อมูล Master',
        route: EPageRoute.MASTER_INFORMATION,
      },
    ];
    this.globalService.setPageLayout({
      breadcrumbs,
      activeMenu: EPageRoute.MASTER_INFORMATION,
    });
    this.loadMasterInformationTypes();
    this.loadMasterInformationCompanies();
  }

  ngOnDestroy() {
    this.globalService.setPageLayout(null);
  }

  async loadMasterInformationTypes() {
    this.configTable.isLoading = true;
    try {
      this.configTable.masterInformationTypes = await (
        await this.facade.getMasterInformationTypes()
      ).data?.filter(Boolean);
      if (this.configTable.masterInformationTypes.length) {
        this.configTable.selectedType =
          this.configTable.masterInformationTypes[0];
        this.loadMasterInformation();
      }
    } catch (error) {
      this.configTable.isLoading = false;
      console.error(error);
    }
  }

  async loadMasterInformationCompanies() {
    this.configTable.isLoading = true;
    try {
      this.configTable.masterInformationCompanies = await (
        await this.facade.getMasterInformationCompanies()
      ).data?.filter(Boolean);
      if (this.configTable.masterInformationCompanies.length) {
        this.configTable.selectedCompany =
          this.configTable.masterInformationCompanies[0];
        this.loadMasterInformation();
      }
    } catch (error) {
      this.configTable.isLoading = false;
      console.error(error);
    }
  }

  async loadMasterInformation() {
    this.configTable.isLoading = true;
    try {
      const {
        data,
        pageNumber: currentPage,
        pageSize: pageSize,
        totalRecords,
      } = await this.facade.getMasterInformations(
        {
          PageNumber: Number(this.configTable.currentPage),
          PageSize: Number(this.configTable.pageSize),
          keyword: this.configTable.keyword,
        },
        this.configTable.selectedType
      );

      this.configTable = {
        ...this.configTable,
        masterInformations: data,
        isLoading: false,
        currentPage,
        pageSize,
        total: totalRecords,
      };
    } catch (error) {
      console.error(error);
      this.configTable.isLoading = false;
    }
  }

  // #region event
  onParamsChange(params: NzTableQueryParams) {
    this.configTable.currentPage = params.pageIndex;
    this.configTable.pageSize = params.pageSize;
    if (this.configTable.selectedType) {
      this.loadMasterInformation();
    }
  }

  onSearch(keyword: string) {
    this.configTable.keyword = keyword;
    this.loadMasterInformation();
  }

  onTypeChange(selectedType: string) {
    this.configTable = { ...initialConfigTable, selectedType };
    this.loadMasterInformation();
  }

  onCompanyChange(selectedCompany: string) {
    this.configTable = { ...initialConfigTable, selectedCompany };
    this.loadMasterInformation();
  }

  async onDelete(masterInformationId: string) {
    try {
      this.configTable.isLoading = true;
      await this.facade.deleteMasterInformation(
        masterInformationId,
        this.configTable.selectedType
      );
      this.modal.success({
        nzContent: 'ลบข้อมูล Master สำเร็จ',
      });
      this.loadMasterInformation();
    } catch (error) {
      console.error(error);
      this.modal.error({
        nzContent: `ลบข้อมูล Master ไม่สำเร็จเนื่องจาก ...`,
      });
    } finally {
      this.configTable.isLoading = false;
    }
  }
}
