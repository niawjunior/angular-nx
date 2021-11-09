import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IMainSlideImageResponse } from '@recruit-supplier/api-home-management';
import { EPageRoute, RouterService } from '@recruit-supplier/router';
import { IWelfarePageContent } from '@recruit-supplier/api-welfare-page-content';
import { EFormMode } from '@recruit-supplier/app-config';
import { IInternshipPageContentResponse } from '@recruit-supplier/api-internship-page-content';

@Component({
  selector: 'recruit-supplier-internship-page-content-form',
  templateUrl: './internship-page-content-form.html',
  styleUrls: ['./internship-page-content-form.scss'],
})
export class ModuleInternshipPageContentInternshipPageContentFormComponent
  implements OnInit
{
  constructor(private fb: FormBuilder, private routerService: RouterService) {}

  @Input() isLoading = false;
  @Output() cancelled = new EventEmitter<void>();
  @Output() submitted = new EventEmitter<IWelfarePageContent>();
  @Input() initialInternshipPageContent?: IInternshipPageContentResponse;
  @Input() formMode = EFormMode.CREATE;

  internshipPageContentForm!: FormGroup;
  isShowPopConfirm = false;
  initialMainSlideImage?: IMainSlideImageResponse | null;

  loading = false;
  isVisible = false;

  ngOnInit() {
    this.internshipPageContentForm = this.fb.group({
      id: [this.initialInternshipPageContent?.id, []],
      topic: [this.initialInternshipPageContent?.topic, [Validators.required]],
      content: [
        this.initialInternshipPageContent?.content,
        [Validators.required],
      ],
    });
  }

  onCancel() {
    this.routerService.goTo(EPageRoute.INTERNSHIP_PAGE_CONTENT);
  }

  onSubmitForm() {
    this.isShowPopConfirm = false;
    for (const i in this.internshipPageContentForm.controls) {
      this.internshipPageContentForm.controls[i].markAsDirty();
      this.internshipPageContentForm.controls[i].updateValueAndValidity();
    }

    if (this.internshipPageContentForm.valid) {
      this.isShowPopConfirm = true;
    }
  }

  onConfirmSubmitForm() {
    this.isShowPopConfirm = false;
    this.submitted.emit(this.internshipPageContentForm.value);
  }

  onPopConfirmCancel() {
    this.isShowPopConfirm = false;
  }

  get actionText() {
    if (this.formMode === EFormMode.CREATE) {
      return 'เพิ่ม';
    }
    return 'แก้ไข';
  }
}
