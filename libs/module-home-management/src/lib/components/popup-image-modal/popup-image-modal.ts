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
import { IPopupImageResponse } from '@recruit-supplier/api-home-management';
import { isAfter } from 'date-fns';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Subscription } from 'rxjs';
import { ModuleHomeManagementFacade } from '../../module-home-management-facade';
import { FileService } from '@recruit-supplier/utils/file';

@Component({
  selector: 'recruit-supplier-popup-image-modal',
  templateUrl: './popup-image-modal.html',
  styleUrls: ['./popup-image-modal.scss'],
})
export class ModuleHomeManagementPopupImageModalComponent
  implements AfterViewInit, OnDestroy
{
  @Output() cancelled = new EventEmitter<void>();

  popupImageForm: FormGroup;
  isShowPopConfirm = false;
  isLoading = false;
  initialPopupImage?: IPopupImageResponse | null;

  loading = false;
  avatarUrl?: string | ArrayBuffer | null;
  file?: NzUploadFile | null | File;
  previewImage?: string | ArrayBuffer | null;
  previewVisible = false;
  isShowUploadError = false;
  isVisible = false;
  visiblePopupImageSubject?: Subscription;

  constructor(
    private facade: ModuleHomeManagementFacade,
    private fb: FormBuilder,
    private modal: NzModalService,
    private fileService: FileService
  ) {
    this.popupImageForm = this.fb.group({
      id: [null, []],
      startDate: [null, [Validators.required]],
      endDate: [null, [this.endDateAfterStartDateValidator]],
      image: [null, [Validators.required]],
      link: [null, []],
    });

    this.beforeUpload = this.beforeUpload.bind(this);
  }

  ngAfterViewInit() {
    this.visiblePopupImageSubject =
      this.facade.onVisiblePopupImageSubject$.subscribe((value) => {
        this.isVisible = value.isOpen;
        if (value.data) {
          this.initialPopupImage = value.data;
          this.updateForm();
        }

        if (!this.isVisible) {
          this.clear();
        }
      });
  }

  ngOnDestroy() {
    this.visiblePopupImageSubject?.unsubscribe();
  }

  onCancel() {
    this.clear();
    this.cancelled.next();
  }

  clear() {
    this.popupImageForm.reset();
    this.avatarUrl = '';
    this.file = null;
    this.isShowUploadError = false;
    this.initialPopupImage = null;
  }

  onSubmitForm() {
    this.isShowPopConfirm = false;
    for (const i in this.popupImageForm.controls) {
      this.popupImageForm.controls[i].markAsDirty();
      this.popupImageForm.controls[i].updateValueAndValidity();
    }

    if (!this.popupImageForm.get('image')?.value) {
      this.isShowUploadError = true;
    }

    if (this.popupImageForm.valid) {
      this.isShowPopConfirm = true;
    }
  }

  async onConfirmSubmitForm() {
    try {
      const formData = new FormData();
      formData.append('file', this.file as File);

      const image = await this.facade.uploadFile(formData);

      this.popupImageForm.patchValue(
        {
          image: image?.data?.url,
        },
        { emitEvent: false, onlySelf: true }
      );
      this.isShowPopConfirm = false;
      this.facade.onSubmittedPopupImageSubject$.next(this.popupImageForm.value);
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
      this.popupImageForm.controls.endDate.updateValueAndValidity()
    );
  }

  endDateAfterStartDateValidator = (control: FormControl) => {
    if (!control.value) {
      return null;
    }
    const isValid = isAfter(
      control.value,
      this.popupImageForm?.get('startDate')?.value
    );
    return isValid ? null : { invalidDate: true };
  };

  get actionText() {
    if (!this.initialPopupImage) {
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

      this.popupImageForm.patchValue(
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
    this.popupImageForm.patchValue({
      image: null,
    });
  }

  onZoomFile() {
    this.previewVisible = true;
  }

  updateForm() {
    this.popupImageForm.patchValue({
      id: this.initialPopupImage?.id,
      startDate: this.initialPopupImage?.startDate
        ? new Date(this.initialPopupImage.startDate)
        : null,
      endDate: this.initialPopupImage?.endDate
        ? new Date(this.initialPopupImage.endDate)
        : null,
      image: this.initialPopupImage?.image,
      link: this.initialPopupImage?.link,
    });

    this.avatarUrl = this.initialPopupImage?.image;
    this.previewImage = this.initialPopupImage?.image;
  }
}
