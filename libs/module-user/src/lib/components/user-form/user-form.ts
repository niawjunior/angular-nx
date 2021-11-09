import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRoleResponse } from '@recruit-supplier/api-role';
import { IUserResponse } from '@recruit-supplier/api-user';
import { EDefaultData, EFormMode } from '@recruit-supplier/app-config';
import { EPageRoute, RouterService } from '@recruit-supplier/router';
import { IUserForm } from '../../models';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ModuleUserFacade } from '../../module-user-facade';

@Component({
  selector: 'recruit-supplier-user-form',
  templateUrl: './user-form.html',
  styleUrls: ['./user-form.scss'],
})
export class ModuleUserUserFormComponent implements OnInit, AfterViewInit {
  @Input() initialUser?: IUserResponse;
  @Input() rolesOptions?: IRoleResponse;
  @Input() departmentThOptions?: string[];
  @Input() isLoading = false;
  @Input() formMode = EFormMode.CREATE;
  @Output() submitted = new EventEmitter<IUserForm>();

  userForm: FormGroup;
  isShowPopConfirm = false;
  isDepartmentThSearching = false;
  constructor(
    private fb: FormBuilder,
    private routerService: RouterService,
    private facade: ModuleUserFacade
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      employeeId: [
        { value: this.initialUser?.employeeId, disabled: this.initialUser },
        [Validators.required],
      ],
      fullnameTh: [
        { value: this.initialUser?.fullnameTh, disabled: this.initialUser },
        [Validators.required],
      ],
      fullnameEn: [
        { value: this.initialUser?.fullnameEn, disabled: this.initialUser },
        [Validators.required],
      ],
      roleId: [
        { value: this.initialUser?.rolesModel.id, disabled: this.initialUser },
        [Validators.required],
      ],
      departmentTh: [
        { value: this.initialUser?.departmentTh, disabled: this.initialUser },
        [],
      ],
      status: [this.initialUser?.status, []],
    });
  }

  ngAfterViewInit() {
    this.userForm
      .get('departmentTh')
      .valueChanges.pipe(
        debounceTime(EDefaultData.DEBOUNCE),
        distinctUntilChanged()
      )
      .subscribe((keyword: string) => {
        if (keyword?.trim()) {
          this.onSearchDepartmentTh(keyword);
        }
      });
  }

  async onSearchDepartmentTh(keyword: string) {
    try {
      const result = await this.facade.getDepartmentThOptions(
        keyword,
        EDefaultData.LIMIT
      );
      this.departmentThOptions = result;
    } catch (error) {
      console.error(error);
    } finally {
      this.isDepartmentThSearching = false;
    }
  }

  onSubmitForm() {
    this.isShowPopConfirm = false;
    for (const i in this.userForm.controls) {
      this.userForm.controls[i].markAsDirty();
      this.userForm.controls[i].updateValueAndValidity();
    }

    if (this.userForm.valid) {
      this.isShowPopConfirm = true;
    }
  }

  onConfirmSubmitForm() {
    this.isShowPopConfirm = false;
    this.submitted.emit(this.userForm.value);
  }

  onPopConfirmCancel() {
    this.isShowPopConfirm = false;
  }

  onCancel() {
    this.routerService.goTo(EPageRoute.USER);
  }

  get actionText() {
    if (this.formMode === EFormMode.CREATE) {
      return 'เพิ่ม';
    }
    return 'แก้ไข';
  }

  compareFun = (optionInput: string, option: string) => {
    if (optionInput) {
      return option.includes(optionInput);
    }
    return false;
  };
}
