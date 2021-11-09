import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IJobPositionResponse } from '@recruit-supplier/api-job-position';
import {
  IRecommendJobPosition,
  IRecommendJobPositionListResponse,
} from '@recruit-supplier/api-recommend-job-position-to-agency';
import { EDefaultData, EFormMode } from '@recruit-supplier/app-config';
import { EPageRoute, RouterService } from '@recruit-supplier/router';
import { isAfter } from 'date-fns';
import { unionBy, debounce } from 'lodash-es';
import { ModuleRecommendJobPositionToAgencyFacade } from '../../module-recommend-job-position-to-agency-facade';

@Component({
  selector: 'recruit-supplier-recommend-job-position-form',
  templateUrl: './recommend-job-position-form.html',
  styleUrls: ['./recommend-job-position-form.scss'],
})
export class ModuleRecommendJobPositionToAgencyRecommendJobPositionFormComponent
  implements OnInit
{
  @Input() initialRecommendJobPosition?: IRecommendJobPositionListResponse;
  @Input() agencyId: string;
  @Input() isLoading = false;
  @Input() formMode = EFormMode.CREATE;
  @Output() submitted = new EventEmitter<IRecommendJobPosition>();

  recommendJobPositionForm: FormGroup;
  isShowPopConfirm = false;
  jobPositions: IJobPositionResponse[] = [];
  isJobPositionSearching = false;

  constructor(
    private fb: FormBuilder,
    private routerService: RouterService,
    private facade: ModuleRecommendJobPositionToAgencyFacade
  ) {}

  ngOnInit(): void {
    this.recommendJobPositionForm = this.fb.group({
      jobPositionId: [
        this.initialRecommendJobPosition?.jobPosition?.id ?? null,
        [Validators.required],
      ],
      startReachDate: [
        this.initialRecommendJobPosition?.startReachDate
          ? new Date(this.initialRecommendJobPosition.startReachDate)
          : null,
        [Validators.required],
      ],
      endReachDate: [
        this.initialRecommendJobPosition?.endReachDate
          ? new Date(this.initialRecommendJobPosition.endReachDate)
          : null,
        [Validators.required, this.endReachDateAfterStartReachDateValidator],
      ],
      startApplyDate: [
        this.initialRecommendJobPosition?.startApplyDate
          ? new Date(this.initialRecommendJobPosition.startApplyDate)
          : null,
        [Validators.required],
      ],
      endApplyDate: [
        this.initialRecommendJobPosition?.endApplyDate
          ? new Date(this.initialRecommendJobPosition.endApplyDate)
          : null,
        [Validators.required, this.endApplyDateAfterStartApplyDateValidator],
      ],
    });
    this.loadDefaultJobPositions();
  }

  get actionText() {
    if (this.formMode === EFormMode.CREATE) {
      return 'เพิ่ม';
    }
    return 'แก้ไข';
  }

  async loadDefaultJobPositions() {
    this.isJobPositionSearching = true;
    try {
      const { data } = await this.facade.getJobPositions({
        PageNumber: 1,
        PageSize: EDefaultData.PAGE_SIZE,
      });
      this.jobPositions = this.initialRecommendJobPosition
        ? unionBy(
            [
              this.initialRecommendJobPosition
                .jobPosition as IJobPositionResponse,
              ...data,
            ],
            'id'
          )
        : data;
    } catch (error) {
      console.error(error);
    } finally {
      this.isJobPositionSearching = false;
    }
  }

  // #region event
  onCancel() {
    this.routerService.goTo(
      `${EPageRoute.RECOMMEND_JOB_POSITION_TO_AGENCY}/${this.agencyId}/${EPageRoute.RECOMMEND_JOB_POSITION}` as EPageRoute
    );
  }

  onPopConfirmCancel() {
    this.isShowPopConfirm = false;
  }

  onSubmitForm() {
    this.isShowPopConfirm = false;
    for (const i in this.recommendJobPositionForm.controls) {
      this.recommendJobPositionForm.controls[i].markAsDirty();
      this.recommendJobPositionForm.controls[i].updateValueAndValidity();
    }

    if (this.recommendJobPositionForm.valid) {
      this.isShowPopConfirm = true;
    }
  }

  onConfirmSubmitForm() {
    this.isShowPopConfirm = false;
    this.submitted.emit(this.recommendJobPositionForm.value);
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  debouncedOnSearchJobPositions = debounce(
    (keyword: string) => {
      if (keyword.trim()) {
        this.onSearchJobPositions(keyword);
      }
    },
    500,
    {}
  );

  async onSearchJobPositions(keyword?: string) {
    this.isJobPositionSearching = true;
    try {
      const { data } = await this.facade.getJobPositions({
        PageNumber: 1,
        PageSize: EDefaultData.PAGE_SIZE,
        keyword,
      });
      this.jobPositions = data;
    } catch (error) {
      console.error(error);
    } finally {
      this.isJobPositionSearching = false;
    }
  }
  // #endregion

  // #region validation
  validateEndReachDate() {
    setTimeout(() =>
      this.recommendJobPositionForm.controls.endReachDate.updateValueAndValidity()
    );
  }

  validateEndApplyDate() {
    setTimeout(() =>
      this.recommendJobPositionForm.controls.endApplyDate.updateValueAndValidity()
    );
  }

  endReachDateAfterStartReachDateValidator = (control: FormControl) => {
    if (!control.value) {
      return null;
    }
    const isValid = isAfter(
      control.value,
      this.recommendJobPositionForm?.get('startReachDate').value
    );
    return isValid ? null : { invalidDate: true };
  };

  endApplyDateAfterStartApplyDateValidator = (control: FormControl) => {
    if (!control.value) {
      return null;
    }
    const isValid = isAfter(
      control.value,
      this.recommendJobPositionForm?.get('startApplyDate').value
    );
    return isValid ? null : { invalidDate: true };
  };
  // #endregion
}
