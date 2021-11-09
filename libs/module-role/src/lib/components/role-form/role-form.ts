import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRoleResponse } from '@recruit-supplier/api-role';
import { EFormMode } from '@recruit-supplier/app-config';
import { EPageRoute, RouterService } from '@recruit-supplier/router';
import { IRoleForm } from '../../models';

@Component({
  selector: 'recruit-supplier-role-form',
  templateUrl: './role-form.html',
  styleUrls: ['./role-form.scss'],
})
export class ModuleRoleRoleFormComponent implements OnInit {
  @Input() initialRole?: IRoleResponse;
  @Input() isLoading = false;
  @Input() formMode = EFormMode.CREATE;
  @Output() submitted = new EventEmitter<IRoleForm>();

  roleForm: FormGroup;
  isShowPopConfirm = false;

  permissionsOptions = [
    {
      label: 'ตำแหน่งงานที่รับสมัคร',
      value: EPageRoute.JOB_POSITION,
      checked: false,
    },
    {
      label: 'แนะนำตำแหน่งงานให้ต้นสังกัด',
      value: EPageRoute.RECOMMEND_JOB_POSITION_TO_AGENCY,
      checked: false,
    },
    {
      label: 'ผู้สมัครงาน / ฝึกงาน',
      value: EPageRoute.JOB_APPLICANT_INTERNSHIP,
      checked: false,
    },
    {
      label: 'เนื้อหาหน้าแรก',
      value: EPageRoute.HOME_MANAGEMENT,
      checked: false,
    },
    {
      label: 'เนื้อหาหน้าฝึกงาน',
      value: EPageRoute.INTERNSHIP_PAGE_CONTENT,
      checked: false,
    },
    {
      label: 'เนื้อหาหน้ากิจกรรมพนักงาน',
      value: EPageRoute.EMPLOYEE_ACTIVITY_PAGE_CONTENT,
      checked: false,
    },
    {
      label: 'เนื้อหาหน้าสวัสดิการ',
      value: EPageRoute.WELFARE_PAGE_CONTENT,
      checked: false,
    },
    {
      label: 'เนื้อหาหน้าอื่นๆ',
      value: EPageRoute.OTHER_PAGE_CONTENT,
      checked: false,
    },
    { label: 'ผู้ใช้งาน', value: EPageRoute.USER, checked: false },
    { label: 'บทบาท', value: EPageRoute.ROLE, checked: false },
    {
      label: 'ข้อมูล Master',
      value: EPageRoute.MASTER_INFORMATION,
      checked: false,
    },
  ];

  constructor(private fb: FormBuilder, private routerService: RouterService) {}

  ngOnInit(): void {
    this.roleForm = this.fb.group({
      role: [this.initialRole?.roleName, [Validators.required]],
      permissions: [
        this.initialRole
          ? this.getPermissionsOptions()
          : this.permissionsOptions,
        [],
      ],
    });
  }

  getPermissionsOptions() {
    return this.permissionsOptions.map((item) => {
      return {
        ...item,
        checked: this.initialRole?.roleMapping
          ?.map((item) => item?.menuModel?.menuName)
          .includes(item.value),
      };
    });
  }

  onSubmitForm() {
    this.isShowPopConfirm = false;
    for (const i in this.roleForm.controls) {
      this.roleForm.controls[i].markAsDirty();
      this.roleForm.controls[i].updateValueAndValidity();
    }

    if (this.roleForm.valid) {
      this.isShowPopConfirm = true;
    }
  }

  onConfirmSubmitForm() {
    this.isShowPopConfirm = false;
    this.submitted.emit(this.roleForm.value);
  }

  onPopConfirmCancel() {
    this.isShowPopConfirm = false;
  }

  onCancel() {
    this.routerService.goTo(EPageRoute.ROLE);
  }

  get actionText() {
    if (this.formMode === EFormMode.CREATE) {
      return 'เพิ่ม';
    }
    return 'แก้ไข';
  }
}
