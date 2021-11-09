import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnDestroy,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPhotoOfElectricTrainResponse } from '@recruit-supplier/api-home-management';
import { FileService } from '@recruit-supplier/utils/file';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Subscription } from 'rxjs';
import { ModuleHomeManagementFacade } from '../../module-home-management-facade';

@Component({
  selector: 'recruit-supplier-photo-of-electric-train-modal',
  templateUrl: './photo-of-electric-train-modal.html',
  styleUrls: ['./photo-of-electric-train-modal.scss'],
})
export class ModuleHomeManagementPhotoOfElectricTrainModalComponent
  implements OnDestroy, AfterViewInit
{
  @Output() cancelled = new EventEmitter<void>();

  photoOfElectricTrainForm: FormGroup;
  isShowPopConfirm = false;
  isLoading = false;
  initialPhotoOfElectricTrain?: IPhotoOfElectricTrainResponse | null;

  loading = false;
  avatarUrl?: string | ArrayBuffer | null;
  file?: NzUploadFile | null | File;
  previewImage?: string | ArrayBuffer | null;
  previewVisible = false;
  isShowUploadError = false;
  isVisible = false;
  visiblePhotoOfElectricTrainSubject?: Subscription;
  color = ''

  constructor(
    private facade: ModuleHomeManagementFacade,
    private fb: FormBuilder,
    private modal: NzModalService,
    private fileService: FileService
  ) {
    this.photoOfElectricTrainForm = this.fb.group({
      id: [null, []],
      image: [null, [Validators.required]],
      name: [null, [Validators.required]],
      color: [null, [Validators.required]],
    });

    this.beforeUpload = this.beforeUpload.bind(this);
  }

  ngAfterViewInit() {
    this.visiblePhotoOfElectricTrainSubject =
      this.facade.onVisiblePhotoOfElectricTrainSubject$.subscribe((value) => {
        this.isVisible = value.isOpen;
        if (value.data) {
          this.initialPhotoOfElectricTrain = value.data;
          this.updateForm();
        }

        if (!this.isVisible) {
          this.clear();
        }
      });
  }

  ngOnDestroy() {
    this.visiblePhotoOfElectricTrainSubject?.unsubscribe();
  }

  onCancel() {
    this.clear();
    this.cancelled.next();
  }

  clear() {
    this.photoOfElectricTrainForm.reset();
    this.avatarUrl = '';
    this.file = null;
    this.isShowUploadError = false;
    this.initialPhotoOfElectricTrain = null;
  }

  onSubmitForm() {
    this.isShowPopConfirm = false;
    for (const i in this.photoOfElectricTrainForm.controls) {
      this.photoOfElectricTrainForm.controls[i].markAsDirty();
      this.photoOfElectricTrainForm.controls[i].updateValueAndValidity();
    }

    if (!this.photoOfElectricTrainForm.get('image')?.value) {
      this.isShowUploadError = true;
    }

    if (this.photoOfElectricTrainForm.valid) {
      this.isShowPopConfirm = true;
    }
  }

  async onConfirmSubmitForm() {
    try {
      const formData = new FormData();
      formData.append('file', this.file as File);

      const image = await this.facade.uploadFile(formData);

      this.photoOfElectricTrainForm.patchValue(
        {
          image: image?.data?.url,
        },
        { emitEvent: false, onlySelf: true }
      );
      this.isShowPopConfirm = false;
      this.facade.onSubmittedPhotoOfElectricTrainSubject$.next(
        this.photoOfElectricTrainForm.value
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

  get actionText() {
    if (!this.initialPhotoOfElectricTrain) {
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

      this.photoOfElectricTrainForm.patchValue(
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
    this.photoOfElectricTrainForm.patchValue({
      image: null,
    });
  }

  onZoomFile() {
    this.previewVisible = true;
  }

  updateForm() {
    this.photoOfElectricTrainForm.patchValue({
      id: this.initialPhotoOfElectricTrain?.id,
      image: this.initialPhotoOfElectricTrain?.image,
      name: this.initialPhotoOfElectricTrain?.name,
      color: this.initialPhotoOfElectricTrain?.color
    });

    this.avatarUrl = this.initialPhotoOfElectricTrain?.image;
    this.previewImage = this.initialPhotoOfElectricTrain?.image;
  }
}
