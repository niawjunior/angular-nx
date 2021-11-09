import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICorporateCultureResponse } from '@recruit-supplier/api-home-management';
import { FileService } from '@recruit-supplier/utils/file';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Subscription } from 'rxjs';
import { ModuleHomeManagementFacade } from '../../module-home-management-facade';

@Component({
  selector: 'recruit-supplier-corporate-culture-modal',
  templateUrl: './corporate-culture-modal.html',
  styleUrls: ['./corporate-culture-modal.scss'],
})
export class ModuleHomeManagementCorporateCultureModalComponent
  implements AfterViewInit, OnDestroy, OnInit
{
  @Output() cancelled = new EventEmitter<void>();

  corporateCultureForm!: FormGroup;
  isShowPopConfirm = false;
  isLoading = false;
  initialCorporateCulture?: ICorporateCultureResponse | null;

  loading = false;
  avatarUrl?: string | ArrayBuffer | null;
  file?: NzUploadFile | null | File;
  previewImage?: string | ArrayBuffer | null;
  previewVisible = false;
  isShowUploadError = false;
  isVisible = false;
  visibleCorporateCultureSubject?: Subscription;

  constructor(
    private facade: ModuleHomeManagementFacade,
    private fb: FormBuilder,
    private modal: NzModalService,
    private fileService: FileService
  ) {
    this.beforeUpload = this.beforeUpload.bind(this);
  }

  ngOnInit() {
    this.corporateCultureForm = this.fb.group({
      id: [null, []],
      topic: [null, [Validators.required]],
      image: [null, []],
      video: [null, []],
      type: [null, [Validators.required]],
      description: [null, []],
    });
  }

  ngAfterViewInit() {
    this.visibleCorporateCultureSubject =
      this.facade.onVisibleCorporateCultureSubject$.subscribe((value) => {
        this.corporateCultureForm.patchValue({
          type: value.data?.type || 'image',
        });

        this.isVisible = value.isOpen;
        if (value.data) {
          this.initialCorporateCulture = value.data;
          this.updateForm();
        }

        if (!this.isVisible) {
          this.clear();
        }
      });

    this.corporateCultureForm.get('type')?.valueChanges.subscribe((value) => {
      if (value === 'image') {
        this.corporateCultureForm.patchValue(
          {
            video: '',
          },
          { emitEvent: false, onlySelf: true }
        );

        this.corporateCultureForm
          .get('image')
          ?.setValidators([Validators.required]);
        this.corporateCultureForm.get('video')?.clearValidators();
        this.corporateCultureForm.get('image')?.markAsPristine();
        this.isShowUploadError = false;
      } else {
        this.onRemoveFile();
        this.corporateCultureForm
          .get('video')
          ?.setValidators([Validators.required]);
        this.corporateCultureForm.get('image')?.clearValidators();
        this.corporateCultureForm.get('video')?.markAsPristine();
      }
    });
  }

  ngOnDestroy() {
    this.visibleCorporateCultureSubject?.unsubscribe();
  }

  onCancel() {
    this.clear();
    this.cancelled.next();
  }

  clear() {
    this.corporateCultureForm.reset();
    this.avatarUrl = '';
    this.file = null;
    this.isShowUploadError = false;
    this.initialCorporateCulture = null;
  }

  onSubmitForm() {
    this.isShowPopConfirm = false;
    for (const i in this.corporateCultureForm.controls) {
      this.corporateCultureForm.controls[i].markAsDirty();
      this.corporateCultureForm.controls[i].updateValueAndValidity();
    }

    if (
      this.corporateCultureForm.get('type')?.value === 'image' &&
      !this.corporateCultureForm.get('image')?.value
    ) {
      this.isShowUploadError = true;
    }

    if (this.corporateCultureForm.valid) {
      this.isShowPopConfirm = true;
    }
  }

  async onConfirmSubmitForm() {
    try {
      if (this.corporateCultureForm.get('type')?.value === 'image') {
        const formData = new FormData();
        formData.append('file', this.file as File);

        const image = await this.facade.uploadFile(formData);

        this.corporateCultureForm.patchValue(
          {
            image: image?.data?.url,
          },
          { emitEvent: false, onlySelf: true }
        );
      }
      this.isShowPopConfirm = false;
      this.facade.onSubmittedCorporateCultureSubject$.next(
        this.corporateCultureForm.value
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
      this.corporateCultureForm.controls.endDate.updateValueAndValidity()
    );
  }

  get actionText() {
    if (!this.initialCorporateCulture) {
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

      this.corporateCultureForm.patchValue(
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
    this.corporateCultureForm.patchValue({
      image: null,
    });
  }

  onZoomFile() {
    this.previewVisible = true;
  }

  updateForm() {
    this.corporateCultureForm.patchValue({
      id: this.initialCorporateCulture?.id,
      image: this.initialCorporateCulture?.image,
      topic: this.initialCorporateCulture?.topic,
      video: this.initialCorporateCulture?.videoUrl,
      type: this.initialCorporateCulture?.type,
      description: this.initialCorporateCulture?.description,
    });

    if (this.initialCorporateCulture?.image) {
      this.avatarUrl = this.initialCorporateCulture?.image;
      this.previewImage = this.initialCorporateCulture?.image;
    }
  }
}
