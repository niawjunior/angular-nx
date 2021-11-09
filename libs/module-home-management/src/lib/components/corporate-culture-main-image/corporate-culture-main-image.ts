import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ICorporateCultureMainImage,
  ICorporateCultureMainImageResponse,
} from '@recruit-supplier/api-home-management';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { ModuleHomeManagementFacade } from '../../module-home-management-facade';
import { FileService } from '@recruit-supplier/utils/file';

@Component({
  selector: 'recruit-supplier-corporate-culture-main-image',
  templateUrl: './corporate-culture-main-image.html',
  styleUrls: ['./corporate-culture-main-image.scss'],
})
export class ModuleHomeManagementCorporateCultureMainImageComponent
  implements OnInit
{
  constructor(
    private facade: ModuleHomeManagementFacade,
    private fb: FormBuilder,
    private modal: NzModalService,
    private fileService: FileService
  ) {
    this.beforeUpload = this.beforeUpload.bind(this);
  }

  @Input() initialCorporateCulterMainImage?: ICorporateCultureMainImageResponse;
  @Output() submitted = new EventEmitter<ICorporateCultureMainImage>();
  corporateCultureMainImageForm!: FormGroup;
  isShowPopConfirm = false;
  isLoading = false;
  loading = false;
  avatarUrl?: string | ArrayBuffer | null;
  file?: NzUploadFile | null | File;
  previewImage?: string | ArrayBuffer | null;
  previewVisible = false;
  isShowUploadError = false;

  ngOnInit() {
    this.corporateCultureMainImageForm = this.fb.group({
      id: [this.initialCorporateCulterMainImage?.id, []],
      image: [
        this.initialCorporateCulterMainImage?.image,
        [Validators.required],
      ],
    });

    this.avatarUrl = this.initialCorporateCulterMainImage?.image;
    this.previewImage = this.initialCorporateCulterMainImage?.image;
  }

  onSubmitForm() {
    this.isShowPopConfirm = false;
    for (const i in this.corporateCultureMainImageForm.controls) {
      this.corporateCultureMainImageForm.controls[i].markAsDirty();
      this.corporateCultureMainImageForm.controls[i].updateValueAndValidity();
    }

    if (!this.corporateCultureMainImageForm.get('image')?.value) {
      this.isShowUploadError = true;
    }

    if (this.corporateCultureMainImageForm.valid) {
      this.isShowPopConfirm = true;
    }
  }

  async onConfirmSubmitForm() {
    try {
      const formData = new FormData();
      formData.append('file', this.file as File);

      const image = await this.facade.uploadFile(formData);

      this.corporateCultureMainImageForm.patchValue(
        {
          image: image?.data?.url,
        },
        { emitEvent: false, onlySelf: true }
      );
      this.isShowPopConfirm = false;
      this.submitted.next(this.corporateCultureMainImageForm.value);
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

  get actionText() {
    if (!this.initialCorporateCulterMainImage) {
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

      this.corporateCultureMainImageForm.patchValue(
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
    this.corporateCultureMainImageForm.patchValue({
      image: null,
    });
  }

  onZoomFile(event: any) {
    this.previewVisible = true;
    event.preventDefault();
  }
}
