import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  IOtherPageContent,
  IOtherPageContentResponse,
} from '@recruit-supplier/api-other-page-content';
import { EFormMode } from '@recruit-supplier/app-config';
import { EPageRoute, RouterService } from '@recruit-supplier/router';
import { TransformBooleanPipe } from '@recruit-supplier/shared';
import { isAfter } from 'date-fns';

@Component({
  selector: 'recruit-supplier-other-page-content-form',
  templateUrl: './other-page-content-form.html',
  styleUrls: ['./other-page-content-form.scss'],
})
export class ModuleOtherPageContentOtherPageContentFormComponent
  implements OnInit
{
  @Input() initialOtherPageContent?: IOtherPageContentResponse;
  @Input() isLoading = false;
  @Input() formMode = EFormMode.CREATE;
  @Output() submitted = new EventEmitter<IOtherPageContent>();

  otherPageContentForm!: FormGroup;
  isShowPopConfirm = false;

  constructor(
    private fb: FormBuilder,
    private routerService: RouterService,
    private transformBooleanPile: TransformBooleanPipe
  ) {}

  ngOnInit(): void {
    this.otherPageContentForm = this.fb.group({
      startDate: [
        this.initialOtherPageContent?.startDate
          ? new Date(this.initialOtherPageContent.startDate)
          : null,
        [Validators.required],
      ],
      endDate: [
        this.initialOtherPageContent?.endDate
          ? new Date(this.initialOtherPageContent.endDate)
          : null,
        [this.endDateAfterStartDateValidator],
      ],
      name: [this.initialOtherPageContent?.name, [Validators.required]],
      status: [
        this.transformBooleanPile.transform(
          this.initialOtherPageContent?.status
        ),
        [Validators.required],
      ],
    });
  }

  // #region event
  onCancel() {
    this.routerService.goTo(EPageRoute.OTHER_PAGE_CONTENT);
  }

  onPopConfirmCancel() {
    this.isShowPopConfirm = false;
  }

  onSubmitForm() {
    this.isShowPopConfirm = false;
    for (const i in this.otherPageContentForm.controls) {
      this.otherPageContentForm.controls[i].markAsDirty();
      this.otherPageContentForm.controls[i].updateValueAndValidity();
    }

    if (this.otherPageContentForm.valid) {
      this.isShowPopConfirm = true;
    }
  }

  onConfirmSubmitForm() {
    this.isShowPopConfirm = false;
    const value = this.otherPageContentForm.value;
    value.status = this.transformBooleanPile.reverse(value.status);
    this.submitted.emit(this.otherPageContentForm.value);
  }
  // #endregion

  // #region validation
  validateEndDate() {
    setTimeout(() =>
      this.otherPageContentForm.controls.endDate.updateValueAndValidity()
    );
  }

  endDateAfterStartDateValidator = (control: FormControl) => {
    if (!control.value) {
      return null;
    }
    const isValid = isAfter(
      control.value,
      this.otherPageContentForm?.get('startDate')?.value
    );
    return isValid ? null : { invalidDate: true };
  };

  // #endregion
  get description() {
    return this.otherPageContentForm.get('description');
  }

  get actionText() {
    if (this.formMode === EFormMode.CREATE) {
      return 'เพิ่ม';
    }
    return 'แก้ไข';
  }
}
