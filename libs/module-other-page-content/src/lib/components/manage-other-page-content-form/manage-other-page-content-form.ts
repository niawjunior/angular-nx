import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  IManageOtherPageContent,
  IManageOtherPageContentResponse,
} from '@recruit-supplier/api-other-page-content';
import { EFormMode } from '@recruit-supplier/app-config';
import { EPageRoute, RouterService } from '@recruit-supplier/router';

@Component({
  selector: 'recruit-supplier-manage-other-page-content-form',
  templateUrl: './manage-other-page-content-form.html',
  styleUrls: ['./manage-other-page-content-form.scss'],
})
export class ModuleOtherPageContentManageOtherPageContentFormComponent
  implements OnInit
{
  @Input() initialManageOtherPageContent?: IManageOtherPageContentResponse;
  @Input() otherPageContentId!: string;
  @Input() isLoading = false;
  @Input() formMode = EFormMode.CREATE;
  @Output() submitted = new EventEmitter<IManageOtherPageContent>();

  manageOtherPageContentForm!: FormGroup;
  isShowPopConfirm = false;

  get content(): AbstractControl {
    return this.manageOtherPageContentForm.get('content') as AbstractControl;
  }

  get actionText() {
    if (this.formMode === EFormMode.CREATE) {
      return 'เพิ่ม';
    }
    return 'แก้ไข';
  }

  constructor(private fb: FormBuilder, private routerService: RouterService) {}

  ngOnInit(): void {
    this.manageOtherPageContentForm = this.fb.group({
      priority: [this.initialManageOtherPageContent?.priority],
      topic: [this.initialManageOtherPageContent?.topic, [Validators.required]],
      content: [
        this.initialManageOtherPageContent?.content,
        [Validators.required],
      ],
    });
  }

  onCancel() {
    this.routerService.goTo(
      `${EPageRoute.OTHER_PAGE_CONTENT}/${this.otherPageContentId}/${EPageRoute.MANGE_OTHER_PAGE_CONTENT}` as EPageRoute
    );
  }

  onPopConfirmCancel() {
    this.isShowPopConfirm = false;
  }

  onSubmitForm() {
    this.isShowPopConfirm = false;
    for (const i in this.manageOtherPageContentForm.controls) {
      this.manageOtherPageContentForm.controls[i].markAsDirty();
      this.manageOtherPageContentForm.controls[i].updateValueAndValidity();
    }

    if (this.manageOtherPageContentForm.valid) {
      this.isShowPopConfirm = true;
    }
  }

  onConfirmSubmitForm() {
    this.isShowPopConfirm = false;
    this.submitted.emit(this.manageOtherPageContentForm.value);
  }
  // #endregion
}
