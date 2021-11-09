import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IMainSlideImageResponse } from '@recruit-supplier/api-home-management';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { FileService } from '@recruit-supplier/utils/file';
import { ModuleWelfarePageContentFacade } from '../../module-welfare-page-content-facade';
import { EPageRoute, RouterService } from '@recruit-supplier/router';
import {
  IWelfarePageContent,
  IWelfarePageContentResponse,
} from '@recruit-supplier/api-welfare-page-content';
import { EFormMode } from '@recruit-supplier/app-config';

@Component({
  selector: 'recruit-supplier-welfare-page-content-form',
  templateUrl: './welfare-page-content-form.html',
  styleUrls: ['./welfare-page-content-form.scss'],
})
export class ModuleWelfarePageContentWelfarePageContentFormComponent
  implements OnInit
{
  constructor(
    private facade: ModuleWelfarePageContentFacade,
    private fb: FormBuilder,
    private modal: NzModalService,
    private fileService: FileService,
    private routerService: RouterService
  ) {
    this.beforeUpload = this.beforeUpload.bind(this);
  }

  @Input() isLoading = false;
  @Output() cancelled = new EventEmitter<void>();
  @Output() submitted = new EventEmitter<IWelfarePageContent>();
  @Input() initialWelfarePageContent?: IWelfarePageContentResponse;
  @Input() formMode = EFormMode.CREATE;

  welfarePageContentForm!: FormGroup;
  isShowPopConfirm = false;
  initialMainSlideImage?: IMainSlideImageResponse | null;

  loading = false;
  avatarUrl?: string | ArrayBuffer | null;
  file?: NzUploadFile | null | File;
  previewImage?: string | ArrayBuffer | null;
  previewVisible = false;
  isShowUploadError = false;
  isVisible = false;

  ngOnInit() {
    this.welfarePageContentForm = this.fb.group({
      id: [this.initialWelfarePageContent?.id, []],
      topic: [this.initialWelfarePageContent?.topic, [Validators.required]],
      content: [this.initialWelfarePageContent?.content, [Validators.required]],
      image: [this.initialWelfarePageContent?.image, [Validators.required]],
    });

    this.avatarUrl = this.initialWelfarePageContent?.image;
    this.previewImage = this.initialWelfarePageContent?.image;
  }

  onCancel() {
    this.routerService.goTo(EPageRoute.WELFARE_PAGE_CONTENT);
  }

  onSubmitForm() {
    this.isShowPopConfirm = false;
    for (const i in this.welfarePageContentForm.controls) {
      this.welfarePageContentForm.controls[i].markAsDirty();
      this.welfarePageContentForm.controls[i].updateValueAndValidity();
    }

    if (!this.welfarePageContentForm.get('image')?.value) {
      this.isShowUploadError = true;
    }

    if (this.welfarePageContentForm.valid) {
      this.isShowPopConfirm = true;
    }
  }

  async onConfirmSubmitForm() {
    try {
      const formData = new FormData();
      formData.append('file', this.file as File);

      const image = await this.facade.uploadFile(formData);

      this.welfarePageContentForm.patchValue(
        {
          image: image?.data?.url,
        },
        { emitEvent: false, onlySelf: true }
      );
      this.isShowPopConfirm = false;
      this.submitted.emit(this.welfarePageContentForm.value);
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
    if (this.formMode === EFormMode.CREATE) {
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

      this.welfarePageContentForm.patchValue(
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
    this.welfarePageContentForm.patchValue({
      image: null,
    });
  }

  onZoomFile(event: any) {
    event.preventDefault();
    this.previewVisible = true;
  }
}
