import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  IMasterInformation,
  IMasterInformationResponse,
} from '@recruit-supplier/api-master-information';
import { EFormMode } from '@recruit-supplier/app-config';
import { EPageRoute, RouterService } from '@recruit-supplier/router';
import { TransformBooleanPipe } from '@recruit-supplier/shared';

@Component({
  selector: 'recruit-supplier-master-information-form',
  templateUrl: './master-information-form.html',
  styleUrls: ['./master-information-form.scss'],
})
export class ModuleMasterInformationMasterInformationFormComponent
  implements OnInit
{
  @Input() initialMasterInformation?: IMasterInformationResponse;
  @Input() isLoading = false;
  @Input() formMode = EFormMode.CREATE;
  @Output() submitted = new EventEmitter<IMasterInformation>();

  masterInformationForm: FormGroup;
  isShowPopConfirm = false;

  constructor(
    private fb: FormBuilder,
    private routerService: RouterService,
    private transformBooleanPile: TransformBooleanPipe
  ) {}

  ngOnInit(): void {
    this.masterInformationForm = this.fb.group({
      code: [
        this.initialMasterInformation?.code ?? null,
        [Validators.required],
      ],
      nameEn: [
        this.initialMasterInformation?.nameEn ?? null,
        [Validators.required],
      ],
      nameTh: [
        this.initialMasterInformation?.nameTh ?? null,
        [Validators.required],
      ],
      isActive: [
        this.initialMasterInformation?.isActive,
        [Validators.required],
      ],
    });
  }

  get actionText() {
    if (this.formMode === EFormMode.CREATE) {
      return 'เพิ่ม';
    }
    return 'แก้ไข';
  }

  // #region event
  onCancel() {
    this.routerService.goTo(EPageRoute.MASTER_INFORMATION);
  }

  onPopConfirmCancel() {
    this.isShowPopConfirm = false;
  }

  onSubmitForm() {
    this.isShowPopConfirm = false;
    for (const i in this.masterInformationForm.controls) {
      this.masterInformationForm.controls[i].markAsDirty();
      this.masterInformationForm.controls[i].updateValueAndValidity();
    }

    if (this.masterInformationForm.valid) {
      this.isShowPopConfirm = true;
    }
  }

  onConfirmSubmitForm() {
    this.isShowPopConfirm = false;
    this.submitted.emit(this.masterInformationForm.value);
  }
  // #endregion
}
