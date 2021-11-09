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
import { IAnnouncementResponse } from '@recruit-supplier/api-home-management';
import { isAfter } from 'date-fns';
import { Subscription } from 'rxjs';
import { ModuleHomeManagementFacade } from '../../module-home-management-facade';

@Component({
  selector: 'recruit-supplier-announcement-modal',
  templateUrl: './announcement-modal.html',
  styleUrls: ['./announcement-modal.scss'],
})
export class ModuleHomeManagementAnnouncementModalComponent
  implements AfterViewInit, OnDestroy
{
  @Output() cancelled = new EventEmitter<void>();

  announcementForm: FormGroup;
  isShowPopConfirm = false;
  isLoading = false;
  initialAnnouncement?: IAnnouncementResponse | null;

  isVisible = false;
  visibleAnnouncementSubject?: Subscription;

  constructor(
    private facade: ModuleHomeManagementFacade,
    private fb: FormBuilder
  ) {
    this.announcementForm = this.fb.group({
      id: [null, []],
      content: [null, [Validators.required]],
      startDate: [null, [Validators.required]],
      endDate: [null, [this.endDateAfterStartDateValidator]],
    });
  }

  ngAfterViewInit() {
    this.visibleAnnouncementSubject =
      this.facade.onVisibleAnnouncementSubject$.subscribe((value) => {
        this.isVisible = value.isOpen;
        if (value.data) {
          this.initialAnnouncement = value.data;
          this.updateForm();
        }

        if (!this.isVisible) {
          this.clear();
        }
      });
  }

  ngOnDestroy() {
    this.visibleAnnouncementSubject?.unsubscribe();
  }

  onCancel() {
    this.clear();
    this.cancelled.next();
  }

  clear() {
    this.announcementForm.reset();
    this.initialAnnouncement = null;
  }

  onSubmitForm() {
    this.isShowPopConfirm = false;
    for (const i in this.announcementForm.controls) {
      this.announcementForm.controls[i].markAsDirty();
      this.announcementForm.controls[i].updateValueAndValidity();
    }

    if (this.announcementForm.valid) {
      this.isShowPopConfirm = true;
    }
  }

  onConfirmSubmitForm() {
    this.isShowPopConfirm = false;
    this.facade.onSubmittedAnnouncementSubject$.next(this.announcementForm.value);
  }

  onPopConfirmCancel() {
    this.isShowPopConfirm = false;
  }

  // #region validation
  validateEndDate() {
    setTimeout(() =>
      this.announcementForm.controls.endDate.updateValueAndValidity()
    );
  }

  endDateAfterStartDateValidator = (control: FormControl) => {
    if (!control.value) {
      return null;
    }
    const isValid = isAfter(
      control.value,
      this.announcementForm?.get('startDate')?.value
    );
    return isValid ? null : { invalidDate: true };
  };
  // #endregion

  get actionText() {
    if (!this.initialAnnouncement) {
      return 'เพิ่ม';
    }
    return 'แก้ไข';
  }

  updateForm() {
    this.announcementForm.patchValue({
      id: this.initialAnnouncement?.id,
      startDate: this.initialAnnouncement?.startDate
        ? new Date(this.initialAnnouncement.startDate)
        : null,
      endDate: this.initialAnnouncement?.endDate
        ? new Date(this.initialAnnouncement.endDate)
        : null,
      content: this.initialAnnouncement?.content,
    });
  }
}
