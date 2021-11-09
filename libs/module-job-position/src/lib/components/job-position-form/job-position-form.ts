import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  IJobPosition,
  IJobPositionResponse,
} from '@recruit-supplier/api-job-position';
import { EDefaultData, EFormMode } from '@recruit-supplier/app-config';
import { EPageRoute, RouterService } from '@recruit-supplier/router';
import { isAfter } from 'date-fns';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ModuleJobPositionFacade } from '../../module-job-position-facade';

@Component({
  selector: 'recruit-supplier-job-position-form',
  templateUrl: './job-position-form.html',
  styleUrls: ['./job-position-form.scss'],
})
export class JobPositionFormComponent implements OnInit, AfterViewInit {
  @Input() initialJobPosition?: IJobPositionResponse;
  @Input() isLoading = false;
  @Input() formMode = EFormMode.CREATE;
  @Output() submitted = new EventEmitter<IJobPosition>();

  jobPositionForm: FormGroup;
  isShowPopConfirm = false;

  isNameSearching = false;
  nameOptions: string[] = [];

  isAddressSearching = false;
  addressOptions: string[] = [];

  isTagSearching = false;
  tagOptions: string[] = [];

  constructor(
    private fb: FormBuilder,
    private routerService: RouterService,
    private facade: ModuleJobPositionFacade
  ) {}

  ngOnInit(): void {
    this.jobPositionForm = this.fb.group({
      priority: [this.initialJobPosition?.priority],
      startDate: [
        this.initialJobPosition?.startDate
          ? new Date(this.initialJobPosition.startDate)
          : null,
        [Validators.required],
      ],
      endDate: [
        this.initialJobPosition?.endDate
          ? new Date(this.initialJobPosition.endDate)
          : null,
        [this.endDateAfterStartDateValidator],
      ],
      name: [this.initialJobPosition?.name, [Validators.required]],
      description: [
        this.initialJobPosition?.description,
        [Validators.required],
      ],
      address: [this.initialJobPosition?.address],
      tag: [this.initialJobPosition?.tag],
    });

    this.loadDefaultJobPositions();
  }

  ngAfterViewInit() {
    this.jobPositionForm
      .get('name')
      .valueChanges.pipe(
        debounceTime(EDefaultData.DEBOUNCE),
        distinctUntilChanged()
      )
      .subscribe((keyword: string) => {
        if (keyword?.trim()) {
          this.onSearchName(keyword);
        }
      });

    this.jobPositionForm
      .get('address')
      .valueChanges.pipe(
        debounceTime(EDefaultData.DEBOUNCE),
        distinctUntilChanged()
      )
      .subscribe((keyword: string) => {
        if (keyword?.trim()) {
          this.onSearchAddress(keyword);
        }
      });

    this.jobPositionForm
      .get('tag')
      .valueChanges.pipe(
        debounceTime(EDefaultData.DEBOUNCE),
        distinctUntilChanged()
      )
      .subscribe((keyword: string) => {
        if (keyword?.trim()) {
          this.onSearchTag(keyword);
        }
      });
  }

  async loadDefaultJobPositions() {
    try {
      const { data } = await this.facade.getJobPositions({
        PageNumber: 1,
        PageSize: EDefaultData.PAGE_SIZE,
      });
      const { names, tags, addresses } = data.reduce(
        (prev, current) => {
          prev.names.add(current.name);
          prev.tags.add(current.tag);
          prev.addresses.add(current.address);
          return prev;
        },
        {
          names: new Set([]),
          tags: new Set([]),
          addresses: new Set([]),
        }
      );
      this.nameOptions = [...names];
      // Tags and addresses not required field it mean in an array might be undefined
      this.tagOptions = [...tags].filter(Boolean);
      this.addressOptions = [...addresses].filter(Boolean);
    } catch (error) {
      console.error(error);
    }
  }

  // #region event
  async onSearchName(keyword: string) {
    this.isNameSearching = true;
    try {
      const result = await this.facade.getJobPositionGroupByField({
        path: 'names',
        keyword,
        limit: EDefaultData.LIMIT,
      });
      this.nameOptions = result.data;
    } catch (error) {
      console.error(error);
    } finally {
      this.isNameSearching = false;
    }
  }

  async onSearchAddress(keyword: string) {
    this.isAddressSearching = true;
    try {
      const result = await this.facade.getJobPositionGroupByField({
        path: 'address',
        keyword,
        limit: EDefaultData.LIMIT,
      });
      this.addressOptions = result.data;
    } catch (error) {
      console.error(error);
    } finally {
      this.isAddressSearching = false;
    }
  }

  async onSearchTag(keyword: string) {
    this.isTagSearching = true;
    try {
      const result = await this.facade.getJobPositionGroupByField({
        path: 'tags',
        keyword,
        limit: EDefaultData.LIMIT,
      });
      this.tagOptions = result.data;
    } catch (error) {
      console.error(error);
    } finally {
      this.isTagSearching = false;
    }
  }

  onCancel() {
    this.routerService.goTo(EPageRoute.JOB_POSITION);
  }

  onPopConfirmCancel() {
    this.isShowPopConfirm = false;
  }

  onSubmitForm() {
    this.isShowPopConfirm = false;
    for (const i in this.jobPositionForm.controls) {
      this.jobPositionForm.controls[i].markAsDirty();
      this.jobPositionForm.controls[i].updateValueAndValidity();
    }

    if (this.jobPositionForm.valid) {
      this.isShowPopConfirm = true;
    }
  }

  onConfirmSubmitForm() {
    this.isShowPopConfirm = false;
    this.submitted.emit(this.jobPositionForm.value);
  }
  // #endregion

  // #region validation
  validateEndDate() {
    setTimeout(() =>
      this.jobPositionForm.controls.endDate.updateValueAndValidity()
    );
  }

  endDateAfterStartDateValidator = (control: FormControl) => {
    if (!control.value) {
      return null;
    }
    const isValid = isAfter(
      control.value,
      this.jobPositionForm?.get('startDate').value
    );
    return isValid ? null : { invalidDate: true };
  };

  // #endregion
  get description() {
    return this.jobPositionForm.get('description');
  }

  get actionText() {
    if (this.formMode === EFormMode.CREATE) {
      return 'เพิ่ม';
    }
    return 'แก้ไข';
  }

  // #region function
  compareFun = (optionInput: string, option: string) => {
    if (optionInput) {
      return option.includes(optionInput);
    }
    return false;
  };
  // #endregion
}
