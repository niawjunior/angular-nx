import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnDestroy,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IMainSlideImageResponse } from '@recruit-supplier/api-home-management';
import { isAfter } from 'date-fns';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Subject } from 'rxjs';
import { ModuleHomeManagementFacade } from '../../module-home-management-facade';
import { FileService } from '@recruit-supplier/utils/file';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'recruit-supplier-main-slide-image-modal',
  templateUrl: './main-slide-image-modal.html',
  styleUrls: ['./main-slide-image-modal.scss'],
})
export class ModuleHomeManagementMainSlideImageModalComponent
  implements AfterViewInit, OnDestroy
{
  constructor(
    private facade: ModuleHomeManagementFacade,
    private fb: FormBuilder,
    private modal: NzModalService,
    private fileService: FileService
  ) {
    this.mainSlideImageForm = this.fb.group({
      id: [null, []],
      topic: [null, [Validators.required]],
      content: [null, [Validators.required]],
      startDate: [null, [Validators.required]],
      endDate: [null, [this.endDateAfterStartDateValidator]],
      image: [null, [Validators.required]],
      link: [null, []],
    });

    this.beforeUpload = this.beforeUpload.bind(this);
  }

  @Output() cancelled = new EventEmitter<void>();

  destroy$ = new Subject<void>();
  mainSlideImageForm: FormGroup;
  isShowPopConfirm = false;
  isLoading = false;
  initialMainSlideImage?: IMainSlideImageResponse | null;

  loading = false;
  avatarUrl?: string | ArrayBuffer | null;
  file?: NzUploadFile | null | File;
  previewImage?: string | ArrayBuffer | null;
  previewVisible = false;
  isShowUploadError = false;
  isVisible = false;

  ngAfterViewInit() {
    this.facade.onVisibleMainSlideImageSubject$
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.isVisible = value.isOpen;
        if (value.data) {
          this.initialMainSlideImage = value.data;
          this.updateForm();
        }

        if (!this.isVisible) {
          this.clear();
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onCancel() {
    this.clear();
    this.cancelled.next();
  }

  clear() {
    this.mainSlideImageForm.reset();
    this.avatarUrl = '';
    this.file = null;
    this.isShowUploadError = false;
    this.initialMainSlideImage = null;
  }

  onSubmitForm() {
    this.isShowPopConfirm = false;
    for (const i in this.mainSlideImageForm.controls) {
      this.mainSlideImageForm.controls[i].markAsDirty();
      this.mainSlideImageForm.controls[i].updateValueAndValidity();
    }

    if (!this.mainSlideImageForm.get('image')?.value) {
      this.isShowUploadError = true;
    }

    if (this.mainSlideImageForm.valid) {
      this.isShowPopConfirm = true;
    }
  }

  async onConfirmSubmitForm() {
    try {
      const formData = new FormData();
      formData.append('file', this.file as File);

      const image = await this.facade.uploadFile(formData);

      this.mainSlideImageForm.patchValue(
        {
          image: image?.data?.url,
        },
        { emitEvent: false, onlySelf: true }
      );
      this.isShowPopConfirm = false;
      this.facade.onSubmittedMainSlideImageSubject$.next(
        this.mainSlideImageForm.value
      );
    } catch (e) {
      console.error(e);
      this.modal.error({
        nzContent: 'ไม่สามารถอัพโหลดรูปภาพได้',
      });
      this.onRemoveFile();
    }
  }

  onPopConfirmCancel() {
    this.isShowPopConfirm = false;
  }

  // #region validation
  validateEndDate() {
    setTimeout(() =>
      this.mainSlideImageForm.controls.endDate.updateValueAndValidity()
    );
  }

  endDateAfterStartDateValidator = (control: FormControl) => {
    if (!control.value) {
      return null;
    }
    const isValid = isAfter(
      control.value,
      this.mainSlideImageForm?.get('startDate')?.value
    );
    return isValid ? null : { invalidDate: true };
  };

  get actionText() {
    if (!this.initialMainSlideImage) {
      return 'เพิ่ม';
    }
    return 'แก้ไข';
  }

  beforeUpload(file: NzUploadFile): boolean {
    this.loading = true;
    if (file) {
      this.file = file;
      this.isShowUploadError = false;
      this.handlePreview(file);

      this.mainSlideImageForm.patchValue(
        {
          image: this.file,
        },
        { emitEvent: false, onlySelf: true }
      );
    }
    return false;
  }

  async handlePreview(file: NzUploadFile | File) {
    const fileUrl = await this.fileService.getBase64(file as File);

    if (fileUrl) {
      this.avatarUrl = fileUrl;
      this.previewImage = fileUrl;
      this.loading = false;
    }
  }

  onRemoveFile() {
    this.avatarUrl = '';
    this.file = null;
    this.mainSlideImageForm.patchValue({
      image: null,
    });
  }

  onZoomFile() {
    this.previewVisible = true;
  }

  updateForm() {
    this.mainSlideImageForm.patchValue({
      id: this.initialMainSlideImage?.id,
      topic: this.initialMainSlideImage?.topic,
      content: this.initialMainSlideImage?.content,
      startDate: this.initialMainSlideImage?.startDate
        ? new Date(this.initialMainSlideImage.startDate)
        : null,
      endDate: this.initialMainSlideImage?.endDate
        ? new Date(this.initialMainSlideImage.endDate)
        : null,
      image: this.initialMainSlideImage?.image,
      link: this.initialMainSlideImage?.link,
    });

    this.avatarUrl = this.initialMainSlideImage?.image;
    this.previewImage = this.initialMainSlideImage?.image;
  }
}
